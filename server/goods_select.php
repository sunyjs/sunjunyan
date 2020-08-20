<?php
// 加载php配置文件,类似于 script标签,通过src导入js文件
// 为了使用配置文件中的定义的数据参数
include_once './config.php';

// 1,获取前端post方式传参数据
$name = $_POST['userName'];

// 2,执行数据库查询操作 

// 链接数据库,参数是配置文件中定义的参数
$link = mysqli_connect($host, $user, $pwd, $dbname, $port);

// 定义SQL语句
$sql = "SELECT `id` FROM `user` WHERE `name` = '{$name}' ";

// 执行SQL语句,查询语句,执行结果是 结果集对象
$result = mysqli_query($link, $sql);

// 抽取结果集对象中的数据,组成一个数组
$arr = mysqli_fetch_all($result , MYSQLI_ASSOC);

// 使用 count($arr) 获取数组的长度
// 如果长度是 0 证明没有匹配数据,账号是可以使用的
// 如果长度是 1 证明有匹配数据,账号是不能使用的

if(count($arr) === 0){
    echo json_encode(['res'=>1,'msg'=>'账号可以使用']);
}else{
    echo json_encode(['res'=>0,'msg'=>'账号重复,不能使用']);
}