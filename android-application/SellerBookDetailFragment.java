package com.example.ssafy_book;

import android.app.AlertDialog;
import android.app.Fragment;
import android.app.FragmentManager;
import android.app.FragmentTransaction;
import android.content.Context;
import android.content.SharedPreferences;
import android.os.Bundle;
import android.support.annotation.Nullable;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.EditText;
import android.widget.ImageView;
import android.widget.LinearLayout;
import android.widget.TextView;

import com.google.gson.Gson;

import org.web3j.crypto.CipherException;
import org.web3j.crypto.Credentials;
import org.web3j.crypto.WalletUtils;
import org.web3j.protocol.Web3j;
import org.web3j.protocol.http.HttpService;
import org.web3j.tx.gas.DefaultGasProvider;

import java.io.IOException;
import java.lang.reflect.Member;
import java.math.BigInteger;

import me.kalriz.checkmate.app.params.ResBoardSubmitParam;

public class SellerBookDetailFragment extends Fragment {

    View view;

    LinearLayout imgLinear;

    TextView bookDetailTitle, bookDetailPrice, bookDetailContext, buyerAccount;

    String detail, boardURL, boardDetail, title, price, URL;

    Web3j web3j;

    SharedPreferences auto;

    int boardAccount, boardState;

    private SendRequestTask reqTask = null;

    ResBoardSubmitParam resBoardSubmitParam;

    Button sellerBtn;

    MemberInfoFragment memberInfoFragment;

    FragmentManager fragManager;
    FragmentTransaction fragTransaction;

    SellerMainFragment sellerMainFragment;
    RegisterDeliveryFragment registerDeliveryFragment;

    String serverIP;

