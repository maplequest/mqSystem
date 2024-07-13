
var mqCfg = {
  "pal-scale": ['#171923','#edf2f7'],
  "pal-mode": 'lab',
  "pal-domain": [0,1]
};

var mqPal = null;

function mqModalBlock(b) {
  mqAttr('mq-modal','blocking',(b?'true':'false'));
}

function mqModalBackgroundCallback (e) {
  if (mqAttr('mq-modal','blocking')=='true') return;
  var obj = document.elementFromPoint(e.pageX,e.pageY);
  if (obj&&obj.id!='mq-modal') return;
  mqModal(false);
}

function mqModal(m) {
  mqSet('mq-modal','display',(m?'block':'none'));
}

function mqSplashTimeout() {
  mqSet('mq-splash','display','none');
}

function mqResizeRoot() {
  var w = window.innerWidth;
  var h = window.innerHeight;
  var maxAR = mqCfg["max-ar"];
  var minAR = mqCfg["min-ar"];
  var maxWidth = mqCfg["max-width"];
  var minWidth = mqCfg["min-width"];
  var maxHeight = mqCfg["max-height"];
  var minHeight = mqCfg["min-height"];
  if (maxWidth&&w>maxWidth) w=maxWidth;
  if (minWidth&&w<minWidth) w=minWidth;
  if (maxHeight&&h>maxHeight) h=maxHeight;
  if (minHeight&&h<minHeight) h=minHeight;
  var ar = w/h;
  if (maxAR&&ar>maxAR) { w = maxAR * h; } 
    else if (minAR&&ar<minAR) { h = w / minAR; }
  var wstr = w + 'px';
  var hstr = h + 'px';
  mqSet('mq-root','width',wstr);
  mqSet('mq-root','min-width',wstr);
  mqSet('mq-root','max-width',wstr);
  mqSet('mq-root','height',hstr);
  mqSet('mq-root','min-height',hstr);
  mqSet('mq-root','max-height',hstr);
  mqSet('mq-splash-root','width', Math.round(0.5*w)+'px');
  mqSet('mq-modal-root','width', Math.round(0.5*w)+'px');
  mqSet('mq-top','font-size', mqCfg["font-size"]||'16px');
  setTimeout(function () {
    mqSet('mq-top','width','100%');
    mqSet('mq-top','height','100%');
  },200);
}

