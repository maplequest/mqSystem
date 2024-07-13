
class mqStatusbar {
  constructor(cfg) {
    cfg = cfg||{};
    this.cfg = cfg;
    this.cfg.tag='div';
    this.n = cfg['mq-fields']||4;
    var bar = mqMakeWidget({
      tag: "div",
      id: cfg.id,
      'border-top': '1px solid ' + mqPal(0.5).hex(),
      "max-height": "25px",
      "white-space": "nowrap",
      "overflow-x": "scroll",
    //  'user-select': 'none',
      class: 'mq-statusbar-hidescrollbar',
    });
    mqAttr(bar,'n',n+'');
    for (var i=0;i<this.n;i++) {
      var id = this.cfg.id+'-'+(i+1);
      mqAppend(bar,mqMakeWidget({
        tag: 'div',
        id: id,
        'padding-left': '5px',
         width: '250px',
         height: '25px',
         display: 'inline-block',
        'user-select': 'none',
        "white-space": "nowrap",
        'overflow': 'hidden',
        'color': mqPal(0.5).hex(),
        'border-left': (i==0?'none':'1px solid ' + mqPal(0.5).hex())
      }));
    }
    this.widget = bar;
    var n = this.n;
    var cfg = this.cfg;
    addEventListener('resize',
      function ( ) {
        var w = window.innerWidth/n;
        if (w<250) w = 250;
        for (var i=0;i<n;i++) {
          var id = cfg.id+'-'+(i+1); 
          mqSet(id,'width', w + 'px');
        }
 //       mqSet(cfg.id,'width', (n*w) + 'px');
      });
    mqCSS('mq-statusbar-hidescrollbar',` .mq-statusbar-hidescroll::-webkit-scrollbar { display: none !important; } .mq-statusbar-hidescrollbar { -ms-overflow-style: none !important; scrollbar-width: none !important; } `);
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

