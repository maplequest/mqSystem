
class mqPalette {
  constructor (scale) {
    this.colorscales = {
      "Jet2": [
         'rgb(26,32,44)',
         'rgb(45,55,72)',
         'rgb(0,60,170)', 
         'rgb(255,255,0)',  
         'rgb(250,0,0)', 
         'rgb(128,0,0)'
      ],
      "Jet": [
          'rgb(0,0,131)', 
          'rgb(0,60,170)', 
          'rgb(5,255,255)', 
          'rgb(255,255,0)',  
          'rgb(250,0,0)', 
          'rgb(128,0,0)'
       ],
     "Rainbow": [
         'rgb(45,55,72)',
         // 'rgb(150,0,90)', 
          'rgb(0,0,200)', 
          'rgb(0,25,255)', 
          'rgb(0,152,255)',
          'rgb(44,255,150)',
          'rgb(151,255,0)', 
          'rgb(255,234,0)', 
          'rgb(255,111,0)', 
          'rgb(255,0,0)'
      ]
    };
    this.scale = this.colorscales[scale];
    for (var i=0;i<this.scale.length;i++) {
      this.scale[i]=this.rgbstr2rgb(this.scale[i]);
    }
    this.dx = 1.0/(this.scale.length-1);
  }
  rgbstr2rgb(rgbstr) {
    var tmp = rgbstr.replace("rgb(","").replace(")","").split(",");
    return [parseFloat(tmp[0]),parseFloat(tmp[1]),parseFloat(tmp[2])];
  }
  rgb2rgbstr(rgb) {
    return "rgb(" + rgb[0] + "," + rgb[1] + "," + rgb[2] + ")";
  }
  rgba2rgbastr(rgb,alpha) {
    return "rgba(" + rgb[0] + "," + rgb[1] + "," + rgb[2] + "," + alpha + ")";
  }
  mix(c1,c2,x) {
    return [
      Math.round(c1[0]*x+c2[0]*(1-x)),
      Math.round(c1[1]*x+c2[1]*(1-x)),
      Math.round(c1[2]*x+c2[2]*(1-x))
    ];
  }
  rgb(x0) {
    var x  = (x0>1?1:(x0<0?0:x0));
    var i = 0;
    while (i*this.dx<x) { i++; }
    var c2 = this.scale[i];
    var c1 = this.scale[(i==0?0:i-1)];
    var xr = (i*this.dx-x)/this.dx;
    return this.mix(c1,c2,xr);
  }
  rgbstr(x) {
    return this.rgb2rgbstr(this.rgb(x));
  }
  rgbastr(x,a) {
    return this.rgba2rgbastr(this.rgb(x),a);
  }
}
 

