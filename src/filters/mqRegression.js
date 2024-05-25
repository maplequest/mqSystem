
class mqRegressionFilter {
  constructor (cfg) {
    this.n = cfg.n;
    this.values = null;
  }
  step (x) {
    if (this.values==null) {
      this.values = new Array(this.n).fill(x);
    } else {
      this.values.shift();
      this.values.push(x);
    }
    var sum_x = 0;
    var sum_y = 0;
    var sum_xy = 0;
    var sum_xx = 0;
    var count = 0;
    for (var i=0;i<this.values.length;i++) {
      var x = i;
      var y = this.values[i];
      sum_x += x;
      sum_y += y;
      sum_xx += x*x;
      sum_xy += x*y;
      count++;
    }
    var m = (count*sum_xy - sum_x*sum_y) / (count*sum_xx - sum_x*sum_x);
    var b = (sum_y/count) - (m*sum_x)/count;
    return (this.n-1)*m + b;
  }
}

