# yu-ani
  *js动画函数*
  
### 安装
```
npm install yu-ani --save
```
  
### 引入
```javascript
import { ani, Yu, getOffset, inertia } from 'yu-ani';
```


### ani(options) 数字补间动画
```javascript
let options = {
	duration: 300,  //默认300毫秒
	initial: { x:0,y:0,arr:[0,0] }, //动画初始值
	target: { x:100,y:50,arr:[150,80] },  //动画目标值
	update(current){    //每一帧动画的回调函数
		//current 动画当前值
	},
	complete(current){    //动画停止后的回调函数
		//current 动画当前值
	}
}
let status = ani(options);
/* 
	status.pause()    	//动画暂停
	status.regain()   	//动画暂停后恢复
	status.reset()  		//动画重置到最初
	status.reset(true)	//动画重新开始
	status.stop()				//动画立即停止。
	status.stop(true) 	//动画立即完成
*/
```

### Yu——数字补间动画的链式调用方式
```javascript
let status = new Yu({ x:0,y:0 })  //动画初始值
		.to({ x:100,y:50 })  					//动画目标值
		.duration(500)								//动画持续时间500毫秒
		.update(current=>{})						//每一帧动画的回调函数，current是动画当前值
		.complete(current=>{})				//动画停止后的回调函数
		.start();											//启动动画

/* 
	status.pause()    	//动画暂停
	status.regain()   	//动画暂停后恢复
	status.reset()  		//动画重置到最初
	status.reset(true)	//动画重新开始
	status.stop()				//动画立即停止。
	status.stop(true) 	//动画立即完成
*/
```

### getOffset(options) 元素的pc端点击事件，和移动端的触屏事件
```javascript
let options = {
	element: document.querySelector('div'),
	down(offset){},   //鼠标按下事件
	up(offset){},			//鼠标松开事件
	start(offset){},	//手指触屏事件
	end(offset){},		//手指离屏事件
	move(offset){}		//鼠标移动事件，手指屏幕移动事件
}
/* 
	offset.x		//鼠标按下时的x轴坐标，手指触屏时的x轴坐标
	offset.y		//鼠标按下时的y轴坐标，手指触屏时的y轴坐标
	offset.mx		//鼠标移动时的x轴坐标，手指屏幕移动时的x轴坐标
	offset.my		//鼠标移动时的y轴坐标，手指屏幕移动时的y轴坐标
	offset.speedX		//鼠标x轴的移动速度，手指x轴的移动速度
	offset.speedY		//鼠标y轴的移动速度，手指y轴的移动速度
	offset.ex		//鼠标松开时的x轴坐标，手指离开屏幕时的x轴坐标
	offset.ey		//鼠标松开时的y轴坐标，手指离开屏幕时的y轴坐标
*/
}
```

### inertia(speeds, update, complete, rub) 惯性动画
```javascript
let speeds = { x:2, y:1 }  		//每一帧的速度值
function update (current) {		//每一帧的回调函数
	//current   		计算摩擦比率后的当前速度值
}
function complete(current){}	//动画完成的回调函数
let rub = 0.95								//每一帧动画的摩擦比率，默认0.95

inertia(speeds, update, complete, rub)
```