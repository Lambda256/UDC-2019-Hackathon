package com.example.ssafy_book;

import android.app.Activity;
import android.content.Intent;
import android.content.SharedPreferences;
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.TextView;
import android.widget.Toast;

import com.google.gson.Gson;

import org.bouncycastle.jce.provider.BouncyCastleProvider;
import org.json.JSONObject;
import org.web3j.crypto.CipherException;
import org.web3j.crypto.Credentials;
import org.web3j.crypto.Wallet;
import org.web3j.crypto.WalletUtils;

import java.io.File;
import java.io.IOException;
import java.security.InvalidAlgorithmParameterException;
import java.security.NoSuchAlgorithmException;
import java.security.NoSuchProviderException;
import java.security.Provider;
import java.security.Security;

import me.kalriz.checkmate.app.params.ReqLoginParam;
import me.kalriz.checkmate.app.params.ResLoginInfoParam;

public class LoginActivity extends AppCompatActivity {


    EditText idEdit, pwEdit;
    Button loginBtn;
    TextView joinText;

    private String  URL = "http://172.18.101.49:8545";

    boolean result;
    String loginId;
    String loginPw;
    String ethId;

    String dirPath;

    int idAccount;

    JSONObject jsonObject;

    String CredentialPath;

    File[] files;
    File dir;

    String serverIP;

    private SendRequestTask reqTask = null;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_login);

        serverIP = "http://172.18.101.49:8080";
        setupBouncyCastle();

        SharedPreferences auto = getSharedPreferences("userData", Activity.MODE_PRIVATE);

        loginId = auto.getString("inputId",null);
        loginPw = auto.getString("inputPw",null);

//        if(loginId != null && loginPw != null){
//            //여기서 id, pw가 일치하면 intent
//            Intent intent = new Intent(LoginActivity.this, MainActivity.class);
//            startActivity(intent);
//            finish();
//        }

        dirPath = getFilesDir().getAbsolutePath() + "/ethAccount/";
        dir = new File(dirPath);

        Log.d("fileName : ", dirPath);

        files = dir.listFiles();

        idEdit = findViewById(R.id.id_edit);
        pwEdit = findViewById(R.id.pw_edit);

        loginBtn = findViewById(R.id.login_btn);

        joinText = findViewById(R.id.join);

        //로그인 버튼 클릭
        loginBtn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                //id, pw edit 받아서 확인
                //idEdit.getText()로 editText입력값 가져올 수 있음

                //DB에서 사용자가 입력한 id, pw를 조회하고 올바른 id와 pw이면
                ReqLoginParam reqLoginParam = new ReqLoginParam();

                reqLoginParam.setEmail(idEdit.getText().toString());
                reqLoginParam.setPasswd(pwEdit.getText().toString());

                Gson gson = new Gson();

                reqTask = new SendRequestTask(null, loginBtn);
                reqTask.execute(serverIP,"api/membership/login", "POST", gson.toJson(reqLoginParam));

                try {
                    String json = reqTask.get();
                    Log.d("ERR", json);
                    jsonObject = new JSONObject(json);

                    ResLoginInfoParam test = gson.fromJson(json, ResLoginInfoParam.class);

                    idAccount = test.getAccount().getAccount_id();

                    result = jsonObject.getBoolean("success");

                    ethId = test.getAccount().getEth_id();
                    Log.d("userAccount",ethId);

                } catch (Exception e) {
                    e.printStackTrace();
                }

                if(result){
                    for(File file : files){
                        if(file.getName().contains(ethId.substring(2))) {
                            CredentialPath = file.toString();
                        }
                    }
                    //자동 로그인
                    SharedPreferences.Editor autoLogin = auto.edit();
                    autoLogin.putString("userId", idEdit.getText().toString());
                    autoLogin.putString("userPw", pwEdit.getText().toString());
                    autoLogin.putString("ethAccount",ethId);
                    autoLogin.putInt("idAccount",idAccount);

                    if(CredentialPath == null){
                        try {
                            String credentials = WalletUtils.generateLightNewWalletFile(pwEdit.getText().toString(),dir);
                            Log.d("credentialsda",credentials);
                            CredentialPath = dir + "/" + credentials;
                            Log.d("credentialsda",CredentialPath);
                        } catch (Exception e) {
                            e.printStackTrace();
                        }
                    }
                    autoLogin.putString("credentials",CredentialPath);
                    Log.d("credentials", CredentialPath);


                    autoLogin.commit();

                    Toast.makeText(LoginActivity.this, idEdit.getText().toString()+"님 환영합니다.", Toast.LENGTH_SHORT).show();

                    //MainActivity로 이동
                    Intent intent = new Intent(LoginActivity.this, MainActivity.class);
                    startActivity(intent);
                    finish();
                }else{

                    Toast.makeText(LoginActivity.this, "잘못된 ID 또는 PW 입니다.", Toast.LENGTH_SHORT).show();

                }

            }
        });

        //회원가입 버튼 클릭
        joinText.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                //회원가입 페이지로 이동
                //Intent를 사용하여 페이지 이동
                Intent intent = new Intent(LoginActivity.this, JoinActivity.class);
                startActivity(intent);
            }
        });
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
