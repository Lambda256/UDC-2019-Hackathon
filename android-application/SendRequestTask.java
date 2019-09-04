package com.example.ssafy_book;

import android.os.AsyncTask;
import android.util.Log;
import android.widget.Button;
import android.widget.TextView;

import java.io.BufferedReader;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URL;

public class SendRequestTask extends AsyncTask<String, String, String> {
    private TextView responseDataView = null;
    private Button requestButton = null;

    private InputStream inputStream = null;

    private HttpURLConnection httpURLConnection = null;

    public SendRequestTask(TextView tv, Button btn)
    {
        this.responseDataView = tv;
        this.requestButton = btn;
    }
    public SendRequestTask()
    { }

    @Override
    protected String doInBackground(String... params) {
        try{
            URL url = new URL(params[0] + "/" + params[1]);
            httpURLConnection = (HttpURLConnection)url.openConnection();

            httpURLConnection.setRequestMethod(params[2]);
            httpURLConnection.setUseCaches(false);



            if(params[2].equals("POST"))
            {
                httpURLConnection.setRequestProperty("Content-Type", "application/json; utf-8");
                httpURLConnection.setRequestProperty("Authorization", "Bearer ADLq4HEjZ1sFqVD8wVWCUNVDXJ6EhqVVkNpywaeBxNFg2EDC4j18W8X6aMaTNvwj");
                httpURLConnection.setRequestProperty("Accept", "application/json");
                httpURLConnection.setDoOutput(true);
                try(OutputStream outputStream = httpURLConnection.getOutputStream())
                {
                    byte[] datas = params[3].getBytes("UTF-8");

                    outputStream.write(datas,0,datas.length);
                }
            }

            int responseStatusCode = httpURLConnection.getResponseCode();
            StringBuilder response = new StringBuilder();

            if (responseStatusCode == HttpURLConnection.HTTP_OK) {
                inputStream = httpURLConnection.getInputStream();

                InputStreamReader inputStreamReader = new InputStreamReader(inputStream, "UTF-8");
                BufferedReader bufferedReader = new BufferedReader(inputStreamReader);

                String line;

                while ((line = bufferedReader.readLine()) != null) {
                    response.append(line);
                }
            } else {
                inputStream = httpURLConnection.getErrorStream();
            }
            Log.d("loginResult",response.toString().trim());
            return response.toString().trim();
        }catch(Exception e){
            return "잘못된 요청이 전달 되었습니다. Error: " + e.getMessage()+"(" + e.getCause() +")";
        }
    }

    protected void onPostExecute(String result) {
        if(responseDataView != null && requestButton != null){
            responseDataView.setText(result);
            requestButton.setEnabled(true);
        }
    }
}
