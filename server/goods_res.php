<?php
include_once './config.php';

$userName = $_POST['userName'];
$userPwd = $_POST['userPwd'];

$link = mysqli_connect($host, $user, $pwd, $dbname, $port);

$sql = "INSERT INTO `user`(`name` , `pwd`) VALUES('{$userName}' , '{$userPwd}')";

$result = mysqli_query($link, $sql);

// // 写入成功,执行结果是true,写入失败是false
if($result == true){
    // 返回值是1表示成功
    echo json_encode(['res'=>1,'msg'=>'注册成功']);
}else{
    // 返回值是0表示失败
    echo json_encode(['res'=>0,'msg'=>'用户名重复,注册失败']);
}