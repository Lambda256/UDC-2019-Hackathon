package com.example.ssafy_book;

import me.kalriz.checkmate.app.params.ResponseParam;

public class ResBoardContractIDInfo extends ResponseParam {
    private int account_id = 0;
    private String contract_id = null;

    public int getAccountID() {
        return account_id;
    }

    public String getContractID() {
        return contract_id;
    }

    public void setAccountID(int account_id) {
        this.account_id = account_id;
    }

    public void setContractID(String contract_id) {
        this.contract_id = contract_id;
    }
}