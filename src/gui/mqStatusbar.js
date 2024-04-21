
class mqStatusbar {
  constructor(cfg) {
    cfg = cfg||{};
    this.cfg = cfg;
    this.cfg.tag='div';
    this.n = cfg['mq-fields']||4;
    var objs=[];
    for (var i=0;i<this.n;i++) {
      var id = this.cfg.id+'-'+(i+1);
      objs.push(mqMakeWidget({ 
        tag: 'div', 
        id: id, 
        'padding-left': '5px',
        'user-select': 'none',
        'touch-action': 'none',
        'overflow': 'hidden',
        'color': mqPal(0.5).hex(),
        'border-left': (i==0?'none':'1px solid ' + mqPal(0.5).hex())
      }));
    }
    this.widget = mqMakeColumns({
      tag: 'div',
      id: cfg.id,
      "max-height": "25px",
      'border-top': '1px solid ' + mqPal(0.5).hex(),
      children: objs
    });
  }
  set(idx,str) {
    mqSet(this.cfg.id+'-'+idx,'innerHTML',str);
  }
  setTooltip(idx,str) {
    mqSet(this.cfg.id+'-'+idx,'title',str);
  }
  setColor(idx,col) {
    mqSet(this.cfg.id+'-'+idx,'color',col);
  }
}

