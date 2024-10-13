
function mqDialogOK(cfg) {
  var idx=mqDialogOK.count||0;
  mqDialogOK.count=idx+1;
  var id = cfg.id || 'mq-dialog-ok-' + idx;
  var wnd = mqWindow({
    id: id, width: '264px', height: '144px',
    title: cfg.title||'Dialog Box',
  });
  mqAppend(wnd,mqLabel({
   id: id+'-label', x: '8px', y: '32px', width: '248px', height: '72px',
   align: 'center',
   label: cfg.label||"Dialog message"
  }));
  mqSet(id+'-label','white-space','normal');
  mqAppend(wnd,mqButton({
    x: '72px', y: '112px', id: id+'-ok', label: 'OK',
    onclick: function () { 
      if (cfg.onclick) cfg.onclick();
      mqDelete(id+'-window'); 
    }
  }));
}

function mqDialogOKCancel(cfg) {
  var idx=mqDialogOKCancel.count||0;
  mqDialogOKCancel.count=idx+1;
  var id = cfg.id || 'mq-dialog-okcancel-' + idx;
  var cb = cfg.onclick||function () { console.log('button click'); };
  var wnd = mqWindow({
    id: id, width: '264px', height: '144px',
    title: cfg.title||'Dialog Box',
  });
  mqAppend(wnd,mqLabel({ 
   id: id+'-label', x: '8px', y: '32px', width: '248px', height: '72px', 
   align: 'center',
   label: cfg.label||"Dialog message"
  }));
  mqSet(id+'-label','white-space','normal');
  mqAppend(wnd,mqButton({ 
    x: '136px', y: '112px', id: id+'-ok', label: 'OK', 
    onclick: function () { cb(); mqDelete(id+'-window'); } 
  }));
  mqAppend(wnd,mqButton({ 
    x: '8px', y: '112px', id: id+'-cancel', label: 'Cancel', 
    onclick: function () { mqDelete(id+'-window'); }
  }));
}

// simple single line input
function mqDialogInput(cfg={}) {
  var cnt = mqDialogInput.cnt||0;
  mqDialogInput.cnt = cnt+1;
  var id = cfg.id||('mq-dialog-input-'+cnt);
  var lbl = cfg.label||cfg.title||"Untitled";
  var def = cfg.default||"";
  var cb = cfg.onenter||cfg.onchange||console.log;
  mqDelete(id+'-window');
  var h = 64;
  var w = 2*120 + 3*8;
  var x,y;
  var wnd = mqWindow({
    id: id,
    title: lbl,
    width: w+'px', height: h+'px',
    onclose: function () { }
  });
  x=8;
  y=32;
  function makeCB(id,cb) { return function () {
    if (cb(mqElement(id+'-text').innerText.trim())) mqDelete(id+'-window');
  };}
  mqAppend(wnd,mqInput({
    id: id+'-text',
    x: x+'px',
    y: y+'px',
    width: (w-16)+'px',
    value: def,
    onenter: makeCB(id,cb)
  }));
  var div = mqElement(id+'-text');
  div.onfocus = function() {
    window.setTimeout(function() {
        var sel, range;
        if (window.getSelection && document.createRange) {
            range = document.createRange();
            range.selectNodeContents(div);
            sel = window.getSelection();
            sel.removeAllRanges();
            sel.addRange(range);
        } else if (document.body.createTextRange) {
            range = document.body.createTextRange();
            range.moveToElementText(div);
            range.select();
        }
    }, 1);
  };
  div.focus()
}

