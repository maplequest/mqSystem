
function mqShrinkWidth(dim,shrinkby=2) {
  var v = (dim?parseInt(dim):120);
  return (v-shrinkby)+'px';
}

function mqShrinkHeight(dim,shrinkby=2) {
  var v = (dim?parseInt(dim):24);
  return (v-shrinkby)+'px';
}

function mqLabel(cfg) {
  var cnt = mqLabel.cnt||0;
  mqLabel.cnt = cnt+1;
  var id = cfg.id||('mq-label-'+cnt);
  var o1,o2;
  [o1,o2] = mqMakeCenteredWidget({
    tag: 'div',
    id: id+'-wrapper',
    overflow: 'hidden',
    width: mqShrinkWidth(cfg.width),
    height: mqShrinkHeight(cfg.height),
    border: '1px solid transparent',
    'user-select': 'none',
   // 'touch-action': 'none',
  },{
    tag: 'div',
    id: id,
    width: mqShrinkWidth(cfg.width),
    'font-size': '14px',
    innerHTML: cfg.label||"",
    'white-space': 'nowrap'
  });
 // if (cfg.align=='right') mqPositionCR(o2); else mqPositionCL(o2);
  if (cfg.align=='right') mqSet(o2,'text-align','right');
  if (cfg.align=='center') mqSet(o2,'text-align','center');
  if (cfg.x!=null||cfg.y!=null)
    mqSet(o1,'position','absolute','top',cfg.y||'0px','left',cfg.x||'0px');
  return o1;
}

function mqInput(cfg) {
  var cnt = mqInput.cnt||0;
  mqInput.cnt = cnt+1;
  var id = cfg.id||('mq-input-'+cnt);
  var cb = cfg.onenter||function (obj) { console.log(obj.innerText); }
  var o1,o2;
  [o1,o2] = mqMakeCenteredWidget({
    tag: 'div',
    id: id+'-wrapper',
    overflow: 'hidden',
    width: mqShrinkWidth(cfg.width),
    height: mqShrinkHeight(cfg.height),
    border: '1px solid '+mqPal(0.5).hex(),
    background: mqPal(0.05).hex(),
  },{
    tag: 'div',
    id: id,
    'font-size': '14px',
    'padding-left': '5px',
    width: mqShrinkWidth(cfg.width,7),
    height: mqShrinkHeight(cfg.height),
    innerHTML: (cfg.value||"")+'',
    onkeydown: function (e) { if (e.keyCode==13) { cb(this); e.preventDefault(); } }
  });
  mqAttr(o2,'contenteditable','true');
  if (cfg.x!=null||cfg.y!=null)
    mqSet(o1,'position','absolute','top',cfg.y||'0px','left',cfg.x||'0px');
  return o1;
}

function mqButton(cfg) {
  var cnt = mqButton.cnt||0;
  mqButton.cnt = cnt+1;
  var id = cfg.id||('mq-button-'+cnt);
  var o1,o2;
  [o1,o2] = mqMakeCenteredWidget({
    tag: 'div',
    id: id+'-wrapper',
    overflow: 'hidden',
    width: mqShrinkWidth(cfg.width),
    height: mqShrinkHeight(cfg.height),
    border: '1px solid '+mqPal(0.5).hex(),
    background: mqPal(0.05).hex(),
    cursor: 'pointer',
    'user-select': 'none',
    //'touch-action': 'none',
    'onclick': cfg.onclick||function(x) { console.log('button click') },
  },{
    tag: 'div',
    id: id,
    'font-size': '14px',
    innerHTML: cfg.label||"",
    'white-space': 'nowrap'
  });
  if (cfg.x!=null||cfg.y!=null)
    mqSet(o1,'position','absolute','top',cfg.y||'0px','left',cfg.x||'0px');
  return o1;
}

