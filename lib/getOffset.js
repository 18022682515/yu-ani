
function init (offset) {
  offset.x = undefined
  offset.y = undefined
  offset.mx = undefined
  offset.my = undefined
  offset.speedX = 0
  offset.speedY = 0
  offset.ex = undefined
  offset.ey = undefined
  return offset
}

function mobile (options, offset) {
  const { element, start, move, end } = options
  const obj = {}
  let bool = false

  function moveFn (e) {
    
    e.stopPropagation()
    const touch = e.changedTouches[0]
    offset.mx = touch.clientX
    offset.my = touch.clientY
    obj.lastTime = Date.now()

    offset.speedX = offset.mx - obj.x
    offset.speedY = offset.my - obj.y

    obj.x = offset.mx
    obj.y = offset.my
    move(offset)
  }

  element.addEventListener('touchstart', (e) => {
    bool = false
    e.stopPropagation()
    init(offset)
	  const touch = e.changedTouches[0]
	  offset.x = touch.clientX
	  offset.y = touch.clientY
		obj.x = offset.x
		obj.y = offset.y
    start(offset)
	  element.addEventListener('touchmove', moveFn)
  })
  element.addEventListener('touchend', (e) => {
    if (bool) return
    bool = true
    e.stopPropagation()
    if (Date.now() - obj.lastTime > 20) {
		  offset.speedX = 0
		  offset.speedY = 0
    }
	  element.removeEventListener('touchmove', moveFn)
	  const touch = e.changedTouches[0]
	  offset.es = touch.clientX
	  offset.ey = touch.clientY
    end(offset)
  })
  document.addEventListener('touchend', (e) => {
    if (bool) return
    bool = true
	  element.removeEventListener('touchmove', moveFn)
    const touch = e.changedTouches[0]
    offset.es = touch.clientX
    offset.ey = touch.clientY
    end(offset)
  })
  return offset
}

function pc (options, offset) {
  const { element, down, move, up } = options
	const obj = {}
  let bool = false

  function moveFn (e) {
    e.stopPropagation()
    offset.mx = e.clientX
    offset.my = e.clientY
    obj.lastTime = Date.now()

    offset.speedX = offset.mx - obj.x
    offset.speedY = offset.my - obj.y

    obj.x = offset.mx
    obj.y = offset.my
    move(offset)
  }

  element.addEventListener('mousedown', (e) => {
    bool = false
    e.stopPropagation()
    init(offset)
	  offset.x = e.clientX
	  offset.y = e.clientY
    obj.x = offset.x
    obj.y = offset.y
    down(offset)
	  element.addEventListener('mousemove', moveFn)
  })
  element.addEventListener('mouseup', (e) => {
    if (bool) return
    bool = true
    e.stopPropagation()
    if (Date.now() - obj.lastTime > 20) {
      offset.speedX = 0
      offset.speedY = 0
    }
	  element.removeEventListener('mousemove', moveFn)
	  offset.ex = e.clientX
	  offset.ey = e.clientY
    up(offset)
  })
  document.addEventListener('mouseup', (e) => {
    if (bool) return
    bool = true
	  element.removeEventListener('mousemove', moveFn)
    offset.ex = e.clientX
    offset.ey = e.clientY
    up(offset)
  })
}

function getOffset (options) {
  options.start = options.start || function () {}
  options.move = options.move || function () {}
  options.end = options.end || function () {}
  options.down = options.down || function () {}
  options.up = options.up || function () {}

  if (options.element.ontouchstart !== undefined) {
    mobile(options, {})
  } else {
    pc(options, {})
  }
}

export default getOffset
