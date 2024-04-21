
function mqElapsedString (elapsed) {
  if (elapsed==-1) return "--:--:--";
  var h = Math.floor(elapsed/3600.0);
  elapsed-=h*3600;
  var m = Math.floor(elapsed/60.0);
  elapsed-=m*60;
  var s = Math.floor(elapsed);
  if (h<10) h="0" + h;
  if (m<10) m="0" + m;
  if (s<10) s="0" + s;
  return h+':'+m+':'+s;
}