function mqCheckBox(cfg) {
  var cnt = mqCheckBox.cnt||0;
  mqCheckBox.cnt = cnt+1;
  var id = cfg.id||('mq-checkbox-'+cnt);
  var checked = cfg.checked||false;
  var cb = cfg.onchange||null;
  var obj = mqMakeWidget({
    tag: 'div',
    id: id,
    width: mqShrinkWidth(cfg.width||'16px'),
    height: mqShrinkHeight(cfg.height||'16px'),
    border: '1px solid '+mqPal(0.5).hex(),
    background: mqPal((checked?1.0:0.05)).hex(),
    cursor: 'pointer',
    'user-select': 'none',
  //  'touch-action': 'none',
    'onclick': function(e) { 
      this.checked=!this.checked;
      mqSet(this,'background', mqPal((this.checked?1.0:0.05)).hex());
      if (cb) cb(this);
    },
  });
  var yofs = parseInt(cfg.height||'16px')/2-24/2;
  var xofs = parseInt(cfg.width||'16px')+8;
  var obj2 = mqMakeWidget({
    tag: 'div',
    id: id+'-label',
    width: '120px',
    height: '24px',
    position: 'absolute',
    top: yofs+'px',
    left: xofs + 'px',
    'white-space': 'nowrap',
    'overflow': 'hidden',
    'font-size': '14px',
    innerHTML: cfg.label||"CheckBox",
  });
  mqAppend(obj,obj2);
  obj.checked = checked;
  if (cfg.x!=null||cfg.y!=null)
    mqSet(obj,'position','absolute','top',cfg.y||'0px','left',cfg.x||'0px');
  return obj;
}

function mqRadioBox(cfg) {
  var cnt = mqRadioBox.cnt||0;
  mqRadioBox.cnt = cnt+1;
  var id = cfg.id||('mq-radiobox-'+cnt);
  var checked = cfg.checked||false;
  var cb = cfg.onclick||null;
  var radius = parseInt(cfg.width||'16px')/2;
  var group = cfg.group||"radio-group";
  var obj = mqMakeWidget({
    tag: 'div',
    id: id,
    class: group,
    width: mqShrinkWidth(cfg.width||'16px'),
    height: mqShrinkHeight(cfg.height||'16px'),
    border: '1px solid '+mqPal(0.5).hex(),
    background: mqPal((checked?1.0:0.05)).hex(),
    cursor: 'pointer',
    'user-select': 'none',
   // 'touch-action': 'none',
    'border-radius': radius+'px',
    'onclick': function(e) {
      var objs = mqElementsOfClass(group);
      for (var i=0;i<objs.length;i++) {
        objs[i].checked=false;
        mqSet(objs[i],'background', mqPal(0.05).hex());
      }
      this.checked=true;
      mqSet(this,'background', mqPal((this.checked?1.0:0.05)).hex());
      if (cb) cb(this);
    },
  });
  var yofs = parseInt(cfg.height||'16px')/2-24/2;
  var xofs = parseInt(cfg.width||'16px')+8;
  var obj2 = mqMakeWidget({
    tag: 'div',
    id: id+'-label',
    width: '120px',
    height: '24px',
    position: 'absolute',
    top: yofs+'px',
    left: xofs + 'px',
    'white-space': 'nowrap',
    'overflow': 'hidden',
    'font-size': '14px',
    innerHTML: cfg.label||"CheckBox",
  });
  mqAppend(obj,obj2);
  obj.checked = checked;
  if (cfg.x!=null||cfg.y!=null)
    mqSet(obj,'position','absolute','top',cfg.y||'0px','left',cfg.x||'0px');
  return obj;
}

function mqNumeric(cfg) {
  var cnt = mqNumeric.cnt||0;
  mqNumeric.cnt = cnt+1;
  var id = cfg.id||('mq-numeric-'+cnt);
  var o1,o2;
  [o1,o2] = mqMakeCenteredWidget({
    tag: 'div',
    id: id+'-wrapper',
    overflow: 'hidden',
    border: '1px solid ' + mqPal(0.5).hex(),
    width: mqShrinkWidth(cfg.width),
    height: mqShrinkHeight(cfg.height),
    'user-select': 'none',
   // 'touch-action': 'none',
    background: mqPal(0.05).hex(),
  },{
    tag: 'div',
    id: id,
    'font-family': 'mqFuture',
    'font-size': '48px',
    innerHTML: cfg.label||"--",
    'white-space': 'nowrap'
  });
  if (cfg.x!=null||cfg.y!=null)
    mqSet(o1,'position','absolute','top',cfg.y||'0px','left',cfg.x||'0px');
  return o1;
}

