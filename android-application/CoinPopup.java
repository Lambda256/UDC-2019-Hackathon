package com.example.ssafy_book;

import android.app.DialogFragment;
import android.app.Fragment;
import android.os.Bundle;
import android.support.v4.app.FragmentManager;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.AdapterView;
import android.widget.ArrayAdapter;
import android.widget.Spinner;

import java.util.ArrayList;

public class CoinPopup extends DialogFragment implements View.OnClickListener{

    Spinner spinner;
    View view;
    private Fragment fragment;

    public View onCreateView(LayoutInflater inflater, ViewGroup container, Bundle savedInstanceState) {
        view = inflater.inflate(R.layout.coin_popup, container, false);
        //부모프래그먼트 받기
//        fragment = getActivity().getSupportFragmentManager().findFragmentByTag("tag");
        //Spinner
        spinner = (Spinner) view.findViewById(R.id.spinner);
        spinner.setOnItemSelectedListener(new AdapterView.OnItemSelectedListener() {
            @Override
            public void onItemSelected(AdapterView<?> adapterView, View view, int i, long l) {
            }

            @Override
            public void onNothingSelected(AdapterView<?> adapterView) {

            }
        });
        ArrayList<String> items = new ArrayList<String>();
        items.add("1000Coin");
        items.add("5000Coin");
        items.add("10000Coin");
        items.add("50000Coin");
        items.add("100000Coin");
        items.add("500000Coin");
        items.add("1000000Coin");

        ArrayAdapter<String> adapter = new ArrayAdapter<String>(getActivity(),android.R.layout.simple_spinner_item,items);
        spinner.setAdapter(adapter);

        return view;
    }


    public void show(FragmentManager supportFragmentManager, String tag) {
    }

    @Override
    public void onClick(View view) {
        DialogFragment dialogFragment = (DialogFragment) fragment;
        dialogFragment.dismiss();
    }
}
