package bankware.finlab.myworkchain.server.dto.restapi;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Setter;

@Setter
public class TransferToUserRequest {

	@JsonProperty
	String from;
	
	@JsonProperty
	Object inputs;
}
