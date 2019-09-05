package com.example.ssafy_book;

import android.app.Fragment;
import android.graphics.Color;
import android.os.Bundle;
import android.support.annotation.Nullable;
import android.view.Gravity;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TableLayout;
import android.widget.TableRow;
import android.widget.TextView;

import com.google.gson.Gson;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.ExecutionException;

import me.kalriz.checkmate.app.model.BoardModel;
import me.kalriz.checkmate.app.params.ResBoardListInfoParam;

public class MemberInfoFragment extends Fragment {
    View view;

    TextView memberId,report_count,account; //사용자 id, 누적신고횟수, 사용자 계정(이더 어카운트)

    private SendRequestTask reqTask = null;

    List<BoardModel> list;

    TableLayout tableLayout;

    TextView[] tvArray;

    String serverIP;

    @Override
    public View onCreateView(LayoutInflater inflater, @Nullable ViewGroup container, Bundle savedInstanceState) {
        view = inflater.inflate(R.layout.fragment_member_info,container,false);

        serverIP = "http://172.18.101.49:8080";

        list = new ArrayList<>();

        TableRow.LayoutParams rowLayout = new TableRow.LayoutParams(TableRow.LayoutParams.MATCH_PARENT, TableRow.LayoutParams.MATCH_PARENT);
        TableLayout.LayoutParams tableLayoutParams = new TableLayout.LayoutParams(TableLayout.LayoutParams.MATCH_PARENT,TableLayout.LayoutParams.MATCH_PARENT);

        memberId = view.findViewById(R.id.member_id);
        report_count = view.findViewById(R.id.report_count);
        account = view.findViewById(R.id.account);

        Bundle bundle = getArguments();
        String buyerId = " ";

        if(bundle!= null){
            buyerId = bundle.getString("buyerId");

            reqTask = new SendRequestTask();
            reqTask.execute(serverIP,"/api/board/search?buyerid=" + buyerId, "GET");

            Gson gson = new Gson();

            try {
                ResBoardListInfoParam resBoardListInfoParam = gson.fromJson(reqTask.get(), ResBoardListInfoParam.class);

                list = resBoardListInfoParam.getBoardList();

                TableRow row[] = new TableRow[list.size()];
                tvArray = new TextView[list.size() * 3];

                for(int i = 0 ;i<list.size();i++){
                    row[i] = new TableRow(view.getContext());

                    tvArray[i * 3] = new TextView(view.getContext());
                    tvArray[i * 3].setText("2018/09/09");
                    tvArray[i * 3].setTextColor(Color.BLACK);
                    tvArray[i * 3].setGravity(Gravity.CENTER);
                    tvArray[i * 3].setWidth(400);

                    tvArray[(i * 3) + 1] = new TextView(view.getContext());
                    tvArray[(i * 3) + 1].setText(list.get(i).getTitle());
                    tvArray[(i * 3) + 1].setTextColor(Color.BLACK);
                    tvArray[(i * 3) + 1].setGravity(Gravity.CENTER);
                    tvArray[(i * 3) + 1].setWidth(410);


                    tvArray[(i * 3) + 2] = new TextView(view.getContext());

                    if(list.get(i).getState() == 2){
                        tvArray[(i * 3) + 2].setText("결제 완료");
                    }else if(list.get(i).getState() == 3){
                        tvArray[(i * 3) + 2].setText("구매 확정");
                        tvArray[(i * 3) + 2].setTextColor(Color.RED);
                    }else if(list.get(i).getState() == 4){
                        tvArray[(i * 3) + 2].setText("거래 완료");
                    }

                    tvArray[(i * 3) + 2].setTextColor(Color.BLACK);
                    tvArray[(i * 3) + 2].setGravity(Gravity.CENTER);
                    tvArray[(i * 3) + 2].setWidth(290);

                    row[i].addView(tvArray[i*3]);
                    row[i].addView(tvArray[(i*3)+1]);
                    row[i].addView(tvArray[(i*3)+2]);

                    tableLayout.addView(row[i],rowLayout);
                }
            } catch (Exception e) {
                e.printStackTrace();
            }
        }

        return view;
    }
}
