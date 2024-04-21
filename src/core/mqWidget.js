
function mqMakeWidget(cfg) {
  var obj = document.createElement(cfg["tag"]||'div');
  mqApplyConfig(obj,cfg);
  return obj;
}

function mqMakeCenteredWidget(cfgOuter,cfgInner) {
  var o = mqMakeWidget(cfgOuter);
  mqPositionChildren(o);
  var o2 = null;
  o2 = mqMakeWidget(cfgInner);
  mqPositionCC(o2);
  mqAppend(o,o2);
  return [o,o2];
}

