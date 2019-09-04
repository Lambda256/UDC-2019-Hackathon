package bankware.finlab.myworkchain.server.dto.restapi;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Setter;

@Setter
public class CheckStampInput {
	
	@JsonProperty
	private String _userId; // user wallet address
	
	@JsonProperty
	private String _yearMon;
	
	@JsonProperty
	private String _day;
	
	@JsonProperty
	private String _workCode;
	
	@JsonProperty
	private String _latitude;
	
	@JsonProperty
	private String _longitude;
	
	@JsonProperty
	private String _workPlace;
}
