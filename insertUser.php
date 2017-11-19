<?php
	$HostName = "localhost";
	$DatabaseName = "gofer_db";
	$HostUser = "root";
	$HostPass = "";
	$connection = mysqli_connect($HostName,$HostUser,$HostPass,$DatabaseName);
	$json = file_get_contents('php://input');
	$obj = json_decode($json,true);
	$user_name = $obj['user_name'];
	$last_name = $obj['last_name'];
	$first_name = $obj['first_name'];
	$email = $obj['email'];
	$phone_number = $obj['phone_number'];
	$password = $obj['password'];
	$insert = "insert into user(last_name,first_name,phone_number) values ('$last_name','$first_name','$phone_number');";
	$insert .= "insert into credentials(user_name,email,password) values ('$user_name','$email','$password');";
	mysqli_multi_query($connection,$insert);
	if(mysqli_affected_rows($connection) === 0){
		$failed = "Try again!";
		$fail = json_encode($fail);
		echo $fail;	
	}else{
		$successful = "You have now created an account!";
		$success = json_encode($successful);
		echo $success;
	}
	mysqli_close($connection);
?>