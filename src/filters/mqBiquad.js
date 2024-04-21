
class mqBiquad {
  constructor (cfg) {
    var ftype = cfg.type;
    this.fs = cfg.fs;
    this.fc = cfg.fc;
    this.q = cfg.q;
    this.a = cfg.a || 1.0;
    this.w0 = 2*Math.PI*this.fc/this.fs;
    this.alpha = Math.sin(this.w0)/(2*this.q);
    this.b0=0;
    this.b1=0;
    this.b2=0;
    this.a1=0;
    this.a2=0;
    this.s1=0;
    this.s2=0;
    if (ftype=="lowpass") this.lowpass();
      else if (ftype=="highpass") this.highpass();
        else if (ftype=="notch") this.notch();
          else if (ftype=="bandpass") this.bandpass();
            else if (ftype=="allpass") this.allpass();
              else if (ftype=="peakingEQ") this.peakingEQ();
                else console.error('Failed to initialize biquad');
    this.b0=this.b0/this.a0;
    this.b1=this.b1/this.a0;
    this.b2=this.b2/this.a0;
    this.a1=this.a1/this.a0;
    this.a2=this.a2/this.a0;
  }
  lowpass () {
    this.b0 = (1- Math.cos(this.w0))/2.0;
    this.b1 = 1-Math.cos(this.w0);
    this.b2 = (1- Math.cos(this.w0))/2.0;
    this.a0 = 1 + this.alpha;
    this.a1 = -2*Math.cos(this.w0);
    this.a2 = 1 - this.alpha;
  }
  highpass () {
    this.b0 = (1 + Math.cos(this.w0))/2.0;
    this.b1 = -(1+Math.cos(this.w0));
    this.b2 = (1 + Math.cos(this.w0))/2.0;
    this.a0 = 1 + this.alpha;
    this.a1 = -2*Math.cos(this.w0);
    this.a2 = 1 - this.alpha;
  }
  notch () {
    this.b0 = 1;
    this.b1 = -2*Math.cos(this.w0);
    this.b2 = 1;
    this.a0 = 1 + this.alpha;
    this.a1 = -2*Math.cos(this.w0);
    this.a2 = 1 - this.alpha;
  }
  allpass () {
    this.b0 = 1-this.alpha;
    this.b1 = -2*Math.cos(this.w0);
    this.b2 = 1+this.alpha;
    this.a0 = 1 + this.alpha;
    this.a1 = -2*Math.cos(this.w0);
    this.a2 = 1 - this.alpha;
  }
  bandpass () {
    this.b0 = this.alpha;
    this.b1 =  0;
    this.b2 = -this.alpha;
    this.a0 = 1 + this.alpha;
    this.a1 = -2*Math.cos(this.w0);
    this.a2 = 1 - this.alpha;
  }
  peakingEQ () {
    this.b0 = 1+ this.a*this.alpha;
    this.b1 = -2*Math.cos(this.w0);
    this.b2 = 1 -this.a*this.alpha;
    this.a0 = 1 + this.alpha/this.a;
    this.a1 = -2*Math.cos(this.w0);
    this.a2 = 1 - this.alpha/this.a;
  }
  step (x) {
    if (x==null||isNaN(x)) x=0;
    var y = this.b0*x + this.s1;
    this.s1 = this.s2 + this.b1*x - this.a1*y;
    this.s2 = this.b2*x - this.a2*y;
    return y;
  }
}

