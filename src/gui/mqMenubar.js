
class mqMenubar {
  constructor(cfg) {
    cfg = cfg||{};
    this.cfg = cfg;
    this.cfg.tag='div';
    this.cfg['max-height']=cfg['max-height']||'25px';
    this.cfg['border-bottom']=cfg['border-bottom']||"1px solid " + mqPal(0.5).hex(),
    this.cfg['user-select']='none';
    this.cfg['mq-entries']=cfg['mq-entries']||[];
    this.cfg['class']='mq-menubar-hidescrollbar';
    this.cfg['white-space']='nowrap';
    this.cfg['overflow-x']='auto';
    this.widget = mqMakeWidget(this.cfg);
    this.refresh();
    mqCSS('mq-menubar-style', '.mq-menubar-hover:hover { border: 1px solid ' + 
                                  mqPal(0.5).hex() + ' !important; }');
    mqCSS('mq-menubar-hidescrollbar',` .mq-menubar-hidescroll::-webkit-scrollbar { display: none !important; } .mq-menubar-hidescrollbar { -ms-overflow-style: none !important; scrollbar-width: none !important; } `);
  }
  refresh (mode) { 
    mqClassApply('mq-dropdown',mqDelete);
    this.mode = mode;
    this.widget.innerHTML='';
    var menu = this.cfg['mq-entries'];
    for (var i=0;i<menu.length;i++) {
      if (mode==null||menu[i]["visible"]==null||menu[i]["visible"].includes(mode)) {
        var id = menu[i]["id"];
        var label = menu[i]["label"];
        mqAppend(this.widget,this.menuEntry(i));
      }
    }
  }
  idFromLabel(lbl) {
    var res = lbl;
    var menu = this.cfg['mq-entries'];
    for (var i=0;i<menu.length;i++) {
      var id = menu[i]["id"];
      var label = menu[i]["label"];
      if (lbl==label) res=id;
    }
    return res;
  }
  menuEntryHandler(name,fun) {
    return function () {
      mqClassApply('mq-dropdown',mqDelete);
      if (fun!=null) fun(name);
    }
  }
  menuHandler(idx) {
    var that = this;
    return function () {
      var menu = that.cfg['mq-entries'];
      var id = menu[idx]["id"];
      var entries = menu[idx]["entries"];
      mqClassApply('mq-dropdown',mqDelete);
      var x,y;
      [x,y]=mqElementPosition(id);
      var content = mqMakeWidget({
        "tag": 'div',
        "id": id + '-dropdown',
        "position": "absolute",
        "top": (y-0) + 'px',
        "left": (x-0) + 'px',
        "z-index": "100",
        "min-width": "150px",
        //"max-height": "400px",
        "max-height": "350px",
        "overflow-x": "hidden",
        "overflow-y": "auto",
        "white-space": "nowrap",
        "background": mqPal(0.1).hex(),
        "class": "mq-dropdown",
        "box-shadow": "0px 2px 4px 0px " + mqPal(1.0).hex()
      });
      for (var i=0;i<entries.length;i++) {
        if (that.mode==null||entries[i].visible==null||entries[i].visible.includes(that.mode)) {
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
            "innerHTML": entries[i].label,
            "background": (entries[i].selected==true?mqPal(0.2).hex():'none'),
            "cursor": "pointer",
            "onclick": that.menuEntryHandler(entries[i].label,entries[i].hook)
          });
          mqAppend(content,o);
        }
      }
      mqAppend('mq-root',content);
      var w = mqWidth(content);
      var w0 = window.innerWidth;
      if (x+w>w0) mqSet(content,'left',(w0-w)+'px');
    }
  }
  menuEntry(idx) {
    var menu = this.cfg['mq-entries'];
    var id = menu[idx]["id"];
    var label= menu[idx]["label"];
    var o = mqMakeWidget({
      "tag": 'div',
      "id": id,
      "display": "inline-block",
      "padding-left": "5px",
      "padding-right": "5px",
      "cursor": "pointer",
      "innerHTML": label,
      "class": "mq-dropdown-content",
      "onclick": this.menuHandler(idx)
    });
    return o;
  }
  menuIndex(str) {
    var menu = this.cfg['mq-entries'];
    var midx;
    for (var i=0;i<menu.length;i++) {
      if (str==menu[i].id||str==menu[i].label) midx=i;
    }
    return midx;
  }
  deleteMenu(str) {
    var newmenu = [];
    var menu = this.cfg['mq-entries'];
    var delid=null;
    for (var i=0;i<menu.length;i++) {
      if (str==menu[i].id||str==menu[i].label) delid=menu[i].id; else newmenu.push(menu[i]);
    }
    //if (delid) mqDelete(delid);
    this.cfg['mq-entries']=newmenu;
    this.refresh(this.mode);
  }
  addMenu(menuentry) {
    this.cfg['mq-entries'].push(menuentry);
    this.refresh(this.mode);
  }
  addMenuBefore(menuentry,id0) {
    id0 = this.idFromLabel(id0);
    var newentries = []; 
    var oldentries = this.cfg['mq-entries'];
    for (var i=0;i<oldentries.length;i++) {
      if (oldentries[i].id==id0) newentries.push(menuentry);
      newentries.push(oldentries[i]);
    }
    this.cfg['mq-entries']=newentries;
    this.refresh(this.mode);
  }
  addMenuAfter(menuentry,id0) {
    id0 = this.idFromLabel(id0);
    var newentries = []; 
    var oldentries = this.cfg['mq-entries'];
    for (var i=0;i<oldentries.length;i++) {
      newentries.push(oldentries[i]);
      if (oldentries[i].id==id0) newentries.push(menuentry);
    }
    this.cfg['mq-entries']=newentries;
    this.refresh(this.mode);
  }
  sortSubmenu(str,skipfirst) {
    var mid = this.menuIndex(str);
    if (!skipfirst) {
      this.cfg['mq-entries'][mid]['entries'].sort(function(a,b) {
        return a.label.toLowerCase().localeCompare(b.label.toLowerCase());
      });
    } else { 
      var data = this.cfg['mq-entries'][mid]['entries'];
      var part1 = data.slice(0,skipfirst);
      var part2 = data.slice(skipfirst);
      part2.sort(function(a,b) {
        return a.label.toLowerCase().localeCompare(b.label.toLowerCase());
      });
      this.cfg['mq-entries'][mid]['entries'] = part1.concat(part2);
    }
  }
  deleteSubmenu(str,subid) {
    var mid = this.menuIndex(str);
    var entries = this.cfg['mq-entries'][mid]['entries'];
    var newentries = [];
    for (var i=0;i<entries.length;i++) {
      if (subid==entries[i].label) continue; else newentries.push(entries[i]);
    }
    this.cfg['mq-entries'][mid]['entries']=newentries; 
  }
  addSubmenu(str,entry) {
    var mid = this.menuIndex(str);
    this.cfg['mq-entries'][mid]['entries'].push(entry);
  }
  hasSubmenu(str,lbl) {
    var mid = this.menuIndex(str);
    var entries = this.cfg['mq-entries'][mid]['entries'];
    var match = false;
    for (var i=0;i<entries.length;i++) {
      if (entries[i].label==lbl) match=true;
    }
    return match;
  }
  radioSubmenu(str,lbl) {
    var mid = this.menuIndex(str);
    var entries = this.cfg['mq-entries'][mid]['entries'];
    var newentries = [];
    for (var i=0;i<entries.length;i++) {
      var state=((isNaN(lbl)&&entries[i].label==lbl)||(!isNaN(lbl)&&i==lbl)?true:false);
      //newentries.push([entries[i].label,entries[i].hook,state]);
      newentries.push({ label: entries[i].label, hook: entries[i].hook, selected: state });
    }
    this.cfg['mq-entries'][mid]['entries']=newentries;
  }
  checkSubmenu(str,lbl,forcethis) {
    var tgt = (forcethis==null?true:forcethis);
    var mid = this.menuIndex(str);
    var entries = this.cfg['mq-entries'][mid]['entries'];
    var newentries = [];
    for (var i=0;i<entries.length;i++) {
      var state=((isNaN(lbl)&&entries[i].label==lbl)||(!isNaN(lbl)&&i==lbl)?tgt:entries[i].selected||false);
      //newentries.push([entries[i].label,entries[i].hook,state]);
      newentries.push({ label: entries[i].label,hook: entries[i].hook, selected: state });
    }
    this.cfg['mq-entries'][mid]['entries']=newentries;
  }
  checkSubmenus(str,filter) {
    var flt = filter||function (i) { return true; };
    var mid = this.menuIndex(str);
    var entries = this.cfg['mq-entries'][mid]['entries'];
    var newentries = [];
    for (var i=0;i<entries.length;i++) {
      //newentries.push([entries[i].label,entries[i].hook,flt(i)]);
      newentries.push({ label: entries[i].label, hook: entries[i].hook, selected: flt(i) });
    }
    this.cfg['mq-entries'][mid]['entries']=newentries;
  }
  toggleSubmenu(str,lbl) {
    var mid = this.menuIndex(str);
    var entries = this.cfg['mq-entries'][mid]['entries'];
    var newentries = [];
    for (var i=0;i<entries.length;i++) {
      var oldstate  = entries[i].selected||false;
      var state=((isNaN(lbl)&&entries[i].label==lbl)||(!isNaN(lbl)&&i==lbl)?!oldstate:oldstate);
      //newentries.push([entries[i].label,entries[i].hook,state]);
      newentries.push({ label: entries[i].label, hook: entries[i].hook, selected: state });
    }
    this.cfg['mq-entries'][mid]['entries']=newentries;
  }
  getSubmenus(str) {
    var mid = this.menuIndex(str);
    return this.cfg['mq-entries'][mid]['entries'];
  }
  setSubmenus(str,entries) {
    var mid = this.menuIndex(str);
    this.cfg['mq-entries'][mid]['entries'] = entries;
  }
  getSubmenu(str,idx) {
    var mid = this.menuIndex(str);
    var res;
    if (isNaN(idx)) {
      var entries = this.cfg['mq-entries'][mid]['entries'];
      for (var i=0;i<entries.length;i++) {
        if (this.cfg['mq-entries'][mid]['entries'][i].label==idx) {
          res = this.cfg['mq-entries'][mid]['entries'][i];
        }
      }
    } else {
      res = this.cfg['mq-entries'][mid]['entries'][idx];
    }
    return res;
  }
  setSubmenu(str,idx,entry) {
    var mid = this.menuIndex(str);
    if (isNaN(idx)) {
      var entries = this.cfg['mq-entries'][mid]['entries'];
      for (var i=0;i<entries.length;i++) {
        if (this.cfg['mq-entries'][mid]['entries'][i].label==idx) {
          idx=i;
        }
      }
    }
    this.cfg['mq-entries'][mid]['entries'][idx] = entry;
  }
}

