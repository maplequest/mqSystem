
function mqEvent(obj,id,cb,capture) {
  obj = mqElement(obj);
  if (obj&&addEventListener) {
    obj.addEventListener(id, cb, capture||false);
  }
}

