
var mqGreen1 = "#1e4c5a";
var mqGreen2 = "#42797c";
var mqGreen3 = "#729f88";

var mqEventLut = [
  "onafterprint", "onbeforeprint", "onbeforeunload", "onerror", "onhashchange",
  "onload", "onmessage", "onoffline", "ononline", "onpagehide", "onpageshow",
  "onpopstate", "onresize", "onstorage", "onunload", "onblur", "onchange",
  "oncontextmenu", "onfocus", "oninput", "oninvalid", "onreset", "onsearch",
  "onselect", "onsubmit", "onkeydown", "onkeypress", "onkeyup", "onclick",
  "ondblclick", "onmousedown", "onmousemove", "onmouseout", "onmouseover",
  "onmouseup", "onmousewheel", "onwheel", "ondrag", "ondragend", "ondragenter",
  "ondragleave", "ondragover", "ondragstart", "ondrop", "onscroll",
  "oncopy", "oncut", "onpaste", "onabort", "oncanplay", "oncanplaythrough",
  "oncuechange", "ondurationchange", "onemptied", "onended", "onerror",
  "onloadeddata", "onloadedmetadata", "onloadstart", "onpause", "onplay",
  "onplaying", "onprogress", "onratechange", "onseeked", "onseeking",
  "onstalled", "onsuspend", "ontimeupdate", "onvolumechange", "onwaiting",
  "ontoggle", "onpointermove", "onpointerup", "onpointerdown"
];

var mqAttrLut = {
  "accept": ["form","input"],
  "accept-charset": ["form"],
  "accesskey": "any",
  "action": ["form"],
  "align": ["caption","col","colgroup","hr","iframe","img","table","tbody","td","tfoot","th","thead","tr"],
  "allow": ["iframe"],
  "alt": ["area","img","input"],
  "as": ["link"],
  "async": ["script"],
  "autocapitalize": "any",
  "autocomplete": ["form","input","select","textarea"],
  "autoplay": ["audio","video"],
  "capture": ["input"],
  "charset": ["meta"],
  "checked": ["input"],
  "cite": ["blockquote","del","ins","q"],
  "class": "any",
  "cols": ["textarea"],
  "colspan": ["td","th"],
  "content": ["meta"],
  "contenteditable": "any",
  "contextmenu": "any",
  "controls": ["audio","video"],
  "coords": ["area"],
  "crossorigin": ["audio","img","link","script","video"],
  "csp": ["iframe"],
  "data": ["object"],
  "data-*": "any",
  "datetime": ["del","ins","time"],
  "decoding": ["img"],
  "default": ["track"],
  "defer": ["script"],
  "dir": "any",
  "dirname": ["input","textarea"],
  "disabled": ["button","fieldset","input","optgroup","option","select","textarea"],
  "download": ["a","area"],
  "draggable": "any",
  "enctype": ["form"],
  "enterkeyhint": ["textarea"],
  "for": ["label","output"],
  "form": ["button","fieldset","input","label","meter","object","output","progress","select","textarea"],
  "formaction": ["input","button","form"],
  "formenctype": ["button","input"],
  "formmethod": ["button","input"],
  "formnovalidate": ["button","input"],
  "formtarget": ["button","input"],
  "headers": ["td","th","th"],
  "height": ["canvas","embed","iframe","img","input","object","video"],
  "hidden": "any",
  "high": ["meter"],
  "href": ["a","area","base","link"],
  "hreflang": ["a","link"],
  "http-equiv": ["meta"],
  "id": "any",
  "integrity": ["link","script"],
  "intrinsicsize": ["img"],
  "inputmode": ["textarea"],
  "ismap": ["img"],
  "itemprop": "any",
  "kind": ["track"],
  "label": ["optgroup","option","track"],
  "lang": "any",
  "language": ["script"],
  "loading": ["img","iframe"],
  "list": ["input"],
  "loop": ["audio","marquee","video"],
  "low": ["meter"],
  "max": ["input","meter","progress"],
  "maxlength": ["input","textarea"],
  "minlength": ["input","textarea"],
  "media": ["a","area","link","source","style"],
  "method": ["form"],
  "min": ["input","meter"],
  "multiple": ["input","select"],
  "muted": ["audio","video"],
  "name": ["button","form","fieldset","iframe","input","object","output","select","textarea","map","meta","param"],
  "novalidate": ["form"],
  "open": ["details","dialog","details","dialog"],
  "optimum": ["meter"],
  "pattern": ["input"],
  "ping": ["a","area"],
  "placeholder": ["input","textarea"],
  "playsinline": ["video"],
  "poster": ["video"],
  "preload": ["audio","video"],
  "readonly": ["input","textarea"],
  "referrerpolicy": ["a","area","iframe","img","link","script"],
  "rel": ["a","area","link"],
  "required": ["input","select","textarea"],
  "reversed": ["ol"],
  "role": "any",
  "rows": ["textarea"],
  "rowspan": ["td","th"],
  "sandbox": ["iframe"],
  "scope": ["th"],
  "scoped": ["style"],
  "selected": ["option"],
  "shape": ["a","area"],
  "size": ["input","select"],
  "sizes": ["link","img","source"],
  "slot": "any",
  "span": ["col","colgroup"],
  "spellcheck": "any",
  "src": ["audio","embed","iframe","img","input","script","source","track","video"],
  "srcdoc": ["iframe"],
  "srclang": ["track"],
  "srcset": ["img","source"],
  "start": ["ol"],
  "step": ["input"],
  "style": "any",
  "summary": ["table"],
  "tabindex": "any",
  "target": ["a","area","base","form","a","form"],
  "title": "any",
  "translate": "any",
  "type": ["button","input","embed","object","ol","script","source","style","menu","link"],
  "usemap": ["img","input","object"],
  "value": ["button","data","input","li","meter","option","progress","param"],
  "width": ["canvas","embed","iframe","img","input","object","video"],
  "wrap": ["textarea"],
}

