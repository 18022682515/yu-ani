# yu-ani
  *js动画函数*
  
### 安装
```
npm install yu-ani --save
```
  
### 引入
```javascript
import { ani, setCss, getOffset, inertia } from 'yu-ani';
```

### setCss(element,options) 元素的样式动画
```javascript
let options = {
	duration:300,  //默认300毫秒
	initial:{      //动画初始值
		width:0,
		height:0,
		transform:{
			translateX:0,
			rotate:0,
			scaleX:1
		}
	},
	target:{       //动画目标值
		width:150,
		height:100,
		transform:{
			translateX:300,
			rotate:180,
			scaleX:3
		}
	},
	onUpdate(current){    //每一帧动画的回调函数
		//current 动画当前值
	},
	complete(current){    //动画停止后的回调函数
		//current 动画当前值
	}
}
let status = setCss(document.querySelector('div'),options)
/* 
	status.restart()  //动画重新开始
	status.pause()    //动画暂停
	status.play()     //动画暂停后恢复
	status.stop()			//动画立即停止。
	status.stop(true) //动画立即完成
*/
```


### ani(options) 帧动画
```javascript
let options = {
	duration: 300,  //默认300毫秒
	initial: { x:100,y:50 }, //动画初始值
	target: { x:100,y:50 },  //动画目标值
	onUpdate(current){    //每一帧动画的回调函数
		//current 动画当前值
	},
	complete(current){    //动画停止后的回调函数
		//current 动画当前值
	}
}
let status = ani(options);
/* 
	status.restart()  //动画重新开始
	status.pause()    //动画暂停
	status.play()     //动画暂停后恢复
	status.stop()			//动画立即停止。
	status.stop(true) //动画立即完成
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

### inertia(speeds, callback, rub) 惯性动画
```javascript
let speeds = { x:2, y:1 }  //每一帧的速度值
let rub = 0.95						//每一帧动画的摩擦比率
function callback (current) {  //每一帧的回调函数
	//current   		每一帧计算完摩擦比率后的速度值
}
inertia(speeds, callback, rub).then(current=>{})
//返回promise对象，惯性动画完成后，promise变成resolve状态
```