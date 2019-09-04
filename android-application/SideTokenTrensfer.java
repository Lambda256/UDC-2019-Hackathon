package com.example.ssafy_book;

import java.util.HashMap;
import java.util.Map;

public class SideTokenTrensfer {
    //계좌
    private String from;
    private Map<String, String>inputs;

    public SideTokenTrensfer(String from,String receiverAddress, String valueAmount){
        this.from = from;
        this.inputs = new HashMap<String, String>();

        inputs.put("receiverAddress",receiverAddress);
        inputs.put("valueAmount",valueAmount);
    }
}
