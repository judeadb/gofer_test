<?php
	$HostName = "localhost";
	$DatabaseName = "gofer_db";
	$HostUser = "root";
	$HostPass = "";
	$connection = mysqli_connect($HostName,$HostUser,$HostPass,$DatabaseName);
	$json = file_get_contents('php://input');
	$obj = json_decode($json,true);
	$credential = $obj['credential'];
	$check_query = "select password from credentials where user_name = '$credential' or email = '$credential';";
	$getIt = mysqli_query($connection,$check_query);
	if(mysqli_num_rows($getIt) === 0){
		$wrongCredentials = "Invalid Username or Email or Password. Please try again!";
		$wcJSon = json_encode($wrongCredentials);
		echo $wcJSon;		
	}else{
		$getPass = mysqli_fetch_array($getIt,MYSQLI_ASSOC);
		$getPassword = $getPass["password"];
		$givePasswordForCheck = json_encode($getPassword);
		echo $givePasswordForCheck;
	}
	mysqli_close($connection);
?>