/* global anchors */

// add anchor links to headers
anchors.options.placement = 'left';
anchors.add('h3');

// Filter UI
var tocElements = document.getElementById('toc').getElementsByTagName('li');

document.getElementById('filter-input').addEventListener('keyup', function (e) {
  var i, element, children;

  // enter key
  if (e.keyCode === 13) {
    // go to the first displayed item in the toc
    for (i = 0; i < tocElements.length; i++) {
      element = tocElements[i];
      if (!element.classList.contains('display-none')) {
        location.replace(element.firstChild.href);
        return e.preventDefault();
      }
    }
  }

  var match = function () {
    return true;
  };

  var value = this.value.toLowerCase();

  if (!value.match(/^\s*$/)) {
    match = function (element) {
      var html = element.firstChild.innerHTML;
      return html && html.toLowerCase().indexOf(value) !== -1;
    };
  }

  for (i = 0; i < tocElements.length; i++) {
    element = tocElements[i];
    children = Array.from(element.getElementsByTagName('li'));
    if (match(element) || children.some(match)) {
      element.classList.remove('display-none');
    } else {
      element.classList.add('display-none');
    }
  }
});

var items = document.getElementsByClassName('toggle-sibling');
for (var j = 0; j < items.length; j++) {
  items[j].addEventListener('click', toggleSibling);
}

function toggleSibling() {
  var stepSibling = this.parentNode.getElementsByClassName('toggle-target')[0];
  var icon = this.getElementsByClassName('icon')[0];
  var klass = 'display-none';
  if (stepSibling.classList.contains(klass)) {
    stepSibling.classList.remove(klass);
    icon.innerHTML = '▾';
  } else {
    stepSibling.classList.add(klass);
    icon.innerHTML = '▸';
  }
}

function showHashTarget(targetId) {
  if (targetId) {
    var hashTarget = document.getElementById(targetId);
    // new target is hidden
    if (
      hashTarget &&
      hashTarget.offsetHeight === 0 &&
      hashTarget.parentNode.parentNode.classList.contains('display-none')
    ) {
      hashTarget.parentNode.parentNode.classList.remove('display-none');
    }
  }
}

function scrollIntoView(targetId) {
  // Only scroll to element if we don't have a stored scroll position.
  if (targetId && !history.state) {
    var hashTarget = document.getElementById(targetId);
    if (hashTarget) {
      hashTarget.scrollIntoView();
    }
  }
}

function gotoCurrentTarget() {
  showHashTarget(location.hash.substring(1));
  scrollIntoView(location.hash.substring(1));
}

window.addEventListener('hashchange', gotoCurrentTarget);
gotoCurrentTarget();

var toclinks = document.getElementsByClassName('pre-open');
for (var k = 0; k < toclinks.length; k++) {
  toclinks[k].addEventListener('mousedown', preOpen, false);
}

function preOpen() {
  showHashTarget(this.hash.substring(1));
}

var split_left = document.querySelector('#split-left');
var split_right = document.querySelector('#split-right');
var split_parent = split_left.parentNode;
var cw_with_sb = split_left.clientWidth;
split_left.style.overflow = 'hidden';
var cw_without_sb = split_left.clientWidth;
split_left.style.overflow = '';

Split(['#split-left', '#split-right'], {
  elementStyle: function (dimension, size, gutterSize) {
    return {
      'flex-basis': 'calc(' + size + '% - ' + gutterSize + 'px)'
    };
  },
  gutterStyle: function (dimension, gutterSize) {
    return {
      'flex-basis': gutterSize + 'px'
    };
  },
  gutterSize: 20,
  sizes: [33, 67]
});

// Chrome doesn't remember scroll position properly so do it ourselves.
// Also works on Firefox and Edge.

function updateState() {
  history.replaceState(
    {
      left_top: split_left.scrollTop,
      right_top: split_right.scrollTop
    },
    document.title
  );
}

function loadState(ev) {
  if (ev) {
    // Edge doesn't replace change history.state on popstate.
    history.replaceState(ev.state, document.title);
  }
  if (history.state) {
    split_left.scrollTop = history.state.left_top;
    split_right.scrollTop = history.state.right_top;
  }
}

window.addEventListener('load', function () {
  // Restore after Firefox scrolls to hash.
  setTimeout(function () {
    loadState();
    // Update with initial scroll position.
    updateState();
    // Update scroll positions only after we've loaded because Firefox
    // emits an initial scroll event with 0.
    split_left.addEventListener('scroll', updateState);
    split_right.addEventListener('scroll', updateState);
  }, 1);
});

window.addEventListener('popstate', loadState);

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

