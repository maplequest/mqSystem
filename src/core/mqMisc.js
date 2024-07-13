

/** Trigger a resize event
*
* @example
* mqResize();
*/
function mqResize() {
  setTimeout(function() {
    window.dispatchEvent(new Event('resize'));
  },10);
}

function mqDimension(obj,key) {
  var r = obj.getBoundingClientRect();
  return r[key];
}

/** Identify the user browser
* @return {String} A string identifying the browser: chrome|firefox|safari|opera|edge|unknown
*
* @example
* mqBrowser();
*/
function mqBrowser () {
  var userAgent = navigator.userAgent;
  var res = 'unknown';
  if(userAgent.match(/chrome|chromium/i)) {
    res = "chrome";
  } else if (userAgent.match(/firefox/i)) {
    res = "firefox";
  }  else if (userAgent.match(/safari|crios|fxios/i)) {
    res = "safari";
  } else if (userAgent.match(/opr\//i)) {
    res = "opera";
  } else if (userAgent.match(/edg/i)) {
    res  = "edge";
  }
  return res;
}

/** Perform a page reload
*
* @example
* mqReload();
*/
function mqReload () {
  window.location.reload();
}

function mqWidth(obj) { return (obj==null?window.innerWidth:mqElement(obj).clientWidth); }

function mqHeight(obj) { return (obj==null?window.innerHeight:mqElement(obj).clientHeight); }

/** Returns unique entries in array
* @param {array} x Array of elements
* @return {array} Array of unique elements
*
* @example
* mqUniq([1,2,3,3]); 
* => [1,2,3]
*/
function mqUniq(x) {
  var t = {};
  return x.filter( e => !(t[e]=e in t) );
}

/** Return true if argument is odd
* @param {Number} x Integer
* @return {Boolean} True if x is odd, otherwise false
*
* @example
* mqOdd(1);
* => true
*/
function mqOdd(x) { return (x%2==0?false:true) }

/** Return true if argument is even
* @param {Number} x Integer
* @return {Boolean} True if x is even, otherwise false
*
* @example
* mqEven(1);
* => false
*/
function mqEven(x) { return (x%2==0?true:false) }

function mqNaN(x) {
  return (x==null||isNaN(x)?true:false);
}

function mqSort(lst) {
  return lst.sort(
    function(a, b) {
      if (a.toLowerCase() < b.toLowerCase()) return -1;
      if (a.toLowerCase() > b.toLowerCase()) return 1;
      return 0;
   });
}

function mqHasTouch() {
  if (mqHasTouch.check==null)
    mqHasTouch.check = (('ontouchstart' in window) ||
       (navigator.maxTouchPoints > 0) ||
       (navigator.msMaxTouchPoints > 0))?true:false;
  return mqHasTouch.check;
}

