
function inertia (speeds, callback, rub) {
  cancelAnimationFrame(window.yuTimer)
  rub = rub || 0.95
  Object.keys(speeds).forEach(key => {
    speeds[key] = typeof speeds[key] === 'number' ? speeds[key] : 0
  });
	return new Promise(res=>{
		(function fn () {
		  let last = Math.abs(speeds[0])
		  Object.keys(speeds).forEach(key => {
		    speeds[key] *= rub
		    if (Math.abs(speeds[key]) > last) {
		      last = Math.abs(speeds[key])
		    }
		  })
		  callback(speeds)
		  if (last < 0.01){
				res(speeds)
				return
			}
		  window.yuTimer = requestAnimationFrame(fn)
		})()
	})
  
}

export default inertia
