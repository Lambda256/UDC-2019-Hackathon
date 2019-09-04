package me.kalriz.checkmate.app.model;

public class AccountModel {
	private int account_id = 0;
	private String email = null;
	private String passwd = null;
	private String eth_id = null;
	private String phone = null;
	
	public AccountModel() {}

	public AccountModel(int account_id, String email, String passwd, String eth_id, String phone) {
		super();
		this.account_id = account_id;
		this.email = email;
		this.passwd = passwd;
		this.eth_id = eth_id;
		this.phone = phone;
	}

	public int getAccount_id() {
		return account_id;
	}

	public void setAccount_id(int account_id) {
		this.account_id = account_id;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPasswd() {
		return passwd;
	}

	public void setPasswd(String passwd) {
		this.passwd = passwd;
	}

	public String getEth_id() {
		return eth_id;
	}

	public void setEth_id(String eth_id) {
		this.eth_id = eth_id;
	}

	public String getPhone() {
		return phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}
}