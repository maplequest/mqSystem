
function mqFilterDialogCallback(obj) {
  var entries = [];
  var allentries = [];
  var allchildren= mqElement(obj.id.replace('-filter','-list-wrapper')).children;
  for (var i=0;i<allchildren.length;i++) allentries.push(allchildren[i].firstChild.innerText);
  var filter = obj.innerText;
  if (filter!='') {
    var rgx = null;
    try { rgx = new RegExp(filter); } catch (e) { console.warn('Invalid regular expression'); }
    if (rgx) {
      entries = allentries.filter(x=>x.match(rgx));
    } else {
      entries = allentries;
    }
  } else {
    entries = allentries;
  }
  for (var i=0;i<allchildren.length;i++)
    mqSet(allchildren[i],'display',(entries.includes(allentries[i])?'block':'none'));
}

function mqFilterDialog(cfg) {
  var n = cfg.filters.length;
  var fltwidth = cfg.filterwidth||120;
  var btnwidth = cfg.buttonwidth||fltwidth;
  var x = 8,y;
  var w = n*(fltwidth+8)+8;
  var h = cfg.height||500;
  var wnd = mqWindow({ id: cfg.id, title: cfg.title, width: w+'px', height: h+'px' });
  for (var i=0;i<cfg.filters.length;i++) {
    var flt = cfg.filters[i];
    y=24;
    mqAppend(wnd,mqLabel({
      x: x+'px',
      y: y+'px',
      width: fltwidth+'px',
      label: flt.label
    }));
    y+=24;
    mqAppend(wnd,mqInput({
      id: cfg.id+flt.subid+'-filter',
      x: x+'px',
      y: y+'px',
      width: fltwidth+'px',
      value: '',
      onenter: mqFilterDialogCallback,
    }));
    y+=32;
    mqAppend(wnd,mqList({
      id: cfg.id+flt.subid+'-list',
      x: x+'px',
      y: y+'px',
      width: fltwidth+'px',
      height: (h-y-32-8)+'px',
      entries: ["Loading.."],
      selected: null,
      onclick: function (lbl) {
        //VitalDBSelectedCase=lbl;
      }
    }));
    x+=fltwidth+8;
  }
  y = h - 32;
  x = w - 8 - btnwidth;
  if (cfg.buttons) {
    for (var i=0;i<cfg.buttons.length;i++) {
      var but = cfg.buttons[i];
      mqAppend(wnd,mqButton({
        id: cfg.id+but.subid,
        x: x+'px',
        y: y+'px',
        width: btnwidth+'px',
        label: but.label,
        onclick: but.onclick
      }));
      x-=btnwidth+8;
    }
  }
}


