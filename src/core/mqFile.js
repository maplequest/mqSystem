
/** Return file name extension
* @param {String} str File name
* @return {String} File extension
*
* @example
* mqFileExt('image.png');
*/
function mqFileExt(str) {
  return str.split('.').pop().toLowerCase();
}

/** Load a file into an ArrayBuffer
* @param {function} handler Handler to process ArrayBuffer
* @param {string} accept Wildcard for acceptable files
*
* @example
* mqLoadFile(myPngLoader, "*.png");
*/
function mqLoadFile(handler,accept) {
  if (accept==null) accept="*.*";
  var frm = document.createElement('form');
  frm.style.display='none';
  frm.id = 'temp-load-file';
  frm.innerHTML = '<input id=\'temp-load-file-input\' accept=\'' + accept + '\' type=\'file\'>';
  document.body.append(frm);
  document.getElementById('temp-load-file-input').onchange = function(e) {
    var files = e.target.files;
    if (files) {
      var reader = new FileReader();
      var fname = files[0].name;
      reader.onload = function(e) {
        var res = e.target.result;
        handler(fname, res);
        return document.body.removeChild(document.getElementById('temp-load-file'));
      }
      return reader.readAsArrayBuffer(files[0]);
    }
  }
  return document.getElementById('temp-load-file-input').click();
}

/** Load javascript from file
* @param {string} accept Wildcard for acceptable file extensions
* @param {function} onsuccess Optional handler called with the javascript string on successful parsing
*
* @example
* mqLoadJS();
*/
function mqLoadJS (accept,onsuccess) {
  mqLoadFile( function (fname, data) {
    var context = {};
    var str = mqEnsureString(data);
    var valid = true;
    try {
      eval(str);
    } catch (e) {
      valid=false;
      console.error('mqLoadJS: '+ e.message);
    } finally {
      if (valid) {
        if (onsuccess!=null) onsuccess(fname,str);
      }
    }
  }, accept||"*.js");
}


function mqSaveAsCSV (fname,csvdata,sep) {
  var separator = sep||",";
  let csvContent = "data:text/csv;charset=utf-8,"
    + csvdata.map(e => e.join(separator)).join("\n");
  var encodedUri = encodeURI(csvContent);
  var link = mqMakeWidget({
    tag: 'a',
    id: "mq-file-save-as-csv-link",
    href: encodedUri,
    download: fname
  });
  document.body.appendChild(link);
  link.click();
  mqDelete('mq-file-save-as-csv-link');
}

function mqSaveFile(data, filename, mimetype='application/octet-stream') {
  if (window.navigator.msSaveOrOpenBlob) {
    return window.navigator.msSaveOrOpenBlob(data, filename);
  } else {
    var a = document.createElement('a');
    a.style.display='none';
    var url = window.URL.createObjectURL(new Blob([data],{
          //'type': 'text/plain'
          'type': mimetype
    }));
    document.body.appendChild(a);
    a.href = url;
    a.download = filename;
    a.click();
    return setTimeout(function() {
      window.URL.revokeObjectURL(url);
      return document.body.removeChild(a);
    }, 0);
  };
}

