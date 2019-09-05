package com.example.ssafy_book;

import java.math.BigInteger;
import java.util.Arrays;
import java.util.Collections;
import org.web3j.abi.TypeReference;
import org.web3j.abi.datatypes.Address;
import org.web3j.abi.datatypes.Function;
import org.web3j.abi.datatypes.Type;
import org.web3j.abi.datatypes.Utf8String;
import org.web3j.abi.datatypes.generated.Uint256;
import org.web3j.abi.datatypes.generated.Uint8;
import org.web3j.crypto.Credentials;
import org.web3j.protocol.Web3j;
import org.web3j.protocol.core.RemoteCall;
import org.web3j.protocol.core.methods.response.TransactionReceipt;
import org.web3j.tx.Contract;
import org.web3j.tx.TransactionManager;
import org.web3j.tx.gas.ContractGasProvider;

/**
 * <p>Auto generated code.
 * <p><strong>Do not modify!</strong>
 * <p>Please use the <a href="https://docs.web3j.io/command_line.html">web3j command line tools</a>,
 * or the org.web3j.codegen.SolidityFunctionWrapperGenerator in the 
 * <a href="https://github.com/web3j/web3j/tree/master/codegen">codegen module</a> to update.
 *
 * <p>Generated with web3j version 4.3.0.
 */
public class Escrow_ssafy extends Contract {
    private static final String BINARY = "608060405234801561001057600080fd5b506000600460006101000a81548160ff0219169083600581111561003057fe5b021790555061083d806100446000396000f3fe6080604052600436106100b9576000357c0100000000000000000000000000000000000000000000000000000000900480637150d8ae116100815780637150d8ae146101c1578063795612d6146102185780637f8661a114610236578063c19d93fb14610285578063cdf8a53a146102be578063e21f37ce1461030d576100b9565b8063078f8085146100be57806308551a53146100e95780630a7f463f146101405780633fa4f2451461016b5780634d35e4ad14610196575b600080fd5b3480156100ca57600080fd5b506100d361039d565b6040518082815260200191505060405180910390f35b3480156100f557600080fd5b506100fe6103fe565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b34801561014c57600080fd5b50610155610424565b6040518082815260200191505060405180910390f35b34801561017757600080fd5b50610180610495565b6040518082815260200191505060405180910390f35b3480156101a257600080fd5b506101ab61049b565b6040518082815260200191505060405180910390f35b3480156101cd57600080fd5b506101d66104fc565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b610220610522565b6040518082815260200191505060405180910390f35b34801561024257600080fd5b5061026f6004803603602081101561025957600080fd5b8101908080359060200190929190505050610635565b6040518082815260200191505060405180910390f35b34801561029157600080fd5b5061029a6106b6565b604051808260058111156102aa57fe5b60ff16815260200191505060405180910390f35b3480156102ca57600080fd5b506102f7600480360360208110156102e157600080fd5b81019080803590602001909291905050506106c9565b6040518082815260200191505060405180910390f35b34801561031957600080fd5b50610322610773565b6040518080602001828103825283818151815260200191508051906020019080838360005b83811015610362578082015181840152602081019050610347565b50505050905090810190601f16801561038f5780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b6000600260058111156103ac57fe5b600460009054906101000a900460ff1660058111156103c757fe5b1415156103d357600080fd5b6003600460006101000a81548160ff021916908360058111156103f257fe5b02179055506003905090565b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b60006003600581111561043357fe5b600460009054906101000a900460ff16600581111561044e57fe5b14151561045a57600080fd5b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16ff5b60005481565b6000600260058111156104aa57fe5b600460009054906101000a900460ff1660058111156104c557fe5b1415156104d157600080fd5b6005600460006101000a81548160ff021916908360058111156104f057fe5b02179055506005905090565b600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b60006001600581111561053157fe5b600460009054906101000a900460ff16600581111561054c57fe5b14151561055857600080fd5b33600260006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555060005460056000600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825401925050819055506002600460006101000a81548160ff0219169083600581111561062957fe5b02179055506002905090565b6000600182141561067b57600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16ff5b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16ff5b600460009054906101000a900460ff1681565b60008060058111156106d757fe5b600460009054906101000a900460ff1660058111156106f257fe5b1415156106fe57600080fd5b33600160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550816000819055506001600460006101000a81548160ff0219169083600581111561076557fe5b021790555060019050919050565b60038054600181600116156101000203166002900480601f0160208091040260200160405190810160405280929190818152602001828054600181600116156101000203166002900480156108095780601f106107de57610100808354040283529160200191610809565b820191906000526020600020905b8154815290600101906020018083116107ec57829003601f168201915b50505050508156fea165627a7a7230582015e1517d78ddc84dbb58849330b557404ccf4d794788015d251df3b563136c150029";

