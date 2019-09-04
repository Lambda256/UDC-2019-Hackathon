package me.kalriz.checkmate.app.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import me.kalriz.checkmate.app.CheckMateApplication;
import me.kalriz.checkmate.app.dao.AccountDAO;
import me.kalriz.checkmate.app.model.AccountModel;
import me.kalriz.checkmate.app.params.ReqJoinParam;
import me.kalriz.checkmate.app.params.ReqLoginParam;
import me.kalriz.checkmate.app.params.ResJoinInfoParam;
import me.kalriz.checkmate.app.params.ResLoginInfoParam;

@RestController
@RequestMapping(path = "/api/membership/")
public class MembershipController {
	private static final Logger Log = LoggerFactory.getLogger(CheckMateApplication.class);

	@Autowired
	private AccountDAO accountDao;

	@ResponseBody
	@PostMapping(path = "join")
	public ResJoinInfoParam membershipJoin(@RequestBody ReqJoinParam joinParam) {
		Log.info("API-Membership-Join: Request, [" + joinParam.getEmail() + "]");

		ResJoinInfoParam result = new ResJoinInfoParam();
		
		try {
			if (accountDao.newAccount(joinParam.getEmail(), joinParam.getPasswd(), joinParam.getEth_id(), joinParam.getPhone())) {
				result.setAccount(accountDao.getAccountByEmail(joinParam.getEmail()));
				result.setSuccess(true);
			} else
				result.setErrorMsg("account doesn't create.");
		}catch(Exception e) {
			result.setErrorMsg("account doesn't create.");
		}
		return result;
	}

	@ResponseBody
	@PostMapping(path = "login")
	public ResLoginInfoParam membershipLogin(@RequestBody ReqLoginParam loginParam) {

		Log.info("API-Membership-Login: Request, [" + loginParam.getEmail() + "]");

		ResLoginInfoParam result = new ResLoginInfoParam();

		AccountModel account = accountDao.getAccountByEmail(loginParam.getEmail());

		if (account != null) {
			if (account.getPasswd().equals(loginParam.getPasswd())) {
				result.setAccount(account);
				result.setSuccess(true);
			} else {
				result.setErrorMsg("passwd isn't match.");
			}
		} else {
			result.setErrorMsg("email isn't exist.");
		}

		return result;
	}
	
	@ResponseBody
	@GetMapping(path = "search")
	public AccountModel membershipSearch(Integer account_id) {

		Log.info("API-Membership-Search: Request, [" + account_id + "]");

		return accountDao.getAccountByID(account_id);
	}
}
