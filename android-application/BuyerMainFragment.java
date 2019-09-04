package com.example.ssafy_book;

import android.app.Fragment;
import android.app.FragmentManager;
import android.app.FragmentTransaction;
import android.content.Intent;
import android.os.Bundle;

import android.app.Activity;
import android.support.annotation.Nullable;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.EditText;
import android.widget.ImageView;

public class BuyerMainFragment extends Fragment {


    FragmentManager fragManager;
    FragmentTransaction fragTransaction;

    SearchResultFragment searchResultFragment;

    EditText searchEdit;
    ImageView searchImg;
    //검색값 전달
    Bundle bundle = new Bundle(1);

    View view;

    @Override
    public View onCreateView(LayoutInflater inflater, @Nullable ViewGroup container,
                             Bundle savedInstanceState) {
        // Inflate the layout for this fragment
        view = inflater.inflate(R.layout.fragment_buyer_main,container, false);

        searchEdit = view.findViewById(R.id.search_edit);
        searchImg = view.findViewById(R.id.search_img);

        searchResultFragment = new SearchResultFragment();

        searchImg.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                //검색 버튼 누르면 결과 리스트 생성
                fragManager = getFragmentManager();
                fragTransaction = fragManager.beginTransaction();
                fragTransaction.replace(R.id.frame,searchResultFragment);

                //결과값 넘기기
                bundle.putString("searchData",searchEdit.getText().toString());
                searchResultFragment.setArguments(bundle);
                fragTransaction.addToBackStack(null);
                fragTransaction.commit();
            }
        });

        return view;
    }
}
