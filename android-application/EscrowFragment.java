package com.example.ssafy_book;

import android.app.AlertDialog;
import android.app.FragmentManager;
import android.app.FragmentTransaction;
import android.content.DialogInterface;
import android.graphics.Color;
import android.os.Bundle;
import android.app.Fragment;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;

import android.util.Log;
import android.widget.TextView;
import org.web3j.crypto.Credentials;
import org.web3j.crypto.RawTransaction;
import org.web3j.crypto.TransactionEncoder;
import org.web3j.crypto.WalletUtils;
import org.web3j.protocol.Web3j;
import org.web3j.protocol.admin.Admin;
import org.web3j.protocol.admin.methods.response.NewAccountIdentifier;
import org.web3j.protocol.admin.methods.response.PersonalUnlockAccount;
import org.web3j.protocol.core.methods.request.Transaction;
import org.web3j.protocol.core.methods.response.EthSendTransaction;
import org.web3j.protocol.http.HttpService;
import org.web3j.tx.gas.DefaultGasProvider;

import java.io.File;
import java.math.BigInteger;

import android.annotation.SuppressLint;
import android.content.Context;
import android.content.SharedPreferences;

import com.google.gson.Gson;

import org.web3j.protocol.core.DefaultBlockParameterName;
import org.web3j.protocol.core.methods.response.EthGetBalance;
import org.web3j.utils.Convert;
import org.web3j.utils.Numeric;


public class EscrowFragment extends Fragment {
    View view;
    private Button btn_pay;
    TextView buyerName,productName,price,ownPrice,paymentPrice,afterOwn;

    Web3j web3j;
    String URL;
    Admin admin;

    SharedPreferences auto;
    String ethAccount, contractId;

    //결제 취소시 메인 프레그먼트로 이동
    BuyerMainFragment buyerMainFragment;
    FragmentManager fragManager;
    FragmentTransaction fragTransaction;

    //결제 확인시 결제완료 프래그먼트로 이동
    CompleteFragment completeFragment;

    //보유이더, 결제이더
    int own, pay, boardId, accountId;

    private SendRequestTask reqTask = null;

    String serverIP;

