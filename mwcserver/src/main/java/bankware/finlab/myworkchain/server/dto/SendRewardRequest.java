package bankware.finlab.myworkchain.server.dto;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class SendRewardRequest {

	//리워드 제공자 (기업 Address)
	private String giverAddress;
	
	//리워드 받는 사람 (직원 Address)
	private String receiverAddress;
	
	//리워드 양
	private double valueAmount;
}
