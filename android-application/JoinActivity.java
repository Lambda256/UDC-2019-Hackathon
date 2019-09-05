package com.example.ssafy_book;

import android.app.Activity;
import android.content.Intent;
import android.content.SharedPreferences;
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.text.Editable;
import android.text.TextWatcher;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.TextView;
import android.widget.Toast;

import com.google.gson.Gson;

import org.bouncycastle.crypto.ec.ECElGamalDecryptor;
import org.bouncycastle.jce.provider.BouncyCastleProvider;
import org.web3j.crypto.Credentials;
import org.web3j.crypto.WalletUtils;
import org.web3j.protocol.Web3j;
import org.web3j.protocol.admin.Admin;
import org.web3j.protocol.admin.methods.response.PersonalUnlockAccount;
import org.web3j.protocol.core.methods.request.Transaction;
import org.web3j.protocol.core.methods.response.EthSendTransaction;
import org.web3j.protocol.http.HttpService;

import java.io.File;
import java.math.BigInteger;
import java.security.Provider;
import java.security.Security;
import java.util.concurrent.ExecutionException;

import me.kalriz.checkmate.app.params.ReqJoinParam;
import me.kalriz.checkmate.app.params.ResJoinInfoParam;

public class JoinActivity extends AppCompatActivity implements View.OnClickListener {

    EditText joinIdEdit,joinPwEdit,joinPwCheckEdit,joinNameEdit,joinPhEdit;

    TextView pwCheckTxt, resultTxt;

    Button joinBtn;

    boolean pwCheck;

    Admin admin;
    Web3j web3j;

    String ethId,phoneNumber,id,pw, privateKey;
    String URL;

    String dirPath, credentialPath;

    int idAccount;

    File dir;

    String serverIP;

    private SendRequestTask reqTask = null;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_join);

        serverIP = "http://172.18.101.49:8080";

        setupBouncyCastle();

        dirPath = getFilesDir().getAbsolutePath() + "/ethAccount/";
        dir = new File(dirPath);
        if ( !dir.exists() )
        {
            // 디렉토리가 존재하지 않으면 디렉토리 생성
            dir.mkdirs();
        }

        Log.d("dirPath",dir.toString());

        URL = "http://172.18.101.49:8545";

        web3j = Web3j.build(new HttpService(URL));
        admin = Admin.build(new HttpService(URL));

        pwCheck = false;

        joinIdEdit = findViewById(R.id.join_id_edit);
        joinPwEdit = findViewById(R.id.join_pw_edit);
        joinPwCheckEdit = findViewById(R.id.join_pw_check_edit);
        joinNameEdit = findViewById(R.id.join_name_edit);
        joinPhEdit = findViewById(R.id.join_phone_edit);
