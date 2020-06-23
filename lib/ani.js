import { getType,copy } from 'yu-util'
import { tick } from 'yu-front'

function getSpeeds(initial,target,duration){	//获取每一帧的速度值
	let speeds = copy(initial);
	let count = Math.ceil(duration/(1000/60));
	count = count<1 ? 1: count;
	
	(function fn(o1,o2,o3){
		if(getType(o1,'Object')){
			Object.keys(o1).forEach(key=>{
				if(getType(o1[key],'Number')){
					o3[key] = (o2[key] - o1[key])/count;
					return;
				}
				fn(o1[key],o2[key],o3[key])
			})
		}else if(getType(o1,'Array')){
			o1.forEach((val,i)=>{
				if(getType(val,'Number')){
					o3[i] = (o2[i] - val)/count;
					return;
				}
				fn(val,o2[i],o3[i])
			})
		}
	})(initial,target,speeds)
	return speeds;
}

function equal(o1,o2){	//判断开始值和目标值，是否类似(相同类型，相同key)
	if(!/Object|Array/.test(getType(o1)) || !/Object|Array/.test(getType(o2))) return;
	
	return (function fn(o1,o2){
		let bool = false;
		if(getType(o1)!==getType(o2)) return;
		
		if(getType(o1,'Object')){
			bool = Object.keys(o1).length === Object.keys(o2).length;
			if(!bool) return
			bool = Object.keys(o1).every( key=>o2[key]!==undefined );
			if(!bool) return
			bool = Object.keys(o1).every( key=>fn(o1[key],o2[key]) );
		}else if(getType(o1,'Array')){
			bool = o1.length===o2.length;
			if(!bool) return
			bool = o1.every( (val,i)=>fn(val,o2[i]) )
		}else if(getType(o1,'Number')){
			bool = true;
		}
		return bool;
	})(o1,o2)
}

function frame(o1,o2){	//每一帧的执行函数
	if(getType(o1,'Object')){
		Object.keys(o1).forEach(key=>{
			if(getType(o1[key],'Number')){
				o1[key] += o2[key];
				return;
			}
			frame(o1[key],o2[key]);
		})
	}else if(getType(o1,'Array')){
		o1.forEach((val,i)=>{
			if(getType(val,'Number')){
				o1[i] += o2[i];
				return;
			}
			frame(val,o2[i]);
		})
	}
	return o1;
}

function isTarget(current,target,speeds){	//判断是否已达到目标值

	return (function fn(o1,o2,o3){
		if(getType(o1,'Object')){
			return Object.keys(o1).some(key=>fn(o1[key],o2[key],o3[key]))
		}else if(getType(o1,'Array')){
			return o1.some((val,i)=>fn(val,o2[i],o3[i]))
		}else if(getType(o1,'Number')){
			if(o3>0 && o1>=o2) return true;
			if(o3<0 && o1<=o2) return true;
		}
	})(current,target,speeds)
}

function run(initial,current,speeds,target,update,complete,status){	//启动动画
	(function fn(){
		if(!status.pause){
			frame(current,speeds)
			getType(update,'Function') && update(current);
		}
		if(status.stop) return;
		
		if(isTarget(current,target,speeds) || status.end){
			current = copy(target);
			getType(update,'Function') && update(current);
			getType(complete,'Function') && complete(current);
		}else{
			tick(fn)
		}
	})()
}

function getControl(options){
	let { status } = options;
	let control = {};
	control.pause = function(){
		status.pause = true;
	}
	control.regain = function(){
		status.pause = false;
	}
	control.reset = function(bool){
		status.stop = true;
		setTimeout(()=>{
			status.pause = false;
			status.stop = false;
			status.end = false;
			if(!bool){
				options.duration = 0;
				options.target = copy(options.initial);
				options.complete = null;
			}
			ani(options);
		},20)
	}
	control.stop = function(bool){
		if(bool){
			 status.end = true;
			 return;
		}
		status.stop = true;
	}
	return control;
}

function ani(options){
	//{初始值,目标值,动画持续时间,帧回调函数,完成回调函数}
	let { initial,target,duration,update,complete } = options;
	duration = getType(duration,'Number')? duration: 300;
	if(!equal(initial,target)) return
	let current = copy(initial);	//初始化当前值
	let speeds = getSpeeds(initial,target,duration); //获取每一帧的速度值
	options.status = options.status || { pause:false, stop:false, end:false };
	run(initial,current,speeds,target,update,complete,options.status) //启动动画
	return getControl(options);
}

export default ani;