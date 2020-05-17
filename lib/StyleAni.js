import ani from './ani.js'
import { getType } from 'yu-util'


let initial = {};
let target = {};
let duration = 300;
let onUpdate = function(){};
let complete = function(){};


class StyleAni{
	constructor(ele,arg) {
	  this.ele = ele;
		initial = arg
		this.tick();
	}
	
	to(arg){
		typeof arg==='object' && (target = arg);
		return this;
	}
	
	duration(arg){
		typeof arg==='number' && (duration = arg);
		return this;
	}
	
	tick(arg){
		const _this = this;
		onUpdate = function(current){
			deep( _this.ele.style,current );
			typeof arg==='function' && arg(current);
		}
		return this;
	}
	
	complete(arg){
		typeof arg==='function' && (complete = arg);
		return this;
	}
	
	start(){
		return ani({ initial,target,duration,onUpdate,complete });
	}
}

function deep(o1,o2){
	Object.keys(o2).forEach(key=>{
		if(getType(o2[key])==='Object'){
			if(key==='transform'){
				let transform = '';
				Object.keys(o2['transform']).forEach(attr=>{
					if(/rotate|skew/.test(attr)){
						transform += `${attr}(${o2['transform'][attr]}deg) `
					}else if(/scale/.test(attr)){
						transform += `${attr}(${o2['transform'][attr]}) `
					}else{
						transform += `${attr}(${o2['transform'][attr]}px) `
					}
				})
				o1['transform'] = transform
			}else{
				deep(o1,o2[key]);
			}
		}else{
			o1[key] = o2[key]+'px'
		}
	})
}

export default StyleAni