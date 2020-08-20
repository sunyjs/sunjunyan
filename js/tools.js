// 生成验证码函数
function mySetVc() {
    var str = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXUZ';
    var newStr = '';
    for (var i = 1; i <= 6; i++) {
        var num = parseInt(Math.random() * str.length)

        if (newStr.indexOf(str[num]) === -1) {
            newStr += str[num];
        } else {
            i--;
        }
    }

    return newStr;
}

// 获取地址栏数据信息
function getUrlVal() {
    // 1,获取地址栏参数字符串
    let str = decodeURI(window.location.search).substr(1);

    // 创建存储结果的对象
    let obj = {};

    // 2 转化为数组 根据 分号空格转化
    const arr1 = str.split('&')

    // 3 循环变量数组,将数据字符串,根据=等号分割为数组
    arr1.forEach(v => {
        let arr2 = v.split('=');
        obj[arr2[0]] = arr2[1];
    })

    return obj;

}



// 生成table表格函数
// 参数1:数组,需要参照的数据数组
// 参数2:标签,需要写入内容的标签对象
function mySetTable(array, element) {
    var str = '';
    array.forEach(function (v, k) {
        str += '<tr>';
        for (var key in v) {
            str += `<td>${v[key]}</td>`;
        }
        str += `<td><button index="${k}">删除</button></td>`
        str += '</tr>';
    });
    element.innerHTML = str;
    var oBtns = document.querySelectorAll('button');

    mySetButton(oBtns, array, element);
}

// 给button按钮绑定删除效果函数
// 参数1,button按钮数组
// 参数2,数据数组
// 参数3,写入内容的标签对象
function mySetButton(BtnArray, array, element) {
    BtnArray.forEach(function (v) {
        v.onclick = function () {
            var bool = window.confirm('确定,是否删除');
            if (bool) {
                var index = v.getAttribute('index');
                array.splice(index, 1);
                mySetTable(array, element);
            }
        }
    })
}


// 处理监听事件兼容性函数
// 参数1:需要绑定事件的标签对象
// 参数2:需要绑定的事件类型,没有on
// 参数3:需要绑定的事件处理函数
function myAddEvent(element, type, fun) {
    if (element.addEventListener) {
        // 普通浏览器
        element.addEventListener(type, fun);
    } else {
        // 低版本IE浏览器
        element.attachEvent('on' + type, fun);
    }
}


// 获取css样式函数
// 参数1,需要属性的标签对象
// 参数2,需要属性的属性名称

function myGetStyle(element, type) {
    if (window.getComputedStyle) {
        return window.getComputedStyle(element)[type];
    } else {
        return element.currentStyle[type];
    }
}



// 设定 cookie 函数
// 参数1: cookie 的键名
// 参数2: cookie 的键值
// 参数3: cookie 的时效(秒数)

function mySetCookie(key, value, time) {
    // 1,获取当前的时间对象
    const nowTime = new Date();

    // 2,获取当前时间的时间戳 --- 单位是毫秒
    let timeStamp = nowTime.getTime();

    // 3,计算时间戳    当前时间戳 - 8小时 + 时效的时间(秒)
    // 获取带有时效的时间戳 是世界标准时间
    let newTimeStamp = timeStamp - 8 * 60 * 60 * 1000 + time * 1000;

    // 4,将时间戳设定回时间对象
    nowTime.setTime(newTimeStamp);

    // 5,兼容没有传第三个参数的情况
    // 如果 time 是 undefined ,证明没有第三个参数,执行会话时效,赋值空字符串
    // 如果 time 不是 undefined ,证明没有第三个参数,执行 nowTime 时间对象中的时间戳时效
    let endTime = time === undefined ? '' : nowTime;

    // 6,设定cookie
    // 给cookie多设定一个属性,path=/
    // 让www中的所有文件都可以使用设定的cookie
    document.cookie = `${key}=${value};expires=${endTime};path=/`;

}



// 获取 cookie 的具体数据
function myGetCookie() {
    // 创建存储结果的对象
    let obj = {};

    // 1 获取cookie字符串
    let str = document.cookie;

    // 2 转化为数组 根据 分号空格转化
    const arr1 = str.split('; ')

    // 3 循环变量数组,将数据字符串,根据=等号分割为数组
    arr1.forEach(v => {
        let arr2 = v.split('=');
        obj[arr2[0]] = arr2[1];
    })

    return obj;
}