    @SuppressLint("SetTextI18n")
    public View onCreateView(LayoutInflater inflater, ViewGroup container, Bundle savedInstanceState) {
        view = inflater.inflate(R.layout.fragment_escrow, container, false);

        serverIP = "http://172.18.101.49:8080";

        URL = "http://172.18.101.49:8545";

        btn_pay = view.findViewById(R.id.payment);

        //결제 정보 확인
        buyerName = view.findViewById(R.id.buyer_name);
        productName = view.findViewById(R.id.product_name);
        price= view.findViewById(R.id.price);
        ownPrice = view.findViewById(R.id.own_price);
        paymentPrice = view.findViewById(R.id.payment_price);
        afterOwn = view.findViewById(R.id.after_own);

        web3j = Web3j.build(new HttpService(URL));
        admin = Admin.build(new HttpService(URL));

        auto = getActivity().getSharedPreferences("userData", Context.MODE_PRIVATE);
        ethAccount = auto.getString("ethAccount",null);
        accountId = auto.getInt("idAccount",0);

        //주문자 이더 Account
        String resultAccount = "주소 : " + ethAccount;
        buyerName.setText(resultAccount);
        //주문자 보유 이더
        try {
            EthGetBalance ethGetBalance = web3j.ethGetBalance(ethAccount,DefaultBlockParameterName.LATEST).sendAsync().get();
            BigInteger ethBalance = ethGetBalance.getBalance();
            Convert.fromWei(ethBalance.toString(),Convert.Unit.ETHER);
            String resultEth = Convert.fromWei(ethBalance.toString(),Convert.Unit.ETHER).toString();
            double RSC = Double.parseDouble(resultEth);
            Log.d("이더 소유1", String.valueOf(RSC));
            String result = String.valueOf(Math.ceil(RSC));
            Log.d("이더 소유2", result);

            ownPrice.setText(result);
            own = (int)Double.parseDouble(result);
        } catch (Exception e) {
            e.printStackTrace();
        }


        buyerMainFragment = new BuyerMainFragment();
        completeFragment = new CompleteFragment();

        Bundle bundle = getArguments();
        String pn = "";
        if(bundle != null){
            pn = bundle.getString("productName");
            productName.setText(bundle.getString("productName"));
            double beforeRSC = Double.parseDouble(bundle.getString("productPrice"));
            String RSC = String.valueOf(Math.ceil(beforeRSC)) + " RSC";
            price.setText(RSC);
            pay = Integer.parseInt(bundle.getString("productPrice"));
            paymentPrice.setText("-" + bundle.getString("productPrice")+"RSC");
            paymentPrice.setTextColor(Color.RED);
            boardId = bundle.getInt("boardId");

            contractId = bundle.getString("contractId");
            Log.d("ContractIdLog",contractId);
        }
        Log.d("보유 RSC ",Integer.toString(own));
        Log.d("결제 RSC ",Integer.toString(pay));
        int result = own - pay;
        Log.d("결제 후 보유 RSC ",Integer.toString(result));
        afterOwn.setText(Integer.toString(result) +"RSC");
        afterOwn.setTextColor(Color.BLUE);

        Bundle bundle2 = new Bundle(3);
        bundle2.putString("productName",pn);
        bundle2.putString("productPrice",Integer.toString(pay) + "RSC");
        bundle2.putString("afterOwn",Integer.toString(result) + "RSC");

        //결제하기 버튼 누를 시 결제확인 팝업 생성
        AlertDialog.Builder builder = new AlertDialog.Builder(getActivity());
        //에스크로 결제 완료 버튼 누를 시 이더리움에 해당 거래 데이터 저장.
        auto = getActivity().getSharedPreferences("userData", Context.MODE_PRIVATE);
        String pw = auto.getString("userPw",null);
        String credential = auto.getString("credentials",null);

        btn_pay.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                builder.setTitle("결제하시겠습니까?")
                        .setNegativeButton("네", new DialogInterface.OnClickListener() {
                            @Override
                            public void onClick(DialogInterface dialogInterface, int i) {
                                //결제 완료 페이지로 넘어감
                                fragManager = getFragmentManager();
                                fragTransaction = fragManager.beginTransaction();

                                completeFragment.setArguments(bundle2);
                                fragTransaction.addToBackStack(null);

                                try {
                                    Credentials credentials = WalletUtils.loadCredentials(pw,credential);

                                    Log.d("credentials Test",credentials.getEcKeyPair().getPrivateKey().toString());
                                    Log.d("credentials Test",credentials.getAddress());
                                    Log.d("credentials Test", String.valueOf(boardId));
                                    //contract주소 변경
                                    Escrow_ssafy escrow_ssafy = Escrow_ssafy.load(contractId,web3j,credentials,new DefaultGasProvider());

                                    BigInteger amount = BigInteger.valueOf(pay).multiply(BigInteger.valueOf(10).pow(18));
                                    escrow_ssafy.buyItem(amount).sendAsync().get();

                                    //상태 디비에 전송
                                    reqTask = new SendRequestTask();
                                    reqTask.execute(serverIP,"api/board/update?boardid=" + boardId + "&state="+ 2, "GET");

                                    reqTask = new SendRequestTask();
                                    reqTask.execute(serverIP,"api/board/update?boardid=" + boardId + "&buyer="+ accountId, "GET");

                                    Log.d("boardid = ", String.valueOf(boardId));

                                    btn_pay.setEnabled(false);
                                    btn_pay.setText("결제중.....");
                                    fragTransaction.replace(R.id.frame,completeFragment);
                                    fragTransaction.commit();
                                } catch (Exception e) {
                                    e.printStackTrace();
                                }
                            }
                        })
                        .setPositiveButton("아니오", new DialogInterface.OnClickListener() {
                            @Override
                            public void onClick(DialogInterface dialogInterface, int i) {
                                if (dialogInterface != null) {
                                    dialogInterface.dismiss();
                                    dialogInterface = null;
                                }
                                //메인페이지로 넘어감
//                                fragManager = getFragmentManager();
//                                fragTransaction = fragManager.beginTransaction();
//                                fragTransaction.replace(R.id.frame,buyerMainFragment);
//                                fragTransaction.addToBackStack(null);
//                                fragTransaction.commit();
                            }
                        }).show();
            }
        });
        return view;
    }
}
