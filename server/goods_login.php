<?php
include_once './config.php';

$userName = $_POST['userName'];
$userPwd = $_POST['userPwd'];

$link = mysqli_connect($host, $user, $pwd, $dbname, $port);

$sql = "SELECT `id` FROM `user` WHERE `name` = '{$userName}' AND `pwd` = '{$userPwd}'";

$result = mysqli_query($link, $sql);

$arr = mysqli_fetch_all($result);

if(count($arr) === 1){
    echo json_encode(['res'=>1,'msg'=>'登录成功']);
}else{
    echo json_encode(['res'=>0,'msg'=>'登录失败']);
}