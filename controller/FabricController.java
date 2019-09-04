package me.kalriz.checkmate.app.controller;

import org.hyperledger.fabric.sdk.HFClient;
import org.hyperledger.fabric.sdk.security.CryptoSuite;
import org.hyperledger.fabric_ca.sdk.HFCAClient;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import me.kalriz.checkmate.app.CheckMateApplication;
import me.kalriz.checkmate.app.service.impl.FabricUser;

@RestController
@RequestMapping(path = "/api/fabric/")
public class FabricController {
	private static final Logger Log = LoggerFactory.getLogger(CheckMateApplication.class);

	@ResponseBody
	@GetMapping(path = "test")
	public String boardSubmit() {
		Log.info("API-Fabric-Test: ");
		
		HFClient hfClient = null;
		
		try {
			CryptoSuite cryptoSuite = CryptoSuite.Factory.getCryptoSuite();
			
			HFCAClient hfCAClient = HFCAClient.createNewInstance("http://163.239.27.32:7054", null);
			
			hfCAClient.setCryptoSuite(cryptoSuite);
			
			FabricUser admin = new FabricUser("admin", "adminpw", cryptoSuite);
			admin.setMspId("Org0MSP");
			admin.setEnrollment(hfCAClient.enroll("admin", "adminpw"));
			
			hfClient = HFClient.createNewInstance();
			hfClient.setCryptoSuite(cryptoSuite);
			hfClient.setUserContext(admin);
			
			return hfClient.getChannel("bc1").getName();
			
			/*Properties peer_properties = getPropertiesWith("peer0.pem");
			Peer peer = hfClient.newPeer("peer0", "http://163.239.27.35:7050", peer_properties);

			Properties orderer_properties = getPropertiesWith("orderer0.pem");
			Orderer orderer = hfClient.newOrderer("orderer0", "http://163.239.27.33:7050", orderer_properties);

			Channel channel = hfClient.newChannel("bc1");
			
			return enroll.getCert();*/
			
			
		}catch(Exception e) {
			return e.getMessage();
		}
	}
}
