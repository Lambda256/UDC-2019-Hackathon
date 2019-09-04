package bankware.finlab.myworkchain.server.dto.restapi;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Setter;

@Setter
public class WorkHistoryInput {
	
	@JsonProperty
	private String _userId; // user의 Wallet Address
	
	@JsonProperty
	private String _yearMon;
	
	@JsonProperty
	private Integer _stday;
	
	@JsonProperty
	private Integer _edday;
}
