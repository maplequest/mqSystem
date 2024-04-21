
/** Return type of object
* @param {Object} obj The object to type
* @return {'unknown'|'array'|'string'|'number'} The object type
*/
function mqType(obj) {
  var res='unknown';
  if (Array.isArray(obj)) res='array';
    else if (typeof obj === 'string'||obj instanceof String) res='string';
      else if (typeof obj === 'string') res='string';
        else if (typeof obj === 'number') res='number';
  return res;
}

/** Make sure object is array
* @param {Object|Array} obj
* @return {Array}
*/
function mqEnsureArray(obj) {
  return (mqType(obj)=='array'?obj:[obj]);
}

function mqArrayBufferToString(data) {
  var strdata = "";
  var u8data = new Uint8Array(data);
  for (var i=0;i<u8data.length;i++) {
    strdata += String.fromCharCode(u8data[i]);
  }
  return strdata;
}

function mqStringToArrayBuffer(str) {
  var buf = new ArrayBuffer(str.length);
  var bufView = new Uint8Array(buf);
  for (var i=0, strLen=str.length; i<strLen; i++) {
    bufView[i] = str.charCodeAt(i);
  }
  return buf;
}

function mqEnsureString (data) {
  if (mqType(data)=='string') {
    return data;
  } else if (mqType(data)=='number') {
    return data + '';
  } else {
    return mqArrayBufferToString(data);
  }
}

function mqIsImage(str) {
  str = str.split('?').shift();
  var ext = str.split('.').pop().toUpperCase();
  var imgfmt = [ "SVG", "PNG", "JPG", "GIF" ];
  return imgfmt.includes(ext);
}

function mqAssertNumber(val,min,max) {
  var res=val;
  if (mqType(res)=='string') res=parseFloat(res);
  if (res) {
    if ((min||mqType(min)=='number')&&res<min) res=null;
    if ((max||mqType(max)=='number')&&res>max) res=null;
  }
  if (!res) console.error('mqAssert: invalid value');
  return res;
}

function mqEnsureNumber(val) {
  var res=val;
  if (mqType(res)=='string') res=parseFloat(res);
  if (!mqType(res)=='number') res=0;
  return res;
}
