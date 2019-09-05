package com.example.ssafy_book;

import android.app.Fragment;
import android.app.FragmentManager;
import android.app.FragmentTransaction;
import android.content.Context;
import android.content.SharedPreferences;
import android.os.Bundle;
import android.support.design.widget.FloatingActionButton;
import android.support.v7.widget.LinearLayoutManager;
import android.support.v7.widget.RecyclerView;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.LinearLayout;
import android.widget.Spinner;

import com.google.gson.Gson;

import org.json.JSONObject;

import java.util.ArrayList;
import java.util.List;

import me.kalriz.checkmate.app.model.BoardModel;
import me.kalriz.checkmate.app.params.ResBoardSearchParam;

public class SellerMainFragment extends Fragment {

    private RecyclerView sellerRecyclerView;
    private RecyclerView.Adapter mAdapter;

    FragmentManager fragManager;
    FragmentTransaction fragTransaction;

    SellBookFragment sellBookFragment;

    Spinner sellerSpinner;

    LinearLayout sellerEmptyLayout, sellerLayout;
    LinearLayoutManager layoutManager;

    FloatingActionButton addBookBtn;

    private SendRequestTask reqTask = null;

    SharedPreferences auto;

    String id, context_title;

    int idAccount, boardId;

    List<BoardModel> list;

    String serverIP;
    JSONObject jsonObject;
    View view;
    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        // Inflate the layout for this fragment
        view = inflater.inflate(R.layout.fragment_seller_main, container, false);

        serverIP = "http://172.18.101.49:8080";

        list = new ArrayList<>();

        sellBookFragment = new SellBookFragment();

        //데이터별 레이아웃(판매내역이 있는 경우 sellerLayout을 visible해주면 됩니다!)
        //default : sellerEmptyLayout visible
        sellerEmptyLayout = view.findViewById(R.id.seller_empty_linear);
        sellerLayout = view.findViewById(R.id.seller_layout);

        sellerSpinner = view.findViewById(R.id.seller_spinner);

        sellerRecyclerView = view.findViewById(R.id.seller_recycler_view);

        addBookBtn = view.findViewById(R.id.add_book_btn);

        auto = getActivity().getSharedPreferences("userData", Context.MODE_PRIVATE);

        idAccount = auto.getInt("idAccount",0);

        String searchUrl = "api/board/search?accountid=" + idAccount;

        reqTask = new SendRequestTask();
        reqTask.execute(serverIP,searchUrl, "GET");

        addBookBtn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                //버튼 클릭시 판매도서등록 페이지로 이동
                fragManager = getFragmentManager();
                fragTransaction = fragManager.beginTransaction();

                fragTransaction.replace(R.id.frame,sellBookFragment);
                fragTransaction.addToBackStack(null);
                fragTransaction.commit();

            }
        });

        //서버에서 판매자가 등록한 글을 조회해서 카드뷰 추가(갯수만큼)
        layoutManager = new LinearLayoutManager(getActivity().getApplicationContext());

        sellerRecyclerView.setHasFixedSize(true);
        sellerRecyclerView.setLayoutManager(layoutManager);

        List<CardViewItem> cardViews = new ArrayList<>();

        CardViewItem[] cardView = new CardViewItem[1000];


        try {
            Gson gson = new Gson();
            ResBoardSearchParam resBoardSearchParam = gson.fromJson(reqTask.get(), ResBoardSearchParam.class);

            list = resBoardSearchParam.getBoardList();

            for(int i = 0; i < list.size(); i++){

                context_title = list.get(i).getTitle();
                boardId = list.get(i).getBoard_id();
                int state = list.get(i).getState();

                if(state == 1 || state == 0){
                    cardView[i] = new CardViewItem(R.drawable.book,context_title,"판매중",boardId);
                }else if(state == 2){
                    cardView[i] = new CardViewItem(R.drawable.book,context_title,"결제완료",boardId);
                }else if(state == 3){
                    cardView[i] = new CardViewItem(R.drawable.book,context_title,"배송중",boardId);
                }else if(state == 4){
                    cardView[i] = new CardViewItem(R.drawable.book,context_title,"거래 완료",boardId);
                }else if(state == 5){
                    cardView[i] = new CardViewItem(R.drawable.book,context_title,"신고",boardId);
                }

            }

        } catch (Exception e) {
            e.printStackTrace();
        }

        for(int i = 0; i<list.size();i++) {
            cardViews.add(cardView[i]);
        }

        sellerRecyclerView.setAdapter(new RecyclerAdapter(getActivity().getApplicationContext(),cardViews, R.layout.fragment_search_result));

        return view;
    }


}
