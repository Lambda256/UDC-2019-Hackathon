package bankware.finlab.myworkchain.server.dto;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class WorkHistoryRequest {
	
	//로그인 아이디
	private String userId;
	
	//호출하고자 하는 년/월 (yyyyMM)
	private String yearMonth;
	
	//조회 시작일 (1)
	private int startDay;
	
	//조회 종료일(31)
	private int endDay;

}
