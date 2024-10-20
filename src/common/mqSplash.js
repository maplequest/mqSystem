
function mqSplashUI (cfg={}) {
  var d = new Date();
  var year = cfg.year||d.getFullYear();
  var organization = cfg.organization||"MapleQuest Innovations";
  var icon = cfg.icon||(mqVersion+'/icons/full-logo.svg');
  var border = cfg.border||false;
  var wnd = mqWindow({
    id: 'splash',
    title: 'About ' + mqTitle,
    width: '300px',
    height: (border?194:170)+'px',
    borderless: (border?false:true)
  });
  mqSet('splash','padding','5px','text-align','center');
  var obj = mqMakeWidget({
    tag: 'img',
    id: 'splash-logo',
    src: icon,
    width: '200px',
    'margin-top': '20px'
  });
  mqAppend(wnd,obj);
  obj = mqMakeWidget({
    tag: 'div',
    id: 'splash-label',
    innerHTML: mqTitle + ' ' + mqVersion,
    'margin-top': '20px'
  });
  mqAppend(wnd,obj);
  obj = mqMakeWidget({
    tag: 'div',
    id: 'splash-legal',
    'font-size': '10px',
    innerHTML: `Copyright &copy; ${year} ${organization}<br>By using this site you agree to our <a onclick="mqTermsOfUseUI();">Terms of Use</a>.`,
    'margin-top': '20px'
  });
  mqAppend(wnd,obj);
  if (!border) setTimeout(function () { mqDelete('splash-window'); }, 5000);
}


