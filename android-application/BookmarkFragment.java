package com.example.ssafy_book;

import android.app.Fragment;
import android.graphics.Color;
import android.os.Bundle;
import android.support.v7.widget.LinearLayoutManager;
import android.support.v7.widget.RecyclerView;
import android.text.TextUtils;
import android.util.Log;
import android.view.Gravity;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TableLayout;
import android.widget.TableRow;
import android.widget.TextView;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;

import org.web3j.protocol.Web3j;
import org.web3j.protocol.admin.Admin;
import org.web3j.protocol.http.HttpService;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.ExecutionException;

import jnr.ffi.Struct;
import me.kalriz.checkmate.app.model.AccountModel;
import me.kalriz.checkmate.app.model.BoardModel;
import me.kalriz.checkmate.app.params.ResBoardListInfoParam;

public class BookmarkFragment extends Fragment {
    private RecyclerView recyclerView;
    private RecyclerView.Adapter mAdapter;

    private SendRequestTask reqTask = null;

    String serverIP;

    TableLayout tableLayout;
    View view;

    Web3j web3j;
    Admin admin;

    String URL;
    String contractInfo, IDinfo;
    TextView[] tvArray;

    List<ResBoardContractIDInfo> list;

    int count = 0; //검색결과 데이터 수
    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        // Inflate the layout for this fragment
        view = inflater.inflate(R.layout.fragment_bookmark, container, false);

//        URL = "http://172.18.101.49:8545";
//
//        web3j = Web3j.build(new HttpService(URL));
//        admin = Admin.build(new HttpService(URL));
//
//        tableLayout = view.findViewById(R.id.history_table);
//
//        serverIP = "http://172.18.101.49:8080";
//        TableRow.LayoutParams rowLayout = new TableRow.LayoutParams(TableRow.LayoutParams.MATCH_PARENT, TableRow.LayoutParams.MATCH_PARENT);
//        TableLayout.LayoutParams tableLayoutParams = new TableLayout.LayoutParams(TableLayout.LayoutParams.MATCH_PARENT,TableLayout.LayoutParams.MATCH_PARENT);
//
//        Gson gson = new Gson();
//
//        try {
//            reqTask = new SendRequestTask();
//            reqTask.execute(serverIP,"/api/board/search/contract/detail", "GET");
//            contractInfo = reqTask.get();
//
//
//
//           list = gson.fromJson(contractInfo, new TypeToken<List<ResBoardContractIDInfo>>(){}.getType());
//
//            Log.d("test001", String.valueOf(list.size()));
//
//            TableRow row[] = new TableRow[list.size()];
//            tvArray = new TextView[list.size() * 2];
//
//            //account id로 id도 받아와야함
//            for(int i = 0; i < list.size(); i++) {
//                row[i] = new TableRow(view.getContext());
//
//                reqTask = new SendRequestTask();
//                reqTask.execute(serverIP,"/api/membership/search?account_id=" + list.get(i).getAccountID(), "GET");
//                IDinfo = reqTask.get();
//
//
//                AccountModel accountModel = gson.fromJson(IDinfo,AccountModel.class);
//
//
//                Log.d("test001",accountModel.getEmail());
//
//
//                tvArray[i * 2] = new TextView(view.getContext());
//                tvArray[i * 2].setText(accountModel.getEmail());
//                tvArray[i * 2].setTextColor(Color.BLACK);
//                tvArray[i * 2].setGravity(Gravity.CENTER);
//
//
//                tvArray[(i * 2) + 1] = new TextView(view.getContext());
//                tvArray[(i * 2) + 1].setText(list.get(i).getContractID());
//                tvArray[(i * 2) + 1].setTextColor(Color.BLACK);
//                tvArray[(i * 2) + 1].setGravity(Gravity.CENTER);
//                tvArray[(i * 2) + 1].setTextIsSelectable(true);
//                tvArray[(i * 2) + 1].setMaxLines(1);
//                tvArray[(i * 2) + 1].setEllipsize(TextUtils.TruncateAt.END);
//                Log.d("textViewTest",    tvArray[(i * 2) + 1].getText().toString());
//
//                row[i].addView(tvArray[i*2]);
//                row[i].addView(tvArray[(i*2)+1]);
//
//                row[i].setMinimumWidth(tableLayout.getWidth());
//                row[i].setMinimumHeight(tableLayout.getWidth());
//
//                tableLayout.addView(row[i],rowLayout);
//            }
//        } catch (Exception e) {
//            e.printStackTrace();
//        }

        return view;
    }
}
