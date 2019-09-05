<?php
$what = $_POST['what'];
$parameter = $_POST['parameter'];
$rating_parameter = $parameter + '/rating';
$stake_parameter = $parameter + '/stake';
$several_parameter_array = explode('/' , $parameter);

$DAPP_API_KEY = "rsHuYqGf9tgu9gRg3YE4jPvfEEhxLDEnGFLU4X4uurvC7GyKr4WjSdveNVYXybcK";
$primary_Address = "0x21ac4608c0ce17fc82af08f354b721ca8e143ae1";

$side_chain = "tatata";
$main_token = "TA";
$side_token = "TATA";

$url = "https://api.luniverse.net";

switch ($what) {

        case 'setPrimaryOwner':
            $curl = curl_init();

            curl_setopt_array($curl, array(
                CURLOPT_URL => "{$url}/tx/v1.0/transactions/setPrimaryOwner",
                CURLOPT_RETURNTRANSFER => true,
                CURLOPT_ENCODING => "",
                CURLOPT_MAXREDIRS => 10,
                CURLOPT_TIMEOUT => 30,
                CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
                CURLOPT_CUSTOMREQUEST => "POST",
                CURLOPT_POSTFIELDS => "{\"from\": \"{$parameter}\"}",
                CURLOPT_HTTPHEADER => array(
                "authorization: Bearer {$DAPP_API_KEY}",
                "content-type: application/json"
                ),
            ));
            
            $response = curl_exec($curl);
            $err = curl_error($curl);
            $data = json_decode($response,true);
            
            curl_close($curl);
            
            if ($err) {
                echo "cURL Error #:" . $err;
            } else {
                echo $response;
                //{"result":true,"data":{"balance":"100"}}
                //echo $data['data']['balance'];
            }

            break;

        case 'getCurrentOwner':
            $curl = curl_init();

            curl_setopt_array($curl, array(
                CURLOPT_URL => "{$url}/tx/v1.0/transactions/getCurrentOwner",
                CURLOPT_RETURNTRANSFER => true,
                CURLOPT_ENCODING => "",
                CURLOPT_MAXREDIRS => 10,
                CURLOPT_TIMEOUT => 30,
                CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
                CURLOPT_CUSTOMREQUEST => "POST",
                CURLOPT_POSTFIELDS => "{\"from\": \"{$parameter}\"}",
                CURLOPT_HTTPHEADER => array(
                  "authorization: Bearer {$DAPP_API_KEY}",
                  "content-type: application/json"
                ),
              ));
            
            $response = curl_exec($curl);
            $err = curl_error($curl);
            $data = json_decode($response,true);
            
            curl_close($curl);
            
            if ($err) {
                echo "cURL Error #:" . $err;
            } else {
                echo $response;
                //{"result":true,"data":{"balance":"100"}}
                //echo $data['data']['balance'];
            }

            break;

        case 'updateOwner':
            $curl = curl_init();

            curl_setopt_array($curl, array(
                CURLOPT_URL => "{$url}/tx/v1.0/transactions/updateOwner",
                CURLOPT_RETURNTRANSFER => true,
                CURLOPT_ENCODING => "",
                CURLOPT_MAXREDIRS => 10,
                CURLOPT_TIMEOUT => 30,
                CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
                CURLOPT_CUSTOMREQUEST => "POST",
                CURLOPT_POSTFIELDS => "{\"from\": \"{$several_parameter_array[0]}\",\"inputs\": {\"update_address\": \"{$several_parameter_array[1]}\"}}",
                CURLOPT_HTTPHEADER => array(
                  "authorization: Bearer {$DAPP_API_KEY}",
                  "content-type: application/json"
                ),
              ));
            
            $response = curl_exec($curl);
            $err = curl_error($curl);
            $data = json_decode($response,true);
            
            curl_close($curl);
            
            if ($err) {
                echo "cURL Error #:" . $err;
            } else {
                echo $response;
                //{"result":true,"data":{"balance":"100"}}
                //echo $data['data']['balance'];
            }

            break;


            
        case 'isaleadyRate':
            $curl = curl_init();

            curl_setopt_array($curl, array(
                CURLOPT_URL => "{$url}/tx/v1.0/transactions/updateOwner",
                CURLOPT_RETURNTRANSFER => true,
                CURLOPT_ENCODING => "",
                CURLOPT_MAXREDIRS => 10,
                CURLOPT_TIMEOUT => 30,
                CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
                CURLOPT_CUSTOMREQUEST => "POST",
                CURLOPT_POSTFIELDS => "{\"from\": \"{$primary_Address}\",\"inputs\": {\"user_address\": \"{$parameter}\"}}",
                CURLOPT_HTTPHEADER => array(
                "authorization: Bearer {$DAPP_API_KEY}",
                "content-type: application/json"
                ),
            ));
            
            $response = curl_exec($curl);
            $err = curl_error($curl);
            $data = json_decode($response,true);
            
            curl_close($curl);
            
            if ($err) {
                echo "cURL Error #:" . $err;
            } else {
                echo $response;
                //{"result":true,"data":{"balance":"100"}}
                //echo $data['data']['balance'];
            }

            break;

        case 'insertRate':
            $curl = curl_init();

            $plus_rates = (int)$several_parameter_array[1];
            $user_class = (int)$several_parameter_array[2];

            curl_setopt_array($curl, array(
                CURLOPT_URL => "{$url}/tx/v1.0/transactions/insertRate",
                CURLOPT_RETURNTRANSFER => true,
                CURLOPT_ENCODING => "",
                CURLOPT_MAXREDIRS => 10,
                CURLOPT_TIMEOUT => 30,
                CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
                CURLOPT_CUSTOMREQUEST => "POST",
                CURLOPT_POSTFIELDS => "{\"from\": \"{$primary_Address}\",\"inputs\": {\"user_address\": \"{$several_parameter_array[0]}\",\"plus_rate\": \"{$plus_rate}\",\"user_class\": \"{$user_class}\"}}",
                CURLOPT_HTTPHEADER => array(
                  "authorization: Bearer {$DAPP_API_KEY}",
                  "content-type: application/json"
                ),
              ));
            
            $response = curl_exec($curl);
            $err = curl_error($curl);
            $data = json_decode($response,true);
            
            curl_close($curl);
            
            if ($err) {
                echo "cURL Error #:" . $err;
            } else {
                echo $response;
                //{"result":true,"data":{"balance":"100"}}
                //echo $data['data']['balance'];
            }

            break;

        case 'getRate':

            $curl = curl_init();

            curl_setopt_array($curl, array(
                CURLOPT_URL => "{$url}/tx/v1.0/transactions/getRate",
                CURLOPT_RETURNTRANSFER => true,
                CURLOPT_ENCODING => "",
                CURLOPT_MAXREDIRS => 10,
                CURLOPT_TIMEOUT => 30,
                CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
                CURLOPT_CUSTOMREQUEST => "POST",
                CURLOPT_POSTFIELDS => "{\"from\": \"{$primary_Address}\",\"inputs\": {\"user_address\": \"{$parameter}\"}}",
                CURLOPT_HTTPHEADER => array(
                  "authorization: Bearer {$DAPP_API_KEY}",
                  "content-type: application/json"
                ),
              ));
            
            $response = curl_exec($curl);
            $err = curl_error($curl);
            $data = json_decode($response,true);
            
            curl_close($curl);
            
            if ($err) {
                echo "cURL Error #:" . $err;
            } else {
                //echo $response;
                //{"result":true,"data":{"balance":"100"}}
                echo $data['data']['res'][1];
            }

            break;

        case 'updateRate':

            $curl = curl_init();
            $plus_rates = (int)$several_parameter_array[1];

            curl_setopt_array($curl, array(
                CURLOPT_URL => "{$url}/tx/v1.0/transactions/updateRate",
                CURLOPT_RETURNTRANSFER => true,
                CURLOPT_ENCODING => "",
                CURLOPT_MAXREDIRS => 10,
                CURLOPT_TIMEOUT => 30,
                CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
                CURLOPT_CUSTOMREQUEST => "POST",
                CURLOPT_POSTFIELDS => "{\"from\": \"{$primary_Address}\",\"inputs\": {\"user_address\": \"{$several_parameter_array[0]}\",\"plus_rate\": {$plus_rates}}}",
                CURLOPT_HTTPHEADER => array(
                  "authorization: Bearer {$DAPP_API_KEY}",
                  "content-type: application/json"
                ),
              ));
            
            $response = curl_exec($curl);
            $err = curl_error($curl);
            $data = json_decode($response,true);
            
            curl_close($curl);
            
            if ($err) {
                echo "cURL Error #:" . $err;
            } else {
                echo $response;
                //{"result":true,"data":{"balance":"100"}}
                //echo $data['data']['balance'];
            }

            break;

        case 'getRatelist':

            $curl = curl_init();

            curl_setopt_array($curl, array(
                CURLOPT_URL => "{$url}/tx/v1.0/transactions/getRatelist",
                CURLOPT_RETURNTRANSFER => true,
                CURLOPT_ENCODING => "",
                CURLOPT_MAXREDIRS => 10,
                CURLOPT_TIMEOUT => 30,
                CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
                CURLOPT_CUSTOMREQUEST => "POST",
                CURLOPT_POSTFIELDS => "{\"from\": \"{$primary_Address}\"}",
                CURLOPT_HTTPHEADER => array(
                  "authorization: Bearer {$DAPP_API_KEY}",
                  "content-type: application/json"
                ),
              ));
            
            $response = curl_exec($curl);
            $err = curl_error($curl);
            $data = json_decode($response,true);
            
            curl_close($curl);
            
            if ($err) {
                echo "cURL Error #:" . $err;
            } else {
                echo $response;
                //{"result":true,"data":{"balance":"100"}}
                //echo $data['data']['balance'];
            }

            break;

        case 'getRatelistCount':

            $curl = curl_init();

            curl_setopt_array($curl, array(
                CURLOPT_URL => "{$url}/tx/v1.0/transactions/getRatelistCount",
                CURLOPT_RETURNTRANSFER => true,
                CURLOPT_ENCODING => "",
                CURLOPT_MAXREDIRS => 10,
                CURLOPT_TIMEOUT => 30,
                CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
                CURLOPT_CUSTOMREQUEST => "POST",
                CURLOPT_POSTFIELDS => "{\"from\": \"{$primary_Address}\"}",
                CURLOPT_HTTPHEADER => array(
                  "authorization: Bearer {$DAPP_API_KEY}",
                  "content-type: application/json"
                ),
              ));
            
            $response = curl_exec($curl);
            $err = curl_error($curl);
            $data = json_decode($response,true);
            
            curl_close($curl);
            
            if ($err) {
                echo "cURL Error #:" . $err;
            } else {
                echo $response;
                //{"result":true,"data":{"balance":"100"}}
                //echo $data['data']['balance'];
            }

            break;

        case 'isalreadyContract':

            $curl = curl_init();
            $selectkeys = (int)$several_parameter_array[1];

            curl_setopt_array($curl, array(
                CURLOPT_URL => "{$url}/tx/v1.0/transactions/isalreadyContract",
                CURLOPT_RETURNTRANSFER => true,
                CURLOPT_ENCODING => "",
                CURLOPT_MAXREDIRS => 10,
                CURLOPT_TIMEOUT => 30,
                CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
                CURLOPT_CUSTOMREQUEST => "POST",
                CURLOPT_POSTFIELDS => "{\"from\": \"{$primary_Address}\",\"inputs\": {\"current_IdNUM\": \"{$several_parameter_array[0]}\",\"selectkey\": {$selectkeys}}}",
                CURLOPT_HTTPHEADER => array(
                  "authorization: Bearer {$DAPP_API_KEY}",
                  "content-type: application/json"
                ),
              ));
            
            $response = curl_exec($curl);
            $err = curl_error($curl);
            $data = json_decode($response,true);
            
            curl_close($curl);
            
            if ($err) {
                echo "cURL Error #:" . $err;
            } else {
                echo $response;
                //{"result":true,"data":{"balance":"100"}}
                //echo $data['data']['balance'];
            }

            break;

        case 'insertContract':

            $curl = curl_init();
            
            $selectkey = (int)$several_parameter_array[1];

            $Volunteers = array('aaaa','bbbb');
            $Endpoint_order = array('2','1');
            $Driver = array('cccc');
            $Mobil_model = array('AUDIA8');
            $Route = array('','','','','');
            $tot_fee = 200000;
            $risk_f = 0.1;
            $Volunteers_ratio = array(0.7,0.3);
            $timedata = '2019:09:04';
        
            $Volunteers_count = count($Volunteers);
            $v_value_Volunteers = implode( '/', $Volunteers );
            $v_value_Endpoint_order = implode( '/', $Endpoint_order );
            $v_value_Driver = implode( '', $Driver );
            $v_value_Mobility_model = implode( '', $Mobil_model );
            $v_value_Route = implode( '/', $Route );
            $v_value_Total_Fee = $tot_fee;
            $v_value_Risk_factor = $risk_f;
            $v_value_Volunteers_ratio = implode( ',', $Volunteers_ratio );
            $v_value_Time = $timedata;
        
            /*echo $Volunteers_count;
            echo $v_value_Volunteers;
            echo $v_value_Endpoint_order;
            echo $v_value_Driver;
            echo $v_value_Mobility_model;
            echo $v_value_Route;
            echo $v_value_Total_Fee;
            echo $v_value_Risk_factor;
            echo $v_value_Volunteers_ratio;
            echo $v_value_Time;
            echo '<br>';*/
        
            $temp = '{"Volunteers": "' .$v_value_Volunteers. '", "Volunteers_count": ' .(int)$Volunteers_count. ', "Endpoint_order": "' .$v_value_Endpoint_order. '", 
                "Driver": "' .$v_value_Driver. '", "Mobil_model": "' .$v_value_Mobility_model. '", "Route": "' .$v_value_Route. '",
                "Total_Fee": ' .$v_value_Total_Fee. ', "Risk_factor": ' .$v_value_Risk_factor. ', "v_value_Volunteers_ratio": "[' .$v_value_Volunteers_ratio. ']",
                "Time": "' .$v_value_Time. '"}';
        
            /*
            echo $temp;
            echo '<br>';
            */

            $convertStringToHex = bin2hex($temp);
            $convertHexToString = hex2bin($convertStringToHex);
        
            /*
            echo $convertStringToHex;
            echo '<br>';
            echo $convertHexToString;
            */

            curl_setopt_array($curl, array(
                CURLOPT_URL => "{$url}/tx/v1.0/transactions/insertContract",
                CURLOPT_RETURNTRANSFER => true,
                CURLOPT_ENCODING => "",
                CURLOPT_MAXREDIRS => 10,
                CURLOPT_TIMEOUT => 30,
                CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
                CURLOPT_CUSTOMREQUEST => "POST",
                CURLOPT_POSTFIELDS => "{\"from\": \"{$primary_Address}\",\"inputs\": {\"current_IdNUM\": \"{$several_parameter_array[0]}\",\"v_value\": \"{$convertStringToHex}\",\"selectkey\": {$selectkey}}}",
                CURLOPT_HTTPHEADER => array(
                "authorization: Bearer {$DAPP_API_KEY}",
                "content-type: application/json"
            ),
            ));
            
            $response = curl_exec($curl);
            $err = curl_error($curl);
            $data = json_decode($response,true);
            
            curl_close($curl);
            
            if ($err) {
                echo "cURL Error #:" . $err;
            } else {
                echo $convertStringToHex. "\n" .$response;
                //{"result":true,"data":{"balance":"100"}}
                //echo $data['data']['balance'];
            }

            break;

        case 'getContract':

            $curl = curl_init();

            curl_setopt_array($curl, array(
                CURLOPT_URL => "{$url}/tx/v1.0/transactions/getContract",
                CURLOPT_RETURNTRANSFER => true,
                CURLOPT_ENCODING => "",
                CURLOPT_MAXREDIRS => 10,
                CURLOPT_TIMEOUT => 30,
                CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
                CURLOPT_CUSTOMREQUEST => "POST",
                CURLOPT_POSTFIELDS => "{\"from\": \"{$primary_Address}\",\"inputs\": {\"get_IdNUM\": \"{$several_parameter_array[0]}\",\"selectkey\": {(int)$several_parameter_array[1]}}}",
                CURLOPT_HTTPHEADER => array(
                  "authorization: Bearer {$DAPP_API_KEY}",
                  "content-type: application/json"
                ),
              ));
            
            $response = curl_exec($curl);
            $err = curl_error($curl);
            $data = json_decode($response,true);
            
            curl_close($curl);
            
            if ($err) {
                echo "cURL Error #:" . $err;
            } else {
                echo $response;
                //{"result":true,"data":{"balance":"100"}}
                //echo $data['data']['balance'];
            }

            break;


        case 'updateContract':

            $curl = curl_init();
            
            $Volunteers = array('aaaa','bbbb');
            $Endpoint_order = array('2','1');
            $Driver = array('cccc');
            $Mobil_model = array('AUDIA8');
            $Route = array('','','','','');
            $tot_fee = 200000;
            $risk_f = 0.1;
            $Volunteers_ratio = array(0.7,0.3);
            $timedata = '2019:09:04';
        
            $Volunteers_count = count($Volunteers);
            $v_value_Volunteers = implode( '/', $Volunteers );
            $v_value_Endpoint_order = implode( '/', $Endpoint_order );
            $v_value_Driver = implode( '', $Driver );
            $v_value_Mobility_model = implode( '', $Mobil_model );
            $v_value_Route = implode( '/', $Route );
            $v_value_Total_Fee = $tot_fee;
            $v_value_Risk_factor = $risk_f;
            $v_value_Volunteers_ratio = implode( ',', $Volunteers_ratio );
            $v_value_Time = $timedata;
        
            /*echo $Volunteers_count;
            echo $v_value_Volunteers;
            echo $v_value_Endpoint_order;
            echo $v_value_Driver;
            echo $v_value_Mobility_model;
            echo $v_value_Route;
            echo $v_value_Total_Fee;
            echo $v_value_Risk_factor;
            echo $v_value_Volunteers_ratio;
            echo $v_value_Time;
            echo '<br>';*/
        
            $temp = '{"Volunteers": "' .$v_value_Volunteers. '", "Volunteers_count": ' .(int)$Volunteers_count. ', "Endpoint_order": "' .$v_value_Endpoint_order. '", 
                "Driver": "' .$v_value_Driver. '", "Mobil_model": "' .$v_value_Mobility_model. '", "Route": "' .$v_value_Route. '",
                "Total_Fee": ' .$v_value_Total_Fee. ', "Risk_factor": ' .$v_value_Risk_factor. ', "v_value_Volunteers_ratio": "[' .$v_value_Volunteers_ratio. ']",
                "Time": "' .$v_value_Time. '"}';
        
            /*
            echo $temp;
            echo '<br>';
            */

            $convertStringToHex = bin2hex($temp);
            $convertHexToString = hex2bin($convertStringToHex);
        
            /*
            echo $convertStringToHex;
            echo '<br>';
            echo $convertHexToString;
            */

            curl_setopt_array($curl, array(
                CURLOPT_URL => "{$url}/tx/v1.0/transactions/updateContract",
                CURLOPT_RETURNTRANSFER => true,
                CURLOPT_ENCODING => "",
                CURLOPT_MAXREDIRS => 10,
                CURLOPT_TIMEOUT => 30,
                CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
                CURLOPT_CUSTOMREQUEST => "POST",
                CURLOPT_POSTFIELDS => "{\"from\": \"{$primary_Address}\",\"inputs\": {\"current_IdNUM\": \"{$several_parameter_array[0]}\",\"update_value\": \"{$convertStringToHex}\",\"selectkey\": {(int)$several_parameter_array[1]}}}",
                CURLOPT_HTTPHEADER => array(
                  "authorization: Bearer {$DAPP_API_KEY}",
                  "content-type: application/json"
                ),
              ));
            
            $response = curl_exec($curl);
            $err = curl_error($curl);
            $data = json_decode($response,true);
            
            curl_close($curl);
            
            if ($err) {
                echo "cURL Error #:" . $err;
            } else {
                echo $response;
                //{"result":true,"data":{"balance":"100"}}
                //echo $data['data']['balance'];
            }

            break;

        case 'post_token':
            $curl = curl_init();

            curl_setopt_array($curl, array(
                CURLOPT_URL => "{$url}/tx/v1.0/transactions/post_token",
                CURLOPT_RETURNTRANSFER => true,
                CURLOPT_ENCODING => "",
                CURLOPT_MAXREDIRS => 10,
                CURLOPT_TIMEOUT => 30,
                CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
                CURLOPT_CUSTOMREQUEST => "POST",
                CURLOPT_POSTFIELDS => "{\"from\": \"{$several_parameter_array[0]}\",\"inputs\": {\"receiverAddress\": \"{$several_parameter_array[1]}\",\"valueAmount\": {$several_parameter_array[2]}}}",
                CURLOPT_HTTPHEADER => array(
                "authorization: Bearer {$DAPP_API_KEY}",
                "content-type: application/json"
                ),
            ));
            
            $response = curl_exec($curl);
            $err = curl_error($curl);
            $data = json_decode($response,true);
            
            curl_close($curl);
            
            if ($err) {
                echo "cURL Error #:" . $err;
            } else {
                echo $response;
                //{"result":true,"data":{"balance":"100"}}
                //echo $data['data']['balance'];
            }

            break;

        case 'ta_stake':
            $curl = curl_init();

            curl_setopt_array($curl, array(
                CURLOPT_URL => "{$url}/tx/v1.0/transactions/ta_stake",
                CURLOPT_RETURNTRANSFER => true,
                CURLOPT_ENCODING => "",
                CURLOPT_MAXREDIRS => 10,
                CURLOPT_TIMEOUT => 30,
                CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
                CURLOPT_CUSTOMREQUEST => "POST",
                CURLOPT_POSTFIELDS => "{\"from\": \"{$several_parameter_array[0]}\",\"inputs\": {\"receiverAddress\": \"{$several_parameter_array[1]}\",\"valueAmount\": {$several_parameter_array[2]}}}",
                CURLOPT_HTTPHEADER => array(
                "authorization: Bearer {$DAPP_API_KEY}",
                "content-type: application/json"
                ),
            ));
            
            $response = curl_exec($curl);
            $err = curl_error($curl);
            $data = json_decode($response,true);
            
            curl_close($curl);
            
            if ($err) {
                echo "cURL Error #:" . $err;
            } else {
                echo $response;
                //{"result":true,"data":{"balance":"100"}}
                //echo $data['data']['balance'];
            }

            break;

        case 'ta_withdraw':
            $curl = curl_init();

            curl_setopt_array($curl, array(
                CURLOPT_URL => "{$url}/tx/v1.0/transactions/ta_withdraw",
                CURLOPT_RETURNTRANSFER => true,
                CURLOPT_ENCODING => "",
                CURLOPT_MAXREDIRS => 10,
                CURLOPT_TIMEOUT => 30,
                CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
                CURLOPT_CUSTOMREQUEST => "POST",
                CURLOPT_POSTFIELDS => "{\"from\": \"{$several_parameter_array[0]}\",\"inputs\": {\"receiverAddress\": \"{$several_parameter_array[1]}\",\"valueAmount\": {$several_parameter_array[2]}}}",
                CURLOPT_HTTPHEADER => array(
                "authorization: Bearer {$DAPP_API_KEY}",
                "content-type: application/json"
                ),
            ));
            
            $response = curl_exec($curl);
            $err = curl_error($curl);
            $data = json_decode($response,true);
            
            curl_close($curl);
            
            if ($err) {
                echo "cURL Error #:" . $err;
            } else {
                echo $response;
                //{"result":true,"data":{"balance":"100"}}
                //echo $data['data']['balance'];
            }

            break;

        case 'ta_giftshop':
            $curl = curl_init();

            curl_setopt_array($curl, array(
                CURLOPT_URL => "{$url}/tx/v1.0/transactions/ta_giftshop",
                CURLOPT_RETURNTRANSFER => true,
                CURLOPT_ENCODING => "",
                CURLOPT_MAXREDIRS => 10,
                CURLOPT_TIMEOUT => 30,
                CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
                CURLOPT_CUSTOMREQUEST => "POST",
                CURLOPT_POSTFIELDS => "{\"from\": \"{$several_parameter_array[0]}\",\"inputs\": {\"valueAmount\": {$several_parameter_array[1]}}}",
                CURLOPT_HTTPHEADER => array(
                "authorization: Bearer {$DAPP_API_KEY}",
                "content-type: application/json"
                ),
            ));
            
            $response = curl_exec($curl);
            $err = curl_error($curl);
            $data = json_decode($response,true);
            
            curl_close($curl);
            
            if ($err) {
                echo "cURL Error #:" . $err;
            } else {
                echo $response;
                //{"result":true,"data":{"balance":"100"}}
                //echo $data['data']['balance'];
            }

            break;

        case 'video':
            $curl = curl_init();

            curl_setopt_array($curl, array(
                CURLOPT_URL => "{$url}/tx/v1.0/transactions/ad_video",
                CURLOPT_RETURNTRANSFER => true,
                CURLOPT_ENCODING => "",
                CURLOPT_MAXREDIRS => 10,
                CURLOPT_TIMEOUT => 30,
                CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
                CURLOPT_CUSTOMREQUEST => "POST",
                CURLOPT_POSTFIELDS => "{\"inputs\": {\"receiverAddress\": \"{$parameter}\",\"valueAmount\": 30}}",
                CURLOPT_HTTPHEADER => array(
                "authorization: Bearer {$DAPP_API_KEY}",
                "content-type: application/json"
                ),
            ));
            
            $response = curl_exec($curl);
            $err = curl_error($curl);
            $data = json_decode($response,true);
            
            curl_close($curl);
            
            if ($err) {
                echo "cURL Error #:" . $err;
            } else {
                echo $response;
                //{"result":true,"data":{"balance":"100"}}
                //echo $data['data']['balance'];
            }

            break;

        case 'balance':
            $curl = curl_init();

            curl_setopt_array($curl, array(
                CURLOPT_URL => "{$url}/tx/v1.0/wallets/{$parameter}/{$main_token}/{$side_token}/balance",
                CURLOPT_RETURNTRANSFER => true,
                CURLOPT_ENCODING => "",
                CURLOPT_MAXREDIRS => 10,
                CURLOPT_TIMEOUT => 30,
                CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
                CURLOPT_CUSTOMREQUEST => "GET",
                CURLOPT_HTTPHEADER => array(
                "authorization: Bearer {$DAPP_API_KEY}",
                "content-type: application/json"),
            ));
            
            $response = curl_exec($curl);
            $err = curl_error($curl);
            $data = json_decode($response,true);
            
            curl_close($curl);
            
            if ($err) {
                echo "cURL Error #:" . $err;
            } else {
                //echo $response;
                //{"result":true,"data":{"balance":"100"}}
                echo $data['data']['balance'];
            }

            break;

        case 'wallet':

            $curl = curl_init();

            //https://xshine.tistory.com/251
            curl_setopt_array($curl, array(
            CURLOPT_URL => "{$url}/tx/v1.0/wallets",
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_ENCODING => "",
            CURLOPT_MAXREDIRS => 10,
            CURLOPT_TIMEOUT => 30,
            CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
            CURLOPT_CUSTOMREQUEST => "POST",
            CURLOPT_POSTFIELDS => "{\"walletType\": \"LUNIVERSE\",\"userKey\": \"{$parameter}\"}",
            CURLOPT_HTTPHEADER => array(
                "authorization: Bearer {$DAPP_API_KEY}",
                "content-type: application/json"
            ),
            ));
            
            $response = curl_exec($curl);
            $err = curl_error($curl);
            $data = json_decode($response,true);
            
            curl_close($curl);
            
            if ($err) {
            echo "cURL Error #:" . $err;
            } else {
            echo $response;

            $servername = "localhost";
            $username = "root";
            $password = "DBLHOLDINGS";
            $dbname = "TATATA2";
            $testtest = $data['data']['address'];

            // Create connection
            $conn = new mysqli($servername, $username, $password, $dbname);
            // Check connection
            if ($conn->connect_error) {
                die("Connection failed: " . $conn->connect_error);
            }

            $sql=  "UPDATE g5_member SET mb_1 ='".$testtest."' WHERE mb_id = '".$parameter."'";

            if ($conn->query($sql) === TRUE) {
                echo "New record created successfully";
            } else {
                echo "Error: " . $sql . "<br>" . $conn->error;
            }

            $conn->close();
            }

            break;

        case 'wallet_stake':

            $curl = curl_init();

            //https://xshine.tistory.com/251
            curl_setopt_array($curl, array(
            CURLOPT_URL => "{$url}/tx/v1.0/wallets",
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_ENCODING => "",
            CURLOPT_MAXREDIRS => 10,
            CURLOPT_TIMEOUT => 30,
            CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
            CURLOPT_CUSTOMREQUEST => "POST",
            CURLOPT_POSTFIELDS => "{\"walletType\": \"LUNIVERSE\",\"userKey\": \"{$stake_parameter}\"}",
            CURLOPT_HTTPHEADER => array(
                "authorization: Bearer {$DAPP_API_KEY}",
                "content-type: application/json"
            ),
            ));
            
            $response = curl_exec($curl);
            $err = curl_error($curl);
            $data = json_decode($response,true);
            
            curl_close($curl);
            
            if ($err) {
            echo "cURL Error #:" . $err;
            } else {
            echo $response;

            $servername = "localhost";
            $username = "root";
            $password = "DBLHOLDINGS";
            $dbname = "TATATA2";
            $testtest = $data['data']['address'];

            // Create connection
            $conn = new mysqli($servername, $username, $password, $dbname);
            // Check connection
            if ($conn->connect_error) {
                die("Connection failed: " . $conn->connect_error);
            }

            $sql=  "UPDATE g5_member SET mb_2 ='".$testtest."' WHERE mb_id = '".$parameter."'";

            if ($conn->query($sql) === TRUE) {
                echo "New record created successfully";
            } else {
                echo "Error: " . $sql . "<br>" . $conn->error;
            }

            $conn->close();
            }

            break;

}

?>