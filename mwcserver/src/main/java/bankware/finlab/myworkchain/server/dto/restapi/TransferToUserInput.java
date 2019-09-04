package bankware.finlab.myworkchain.server.dto.restapi;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Setter;

@Setter
public class TransferToUserInput {

	@JsonProperty
	private String receiverAddress;
	
	@JsonProperty
	private double valueAmount;
}
