import { getType } from 'yu-util';

function getCurrent(o1,o2){
	Object.keys(o2).forEach(key=>{
		if(getType(o2[key])==='Object'){
			o1[key] = o1[key] || {}
			getCurrent(o1[key],o2[key]);
		}else{
			o1[key] = o2[key]
		}
	})
	return o1;
}

function getSpeed(o1,o2,o3,cout){
	cout = cout || 1;
	Object.keys(o2).forEach(key=>{
		if(getType(o2[key])==='Object'){
			o1[key] = o1[key] || {};
			getSpeed(o1[key],o2[key],o3[key],cout);
		}else{
			o1[key] = (o2[key] - o3[key])/cout
		}
	})
	return o1;
}

function deepAdd(o1,o2){
	Object.keys(o2).forEach(key=>{
		if(getType(o2[key])==='Object'){
			deepAdd(o1[key],o2[key]);
		}else{
			o1[key] += o2[key]
		}
	})
}

function run (options, status, update) {
	
  const { duration, initial, target, onUpdate, complete } = options
  let current = getCurrent({},initial)
  let cout = duration / (1000 / 60)
  const speed = getSpeed({},target,initial,cout);

  (function fn () {
    if (status.stop) {
      complete(current)
      return
    }
    if (cout <= 0 || status.full) {
			getCurrent(current,target)
			update(current);
      onUpdate(current)
      complete(current)
      return
    }
    if (!status.pause) {
			
			deepAdd(current,speed)
			update(current)
      onUpdate(current)
			cout--
    }
    requestAnimationFrame(fn)
  })()
}

function ani (options,update) {
  options = options || {}
  options.duration = options.duration || 300
  options.initial = options.initial || { x: 0, y: 0 }
  options.target = options.target || { x: 0, y: 0 }
  options.onUpdate = options.onUpdate || function () {}
  options.complete = options.complete || function () {}

  const status = { pause: false, stop: false }
  const control = {
    restart: function () {
      status.stop = true
      setTimeout(() => {
        status.stop = false
        status.pause = false
        status.full = false
        run(options, status, update)
      }, 5)
    },
    play: function () {
      status.pause = false
    },
	  pause: function () {
	    status.pause = true
	  },
	  stop: function (full) {
      if (full) {
        status.full = full
      } else {
        status.stop = true
      }
	  }
  }
  run(options, status, update)
  return control
}

export default ani
