package bankware.finlab.myworkchain.server.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.client.RestClientException;

import com.fasterxml.jackson.core.JsonProcessingException;

import bankware.finlab.myworkchain.common.constant.DataSourceConstant;
import bankware.finlab.myworkchain.server.service.CompanyService;
import bankware.finlab.myworkchain.server.service.EmployeeService;
import bankware.finlab.myworkchain.server.service.RewardService;
import bankware.finlab.myworkchain.server.service.WorkService;

@Controller
@RequestMapping("admin")
public class CompanyController {

	Logger logger = LoggerFactory.getLogger(CompanyController.class);
	
	@Autowired
	CompanyService companyService; 
	
	@Autowired
	EmployeeService employeeService;
	
	@Autowired
	RewardService rewardService;
	
	@Autowired
	WorkService workService;

	@RequestMapping(path={"", "/"})
	public String company(Model model) throws RestClientException, JsonProcessingException {
		
		String pageName;
		pageName = "company_dashboard";

		
		model.addAttribute("workPlaceList", companyService.getWorkPlace(DataSourceConstant.COMPANY_ADDRESS));
		model.addAttribute("employeeList", employeeService.getEmployeeList(DataSourceConstant.COMPANY_ADDRESS));
		model.addAttribute("balance", rewardService.getBalance(DataSourceConstant.COMPANY_ADDRESS));
		model.addAttribute("companyInfo", companyService.getCompanyInfo(DataSourceConstant.COMPANY_ADDRESS));
		
		return pageName;
	}
}
