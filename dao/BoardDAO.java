package me.kalriz.checkmate.app.dao;

import java.util.List;

import me.kalriz.checkmate.app.model.BoardModel;
import me.kalriz.checkmate.app.params.ResBoardContractIDInfo;

public interface BoardDAO {
	BoardModel getRecentBoard();
	int getRecentBoardID();
	
	BoardModel getBoardByID(int board_id);
	List<BoardModel> getBoardByTitle(String title);
	List<BoardModel> getBoardByAccountID(int account_id);	
	List<BoardModel> getBoardByBuyerID(int buyer);
	List<String> getBoardContractIDList();
	List<ResBoardContractIDInfo> getBoardContractIDInfoList();
	List<BoardModel> getReportBoard();
	List<BoardModel> getReportBoardByID(String email);
	
	int getReportTotalCount();
	
	int getAccountIdByBoardID(int board_id);
	
	boolean newBoard(String title, String contents, int seller, int price, String contract_id);
	boolean newAccountBoard(int board_id, int account_id);
	
	boolean updateBoardState(int board_id, int state);
	boolean updateBoardBuyer(int board_id, int buyer);
}
