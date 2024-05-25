
class mqIIRLowpass {
  constructor (cfg) {
    var iirCalculator = new Fili.CalcCascades();
    var coefs = iirCalculator.lowpass( {
      order: cfg.order,
      characteristic: 'butterworth',
      Fs: cfg.fs,
      Fc: cfg.fc
    });
    this.filter = new Fili.IirFilter(coefs);
  }
  step (x) {
    return this.filter.singleStep(x);
  }
}

class mqIIRHighpass {
  constructor (cfg) {
    var iirCalculator = new Fili.CalcCascades();
    var coefs = iirCalculator.highpass( {
      order: cfg.order,
      characteristic: 'butterworth',
      Fs: cfg.fs,
      Fc: cfg.fc
    });
    this.filter = new Fili.IirFilter(coefs);
  }
  step (x) {
    return this.filter.singleStep(x);
  }
}


