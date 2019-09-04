package me.kalriz.checkmate.app.model;

public class BoardModel {
	private int board_id = 0;
	private String createat = null;
	public String getCreateat() {
		return createat;
	}
	public void setCreateat(String createat) {
		this.createat = createat;
	}
	private String title = null;
	private String contents = null;
	private int state = 0;
	private int price = 0;
	private int buyer = 0;
	private String contract_id = null;
	
	public int getBoard_id() {
		return board_id;
	}
	public String getContract_id() {
		return contract_id;
	}
	public void setContract_id(String contract_id) {
		this.contract_id = contract_id;
	}
	public void setBoard_id(int board_id) {
		this.board_id = board_id;
	}
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	public String getContents() {
		return contents;
	}
	public void setContents(String contents) {
		this.contents = contents;
	}
	public int getState() {
		return state;
	}
	public void setState(int state) {
		this.state = state;
	}
	public int getPrice() {
		return price;
	}
	public void setPrice(int price) {
		this.price = price;
	}
	public int getBuyer() {
		return buyer;
	}
	public void setBuyer(int buyer) {
		this.buyer = buyer;
	}
}
