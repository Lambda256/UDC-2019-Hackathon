package com.example.ssafy_book;

import android.app.Fragment;
import android.content.Context;
import android.os.Bundle;

import android.support.v7.widget.LinearLayoutManager;
import android.support.v7.widget.RecyclerView;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;

import com.google.gson.Gson;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.ExecutionException;

import me.kalriz.checkmate.app.model.BoardModel;
import me.kalriz.checkmate.app.params.ResBoardSearchParam;

public class SearchResultFragment extends Fragment {

    private RecyclerView recyclerView;
    private RecyclerView.Adapter mAdapter;

    private SendRequestTask reqTask = null;

    LinearLayoutManager layoutManager;
    View view;

    TextView searchResult;
    TextView countResult;

    List<BoardModel> list;

    ResBoardSearchParam resBoardSearchParam;

    String serverIP;

    int idAccount, boardId;
    int count = 0; //검색결과 데이터 수

    String context_title;

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        // Inflate the layout for this fragment
        view = inflater.inflate(R.layout.fragment_search_result, container, false);

        serverIP = "http://172.18.101.49:8080";

        list = new ArrayList<>();

        recyclerView = view.findViewById(R.id.my_recycler_view);
        layoutManager = new LinearLayoutManager(getActivity().getApplicationContext());

        recyclerView.setHasFixedSize(true);
        recyclerView.setLayoutManager(layoutManager);

        searchResult = (TextView)view.findViewById(R.id.search_result);

        Bundle bundle = getArguments();
        String param = " ";

        if(bundle!= null){
            param = bundle.getString("searchData");

            String searchUrl = "api/board/search?title=" + param;

            reqTask = new SendRequestTask();
            reqTask.execute(serverIP,searchUrl, "GET");
        }

        searchResult.setText(param);

        List<CardViewItem> cardViews = new ArrayList<>();

        CardViewItem[] cardView = new CardViewItem[1000];

        try {
            Gson gson = new Gson();

            resBoardSearchParam = gson.fromJson(reqTask.get(), ResBoardSearchParam.class);

        } catch (Exception e) {
            e.printStackTrace();
        }

        list = resBoardSearchParam.getBoardList();

        //adapter부분(데이터 갯수만큼 추가)
        countResult = view.findViewById(R.id.count_result);
        countResult.setText("관련 검색 결과(" + Integer.toString(list.size()) + "건)");

        for(int i = 0; i < list.size(); i++){
            context_title = list.get(i).getTitle();
            boardId = list.get(i).getBoard_id();
            int state = list.get(i).getState();
            if(state == 1 || state == 0){
                cardView[i] = new CardViewItem(R.drawable.book,context_title,"판매중",boardId);
            }else if(state == 2 || state == 3){
                cardView[i] = new CardViewItem(R.drawable.book,context_title,"거래중",boardId);
            }else if(state == 4){
                cardView[i] = new CardViewItem(R.drawable.book,context_title,"거래 완료",boardId);
            }else if(state == 5){
                cardView[i] = new CardViewItem(R.drawable.book,context_title,"신고된 게시물",boardId);
            }
        }

        for(int i = 0; i < list.size(); i++) {
            cardViews.add(cardView[i]);
        }


        recyclerView.setAdapter(new RecyclerAdapter(getActivity().getApplicationContext(),cardViews,R.layout.fragment_search_result));

        return view;
    }
}