    @Override
    public View onCreateView(LayoutInflater inflater, @Nullable ViewGroup container,
                             Bundle savedInstanceState) {
        // Inflate the layout for this fragment
        view = inflater.inflate(R.layout.fragment_seller_book_detail,container, false);

        serverIP = "http://172.18.101.49:8080";

        URL = "http://172.18.101.49:8545";

        web3j = Web3j.build(new HttpService(URL));

        auto = getActivity().getSharedPreferences("userData", Context.MODE_PRIVATE);

        Gson gson = new Gson();

        sellerMainFragment = new SellerMainFragment();
        registerDeliveryFragment = new RegisterDeliveryFragment();
        memberInfoFragment = new MemberInfoFragment();

        savedInstanceState = getArguments();
        boardAccount = savedInstanceState.getInt("boardAccount");
        Log.d("boardAccount", String.valueOf(boardAccount));

        boardURL = "api/board/search?id=" + boardAccount;
        Log.d("boardAccount", boardURL);

        reqTask = new SendRequestTask();
        reqTask.execute(serverIP,boardURL, "GET");


        try {
            boardDetail = reqTask.get();

            resBoardSubmitParam = gson.fromJson(boardDetail, ResBoardSubmitParam.class);
        } catch (Exception e) {
            e.printStackTrace();
        }

        imgLinear = view.findViewById(R.id.image_linear);
        bookDetailTitle = view.findViewById(R.id.book_detail_title);
        bookDetailPrice = view.findViewById(R.id.book_detail_price);
        bookDetailContext = view.findViewById(R.id.book_detail_context);
        sellerBtn = view.findViewById(R.id.seller_detail_btn);
        buyerAccount = view.findViewById(R.id.buyer_account_txt);

        //이미지 필요한 만큼 반복해서 생성하면 됩니다!
        for(int i = 0; i < 1; i++) {
            ImageView imgView = new ImageView(getActivity());
            imgView.setLayoutParams(new LinearLayout.LayoutParams(LinearLayout.LayoutParams.MATCH_PARENT, LinearLayout.LayoutParams.MATCH_PARENT));
            imgView.setImageResource(R.drawable.book);

            imgLinear.addView(imgView);
        }

        Log.d("test1234 : ", resBoardSubmitParam.getBoard().getTitle());
        //책 상세설명 텍스트 추가부분
        detail = resBoardSubmitParam.getBoard().getContents();
        title = resBoardSubmitParam.getBoard().getTitle();
        price = String.valueOf(resBoardSubmitParam.getBoard().getPrice());

        boardState = resBoardSubmitParam.getBoard().getState();

        bookDetailTitle.setText(title);
        bookDetailContext.setText(detail);
        bookDetailPrice.setText(price);

        Log.d("BoardState : ", String.valueOf(boardState));
        AlertDialog.Builder builder = new AlertDialog.Builder(getActivity());
        builder.setTitle("");
        builder.setMessage("운송장 번호를 입력해 주세요.");
        builder.setCancelable(false);


        if (android.os.Build.VERSION.SDK_INT >= android.os.Build.VERSION_CODES.M) {
            EditText deliveryEdit = new EditText(getContext());
            builder.setView(deliveryEdit);
        }

        //state에따라 버튼 변경
        if(boardState == 1 || boardState == 0){
            //수정, 삭제 가능
            sellerBtn.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View v) {
                }
            });
        }else if(boardState == 2){


            fragManager = getFragmentManager();
            fragTransaction = fragManager.beginTransaction();

            //구매한 구매자 account 보여줘야함
            buyerAccount.setVisibility(View.VISIBLE);
//            String buyerAccountResult = String.valueOf("구매자 : " + resBoardSubmitParam.getBoard().getBuyer());
            String buyerAccountResult = String.valueOf("구매자 : " + "0x7af4d4eb89105d3fb0659264c6538799e112c7f9");
            buyerAccount.setText(buyerAccountResult);
            buyerAccount.setTextSize(10);

            buyerAccount.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View v) {
                    Bundle bundle = new Bundle();

                    bundle.putString("buyerId", String.valueOf(resBoardSubmitParam.getBoard().getBuyer()));

                    memberInfoFragment.setArguments(bundle);

                    fragTransaction.replace(R.id.frame,memberInfoFragment);
                    fragTransaction.commit();
                }
            });
            //운송장 번호 등록
            sellerBtn.setText("운송장 번호 등록");
            sellerBtn.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View v) {

                    sellerBtn.setText("운송장 등록중...");
                     try {
                        Log.d("resBoardSubmitParam", reqTask.get());

                        Credentials credentials = WalletUtils.loadCredentials(auto.getString("userPw",null),auto.getString("credentials",null));

                        Escrow_ssafy escrow_ssafy = Escrow_ssafy.load(resBoardSubmitParam.getBoard().getContract_id(),web3j,credentials,new DefaultGasProvider());
                        Log.d("sendItem",credentials.toString());
                        Log.d("sendItem",auto.getString("userPw",null));
                        Log.d("sendItem",auto.getString("credentials",null));
                        Log.d("sendItem",resBoardSubmitParam.getBoard().getContract_id());

                        fragTransaction.replace(R.id.frame,registerDeliveryFragment);
                        fragTransaction.commit();

                        escrow_ssafy.sendItem().sendAsync().get();

                     reqTask = new SendRequestTask();
                     reqTask.execute(serverIP,"api/board/update?boardid=" + resBoardSubmitParam.getBoard().getBoard_id() + "&state="+ 3, "GET");

                    } catch (Exception e) {
                        e.printStackTrace();
                    }
//                    builder.setPositiveButton("등록", new DialogInterface.OnClickListener() {
//                        @Override
//                        public void onClick(DialogInterface dialog, int which) {
//                            reqTask = new SendRequestTask();
//                            reqTask.execute("http://163.239.200.201:8080","api/board/update?boardid=" + resBoardSubmitParam.getBoard().getBoard_id() + "&state="+ 3, "GET");
//
//
//                            try {
//                                Log.d("resBoardSubmitParam", reqTask.get());
//
//                                Credentials credentials = WalletUtils.loadCredentials(auto.getString("userPw",null),auto.getString("credentials",null));
//
//                                Escrow_ssafy escrow_ssafy = Escrow_ssafy.load(resBoardSubmitParam.getBoard().getContract_id(),web3j,credentials,new DefaultGasProvider());
//                                Log.d("sendItem",credentials.toString());
//                                Log.d("sendItem",auto.getString("userPw",null));
//                                Log.d("sendItem",auto.getString("credentials",null));
//                                Log.d("sendItem",resBoardSubmitParam.getBoard().getContract_id());
//
//                                fragManager = getFragmentManager();
//                                fragTransaction = fragManager.beginTransaction();
//
//                                fragTransaction.replace(R.id.frame,sellerMainFragment);
//                                fragTransaction.commit();
//
//                                escrow_ssafy.sendItem().sendAsync().get();
//
//                            } catch (Exception e) {
//                                e.printStackTrace();
//                            }
//                        }
//                    }).setNegativeButton("아니오", new DialogInterface.OnClickListener() {
//                        @Override
//                        public void onClick(DialogInterface dialog, int which) {
//                            if (dialog != null) {
//                                dialog.dismiss();
//                                dialog = null;
//                            }
//                        }
//                    }).show();
                }
            });

        }else if(boardState == 3){
            //정상거래 버튼삭제
            sellerBtn.setText("배송중");
        }
        else if(boardState == 4){
            //정상거래 버튼삭제
            sellerBtn.setText("거래완료");
        }else if(boardState == 5){
            //신고 - 소명자료 연락처 기입
            sellerBtn.setText("e-mail : admin@junggo.com 으로\n소명자료를 보내 주세요");
            sellerBtn.setTextSize(15);
        }
        return view;
    }
}
