
function mqPositionChildren (elem) {
  mqSet(elem,'position','relative','top','0','left','0');
}

function mqPosition (elem,x,y) {
  mqSet(elem,'position','absolute','top',y||'50%',
             'left',x||'50%','transform','translate(-50%,-50%)');
}

function mqPositionBL(elem) { mqApplyConfig(elem, {
  "position": "absolute", "bottom": "0px", "left": "0px"
}); }

function mqPositionBR(elem) { mqApplyConfig(elem, {
  "position": "absolute", "bottom": "0px", "right": "0px"
}); }

function mqPositionBC(elem) { mqApplyConfig(elem, {
  "position": "absolute", "bottom": "0px", "left": "50%", "transform": "translatex(-50%)"
}); }

function mqPositionTL(elem) { mqApplyConfig(elem, {
  "position": "absolute", "top": "0px", "left": "0px"
}); }

function mqPositionTR(elem) { mqApplyConfig(elem, {
  "position": "absolute", "top": "0px", "right": "0px"
}); }

function mqPositionTC(elem) { mqApplyConfig(elem, {
  "position": "absolute", "top": "0px", "left": "50%", "transform": "translatex(-50%)"
}); }

function mqPositionCC(elem) { mqApplyConfig(elem, {
  "position": "absolute", "top": "50%", "left": "50%", "transform": "translate(-50%,-50%)"
}); }

function mqPositionCL(elem) { mqApplyConfig(elem, {
  "position": "absolute", "top": "50%", "left": "0px", "transform": "translatey(-50%)"
}); }

function mqPositionCR(elem) { mqApplyConfig(elem, {
  "position": "absolute", "top": "50%", "right": "0px", "transform": "translatey(-50%)"
}); }


/*
function mqElementPosition(obj) {
  var element = mqElement(obj);
  var y = 0, x = 0;
  while (element) {
    y += element.offsetTop  || 0;
    x += element.offsetLeft || 0;
    element = element.offsetParent;
  };
  return [ x, y ];
}
*/

function mqElementPosition(obj,dx,dy) {
  var o = mqElement(obj);
  var y0 = parseFloat(o.style.top);
  var x0 = parseFloat(o.style.left);
  if (dx!=null) { 
    o.style.left=(x0+dx)+'px';
  } if (dy!=null) { 
    o.style.top=(y0+dy)+'px';
  }
  var offsets = o.getBoundingClientRect();
  var y=offsets.bottom + window.scrollY;
  var x=offsets.left + window.scrollX;
  return [x,y];
}

/*
function mqElementPosition( el ) {
    var _x = 0;
    var _y = 0;
    while( el && !isNaN( el.offsetLeft ) && !isNaN( el.offsetTop ) ) {
        _x += el.offsetLeft - el.scrollLeft;
        _y += el.offsetTop - el.scrollTop;
        el = el.offsetParent;
    }
    return [ _y, _x ];
}
*/
