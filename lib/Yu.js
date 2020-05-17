import ani from './ani.js'

let initial = {};
let target = {};
let duration = 300;
let onUpdate = function(){};
let complete = function(){};

class Yu{
	constructor(arg) {
		typeof arg==='object' && (initial = arg);
	}
	
	to(arg){
		typeof arg==='object' && (target = arg);
		return this;
	}
	
	duration(arg){
		typeof arg==='number' && (duration = arg)
		return this;
	}
	
	tick(arg){
		typeof arg==='function' && (onUpdate = arg)
		return this;
	}
	
	complete(arg){
		typeof arg==='function' && (complete = arg)
		return this;
	}
	
	start(){
		return ani({ initial,target,duration,onUpdate,complete });
	}
}

export default Yu;