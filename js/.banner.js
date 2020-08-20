// 渐隐渐现轮播图 通过 修改 透明度 实现 效果
// 可以使用 move运动函数  过渡 都可以实现

class setOpacity {
    constructor(element) {
        this.ele = element;
        this.oUllis = element.querySelectorAll('ul>li');

        this.oUl = element.querySelector('ul');
        this.oOl = element.querySelector('ol');

        this.index = 0;
        this.time;
        this.bool = '原始值';
        
    }

    init() {
        this.setLi();
        this.autoLoop();
        this.inOut();
        this.setActive();
        this.hid();
    }

    // 设定焦点
    setLi() {
        // 方法1:拼接字符串
        // 方法2:节点操作

        // 字符串拼接方式
        // let str = '';

        // this.oUllis.forEach( (v,k)=>{
        //     if(k===0){
        //         str += `<li class="active" name="olli" index=${k}></li>`;
        //     }else{
        //         str += `<li name="olli"  index=${k}></li>`;
        //     }
        // } )
        // this.oOl.innerHTML = str;


        // 节点操作方式
        // 循环遍历 ul>li,创建对象的ol>li
        this.oUllis.forEach((v, k) => {

            // 创建li标签
            const li = document.createElement('li');

            // 设定 li 标签 index属性,属性值就是索引
            li.setAttribute('index', k);

            // 设定 li 标签 name属性,是olli
            li.setAttribute('name', 'olli');

            // 索引是0,添加class样式
            if (k === 0) {
                li.className = 'active';
            }

            // li标签写入到 ol 中
            this.oOl.appendChild(li);
        })
    }

    // 改变index索引数值函数
    // 参数:改变方式 : left --操作   right ++操作

    change(type) {
        // 防止点击过快
        if(this.bool !== '原始值'){
            return;
        }
        this.bool = '不是原始值';

        // 当执行轮播显示切换时,让当前的轮播图片不显示,让下一个轮播图片显示

        // 当前图片透明度为0,运动结束,不执行任何操作,传一个空的匿名函数就行
        move(this.oUllis[this.index] , {opacity:0} , ()=>{});

        // 下一个图片: 有可能是 -- 有可能是 ++
        if (type === 'left') {
            this.index--;
        } else if (type === 'right') {
            this.index++;
        } else {
            this.index = type;
        }

        // 对 index 执行判断
        // 4个标签,length就是4 最后一个索引是 3
        // 如果 超出 3 也就是 4 , 没有这个索引对应的标签
        // 返回第一个标签,索引是0
        if (this.index === this.oUllis.length) {
            this.index = 0;
        } else if (this.index === -1) {
            // 如果是小于第一个索引0,也就是-1
            // 到最后一个图片的索引,length-1
            this.index = this.oUllis.length - 1;
        }


        // 让下一个轮播图片显示
        // 新的index的图片透明度为1,运动结束,bool赋值原始值
        move(this.oUllis[this.index] , {opacity:1} , ()=>{
            this.bool = '原始值';
        });

        // 改变ol>li,焦点样式函数
        this.setFocusStyle();
    }


    // 不用复制克隆li标签
    // 直接自动轮播
    autoLoop() {
        this.time = setInterval(()=> {
            // 调用change,传参right
            this.change('right');
        }, 3000);   
    }


    // 设定焦点样式函数
    setFocusStyle() {
        // 获取ol中所有的li
        const oOllis = this.ele.querySelectorAll('ol>li');

        // 循环遍历
        oOllis.forEach((v, k) => {
            // 清除 class 中的 active
            v.className = '';
            if (k === this.index) {
                // 索引与index表示的索引相同
                // 添加 class 样式
                v.className = 'active';
            }
        })
    }


    // 鼠标移入停止,移出继续自动轮播
    inOut() {
        this.ele.addEventListener('mouseenter', () => {
            clearInterval(this.time);
        })

        this.ele.addEventListener('mouseleave', () => {
            this.autoLoop();
        })
    }


    // 左右切换
    // 定义了 change() 函数 只要传参正确参数,就可以执行正确的效果
    // 点左按钮,传参 left
    // 点右按钮,传参 right


    // 点击焦点:
    //    让当前index对象的li,透明度是0
    //    获取当前点击标签 index属性的属性值 , 字符串---数值
    //    赋值给 index变量
    //    让新的index变量,对应的li标签透明度是1
    //    设定 焦点样式,执行函数

    setActive() {
        this.ele.addEventListener('click', e => {
            e = e || window.event;
            if (e.target.getAttribute('name') === 'left') {
                // 点击左按钮,传参left,index执行--操作
                this.change('left');
            } else if (e.target.getAttribute('name') === 'right') {
                // 点击有按钮,传参right,index执行++操作
                this.change('right');
            } else if (e.target.getAttribute('name') === 'olli') {
                // 点击焦点按钮,传参,焦点按钮index属性的属性值
                // 也就是赋值给index变量的数值
                this.change(e.target.getAttribute('index')-0);
            }
        })
    }

    // 浏览器最小化
    hid(){
        // 这里的监听浏览器切换,是监听的整个文档,这里不能改成this.ele
        document.addEventListener( 'visibilitychange' , ()=>{
            if(document.visibilityState === 'visible'){
                this.autoLoop();
            }else if(document.visibilityState === 'hidden'){
                clearInterval(this.time);
            }
        } )
    }
}






// 运动函数
// 参数1:执行运动的标签对象
// 参数2:执行运动的属性和最终坐标数据 必须是对象的形式
// 参数3:执行运动终止,执行的回调函数

function move(element, type, callback) {
    // 创建对象存储定时器
    const obj = {};

    // for...in循环参数2
    for (let key in type) {
        // 创建定时器,使用对象存储
        obj[key] = setInterval(() => {
            // 1,获取 key 属性的原始数据
            let iniVal = key === 'opacity' ? myGetStyle(element, key) * 100 : parseInt(myGetStyle(element, key));

            // 2,计算步长
            let speed = key === 'opacity' ? (type[key] * 100 - iniVal) / 5 : (type[key] - iniVal) / 5;

            // 3,步长取整
            speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);

            // 4,初始值累加步长
            iniVal += speed;

            // 5,将新的初始值,赋值给标签属性
            element.style[key] = key === 'opacity' ? iniVal / 100 : `${iniVal}px`;

            // 6,判断是否已经达到目标位置
            if (key === 'opacity') {
                if (iniVal === type[key] * 100) {
                    // 终止定时器
                    clearInterval(obj[key]);
                    // 删除对象中的数据单元
                    delete (obj[key]);
                }
            } else {
                if (iniVal === type[key]) {
                    // 终止定时器
                    clearInterval(obj[key]);
                    // 删除对象中的数据单元
                    delete (obj[key]);
                }
            }

            // 7,判断运动是否终止,也就是对象是否是空对象
            let arr = Object.keys(obj);
            if (arr.length === 0) {
                // 数组长度为0,对象为空,运动停止,执行回到函数
                callback();
            }

        }, 100)

    }
}

// 获取css样式函数
function myGetStyle(element, attr) {
    if (window.getComputedStyle) {
        return window.getComputedStyle(element)[attr];
    } else {
        return element.currentStyle[attr];
    }
}