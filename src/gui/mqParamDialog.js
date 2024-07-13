
function mqParamDialog(cfg) {
  var w = 264;
  var h = 32*cfg.params.length + 32;
  if (cfg.rightbutton||cfg.leftbutton) h+=32;
  var wnd = mqWindow({ id: cfg.id, title: cfg.title, width: w+'px', height: h+'px' });
  var y = 32;
  for (var i=0;i<cfg.params.length;i++) {
     var param = cfg.params[i];
     mqAppend(wnd,mqLabel({ x: '8px', y: y+'px', label: param.label, align: 'right'}));
     var o = mqInput({ id: cfg.id+param.subid, x: '136px', y: y+'px', value: param.value });
     if (cfg.readonly) mqAttr(o.firstChild,'contenteditable','false');
     mqAppend(wnd,o);
    // mqAppend(wnd,mqInput({ id: cfg.id+param.subid, x: '136px', y: y+'px', value: param.value }));
     y+=32;
  }
  if (cfg.rightbutton) mqAppend(wnd,mqButton({
      id: cfg.id+'-rightbutton',
      x: '136px', y: y+'px', label: cfg.rightbutton.label,
      onclick: cfg.rightbutton.onclick
  }));
  if (cfg.leftbutton) mqAppend(wnd,mqButton({
      id: cfg.id+'-leftbutton',
      x: '8px', y: y+'px', label: cfg.leftbutton.label,
      onclick: cfg.leftbutton.onclick
  }));
}


