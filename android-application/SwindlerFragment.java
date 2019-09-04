package com.example.ssafy_book;

import android.annotation.SuppressLint;
import android.app.AlertDialog;
import android.app.Fragment;
import android.app.FragmentManager;
import android.app.FragmentTransaction;
import android.content.DialogInterface;
import android.graphics.Color;
import android.os.Bundle;
import android.util.Log;
import android.view.Gravity;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.AdapterView;
import android.widget.ArrayAdapter;
import android.widget.Button;
import android.widget.EditText;
import android.widget.ImageView;
import android.widget.Spinner;
import android.widget.TableLayout;
import android.widget.TableRow;
import android.widget.TextView;
import android.widget.Toast;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;

import org.web3j.crypto.Credentials;
import org.web3j.crypto.WalletUtils;
import org.web3j.tx.gas.DefaultGasProvider;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.ExecutionException;

import me.kalriz.checkmate.app.model.BoardModel;
import me.kalriz.checkmate.app.params.ResBoardListInfoParam;

public class SwindlerFragment extends Fragment {

    ImageView search;

    TextView swindler;
    TextView textView;

    EditText swindlerEdit;

    Spinner spinner;

    String swindlerId;

    String serverIP;
    int count = 0;

    List<ResBoardContractIDInfo> list;

    private SendRequestTask reqTask = null;

    FragmentManager fragManager;
    FragmentTransaction fragTransaction;

    SwindlerSearchFragment swindlerSearchFragment;
    View view;

    @SuppressLint("SetTextI18n")
    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container, Bundle savedInstanceState) {
        view = inflater.inflate(R.layout.fragment_swindler, container, false);

        swindlerSearchFragment = new SwindlerSearchFragment();

        serverIP = "http://172.18.101.49:8080";

        spinner = view.findViewById(R.id.spinner);
        search = view.findViewById(R.id.search_img);
        swindler = view.findViewById(R.id.report_count);
        swindlerEdit = view.findViewById(R.id.search);

        search.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {

                swindlerId = String.valueOf(swindlerEdit.getText());

                Bundle bundle = new Bundle(1);
                bundle.putString("swindlerId",swindlerId);

                fragManager = getFragmentManager();
                fragTransaction = fragManager.beginTransaction();

                swindlerSearchFragment.setArguments(bundle);

                fragTransaction.replace(R.id.frame,swindlerSearchFragment);
                fragTransaction.commit();
            }
        });
        //usercount로 표에 표시(id, account, 누적)

        try {
            reqTask = new SendRequestTask();
            reqTask.execute(serverIP,"/api/report/list","GET");

            Gson gson = new Gson();

            list = gson.fromJson(reqTask.get(), new TypeToken<List<ResBoardContractIDInfo>>(){}.getType());

            Log.d("test",String.valueOf(list.size()));
            count = list.size();

        } catch (Exception e) {
            e.printStackTrace();
        }

        //id를 기준으로 신고 count받아서 표시
        swindler.setText(count + "건");

        spinner.setOnItemSelectedListener(new AdapterView.OnItemSelectedListener() {
            @Override
            public void onItemSelected(AdapterView<?> adapterView, View view, int i, long l) {
            }

            @Override
            public void onNothingSelected(AdapterView<?> adapterView) {

            }
        });
        ArrayList<String> items = new ArrayList<String>();
        items.add("ID");

        ArrayAdapter<String> adapter = new ArrayAdapter<String>(getActivity(),android.R.layout.simple_spinner_item,items);
        spinner.setAdapter(adapter);
        return view;
    }
}