//        joinBankNameEdit = findViewById(R.id.join_bank_name_edit);
//        joinBankAccountEdit = findViewById(R.id.join_bank_account_edit);

        pwCheckTxt = findViewById(R.id.check_pw_text);
        resultTxt = findViewById(R.id.result_textview);

        joinBtn = findViewById(R.id.join_btn);

        joinBtn.setOnClickListener(this);

        //비밀번호 일치여부 확인
        joinPwCheckEdit.addTextChangedListener(new TextWatcher() {
            @Override
            public void beforeTextChanged(CharSequence s, int start, int count, int after) {

                pwCheckTxt.setText("비밀번호를 입력해 주세요.");
            }

            @Override
            public void onTextChanged(CharSequence s, int start, int before, int count) {
                if(joinPwEdit.getText().toString().contentEquals(s)){
                    pwCheckTxt.setText("비밀번호가 일치합니다.");
                    pwCheck = true;
                }else{
                    pwCheckTxt.setText("비밀번호가 일치하지 않습니다.");
                    pwCheck = false;

                }
            }

            @Override
            public void afterTextChanged(Editable s) {
                if(joinPwEdit.getText().toString().contentEquals(s)){
                    pwCheckTxt.setText("비밀번호가 일치합니다.");
                    pwCheck = true;
                }else{
                    pwCheckTxt.setText("비밀번호가 일치하지 않습니다.");
                    pwCheck = false;

                }
            }
        });
    }

    @Override
    public void onClick(View v) {
        switch (v.getId()){
            case R.id.join_btn:
                //join_btn(회원가입)버튼 클릭
                //pwCheck == true, idCheck == true 회원가입 완료
                if(pwCheck){
                    //ethereum 계정생성
                    try {
                        id = joinIdEdit.getText().toString();
                        pw = joinPwCheckEdit.getText().toString();
                        phoneNumber = joinPhEdit.getText().toString();

                        String walletFile = WalletUtils.generateLightNewWalletFile(pw,dir);

                        credentialPath = dir + "/" + walletFile;

                        Credentials credentials = WalletUtils.loadCredentials(pw,new File(credentialPath));

                        ethId = credentials.getAddress();

                        //생성된 계좌로 20eth 전송(루니버스 계좌꺼로 바꿔야함)

                        PersonalUnlockAccount personalUnlockAccount = admin.personalUnlockAccount("0x7a2423e748d10330e6e0df18bf327de9a744c4de","kalriz").sendAsync().get();

                        String message = "";

                        BigInteger amount = BigInteger.valueOf(20).multiply(BigInteger.valueOf(10).pow(18));
                        Transaction transaction = Transaction.createFunctionCallTransaction("0x7a2423e748d10330e6e0df18bf327de9a744c4de",null,BigInteger.ONE,BigInteger.valueOf(21000),ethId,amount,message);

                        EthSendTransaction ethSendTransaction = web3j.ethSendTransaction(transaction).sendAsync().get();
                        String txId = ethSendTransaction.getTransactionHash();

                        Log.d("tx Id", txId);

                    } catch (Exception e) {
                        e.printStackTrace();
                        resultTxt.setText("잘못된 요청입니다.(Error: " + e.getMessage() +")");
                    }

                    //데이터 전송
                    ReqJoinParam params = new ReqJoinParam();

                    params.setEmail(id);
                    params.setPasswd(pw);
                    params.setEth_id(ethId);
                    params.setPhone(phoneNumber);

                    Gson gson = new Gson();

                    reqTask = new SendRequestTask();
                    reqTask.execute(serverIP,"api/membership/join", "POST", gson.toJson(params));

                    ResJoinInfoParam joinInfoParam = null;
                    try {
                        joinInfoParam = gson.fromJson(reqTask.get(), ResJoinInfoParam.class);

                        idAccount = joinInfoParam.getAccount().getAccount_id();
                    } catch (Exception e) {
                        e.printStackTrace();
                    }

                    SharedPreferences auto = getSharedPreferences("userData", Activity.MODE_PRIVATE);

                    SharedPreferences.Editor userData = auto.edit();

                    userData.putString("ethAccount",ethId);
                    userData.putString("userId",id);
                    userData.putString("userPw",pw);
                    userData.putString("credentials",credentialPath);
                    userData.putInt("idAccount",idAccount);

                    userData.commit();

                    //LoginActivity로 화면 이동
                    Intent intent = new Intent(JoinActivity.this, LoginActivity.class);
                    startActivity(intent);
                    finish();

                }else{
                    Toast.makeText(getApplicationContext(),"비밀번호가 일치하지 않습니다.",Toast.LENGTH_SHORT).show();
                }
                break;
        }
    }
    public void setupBouncyCastle() {
        final Provider provider = Security.getProvider(BouncyCastleProvider.PROVIDER_NAME);
        if (provider == null) {
            // Web3j will set up the provider lazily when it's first used.
            return;
        }
        if (provider.getClass().equals(BouncyCastleProvider.class)) {
            // BC with same package name, shouldn't happen in real life.
            return;
        }
        // Android registers its own BC provider. As it might be outdated and might not include
        // all needed ciphers, we substitute it with a known BC bundled in the app.
        // Android's BC has its package rewritten to "com.android.org.bouncycastle" and because
        // of that it's possible to have another BC implementation loaded in VM.
        Security.removeProvider(BouncyCastleProvider.PROVIDER_NAME);
        Security.insertProviderAt(new BouncyCastleProvider(), 1);
    }
}
