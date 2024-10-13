
function mqTextWords(str) {
  if (typeof str == 'string')
    return str.trim().split(/\s+/).length;
  else
    return 0;
}

function mqTextSentences(str) {
  if (typeof str == 'string')
    return (str.match(/[\w|\)][.?!](\s|$)/g)||"").length
  else
    return 0;
}

function mqTextParagraphs(str) {
  if (typeof str == 'string')
    return str.split(/\n\s*\n/).filter(Boolean).length;
  else
    return 0;
}

function mqTextSentenceRange(n1,n2) {
  return function (str) {
    var n = mqTextSentences(str);
    var res = (n>=n1&&n<=n2);
    if (!res) console.log('Failed: ' + n1 + ' <= ' + n + ' <= ' + n2);
    return res;
  }
}

function mqTextWordRange(n1,n2) {
  return function (str) {
    var n = mqTextWords(str);
    var res = (n>=n1&&n<=n2);
    if (!res) console.log('Failed: ' + n1 + ' <= ' + n + ' <= ' + n2);
    return res;
  }
}

function mqTextParagraphRange(n1,n2) {
  return function (str) {
    var n = mqTextParagraphs(str);
    var res = (n>=n1&&n<=n2);
    if (!res) console.log('Failed: ' + n1 + ' <= ' + n + ' <= ' + n2);
    return res;
  }
}

function mqTextLengthRange(n1,n2) {
  return function (str) {
    var n = str.length;
    var res = (n>=n1&&n<=n2);
    if (!res) console.log('Failed: ' + n1 + ' <= ' + n + ' <= ' + n2);
    return res;
  }
}

