package bankware.finlab.myworkchain.server.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClientException;

import com.fasterxml.jackson.core.JsonProcessingException;

import bankware.finlab.myworkchain.common.constant.DataSourceConstant;
import bankware.finlab.myworkchain.common.entity.EmployeeEntity;
import bankware.finlab.myworkchain.common.repository.EmployeeRepository;
import bankware.finlab.myworkchain.common.repository.WorkPlaceRepository;
import bankware.finlab.myworkchain.server.dto.restapi.RestRequest;
import bankware.finlab.myworkchain.server.dto.restapi.RestRequestFrom;
import bankware.finlab.myworkchain.server.dto.restapi.RestResponse;

@Service
public class EmployeeService {
	
	@Autowired
	EmployeeRepository employeeRepository;
	
	@Autowired
	WorkPlaceRepository workPlaceRepository;
	
	@Autowired
	CommonService commonService;
	
	@Autowired 
	CompanyService companyService;
	
	/*
	 * 회사 Address를 받아 직원 목록 조회
	 */
	public List<EmployeeEntity> getEmployeeList(String compAddress) throws RestClientException, JsonProcessingException {

		//Chain에서 직원 Address 목록 조회
		//Server에 있는 직원 Data와 Mapping
		List<Object> emplAddressList = _getEmplAddressList(compAddress);
		List<EmployeeEntity> emplListData = employeeRepository.findAll();
		
		return _mappingEmployeeInfo(emplAddressList, emplListData);
	}
	
	/*
	 * 직원 ID를 받아 직원 정보 조회
	 */
	public EmployeeEntity getEmployeeInfoById(String userId) {
		
		EmployeeEntity employee = employeeRepository.findEmployeeByUserId(userId);
		
		return employee;
	}
	
	@SuppressWarnings("unchecked")
	private List<Object> _getEmplAddressList(String compAddress) throws RestClientException, JsonProcessingException {

		RestRequest restRequest = _setEmplAddressListRequest(compAddress);

		RestResponse response = commonService.callPost(commonService.objectToJson(restRequest), DataSourceConstant.POSTFIX_COMPANY_USER_LIST);
		
		List<Object> emplAddressList = new ArrayList<Object>();
		emplAddressList = (List<Object>) response.getData().getRes().get(0);
		return emplAddressList; 
	}
	
	private RestRequest _setEmplAddressListRequest(String compAddress) {
		
		RestRequest restRequest = new RestRequest();
		
		//from
		RestRequestFrom from = commonService.getFrom();
		restRequest.setFrom(from);
		
		//input
		Map<String, Object> input = new HashMap<>();
		input.put("_companyId", compAddress);
		
		restRequest.setInputs(input);
		
		return restRequest;
	}
	private List<EmployeeEntity> _mappingEmployeeInfo(List<Object> emplAddressList, List<EmployeeEntity> emplListData) {
		
		List<EmployeeEntity> employeeList = new ArrayList<EmployeeEntity>();
		
		// 1. Server DB에 있는 직원 목록을 먼저 다 가져온 후 Mapping한다. 
		for(Object emplAddress : emplAddressList) {
			EmployeeEntity employee = new EmployeeEntity();
			String add = emplAddress.toString();
			for(EmployeeEntity emplDataItem : emplListData) {
				if(add.equalsIgnoreCase(emplDataItem.getEmplAddress())) {
					 employee = EmployeeEntity.builder()
							 			.userId(emplDataItem.getUserId())
							 			.emplAddress(emplDataItem.getEmplAddress())
							 			.compAddress(emplDataItem.getCompAddress())
										.name(emplDataItem.getName())
										.currentWorkplaceCode(emplDataItem.getCurrentWorkplaceCode())
										.workPlaceName(companyService.getWorkPlaceName(emplDataItem.getCurrentWorkplaceCode()))
										.department(emplDataItem.getDepartment())
										.position(emplDataItem.getPosition())
										.joinDate(emplDataItem.getJoinDate())
										.email(emplDataItem.getEmail())
										.phoneNumber(emplDataItem.getPhoneNumber())
										.build();
				}
			}
			employeeList.add(employee);
		}
		
		/*
		 * Progress Bar를 위한 Sample 정보  Setting
		 */
		employeeList = _settingProgressInfo(employeeList);
		
		return employeeList;
	}
	
	/**
	 * 직원 목록의 근무시간 Progress Bar 표시를 위한 Sample Data Setting 함수 (workValue, progressColor)
	 */
	private List<EmployeeEntity> _settingProgressInfo(List<EmployeeEntity> emplList) {
		
		for(int i = 0; i < emplList.size(); i++) {
			EmployeeEntity emplItem = emplList.get(i);
			emplItem.setWorkValue(DataSourceConstant.workValue[i]);
			emplItem.setProgressColor(DataSourceConstant.progressColor[i]);
			emplItem.setImgName(DataSourceConstant.imgName[i]);
		}
		
		return emplList;
	}
}
