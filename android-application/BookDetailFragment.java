package com.example.ssafy_book;

import android.app.Fragment;
import android.app.FragmentManager;
import android.app.FragmentTransaction;
import android.content.SharedPreferences;
import android.graphics.Color;
import android.support.annotation.ColorInt;
import android.support.annotation.Nullable;
import android.os.Bundle;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.ImageView;
import android.widget.LinearLayout;
import android.widget.TextView;

import org.web3j.protocol.Web3j;
import org.web3j.protocol.http.HttpService;
import com.google.gson.Gson;

import me.kalriz.checkmate.app.params.ResBoardSubmitParam;
import me.kalriz.checkmate.app.params.ResLoginInfoParam;

public class BookDetailFragment extends Fragment {

    View view;

    LinearLayout imgLinear;

    Button buy_btn;
    //결제하기 프래그먼트 호출
    EscrowFragment escrowFragment;
    //회원 상세 프래그먼트 호출(MemberInfo)
    MemberInfoFragment memberInfoFragment;
    FragmentManager fragManager;
    FragmentTransaction fragTransaction;

    TextView bookDetailText,sellerId,productName,productPrice;

    String URL;

    Web3j web3j;

    private SendRequestTask reqTask = null;

    //상품명, 상품금액 전달
    Bundle bundle = new Bundle(2);
    String seller_email = "";
    String product_name = "";
    String product_price = "";
    String contractId = "";

    String serverIP;

    int boardAccount;
    int boardId;

    @Override
    public View onCreateView(LayoutInflater inflater, @Nullable ViewGroup container,
                             Bundle savedInstanceState) {
        // Inflate the layout for this fragment
        view = inflater.inflate(R.layout.fragment_book_detail, container, false);

        serverIP =  "http://172.18.101.49:8080";
        URL = "http://172.18.101.49:8545";

        savedInstanceState = getArguments();
        boardAccount = savedInstanceState.getInt("boardAccount");
        Log.d("boardAccount", String.valueOf(boardAccount));

        web3j = Web3j.build(new HttpService(URL));

        imgLinear = view.findViewById(R.id.image_linear);
        bookDetailText = view.findViewById(R.id.book_detail_text_view);
        sellerId = view.findViewById(R.id.seller_id);
        productName = view.findViewById(R.id.product_name);
        productPrice = view.findViewById(R.id.product_price);
        buy_btn = view.findViewById(R.id.buy_btn);


        //이미지 필요한 만큼 반복해서 생성하면 됩니다!
//        for (int i = 0; i < 1; i++) {
//            ImageView imgView = new ImageView(getActivity());
//            imgView.setLayoutParams(new LinearLayout.LayoutParams(LinearLayout.LayoutParams.MATCH_PARENT, LinearLayout.LayoutParams.MATCH_PARENT));
//            imgView.setImageResource(R.drawable.book);
//
//            imgLinear.addView(imgView);
//        }

        //DB에서 데이터 가져오기
        try {
            String boardInfo = null;
            String sellerInfo = null;
            Gson gson = new Gson();

            reqTask = new SendRequestTask();
            reqTask.execute(serverIP, "api/board/search?id=" + boardAccount, "GET");
            boardInfo = reqTask.get();

            reqTask = new SendRequestTask();
            reqTask.execute(serverIP, "api/board/seller?boardid=" + boardAccount, "GET");
            sellerInfo = reqTask.get();

            ResBoardSubmitParam board = gson.fromJson(boardInfo, ResBoardSubmitParam.class);
            ResLoginInfoParam seller = gson.fromJson(sellerInfo, ResLoginInfoParam.class);

            productName.setText(board.getBoard().getTitle());
            productPrice.setText(Integer.toString(board.getBoard().getPrice()));
            bookDetailText.setText(board.getBoard().getContents());

            //에스크로로 값넘기기(상품명, 상품가격)
            product_name = board.getBoard().getTitle();
            product_price = Integer.toString(board.getBoard().getPrice());
            contractId = board.getBoard().getContract_id();
            boardId = board.getBoard().getBoard_id();

            //판매자 ID
            seller_email = seller.getAccount().getEmail();
            sellerId.setText(seller_email);

            if(board.getBoard().getState() == 2 || board.getBoard().getState() == 3){

                buy_btn.setText("거래중");
                buy_btn.setBackgroundColor(Color.argb(0,213,213,213));
                buy_btn.setClickable(false);

            }else if(board.getBoard().getState() == 4){

                buy_btn.setText("거래 완료");
                buy_btn.setBackgroundColor(Color.argb(0,213,213,213));
                buy_btn.setClickable(false);

                //정상거래시 보상지급
                MyPageFragment myPageFragment = new MyPageFragment();
                myPageFragment.bonusRSC += 10;

            }else if(board.getBoard().getState() == 5){

                buy_btn.setText("신고된 게시물");
                buy_btn.setBackgroundColor(Color.RED);
                buy_btn.setClickable(false);

            }else{
                escrowFragment  = new EscrowFragment();
                buy_btn.setOnClickListener(new View.OnClickListener() {
                    @Override
                    public void onClick(View view) {
                        fragManager = getFragmentManager();
                        fragTransaction = fragManager.beginTransaction();
                        fragTransaction.replace(R.id.frame,escrowFragment);
                        //상품명, 상품가격 넘기기
                        bundle.putString("productName",product_name);
                        bundle.putString("productPrice",product_price);
                        bundle.putString("contractId",contractId);
                        bundle.putInt("boardId",boardId);

                        escrowFragment.setArguments(bundle);
                        fragTransaction.addToBackStack(null);
                        fragTransaction.commit();
                    }
                });
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        //판매자 ID 클릭하면 판매자 정보페이지로
        memberInfoFragment = new MemberInfoFragment();
        sellerId.setOnClickListener(new View.OnClickListener(){
            @Override
            public void onClick(View view) {
                fragManager = getFragmentManager();
                fragTransaction = fragManager.beginTransaction();
                fragTransaction.replace(R.id.frame,memberInfoFragment);
                fragTransaction.addToBackStack(null);
                fragTransaction.commit();
            }
        });
        //결제화면
        return view;
    }
}
