
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
    var menu = this.cfg['mq-entries'];
    for (var i=0;i<menu.length;i++) {
      var id = menu[i]["id"];
      var label = menu[i]["label"];
      mqAppend(this.widget,this.menuEntry(i));
    }
    mqCSS('mq-menubar-style', '.mq-menubar-hover:hover { border: 1px solid ' + 
                                  mqPal(0.5).hex() + ' !important; }');
    mqCSS('mq-menubar-hidescrollbar',` .mq-menubar-hidescroll::-webkit-scrollbar { display: none !important; } .mq-menubar-hidescrollbar { -ms-overflow-style: none !important; scrollbar-width: none !important; } `);
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
          "innerHTML": entries[i][0],
          "background": (entries[i][2]==true?mqPal(0.2).hex():'none'),
          "cursor": "pointer",
          "onclick": that.menuEntryHandler(entries[i][0],entries[i][1])
        });
        mqAppend(content,o);
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
    if (delid) mqDelete(delid);
    this.cfg['mq-entries']=newmenu;
  }
  addMenu(id,label,entries) {
    this.cfg['mq-entries'].push({id: id, label: label, entries: entries});
    mqAppend(this.widget,this.menuEntry(this.cfg['mq-entries'].length-1));
  }
  addMenuBefore(id,label,entries,id0) {
    id0 = this.idFromLabel(id0);
    this.cfg['mq-entries'].push({id: id, label: label, entries: entries});
    this.widget.insertBefore(
      this.menuEntry(this.cfg['mq-entries'].length-1),
      mqElement(id0)
    );
  }
  addMenuAfter(id,label,entries,id0) {
    id0 = this.idFromLabel(id0);
    this.cfg['mq-entries'].push({id: id, label: label, entries: entries});
    this.widget.insertBefore(
      this.menuEntry(this.cfg['mq-entries'].length-1),
      mqElement(id0).nextSibling
    );
  }
  sortSubmenu(str) {
    var mid = this.menuIndex(str);
    this.cfg['mq-entries'][mid]['entries'].sort(function(a,b) {
      return a[0].toLowerCase().localeCompare(b[0].toLowerCase());
    });
  }
  deleteSubmenu(str,subid) {
    var mid = this.menuIndex(str);
    var entries = this.cfg['mq-entries'][mid]['entries'];
    var newentries = [];
    for (var i=0;i<entries.length;i++) {
      if (subid==entries[i][0]) continue; else newentries.push(entries[i]);
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
      if (entries[i][0]==lbl) match=true;
    }
    return true;
  }
  radioSubmenu(str,lbl) {
    var mid = this.menuIndex(str);
    var entries = this.cfg['mq-entries'][mid]['entries'];
    var newentries = [];
    for (var i=0;i<entries.length;i++) {
      var state=((isNaN(lbl)&&entries[i][0]==lbl)||(!isNaN(lbl)&&i==lbl)?true:false);
      newentries.push([entries[i][0],entries[i][1],state]);
    }
    this.cfg['mq-entries'][mid]['entries']=newentries;
  }
  checkSubmenu(str,lbl,forcethis) {
    var tgt = (forcethis==null?true:forcethis);
    var mid = this.menuIndex(str);
    var entries = this.cfg['mq-entries'][mid]['entries'];
    var newentries = [];
    for (var i=0;i<entries.length;i++) {
      var state=((isNaN(lbl)&&entries[i][0]==lbl)||(!isNaN(lbl)&&i==lbl)?tgt:entries[i][2]||false);
      newentries.push([entries[i][0],entries[i][1],state]);
    }
    this.cfg['mq-entries'][mid]['entries']=newentries;
  }
  checkSubmenus(str,filter) {
    var flt = filter||function (i) { return true; };
    var mid = this.menuIndex(str);
    var entries = this.cfg['mq-entries'][mid]['entries'];
    var newentries = [];
    for (var i=0;i<entries.length;i++) {
      newentries.push([entries[i][0],entries[i][1],flt(i)]);
    }
    this.cfg['mq-entries'][mid]['entries']=newentries;
  }
  toggleSubmenu(str,lbl) {
    var mid = this.menuIndex(str);
    var entries = this.cfg['mq-entries'][mid]['entries'];
    var newentries = [];
    for (var i=0;i<entries.length;i++) {
      var oldstate  = entries[i][2]||false;
      var state=((isNaN(lbl)&&entries[i][0]==lbl)||(!isNaN(lbl)&&i==lbl)?!oldstate:oldstate);
      newentries.push([entries[i][0],entries[i][1],state]);
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
        if (this.cfg['mq-entries'][mid]['entries'][i][0]==idx) {
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
        if (this.cfg['mq-entries'][mid]['entries'][i][0]==idx) {
          idx=i;
        }
      }
    }
    this.cfg['mq-entries'][mid]['entries'][idx] = entry;
  }
}

