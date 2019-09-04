package me.kalriz.checkmate.app.dao;

import me.kalriz.checkmate.app.model.AccountModel;

public interface AccountDAO {
	AccountModel getAccountByEmail(String email);
	AccountModel getAccountByID(int account_id);
	
	boolean newAccount(String email, String passwd, String eth_id, String phone);
}