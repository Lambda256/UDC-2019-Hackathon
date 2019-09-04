package com.example.ssafy_book;

import android.app.Activity;

import android.app.FragmentManager;
import android.app.FragmentTransaction;
import android.os.Bundle;

import android.support.annotation.NonNull;
import android.support.design.widget.BottomNavigationView;
import android.view.MenuItem;
import android.widget.CompoundButton;
import android.widget.FrameLayout;
import android.widget.Switch;
import android.widget.TextView;

public class MainActivity extends Activity{

    FragmentTransaction tran;

    FragmentManager frag;

    BuyerMainFragment buyerMainFragment;
    SellerMainFragment sellerMainFragment;
    MyPageFragment myPageFragment;
    SwindlerFragment swindlerFragment;
    BookmarkFragment bookmarkFragment;

    BottomNavigationView bottomNavigationView;

    FrameLayout frameLayout;

    Switch changeSwitch;

    TextView textView;


    static public boolean switchCheck;

    protected  void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        //기본 홈 : 구매자 화면
        switchCheck = false;

        textView = findViewById(R.id.textView);
        changeSwitch = findViewById(R.id.change_switch);
        frameLayout = findViewById(R.id.frame);

        changeSwitch.setOnCheckedChangeListener(new CompoundButton.OnCheckedChangeListener() {
            @Override
            public void onCheckedChanged(CompoundButton buttonView, boolean isChecked) {
                if(!isChecked){
                    switchCheck = false;
                    setFrag(0);
                }else{
                    switchCheck = true;
                    setFrag(4);
                }
            }
        });

        bottomNavigationView = (BottomNavigationView) findViewById(R.id.bottom_navigation);
        bottomNavigationView.setOnNavigationItemSelectedListener(new BottomNavigationView.OnNavigationItemSelectedListener() {
            @Override
            public boolean onNavigationItemSelected(@NonNull MenuItem item) {
                switch (item.getItemId()) {
                    case R.id.home_img:
                        if(switchCheck){
                            setFrag(4);
                        }else{
                            setFrag(0);
                        }
                        break;
                    case R.id.star_img:
                        setFrag(1);
                        break;
                    case R.id.siren_img:
                        setFrag(2);
                        break;
                    case R.id.user_img:
                        setFrag(3);
                        break;
                }
                return true;
            }
        });

        buyerMainFragment = new BuyerMainFragment();
        sellerMainFragment = new SellerMainFragment();
        myPageFragment = new MyPageFragment();
        swindlerFragment = new SwindlerFragment();
        bookmarkFragment = new BookmarkFragment();

        setFrag(0);
    }


    public void setFrag(int n){
        frag = getFragmentManager();
        tran = frag.beginTransaction();
        switch(n){
            case 0:
                if(switchCheck) {
                    tran.replace(R.id.frame, sellerMainFragment);
                    tran.commit();
                }else{
                    tran.replace(R.id.frame, buyerMainFragment);
                    tran.commit();
                }
                break;
            case 1:
                tran.replace(R.id.frame,bookmarkFragment);
                tran.commit();
                break;
            case 2:
                tran.replace(R.id.frame, swindlerFragment);
                tran.commit();
                break;
            case 3:
                tran.replace(R.id.frame, myPageFragment);
                tran.commit();
                break;
            case 4:
                tran.replace(R.id.frame, sellerMainFragment);
                tran.commit();
                break;
        }
    }

}
