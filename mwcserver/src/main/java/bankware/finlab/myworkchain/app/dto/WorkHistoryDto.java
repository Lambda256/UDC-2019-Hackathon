package bankware.finlab.myworkchain.app.dto;

import java.math.BigDecimal;
import java.util.Date;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class WorkHistoryDto {
	private String userId;
	private Date time;
	private BigDecimal latitude;
	private BigDecimal longitude;
	private String workPlaceCode;
	//근무 구분 코드 (01: 출근, 02: 퇴근)
	private String workCode;
		
	
}
