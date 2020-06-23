import { getType,copy } from 'yu-util'
import { tick,clearTick } from 'yu-front'

let timer = null;

function frame(current, rub){	//每一帧执行的计算
	
	(function fn(o){
		if(getType(o,'Object')){
			Object.keys(o).forEach(key=>{
				if(getType(o[key],'Number')){
					o[key] *= rub;
					return;
				}
				fn(o[key])
			})
		}else if(getType(o,'Array')){
			o.forEach((val,i)=>{
				if(getType(val,'Number')){
					o[i] *= rub;
					return;
				}
				fn(val)
			})
		}
	})(current)
	
	return current;
}


function isType(speeds){	//判断参数类型是否符合,（只能对象、数组、数字）
	return (function fn(o){
		if(getType(o,'Object')){
			return Object.keys(o).every(key=>fn(o[key]))
		}else if(getType(o,'Array')){
			return o.every(val=>fn(val))
		}else if(getType(o,'Number')){
			return true;
		}
	})(speeds)
}

function isTarget(current){ //判断是否达到目标值
	return (function fn(o){
		if(getType(o,'Object')){
			return Object.keys(o).some(key=>fn(o[key]))
		}else if(getType(o,'Array')){
			return o.some(key=>fn(o[key]))
		}else if(getType(o,'Number') && Math.abs(o)<0.001){
			return true;
		}
	})(current)
}

function run(current,update,complete,rub){ //启动动画
	clearTick(timer);
	(function fn(){
		frame(current, rub);
		getType(update,'Function') && update(current)
		if(isTarget(current)){
			getType(complete,'Function') && complete(current)
		}else{
			timer = tick(fn)
		}
	})()
}

function inertia (speeds, update, complete, rub) {
	rub = getType(rub,'Number')? rub: 0.95;
	if(!isType(speeds)) return;
  let current = copy(speeds);
  run(current, update, complete, rub);
}

export default inertia
