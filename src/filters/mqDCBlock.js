
class mqDCBlock {
  constructor (cfg) {
    this.fs = cfg.fs;
    this.fc = cfg.fc||0.1;
    this.b = 2 * Math.PI * this.fc / this.fs;
    this.a = 1 - this.b/2.0;
    this.x_1 = null;
    this.y_1 = null;
  }
  step(x) {
    if (x==null||isNaN(x)) { x=0; }
    var y = this.a*x-this.a*this.x_1+(1-this.b)*this.y_1;
    this.y_1=y;
    this.x_1=x;
    return y;
  }
}

