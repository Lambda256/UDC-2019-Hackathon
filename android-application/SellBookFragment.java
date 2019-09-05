package com.example.ssafy_book;

import android.app.Fragment;
import android.app.FragmentManager;
import android.app.FragmentTransaction;
import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.os.Build;
import android.os.Bundle;
import android.support.annotation.RequiresApi;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.EditText;
import android.widget.ImageView;
import android.widget.LinearLayout;
import android.widget.TextView;

import com.google.gson.Gson;

import org.web3j.crypto.Credentials;
import org.web3j.crypto.WalletUtils;
import org.web3j.protocol.Web3j;
import org.web3j.protocol.http.HttpService;
import org.web3j.tx.gas.DefaultGasProvider;
import org.web3j.tx.gas.StaticGasProvider;

import java.io.InputStream;
import java.math.BigInteger;

import me.kalriz.checkmate.app.params.ReqBoardSubmitParam;
import me.kalriz.checkmate.app.params.ResBoardSubmitParam;

import static android.app.Activity.RESULT_OK;


public class SellBookFragment extends Fragment {

    EditText contentEdit, titleEdit, priceEdit;

    Button submitBtn;

    TextView getImageTxt;

    LinearLayout getimgLinear;

    String content, title, URL, credential, pw;

    int idAccount, price;

    SharedPreferences auto;

    private SendRequestTask reqTask = null;

    FragmentTransaction tran;

    FragmentManager frag;

    SellerMainFragment sellerMainFragment;

    Web3j web3j;

    String serverIP;

    View view;

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        // Inflate the layout for this fragment
        view = inflater.inflate(R.layout.fragment_sell_book, container, false);

        serverIP = "http://172.18.101.49:8080";

        URL = "http://172.18.101.49:8545";

        web3j = Web3j.build(new HttpService(URL));

        getimgLinear = view.findViewById(R.id.get_image_linear);

        contentEdit = view.findViewById(R.id.context_edit);
        titleEdit = view.findViewById(R.id.title_edit);
        priceEdit = view.findViewById(R.id.price_edit);

        getImageTxt = view.findViewById(R.id.get_img_txt);
        submitBtn = view.findViewById(R.id.submit_btn);

        sellerMainFragment = new SellerMainFragment();

        auto = getActivity().getSharedPreferences("userData", Context.MODE_PRIVATE);

        //이미지 등록 버튼 누르면 이미지 가져올 수 있음
        getImageTxt.setOnClickListener(new View.OnClickListener() {
            @RequiresApi(api = Build.VERSION_CODES.JELLY_BEAN_MR2)
            @Override
            public void onClick(View v) {
                getAlbum();
            }
        });

        //등록버튼 누르면 데이터 전송
        submitBtn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                //글 내용 서버로 전송

                title = titleEdit.getText().toString();
                content = contentEdit.getText().toString();
                idAccount = auto.getInt("idAccount",0);
                price = Integer.parseInt(priceEdit.getText().toString());

                pw = auto.getString("userPw",null);
                credential = auto.getString("credentials",null);

                submitBtn.setText("등록중....");
                submitBtn.setClickable(false);
                submitBtn.setEnabled(false);

                try {
                    Credentials credentials = WalletUtils.loadCredentials(pw,credential);

                    Escrow_ssafy escrow_ssafy = Escrow_ssafy.deploy(web3j,credentials,new DefaultGasProvider()).sendAsync().get();

                    Log.d("Contract Address : " , escrow_ssafy.getContractAddress());

                    Log.d("Escrow State : ", String.valueOf(escrow_ssafy.registrItem(BigInteger.valueOf(price)).sendAsync().get()));

                    ReqBoardSubmitParam reqBoardSubmitParam = new ReqBoardSubmitParam();

                    reqBoardSubmitParam.setTitle(title);
                    reqBoardSubmitParam.setContents(content);
                    reqBoardSubmitParam.setSeller(idAccount);
                    reqBoardSubmitParam.setPrice(price);
                    reqBoardSubmitParam.setContract_id(escrow_ssafy.getContractAddress());

                    Gson gson = new Gson();

                    reqTask = new SendRequestTask();
                    reqTask.execute(serverIP,"api/board/submit", "POST", gson.toJson(reqBoardSubmitParam));

                    ResBoardSubmitParam resBoardSubmitParam = gson.fromJson(reqTask.get(), ResBoardSubmitParam.class);
                    reqTask.execute(serverIP,"api/board/update?boardid=" + resBoardSubmitParam.getBoard().getBoard_id() + "&state="+ 1, "GET");

                } catch (Exception e) {
                    e.printStackTrace();
                }

                frag = getFragmentManager();
                tran = frag.beginTransaction();

                tran.replace(R.id.frame, sellerMainFragment);
                tran.commit();

            }
        });

        return view;
    }

    @RequiresApi(api = Build.VERSION_CODES.JELLY_BEAN_MR2)
    private void getAlbum(){
        try{

            Intent intent = new Intent();
            intent.setType("image/*");
            intent.putExtra(Intent.EXTRA_ALLOW_MULTIPLE, true);
            intent.setAction(Intent.ACTION_GET_CONTENT);
            startActivityForResult(intent, 1);

        }catch (Exception e){
            Log.d("imgError",e.toString());
        }
    }

    @RequiresApi(api = Build.VERSION_CODES.JELLY_BEAN)
    @Override
    public void onActivityResult(int requestCode, int resultCode, Intent data) {
        // Check which request we're responding to
        if (requestCode == 1) {
            // Make sure the request was successful
            if (resultCode == RESULT_OK) {
                try {
                    Log.d("imgTest",data.getData().toString());
                    // 선택한 이미지에서 비트맵 생성
                    InputStream in = getActivity().getContentResolver().openInputStream(data.getData());
                    Bitmap img = BitmapFactory.decodeStream(in);
                    Log.d("imgTest",img.toString());

                    in.close();

                    // 이미지 표시
                    ImageView imageView = new ImageView(getActivity());
                    imageView.setLayoutParams(new LinearLayout.LayoutParams(LinearLayout.LayoutParams.WRAP_CONTENT, LinearLayout.LayoutParams.WRAP_CONTENT));
                    imageView.setImageBitmap(img);

                    getimgLinear.addView(imageView);
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
        }
    }
}
