
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
  "ontoggle"
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

function mqElement(obj) {
  return (typeof obj === 'string'||obj instanceof String? document.getElementById(obj):obj);
}

function mqSet() {
  if (arguments.length<3) return;
  obj=arguments[0];
  if (typeof obj === 'string'||obj instanceof String) obj = document.getElementById(obj);
  if (obj==null||["tag"].includes(key)) return;
  var tag = obj.tagName.toLowerCase();
  for (var i=1;i<arguments.length-1;i+=2) {
   var key = arguments[i];
   var val = arguments[i+1];
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

function mqApplyConfig(obj,cfg) {
  for (const key in cfg) {
    mqSet(obj,key,cfg[key]);
  }
}

function mqMakeWidget(cfg) {
  var obj = document.createElement(cfg["tag"]||'div');
  mqApplyConfig(obj,cfg);
  return obj;
}

function mqPositionChildren (elem) {
  mqSet(elem,'position','relative');
  mqSet(elem,'top','0');
  mqSet(elem,'left','0');
}

function mqPosition (elem,x,y) {
  mqSet(elem,'position','absolute');
  mqSet(elem,'top',y||'50%');
  mqSet(elem,'left',x||'50%');
  mqSet(elem,'transform','translate(-50%,-50%)');
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

function mqMakeCenteredWidget(cfgOuter,cfgInner) {
  var o = mqMakeWidget(cfgOuter);
  mqPositionChildren(o);
  var o2 = null;
  o2 = mqMakeWidget(cfgInner);
  mqPositionCC(o2);
  mqAppend(o,o2);
  return [o,o2];
}

function mqNaN (x) { return (x==null?true:isNaN(x)); }

function mqElementsOfClass(cstr) {
  return document.getElementsByClassName(cstr);
}

function mqAttr(obj,key,val) {
  if (val==null) {
    return mqElement(obj).getAttribute(key);
  } else {
    return mqElement(obj).setAttributeNS(null,key,val);
  }
}

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

function mqPrepend(obj1,obj2) {
  if (obj1) {
    if (obj2) {
      mqElement(obj1).prepend(obj2);
    } else {
      mqElement('mq-root').prepend(obj1);
    }
  }
}

function mqAppend(obj1,obj2) {
  if (obj1) {
    if (obj2) {
      mqElement(obj1).append(obj2);
    } else {
      mqElement('mq-root').append(obj1);
    }
  }
}


function boot() {
  document.title="MapleQuest API";
  var link = document.createElement('link');
  link.id='dynamic-favicon';
  link.rel='shortcut icon';
  link.href='icon-16x16.png';
  document.head.appendChild(link);
  mqSet('maplequestapi','innerHTML','MapleQuest API');
  var obj = mqMakeCenteredWidget({
    "height": "200px",
   },{ 
    tag: "img",
    src: "icon.svg",
    "height": "150px",
  })[0];
  var obj2=mqElement('split-left');
  mqPrepend(obj2,mqMakeWidget({
    'tag': 'a',
    'href': 'https://github.com/maplequest',
    'innerHTML': "MapleQuestLabs Repositories",
    'class': 'py1 px2',
    'display': 'block',
    'target': '_blank'
  }));
   mqPrepend(obj2,mqMakeWidget({
    'tag': 'a',
    'href': 'https://maplequestlabs.com',
    'innerHTML': "MapleQuestLabs Website",
    'class': 'py1 px2',
    'target': '_blank'
  }));
  mqPrepend(obj2,obj);
}

window.addEventListener('load',boot);

