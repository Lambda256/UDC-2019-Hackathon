package bankware.finlab.myworkchain.common.constant;

import java.math.BigDecimal;

//TODO : Properties로 관리할 정보 처리
public class DataSourceConstant {
	
	//REST API
	public static final String REST_API_URL_TRANSACTION = "https://api.luniverse.net/tx/v1.0/transactions/";
	public static final String REST_API_URL_WALLET = "https://api.luniverse.net/tx/v1.0/wallets/";
	public static final String BEARER_API = "sYjfGNX21yT4UUPMYczotVdAXAsUSjLQkpPpbkyN8qPZywgyoWqszkJiDuDXqMM9";
	
	//REST API POSTFIX
	public static final String POSTFIX_COMPANY_USER_LIST = "companyUserList"; //getEmployeeAddressList의 API PostFix
	public final static String POSTFIX_TRANSFER_TO_USER = "transfer2User";
	public final static String POSTFIX_GET_BALANCE = "/MWC/MWRT/balance";
	public final static String POSTFIX_CHECK_STAMP = "checkStampV1";
	public final static String POSTFIX_STAMP_LIST = "stampListV1";
	
	//Wallet Address
	public static final String COMPANY_ADDRESS = "0x68d6d94a83d8348f15db84b00e4fb02521872c5d";
	
	//Work History 등록시 주는 리워드 토큰
	public static final int VALUE_AMOUNT = 100;
	
	//Work History 등록시 리워드 제공 기준이 되는 출근 시각
	public static final String REFERENCE_START_TIME = "09:30:00";
	
	//Employee의 Progress Bar 정보 (Sample)
	//0:Gabriel, 1:Mickey, 2:Kevin, 3:Celine
	public static final int[] workValue = {80, 52, 60, 40};
	public static final String[] progressColor = {"red", "green", "red", "orange"}; 
	public static final String[] imgName = {"gabriel.jpeg", "gabriel.jpeg", "gabriel.jpeg", "gabriel.jpeg"};
	
	//위/경도 Sample Data
	public static final BigDecimal latitude = BigDecimal.valueOf(37.440220);
	public static final BigDecimal longitude = BigDecimal.valueOf(126.456209);
}
