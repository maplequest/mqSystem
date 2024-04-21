
class mqDesktop {
  constructor (cfg) {
    var id='desktop';
    var mbid=id+'-menubar';
    var sbid=id+'-statusbar';
    cfg.id=mbid;
    this.menubar = new mqMenubar(cfg);
    cfg.id=sbid;
    this.statusbar = new mqStatusbar(cfg);
    this.desktop = mqMakeWidget({
      tag: 'div', 
      id: 'desktop',
 //     background: 'red'
    });
    this.widget = mqMakeRows({
      tag: 'div',
      id:  'desktop-wrapper',
      height: '100%',
      width: '100%',
      children: [this.menubar.widget, this.desktop, this.statusbar.widget]
    });
  }
}