/** Return DOM object from string ID or object.
* @param {Object|String} obj DOM object or string ID
* @return {Object} DOM object
*/
function mqElement(obj) {
  return (typeof obj === 'string'||obj instanceof String? document.getElementById(obj):obj);
}

/** Set element properties, including attributes, styles, event handlers
*and methods.  Multiple key, value sets can be specified in the same call,
*and will all be applied against the object specified in the first argument. Note that non-standard attribute keys will not work, use mqAttr for those instead. The mqSet call is central to the mqSystem concept of unifying the separate CSS/HTML/JS web development domains.
* @param {(Object|String)} element  DOM object or string identifier
* @param {String} key  String that matches attribute, style, event handler or object method
* @param {Object} value Object of any type that corresponds to the key
*
* @example 
* mqSet('myelement','color','red','background','blue','class','colorful');
* mqSet('myelement','class','type1 type2');
* mqSet('myelement','onclick',(e)=>{console.log('click');});
* mqSet('myelement','innerHTML',"Hello World");
*/
function mqSet() {
  if (arguments.length<3) return;
  obj=arguments[0];
  if (obj==null) return;
  if (typeof obj === 'string'||obj instanceof String) obj = document.getElementById(obj);
  var tag = obj.tagName.toLowerCase();
  for (var i=1;i<arguments.length-1;i+=2) {
   var key = arguments[i];
   var val = arguments[i+1];
   if (["tag"].includes(key)) continue;
   if (key.includes('mq-')) continue;
   if (key=='children') {
     for (var j=0;j<val.length;j++) {
       obj.append(val[j]);
     }
   } else if (mqEventLut.includes(key)) {
      obj.addEventListener(key.slice(2),val,true);
   } else if (mqAttrLut[key]!=undefined&&
      (mqAttrLut[key]=="any"||mqAttrLut[key].includes(tag))) {
       if (key=='class') {
         var cs = val.split(' ');
         for (var j=0;j<cs.length;j++) {
           obj.classList.add(cs[j]);
         }
       } else {
         obj.setAttributeNS(null,key,val);
       }
    } else if (obj[key]!=undefined) {
      obj[key] = val;
    } else {
      obj.style[key]=val;
    }
  }
}

/** Get properties from a DOM element, including attributes styles and object variables.
* @param {(Object|String)} obj Object or string identifier
* @param {String} key String identifying the property to get
* @return {Object} Property value
*
* @example
* mqGet('myElement','color');
* mqGet('myElement','value');
* mqGet('myElement','innerHTML');
*/
function mqGet(obj,key) {
  if (typeof obj === 'string'||obj instanceof String) obj = document.getElementById(obj);
  if (obj==null) return;
  var res = null;
  var tag = obj.tagName.toLowerCase();
  if (key=='tag') { 
    res=tag; 
  } else if (mqAttrLut[key]!=undefined&&
      (mqAttrLut[key]=="any"||mqAttrLut[key].includes(tag))) {
       obj.getAttribute(key);
    } else if (obj[key]!=undefined) {
      res = obj[key];
    } else {
      var style = getComputedStyle(obj);
      res = style[key];
    }
  return res;
}

/** Apply key,value set in configuration object to DOM element
* @param {(Object|String)} obj Object or string identifier
* @param {Object} cfg Configuration object
*
* @example
* mqApplyConfig('myElement',{ color: "#fff", class: "my-class"});
*/
function mqApplyConfig(obj,cfg) {
  for (const key in cfg) {
    mqSet(obj,key,cfg[key]);
  }
}

/** Set or get a (non-standard) attribute. For standard attributes, use mqSet. 
* @param {(Object|String)} obj Object or string identifier
* @param {String} key Attribute name
* @param {String} val Optional attribute value to set
* @return {String} The value of the attribute if third argument omitted.
*
* @example
* mqAttr('myElement','my-attribute','1');
* mqAttr('myElement','my-attribute');
*/
function mqAttr(obj,key,val) {
  if (val==null) {
    return mqElement(obj).getAttribute(key);
  } else {
    return mqElement(obj).setAttributeNS(null,key,val);
  }
}

/** Set or get a style. In almost all circumstances, use mqSet instead.
* The only exception is when an element have duplicate attribute and style names 
* in which case the attribute takes precedence, such as "width" on input elements.
* @param {(Object|String)} obj Object or string identifier
* @param {String} key Style name
* @param {String} val Optional style value to set
* @return {String} The value of the style if third argument omitted.
*
* @example
* mqStyle('my-input','width','100%');
*/
function mqStyle(obj,key,val) {
  var res = val;
  if (obj) {
    var o = mqElement(obj);
    if (o==null) return;
    if (val) {
      o.style[key]=val;
    } else {
      var style = getComputedStyle(o);
      res = style[key];
    }
  }
  return res;
}

