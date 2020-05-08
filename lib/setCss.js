import ani from './ani.js'
import { getType } from 'yu-util'

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

function setCss(ele, options){
	return ani(options,function(current){
		deep( ele.style,current );
	})
}

export default setCss