    public static final String FUNC_SENDITEM = "sendItem";

    public static final String FUNC_SELLER = "seller";

    public static final String FUNC_CONFIRMITEM = "confirmItem";

    public static final String FUNC_VALUE = "value";

    public static final String FUNC_SIREN = "siren";

    public static final String FUNC_BUYER = "buyer";

    public static final String FUNC_BUYITEM = "buyItem";

    public static final String FUNC_EXIT = "exit";

    public static final String FUNC_STATE = "state";

    public static final String FUNC_REGISTRITEM = "registrItem";

    public static final String FUNC_MESSAGE = "message";

    @Deprecated
    protected Escrow_ssafy(String contractAddress, Web3j web3j, Credentials credentials, BigInteger gasPrice, BigInteger gasLimit) {
        super(BINARY, contractAddress, web3j, credentials, gasPrice, gasLimit);
    }

    protected Escrow_ssafy(String contractAddress, Web3j web3j, Credentials credentials, ContractGasProvider contractGasProvider) {
        super(BINARY, contractAddress, web3j, credentials, contractGasProvider);
    }

    @Deprecated
    protected Escrow_ssafy(String contractAddress, Web3j web3j, TransactionManager transactionManager, BigInteger gasPrice, BigInteger gasLimit) {
        super(BINARY, contractAddress, web3j, transactionManager, gasPrice, gasLimit);
    }

    protected Escrow_ssafy(String contractAddress, Web3j web3j, TransactionManager transactionManager, ContractGasProvider contractGasProvider) {
        super(BINARY, contractAddress, web3j, transactionManager, contractGasProvider);
    }

    public RemoteCall<TransactionReceipt> sendItem() {
        final Function function = new Function(
                FUNC_SENDITEM, 
                Arrays.<Type>asList(), 
                Collections.<TypeReference<?>>emptyList());
        return executeRemoteCallTransaction(function);
    }

    public RemoteCall<String> seller() {
        final Function function = new Function(FUNC_SELLER, 
                Arrays.<Type>asList(), 
                Arrays.<TypeReference<?>>asList(new TypeReference<Address>() {}));
        return executeRemoteCallSingleValueReturn(function, String.class);
    }

    public RemoteCall<TransactionReceipt> confirmItem() {
        final Function function = new Function(
                FUNC_CONFIRMITEM, 
                Arrays.<Type>asList(), 
                Collections.<TypeReference<?>>emptyList());
        return executeRemoteCallTransaction(function);
    }

    public RemoteCall<BigInteger> value() {
        final Function function = new Function(FUNC_VALUE, 
                Arrays.<Type>asList(), 
                Arrays.<TypeReference<?>>asList(new TypeReference<Uint256>() {}));
        return executeRemoteCallSingleValueReturn(function, BigInteger.class);
    }

    public RemoteCall<TransactionReceipt> siren() {
        final Function function = new Function(
                FUNC_SIREN, 
                Arrays.<Type>asList(), 
                Collections.<TypeReference<?>>emptyList());
        return executeRemoteCallTransaction(function);
    }

    public RemoteCall<String> buyer() {
        final Function function = new Function(FUNC_BUYER, 
                Arrays.<Type>asList(), 
                Arrays.<TypeReference<?>>asList(new TypeReference<Address>() {}));
        return executeRemoteCallSingleValueReturn(function, String.class);
    }

