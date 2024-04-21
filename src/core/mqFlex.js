
function mqMakeFlex(cfg,dir) {
  var obj = mqMakeWidget(cfg);
  mqSet(obj,'display','flex');
  mqSet(obj,'flex-direction',dir);
  mqSet(obj,'flex-wrap','nowrap');
  mqSet(obj,'justify-content','space-evenly');
  mqSet(obj,'padding','0px');
  mqSet(obj,'margin','0px');
  var cs = cfg["children"];
  if (cs) {
    for (var i=0;i<cs.length;i++) {
      if (!cfg["noflex"]) mqSet(cs[i],'flex','1');
    }
  }
  return obj;
}

function mqMakeRows(cfg) { return mqMakeFlex(cfg,'column'); }
function mqMakeColumns(cfg) { return mqMakeFlex(cfg,'row'); }

