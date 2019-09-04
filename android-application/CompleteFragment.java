package com.example.ssafy_book;

import android.app.Fragment;
import android.app.FragmentManager;
import android.app.FragmentTransaction;
import android.content.Context;
import android.content.SharedPreferences;
import android.graphics.drawable.Drawable;
import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.ImageView;
import android.widget.TextView;

import org.web3j.crypto.CipherException;
import org.web3j.crypto.Credentials;
import org.web3j.crypto.WalletUtils;
import org.web3j.protocol.Web3j;
import org.web3j.protocol.http.HttpService;
import org.web3j.tx.gas.DefaultGasProvider;

import java.io.IOException;
import java.math.BigInteger;
import java.util.concurrent.ExecutionException;

public class CompleteFragment extends Fragment {
    View view;
    TextView productName,productPrice,ownPrice;
    //마이페이지로 이동
    Button button;
    FragmentManager fragManager;
    FragmentTransaction fragTransaction;
    MyPageFragment myPageFragment;
    Web3j web3j;
    String URL;
    SharedPreferences auto;

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        view = inflater.inflate(R.layout.fragment_complete, container, false);
        button = view.findViewById(R.id.button);
        URL = "http://172.18.101.49:8545";

        web3j = Web3j.build(new HttpService(URL));
        auto = getActivity().getSharedPreferences("userData", Context.MODE_PRIVATE);
        Drawable drawable = getResources().getDrawable(R.drawable.buy);

        // id : imageView01 <ImageView>를 가져온다.
        ImageView imageView = (ImageView)view.findViewById(R.id.imageView2);
        imageView.setImageDrawable(drawable);

        productName = view.findViewById(R.id.product_name);
        productPrice = view.findViewById(R.id.product_price);
        ownPrice = view.findViewById(R.id.own_price);

        Bundle bundle = getArguments();
        String pp = "";
        if(bundle != null){
            productName.setText(bundle.getString("productName"));
            productPrice.setText(bundle.getString("productPrice"));
            pp = bundle.getString("productPrice");
            ownPrice.setText(bundle.getString("afterOwn"));
        }

        auto = getActivity().getSharedPreferences("userData", Context.MODE_PRIVATE);
        String pw = auto.getString("userPw",null);
        String credential = auto.getString("credentials",null);
        try {
            Credentials credentials = WalletUtils.loadCredentials(pw,credential);
            //컨트랙트 주소 변경
//            Escrow_ssafy escrow_ssafy = Escrow_ssafy.load("0xe9689c91be0670851fc1376f0b93498f3813c108", web3j,credentials,new DefaultGasProvider());
//            escrow_ssafy.confirmItem().sendAsync();
        } catch (Exception e) {
            e.printStackTrace();
        }


        //마이페이지로 이동
        myPageFragment  = new MyPageFragment();
        button.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                fragManager = getFragmentManager();
                fragTransaction = fragManager.beginTransaction();
                fragTransaction.replace(R.id.frame,myPageFragment);
                fragTransaction.addToBackStack(null);
                fragTransaction.commit();
            }
        });

        return view;
    }
}
