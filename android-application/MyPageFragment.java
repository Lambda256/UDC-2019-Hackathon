package com.example.ssafy_book;

import android.annotation.SuppressLint;
import android.app.AlertDialog;
import android.app.Fragment;
import android.content.Context;
import android.content.DialogInterface;
import android.content.Intent;
import android.content.SharedPreferences;
import android.graphics.Color;
import android.os.Bundle;
import android.text.Layout;
import android.util.Log;
import android.view.Gravity;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.TableLayout;
import android.widget.TableRow;
import android.widget.TextView;
import android.widget.Toast;


import com.google.gson.Gson;

import org.w3c.dom.Text;
import org.web3j.crypto.Credentials;
import org.web3j.crypto.WalletUtils;
import org.web3j.protocol.Web3j;
import org.web3j.protocol.admin.Admin;
import org.web3j.protocol.core.DefaultBlockParameterName;
import org.web3j.protocol.core.methods.response.EthGetBalance;
import org.web3j.protocol.http.HttpService;
import org.web3j.tx.gas.DefaultGasProvider;
import org.web3j.utils.Convert;

import java.math.BigInteger;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.ExecutionException;

import me.kalriz.checkmate.app.model.BoardModel;
import me.kalriz.checkmate.app.params.ResBoardListInfoParam;
import me.kalriz.checkmate.app.params.ResBoardSearchParam;
import me.kalriz.checkmate.app.params.ResBoardSubmitParam;

public class MyPageFragment extends Fragment implements View.OnClickListener {

    Button  addCoinBtn;

    TextView ethAccountTxt, ethBalanceTxt, rewardText;
    TextView[] tvArray;

    String ethAccount, userPw, dirPath;
    String URL;

    BigInteger ethBalance;

    Button logoutBtn;

    TableLayout tableLayout;

    View view;

    Web3j web3j;
    Admin admin;

    public static int bonusRSC = 0;
    int accountId;

    List<BoardModel> list;

    private SendRequestTask reqTask = null;

    SharedPreferences auto;

