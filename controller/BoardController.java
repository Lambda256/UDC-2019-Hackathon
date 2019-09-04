package me.kalriz.checkmate.app.controller;

import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import me.kalriz.checkmate.app.CheckMateApplication;
import me.kalriz.checkmate.app.dao.AccountDAO;
import me.kalriz.checkmate.app.dao.BoardDAO;
import me.kalriz.checkmate.app.model.BoardModel;
import me.kalriz.checkmate.app.params.ReqBoardSubmitParam;
import me.kalriz.checkmate.app.params.ResBoardContractIDInfo;
import me.kalriz.checkmate.app.params.ResBoardListInfoParam;
import me.kalriz.checkmate.app.params.ResBoardSellerInfoParam;
import me.kalriz.checkmate.app.params.ResBoardSubmitParam;
import me.kalriz.checkmate.app.params.ResponseParam;

@RestController
@RequestMapping(path = "/api/board/")
public class BoardController {
	private static final Logger Log = LoggerFactory.getLogger(CheckMateApplication.class);

	@Autowired
	private BoardDAO boardDao;

	@Autowired
	private AccountDAO accountDao;

	@ResponseBody
	@PostMapping(path = "submit")
	public ResponseParam boardSubmit(@RequestBody ReqBoardSubmitParam submitParam) {
		Log.info("API-Board-Submit: Request, [" + accountDao.getAccountByID(submitParam.getSeller()).getEmail() + "]");

		ResBoardSubmitParam result = new ResBoardSubmitParam();

		if (boardDao.newBoard(submitParam.getTitle(), submitParam.getContents(), submitParam.getSeller(),
				submitParam.getPrice(), submitParam.getContract_id())) {
			BoardModel board = boardDao.getRecentBoard();
			
			if (boardDao.newAccountBoard(board.getBoard_id(), submitParam.getSeller())) {
				result.setBoard(board);
				result.setSuccess(true);
			}
		} else
			result.setErrorMsg("board doesn't submit.");
		return result;
	}

	@ResponseBody
	@GetMapping(path = "search")
	public ResponseParam boardSearch(@RequestParam Map<String, String> params) {
		Log.info("API-Board-Search-ID: Request, [" + params.keySet().toString() + "]");

		for (String key : params.keySet()) {
			if (key.equals("id")) {
				ResBoardSubmitParam param = new ResBoardSubmitParam();
				
				String id = params.get(key);
				
				param.setBoard(boardDao.getBoardByID(Integer.parseInt(id)));
				param.setSuccess(true);

				return param;
			} else if (key.equals("title")) {
				String title = params.get(key);
				
				ResBoardListInfoParam param = new ResBoardListInfoParam();
				
				param.setBoardList(boardDao.getBoardByTitle(title));
				param.setSuccess(true);

				return param;
			} else if(key.equals("accountid")) {
				String accountid = params.get(key);

				ResBoardListInfoParam param = new ResBoardListInfoParam();
				
				param.setBoardList(boardDao.getBoardByAccountID(Integer.parseInt(accountid)));
				param.setSuccess(true);
				
				return param;
			} else if(key.equals("buyerid")) {
				String buyerid = params.get(key);

				ResBoardListInfoParam param = new ResBoardListInfoParam();
				
				param.setBoardList(boardDao.getBoardByBuyerID(Integer.parseInt(buyerid)));
				param.setSuccess(true);
				
				return param;
			}
		}
		return null;
	}
	
	@ResponseBody
	@GetMapping(path = "search/contract")
	public List<String> boardSearchContracts(@RequestParam Map<String, String> params) {
		return boardDao.getBoardContractIDList();
	}
	
	@ResponseBody
	@GetMapping(path = "search/contract/detail")
	public List<ResBoardContractIDInfo> boardSearchContractDetails(@RequestParam Map<String, String> params) {
		return boardDao.getBoardContractIDInfoList();
	}
	
	@ResponseBody
	@GetMapping(path = "seller")
	public ResponseParam boardSeller(@RequestParam Map<String, String> params) {
		Log.info("API-Board-Search-ID: Request, [" + params.keySet().toString() + "]");

		ResBoardSellerInfoParam result = new ResBoardSellerInfoParam();

		try {			
			String boardIDParam = params.get("boardid");

			int boardID = Integer.parseInt(boardIDParam);

			result.setAccount(accountDao.getAccountByID(boardDao.getAccountIdByBoardID(boardID)));
			result.setSuccess(true);

		} catch (Exception e) {
			result.setErrorMsg("bad board_id request.");
		}

		return result;
	}
	
	@ResponseBody
	@GetMapping(path = "update")
	public ResponseParam boardUpdate(@RequestParam Map<String, String> params) {
		Log.info("API-Board-Search-ID: Request, [" + params.keySet().toString() + "]");

		ResBoardSubmitParam result = new ResBoardSubmitParam();

		if(params.keySet().contains("state"))
		{
			try {			
				String boardIDParam = params.get("boardid");
				String stateParam = params.get("state");
				
				int boardID = Integer.parseInt(boardIDParam);
				int state = Integer.parseInt(stateParam);
				
				Log.info("API-Board-Search-ID: Request, [state: " + state + "]");
				
				if(boardDao.updateBoardState(boardID, state))
				{
					result.setBoard(boardDao.getBoardByID(boardID));
					result.setSuccess(true);
				}
				else {
					result.setErrorMsg("bad board_id request.");
				}
			} catch (Exception e) {
				Log.error("API-Board-Search-ID: " + e.getMessage());
				result.setErrorMsg("bad board_id or state request.");
			}
		}
		else if(params.keySet().contains("buyer"))
		{
			try {			
				String boardIDParam = params.get("boardid");
				String buyerParam = params.get("buyer");
				
				int boardID = Integer.parseInt(boardIDParam);
				int buyer = Integer.parseInt(buyerParam);
				
				if(boardDao.updateBoardBuyer(boardID, buyer))
				{
					result.setBoard(boardDao.getBoardByID(boardID));
					result.setSuccess(true);
				}
				else {
					result.setErrorMsg("bad board_id request.");
				}
			} catch (Exception e) {
				result.setErrorMsg("bad board's index or buyer's index request.");
			}
		}
		
		return result;
	}

}
