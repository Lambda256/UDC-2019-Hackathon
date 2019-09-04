package bankware.finlab.myworkchain.server.dto.restapi;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Getter;

@Getter
public class RestResponseData {

	@JsonProperty(value="txId")
	private String txId;
	
	@JsonProperty(value="txUuid")
	private String txUuid;
	
	@JsonProperty(value="reqTs")
	private String reqTs;
	
	@JsonProperty(value="res")
	private List<Object> res;
	
	@JsonProperty(value="balance")
	private String balance;
}
