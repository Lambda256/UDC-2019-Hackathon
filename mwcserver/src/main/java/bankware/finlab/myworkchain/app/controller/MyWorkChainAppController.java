package bankware.finlab.myworkchain.app.controller;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDateTime;
import java.util.Calendar;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;

import com.fasterxml.jackson.core.JsonProcessingException;

import bankware.finlab.myworkchain.app.dto.WorkHistoryDto;
import bankware.finlab.myworkchain.app.service.WorkHistoryService;
import bankware.finlab.myworkchain.common.entity.EmployeeEntity;
import bankware.finlab.myworkchain.common.entity.WorkHistoryEntity;
import bankware.finlab.myworkchain.server.dto.WorkHistoryRequest;
import bankware.finlab.myworkchain.server.service.AppService;
import bankware.finlab.myworkchain.server.service.CompanyService;
import bankware.finlab.myworkchain.server.service.EmployeeService;
import bankware.finlab.myworkchain.server.service.RewardService;
import bankware.finlab.myworkchain.server.service.WorkService;

@Controller
public class MyWorkChainAppController {
	
	private static final Logger logger = LoggerFactory.getLogger(MyWorkChainAppController.class);
	
	@Autowired
	private WorkHistoryService workHistoryService;
	
	@Autowired
	private WorkService workService;
	
	@Autowired
	private AppService appService;
	
	@Autowired
	private EmployeeService employeeService;
	
	@Autowired
	private CompanyService companyService;
	
	@Autowired
	private RewardService rewardService;
	
	// 하드 코딩, 추후 변경 필요 TODO
//	private static final String EMPL_ADDRESS = "0xf99c71b2cd6e4edeb115cefb409375735a5ff118";
	
	@GetMapping("/")
	public String viewMain(Model model) {
		if(logger.isDebugEnabled()) logger.debug("viewMain {}", model);
		
		// template name
		return "app/login";
	}
	
	@GetMapping("/calendar/{userId}")
	public String viewHome(Model model, @PathVariable String userId) throws JsonProcessingException {
		if(logger.isDebugEnabled()) logger.debug("viewHome {}", model);
		
		// Model Attributes
		//List<WorkHistoryEntity> workHistoryEntityList = workHistoryService.getWorkHistoryList(EMPL_ADDRESS);
		//logger.info("workHistoryEntityList : {}", workHistoryEntityList);
		//model.addAttribute("workHistoryEntityList", workHistoryEntityList);
		
		// 로그인 User 조회
		EmployeeEntity user = employeeService.getEmployeeInfoById(userId);
		user.setWorkPlaceName(companyService.getWorkPlaceName(user.getCurrentWorkplaceCode())); //user 근무지 코드 정보 이용해서 근무지 이름 조회
		
		SimpleDateFormat sdf = new SimpleDateFormat("yyyyMM");
		Calendar c1 = Calendar.getInstance();
		String yyyyMM = sdf.format(c1.getTime());
		logger.info("yyyyMM : {}", yyyyMM);
		
		WorkHistoryRequest request = new WorkHistoryRequest();
		request.setUserId(user.getUserId());
		request.setYearMonth(yyyyMM);
		request.setStartDay(1);
		request.setEndDay(31);
		List<WorkHistoryEntity> workHistoryEntityList = workService.getWorkHistory(request);
		//logger.info("workHistoryEntityList : {}", workHistoryEntityList);
		
		model.addAttribute("user", user);
		model.addAttribute("workHistoryEntityList", workHistoryEntityList);
		
		// template name
		return "app/home";
	}
	
	@GetMapping("/login")
	public String viewLogin(Model model) {
		if(logger.isDebugEnabled()) logger.debug("viewLogin {}", model);
		
		// template name
		return "app/login";
	}
	
	@GetMapping("/work/history/{userId:.+}/{time:.+}")
	public @ResponseBody List<WorkHistoryEntity> getWorkHistory(@PathVariable("userId") String userId, 
			@PathVariable("time") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime time) throws ParseException {
		logger.info("userId : {}", userId);
		
		List<WorkHistoryEntity> workHistoryEntityList = workHistoryService.getWorkHistoryWithTime(userId, time);
		logger.info("workHistoryEntityList : {}", workHistoryEntityList);
		
		return workHistoryEntityList;
	}
	
	@GetMapping("/work/history/{userId:.+}")
	public @ResponseBody List<WorkHistoryEntity> getWorkHistoryList(@PathVariable("userId") String userId) {
		logger.info("userAddress : {}", userId);
		List<WorkHistoryEntity> workHistoryEntityList = workHistoryService.getWorkHistoryList(userId);
		logger.info("workHistoryEntityList : {}", workHistoryEntityList);
		
		return workHistoryEntityList;
	}
	
	@Transactional
	@PostMapping("/work/history")
	public @ResponseBody Boolean newWorkHistory(@RequestBody WorkHistoryDto request) throws JsonProcessingException, ParseException {
		//TODO 근무지 코드 처리
		
		logger.info("NewWorkRequest : {}", request);

		Boolean isNewWorkHistory = appService.newWorkHistoryService(request);
		logger.info("업무 시작 !");
		
		return isNewWorkHistory;
	}
	