function mqCanvas(cfg) {
  function mqCanvasResizer(idstr) {
    return function () {
      // allow flex box to work
      mqAttr(idstr,'width','1');
      mqAttr(idstr,'height','1');
      setTimeout(function() {
        mqAttr(idstr,'width',mqWidth(idstr+'-wrapper'));
        mqAttr(idstr,'height',mqHeight(idstr+'-wrapper'));
      },10);
    }
  }
  var cnt = mqCanvas.cnt||0;
  mqCanvas.cnt = cnt+1;
  var id = cfg.id||('mq-canvas-'+cnt);
  var o = mqMakeWidget({
   tag: 'div',
   id: id+'-wrapper',
   overflow: 'hidden',
   border: '1px solid ' + mqPal(0.5).hex(),
   width: mqShrinkWidth(cfg.width),
   height: mqShrinkHeight(cfg.height),
   'user-select': 'none',
  // 'touch-action': 'none',
    background: cfg.background||mqPal(0.05).hex(),
  });
  var o1 = mqMakeWidget({
    tag: 'canvas',
    "id": id,
    "position": "absolute",
    "top": '0',
    "left": '0',
  });
  mqAppend(o,o1);
  if (cfg.x!=null||cfg.y!=null) {
    mqAttr(o1,'width', mqShrinkWidth(cfg.width).replace('px',''))
    mqAttr(o1,'height',mqShrinkHeight(cfg.height).replace('px',''));
    mqSet(o,'position','absolute','top',cfg.y||'0px','left',cfg.x||'0px');
  } else {
    mqAttr(o1,'width','1');
    mqAttr(o1,'height','1');
  }
  mqEvent(window,'resize',mqCanvasResizer(id));
  return o;
}

function mqCanvasClear(obj) {
  var canvas = mqElement(obj);
  var ctx = canvas.getContext('2d');
  ctx.save();
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.clearRect(0,0,canvas.width,canvas.height);
  ctx.restore();
}

function mqWaveform(cfg) {
  var cnt = mqWaveform.cnt||0;
  mqWaveform.cnt = cnt+1;
  var id = cfg.id||('mq-waveform-'+cnt);
  cfg.id = id;
  var obj = mqCanvas(cfg);
  obj.ymax = cfg.ymax||1.0;
  obj.pencolor = cfg.pencolor||mqPal(1.0).hex();
  obj.ylast = 0;
  obj.xofs = 0;
  return obj;
}

function mqWaveformAdd(id,data) {
  var canvas = mqElement(id);
  var o = canvas.parentElement;
  var ctx = canvas.getContext('2d');
  ctx.strokeStyle=o.pencolor||mqPal(0.0).hex();
  var ymax = o.ymax||1.5;
  var yscale = canvas.height/(2*ymax);
  var yofs = canvas.height/2;
  var len = data.length;
  ctx.lineWidth=1;
  var len20 = len+20;
  if (canvas.width-o.xofs>=len20) {
    ctx.clearRect(o.xofs,0,len20,canvas.height);
  } else {
    ctx.clearRect(o.xofs,0,canvas.width-o.xofs,canvas.height);
    ctx.clearRect(0,0,len20-(canvas.width-o.xofs),canvas.height);
  }
  ctx.beginPath();
  ctx.moveTo(o.xofs-1,yofs-o.ylast);
  for (var i=0;i<len;i++) {
    o.ylast=yscale*data[i];
    var y=yofs-o.ylast;
    if (o.xofs==0) {
      ctx.moveTo(o.xofs,y);
    } else {
      ctx.lineTo(o.xofs,y);
    }
    o.xofs++;
    if (o.xofs>=canvas.width) o.xofs=0;
  }
  ctx.stroke();
  // cursor
  ctx.strokeRect(o.xofs+1,y-2,5,4);
}

function mqFrame(cfg) {
  var cnt = mqFrame.cnt||0;
  mqFrame.cnt = cnt+1;
  var id = cfg.id||('mq-frame-'+cnt);
  var obj = mqMakeWidget({
    tag: 'div',
    id: id,
    overflow: 'hidden',
    border: '1px solid ' + mqPal(0.5).hex(),
    background: cfg.background||'transparent',
    width: mqShrinkWidth(cfg.width),
    height: mqShrinkHeight(cfg.height),
    'user-select': 'none',
   // 'touch-action': 'none',
  });
  if (cfg.x!=null||cfg.y!=null)
    mqSet(obj,'position','absolute','top',cfg.y||'0px','left',cfg.x||'0px');
  return obj;
}

function mqSliderSet(objstr,val,lbl) {
  var obj = mqElement(objstr);
  var w = obj.clientWidth;
  var val = Math.round(val);
  if (val>100) val=100; else if (val<0) val=0;
  obj.slider=val;
  mqSet(obj.firstChild,'width',Math.round((w*val)/100)+'px');
  if (lbl) mqSet(obj.lastChild,'innerHTML',lbl);
}

