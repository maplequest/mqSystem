
class mqVariance {
  constructor () {
    this.reset();
  }
  reset() {
    this.count=0;
    this.mean = 0;
    this.M2 = 0;
  }
  step (x) {
    this.count++;
    var delta = x - this.mean;
    this.mean+= delta/this.count;
    var delta2 = x - this.mean;
    this.M2 += delta*delta2;
    return this.M2 / this.count;
  }
}

