import { getType } from 'yu-util'
import ani from './ani.js'

class Yu{
	constructor(initial){
		this._initial = /Object|Array/.test(getType(initial))? initial: {};
	}
	
	to(target){
		this._target = /Object|Array/.test(getType(target))? target: {};
		return this
	}
	
	duration(ms){
		this._duration = getType(ms,'Number')? ms: 300;
		return this;
	}
	
	update(callback){
		this._update = getType(callback,'Function')? callback: function(){};
		return this;
	}
	
	complete(callback){
		this._complete = getType(callback,'FUnction')? callback: function(){};
		return this;
	}
	
	start(){
		let initial = this._initial || {};
		let target = this._target || {};
		let duration = this._duration || 300;
		let update = this._update || function(){};
		let complete = this._complete || function(){};
		return ani({ initial, target, duration, update, complete });
	}
}

export default Yu;