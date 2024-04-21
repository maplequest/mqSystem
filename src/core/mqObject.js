

/** Merge multiple objects into one
* @return {Object} A new object containing the properties of input objects
*/
function mqMerge() {
  var res = {};
  for (var i=0;i<arguments.length;i++) {
    var obj = arguments[i];
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        res[key]=obj[key];
      }
    }
  }
  return res;
}

/** Clone an object
* @param {Object} obj The object to clone
* @return {Object} The cloned object
*/
function mqClone(obj) {
  return mqMerge(obj);
}

