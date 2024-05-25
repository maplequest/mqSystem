
class mqFIRLowpass {
  constructor (cfg) {
    var firCalculator = new Fili.FirCoeffs();
    var coefs = firCalculator.lowpass( {
      order: cfg.order,
      Fs: cfg.fs,
      Fc: cfg.fc
    });
    this.filter = new Fili.FirFilter(coefs);
  }
  step (x) {
    return this.filter.singleStep(x);
  }
}

class mqFIRHighpass {
  constructor (cfg) {
    var firCalculator = new Fili.FirCoeffs();
    var coefs = firCalculator.highpass( {
      order: cfg.order,
      Fs: cfg.fs,
      Fc: cfg.fc
    });
    this.filter = new Fili.FirFilter(coefs);
  }
  step (x) {
    return this.filter.singleStep(x);
  }
}

