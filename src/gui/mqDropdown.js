
function _mqMakeDropdownMenu (id,w,entries,cb) {
  return function () {
    var o1 = mqElement(id+'-wrapper');
    mqDelete(id+'-dropdown');
    var dropdown = mqMakeWidget({
      "tag": 'div',
      "id": id + '-dropdown',
      "position": "absolute",
      top: '24px',
      left: '0px',
      "z-index": "1100",
      width: w,
      "max-height": "350px",
      "overflow-x": "hidden",
      "overflow-y": "auto",
      "white-space": "nowrap",
      background: mqPal(0.1).hex(),
      class: "mq-dropdown",
      "box-shadow": "0px 2px 4px 0px " + mqPal(1.0).hex()
    });
    function makeSetter(id,str,cb) {
      return function () {
        mqSet(id,'innerHTML',str);
        mqDelete(id+'-dropdown');
        if (cb) cb(str);
      }
    }
    for (var i=0;i<entries.length;i++) {
      var o = mqMakeWidget({
        "tag": 'div',
        "id": id + '-dropdown-' + i,
        "float": "none",
        "text-decoration": "none",
        "text-align": "left",
        "width": "calc(100% - 7px)",
        "padding-left": "5px",
        "class": "mq-menubar-hover",
        "border": "1px solid transparent",
        "user-select": "none",
        "innerHTML": entries[i],
        "cursor": "pointer",
        "onclick": makeSetter(id,entries[i],cb)
      });
      mqAppend(dropdown,o);
    }
    mqAppend(o1,dropdown);
  }
}

function mqDropdown(cfg) {
  var cnt = mqDropdown.cnt||0;
  mqDropdown.cnt = cnt+1;
  var id = cfg.id||('mq-dropdown-'+cnt);
  var x = cfg.x||0;
  var y = cfg.y||0;
  var w = cfg.width;
  var h = cfg.height;
  var o1,o2;
  [o1,o2] = mqMakeCenteredWidget({
    tag: 'div',
    id: id+'-wrapper',
    width: mqShrinkWidth(cfg.width),
    height: mqShrinkHeight(cfg.height),
    border: '1px solid '+mqPal(0.5).hex(),
    background: mqPal(0.05).hex(),
    cursor: 'pointer',
    'user-select': 'none',
    class: 'mq-dropdown-content',
    'onclick': _mqMakeDropdownMenu(id,cfg.width,cfg.entries,cfg.onchange)
  },{
    tag: 'div',
    id: id,
    'font-size': '14px',
    innerHTML: cfg.default||"",
    'white-space': 'nowrap',
    'pointer-events': 'none'
  });
  if (cfg.x!=null||cfg.y!=null)
    mqSet(o1,'position','absolute','top',cfg.y||'0px','left',cfg.x||'0px');
  mqAppend(o1,mqMakeWidget({
    tag: "div",
    position: "absolute",
    right: '8px',
    top: '0px',
    height: '24px',
    innerHTML: '&#x25BC;'
  }));
  return o1;
}

