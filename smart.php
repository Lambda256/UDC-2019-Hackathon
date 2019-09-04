<?php
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

    echo $Volunteers_count;
    echo $v_value_Volunteers;
    echo $v_value_Endpoint_order;
    echo $v_value_Driver;
    echo $v_value_Mobility_model;
    echo $v_value_Route;
    echo $v_value_Total_Fee;
    echo $v_value_Risk_factor;
    echo $v_value_Volunteers_ratio;
    echo $v_value_Time;
    echo '<br>';

    $temp = '{"Volunteers": "' .$v_value_Volunteers. '", "Volunteers_count": ' .(int)$Volunteers_count. ', "Endpoint_order": "' .$v_value_Endpoint_order. '", 
        "Driver": "' .$v_value_Driver. '", "Mobil_model": "' .$v_value_Mobility_model. '", "Route": "' .$v_value_Route. '",
        "Total_Fee": ' .$v_value_Total_Fee. ', "Risk_factor": ' .$v_value_Risk_factor. ', "v_value_Volunteers_ratio": "[' .$v_value_Volunteers_ratio. ']",
        "Time": "' .$v_value_Time. '"}';

    echo $temp;

    echo '<br>';

    $convertStringToHex = bin2hex($temp);
    $convertHexToString = hex2bin($convertStringToHex);

    echo $convertStringToHex;

    echo '<br>';
    
    echo $convertHexToString;

?>