function mqSlider(cfg) {
  var cnt = mqSlider.cnt||0;
  mqSlider.cnt = cnt+1;
  var id = cfg.id||('mq-slider-'+cnt);
  var cb = cfg.onchange||function (obj) { console.log('slider='+obj.slider); };
  var obj = mqMakeWidget({
    tag: 'div',
    id: id,
    border: '1px solid ' + mqPal(0.5).hex(),
    background: cfg.background||mqPal(0.05).hex(),
    width: mqShrinkWidth(cfg.width),
    height: mqShrinkHeight(cfg.height||'16px'),
    cursor: 'pointer',
    'user-select': 'none',
   // 'touch-action': 'none',
    'onclick': function (e) { 
       var rect = e.target.getBoundingClientRect();
       var x = e.clientX - rect.left;
       var w = this.clientWidth;
       var val = Math.round((100*x)/w);
       if (val>100) val=100; else if (val<0) val=0;
       this.slider=val;
       mqSet(this.firstChild,'width',x+'px');
       cb(this);
    }
  });
  obj.slider=cfg.value||0;
  var markerw = obj.slider*parseInt(mqShrinkWidth(cfg.width))/100;
  var obj2 = mqMakeWidget({
    tag: 'div',
    id: id+'-marker',
    background: cfg.color||mqPal(1.0).hex(),
    width: markerw + 'px',
    height: mqShrinkHeight(cfg.height||'16px'),
    position: 'absolute',
    top: '0px',
    left: '0px'
  });
  var yofs = parseInt(cfg.height||'16px')/2-24/2;
  var obj3 = mqMakeWidget({
    tag: 'div',
    id: id+'-label',
    width: '120px',
    height: '24px',
    position: 'absolute',
    top: yofs+'px',
    left: '-128px',
    'white-space': 'nowrap',
    'overflow': 'hidden',
    'text-align': 'right',
    'font-size': '14px',
    innerHTML: cfg.label||"Slider",
  });
  mqAppend(obj,obj2);
  mqAppend(obj,obj3);
  if (cfg.x!=null||cfg.y!=null)
    mqSet(obj,'position','absolute','top',cfg.y||'0px','left',cfg.x||'0px');
  return obj;
}

function mqListSetEntries(id,entries,cb,selected) {
  var obj = mqElement(id+'-wrapper');
  if (!obj) return;
  var width = mqWidth(obj);
  obj.innerHTML="";
  for (var i=0;i<entries.length;i++) {
    var entry = entries[i];
    var obj2 = mqLabel({
      id: id+'-entry-'+i,
      label: entry,
      width: (width-7)+'px'
    });
    mqSet(obj2,
      'background', (mqOdd(i)?mqPal(0.05).hex():'none'),
      'class', id+'-entries',
      'border', '1px solid '+(selected==entry?mqPal(0.5).hex():'transparent'),
      'onclick', function (e) {
         var objs = this.parentElement.childNodes;
         for (var i=0;i<objs.length;i++) mqSet(objs[i],'border','1px solid transparent');
         mqSet(this,'border','1px solid '+mqPal(0.5).hex());
         cb(this.firstChild.innerText);
      }
    );
    mqSet(obj2.firstChild,'padding-left','5px');
    mqAppend(obj,obj2);
  }
}

function mqList(cfg) {
  var cnt = mqList.cnt||0;
  mqList.cnt = cnt+1;
  var id = cfg.id||('mq-list-'+cnt);
  var obj = mqMakeWidget({
    tag: 'div',
    id: id+'-wrapper',
    'overflow-x': 'hidden',
    'overflow-y': 'scroll',
    border: '1px solid ' + mqPal(0.5).hex(),
    width: mqShrinkWidth(cfg.width),
    height: mqShrinkHeight(cfg.height),
    'user-select': 'none',
  //  'touch-action': 'none',
    cursor: 'pointer',
  });
  var cb = cfg.onclick||function(e) { console.log('you clicked '+e); };
  var entries=cfg.entries||[];
  for (var i=0;i<entries.length;i++) {
    var entry = entries[i];
    var obj2 = mqLabel({
      id: id+'-entry-'+i,
      label: entry, 
      width: mqShrinkWidth(cfg.width,7),
    });
    mqSet(obj2, 
      'background', (mqOdd(i)?mqPal(0.05).hex():'none'),
      'class', id+'-entries',
      'border', '1px solid '+(cfg.selected==entry?mqPal(0.5).hex():'transparent'),
      'onclick', function (e) {
         var objs = this.parentElement.childNodes;
         for (var i=0;i<objs.length;i++) mqSet(objs[i],'border','1px solid transparent');
         mqSet(this,'border','1px solid '+mqPal(0.5).hex());
         cb(this.firstChild.innerText);
      }
    );
    mqSet(obj2.firstChild,'padding-left','5px');
    mqAppend(obj,obj2);
  }
  if (cfg.x!=null||cfg.y!=null)
    mqSet(obj,'position','absolute','top',cfg.y||'0px','left',cfg.x||'0px');
  return obj;
}