/** Initialize mqWebApp
* @param {Object} cfg Configuration parameters
*/
function mqInit(cfg) {
  mqCfg = mqMerge(mqCfg,cfg||{});
  mqPal = chroma.scale(mqCfg["pal-scale"]).mode(mqCfg["pal-mode"]).domain(mqCfg["pal-domain"]);
  var col0=mqPal(0.5).hex();
  var col1=mqPal(0.1).hex();
  var col2=mqPal(0.4).hex();
  var col3=mqPal(0.3).hex();
  var col4=mqPal(0.2).hex();
  mqCSS('mq-init-style',`
html {
  overscroll-behavior-x: none;
}

body {
  overscroll-behavior-x: none;
}

::-webkit-scrollbar { width: 5px; }
::-webkit-scrollbar-track { background: ${col1}; }
::-webkit-scrollbar-thumb { background: ${col2}; }
::-webkit-scrollbar-thumb:hover { background: ${col3}; }

::-moz-selection {
  color: ${col4};
  background: ${col0};
}
::selection {
  color: ${col4};
  background: ${col0};
}
`);
  mqSet(document.body,'margin','0px');
  // spellcheck has to be disabled globally.. go figure
  mqAttr(document.body,"spellcheck","false");
  mqAttr(document.body,"autocorrect","false");
  mqAttr(document.body,"autocapitalize","false");
  mqAttr(document.body,"autocomplete","false");

  if ('serviceWorker' in navigator) 
    navigator.serviceWorker.register('/service-worker.js').then(() => { }).catch( err => { 
       console.log('Service worker registration failed: ' + err); 
    });

  var top = mqMakeWidget({ tag: 'div', "id": 'mq-top' } );
  mqPositionChildren(top);
  mqSet(top,'font-family','mqDefault');
  mqSet(top,'background',mqPal(0.0).hex());
  mqSet(top,'color',mqPal(1.0).hex());
  mqSet(top,'overflow-x','hidden');
  mqSet(top,'overflow-y','hidden');
 
  var root= mqMakeWidget({ tag: 'div', "id": 'mq-root' });
  mqPosition(root);
  mqAppend(top,root);
  mqSet(root,'height','inherit');
  mqSet(root,'width','inherit');
  mqSet(root,'background',mqPal(0.1).hex());
  mqEvent(window,'resize',mqResizeRoot); 
  mqSet(modal,'z-index','100');

  var modal = mqMakeWidget({ tag: 'div',  "id": 'mq-modal' } );
  mqPosition(modal);
  mqAppend(root,modal);
  mqSet(modal,'height','101%');
  mqSet(modal,'width','101%');
  mqSet(modal,'z-index','200');
  mqSet(modal,'display','none');
  mqSet(modal,'background',mqPal(0.0).alpha(0.5).hex());
  mqSet(modal,'onclick',mqModalBackgroundCallback);

  var mRoot = mqMakeWidget({tag: 'div', "id": 'mq-modal-root' } );
  mqPosition(mRoot);
  mqSet(mRoot,'border','2px solid ' + mqPal(0.0).hex());
  mqAppend(modal,mRoot);

  var splash = mqMakeWidget({tag: 'div', "id": 'mq-splash' });
  mqPosition(splash);
  mqAppend(root,splash);
  mqSet(splash,'height','101%');
  mqSet(splash,'width','101%');
  mqSet(splash,'z-index','300');
  mqSet(splash,'background',mqPal(0.0).hex());

  if (mqCfg["splash"]) {
    var splashImage = mqMakeWidget({ tag:'img',
      "id": "splash-image",
      "width": mqCfg["splash-image-width"]||"50%",
      "src": mqCfg["splash-image"]
    });
    if (mqCfg["splash-filter"]) {
      mqSet(splashImage,'filter',mqCfg["splash-filter"]);
    }
    mqPositionCC(splashImage);
    mqAppend(splash,splashImage);
    mqSet(splash,'display','block');
    setTimeout(mqSplashTimeout,mqCfg.splash*1000);
  } else {
    mqSet(splash,'display','none');
  }

  var sRoot = mqMakeWidget({tag: 'div', "id": 'mq-splash-root'} );
  mqSet(sRoot,'text-align','center');
  if (mqCfg["splash-logo"]) {
    var img = mqMakeWidget({tag:'img'});
    mqAttr(img,'src',mqCfg["splash-logo"]);
    mqAppend(sRoot,img);
  }
  if (mqCfg["splash-label"]) {
    var lbl = mqMakeWidget({tag: 'div'});
    mqHTML(lbl,mqCfg["splash-label"]);
    mqSet(lbl,'margin-top','10%');
    mqAppend(sRoot,lbl);
  }
  mqPosition(sRoot);
  mqAppend(splash,sRoot);

  var h = window.innerHeight;
  var w = window.innerWidth;
  mqSet(top,'height',h+'px');
  mqSet(top,'width',w+'px');

//  mqSet(top,'height','100vh');
//  mqSet(top,'width','100vw');
  document.body.appendChild(top);

  mqEvent(document,'keyup', function (e) {
    if (e.code=='Escape') mqClassApply('mq-dropdown',mqDelete);
  });
  mqEvent(window,'resize', function (e) {
    mqClassApply('mq-dropdown',mqDelete);
  });
  mqEvent(window,'click',function (e) {
    var tgt = e.target;
    if (!tgt.classList.contains('mq-dropdown-content')) mqClassApply('mq-dropdown',mqDelete);
  });

  mqResize();
}