	@Transactional
	@PatchMapping("/work/history")
	public @ResponseBody Boolean modifyWorkHistory(@RequestBody WorkHistoryDto request) throws JsonProcessingException, ParseException {
		//TODO 근무지 코드 처리
		
		logger.info("NewWorkRequest : {}", request);
		Boolean isNewWorkHistory = appService.newWorkHistoryService(request);
		logger.info("업무 종료 !");
		
		return isNewWorkHistory;
	}
	
	@GetMapping("/reward/{userId}")
	public String viewReward(Model model, @PathVariable String userId) {
		if(logger.isDebugEnabled()) logger.debug("viewReward {}", model);
		
		// 로그인 User 조회
		EmployeeEntity user = employeeService.getEmployeeInfoById(userId);
		user.setWorkPlaceName(companyService.getWorkPlaceName(user.getCurrentWorkplaceCode())); //user 근무지 코드 정보 이용해서 근무지 이름 조회
		
		SimpleDateFormat sdf = new SimpleDateFormat("yyyyMM");
		Calendar c1 = Calendar.getInstance();
		String yyyyMM = sdf.format(c1.getTime());
		logger.info("yyyyMM : {}", yyyyMM);
		
		model.addAttribute("user", user);
		model.addAttribute("balance", rewardService.getBalance(user.getEmplAddress()));
		logger.info("user.getEmplAddress : {}.{}", user.getUserId(), user.getEmplAddress());

		
		// template name
		return "app/reward";
	}
	
	@GetMapping("/work/{userId}")
	public String viewWork(Model model, @PathVariable String userId) throws JsonProcessingException {
		if(logger.isDebugEnabled()) logger.debug("viewWork {}", model);
		
		// 로그인 User 조회
		EmployeeEntity user = employeeService.getEmployeeInfoById(userId);
		user.setWorkPlaceName(companyService.getWorkPlaceName(user.getCurrentWorkplaceCode())); //user 근무지 코드 정보 이용해서 근무지 이름 조회
		
//		SimpleDateFormat sdf = new SimpleDateFormat("yyyyMM");
//		Calendar c1 = Calendar.getInstance();
//		String yyyyMM = sdf.format(c1.getTime());
//		logger.info("yyyyMM : {}", yyyyMM);
//		
//		// 근무기록 조회
//		WorkHistoryRequest request = new WorkHistoryRequest();
//		request.setUserId(user.getUserId());
//		request.setYearMonth(yyyyMM);
//		request.setStartDay(1);
//		request.setEndDay(31);
	
		List<WorkHistoryEntity> workHistoryList = workHistoryService.getWorkHistoryList(userId); 
		
		model.addAttribute("user", user);
		model.addAttribute("workHistoryList", workHistoryList);
		
		// template name
		return "app/work";
	}
	
	@GetMapping("/qrstamp/{userId}")
	public String viewQrHome(Model model, @PathVariable String userId) throws JsonProcessingException {
		if(logger.isDebugEnabled()) logger.debug("viewHome {}", model);
		
		// Model Attributes
		//List<WorkHistoryEntity> workHistoryEntityList = workHistoryService.getWorkHistoryList(EMPL_ADDRESS);
		//logger.info("workHistoryEntityList : {}", workHistoryEntityList);
		//model.addAttribute("workHistoryEntityList", workHistoryEntityList);
		
		// 로그인 User 조회
		EmployeeEntity user = employeeService.getEmployeeInfoById(userId);
		user.setWorkPlaceName(companyService.getWorkPlaceName(user.getCurrentWorkplaceCode())); //user 근무지 코드 정보 이용해서 근무지 이름 조회
		
		SimpleDateFormat sdf = new SimpleDateFormat("yyyyMM");
		Calendar c1 = Calendar.getInstance();
		String yyyyMM = sdf.format(c1.getTime());
		logger.info("yyyyMM : {}", yyyyMM);
		
		WorkHistoryRequest request = new WorkHistoryRequest();
		request.setUserId(user.getUserId());
		request.setYearMonth(yyyyMM);
		request.setStartDay(1);
		request.setEndDay(31);
		List<WorkHistoryEntity> workHistoryEntityList = workService.getWorkHistory(request);
		//logger.info("workHistoryEntityList : {}", workHistoryEntityList);
		
		model.addAttribute("user", user);
		model.addAttribute("workHistoryEntityList", workHistoryEntityList);
		
		// template name
		return "app/qrstamp";
	}
	
	@GetMapping("/qrscan/{userId}")
	public String viewQrscan(Model model, @PathVariable String userId) {
		if(logger.isDebugEnabled()) logger.debug("viewQrscan {}", model);
		
		// 로그인 User 조회
		EmployeeEntity user = employeeService.getEmployeeInfoById(userId);
		user.setWorkPlaceName(companyService.getWorkPlaceName(user.getCurrentWorkplaceCode())); //user 근무지 코드 정보 이용해서 근무지 이름 조회
		
		SimpleDateFormat sdf = new SimpleDateFormat("yyyyMM");
		Calendar c1 = Calendar.getInstance();
		String yyyyMM = sdf.format(c1.getTime());
		logger.info("yyyyMM : {}", yyyyMM);
		
		model.addAttribute("user", user);
		model.addAttribute("balance", rewardService.getBalance(user.getEmplAddress()));
		logger.info("user.getEmplAddress : {}.{}", user.getUserId(), user.getEmplAddress());

		
		// template name
		return "app/qrscan";
	}
}