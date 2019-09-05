package com.example.ssafy_book;

import android.app.Fragment;
import android.app.FragmentManager;
import android.app.FragmentTransaction;
import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.AdapterView;
import android.widget.ArrayAdapter;
import android.widget.Button;
import android.widget.Spinner;

import java.util.ArrayList;

public class RegisterDeliveryFragment extends Fragment {

    Button deliveryBtn;

    FragmentManager fragManager;
    FragmentTransaction fragTransaction;

    SellerMainFragment sellerMainFragment;

    View view;
    public View onCreateView(LayoutInflater inflater, ViewGroup container, Bundle savedInstanceState) {
        view = inflater.inflate(R.layout.fragment_register_delivery, container, false);
        deliveryBtn = view.findViewById(R.id.delivery_regist);

        sellerMainFragment = new SellerMainFragment();

        deliveryBtn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                fragManager = getFragmentManager();
                fragTransaction = fragManager.beginTransaction();

                fragTransaction.replace(R.id.frame,sellerMainFragment);
                fragTransaction.commit();
            }
        });

        return view;
    }
}
