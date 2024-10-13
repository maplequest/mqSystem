
function mqEnsureArrayBuffer (obj) {
  var res = obj;
  if (typeof obj === 'string') {
     const len = obj.length;
     res = new Uint8Array(len);
     for (let i = 0; i < len; i++) {
       res[ i ] = obj.charCodeAt( i );
     }
  }
  return res;
}

function mqStringToBlobURL( binStr, mtype = "application/pdf" ) {
  const len = binStr.length;
  const arr = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    arr[ i ] = binStr.charCodeAt( i );
  }
  var blob = new Blob( [ arr ], { type: mtype } );
  return URL.createObjectURL( blob );
}

function mqArraybufferToBlobURL(abuf, mtype = "application/pdf" ) {
  var blob = new Blob( [ abuf ], { type: mtype } );
  return URL.createObjectURL( blob );
}

function mqAnyToBlobURL (data) {
 var src=data;
 if (data) {
   if (typeof data === 'string')
     src = mqStringToBlobURL(data);
   else
     src= mqArraybufferToBlobURL(data);
 }
 return src;
}


