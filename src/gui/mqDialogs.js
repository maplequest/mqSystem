
function mqDialogOK(cfg) {
  var idx=mqDialogOK.count||0;
  mqDialogOK.count=idx+1;
  var id = 'mq-dialog-ok-' + idx;
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
    onclick: function () { mqDelete(id+'-window'); }
  }));
}


function mqDialogOKCancel(cfg) {
  var idx=mqDialogOKCancel.count||0;
  mqDialogOKCancel.count=idx+1;
  var id = 'mq-dialog-okcancel-' + idx;
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

