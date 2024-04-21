
function mqFocusEmpty(obj) {
  setTimeout( function () {
    var p = mqElement(obj);
    s = window.getSelection(),
    r = document.createRange();
    p.innerHTML = '\u00a0';
    r.selectNodeContents(p);
    s.removeAllRanges();
    s.addRange(r);
    document.execCommand('delete', false, null);
  },0);
}

function mqFocus(obj) {
  setTimeout( function () {
    var p = mqElement(obj);
    s = window.getSelection(),
    r = document.createRange();
    r.setStart(p, 0);
    r.setEnd(p, 0);
    s.removeAllRanges();
    s.addRange(r);
  }, 0);
}

function mqUnfocus(obj) { mqElement(obj).blur(); }

function mqClick(obj) { mqElement(obj).click(); }

