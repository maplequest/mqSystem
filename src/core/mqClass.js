
/** Returns all elements of a given class
* @param {String} cstr Class name
* @return {Array} Array of DOM elements 
*
* @example
* mqElementsOfClass('my-class');
*/
function mqElementsOfClass(cstr) {
  return document.getElementsByClassName(cstr);
}

/** Remove classes from object, optionally adding them to members of radio group
* @param {(Object|String)} obj Object or string identifier
* @param {String} cstr Class name or list of class names 
* @param {String} groupstr Optional "radio" group name
*
* @example
* mqClassRemove('myElement','unwanted-class');
* mqClassRemove('myRadioElement','disabled','my-radio-group');
*/
function mqClassRemove(obj,cstr,groupstr) {
  var cs = cstr.split(' ');
  for (var j=0;j<cs.length;j++) {
    var c=cs[j];
    if (groupstr) {
      var es = mqElementsOfClass(groupstr);
      for (var i=0;i<es.length;i++) {
        es[i].classList.add(c);
      }
    }
    if (obj) mqElement(obj).classList.remove(c);
  }
}

/** Add classes to object, optionally deleting them from members of radio group
* @param {(Object|String)} obj Object or string identifier
* @param {String} cstr Class name or list of class names
* @param {String} groupstr Optional "radio" group name
*
* @example
* mqClassAdd('myElement','wanted-class');
* mqClassAdd('myRadioElement','enabled','my-radio-group');
*/
function mqClassAdd(obj,cstr,groupstr) {
  var cs = cstr.split(' ');
  for (var j=0;j<cs.length;j++) {
    var c=cs[j];
    if (groupstr) {
      var es = mqElementsOfClass(groupstr);
      for (var i=0;i<es.length;i++) {
        es[i].classList.remove(c);
      }
    }
    if (obj) mqElement(obj).classList.add(c);
  }
}

/** Apply function to objects of a specified class
* @param {(Object|String)} cstr Object or string identifier
* @param {Function} fun Function to apply
*
* @example
* mqClassApply('labels',(o)=>{mqSet(o,'color','red');});
*/
function mqClassApply(cstr,fun) {
  var es = mqElementsOfClass(cstr);
  for (var i=0;i<es.length;i++) { fun(es[i]); }
}

/** Check if an object has a given class
* @param {(Object|String)} obj Object or string identifier
* @param {String} cstr Class name
* @return {Boolean} Returns true if object contains class, otherwise false.
*
* @example
* mqHasClass('myElement','some-class');
*/
function mqHasClass(obj,cstr) {
  return mqElement(obj).classList.contains(cstr);
}

