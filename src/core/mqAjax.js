
function mqAjaxASCII (url,handler,bustcache,gzipped) {
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4) {
      handler(xhr.responseText);
    }
  };
  if (bustcache) 
    xhr.open('GET', url + '?' + performance.now());
  else
    xhr.open('GET', url);
  if (gzipped) xhr.setRequestHeader('Content-encoding','gzip');
  xhr.send();
}

function mqAjaxBinary (url,handler,bustcache,gzipped) {
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4) {
      handler(xhr.response);
    }
  };
  xhr.responseType="arraybuffer";
  if (bustcache) 
    xhr.open('GET', url + '?' + performance.now());
  else
    xhr.open('GET', url);
  if (gzipped) xhr.setRequestHeader('Content-encoding','gzip');
  xhr.send();
}

function mqAjaxJSDir(dirname,whendone) {
  var targets = [];
  function loadRecursively () {
    var fname = targets.shift();
    if (fname) {
      mqAjaxASCII('/' + dirname + '/' + fname, function (data) {
        try { eval(data); } catch (e) { console.log(e.message); }
        loadRecursively();
      },false);
    } else {
      if (whendone) whendone();
    }
  }
  mqAjaxASCII('/' + dirname + '/INDEX', function (data) {
    targets=data.split('\n');
    loadRecursively();
  },false);
}