    String serverIP;
    @SuppressLint("SetTextI18n")
    public View onCreateView(LayoutInflater inflater, ViewGroup container, Bundle savedInstanceState){
        view = inflater.inflate(R.layout.fragment_mypage,container,false);

        serverIP = "http://172.18.101.49:8080";

        URL = "http://172.18.101.49:8545";

        web3j = Web3j.build(new HttpService(URL));
        admin = Admin.build(new HttpService(URL));

        list = new ArrayList<>();

        TableRow.LayoutParams rowLayout = new TableRow.LayoutParams(TableRow.LayoutParams.MATCH_PARENT, TableRow.LayoutParams.MATCH_PARENT);
        TableLayout.LayoutParams tableLayoutParams = new TableLayout.LayoutParams(TableLayout.LayoutParams.MATCH_PARENT,TableLayout.LayoutParams.MATCH_PARENT);

        tableLayout = view.findViewById(R.id.buy_history_table);

        addCoinBtn = view.findViewById(R.id.add_coin_btn);
        logoutBtn = view.findViewById(R.id.logout_btn);

        ethAccountTxt = view.findViewById(R.id.eth_account_txt);
        ethBalanceTxt = view.findViewById(R.id.eth_balance_txt);

        auto = getActivity().getSharedPreferences("userData", Context.MODE_PRIVATE);

        ethAccount = auto.getString("ethAccount",null);
        userPw = auto.getString("userPw",null);
        accountId = auto.getInt("idAccount",0);

        ethAccountTxt.setText(ethAccount);
        rewardText = view.findViewById(R.id.reward);

        try {
            EthGetBalance ethGetBalance = web3j.ethGetBalance(ethAccount, DefaultBlockParameterName.LATEST).sendAsync().get();
            BigInteger ethBalance = ethGetBalance.getBalance();

            Log.d("testToken",ethBalance.toString());
//            Convert.fromWei(ethBalance.toString(),Convert.Unit.ETHER);

            String resultEth = Convert.fromWei(ethBalance.toString(),Convert.Unit.ETHER).toString();
            double RSC = Double.parseDouble(resultEth);
            Log.d("RSC",String.valueOf(RSC));
            String RSC_string = String.valueOf(Math.ceil(RSC)) + " RSC";
            ethBalanceTxt.setText(RSC_string);
        } catch (Exception e) {
            e.printStackTrace();
        }

        //DB에서 사용자 id로 구매내역 받아서 table 추가

        reqTask = new SendRequestTask();
        reqTask.execute(serverIP,"/api/board/search?buyerid=" + accountId, "GET");

        Gson gson = new Gson();
        try {
            ResBoardListInfoParam resBoardListInfoParam = gson.fromJson(reqTask.get(), ResBoardListInfoParam.class);

            list = resBoardListInfoParam.getBoardList();

            Log.d("listSize", String.valueOf(list.size()));
            TableRow row[] = new TableRow[list.size()];
            tvArray = new TextView[list.size() * 3];

            for(int i = 0; i < list.size(); i++) {
                row[i] = new TableRow(view.getContext());

                tvArray[i * 3] = new TextView(view.getContext());
                tvArray[i * 3].setText("2019/09/05");
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
                    tvArray[(i * 3) + 2].setClickable(false);
                }else if(list.get(i).getState() == 3){
                    tvArray[(i * 3) + 2].setText("구매 결정");
                    tvArray[(i * 3) + 2].setTextColor(Color.RED);
                }else if(list.get(i).getState() == 4){
                    tvArray[(i * 3) + 2].setText("거래 완료");
                    tvArray[(i * 3) + 2].setClickable(false);
                }else if(list.get(i).getState() == 5){
                    tvArray[(i * 3) + 2].setText("신고 처리");
                    tvArray[(i * 3) + 2].setClickable(false);
                }
                else if(list.get(i).getState() == 6){
                    tvArray[(i * 3) + 2].setText("구매자 환불");
                    tvArray[(i * 3) + 2].setClickable(false);
                }else if(list.get(i).getState() == 7){
                    tvArray[(i * 3) + 2].setText("판매자 환불");
                    tvArray[(i * 3) + 2].setClickable(false);
                }

                tvArray[(i * 3) + 2].setTextColor(Color.BLACK);
                tvArray[(i * 3) + 2].setGravity(Gravity.CENTER);
                tvArray[(i * 3) + 2].setWidth(290);
                int finalI = i;
                AlertDialog.Builder builder = new AlertDialog.Builder(getActivity());

                tvArray[(i * 3) + 2].setOnClickListener(new View.OnClickListener() {
                    @Override
                    public void onClick(View v) {
                        //dialog추가
                      builder.setTitle("구매 확정").setNegativeButton("신고", new DialogInterface.OnClickListener() {
                          @Override
                          public void onClick(DialogInterface dialog, int which) {
                              //                              if(list.get(finalI).getState() == 3){
                              //                                  // 여기에 루니버스 토큰 교환 내용 추가
//                              String data = gson.toJson(new SideTokenTrensfer("0x7b824107128d4E81868d4920a650737c0B03E7ac", "0x9def2f6da697a9b0c58d21d8dc258107770627e2", "10.0"));
//
//                              reqTask.execute("https://api.luniverse.net/tx/v1.0/transactions/SimpleTransfer", data);

                              //여기서 컨트랙트 호출
                              Log.d("TableViewTest", String.valueOf(finalI));

                              reqTask = new SendRequestTask();
                              reqTask.execute(serverIP, "api/board/update?boardid=" + list.get(finalI).getBoard_id() + "&state=" + 5, "GET");

                              try {
                                  Log.d("resBoardSubmitParam", reqTask.get());

                                  Credentials credentials = WalletUtils.loadCredentials(userPw, auto.getString("credentials", null));

                                  Escrow_ssafy escrow_ssafy = Escrow_ssafy.load(list.get(finalI).getContract_id(), web3j, credentials, new DefaultGasProvider());
                                  Log.d("sendItem", credentials.toString());
                                  Log.d("sendItem", auto.getString("userPw", null));
                                  Log.d("sendItem", auto.getString("credentials", null));

                                  escrow_ssafy.siren().sendAsync();

                                  Toast.makeText(view.getContext(), "신고처리되었습니다.", Toast.LENGTH_LONG).show();

                              } catch (Exception e) {
                                  e.printStackTrace();
                              }
                          }
                      }).setPositiveButton("구매 확정", new DialogInterface.OnClickListener() {
                          @Override
                          public void onClick(DialogInterface dialog, int which) {
                              if(list.get(finalI).getState() == 3){
                                  //여기서 컨트랙트 호출
                                  Log.d("TableViewTest", String.valueOf(finalI));

                                  bonusRSC += 5;

                                  String reward = bonusRSC + " RSC";
                                  rewardText.setText(bonusRSC);

                                  reqTask = new SendRequestTask();
                                  reqTask.execute(serverIP,"api/board/update?boardid=" + list.get(finalI).getBoard_id() + "&state="+ 4, "GET");

                                  try {
                                      Log.d("resBoardSubmitParam", reqTask.get());

                                      Credentials credentials = WalletUtils.loadCredentials(userPw,auto.getString("credentials",null));

                                      Escrow_ssafy escrow_ssafy = Escrow_ssafy.load(list.get(finalI).getContract_id(),web3j,credentials,new DefaultGasProvider());
                                      Log.d("sendItem",credentials.toString());
                                      Log.d("sendItem",auto.getString("userPw",null));
                                      Log.d("sendItem",auto.getString("credentials",null));

                                      escrow_ssafy.confirmItem().sendAsync();

                                  } catch (Exception e) {
                                      e.printStackTrace();
                                  }
                              }
                          }
                      }).show();
                    }
                });
                row[i].addView(tvArray[i*3]);
                row[i].addView(tvArray[(i*3)+1]);
                row[i].addView(tvArray[(i*3)+2]);

                row[i].setMinimumWidth(tableLayout.getWidth());
                row[i].setMinimumHeight(tableLayout.getWidth());

                tableLayout.addView(row[i],rowLayout);
            }

        } catch (Exception e) {
            e.printStackTrace();
        }

        //코인충전버튼
        addCoinBtn.setOnClickListener(this);
        logoutBtn.setOnClickListener(this);

        return view;
    }

    @Override
    public void onClick(View view) {
        switch (view.getId()){
            case R.id.add_coin_btn:
                CoinPopup dialog = new CoinPopup();
                break;
            case R.id.logout_btn:
                SharedPreferences.Editor editor = auto.edit();
                editor.clear();

                editor.commit();

                Toast.makeText(getActivity(), "로그아웃되었습니다.", Toast.LENGTH_SHORT).show();

                Intent intent = new Intent(getActivity(), LoginActivity.class);
                startActivity(intent);

                break;
        }
    }

}
