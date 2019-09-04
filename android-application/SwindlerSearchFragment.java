package com.example.ssafy_book;

import android.annotation.SuppressLint;
import android.app.Fragment;
import android.app.FragmentManager;
import android.app.FragmentTransaction;
import android.graphics.Color;
import android.os.Bundle;
import android.util.Log;
import android.view.Gravity;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.AdapterView;
import android.widget.ArrayAdapter;
import android.widget.TableLayout;
import android.widget.TableRow;
import android.widget.TextView;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.ExecutionException;

import me.kalriz.checkmate.app.model.AccountModel;
import me.kalriz.checkmate.app.model.BoardModel;
import me.kalriz.checkmate.app.params.ResBoardListInfoParam;

public class SwindlerSearchFragment extends Fragment {
    View view;
    String serverIP;

    TextView textView;

    TextView text1, text2, text3;

    FragmentTransaction fragTransaction;
    FragmentManager fragManager;

    private SendRequestTask reqTask = null;

    String searchId;

    List<AccountModel> list;

    int userCount = 0;
    @SuppressLint("SetTextI18n")
    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container, Bundle savedInstanceState) {
        view = inflater.inflate(R.layout.fragment_swindler_search, container, false);

        serverIP = "http://172.18.101.49:8080";

        textView = view.findViewById(R.id.search_id);

        text1 = view.findViewById(R.id.text1);
        text2 = view.findViewById(R.id.title);
        text3 = view.findViewById(R.id.state);

        Bundle bundle = getArguments();
        String pp = "";
        if(bundle != null){
            searchId = bundle.getString("swindlerId");
        }

        String searchResult = searchId + "검색 결과";
        textView.setText(searchResult);

        TableRow.LayoutParams rowLayout = new TableRow.LayoutParams(TableRow.LayoutParams.MATCH_PARENT, TableRow.LayoutParams.MATCH_PARENT);
        TableLayout.LayoutParams tableLayoutParams = new TableLayout.LayoutParams(TableLayout.LayoutParams.MATCH_PARENT,TableLayout.LayoutParams.MATCH_PARENT);

        reqTask = new SendRequestTask();
        reqTask.execute(serverIP, "/api/report/search?email=" + searchId, "GET");

        //DB에서 신고수 조회


        Gson gson = new Gson();
        try {
            list = gson.fromJson(reqTask.get(), new TypeToken<List<BoardModel>>(){}.getType());

            Log.d("listSize", String.valueOf(list.size()));

            text1.setText(searchId);
            text1.setTextColor(Color.BLACK);
            text2.setText(list.get(0).getAccount_id());
            text2.setTextColor(Color.BLACK);
            Log.d("listSize",list.get(0).getEmail());
            text3.setText(list.get(0).getEth_id());
            text3.setTextColor(Color.BLACK);
        } catch (Exception e) {
            Log.d("swindlerEvent",e.toString());
        }

        return view;
    }
}
