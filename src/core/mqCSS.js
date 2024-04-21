
/** Insert CSS stylesheet into the page. Use this for CSS content that is not tied to a particular element.
* @param {String} id Style sheet id
* @param {String} str Style sheet content
*
* @example
* mqCSS('my-style',`@media only screen and (max-width: 600px) { .myclass { display: none; } }`);
*/
function mqCSS(id,str) {
  var obj = mqElement(id);
  var exists = (obj==null?false:true);
  if (!exists) obj = mqMakeWidget({ tag: 'style', id: id});
  mqSet(obj,'innerHTML',str);
  if (!exists) document.head.appendChild(obj);
}

