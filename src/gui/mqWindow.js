
function mqWindowOnTop(id) {
  var obj0 = mqElement(id);
  var ztop = 1000; // starting index for all windows
  mqClassApply('mq-window', function (obj) {
    if (obj!=obj0) ztop=Math.max(ztop,parseFloat(mqStyle(obj,'z-index')||'0'));
  });
  ztop+=1;
  mqStyle(obj0,'z-index',ztop+'');
}

function mqWindowDrag(e) {
  var objs = mqElementsOfClass('mq-window');
  for (var i=0;i<objs.length;i++) {
    var obj = objs[i];
    if (obj.drag!=null) {
      var x1 = e.clientX;
      var y1 = e.clientY;
      var x0 = obj.drag[0];
      var y0 = obj.drag[1];
      mqElementPosition(obj,x1-x0,y1-y0);
      obj.drag = [x1,y1];
    }
  }
  var obj0 = document.elementFromPoint(e.clientX,e.clientY); 
  if (obj0==null) return;
  objs = mqElementsOfClass('mq-window-closer');
  for (var i=0;i<objs.length;i++) {
    var obj = objs[i];
    mqSet(obj,'background',(obj0.id==obj.id?'red':'none'));
    mqSet(obj,'color',(obj0.id==obj.id?'white':'black'));
  }
}

function mqWindow(wcfg) {
  var title = wcfg.title;
  var id= wcfg.id;
  var w= wcfg.width||"100px";
  var h= wcfg.height||"100px";
  var cb = wcfg.onclose;
  if (wcfg.x==null)  wcfg.x=(0.5*mqWidth()-0.5*parseFloat(w))+'px';
  var x = wcfg.x;
  if (wcfg.y==null)  wcfg.y=(0.5*mqHeight()-0.5*parseFloat(h))+'px';
  var y= wcfg.y;
  if (mqWindow.initDone==null) {
    //mqEvent('mq-root','mousemove',mqWindowDrag,true);
    mqEvent('mq-root','pointermove',mqWindowDrag,true);
    mqWindow.initDone=true;
  }
  mqDelete(id+'-window');
  var titlebar=mqMakeWidget({
    tag: 'div',
    id: id+'-titlebar', 
    'padding-left': '5px',
    'innerHTML': title,
    'background': mqPal(0.05).hex(),
    'border-bottom': '1px solid ' + mqPal(1.0).hex(),
    'user-select': "none",
    'onmousedown': function (e) { 
       mqWindowOnTop(this.parentElement.parentElement);
       this.parentElement.parentElement.drag=[e.clientX,e.clientY]; },
//    'onpointerdown': function (e) { this.parentElement.parentElement.drag=[e.clientX,e.clientY]; },
    'onmouseup': function (e) { this.parentElement.parentElement.drag=null; }
//    'onpointerup': function (e) { this.parentElement.parentElement.drag=null; }
  });
  var closebox = mqMakeWidget( {
    tag: 'div',
    id: id+'-closebox', 
    'user-select': "none",
    'innerHTML': "X",
    'max-width': '25px',
    'text-align': 'center',
    'background': mqPal(0.05).hex(),
    'border-left': '1px solid ' + mqPal(1.0).hex(),
    'border-bottom': '1px solid ' + mqPal(1.0).hex(),
    'onclick': function (e) { if (cb) cb();  mqDelete(this.parentElement.parentElement); },
     class: 'mq-window-closer',
  });
  var bar = mqMakeColumns({
    tag: 'div',
    id: id + '-bar',
    'max-height': '25px',
    children: [titlebar,closebox]
  });
  var bdy=mqMakeWidget({
    tag: 'div', 
    id: id,
    overflow: 'hidden',
    background: mqPal(0.0).hex()
  });
  var obj = mqMakeRows({
    tag: 'div',
    id: id + '-window',
    width: w,
    height: h,
    position: "absolute",
    left: x,
    top: y,
    class: 'mq-window',
    border: '1px solid ' + mqPal(1.0).hex(),
    background: mqPal(0.0).hex(),
    children: (wcfg.borderless?[bdy]:[bar,bdy])
  });
  mqAppend('mq-root',obj);
  mqStyle(obj,'filter','drop-shadow(0px 0px 4px '+mqPal(0.5).hex()+')');
  mqWindowOnTop(obj);
  return bdy;
}


