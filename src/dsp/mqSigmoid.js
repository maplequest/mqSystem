
function mqSigmoid(x,ymin,ymax,slope=1) {
  // Y = A1/(1+exp(A2*(X-A3)))+A4
  var A4 = ymin;
  var A1 = ymax - A4;
  var A3 = 0.5*(ymin+ymax);
  var A2 = -4*slope/A1;
  return A1/(1+Math.exp(A2*(x-A3)))+A4;
}

