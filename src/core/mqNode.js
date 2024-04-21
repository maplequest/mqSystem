
/** Return the first child of an element
* @param {(Object|String)} obj Object or string identifier
* @return {Object} The first child of the object
*
* @example
* mqFirstChild('myElement');
*/
function mqFirstChild (obj) {
  return (obj?mqElement(obj).firstChild:null);
}

/** Return the last child of an element
* @param {(Object|String)} obj Object or string identifier
* @return {Object} The last child of an element
*
* @example
* mqLastChild('myElement');
*/
function mqLastChild (obj) {
  return (obj?mqElement(obj).lastChild:null);
}

/** Return the parent of an element
* @param {(Object|String)} obj Object or string identifier
* @return {Object} The parent of the object
*
* @example
* mqParent('myElement');
*/
function mqParent (obj) {
  return mqElement(obj).parentElement;
}

/** Prepend element to another
* @param {(Object|String)} obj1 Object or string identifier
* @param {Object} obj2 Another DOM object
*
* @example
* mqPrepend('myElement',mqMakeWidget({id: "myOtherElement"}));
*/
function mqPrepend(obj1,obj2) {
  if (obj1) {
    if (obj2) {
      mqElement(obj1).prepend(obj2);
    } else {
      mqElement('mq-root').prepend(obj1);
    }
  }
}

/** Append element to another
* @param {(Object|String)} obj1 Object or string identifier
* @param {Object} obj2 Another DOM object
*
* @example
* mqAppend('myElement',mqMakeWidget({id: "myOtherElement"}));
*/
function mqAppend(obj1,obj2) {
  if (obj1) {
    if (obj2) {
      mqElement(obj1).append(obj2);
    } else {
      mqElement('mq-root').append(obj1);
    }
  }
}

/** Remove element
* @param {(Object|String)} obj Object or string identifier
*
* @example
* mqDelete('myElement');
*/
function mqDelete(obj) {
  var o = mqElement(obj);
  if (o&&o.remove) o.remove();
}