    public RemoteCall<TransactionReceipt> buyItem(BigInteger weiValue) {
        final Function function = new Function(
                FUNC_BUYITEM, 
                Arrays.<Type>asList(), 
                Collections.<TypeReference<?>>emptyList());
        return executeRemoteCallTransaction(function, weiValue);
    }

    public RemoteCall<TransactionReceipt> exit(BigInteger result) {
        final Function function = new Function(
                FUNC_EXIT, 
                Arrays.<Type>asList(new org.web3j.abi.datatypes.generated.Uint256(result)), 
                Collections.<TypeReference<?>>emptyList());
        return executeRemoteCallTransaction(function);
    }

    public RemoteCall<BigInteger> state() {
        final Function function = new Function(FUNC_STATE, 
                Arrays.<Type>asList(), 
                Arrays.<TypeReference<?>>asList(new TypeReference<Uint8>() {}));
        return executeRemoteCallSingleValueReturn(function, BigInteger.class);
    }

    public RemoteCall<TransactionReceipt> registrItem(BigInteger amount) {
        final Function function = new Function(
                FUNC_REGISTRITEM, 
                Arrays.<Type>asList(new org.web3j.abi.datatypes.generated.Uint256(amount)), 
                Collections.<TypeReference<?>>emptyList());
        return executeRemoteCallTransaction(function);
    }

    public RemoteCall<String> message() {
        final Function function = new Function(FUNC_MESSAGE, 
                Arrays.<Type>asList(), 
                Arrays.<TypeReference<?>>asList(new TypeReference<Utf8String>() {}));
        return executeRemoteCallSingleValueReturn(function, String.class);
    }

    @Deprecated
    public static Escrow_ssafy load(String contractAddress, Web3j web3j, Credentials credentials, BigInteger gasPrice, BigInteger gasLimit) {
        return new Escrow_ssafy(contractAddress, web3j, credentials, gasPrice, gasLimit);
    }

    @Deprecated
    public static Escrow_ssafy load(String contractAddress, Web3j web3j, TransactionManager transactionManager, BigInteger gasPrice, BigInteger gasLimit) {
        return new Escrow_ssafy(contractAddress, web3j, transactionManager, gasPrice, gasLimit);
    }

    public static Escrow_ssafy load(String contractAddress, Web3j web3j, Credentials credentials, ContractGasProvider contractGasProvider) {
        return new Escrow_ssafy(contractAddress, web3j, credentials, contractGasProvider);
    }

    public static Escrow_ssafy load(String contractAddress, Web3j web3j, TransactionManager transactionManager, ContractGasProvider contractGasProvider) {
        return new Escrow_ssafy(contractAddress, web3j, transactionManager, contractGasProvider);
    }

    public static RemoteCall<Escrow_ssafy> deploy(Web3j web3j, Credentials credentials, ContractGasProvider contractGasProvider) {
        return deployRemoteCall(Escrow_ssafy.class, web3j, credentials, contractGasProvider, BINARY, "");
    }

    public static RemoteCall<Escrow_ssafy> deploy(Web3j web3j, TransactionManager transactionManager, ContractGasProvider contractGasProvider) {
        return deployRemoteCall(Escrow_ssafy.class, web3j, transactionManager, contractGasProvider, BINARY, "");
    }

    @Deprecated
    public static RemoteCall<Escrow_ssafy> deploy(Web3j web3j, Credentials credentials, BigInteger gasPrice, BigInteger gasLimit) {
        return deployRemoteCall(Escrow_ssafy.class, web3j, credentials, gasPrice, gasLimit, BINARY, "");
    }

    @Deprecated
    public static RemoteCall<Escrow_ssafy> deploy(Web3j web3j, TransactionManager transactionManager, BigInteger gasPrice, BigInteger gasLimit) {
        return deployRemoteCall(Escrow_ssafy.class, web3j, transactionManager, gasPrice, gasLimit, BINARY, "");
    }
}
