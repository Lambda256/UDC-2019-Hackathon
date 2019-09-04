package bankware.finlab.myworkchain.server.service;

import java.text.ParseException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.core.JsonProcessingException;

import bankware.finlab.myworkchain.app.dto.WorkHistoryDto;
import bankware.finlab.myworkchain.app.service.WorkHistoryService;
import bankware.finlab.myworkchain.common.constant.DataSourceConstant;
import bankware.finlab.myworkchain.common.constant.WorkHistoryConstant;
import bankware.finlab.myworkchain.common.entity.WorkHistoryEntity;
import bankware.finlab.myworkchain.common.entity.WorkPlaceEntity;
import bankware.finlab.myworkchain.common.repository.EmployeeRepository;
import bankware.finlab.myworkchain.server.dto.SendRewardRequest;

@Service
public class AppService {
	
	@Autowired
	EmployeeRepository employeeRepository;
	
	@Autowired
	WorkService workService;
	
	@Autowired
	RewardService rewardService;
	
	@Autowired
	EmployeeService employeeService;
	
	@Autowired
	CompanyService companyService;
	
	@Autowired
	WorkHistoryService workHistoryService;
	
	@Autowired
	CommonService commonService;
	
	/*
	 * App 근무 기록 Service (근무기록(to Chain) + 근무기록(to DB) + 리워드 토큰 전송
	 * 오전 09:30분 이전에 출근 등록을 했을 경우,
	 * 퇴근 시, 출근 시간과 비교하여 8시간 이상 근무를 했을 경우 토큰을 지급한다.
	 * TODO : 근무지와 현재 위/경도를 비교하는 것도 고려 해야함
	 * 토큰 지급 대상이 아닐 경우는 근무기록만 수행한다.
	 * NewWorkHistoryServiceRequest 
	 * TODO: result가 false시, 에러 메시지도 처리해야할 듯.
	 */
	public Boolean newWorkHistoryService(WorkHistoryDto input) throws JsonProcessingException, ParseException {
		
		//위/경도 정보를 못받아오는 현상해결을 위해 Sample 값으로 Setting
		input.setLatitude(DataSourceConstant.latitude);
		input.setLongitude(DataSourceConstant.longitude);
		
		//입력받은 input의 위/경도 소수점 6자리 절사
		input.setLatitude(commonService.setScale(input.getLatitude()));
		input.setLongitude(commonService.setScale(input.getLongitude()));
		
		Boolean result = false;
		
		//1. 근무 기록 (to DB)
		WorkHistoryEntity workHistoryDbItem = workHistoryService.newWorkHistoryToDB(input); 
		Boolean newWorkToDBResponse = true; // TODO: DB등록 잘 되었는지 처리
		
		//DB에 등록된 시각으로 input 시각 세팅 
		input.setTime(commonService.localdatetimeToDate(workHistoryDbItem.getTime()));
		
		//2. 근무 기록 (to Chain)
		String newWorkToChainResponse = workService.newWorkHistoryToChain(input); //txId 반환
		
		//3. DB에 Chain 등록 결과 txId update
		workHistoryService.updateTxId(workHistoryDbItem.getId(), newWorkToChainResponse);
		
		//3. 토큰 대상 여부 검사 TODO
		Boolean isSendReward = _isSendReward(input);
		
		//4. 토큰 대상일 경우 토큰 지급
		Boolean sendRewardResponse = false;
		
		if(isSendReward) {
			SendRewardRequest sendRewardRequest = new SendRewardRequest();
			sendRewardRequest.setGiverAddress(employeeRepository.findEmployeeByUserId(input.getUserId()).getCompAddress()); //직원이 속한 기업 Address 호출하여 Setting
			sendRewardRequest.setReceiverAddress(employeeRepository.findEmployeeByUserId(input.getUserId()).getEmplAddress()); //직원 id를 통해 Address 호출하여 Setting
			double valueAmount = (DataSourceConstant.VALUE_AMOUNT * (Math.pow(10, 18)));
			sendRewardRequest.setValueAmount(valueAmount); 
			sendRewardResponse = rewardService.sendReward(sendRewardRequest); 
		}
		else {
			sendRewardResponse = true;
		}
		
		//DB 등록, Chain 등록, 토큰 지급 모두 성공할 경우 true
		if(newWorkToChainResponse != null && sendRewardResponse == true && newWorkToDBResponse == true) {
			result = true;
		}
		
		return result;
	}
	
	/*
	 * 오전 09:30분 이전에 출근 등록을 했을 경우,
	 * 퇴근 시, 출근 시간과 비교하여 8시간 이상 근무를 했을 경우 토큰을 지급한다.
	 * TODO: result가 false시, 에러 메시지도 처리해야할 듯.
	 */
	private Boolean _isSendReward(WorkHistoryDto request) throws ParseException {
		
		Boolean result = true;

		// 해당 사용자의 근무지 정보 Get
		String userWorkPlaceCode = employeeService.getEmployeeInfoById(request.getUserId()).getCurrentWorkplaceCode();
		WorkPlaceEntity userWorkPlace = companyService.getWorkPlaceByCode(userWorkPlaceCode);

		// 입력받은 위/경도와 비교 TODO : 기준 정확히 정해서 구현해둘 것
//		if(userWorkPlace.getLatitude() == request.getLatitude() && userWorkPlace.getLongitude() == request.getLongitude()) {
//			result = true;
//		}
//		else {
//			return false; // 현재 위치는 근무지가 아닙니다.
//		}
		
		if(WorkHistoryConstant.WORK_CODE_START.equals(request.getWorkCode())) {
			//WorkCode가 '출근'인 경우 오전 09:30분 이전 출근 등록시 true
		}
		else if(WorkHistoryConstant.WORK_CODE_END.equals(request.getWorkCode())) {
			//WorkCode가 '퇴근'인 경우 오늘 출근한 시간 호출하여 8시간 이상 근무해야지 true
		}
		
		return result;
	}
}
