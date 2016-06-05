/* */ 
"format cjs";
(function(Buffer, process) {
  (function e(t, n, r) {
    function s(o, u) {
      if (!n[o]) {
        if (!t[o]) {
          var a = typeof require == "function" && require;
          if (!u && a)
            return a(o, !0);
          if (i)
            return i(o, !0);
          var f = new Error("Cannot find module '" + o + "'");
          throw f.code = "MODULE_NOT_FOUND", f;
        }
        var l = n[o] = {exports: {}};
        t[o][0].call(l.exports, function(e) {
          var n = t[o][1][e];
          return s(n ? n : e);
        }, l, l.exports, e, t, n, r);
      }
      return n[o].exports;
    }
    var i = typeof require == "function" && require;
    for (var o = 0; o < r.length; o++)
      s(r[o]);
    return s;
  })({
    1: [function(require, module, exports) {
      var colorNames = require('color-name');
      module.exports = {
        getRgba: getRgba,
        getHsla: getHsla,
        getRgb: getRgb,
        getHsl: getHsl,
        getHwb: getHwb,
        getAlpha: getAlpha,
        hexString: hexString,
        rgbString: rgbString,
        rgbaString: rgbaString,
        percentString: percentString,
        percentaString: percentaString,
        hslString: hslString,
        hslaString: hslaString,
        hwbString: hwbString,
        keyword: keyword
      };
      function getRgba(string) {
        if (!string) {
          return;
        }
        var abbr = /^#([a-fA-F0-9]{3})$/,
            hex = /^#([a-fA-F0-9]{6})$/,
            rgba = /^rgba?\(\s*([+-]?\d+)\s*,\s*([+-]?\d+)\s*,\s*([+-]?\d+)\s*(?:,\s*([+-]?[\d\.]+)\s*)?\)$/,
            per = /^rgba?\(\s*([+-]?[\d\.]+)\%\s*,\s*([+-]?[\d\.]+)\%\s*,\s*([+-]?[\d\.]+)\%\s*(?:,\s*([+-]?[\d\.]+)\s*)?\)$/,
            keyword = /(\w+)/;
        var rgb = [0, 0, 0],
            a = 1,
            match = string.match(abbr);
        if (match) {
          match = match[1];
          for (var i = 0; i < rgb.length; i++) {
            rgb[i] = parseInt(match[i] + match[i], 16);
          }
        } else if (match = string.match(hex)) {
          match = match[1];
          for (var i = 0; i < rgb.length; i++) {
            rgb[i] = parseInt(match.slice(i * 2, i * 2 + 2), 16);
          }
        } else if (match = string.match(rgba)) {
          for (var i = 0; i < rgb.length; i++) {
            rgb[i] = parseInt(match[i + 1]);
          }
          a = parseFloat(match[4]);
        } else if (match = string.match(per)) {
          for (var i = 0; i < rgb.length; i++) {
            rgb[i] = Math.round(parseFloat(match[i + 1]) * 2.55);
          }
          a = parseFloat(match[4]);
        } else if (match = string.match(keyword)) {
          if (match[1] == "transparent") {
            return [0, 0, 0, 0];
          }
          rgb = colorNames[match[1]];
          if (!rgb) {
            return;
          }
        }
        for (var i = 0; i < rgb.length; i++) {
          rgb[i] = scale(rgb[i], 0, 255);
        }
        if (!a && a != 0) {
          a = 1;
        } else {
          a = scale(a, 0, 1);
        }
        rgb[3] = a;
        return rgb;
      }
      function getHsla(string) {
        if (!string) {
          return;
        }
        var hsl = /^hsla?\(\s*([+-]?\d+)(?:deg)?\s*,\s*([+-]?[\d\.]+)%\s*,\s*([+-]?[\d\.]+)%\s*(?:,\s*([+-]?[\d\.]+)\s*)?\)/;
        var match = string.match(hsl);
        if (match) {
          var alpha = parseFloat(match[4]);
          var h = scale(parseInt(match[1]), 0, 360),
              s = scale(parseFloat(match[2]), 0, 100),
              l = scale(parseFloat(match[3]), 0, 100),
              a = scale(isNaN(alpha) ? 1 : alpha, 0, 1);
          return [h, s, l, a];
        }
      }
      function getHwb(string) {
        if (!string) {
          return;
        }
        var hwb = /^hwb\(\s*([+-]?\d+)(?:deg)?\s*,\s*([+-]?[\d\.]+)%\s*,\s*([+-]?[\d\.]+)%\s*(?:,\s*([+-]?[\d\.]+)\s*)?\)/;
        var match = string.match(hwb);
        if (match) {
          var alpha = parseFloat(match[4]);
          var h = scale(parseInt(match[1]), 0, 360),
              w = scale(parseFloat(match[2]), 0, 100),
              b = scale(parseFloat(match[3]), 0, 100),
              a = scale(isNaN(alpha) ? 1 : alpha, 0, 1);
          return [h, w, b, a];
        }
      }
      function getRgb(string) {
        var rgba = getRgba(string);
        return rgba && rgba.slice(0, 3);
      }
      function getHsl(string) {
        var hsla = getHsla(string);
        return hsla && hsla.slice(0, 3);
      }
      function getAlpha(string) {
        var vals = getRgba(string);
        if (vals) {
          return vals[3];
        } else if (vals = getHsla(string)) {
          return vals[3];
        } else if (vals = getHwb(string)) {
          return vals[3];
        }
      }
      function hexString(rgb) {
        return "#" + hexDouble(rgb[0]) + hexDouble(rgb[1]) + hexDouble(rgb[2]);
      }
      function rgbString(rgba, alpha) {
        if (alpha < 1 || (rgba[3] && rgba[3] < 1)) {
          return rgbaString(rgba, alpha);
        }
        return "rgb(" + rgba[0] + ", " + rgba[1] + ", " + rgba[2] + ")";
      }
      function rgbaString(rgba, alpha) {
        if (alpha === undefined) {
          alpha = (rgba[3] !== undefined ? rgba[3] : 1);
        }
        return "rgba(" + rgba[0] + ", " + rgba[1] + ", " + rgba[2] + ", " + alpha + ")";
      }
      function percentString(rgba, alpha) {
        if (alpha < 1 || (rgba[3] && rgba[3] < 1)) {
          return percentaString(rgba, alpha);
        }
        var r = Math.round(rgba[0] / 255 * 100),
            g = Math.round(rgba[1] / 255 * 100),
            b = Math.round(rgba[2] / 255 * 100);
        return "rgb(" + r + "%, " + g + "%, " + b + "%)";
      }
      function percentaString(rgba, alpha) {
        var r = Math.round(rgba[0] / 255 * 100),
            g = Math.round(rgba[1] / 255 * 100),
            b = Math.round(rgba[2] / 255 * 100);
        return "rgba(" + r + "%, " + g + "%, " + b + "%, " + (alpha || rgba[3] || 1) + ")";
      }
      function hslString(hsla, alpha) {
        if (alpha < 1 || (hsla[3] && hsla[3] < 1)) {
          return hslaString(hsla, alpha);
        }
        return "hsl(" + hsla[0] + ", " + hsla[1] + "%, " + hsla[2] + "%)";
      }
      function hslaString(hsla, alpha) {
        if (alpha === undefined) {
          alpha = (hsla[3] !== undefined ? hsla[3] : 1);
        }
        return "hsla(" + hsla[0] + ", " + hsla[1] + "%, " + hsla[2] + "%, " + alpha + ")";
      }
      function hwbString(hwb, alpha) {
        if (alpha === undefined) {
          alpha = (hwb[3] !== undefined ? hwb[3] : 1);
        }
        return "hwb(" + hwb[0] + ", " + hwb[1] + "%, " + hwb[2] + "%" + (alpha !== undefined && alpha !== 1 ? ", " + alpha : "") + ")";
      }
      function keyword(rgb) {
        return reverseNames[rgb.slice(0, 3)];
      }
      function scale(num, min, max) {
        return Math.min(Math.max(min, num), max);
      }
      function hexDouble(num) {
        var str = num.toString(16).toUpperCase();
        return (str.length < 2) ? "0" + str : str;
      }
      var reverseNames = {};
      for (var name in colorNames) {
        reverseNames[colorNames[name]] = name;
      }
    }, {"color-name": 5}],
    2: [function(require, module, exports) {
      var convert = require('color-convert');
      var string = require('chartjs-color-string');
      var Color = function(obj) {
        if (obj instanceof Color) {
          return obj;
        }
        if (!(this instanceof Color)) {
          return new Color(obj);
        }
        this.values = {
          rgb: [0, 0, 0],
          hsl: [0, 0, 0],
          hsv: [0, 0, 0],
          hwb: [0, 0, 0],
          cmyk: [0, 0, 0, 0],
          alpha: 1
        };
        var vals;
        if (typeof obj === 'string') {
          vals = string.getRgba(obj);
          if (vals) {
            this.setValues('rgb', vals);
          } else if (vals = string.getHsla(obj)) {
            this.setValues('hsl', vals);
          } else if (vals = string.getHwb(obj)) {
            this.setValues('hwb', vals);
          } else {
            throw new Error('Unable to parse color from string "' + obj + '"');
          }
        } else if (typeof obj === 'object') {
          vals = obj;
          if (vals.r !== undefined || vals.red !== undefined) {
            this.setValues('rgb', vals);
          } else if (vals.l !== undefined || vals.lightness !== undefined) {
            this.setValues('hsl', vals);
          } else if (vals.v !== undefined || vals.value !== undefined) {
            this.setValues('hsv', vals);
          } else if (vals.w !== undefined || vals.whiteness !== undefined) {
            this.setValues('hwb', vals);
          } else if (vals.c !== undefined || vals.cyan !== undefined) {
            this.setValues('cmyk', vals);
          } else {
            throw new Error('Unable to parse color from object ' + JSON.stringify(obj));
          }
        }
      };
      Color.prototype = {
        rgb: function() {
          return this.setSpace('rgb', arguments);
        },
        hsl: function() {
          return this.setSpace('hsl', arguments);
        },
        hsv: function() {
          return this.setSpace('hsv', arguments);
        },
        hwb: function() {
          return this.setSpace('hwb', arguments);
        },
        cmyk: function() {
          return this.setSpace('cmyk', arguments);
        },
        rgbArray: function() {
          return this.values.rgb;
        },
        hslArray: function() {
          return this.values.hsl;
        },
        hsvArray: function() {
          return this.values.hsv;
        },
        hwbArray: function() {
          var values = this.values;
          if (values.alpha !== 1) {
            return values.hwb.concat([values.alpha]);
          }
          return values.hwb;
        },
        cmykArray: function() {
          return this.values.cmyk;
        },
        rgbaArray: function() {
          var values = this.values;
          return values.rgb.concat([values.alpha]);
        },
        hslaArray: function() {
          var values = this.values;
          return values.hsl.concat([values.alpha]);
        },
        alpha: function(val) {
          if (val === undefined) {
            return this.values.alpha;
          }
          this.setValues('alpha', val);
          return this;
        },
        red: function(val) {
          return this.setChannel('rgb', 0, val);
        },
        green: function(val) {
          return this.setChannel('rgb', 1, val);
        },
        blue: function(val) {
          return this.setChannel('rgb', 2, val);
        },
        hue: function(val) {
          if (val) {
            val %= 360;
            val = val < 0 ? 360 + val : val;
          }
          return this.setChannel('hsl', 0, val);
        },
        saturation: function(val) {
          return this.setChannel('hsl', 1, val);
        },
        lightness: function(val) {
          return this.setChannel('hsl', 2, val);
        },
        saturationv: function(val) {
          return this.setChannel('hsv', 1, val);
        },
        whiteness: function(val) {
          return this.setChannel('hwb', 1, val);
        },
        blackness: function(val) {
          return this.setChannel('hwb', 2, val);
        },
        value: function(val) {
          return this.setChannel('hsv', 2, val);
        },
        cyan: function(val) {
          return this.setChannel('cmyk', 0, val);
        },
        magenta: function(val) {
          return this.setChannel('cmyk', 1, val);
        },
        yellow: function(val) {
          return this.setChannel('cmyk', 2, val);
        },
        black: function(val) {
          return this.setChannel('cmyk', 3, val);
        },
        hexString: function() {
          return string.hexString(this.values.rgb);
        },
        rgbString: function() {
          return string.rgbString(this.values.rgb, this.values.alpha);
        },
        rgbaString: function() {
          return string.rgbaString(this.values.rgb, this.values.alpha);
        },
        percentString: function() {
          return string.percentString(this.values.rgb, this.values.alpha);
        },
        hslString: function() {
          return string.hslString(this.values.hsl, this.values.alpha);
        },
        hslaString: function() {
          return string.hslaString(this.values.hsl, this.values.alpha);
        },
        hwbString: function() {
          return string.hwbString(this.values.hwb, this.values.alpha);
        },
        keyword: function() {
          return string.keyword(this.values.rgb, this.values.alpha);
        },
        rgbNumber: function() {
          var rgb = this.values.rgb;
          return (rgb[0] << 16) | (rgb[1] << 8) | rgb[2];
        },
        luminosity: function() {
          var rgb = this.values.rgb;
          var lum = [];
          for (var i = 0; i < rgb.length; i++) {
            var chan = rgb[i] / 255;
            lum[i] = (chan <= 0.03928) ? chan / 12.92 : Math.pow(((chan + 0.055) / 1.055), 2.4);
          }
          return 0.2126 * lum[0] + 0.7152 * lum[1] + 0.0722 * lum[2];
        },
        contrast: function(color2) {
          var lum1 = this.luminosity();
          var lum2 = color2.luminosity();
          if (lum1 > lum2) {
            return (lum1 + 0.05) / (lum2 + 0.05);
          }
          return (lum2 + 0.05) / (lum1 + 0.05);
        },
        level: function(color2) {
          var contrastRatio = this.contrast(color2);
          if (contrastRatio >= 7.1) {
            return 'AAA';
          }
          return (contrastRatio >= 4.5) ? 'AA' : '';
        },
        dark: function() {
          var rgb = this.values.rgb;
          var yiq = (rgb[0] * 299 + rgb[1] * 587 + rgb[2] * 114) / 1000;
          return yiq < 128;
        },
        light: function() {
          return !this.dark();
        },
        negate: function() {
          var rgb = [];
          for (var i = 0; i < 3; i++) {
            rgb[i] = 255 - this.values.rgb[i];
          }
          this.setValues('rgb', rgb);
          return this;
        },
        lighten: function(ratio) {
          var hsl = this.values.hsl;
          hsl[2] += hsl[2] * ratio;
          this.setValues('hsl', hsl);
          return this;
        },
        darken: function(ratio) {
          var hsl = this.values.hsl;
          hsl[2] -= hsl[2] * ratio;
          this.setValues('hsl', hsl);
          return this;
        },
        saturate: function(ratio) {
          var hsl = this.values.hsl;
          hsl[1] += hsl[1] * ratio;
          this.setValues('hsl', hsl);
          return this;
        },
        desaturate: function(ratio) {
          var hsl = this.values.hsl;
          hsl[1] -= hsl[1] * ratio;
          this.setValues('hsl', hsl);
          return this;
        },
        whiten: function(ratio) {
          var hwb = this.values.hwb;
          hwb[1] += hwb[1] * ratio;
          this.setValues('hwb', hwb);
          return this;
        },
        blacken: function(ratio) {
          var hwb = this.values.hwb;
          hwb[2] += hwb[2] * ratio;
          this.setValues('hwb', hwb);
          return this;
        },
        greyscale: function() {
          var rgb = this.values.rgb;
          var val = rgb[0] * 0.3 + rgb[1] * 0.59 + rgb[2] * 0.11;
          this.setValues('rgb', [val, val, val]);
          return this;
        },
        clearer: function(ratio) {
          var alpha = this.values.alpha;
          this.setValues('alpha', alpha - (alpha * ratio));
          return this;
        },
        opaquer: function(ratio) {
          var alpha = this.values.alpha;
          this.setValues('alpha', alpha + (alpha * ratio));
          return this;
        },
        rotate: function(degrees) {
          var hsl = this.values.hsl;
          var hue = (hsl[0] + degrees) % 360;
          hsl[0] = hue < 0 ? 360 + hue : hue;
          this.setValues('hsl', hsl);
          return this;
        },
        mix: function(mixinColor, weight) {
          var color1 = this;
          var color2 = mixinColor;
          var p = weight === undefined ? 0.5 : weight;
          var w = 2 * p - 1;
          var a = color1.alpha() - color2.alpha();
          var w1 = (((w * a === -1) ? w : (w + a) / (1 + w * a)) + 1) / 2.0;
          var w2 = 1 - w1;
          return this.rgb(w1 * color1.red() + w2 * color2.red(), w1 * color1.green() + w2 * color2.green(), w1 * color1.blue() + w2 * color2.blue()).alpha(color1.alpha() * p + color2.alpha() * (1 - p));
        },
        toJSON: function() {
          return this.rgb();
        },
        clone: function() {
          var result = new Color();
          var source = this.values;
          var target = result.values;
          var value,
              type;
          for (var prop in source) {
            if (source.hasOwnProperty(prop)) {
              value = source[prop];
              type = ({}).toString.call(value);
              if (type === '[object Array]') {
                target[prop] = value.slice(0);
              } else if (type === '[object Number]') {
                target[prop] = value;
              } else {
                console.error('unexpected color value:', value);
              }
            }
          }
          return result;
        }
      };
      Color.prototype.spaces = {
        rgb: ['red', 'green', 'blue'],
        hsl: ['hue', 'saturation', 'lightness'],
        hsv: ['hue', 'saturation', 'value'],
        hwb: ['hue', 'whiteness', 'blackness'],
        cmyk: ['cyan', 'magenta', 'yellow', 'black']
      };
      Color.prototype.maxes = {
        rgb: [255, 255, 255],
        hsl: [360, 100, 100],
        hsv: [360, 100, 100],
        hwb: [360, 100, 100],
        cmyk: [100, 100, 100, 100]
      };
      Color.prototype.getValues = function(space) {
        var values = this.values;
        var vals = {};
        for (var i = 0; i < space.length; i++) {
          vals[space.charAt(i)] = values[space][i];
        }
        if (values.alpha !== 1) {
          vals.a = values.alpha;
        }
        return vals;
      };
      Color.prototype.setValues = function(space, vals) {
        var values = this.values;
        var spaces = this.spaces;
        var maxes = this.maxes;
        var alpha = 1;
        var i;
        if (space === 'alpha') {
          alpha = vals;
        } else if (vals.length) {
          values[space] = vals.slice(0, space.length);
          alpha = vals[space.length];
        } else if (vals[space.charAt(0)] !== undefined) {
          for (i = 0; i < space.length; i++) {
            values[space][i] = vals[space.charAt(i)];
          }
          alpha = vals.a;
        } else if (vals[spaces[space][0]] !== undefined) {
          var chans = spaces[space];
          for (i = 0; i < space.length; i++) {
            values[space][i] = vals[chans[i]];
          }
          alpha = vals.alpha;
        }
        values.alpha = Math.max(0, Math.min(1, (alpha === undefined ? values.alpha : alpha)));
        if (space === 'alpha') {
          return false;
        }
        var capped;
        for (i = 0; i < space.length; i++) {
          capped = Math.max(0, Math.min(maxes[space][i], values[space][i]));
          values[space][i] = Math.round(capped);
        }
        for (var sname in spaces) {
          if (sname !== space) {
            values[sname] = convert[space][sname](values[space]);
          }
        }
        return true;
      };
      Color.prototype.setSpace = function(space, args) {
        var vals = args[0];
        if (vals === undefined) {
          return this.getValues(space);
        }
        if (typeof vals === 'number') {
          vals = Array.prototype.slice.call(args);
        }
        this.setValues(space, vals);
        return this;
      };
      Color.prototype.setChannel = function(space, index, val) {
        var svalues = this.values[space];
        if (val === undefined) {
          return svalues[index];
        } else if (val === svalues[index]) {
          return this;
        }
        svalues[index] = val;
        this.setValues(space, svalues);
        return this;
      };
      if (typeof window !== 'undefined') {
        window.Color = Color;
      }
      module.exports = Color;
    }, {
      "chartjs-color-string": 1,
      "color-convert": 4
    }],
    3: [function(require, module, exports) {
      module.exports = {
        rgb2hsl: rgb2hsl,
        rgb2hsv: rgb2hsv,
        rgb2hwb: rgb2hwb,
        rgb2cmyk: rgb2cmyk,
        rgb2keyword: rgb2keyword,
        rgb2xyz: rgb2xyz,
        rgb2lab: rgb2lab,
        rgb2lch: rgb2lch,
        hsl2rgb: hsl2rgb,
        hsl2hsv: hsl2hsv,
        hsl2hwb: hsl2hwb,
        hsl2cmyk: hsl2cmyk,
        hsl2keyword: hsl2keyword,
        hsv2rgb: hsv2rgb,
        hsv2hsl: hsv2hsl,
        hsv2hwb: hsv2hwb,
        hsv2cmyk: hsv2cmyk,
        hsv2keyword: hsv2keyword,
        hwb2rgb: hwb2rgb,
        hwb2hsl: hwb2hsl,
        hwb2hsv: hwb2hsv,
        hwb2cmyk: hwb2cmyk,
        hwb2keyword: hwb2keyword,
        cmyk2rgb: cmyk2rgb,
        cmyk2hsl: cmyk2hsl,
        cmyk2hsv: cmyk2hsv,
        cmyk2hwb: cmyk2hwb,
        cmyk2keyword: cmyk2keyword,
        keyword2rgb: keyword2rgb,
        keyword2hsl: keyword2hsl,
        keyword2hsv: keyword2hsv,
        keyword2hwb: keyword2hwb,
        keyword2cmyk: keyword2cmyk,
        keyword2lab: keyword2lab,
        keyword2xyz: keyword2xyz,
        xyz2rgb: xyz2rgb,
        xyz2lab: xyz2lab,
        xyz2lch: xyz2lch,
        lab2xyz: lab2xyz,
        lab2rgb: lab2rgb,
        lab2lch: lab2lch,
        lch2lab: lch2lab,
        lch2xyz: lch2xyz,
        lch2rgb: lch2rgb
      };
      function rgb2hsl(rgb) {
        var r = rgb[0] / 255,
            g = rgb[1] / 255,
            b = rgb[2] / 255,
            min = Math.min(r, g, b),
            max = Math.max(r, g, b),
            delta = max - min,
            h,
            s,
            l;
        if (max == min)
          h = 0;
        else if (r == max)
          h = (g - b) / delta;
        else if (g == max)
          h = 2 + (b - r) / delta;
        else if (b == max)
          h = 4 + (r - g) / delta;
        h = Math.min(h * 60, 360);
        if (h < 0)
          h += 360;
        l = (min + max) / 2;
        if (max == min)
          s = 0;
        else if (l <= 0.5)
          s = delta / (max + min);
        else
          s = delta / (2 - max - min);
        return [h, s * 100, l * 100];
      }
      function rgb2hsv(rgb) {
        var r = rgb[0],
            g = rgb[1],
            b = rgb[2],
            min = Math.min(r, g, b),
            max = Math.max(r, g, b),
            delta = max - min,
            h,
            s,
            v;
        if (max == 0)
          s = 0;
        else
          s = (delta / max * 1000) / 10;
        if (max == min)
          h = 0;
        else if (r == max)
          h = (g - b) / delta;
        else if (g == max)
          h = 2 + (b - r) / delta;
        else if (b == max)
          h = 4 + (r - g) / delta;
        h = Math.min(h * 60, 360);
        if (h < 0)
          h += 360;
        v = ((max / 255) * 1000) / 10;
        return [h, s, v];
      }
      function rgb2hwb(rgb) {
        var r = rgb[0],
            g = rgb[1],
            b = rgb[2],
            h = rgb2hsl(rgb)[0],
            w = 1 / 255 * Math.min(r, Math.min(g, b)),
            b = 1 - 1 / 255 * Math.max(r, Math.max(g, b));
        return [h, w * 100, b * 100];
      }
      function rgb2cmyk(rgb) {
        var r = rgb[0] / 255,
            g = rgb[1] / 255,
            b = rgb[2] / 255,
            c,
            m,
            y,
            k;
        k = Math.min(1 - r, 1 - g, 1 - b);
        c = (1 - r - k) / (1 - k) || 0;
        m = (1 - g - k) / (1 - k) || 0;
        y = (1 - b - k) / (1 - k) || 0;
        return [c * 100, m * 100, y * 100, k * 100];
      }
      function rgb2keyword(rgb) {
        return reverseKeywords[JSON.stringify(rgb)];
      }
      function rgb2xyz(rgb) {
        var r = rgb[0] / 255,
            g = rgb[1] / 255,
            b = rgb[2] / 255;
        r = r > 0.04045 ? Math.pow(((r + 0.055) / 1.055), 2.4) : (r / 12.92);
        g = g > 0.04045 ? Math.pow(((g + 0.055) / 1.055), 2.4) : (g / 12.92);
        b = b > 0.04045 ? Math.pow(((b + 0.055) / 1.055), 2.4) : (b / 12.92);
        var x = (r * 0.4124) + (g * 0.3576) + (b * 0.1805);
        var y = (r * 0.2126) + (g * 0.7152) + (b * 0.0722);
        var z = (r * 0.0193) + (g * 0.1192) + (b * 0.9505);
        return [x * 100, y * 100, z * 100];
      }
      function rgb2lab(rgb) {
        var xyz = rgb2xyz(rgb),
            x = xyz[0],
            y = xyz[1],
            z = xyz[2],
            l,
            a,
            b;
        x /= 95.047;
        y /= 100;
        z /= 108.883;
        x = x > 0.008856 ? Math.pow(x, 1 / 3) : (7.787 * x) + (16 / 116);
        y = y > 0.008856 ? Math.pow(y, 1 / 3) : (7.787 * y) + (16 / 116);
        z = z > 0.008856 ? Math.pow(z, 1 / 3) : (7.787 * z) + (16 / 116);
        l = (116 * y) - 16;
        a = 500 * (x - y);
        b = 200 * (y - z);
        return [l, a, b];
      }
      function rgb2lch(args) {
        return lab2lch(rgb2lab(args));
      }
      function hsl2rgb(hsl) {
        var h = hsl[0] / 360,
            s = hsl[1] / 100,
            l = hsl[2] / 100,
            t1,
            t2,
            t3,
            rgb,
            val;
        if (s == 0) {
          val = l * 255;
          return [val, val, val];
        }
        if (l < 0.5)
          t2 = l * (1 + s);
        else
          t2 = l + s - l * s;
        t1 = 2 * l - t2;
        rgb = [0, 0, 0];
        for (var i = 0; i < 3; i++) {
          t3 = h + 1 / 3 * -(i - 1);
          t3 < 0 && t3++;
          t3 > 1 && t3--;
          if (6 * t3 < 1)
            val = t1 + (t2 - t1) * 6 * t3;
          else if (2 * t3 < 1)
            val = t2;
          else if (3 * t3 < 2)
            val = t1 + (t2 - t1) * (2 / 3 - t3) * 6;
          else
            val = t1;
          rgb[i] = val * 255;
        }
        return rgb;
      }
      function hsl2hsv(hsl) {
        var h = hsl[0],
            s = hsl[1] / 100,
            l = hsl[2] / 100,
            sv,
            v;
        if (l === 0) {
          return [0, 0, 0];
        }
        l *= 2;
        s *= (l <= 1) ? l : 2 - l;
        v = (l + s) / 2;
        sv = (2 * s) / (l + s);
        return [h, sv * 100, v * 100];
      }
      function hsl2hwb(args) {
        return rgb2hwb(hsl2rgb(args));
      }
      function hsl2cmyk(args) {
        return rgb2cmyk(hsl2rgb(args));
      }
      function hsl2keyword(args) {
        return rgb2keyword(hsl2rgb(args));
      }
      function hsv2rgb(hsv) {
        var h = hsv[0] / 60,
            s = hsv[1] / 100,
            v = hsv[2] / 100,
            hi = Math.floor(h) % 6;
        var f = h - Math.floor(h),
            p = 255 * v * (1 - s),
            q = 255 * v * (1 - (s * f)),
            t = 255 * v * (1 - (s * (1 - f))),
            v = 255 * v;
        switch (hi) {
          case 0:
            return [v, t, p];
          case 1:
            return [q, v, p];
          case 2:
            return [p, v, t];
          case 3:
            return [p, q, v];
          case 4:
            return [t, p, v];
          case 5:
            return [v, p, q];
        }
      }
      function hsv2hsl(hsv) {
        var h = hsv[0],
            s = hsv[1] / 100,
            v = hsv[2] / 100,
            sl,
            l;
        l = (2 - s) * v;
        sl = s * v;
        sl /= (l <= 1) ? l : 2 - l;
        sl = sl || 0;
        l /= 2;
        return [h, sl * 100, l * 100];
      }
      function hsv2hwb(args) {
        return rgb2hwb(hsv2rgb(args));
      }
      function hsv2cmyk(args) {
        return rgb2cmyk(hsv2rgb(args));
      }
      function hsv2keyword(args) {
        return rgb2keyword(hsv2rgb(args));
      }
      function hwb2rgb(hwb) {
        var h = hwb[0] / 360,
            wh = hwb[1] / 100,
            bl = hwb[2] / 100,
            ratio = wh + bl,
            i,
            v,
            f,
            n;
        if (ratio > 1) {
          wh /= ratio;
          bl /= ratio;
        }
        i = Math.floor(6 * h);
        v = 1 - bl;
        f = 6 * h - i;
        if ((i & 0x01) != 0) {
          f = 1 - f;
        }
        n = wh + f * (v - wh);
        switch (i) {
          default:
          case 6:
          case 0:
            r = v;
            g = n;
            b = wh;
            break;
          case 1:
            r = n;
            g = v;
            b = wh;
            break;
          case 2:
            r = wh;
            g = v;
            b = n;
            break;
          case 3:
            r = wh;
            g = n;
            b = v;
            break;
          case 4:
            r = n;
            g = wh;
            b = v;
            break;
          case 5:
            r = v;
            g = wh;
            b = n;
            break;
        }
        return [r * 255, g * 255, b * 255];
      }
      function hwb2hsl(args) {
        return rgb2hsl(hwb2rgb(args));
      }
      function hwb2hsv(args) {
        return rgb2hsv(hwb2rgb(args));
      }
      function hwb2cmyk(args) {
        return rgb2cmyk(hwb2rgb(args));
      }
      function hwb2keyword(args) {
        return rgb2keyword(hwb2rgb(args));
      }
      function cmyk2rgb(cmyk) {
        var c = cmyk[0] / 100,
            m = cmyk[1] / 100,
            y = cmyk[2] / 100,
            k = cmyk[3] / 100,
            r,
            g,
            b;
        r = 1 - Math.min(1, c * (1 - k) + k);
        g = 1 - Math.min(1, m * (1 - k) + k);
        b = 1 - Math.min(1, y * (1 - k) + k);
        return [r * 255, g * 255, b * 255];
      }
      function cmyk2hsl(args) {
        return rgb2hsl(cmyk2rgb(args));
      }
      function cmyk2hsv(args) {
        return rgb2hsv(cmyk2rgb(args));
      }
      function cmyk2hwb(args) {
        return rgb2hwb(cmyk2rgb(args));
      }
      function cmyk2keyword(args) {
        return rgb2keyword(cmyk2rgb(args));
      }
      function xyz2rgb(xyz) {
        var x = xyz[0] / 100,
            y = xyz[1] / 100,
            z = xyz[2] / 100,
            r,
            g,
            b;
        r = (x * 3.2406) + (y * -1.5372) + (z * -0.4986);
        g = (x * -0.9689) + (y * 1.8758) + (z * 0.0415);
        b = (x * 0.0557) + (y * -0.2040) + (z * 1.0570);
        r = r > 0.0031308 ? ((1.055 * Math.pow(r, 1.0 / 2.4)) - 0.055) : r = (r * 12.92);
        g = g > 0.0031308 ? ((1.055 * Math.pow(g, 1.0 / 2.4)) - 0.055) : g = (g * 12.92);
        b = b > 0.0031308 ? ((1.055 * Math.pow(b, 1.0 / 2.4)) - 0.055) : b = (b * 12.92);
        r = Math.min(Math.max(0, r), 1);
        g = Math.min(Math.max(0, g), 1);
        b = Math.min(Math.max(0, b), 1);
        return [r * 255, g * 255, b * 255];
      }
      function xyz2lab(xyz) {
        var x = xyz[0],
            y = xyz[1],
            z = xyz[2],
            l,
            a,
            b;
        x /= 95.047;
        y /= 100;
        z /= 108.883;
        x = x > 0.008856 ? Math.pow(x, 1 / 3) : (7.787 * x) + (16 / 116);
        y = y > 0.008856 ? Math.pow(y, 1 / 3) : (7.787 * y) + (16 / 116);
        z = z > 0.008856 ? Math.pow(z, 1 / 3) : (7.787 * z) + (16 / 116);
        l = (116 * y) - 16;
        a = 500 * (x - y);
        b = 200 * (y - z);
        return [l, a, b];
      }
      function xyz2lch(args) {
        return lab2lch(xyz2lab(args));
      }
      function lab2xyz(lab) {
        var l = lab[0],
            a = lab[1],
            b = lab[2],
            x,
            y,
            z,
            y2;
        if (l <= 8) {
          y = (l * 100) / 903.3;
          y2 = (7.787 * (y / 100)) + (16 / 116);
        } else {
          y = 100 * Math.pow((l + 16) / 116, 3);
          y2 = Math.pow(y / 100, 1 / 3);
        }
        x = x / 95.047 <= 0.008856 ? x = (95.047 * ((a / 500) + y2 - (16 / 116))) / 7.787 : 95.047 * Math.pow((a / 500) + y2, 3);
        z = z / 108.883 <= 0.008859 ? z = (108.883 * (y2 - (b / 200) - (16 / 116))) / 7.787 : 108.883 * Math.pow(y2 - (b / 200), 3);
        return [x, y, z];
      }
      function lab2lch(lab) {
        var l = lab[0],
            a = lab[1],
            b = lab[2],
            hr,
            h,
            c;
        hr = Math.atan2(b, a);
        h = hr * 360 / 2 / Math.PI;
        if (h < 0) {
          h += 360;
        }
        c = Math.sqrt(a * a + b * b);
        return [l, c, h];
      }
      function lab2rgb(args) {
        return xyz2rgb(lab2xyz(args));
      }
      function lch2lab(lch) {
        var l = lch[0],
            c = lch[1],
            h = lch[2],
            a,
            b,
            hr;
        hr = h / 360 * 2 * Math.PI;
        a = c * Math.cos(hr);
        b = c * Math.sin(hr);
        return [l, a, b];
      }
      function lch2xyz(args) {
        return lab2xyz(lch2lab(args));
      }
      function lch2rgb(args) {
        return lab2rgb(lch2lab(args));
      }
      function keyword2rgb(keyword) {
        return cssKeywords[keyword];
      }
      function keyword2hsl(args) {
        return rgb2hsl(keyword2rgb(args));
      }
      function keyword2hsv(args) {
        return rgb2hsv(keyword2rgb(args));
      }
      function keyword2hwb(args) {
        return rgb2hwb(keyword2rgb(args));
      }
      function keyword2cmyk(args) {
        return rgb2cmyk(keyword2rgb(args));
      }
      function keyword2lab(args) {
        return rgb2lab(keyword2rgb(args));
      }
      function keyword2xyz(args) {
        return rgb2xyz(keyword2rgb(args));
      }
      var cssKeywords = {
        aliceblue: [240, 248, 255],
        antiquewhite: [250, 235, 215],
        aqua: [0, 255, 255],
        aquamarine: [127, 255, 212],
        azure: [240, 255, 255],
        beige: [245, 245, 220],
        bisque: [255, 228, 196],
        black: [0, 0, 0],
        blanchedalmond: [255, 235, 205],
        blue: [0, 0, 255],
        blueviolet: [138, 43, 226],
        brown: [165, 42, 42],
        burlywood: [222, 184, 135],
        cadetblue: [95, 158, 160],
        chartreuse: [127, 255, 0],
        chocolate: [210, 105, 30],
        coral: [255, 127, 80],
        cornflowerblue: [100, 149, 237],
        cornsilk: [255, 248, 220],
        crimson: [220, 20, 60],
        cyan: [0, 255, 255],
        darkblue: [0, 0, 139],
        darkcyan: [0, 139, 139],
        darkgoldenrod: [184, 134, 11],
        darkgray: [169, 169, 169],
        darkgreen: [0, 100, 0],
        darkgrey: [169, 169, 169],
        darkkhaki: [189, 183, 107],
        darkmagenta: [139, 0, 139],
        darkolivegreen: [85, 107, 47],
        darkorange: [255, 140, 0],
        darkorchid: [153, 50, 204],
        darkred: [139, 0, 0],
        darksalmon: [233, 150, 122],
        darkseagreen: [143, 188, 143],
        darkslateblue: [72, 61, 139],
        darkslategray: [47, 79, 79],
        darkslategrey: [47, 79, 79],
        darkturquoise: [0, 206, 209],
        darkviolet: [148, 0, 211],
        deeppink: [255, 20, 147],
        deepskyblue: [0, 191, 255],
        dimgray: [105, 105, 105],
        dimgrey: [105, 105, 105],
        dodgerblue: [30, 144, 255],
        firebrick: [178, 34, 34],
        floralwhite: [255, 250, 240],
        forestgreen: [34, 139, 34],
        fuchsia: [255, 0, 255],
        gainsboro: [220, 220, 220],
        ghostwhite: [248, 248, 255],
        gold: [255, 215, 0],
        goldenrod: [218, 165, 32],
        gray: [128, 128, 128],
        green: [0, 128, 0],
        greenyellow: [173, 255, 47],
        grey: [128, 128, 128],
        honeydew: [240, 255, 240],
        hotpink: [255, 105, 180],
        indianred: [205, 92, 92],
        indigo: [75, 0, 130],
        ivory: [255, 255, 240],
        khaki: [240, 230, 140],
        lavender: [230, 230, 250],
        lavenderblush: [255, 240, 245],
        lawngreen: [124, 252, 0],
        lemonchiffon: [255, 250, 205],
        lightblue: [173, 216, 230],
        lightcoral: [240, 128, 128],
        lightcyan: [224, 255, 255],
        lightgoldenrodyellow: [250, 250, 210],
        lightgray: [211, 211, 211],
        lightgreen: [144, 238, 144],
        lightgrey: [211, 211, 211],
        lightpink: [255, 182, 193],
        lightsalmon: [255, 160, 122],
        lightseagreen: [32, 178, 170],
        lightskyblue: [135, 206, 250],
        lightslategray: [119, 136, 153],
        lightslategrey: [119, 136, 153],
        lightsteelblue: [176, 196, 222],
        lightyellow: [255, 255, 224],
        lime: [0, 255, 0],
        limegreen: [50, 205, 50],
        linen: [250, 240, 230],
        magenta: [255, 0, 255],
        maroon: [128, 0, 0],
        mediumaquamarine: [102, 205, 170],
        mediumblue: [0, 0, 205],
        mediumorchid: [186, 85, 211],
        mediumpurple: [147, 112, 219],
        mediumseagreen: [60, 179, 113],
        mediumslateblue: [123, 104, 238],
        mediumspringgreen: [0, 250, 154],
        mediumturquoise: [72, 209, 204],
        mediumvioletred: [199, 21, 133],
        midnightblue: [25, 25, 112],
        mintcream: [245, 255, 250],
        mistyrose: [255, 228, 225],
        moccasin: [255, 228, 181],
        navajowhite: [255, 222, 173],
        navy: [0, 0, 128],
        oldlace: [253, 245, 230],
        olive: [128, 128, 0],
        olivedrab: [107, 142, 35],
        orange: [255, 165, 0],
        orangered: [255, 69, 0],
        orchid: [218, 112, 214],
        palegoldenrod: [238, 232, 170],
        palegreen: [152, 251, 152],
        paleturquoise: [175, 238, 238],
        palevioletred: [219, 112, 147],
        papayawhip: [255, 239, 213],
        peachpuff: [255, 218, 185],
        peru: [205, 133, 63],
        pink: [255, 192, 203],
        plum: [221, 160, 221],
        powderblue: [176, 224, 230],
        purple: [128, 0, 128],
        rebeccapurple: [102, 51, 153],
        red: [255, 0, 0],
        rosybrown: [188, 143, 143],
        royalblue: [65, 105, 225],
        saddlebrown: [139, 69, 19],
        salmon: [250, 128, 114],
        sandybrown: [244, 164, 96],
        seagreen: [46, 139, 87],
        seashell: [255, 245, 238],
        sienna: [160, 82, 45],
        silver: [192, 192, 192],
        skyblue: [135, 206, 235],
        slateblue: [106, 90, 205],
        slategray: [112, 128, 144],
        slategrey: [112, 128, 144],
        snow: [255, 250, 250],
        springgreen: [0, 255, 127],
        steelblue: [70, 130, 180],
        tan: [210, 180, 140],
        teal: [0, 128, 128],
        thistle: [216, 191, 216],
        tomato: [255, 99, 71],
        turquoise: [64, 224, 208],
        violet: [238, 130, 238],
        wheat: [245, 222, 179],
        white: [255, 255, 255],
        whitesmoke: [245, 245, 245],
        yellow: [255, 255, 0],
        yellowgreen: [154, 205, 50]
      };
      var reverseKeywords = {};
      for (var key in cssKeywords) {
        reverseKeywords[JSON.stringify(cssKeywords[key])] = key;
      }
    }, {}],
    4: [function(require, module, exports) {
      var conversions = require('./conversions');
      var convert = function() {
        return new Converter();
      };
      for (var func in conversions) {
        convert[func + "Raw"] = (function(func) {
          return function(arg) {
            if (typeof arg == "number")
              arg = Array.prototype.slice.call(arguments);
            return conversions[func](arg);
          };
        })(func);
        var pair = /(\w+)2(\w+)/.exec(func),
            from = pair[1],
            to = pair[2];
        convert[from] = convert[from] || {};
        convert[from][to] = convert[func] = (function(func) {
          return function(arg) {
            if (typeof arg == "number")
              arg = Array.prototype.slice.call(arguments);
            var val = conversions[func](arg);
            if (typeof val == "string" || val === undefined)
              return val;
            for (var i = 0; i < val.length; i++)
              val[i] = Math.round(val[i]);
            return val;
          };
        })(func);
      }
      var Converter = function() {
        this.convs = {};
      };
      Converter.prototype.routeSpace = function(space, args) {
        var values = args[0];
        if (values === undefined) {
          return this.getValues(space);
        }
        if (typeof values == "number") {
          values = Array.prototype.slice.call(args);
        }
        return this.setValues(space, values);
      };
      Converter.prototype.setValues = function(space, values) {
        this.space = space;
        this.convs = {};
        this.convs[space] = values;
        return this;
      };
      Converter.prototype.getValues = function(space) {
        var vals = this.convs[space];
        if (!vals) {
          var fspace = this.space,
              from = this.convs[fspace];
          vals = convert[fspace][space](from);
          this.convs[space] = vals;
        }
        return vals;
      };
      ["rgb", "hsl", "hsv", "cmyk", "keyword"].forEach(function(space) {
        Converter.prototype[space] = function(vals) {
          return this.routeSpace(space, arguments);
        };
      });
      module.exports = convert;
    }, {"./conversions": 3}],
    5: [function(require, module, exports) {
      module.exports = {
        "aliceblue": [240, 248, 255],
        "antiquewhite": [250, 235, 215],
        "aqua": [0, 255, 255],
        "aquamarine": [127, 255, 212],
        "azure": [240, 255, 255],
        "beige": [245, 245, 220],
        "bisque": [255, 228, 196],
        "black": [0, 0, 0],
        "blanchedalmond": [255, 235, 205],
        "blue": [0, 0, 255],
        "blueviolet": [138, 43, 226],
        "brown": [165, 42, 42],
        "burlywood": [222, 184, 135],
        "cadetblue": [95, 158, 160],
        "chartreuse": [127, 255, 0],
        "chocolate": [210, 105, 30],
        "coral": [255, 127, 80],
        "cornflowerblue": [100, 149, 237],
        "cornsilk": [255, 248, 220],
        "crimson": [220, 20, 60],
        "cyan": [0, 255, 255],
        "darkblue": [0, 0, 139],
        "darkcyan": [0, 139, 139],
        "darkgoldenrod": [184, 134, 11],
        "darkgray": [169, 169, 169],
        "darkgreen": [0, 100, 0],
        "darkgrey": [169, 169, 169],
        "darkkhaki": [189, 183, 107],
        "darkmagenta": [139, 0, 139],
        "darkolivegreen": [85, 107, 47],
        "darkorange": [255, 140, 0],
        "darkorchid": [153, 50, 204],
        "darkred": [139, 0, 0],
        "darksalmon": [233, 150, 122],
        "darkseagreen": [143, 188, 143],
        "darkslateblue": [72, 61, 139],
        "darkslategray": [47, 79, 79],
        "darkslategrey": [47, 79, 79],
        "darkturquoise": [0, 206, 209],
        "darkviolet": [148, 0, 211],
        "deeppink": [255, 20, 147],
        "deepskyblue": [0, 191, 255],
        "dimgray": [105, 105, 105],
        "dimgrey": [105, 105, 105],
        "dodgerblue": [30, 144, 255],
        "firebrick": [178, 34, 34],
        "floralwhite": [255, 250, 240],
        "forestgreen": [34, 139, 34],
        "fuchsia": [255, 0, 255],
        "gainsboro": [220, 220, 220],
        "ghostwhite": [248, 248, 255],
        "gold": [255, 215, 0],
        "goldenrod": [218, 165, 32],
        "gray": [128, 128, 128],
        "green": [0, 128, 0],
        "greenyellow": [173, 255, 47],
        "grey": [128, 128, 128],
        "honeydew": [240, 255, 240],
        "hotpink": [255, 105, 180],
        "indianred": [205, 92, 92],
        "indigo": [75, 0, 130],
        "ivory": [255, 255, 240],
        "khaki": [240, 230, 140],
        "lavender": [230, 230, 250],
        "lavenderblush": [255, 240, 245],
        "lawngreen": [124, 252, 0],
        "lemonchiffon": [255, 250, 205],
        "lightblue": [173, 216, 230],
        "lightcoral": [240, 128, 128],
        "lightcyan": [224, 255, 255],
        "lightgoldenrodyellow": [250, 250, 210],
        "lightgray": [211, 211, 211],
        "lightgreen": [144, 238, 144],
        "lightgrey": [211, 211, 211],
        "lightpink": [255, 182, 193],
        "lightsalmon": [255, 160, 122],
        "lightseagreen": [32, 178, 170],
        "lightskyblue": [135, 206, 250],
        "lightslategray": [119, 136, 153],
        "lightslategrey": [119, 136, 153],
        "lightsteelblue": [176, 196, 222],
        "lightyellow": [255, 255, 224],
        "lime": [0, 255, 0],
        "limegreen": [50, 205, 50],
        "linen": [250, 240, 230],
        "magenta": [255, 0, 255],
        "maroon": [128, 0, 0],
        "mediumaquamarine": [102, 205, 170],
        "mediumblue": [0, 0, 205],
        "mediumorchid": [186, 85, 211],
        "mediumpurple": [147, 112, 219],
        "mediumseagreen": [60, 179, 113],
        "mediumslateblue": [123, 104, 238],
        "mediumspringgreen": [0, 250, 154],
        "mediumturquoise": [72, 209, 204],
        "mediumvioletred": [199, 21, 133],
        "midnightblue": [25, 25, 112],
        "mintcream": [245, 255, 250],
        "mistyrose": [255, 228, 225],
        "moccasin": [255, 228, 181],
        "navajowhite": [255, 222, 173],
        "navy": [0, 0, 128],
        "oldlace": [253, 245, 230],
        "olive": [128, 128, 0],
        "olivedrab": [107, 142, 35],
        "orange": [255, 165, 0],
        "orangered": [255, 69, 0],
        "orchid": [218, 112, 214],
        "palegoldenrod": [238, 232, 170],
        "palegreen": [152, 251, 152],
        "paleturquoise": [175, 238, 238],
        "palevioletred": [219, 112, 147],
        "papayawhip": [255, 239, 213],
        "peachpuff": [255, 218, 185],
        "peru": [205, 133, 63],
        "pink": [255, 192, 203],
        "plum": [221, 160, 221],
        "powderblue": [176, 224, 230],
        "purple": [128, 0, 128],
        "rebeccapurple": [102, 51, 153],
        "red": [255, 0, 0],
        "rosybrown": [188, 143, 143],
        "royalblue": [65, 105, 225],
        "saddlebrown": [139, 69, 19],
        "salmon": [250, 128, 114],
        "sandybrown": [244, 164, 96],
        "seagreen": [46, 139, 87],
        "seashell": [255, 245, 238],
        "sienna": [160, 82, 45],
        "silver": [192, 192, 192],
        "skyblue": [135, 206, 235],
        "slateblue": [106, 90, 205],
        "slategray": [112, 128, 144],
        "slategrey": [112, 128, 144],
        "snow": [255, 250, 250],
        "springgreen": [0, 255, 127],
        "steelblue": [70, 130, 180],
        "tan": [210, 180, 140],
        "teal": [0, 128, 128],
        "thistle": [216, 191, 216],
        "tomato": [255, 99, 71],
        "turquoise": [64, 224, 208],
        "violet": [238, 130, 238],
        "wheat": [245, 222, 179],
        "white": [255, 255, 255],
        "whitesmoke": [245, 245, 245],
        "yellow": [255, 255, 0],
        "yellowgreen": [154, 205, 50]
      };
    }, {}],
    6: [function(require, module, exports) {
      ;
      (function(global, factory) {
        typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() : typeof define === 'function' && define.amd ? define(factory) : global.moment = factory();
      }(this, function() {
        'use strict';
        var hookCallback;
        function utils_hooks__hooks() {
          return hookCallback.apply(null, arguments);
        }
        function setHookCallback(callback) {
          hookCallback = callback;
        }
        function isArray(input) {
          return input instanceof Array || Object.prototype.toString.call(input) === '[object Array]';
        }
        function isDate(input) {
          return input instanceof Date || Object.prototype.toString.call(input) === '[object Date]';
        }
        function map(arr, fn) {
          var res = [],
              i;
          for (i = 0; i < arr.length; ++i) {
            res.push(fn(arr[i], i));
          }
          return res;
        }
        function hasOwnProp(a, b) {
          return Object.prototype.hasOwnProperty.call(a, b);
        }
        function extend(a, b) {
          for (var i in b) {
            if (hasOwnProp(b, i)) {
              a[i] = b[i];
            }
          }
          if (hasOwnProp(b, 'toString')) {
            a.toString = b.toString;
          }
          if (hasOwnProp(b, 'valueOf')) {
            a.valueOf = b.valueOf;
          }
          return a;
        }
        function create_utc__createUTC(input, format, locale, strict) {
          return createLocalOrUTC(input, format, locale, strict, true).utc();
        }
        function defaultParsingFlags() {
          return {
            empty: false,
            unusedTokens: [],
            unusedInput: [],
            overflow: -2,
            charsLeftOver: 0,
            nullInput: false,
            invalidMonth: null,
            invalidFormat: false,
            userInvalidated: false,
            iso: false,
            parsedDateParts: [],
            meridiem: null
          };
        }
        function getParsingFlags(m) {
          if (m._pf == null) {
            m._pf = defaultParsingFlags();
          }
          return m._pf;
        }
        var some;
        if (Array.prototype.some) {
          some = Array.prototype.some;
        } else {
          some = function(fun) {
            var t = Object(this);
            var len = t.length >>> 0;
            for (var i = 0; i < len; i++) {
              if (i in t && fun.call(this, t[i], i, t)) {
                return true;
              }
            }
            return false;
          };
        }
        function valid__isValid(m) {
          if (m._isValid == null) {
            var flags = getParsingFlags(m);
            var parsedParts = some.call(flags.parsedDateParts, function(i) {
              return i != null;
            });
            m._isValid = !isNaN(m._d.getTime()) && flags.overflow < 0 && !flags.empty && !flags.invalidMonth && !flags.invalidWeekday && !flags.nullInput && !flags.invalidFormat && !flags.userInvalidated && (!flags.meridiem || (flags.meridiem && parsedParts));
            if (m._strict) {
              m._isValid = m._isValid && flags.charsLeftOver === 0 && flags.unusedTokens.length === 0 && flags.bigHour === undefined;
            }
          }
          return m._isValid;
        }
        function valid__createInvalid(flags) {
          var m = create_utc__createUTC(NaN);
          if (flags != null) {
            extend(getParsingFlags(m), flags);
          } else {
            getParsingFlags(m).userInvalidated = true;
          }
          return m;
        }
        function isUndefined(input) {
          return input === void 0;
        }
        var momentProperties = utils_hooks__hooks.momentProperties = [];
        function copyConfig(to, from) {
          var i,
              prop,
              val;
          if (!isUndefined(from._isAMomentObject)) {
            to._isAMomentObject = from._isAMomentObject;
          }
          if (!isUndefined(from._i)) {
            to._i = from._i;
          }
          if (!isUndefined(from._f)) {
            to._f = from._f;
          }
          if (!isUndefined(from._l)) {
            to._l = from._l;
          }
          if (!isUndefined(from._strict)) {
            to._strict = from._strict;
          }
          if (!isUndefined(from._tzm)) {
            to._tzm = from._tzm;
          }
          if (!isUndefined(from._isUTC)) {
            to._isUTC = from._isUTC;
          }
          if (!isUndefined(from._offset)) {
            to._offset = from._offset;
          }
          if (!isUndefined(from._pf)) {
            to._pf = getParsingFlags(from);
          }
          if (!isUndefined(from._locale)) {
            to._locale = from._locale;
          }
          if (momentProperties.length > 0) {
            for (i in momentProperties) {
              prop = momentProperties[i];
              val = from[prop];
              if (!isUndefined(val)) {
                to[prop] = val;
              }
            }
          }
          return to;
        }
        var updateInProgress = false;
        function Moment(config) {
          copyConfig(this, config);
          this._d = new Date(config._d != null ? config._d.getTime() : NaN);
          if (updateInProgress === false) {
            updateInProgress = true;
            utils_hooks__hooks.updateOffset(this);
            updateInProgress = false;
          }
        }
        function isMoment(obj) {
          return obj instanceof Moment || (obj != null && obj._isAMomentObject != null);
        }
        function absFloor(number) {
          if (number < 0) {
            return Math.ceil(number);
          } else {
            return Math.floor(number);
          }
        }
        function toInt(argumentForCoercion) {
          var coercedNumber = +argumentForCoercion,
              value = 0;
          if (coercedNumber !== 0 && isFinite(coercedNumber)) {
            value = absFloor(coercedNumber);
          }
          return value;
        }
        function compareArrays(array1, array2, dontConvert) {
          var len = Math.min(array1.length, array2.length),
              lengthDiff = Math.abs(array1.length - array2.length),
              diffs = 0,
              i;
          for (i = 0; i < len; i++) {
            if ((dontConvert && array1[i] !== array2[i]) || (!dontConvert && toInt(array1[i]) !== toInt(array2[i]))) {
              diffs++;
            }
          }
          return diffs + lengthDiff;
        }
        function warn(msg) {
          if (utils_hooks__hooks.suppressDeprecationWarnings === false && (typeof console !== 'undefined') && console.warn) {
            console.warn('Deprecation warning: ' + msg);
          }
        }
        function deprecate(msg, fn) {
          var firstTime = true;
          return extend(function() {
            if (utils_hooks__hooks.deprecationHandler != null) {
              utils_hooks__hooks.deprecationHandler(null, msg);
            }
            if (firstTime) {
              warn(msg + '\nArguments: ' + Array.prototype.slice.call(arguments).join(', ') + '\n' + (new Error()).stack);
              firstTime = false;
            }
            return fn.apply(this, arguments);
          }, fn);
        }
        var deprecations = {};
        function deprecateSimple(name, msg) {
          if (utils_hooks__hooks.deprecationHandler != null) {
            utils_hooks__hooks.deprecationHandler(name, msg);
          }
          if (!deprecations[name]) {
            warn(msg);
            deprecations[name] = true;
          }
        }
        utils_hooks__hooks.suppressDeprecationWarnings = false;
        utils_hooks__hooks.deprecationHandler = null;
        function isFunction(input) {
          return input instanceof Function || Object.prototype.toString.call(input) === '[object Function]';
        }
        function isObject(input) {
          return Object.prototype.toString.call(input) === '[object Object]';
        }
        function locale_set__set(config) {
          var prop,
              i;
          for (i in config) {
            prop = config[i];
            if (isFunction(prop)) {
              this[i] = prop;
            } else {
              this['_' + i] = prop;
            }
          }
          this._config = config;
          this._ordinalParseLenient = new RegExp(this._ordinalParse.source + '|' + (/\d{1,2}/).source);
        }
        function mergeConfigs(parentConfig, childConfig) {
          var res = extend({}, parentConfig),
              prop;
          for (prop in childConfig) {
            if (hasOwnProp(childConfig, prop)) {
              if (isObject(parentConfig[prop]) && isObject(childConfig[prop])) {
                res[prop] = {};
                extend(res[prop], parentConfig[prop]);
                extend(res[prop], childConfig[prop]);
              } else if (childConfig[prop] != null) {
                res[prop] = childConfig[prop];
              } else {
                delete res[prop];
              }
            }
          }
          return res;
        }
        function Locale(config) {
          if (config != null) {
            this.set(config);
          }
        }
        var keys;
        if (Object.keys) {
          keys = Object.keys;
        } else {
          keys = function(obj) {
            var i,
                res = [];
            for (i in obj) {
              if (hasOwnProp(obj, i)) {
                res.push(i);
              }
            }
            return res;
          };
        }
        var locales = {};
        var globalLocale;
        function normalizeLocale(key) {
          return key ? key.toLowerCase().replace('_', '-') : key;
        }
        function chooseLocale(names) {
          var i = 0,
              j,
              next,
              locale,
              split;
          while (i < names.length) {
            split = normalizeLocale(names[i]).split('-');
            j = split.length;
            next = normalizeLocale(names[i + 1]);
            next = next ? next.split('-') : null;
            while (j > 0) {
              locale = loadLocale(split.slice(0, j).join('-'));
              if (locale) {
                return locale;
              }
              if (next && next.length >= j && compareArrays(split, next, true) >= j - 1) {
                break;
              }
              j--;
            }
            i++;
          }
          return null;
        }
        function loadLocale(name) {
          var oldLocale = null;
          if (!locales[name] && (typeof module !== 'undefined') && module && module.exports) {
            try {
              oldLocale = globalLocale._abbr;
              require('./locale/' + name);
              locale_locales__getSetGlobalLocale(oldLocale);
            } catch (e) {}
          }
          return locales[name];
        }
        function locale_locales__getSetGlobalLocale(key, values) {
          var data;
          if (key) {
            if (isUndefined(values)) {
              data = locale_locales__getLocale(key);
            } else {
              data = defineLocale(key, values);
            }
            if (data) {
              globalLocale = data;
            }
          }
          return globalLocale._abbr;
        }
        function defineLocale(name, config) {
          if (config !== null) {
            config.abbr = name;
            if (locales[name] != null) {
              deprecateSimple('defineLocaleOverride', 'use moment.updateLocale(localeName, config) to change ' + 'an existing locale. moment.defineLocale(localeName, ' + 'config) should only be used for creating a new locale');
              config = mergeConfigs(locales[name]._config, config);
            } else if (config.parentLocale != null) {
              if (locales[config.parentLocale] != null) {
                config = mergeConfigs(locales[config.parentLocale]._config, config);
              } else {
                deprecateSimple('parentLocaleUndefined', 'specified parentLocale is not defined yet');
              }
            }
            locales[name] = new Locale(config);
            locale_locales__getSetGlobalLocale(name);
            return locales[name];
          } else {
            delete locales[name];
            return null;
          }
        }
        function updateLocale(name, config) {
          if (config != null) {
            var locale;
            if (locales[name] != null) {
              config = mergeConfigs(locales[name]._config, config);
            }
            locale = new Locale(config);
            locale.parentLocale = locales[name];
            locales[name] = locale;
            locale_locales__getSetGlobalLocale(name);
          } else {
            if (locales[name] != null) {
              if (locales[name].parentLocale != null) {
                locales[name] = locales[name].parentLocale;
              } else if (locales[name] != null) {
                delete locales[name];
              }
            }
          }
          return locales[name];
        }
        function locale_locales__getLocale(key) {
          var locale;
          if (key && key._locale && key._locale._abbr) {
            key = key._locale._abbr;
          }
          if (!key) {
            return globalLocale;
          }
          if (!isArray(key)) {
            locale = loadLocale(key);
            if (locale) {
              return locale;
            }
            key = [key];
          }
          return chooseLocale(key);
        }
        function locale_locales__listLocales() {
          return keys(locales);
        }
        var aliases = {};
        function addUnitAlias(unit, shorthand) {
          var lowerCase = unit.toLowerCase();
          aliases[lowerCase] = aliases[lowerCase + 's'] = aliases[shorthand] = unit;
        }
        function normalizeUnits(units) {
          return typeof units === 'string' ? aliases[units] || aliases[units.toLowerCase()] : undefined;
        }
        function normalizeObjectUnits(inputObject) {
          var normalizedInput = {},
              normalizedProp,
              prop;
          for (prop in inputObject) {
            if (hasOwnProp(inputObject, prop)) {
              normalizedProp = normalizeUnits(prop);
              if (normalizedProp) {
                normalizedInput[normalizedProp] = inputObject[prop];
              }
            }
          }
          return normalizedInput;
        }
        function makeGetSet(unit, keepTime) {
          return function(value) {
            if (value != null) {
              get_set__set(this, unit, value);
              utils_hooks__hooks.updateOffset(this, keepTime);
              return this;
            } else {
              return get_set__get(this, unit);
            }
          };
        }
        function get_set__get(mom, unit) {
          return mom.isValid() ? mom._d['get' + (mom._isUTC ? 'UTC' : '') + unit]() : NaN;
        }
        function get_set__set(mom, unit, value) {
          if (mom.isValid()) {
            mom._d['set' + (mom._isUTC ? 'UTC' : '') + unit](value);
          }
        }
        function getSet(units, value) {
          var unit;
          if (typeof units === 'object') {
            for (unit in units) {
              this.set(unit, units[unit]);
            }
          } else {
            units = normalizeUnits(units);
            if (isFunction(this[units])) {
              return this[units](value);
            }
          }
          return this;
        }
        function zeroFill(number, targetLength, forceSign) {
          var absNumber = '' + Math.abs(number),
              zerosToFill = targetLength - absNumber.length,
              sign = number >= 0;
          return (sign ? (forceSign ? '+' : '') : '-') + Math.pow(10, Math.max(0, zerosToFill)).toString().substr(1) + absNumber;
        }
        var formattingTokens = /(\[[^\[]*\])|(\\)?([Hh]mm(ss)?|Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|Qo?|YYYYYY|YYYYY|YYYY|YY|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|kk?|mm?|ss?|S{1,9}|x|X|zz?|ZZ?|.)/g;
        var localFormattingTokens = /(\[[^\[]*\])|(\\)?(LTS|LT|LL?L?L?|l{1,4})/g;
        var formatFunctions = {};
        var formatTokenFunctions = {};
        function addFormatToken(token, padded, ordinal, callback) {
          var func = callback;
          if (typeof callback === 'string') {
            func = function() {
              return this[callback]();
            };
          }
          if (token) {
            formatTokenFunctions[token] = func;
          }
          if (padded) {
            formatTokenFunctions[padded[0]] = function() {
              return zeroFill(func.apply(this, arguments), padded[1], padded[2]);
            };
          }
          if (ordinal) {
            formatTokenFunctions[ordinal] = function() {
              return this.localeData().ordinal(func.apply(this, arguments), token);
            };
          }
        }
        function removeFormattingTokens(input) {
          if (input.match(/\[[\s\S]/)) {
            return input.replace(/^\[|\]$/g, '');
          }
          return input.replace(/\\/g, '');
        }
        function makeFormatFunction(format) {
          var array = format.match(formattingTokens),
              i,
              length;
          for (i = 0, length = array.length; i < length; i++) {
            if (formatTokenFunctions[array[i]]) {
              array[i] = formatTokenFunctions[array[i]];
            } else {
              array[i] = removeFormattingTokens(array[i]);
            }
          }
          return function(mom) {
            var output = '',
                i;
            for (i = 0; i < length; i++) {
              output += array[i] instanceof Function ? array[i].call(mom, format) : array[i];
            }
            return output;
          };
        }
        function formatMoment(m, format) {
          if (!m.isValid()) {
            return m.localeData().invalidDate();
          }
          format = expandFormat(format, m.localeData());
          formatFunctions[format] = formatFunctions[format] || makeFormatFunction(format);
          return formatFunctions[format](m);
        }
        function expandFormat(format, locale) {
          var i = 5;
          function replaceLongDateFormatTokens(input) {
            return locale.longDateFormat(input) || input;
          }
          localFormattingTokens.lastIndex = 0;
          while (i >= 0 && localFormattingTokens.test(format)) {
            format = format.replace(localFormattingTokens, replaceLongDateFormatTokens);
            localFormattingTokens.lastIndex = 0;
            i -= 1;
          }
          return format;
        }
        var match1 = /\d/;
        var match2 = /\d\d/;
        var match3 = /\d{3}/;
        var match4 = /\d{4}/;
        var match6 = /[+-]?\d{6}/;
        var match1to2 = /\d\d?/;
        var match3to4 = /\d\d\d\d?/;
        var match5to6 = /\d\d\d\d\d\d?/;
        var match1to3 = /\d{1,3}/;
        var match1to4 = /\d{1,4}/;
        var match1to6 = /[+-]?\d{1,6}/;
        var matchUnsigned = /\d+/;
        var matchSigned = /[+-]?\d+/;
        var matchOffset = /Z|[+-]\d\d:?\d\d/gi;
        var matchShortOffset = /Z|[+-]\d\d(?::?\d\d)?/gi;
        var matchTimestamp = /[+-]?\d+(\.\d{1,3})?/;
        var matchWord = /[0-9]*['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+|[\u0600-\u06FF\/]+(\s*?[\u0600-\u06FF]+){1,2}/i;
        var regexes = {};
        function addRegexToken(token, regex, strictRegex) {
          regexes[token] = isFunction(regex) ? regex : function(isStrict, localeData) {
            return (isStrict && strictRegex) ? strictRegex : regex;
          };
        }
        function getParseRegexForToken(token, config) {
          if (!hasOwnProp(regexes, token)) {
            return new RegExp(unescapeFormat(token));
          }
          return regexes[token](config._strict, config._locale);
        }
        function unescapeFormat(s) {
          return regexEscape(s.replace('\\', '').replace(/\\(\[)|\\(\])|\[([^\]\[]*)\]|\\(.)/g, function(matched, p1, p2, p3, p4) {
            return p1 || p2 || p3 || p4;
          }));
        }
        function regexEscape(s) {
          return s.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
        }
        var tokens = {};
        function addParseToken(token, callback) {
          var i,
              func = callback;
          if (typeof token === 'string') {
            token = [token];
          }
          if (typeof callback === 'number') {
            func = function(input, array) {
              array[callback] = toInt(input);
            };
          }
          for (i = 0; i < token.length; i++) {
            tokens[token[i]] = func;
          }
        }
        function addWeekParseToken(token, callback) {
          addParseToken(token, function(input, array, config, token) {
            config._w = config._w || {};
            callback(input, config._w, config, token);
          });
        }
        function addTimeToArrayFromToken(token, input, config) {
          if (input != null && hasOwnProp(tokens, token)) {
            tokens[token](input, config._a, config, token);
          }
        }
        var YEAR = 0;
        var MONTH = 1;
        var DATE = 2;
        var HOUR = 3;
        var MINUTE = 4;
        var SECOND = 5;
        var MILLISECOND = 6;
        var WEEK = 7;
        var WEEKDAY = 8;
        var indexOf;
        if (Array.prototype.indexOf) {
          indexOf = Array.prototype.indexOf;
        } else {
          indexOf = function(o) {
            var i;
            for (i = 0; i < this.length; ++i) {
              if (this[i] === o) {
                return i;
              }
            }
            return -1;
          };
        }
        function daysInMonth(year, month) {
          return new Date(Date.UTC(year, month + 1, 0)).getUTCDate();
        }
        addFormatToken('M', ['MM', 2], 'Mo', function() {
          return this.month() + 1;
        });
        addFormatToken('MMM', 0, 0, function(format) {
          return this.localeData().monthsShort(this, format);
        });
        addFormatToken('MMMM', 0, 0, function(format) {
          return this.localeData().months(this, format);
        });
        addUnitAlias('month', 'M');
        addRegexToken('M', match1to2);
        addRegexToken('MM', match1to2, match2);
        addRegexToken('MMM', function(isStrict, locale) {
          return locale.monthsShortRegex(isStrict);
        });
        addRegexToken('MMMM', function(isStrict, locale) {
          return locale.monthsRegex(isStrict);
        });
        addParseToken(['M', 'MM'], function(input, array) {
          array[MONTH] = toInt(input) - 1;
        });
        addParseToken(['MMM', 'MMMM'], function(input, array, config, token) {
          var month = config._locale.monthsParse(input, token, config._strict);
          if (month != null) {
            array[MONTH] = month;
          } else {
            getParsingFlags(config).invalidMonth = input;
          }
        });
        var MONTHS_IN_FORMAT = /D[oD]?(\[[^\[\]]*\]|\s+)+MMMM?/;
        var defaultLocaleMonths = 'January_February_March_April_May_June_July_August_September_October_November_December'.split('_');
        function localeMonths(m, format) {
          return isArray(this._months) ? this._months[m.month()] : this._months[MONTHS_IN_FORMAT.test(format) ? 'format' : 'standalone'][m.month()];
        }
        var defaultLocaleMonthsShort = 'Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec'.split('_');
        function localeMonthsShort(m, format) {
          return isArray(this._monthsShort) ? this._monthsShort[m.month()] : this._monthsShort[MONTHS_IN_FORMAT.test(format) ? 'format' : 'standalone'][m.month()];
        }
        function units_month__handleStrictParse(monthName, format, strict) {
          var i,
              ii,
              mom,
              llc = monthName.toLocaleLowerCase();
          if (!this._monthsParse) {
            this._monthsParse = [];
            this._longMonthsParse = [];
            this._shortMonthsParse = [];
            for (i = 0; i < 12; ++i) {
              mom = create_utc__createUTC([2000, i]);
              this._shortMonthsParse[i] = this.monthsShort(mom, '').toLocaleLowerCase();
              this._longMonthsParse[i] = this.months(mom, '').toLocaleLowerCase();
            }
          }
          if (strict) {
            if (format === 'MMM') {
              ii = indexOf.call(this._shortMonthsParse, llc);
              return ii !== -1 ? ii : null;
            } else {
              ii = indexOf.call(this._longMonthsParse, llc);
              return ii !== -1 ? ii : null;
            }
          } else {
            if (format === 'MMM') {
              ii = indexOf.call(this._shortMonthsParse, llc);
              if (ii !== -1) {
                return ii;
              }
              ii = indexOf.call(this._longMonthsParse, llc);
              return ii !== -1 ? ii : null;
            } else {
              ii = indexOf.call(this._longMonthsParse, llc);
              if (ii !== -1) {
                return ii;
              }
              ii = indexOf.call(this._shortMonthsParse, llc);
              return ii !== -1 ? ii : null;
            }
          }
        }
        function localeMonthsParse(monthName, format, strict) {
          var i,
              mom,
              regex;
          if (this._monthsParseExact) {
            return units_month__handleStrictParse.call(this, monthName, format, strict);
          }
          if (!this._monthsParse) {
            this._monthsParse = [];
            this._longMonthsParse = [];
            this._shortMonthsParse = [];
          }
          for (i = 0; i < 12; i++) {
            mom = create_utc__createUTC([2000, i]);
            if (strict && !this._longMonthsParse[i]) {
              this._longMonthsParse[i] = new RegExp('^' + this.months(mom, '').replace('.', '') + '$', 'i');
              this._shortMonthsParse[i] = new RegExp('^' + this.monthsShort(mom, '').replace('.', '') + '$', 'i');
            }
            if (!strict && !this._monthsParse[i]) {
              regex = '^' + this.months(mom, '') + '|^' + this.monthsShort(mom, '');
              this._monthsParse[i] = new RegExp(regex.replace('.', ''), 'i');
            }
            if (strict && format === 'MMMM' && this._longMonthsParse[i].test(monthName)) {
              return i;
            } else if (strict && format === 'MMM' && this._shortMonthsParse[i].test(monthName)) {
              return i;
            } else if (!strict && this._monthsParse[i].test(monthName)) {
              return i;
            }
          }
        }
        function setMonth(mom, value) {
          var dayOfMonth;
          if (!mom.isValid()) {
            return mom;
          }
          if (typeof value === 'string') {
            if (/^\d+$/.test(value)) {
              value = toInt(value);
            } else {
              value = mom.localeData().monthsParse(value);
              if (typeof value !== 'number') {
                return mom;
              }
            }
          }
          dayOfMonth = Math.min(mom.date(), daysInMonth(mom.year(), value));
          mom._d['set' + (mom._isUTC ? 'UTC' : '') + 'Month'](value, dayOfMonth);
          return mom;
        }
        function getSetMonth(value) {
          if (value != null) {
            setMonth(this, value);
            utils_hooks__hooks.updateOffset(this, true);
            return this;
          } else {
            return get_set__get(this, 'Month');
          }
        }
        function getDaysInMonth() {
          return daysInMonth(this.year(), this.month());
        }
        var defaultMonthsShortRegex = matchWord;
        function monthsShortRegex(isStrict) {
          if (this._monthsParseExact) {
            if (!hasOwnProp(this, '_monthsRegex')) {
              computeMonthsParse.call(this);
            }
            if (isStrict) {
              return this._monthsShortStrictRegex;
            } else {
              return this._monthsShortRegex;
            }
          } else {
            return this._monthsShortStrictRegex && isStrict ? this._monthsShortStrictRegex : this._monthsShortRegex;
          }
        }
        var defaultMonthsRegex = matchWord;
        function monthsRegex(isStrict) {
          if (this._monthsParseExact) {
            if (!hasOwnProp(this, '_monthsRegex')) {
              computeMonthsParse.call(this);
            }
            if (isStrict) {
              return this._monthsStrictRegex;
            } else {
              return this._monthsRegex;
            }
          } else {
            return this._monthsStrictRegex && isStrict ? this._monthsStrictRegex : this._monthsRegex;
          }
        }
        function computeMonthsParse() {
          function cmpLenRev(a, b) {
            return b.length - a.length;
          }
          var shortPieces = [],
              longPieces = [],
              mixedPieces = [],
              i,
              mom;
          for (i = 0; i < 12; i++) {
            mom = create_utc__createUTC([2000, i]);
            shortPieces.push(this.monthsShort(mom, ''));
            longPieces.push(this.months(mom, ''));
            mixedPieces.push(this.months(mom, ''));
            mixedPieces.push(this.monthsShort(mom, ''));
          }
          shortPieces.sort(cmpLenRev);
          longPieces.sort(cmpLenRev);
          mixedPieces.sort(cmpLenRev);
          for (i = 0; i < 12; i++) {
            shortPieces[i] = regexEscape(shortPieces[i]);
            longPieces[i] = regexEscape(longPieces[i]);
            mixedPieces[i] = regexEscape(mixedPieces[i]);
          }
          this._monthsRegex = new RegExp('^(' + mixedPieces.join('|') + ')', 'i');
          this._monthsShortRegex = this._monthsRegex;
          this._monthsStrictRegex = new RegExp('^(' + longPieces.join('|') + ')', 'i');
          this._monthsShortStrictRegex = new RegExp('^(' + shortPieces.join('|') + ')', 'i');
        }
        function checkOverflow(m) {
          var overflow;
          var a = m._a;
          if (a && getParsingFlags(m).overflow === -2) {
            overflow = a[MONTH] < 0 || a[MONTH] > 11 ? MONTH : a[DATE] < 1 || a[DATE] > daysInMonth(a[YEAR], a[MONTH]) ? DATE : a[HOUR] < 0 || a[HOUR] > 24 || (a[HOUR] === 24 && (a[MINUTE] !== 0 || a[SECOND] !== 0 || a[MILLISECOND] !== 0)) ? HOUR : a[MINUTE] < 0 || a[MINUTE] > 59 ? MINUTE : a[SECOND] < 0 || a[SECOND] > 59 ? SECOND : a[MILLISECOND] < 0 || a[MILLISECOND] > 999 ? MILLISECOND : -1;
            if (getParsingFlags(m)._overflowDayOfYear && (overflow < YEAR || overflow > DATE)) {
              overflow = DATE;
            }
            if (getParsingFlags(m)._overflowWeeks && overflow === -1) {
              overflow = WEEK;
            }
            if (getParsingFlags(m)._overflowWeekday && overflow === -1) {
              overflow = WEEKDAY;
            }
            getParsingFlags(m).overflow = overflow;
          }
          return m;
        }
        var extendedIsoRegex = /^\s*((?:[+-]\d{6}|\d{4})-(?:\d\d-\d\d|W\d\d-\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?::\d\d(?::\d\d(?:[.,]\d+)?)?)?)([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?/;
        var basicIsoRegex = /^\s*((?:[+-]\d{6}|\d{4})(?:\d\d\d\d|W\d\d\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?:\d\d(?:\d\d(?:[.,]\d+)?)?)?)([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?/;
        var tzRegex = /Z|[+-]\d\d(?::?\d\d)?/;
        var isoDates = [['YYYYYY-MM-DD', /[+-]\d{6}-\d\d-\d\d/], ['YYYY-MM-DD', /\d{4}-\d\d-\d\d/], ['GGGG-[W]WW-E', /\d{4}-W\d\d-\d/], ['GGGG-[W]WW', /\d{4}-W\d\d/, false], ['YYYY-DDD', /\d{4}-\d{3}/], ['YYYY-MM', /\d{4}-\d\d/, false], ['YYYYYYMMDD', /[+-]\d{10}/], ['YYYYMMDD', /\d{8}/], ['GGGG[W]WWE', /\d{4}W\d{3}/], ['GGGG[W]WW', /\d{4}W\d{2}/, false], ['YYYYDDD', /\d{7}/]];
        var isoTimes = [['HH:mm:ss.SSSS', /\d\d:\d\d:\d\d\.\d+/], ['HH:mm:ss,SSSS', /\d\d:\d\d:\d\d,\d+/], ['HH:mm:ss', /\d\d:\d\d:\d\d/], ['HH:mm', /\d\d:\d\d/], ['HHmmss.SSSS', /\d\d\d\d\d\d\.\d+/], ['HHmmss,SSSS', /\d\d\d\d\d\d,\d+/], ['HHmmss', /\d\d\d\d\d\d/], ['HHmm', /\d\d\d\d/], ['HH', /\d\d/]];
        var aspNetJsonRegex = /^\/?Date\((\-?\d+)/i;
        function configFromISO(config) {
          var i,
              l,
              string = config._i,
              match = extendedIsoRegex.exec(string) || basicIsoRegex.exec(string),
              allowTime,
              dateFormat,
              timeFormat,
              tzFormat;
          if (match) {
            getParsingFlags(config).iso = true;
            for (i = 0, l = isoDates.length; i < l; i++) {
              if (isoDates[i][1].exec(match[1])) {
                dateFormat = isoDates[i][0];
                allowTime = isoDates[i][2] !== false;
                break;
              }
            }
            if (dateFormat == null) {
              config._isValid = false;
              return;
            }
            if (match[3]) {
              for (i = 0, l = isoTimes.length; i < l; i++) {
                if (isoTimes[i][1].exec(match[3])) {
                  timeFormat = (match[2] || ' ') + isoTimes[i][0];
                  break;
                }
              }
              if (timeFormat == null) {
                config._isValid = false;
                return;
              }
            }
            if (!allowTime && timeFormat != null) {
              config._isValid = false;
              return;
            }
            if (match[4]) {
              if (tzRegex.exec(match[4])) {
                tzFormat = 'Z';
              } else {
                config._isValid = false;
                return;
              }
            }
            config._f = dateFormat + (timeFormat || '') + (tzFormat || '');
            configFromStringAndFormat(config);
          } else {
            config._isValid = false;
          }
        }
        function configFromString(config) {
          var matched = aspNetJsonRegex.exec(config._i);
          if (matched !== null) {
            config._d = new Date(+matched[1]);
            return;
          }
          configFromISO(config);
          if (config._isValid === false) {
            delete config._isValid;
            utils_hooks__hooks.createFromInputFallback(config);
          }
        }
        utils_hooks__hooks.createFromInputFallback = deprecate('moment construction falls back to js Date. This is ' + 'discouraged and will be removed in upcoming major ' + 'release. Please refer to ' + 'https://github.com/moment/moment/issues/1407 for more info.', function(config) {
          config._d = new Date(config._i + (config._useUTC ? ' UTC' : ''));
        });
        function createDate(y, m, d, h, M, s, ms) {
          var date = new Date(y, m, d, h, M, s, ms);
          if (y < 100 && y >= 0 && isFinite(date.getFullYear())) {
            date.setFullYear(y);
          }
          return date;
        }
        function createUTCDate(y) {
          var date = new Date(Date.UTC.apply(null, arguments));
          if (y < 100 && y >= 0 && isFinite(date.getUTCFullYear())) {
            date.setUTCFullYear(y);
          }
          return date;
        }
        addFormatToken('Y', 0, 0, function() {
          var y = this.year();
          return y <= 9999 ? '' + y : '+' + y;
        });
        addFormatToken(0, ['YY', 2], 0, function() {
          return this.year() % 100;
        });
        addFormatToken(0, ['YYYY', 4], 0, 'year');
        addFormatToken(0, ['YYYYY', 5], 0, 'year');
        addFormatToken(0, ['YYYYYY', 6, true], 0, 'year');
        addUnitAlias('year', 'y');
        addRegexToken('Y', matchSigned);
        addRegexToken('YY', match1to2, match2);
        addRegexToken('YYYY', match1to4, match4);
        addRegexToken('YYYYY', match1to6, match6);
        addRegexToken('YYYYYY', match1to6, match6);
        addParseToken(['YYYYY', 'YYYYYY'], YEAR);
        addParseToken('YYYY', function(input, array) {
          array[YEAR] = input.length === 2 ? utils_hooks__hooks.parseTwoDigitYear(input) : toInt(input);
        });
        addParseToken('YY', function(input, array) {
          array[YEAR] = utils_hooks__hooks.parseTwoDigitYear(input);
        });
        addParseToken('Y', function(input, array) {
          array[YEAR] = parseInt(input, 10);
        });
        function daysInYear(year) {
          return isLeapYear(year) ? 366 : 365;
        }
        function isLeapYear(year) {
          return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
        }
        utils_hooks__hooks.parseTwoDigitYear = function(input) {
          return toInt(input) + (toInt(input) > 68 ? 1900 : 2000);
        };
        var getSetYear = makeGetSet('FullYear', true);
        function getIsLeapYear() {
          return isLeapYear(this.year());
        }
        function firstWeekOffset(year, dow, doy) {
          var fwd = 7 + dow - doy,
              fwdlw = (7 + createUTCDate(year, 0, fwd).getUTCDay() - dow) % 7;
          return -fwdlw + fwd - 1;
        }
        function dayOfYearFromWeeks(year, week, weekday, dow, doy) {
          var localWeekday = (7 + weekday - dow) % 7,
              weekOffset = firstWeekOffset(year, dow, doy),
              dayOfYear = 1 + 7 * (week - 1) + localWeekday + weekOffset,
              resYear,
              resDayOfYear;
          if (dayOfYear <= 0) {
            resYear = year - 1;
            resDayOfYear = daysInYear(resYear) + dayOfYear;
          } else if (dayOfYear > daysInYear(year)) {
            resYear = year + 1;
            resDayOfYear = dayOfYear - daysInYear(year);
          } else {
            resYear = year;
            resDayOfYear = dayOfYear;
          }
          return {
            year: resYear,
            dayOfYear: resDayOfYear
          };
        }
        function weekOfYear(mom, dow, doy) {
          var weekOffset = firstWeekOffset(mom.year(), dow, doy),
              week = Math.floor((mom.dayOfYear() - weekOffset - 1) / 7) + 1,
              resWeek,
              resYear;
          if (week < 1) {
            resYear = mom.year() - 1;
            resWeek = week + weeksInYear(resYear, dow, doy);
          } else if (week > weeksInYear(mom.year(), dow, doy)) {
            resWeek = week - weeksInYear(mom.year(), dow, doy);
            resYear = mom.year() + 1;
          } else {
            resYear = mom.year();
            resWeek = week;
          }
          return {
            week: resWeek,
            year: resYear
          };
        }
        function weeksInYear(year, dow, doy) {
          var weekOffset = firstWeekOffset(year, dow, doy),
              weekOffsetNext = firstWeekOffset(year + 1, dow, doy);
          return (daysInYear(year) - weekOffset + weekOffsetNext) / 7;
        }
        function defaults(a, b, c) {
          if (a != null) {
            return a;
          }
          if (b != null) {
            return b;
          }
          return c;
        }
        function currentDateArray(config) {
          var nowValue = new Date(utils_hooks__hooks.now());
          if (config._useUTC) {
            return [nowValue.getUTCFullYear(), nowValue.getUTCMonth(), nowValue.getUTCDate()];
          }
          return [nowValue.getFullYear(), nowValue.getMonth(), nowValue.getDate()];
        }
        function configFromArray(config) {
          var i,
              date,
              input = [],
              currentDate,
              yearToUse;
          if (config._d) {
            return;
          }
          currentDate = currentDateArray(config);
          if (config._w && config._a[DATE] == null && config._a[MONTH] == null) {
            dayOfYearFromWeekInfo(config);
          }
          if (config._dayOfYear) {
            yearToUse = defaults(config._a[YEAR], currentDate[YEAR]);
            if (config._dayOfYear > daysInYear(yearToUse)) {
              getParsingFlags(config)._overflowDayOfYear = true;
            }
            date = createUTCDate(yearToUse, 0, config._dayOfYear);
            config._a[MONTH] = date.getUTCMonth();
            config._a[DATE] = date.getUTCDate();
          }
          for (i = 0; i < 3 && config._a[i] == null; ++i) {
            config._a[i] = input[i] = currentDate[i];
          }
          for (; i < 7; i++) {
            config._a[i] = input[i] = (config._a[i] == null) ? (i === 2 ? 1 : 0) : config._a[i];
          }
          if (config._a[HOUR] === 24 && config._a[MINUTE] === 0 && config._a[SECOND] === 0 && config._a[MILLISECOND] === 0) {
            config._nextDay = true;
            config._a[HOUR] = 0;
          }
          config._d = (config._useUTC ? createUTCDate : createDate).apply(null, input);
          if (config._tzm != null) {
            config._d.setUTCMinutes(config._d.getUTCMinutes() - config._tzm);
          }
          if (config._nextDay) {
            config._a[HOUR] = 24;
          }
        }
        function dayOfYearFromWeekInfo(config) {
          var w,
              weekYear,
              week,
              weekday,
              dow,
              doy,
              temp,
              weekdayOverflow;
          w = config._w;
          if (w.GG != null || w.W != null || w.E != null) {
            dow = 1;
            doy = 4;
            weekYear = defaults(w.GG, config._a[YEAR], weekOfYear(local__createLocal(), 1, 4).year);
            week = defaults(w.W, 1);
            weekday = defaults(w.E, 1);
            if (weekday < 1 || weekday > 7) {
              weekdayOverflow = true;
            }
          } else {
            dow = config._locale._week.dow;
            doy = config._locale._week.doy;
            weekYear = defaults(w.gg, config._a[YEAR], weekOfYear(local__createLocal(), dow, doy).year);
            week = defaults(w.w, 1);
            if (w.d != null) {
              weekday = w.d;
              if (weekday < 0 || weekday > 6) {
                weekdayOverflow = true;
              }
            } else if (w.e != null) {
              weekday = w.e + dow;
              if (w.e < 0 || w.e > 6) {
                weekdayOverflow = true;
              }
            } else {
              weekday = dow;
            }
          }
          if (week < 1 || week > weeksInYear(weekYear, dow, doy)) {
            getParsingFlags(config)._overflowWeeks = true;
          } else if (weekdayOverflow != null) {
            getParsingFlags(config)._overflowWeekday = true;
          } else {
            temp = dayOfYearFromWeeks(weekYear, week, weekday, dow, doy);
            config._a[YEAR] = temp.year;
            config._dayOfYear = temp.dayOfYear;
          }
        }
        utils_hooks__hooks.ISO_8601 = function() {};
        function configFromStringAndFormat(config) {
          if (config._f === utils_hooks__hooks.ISO_8601) {
            configFromISO(config);
            return;
          }
          config._a = [];
          getParsingFlags(config).empty = true;
          var string = '' + config._i,
              i,
              parsedInput,
              tokens,
              token,
              skipped,
              stringLength = string.length,
              totalParsedInputLength = 0;
          tokens = expandFormat(config._f, config._locale).match(formattingTokens) || [];
          for (i = 0; i < tokens.length; i++) {
            token = tokens[i];
            parsedInput = (string.match(getParseRegexForToken(token, config)) || [])[0];
            if (parsedInput) {
              skipped = string.substr(0, string.indexOf(parsedInput));
              if (skipped.length > 0) {
                getParsingFlags(config).unusedInput.push(skipped);
              }
              string = string.slice(string.indexOf(parsedInput) + parsedInput.length);
              totalParsedInputLength += parsedInput.length;
            }
            if (formatTokenFunctions[token]) {
              if (parsedInput) {
                getParsingFlags(config).empty = false;
              } else {
                getParsingFlags(config).unusedTokens.push(token);
              }
              addTimeToArrayFromToken(token, parsedInput, config);
            } else if (config._strict && !parsedInput) {
              getParsingFlags(config).unusedTokens.push(token);
            }
          }
          getParsingFlags(config).charsLeftOver = stringLength - totalParsedInputLength;
          if (string.length > 0) {
            getParsingFlags(config).unusedInput.push(string);
          }
          if (getParsingFlags(config).bigHour === true && config._a[HOUR] <= 12 && config._a[HOUR] > 0) {
            getParsingFlags(config).bigHour = undefined;
          }
          getParsingFlags(config).parsedDateParts = config._a.slice(0);
          getParsingFlags(config).meridiem = config._meridiem;
          config._a[HOUR] = meridiemFixWrap(config._locale, config._a[HOUR], config._meridiem);
          configFromArray(config);
          checkOverflow(config);
        }
        function meridiemFixWrap(locale, hour, meridiem) {
          var isPm;
          if (meridiem == null) {
            return hour;
          }
          if (locale.meridiemHour != null) {
            return locale.meridiemHour(hour, meridiem);
          } else if (locale.isPM != null) {
            isPm = locale.isPM(meridiem);
            if (isPm && hour < 12) {
              hour += 12;
            }
            if (!isPm && hour === 12) {
              hour = 0;
            }
            return hour;
          } else {
            return hour;
          }
        }
        function configFromStringAndArray(config) {
          var tempConfig,
              bestMoment,
              scoreToBeat,
              i,
              currentScore;
          if (config._f.length === 0) {
            getParsingFlags(config).invalidFormat = true;
            config._d = new Date(NaN);
            return;
          }
          for (i = 0; i < config._f.length; i++) {
            currentScore = 0;
            tempConfig = copyConfig({}, config);
            if (config._useUTC != null) {
              tempConfig._useUTC = config._useUTC;
            }
            tempConfig._f = config._f[i];
            configFromStringAndFormat(tempConfig);
            if (!valid__isValid(tempConfig)) {
              continue;
            }
            currentScore += getParsingFlags(tempConfig).charsLeftOver;
            currentScore += getParsingFlags(tempConfig).unusedTokens.length * 10;
            getParsingFlags(tempConfig).score = currentScore;
            if (scoreToBeat == null || currentScore < scoreToBeat) {
              scoreToBeat = currentScore;
              bestMoment = tempConfig;
            }
          }
          extend(config, bestMoment || tempConfig);
        }
        function configFromObject(config) {
          if (config._d) {
            return;
          }
          var i = normalizeObjectUnits(config._i);
          config._a = map([i.year, i.month, i.day || i.date, i.hour, i.minute, i.second, i.millisecond], function(obj) {
            return obj && parseInt(obj, 10);
          });
          configFromArray(config);
        }
        function createFromConfig(config) {
          var res = new Moment(checkOverflow(prepareConfig(config)));
          if (res._nextDay) {
            res.add(1, 'd');
            res._nextDay = undefined;
          }
          return res;
        }
        function prepareConfig(config) {
          var input = config._i,
              format = config._f;
          config._locale = config._locale || locale_locales__getLocale(config._l);
          if (input === null || (format === undefined && input === '')) {
            return valid__createInvalid({nullInput: true});
          }
          if (typeof input === 'string') {
            config._i = input = config._locale.preparse(input);
          }
          if (isMoment(input)) {
            return new Moment(checkOverflow(input));
          } else if (isArray(format)) {
            configFromStringAndArray(config);
          } else if (format) {
            configFromStringAndFormat(config);
          } else if (isDate(input)) {
            config._d = input;
          } else {
            configFromInput(config);
          }
          if (!valid__isValid(config)) {
            config._d = null;
          }
          return config;
        }
        function configFromInput(config) {
          var input = config._i;
          if (input === undefined) {
            config._d = new Date(utils_hooks__hooks.now());
          } else if (isDate(input)) {
            config._d = new Date(input.valueOf());
          } else if (typeof input === 'string') {
            configFromString(config);
          } else if (isArray(input)) {
            config._a = map(input.slice(0), function(obj) {
              return parseInt(obj, 10);
            });
            configFromArray(config);
          } else if (typeof(input) === 'object') {
            configFromObject(config);
          } else if (typeof(input) === 'number') {
            config._d = new Date(input);
          } else {
            utils_hooks__hooks.createFromInputFallback(config);
          }
        }
        function createLocalOrUTC(input, format, locale, strict, isUTC) {
          var c = {};
          if (typeof(locale) === 'boolean') {
            strict = locale;
            locale = undefined;
          }
          c._isAMomentObject = true;
          c._useUTC = c._isUTC = isUTC;
          c._l = locale;
          c._i = input;
          c._f = format;
          c._strict = strict;
          return createFromConfig(c);
        }
        function local__createLocal(input, format, locale, strict) {
          return createLocalOrUTC(input, format, locale, strict, false);
        }
        var prototypeMin = deprecate('moment().min is deprecated, use moment.max instead. https://github.com/moment/moment/issues/1548', function() {
          var other = local__createLocal.apply(null, arguments);
          if (this.isValid() && other.isValid()) {
            return other < this ? this : other;
          } else {
            return valid__createInvalid();
          }
        });
        var prototypeMax = deprecate('moment().max is deprecated, use moment.min instead. https://github.com/moment/moment/issues/1548', function() {
          var other = local__createLocal.apply(null, arguments);
          if (this.isValid() && other.isValid()) {
            return other > this ? this : other;
          } else {
            return valid__createInvalid();
          }
        });
        function pickBy(fn, moments) {
          var res,
              i;
          if (moments.length === 1 && isArray(moments[0])) {
            moments = moments[0];
          }
          if (!moments.length) {
            return local__createLocal();
          }
          res = moments[0];
          for (i = 1; i < moments.length; ++i) {
            if (!moments[i].isValid() || moments[i][fn](res)) {
              res = moments[i];
            }
          }
          return res;
        }
        function min() {
          var args = [].slice.call(arguments, 0);
          return pickBy('isBefore', args);
        }
        function max() {
          var args = [].slice.call(arguments, 0);
          return pickBy('isAfter', args);
        }
        var now = function() {
          return Date.now ? Date.now() : +(new Date());
        };
        function Duration(duration) {
          var normalizedInput = normalizeObjectUnits(duration),
              years = normalizedInput.year || 0,
              quarters = normalizedInput.quarter || 0,
              months = normalizedInput.month || 0,
              weeks = normalizedInput.week || 0,
              days = normalizedInput.day || 0,
              hours = normalizedInput.hour || 0,
              minutes = normalizedInput.minute || 0,
              seconds = normalizedInput.second || 0,
              milliseconds = normalizedInput.millisecond || 0;
          this._milliseconds = +milliseconds + seconds * 1e3 + minutes * 6e4 + hours * 1000 * 60 * 60;
          this._days = +days + weeks * 7;
          this._months = +months + quarters * 3 + years * 12;
          this._data = {};
          this._locale = locale_locales__getLocale();
          this._bubble();
        }
        function isDuration(obj) {
          return obj instanceof Duration;
        }
        function offset(token, separator) {
          addFormatToken(token, 0, 0, function() {
            var offset = this.utcOffset();
            var sign = '+';
            if (offset < 0) {
              offset = -offset;
              sign = '-';
            }
            return sign + zeroFill(~~(offset / 60), 2) + separator + zeroFill(~~(offset) % 60, 2);
          });
        }
        offset('Z', ':');
        offset('ZZ', '');
        addRegexToken('Z', matchShortOffset);
        addRegexToken('ZZ', matchShortOffset);
        addParseToken(['Z', 'ZZ'], function(input, array, config) {
          config._useUTC = true;
          config._tzm = offsetFromString(matchShortOffset, input);
        });
        var chunkOffset = /([\+\-]|\d\d)/gi;
        function offsetFromString(matcher, string) {
          var matches = ((string || '').match(matcher) || []);
          var chunk = matches[matches.length - 1] || [];
          var parts = (chunk + '').match(chunkOffset) || ['-', 0, 0];
          var minutes = +(parts[1] * 60) + toInt(parts[2]);
          return parts[0] === '+' ? minutes : -minutes;
        }
        function cloneWithOffset(input, model) {
          var res,
              diff;
          if (model._isUTC) {
            res = model.clone();
            diff = (isMoment(input) || isDate(input) ? input.valueOf() : local__createLocal(input).valueOf()) - res.valueOf();
            res._d.setTime(res._d.valueOf() + diff);
            utils_hooks__hooks.updateOffset(res, false);
            return res;
          } else {
            return local__createLocal(input).local();
          }
        }
        function getDateOffset(m) {
          return -Math.round(m._d.getTimezoneOffset() / 15) * 15;
        }
        utils_hooks__hooks.updateOffset = function() {};
        function getSetOffset(input, keepLocalTime) {
          var offset = this._offset || 0,
              localAdjust;
          if (!this.isValid()) {
            return input != null ? this : NaN;
          }
          if (input != null) {
            if (typeof input === 'string') {
              input = offsetFromString(matchShortOffset, input);
            } else if (Math.abs(input) < 16) {
              input = input * 60;
            }
            if (!this._isUTC && keepLocalTime) {
              localAdjust = getDateOffset(this);
            }
            this._offset = input;
            this._isUTC = true;
            if (localAdjust != null) {
              this.add(localAdjust, 'm');
            }
            if (offset !== input) {
              if (!keepLocalTime || this._changeInProgress) {
                add_subtract__addSubtract(this, create__createDuration(input - offset, 'm'), 1, false);
              } else if (!this._changeInProgress) {
                this._changeInProgress = true;
                utils_hooks__hooks.updateOffset(this, true);
                this._changeInProgress = null;
              }
            }
            return this;
          } else {
            return this._isUTC ? offset : getDateOffset(this);
          }
        }
        function getSetZone(input, keepLocalTime) {
          if (input != null) {
            if (typeof input !== 'string') {
              input = -input;
            }
            this.utcOffset(input, keepLocalTime);
            return this;
          } else {
            return -this.utcOffset();
          }
        }
        function setOffsetToUTC(keepLocalTime) {
          return this.utcOffset(0, keepLocalTime);
        }
        function setOffsetToLocal(keepLocalTime) {
          if (this._isUTC) {
            this.utcOffset(0, keepLocalTime);
            this._isUTC = false;
            if (keepLocalTime) {
              this.subtract(getDateOffset(this), 'm');
            }
          }
          return this;
        }
        function setOffsetToParsedOffset() {
          if (this._tzm) {
            this.utcOffset(this._tzm);
          } else if (typeof this._i === 'string') {
            this.utcOffset(offsetFromString(matchOffset, this._i));
          }
          return this;
        }
        function hasAlignedHourOffset(input) {
          if (!this.isValid()) {
            return false;
          }
          input = input ? local__createLocal(input).utcOffset() : 0;
          return (this.utcOffset() - input) % 60 === 0;
        }
        function isDaylightSavingTime() {
          return (this.utcOffset() > this.clone().month(0).utcOffset() || this.utcOffset() > this.clone().month(5).utcOffset());
        }
        function isDaylightSavingTimeShifted() {
          if (!isUndefined(this._isDSTShifted)) {
            return this._isDSTShifted;
          }
          var c = {};
          copyConfig(c, this);
          c = prepareConfig(c);
          if (c._a) {
            var other = c._isUTC ? create_utc__createUTC(c._a) : local__createLocal(c._a);
            this._isDSTShifted = this.isValid() && compareArrays(c._a, other.toArray()) > 0;
          } else {
            this._isDSTShifted = false;
          }
          return this._isDSTShifted;
        }
        function isLocal() {
          return this.isValid() ? !this._isUTC : false;
        }
        function isUtcOffset() {
          return this.isValid() ? this._isUTC : false;
        }
        function isUtc() {
          return this.isValid() ? this._isUTC && this._offset === 0 : false;
        }
        var aspNetRegex = /^(\-)?(?:(\d*)[. ])?(\d+)\:(\d+)(?:\:(\d+)\.?(\d{3})?\d*)?$/;
        var isoRegex = /^(-)?P(?:(-?[0-9,.]*)Y)?(?:(-?[0-9,.]*)M)?(?:(-?[0-9,.]*)W)?(?:(-?[0-9,.]*)D)?(?:T(?:(-?[0-9,.]*)H)?(?:(-?[0-9,.]*)M)?(?:(-?[0-9,.]*)S)?)?$/;
        function create__createDuration(input, key) {
          var duration = input,
              match = null,
              sign,
              ret,
              diffRes;
          if (isDuration(input)) {
            duration = {
              ms: input._milliseconds,
              d: input._days,
              M: input._months
            };
          } else if (typeof input === 'number') {
            duration = {};
            if (key) {
              duration[key] = input;
            } else {
              duration.milliseconds = input;
            }
          } else if (!!(match = aspNetRegex.exec(input))) {
            sign = (match[1] === '-') ? -1 : 1;
            duration = {
              y: 0,
              d: toInt(match[DATE]) * sign,
              h: toInt(match[HOUR]) * sign,
              m: toInt(match[MINUTE]) * sign,
              s: toInt(match[SECOND]) * sign,
              ms: toInt(match[MILLISECOND]) * sign
            };
          } else if (!!(match = isoRegex.exec(input))) {
            sign = (match[1] === '-') ? -1 : 1;
            duration = {
              y: parseIso(match[2], sign),
              M: parseIso(match[3], sign),
              w: parseIso(match[4], sign),
              d: parseIso(match[5], sign),
              h: parseIso(match[6], sign),
              m: parseIso(match[7], sign),
              s: parseIso(match[8], sign)
            };
          } else if (duration == null) {
            duration = {};
          } else if (typeof duration === 'object' && ('from' in duration || 'to' in duration)) {
            diffRes = momentsDifference(local__createLocal(duration.from), local__createLocal(duration.to));
            duration = {};
            duration.ms = diffRes.milliseconds;
            duration.M = diffRes.months;
          }
          ret = new Duration(duration);
          if (isDuration(input) && hasOwnProp(input, '_locale')) {
            ret._locale = input._locale;
          }
          return ret;
        }
        create__createDuration.fn = Duration.prototype;
        function parseIso(inp, sign) {
          var res = inp && parseFloat(inp.replace(',', '.'));
          return (isNaN(res) ? 0 : res) * sign;
        }
        function positiveMomentsDifference(base, other) {
          var res = {
            milliseconds: 0,
            months: 0
          };
          res.months = other.month() - base.month() + (other.year() - base.year()) * 12;
          if (base.clone().add(res.months, 'M').isAfter(other)) {
            --res.months;
          }
          res.milliseconds = +other - +(base.clone().add(res.months, 'M'));
          return res;
        }
        function momentsDifference(base, other) {
          var res;
          if (!(base.isValid() && other.isValid())) {
            return {
              milliseconds: 0,
              months: 0
            };
          }
          other = cloneWithOffset(other, base);
          if (base.isBefore(other)) {
            res = positiveMomentsDifference(base, other);
          } else {
            res = positiveMomentsDifference(other, base);
            res.milliseconds = -res.milliseconds;
            res.months = -res.months;
          }
          return res;
        }
        function absRound(number) {
          if (number < 0) {
            return Math.round(-1 * number) * -1;
          } else {
            return Math.round(number);
          }
        }
        function createAdder(direction, name) {
          return function(val, period) {
            var dur,
                tmp;
            if (period !== null && !isNaN(+period)) {
              deprecateSimple(name, 'moment().' + name + '(period, number) is deprecated. Please use moment().' + name + '(number, period).');
              tmp = val;
              val = period;
              period = tmp;
            }
            val = typeof val === 'string' ? +val : val;
            dur = create__createDuration(val, period);
            add_subtract__addSubtract(this, dur, direction);
            return this;
          };
        }
        function add_subtract__addSubtract(mom, duration, isAdding, updateOffset) {
          var milliseconds = duration._milliseconds,
              days = absRound(duration._days),
              months = absRound(duration._months);
          if (!mom.isValid()) {
            return;
          }
          updateOffset = updateOffset == null ? true : updateOffset;
          if (milliseconds) {
            mom._d.setTime(mom._d.valueOf() + milliseconds * isAdding);
          }
          if (days) {
            get_set__set(mom, 'Date', get_set__get(mom, 'Date') + days * isAdding);
          }
          if (months) {
            setMonth(mom, get_set__get(mom, 'Month') + months * isAdding);
          }
          if (updateOffset) {
            utils_hooks__hooks.updateOffset(mom, days || months);
          }
        }
        var add_subtract__add = createAdder(1, 'add');
        var add_subtract__subtract = createAdder(-1, 'subtract');
        function moment_calendar__calendar(time, formats) {
          var now = time || local__createLocal(),
              sod = cloneWithOffset(now, this).startOf('day'),
              diff = this.diff(sod, 'days', true),
              format = diff < -6 ? 'sameElse' : diff < -1 ? 'lastWeek' : diff < 0 ? 'lastDay' : diff < 1 ? 'sameDay' : diff < 2 ? 'nextDay' : diff < 7 ? 'nextWeek' : 'sameElse';
          var output = formats && (isFunction(formats[format]) ? formats[format]() : formats[format]);
          return this.format(output || this.localeData().calendar(format, this, local__createLocal(now)));
        }
        function clone() {
          return new Moment(this);
        }
        function isAfter(input, units) {
          var localInput = isMoment(input) ? input : local__createLocal(input);
          if (!(this.isValid() && localInput.isValid())) {
            return false;
          }
          units = normalizeUnits(!isUndefined(units) ? units : 'millisecond');
          if (units === 'millisecond') {
            return this.valueOf() > localInput.valueOf();
          } else {
            return localInput.valueOf() < this.clone().startOf(units).valueOf();
          }
        }
        function isBefore(input, units) {
          var localInput = isMoment(input) ? input : local__createLocal(input);
          if (!(this.isValid() && localInput.isValid())) {
            return false;
          }
          units = normalizeUnits(!isUndefined(units) ? units : 'millisecond');
          if (units === 'millisecond') {
            return this.valueOf() < localInput.valueOf();
          } else {
            return this.clone().endOf(units).valueOf() < localInput.valueOf();
          }
        }
        function isBetween(from, to, units, inclusivity) {
          inclusivity = inclusivity || '()';
          return (inclusivity[0] === '(' ? this.isAfter(from, units) : !this.isBefore(from, units)) && (inclusivity[1] === ')' ? this.isBefore(to, units) : !this.isAfter(to, units));
        }
        function isSame(input, units) {
          var localInput = isMoment(input) ? input : local__createLocal(input),
              inputMs;
          if (!(this.isValid() && localInput.isValid())) {
            return false;
          }
          units = normalizeUnits(units || 'millisecond');
          if (units === 'millisecond') {
            return this.valueOf() === localInput.valueOf();
          } else {
            inputMs = localInput.valueOf();
            return this.clone().startOf(units).valueOf() <= inputMs && inputMs <= this.clone().endOf(units).valueOf();
          }
        }
        function isSameOrAfter(input, units) {
          return this.isSame(input, units) || this.isAfter(input, units);
        }
        function isSameOrBefore(input, units) {
          return this.isSame(input, units) || this.isBefore(input, units);
        }
        function diff(input, units, asFloat) {
          var that,
              zoneDelta,
              delta,
              output;
          if (!this.isValid()) {
            return NaN;
          }
          that = cloneWithOffset(input, this);
          if (!that.isValid()) {
            return NaN;
          }
          zoneDelta = (that.utcOffset() - this.utcOffset()) * 6e4;
          units = normalizeUnits(units);
          if (units === 'year' || units === 'month' || units === 'quarter') {
            output = monthDiff(this, that);
            if (units === 'quarter') {
              output = output / 3;
            } else if (units === 'year') {
              output = output / 12;
            }
          } else {
            delta = this - that;
            output = units === 'second' ? delta / 1e3 : units === 'minute' ? delta / 6e4 : units === 'hour' ? delta / 36e5 : units === 'day' ? (delta - zoneDelta) / 864e5 : units === 'week' ? (delta - zoneDelta) / 6048e5 : delta;
          }
          return asFloat ? output : absFloor(output);
        }
        function monthDiff(a, b) {
          var wholeMonthDiff = ((b.year() - a.year()) * 12) + (b.month() - a.month()),
              anchor = a.clone().add(wholeMonthDiff, 'months'),
              anchor2,
              adjust;
          if (b - anchor < 0) {
            anchor2 = a.clone().add(wholeMonthDiff - 1, 'months');
            adjust = (b - anchor) / (anchor - anchor2);
          } else {
            anchor2 = a.clone().add(wholeMonthDiff + 1, 'months');
            adjust = (b - anchor) / (anchor2 - anchor);
          }
          return -(wholeMonthDiff + adjust) || 0;
        }
        utils_hooks__hooks.defaultFormat = 'YYYY-MM-DDTHH:mm:ssZ';
        utils_hooks__hooks.defaultFormatUtc = 'YYYY-MM-DDTHH:mm:ss[Z]';
        function toString() {
          return this.clone().locale('en').format('ddd MMM DD YYYY HH:mm:ss [GMT]ZZ');
        }
        function moment_format__toISOString() {
          var m = this.clone().utc();
          if (0 < m.year() && m.year() <= 9999) {
            if (isFunction(Date.prototype.toISOString)) {
              return this.toDate().toISOString();
            } else {
              return formatMoment(m, 'YYYY-MM-DD[T]HH:mm:ss.SSS[Z]');
            }
          } else {
            return formatMoment(m, 'YYYYYY-MM-DD[T]HH:mm:ss.SSS[Z]');
          }
        }
        function format(inputString) {
          if (!inputString) {
            inputString = this.isUtc() ? utils_hooks__hooks.defaultFormatUtc : utils_hooks__hooks.defaultFormat;
          }
          var output = formatMoment(this, inputString);
          return this.localeData().postformat(output);
        }
        function from(time, withoutSuffix) {
          if (this.isValid() && ((isMoment(time) && time.isValid()) || local__createLocal(time).isValid())) {
            return create__createDuration({
              to: this,
              from: time
            }).locale(this.locale()).humanize(!withoutSuffix);
          } else {
            return this.localeData().invalidDate();
          }
        }
        function fromNow(withoutSuffix) {
          return this.from(local__createLocal(), withoutSuffix);
        }
        function to(time, withoutSuffix) {
          if (this.isValid() && ((isMoment(time) && time.isValid()) || local__createLocal(time).isValid())) {
            return create__createDuration({
              from: this,
              to: time
            }).locale(this.locale()).humanize(!withoutSuffix);
          } else {
            return this.localeData().invalidDate();
          }
        }
        function toNow(withoutSuffix) {
          return this.to(local__createLocal(), withoutSuffix);
        }
        function locale(key) {
          var newLocaleData;
          if (key === undefined) {
            return this._locale._abbr;
          } else {
            newLocaleData = locale_locales__getLocale(key);
            if (newLocaleData != null) {
              this._locale = newLocaleData;
            }
            return this;
          }
        }
        var lang = deprecate('moment().lang() is deprecated. Instead, use moment().localeData() to get the language configuration. Use moment().locale() to change languages.', function(key) {
          if (key === undefined) {
            return this.localeData();
          } else {
            return this.locale(key);
          }
        });
        function localeData() {
          return this._locale;
        }
        function startOf(units) {
          units = normalizeUnits(units);
          switch (units) {
            case 'year':
              this.month(0);
            case 'quarter':
            case 'month':
              this.date(1);
            case 'week':
            case 'isoWeek':
            case 'day':
            case 'date':
              this.hours(0);
            case 'hour':
              this.minutes(0);
            case 'minute':
              this.seconds(0);
            case 'second':
              this.milliseconds(0);
          }
          if (units === 'week') {
            this.weekday(0);
          }
          if (units === 'isoWeek') {
            this.isoWeekday(1);
          }
          if (units === 'quarter') {
            this.month(Math.floor(this.month() / 3) * 3);
          }
          return this;
        }
        function endOf(units) {
          units = normalizeUnits(units);
          if (units === undefined || units === 'millisecond') {
            return this;
          }
          if (units === 'date') {
            units = 'day';
          }
          return this.startOf(units).add(1, (units === 'isoWeek' ? 'week' : units)).subtract(1, 'ms');
        }
        function to_type__valueOf() {
          return this._d.valueOf() - ((this._offset || 0) * 60000);
        }
        function unix() {
          return Math.floor(this.valueOf() / 1000);
        }
        function toDate() {
          return this._offset ? new Date(this.valueOf()) : this._d;
        }
        function toArray() {
          var m = this;
          return [m.year(), m.month(), m.date(), m.hour(), m.minute(), m.second(), m.millisecond()];
        }
        function toObject() {
          var m = this;
          return {
            years: m.year(),
            months: m.month(),
            date: m.date(),
            hours: m.hours(),
            minutes: m.minutes(),
            seconds: m.seconds(),
            milliseconds: m.milliseconds()
          };
        }
        function toJSON() {
          return this.isValid() ? this.toISOString() : null;
        }
        function moment_valid__isValid() {
          return valid__isValid(this);
        }
        function parsingFlags() {
          return extend({}, getParsingFlags(this));
        }
        function invalidAt() {
          return getParsingFlags(this).overflow;
        }
        function creationData() {
          return {
            input: this._i,
            format: this._f,
            locale: this._locale,
            isUTC: this._isUTC,
            strict: this._strict
          };
        }
        addFormatToken(0, ['gg', 2], 0, function() {
          return this.weekYear() % 100;
        });
        addFormatToken(0, ['GG', 2], 0, function() {
          return this.isoWeekYear() % 100;
        });
        function addWeekYearFormatToken(token, getter) {
          addFormatToken(0, [token, token.length], 0, getter);
        }
        addWeekYearFormatToken('gggg', 'weekYear');
        addWeekYearFormatToken('ggggg', 'weekYear');
        addWeekYearFormatToken('GGGG', 'isoWeekYear');
        addWeekYearFormatToken('GGGGG', 'isoWeekYear');
        addUnitAlias('weekYear', 'gg');
        addUnitAlias('isoWeekYear', 'GG');
        addRegexToken('G', matchSigned);
        addRegexToken('g', matchSigned);
        addRegexToken('GG', match1to2, match2);
        addRegexToken('gg', match1to2, match2);
        addRegexToken('GGGG', match1to4, match4);
        addRegexToken('gggg', match1to4, match4);
        addRegexToken('GGGGG', match1to6, match6);
        addRegexToken('ggggg', match1to6, match6);
        addWeekParseToken(['gggg', 'ggggg', 'GGGG', 'GGGGG'], function(input, week, config, token) {
          week[token.substr(0, 2)] = toInt(input);
        });
        addWeekParseToken(['gg', 'GG'], function(input, week, config, token) {
          week[token] = utils_hooks__hooks.parseTwoDigitYear(input);
        });
        function getSetWeekYear(input) {
          return getSetWeekYearHelper.call(this, input, this.week(), this.weekday(), this.localeData()._week.dow, this.localeData()._week.doy);
        }
        function getSetISOWeekYear(input) {
          return getSetWeekYearHelper.call(this, input, this.isoWeek(), this.isoWeekday(), 1, 4);
        }
        function getISOWeeksInYear() {
          return weeksInYear(this.year(), 1, 4);
        }
        function getWeeksInYear() {
          var weekInfo = this.localeData()._week;
          return weeksInYear(this.year(), weekInfo.dow, weekInfo.doy);
        }
        function getSetWeekYearHelper(input, week, weekday, dow, doy) {
          var weeksTarget;
          if (input == null) {
            return weekOfYear(this, dow, doy).year;
          } else {
            weeksTarget = weeksInYear(input, dow, doy);
            if (week > weeksTarget) {
              week = weeksTarget;
            }
            return setWeekAll.call(this, input, week, weekday, dow, doy);
          }
        }
        function setWeekAll(weekYear, week, weekday, dow, doy) {
          var dayOfYearData = dayOfYearFromWeeks(weekYear, week, weekday, dow, doy),
              date = createUTCDate(dayOfYearData.year, 0, dayOfYearData.dayOfYear);
          this.year(date.getUTCFullYear());
          this.month(date.getUTCMonth());
          this.date(date.getUTCDate());
          return this;
        }
        addFormatToken('Q', 0, 'Qo', 'quarter');
        addUnitAlias('quarter', 'Q');
        addRegexToken('Q', match1);
        addParseToken('Q', function(input, array) {
          array[MONTH] = (toInt(input) - 1) * 3;
        });
        function getSetQuarter(input) {
          return input == null ? Math.ceil((this.month() + 1) / 3) : this.month((input - 1) * 3 + this.month() % 3);
        }
        addFormatToken('w', ['ww', 2], 'wo', 'week');
        addFormatToken('W', ['WW', 2], 'Wo', 'isoWeek');
        addUnitAlias('week', 'w');
        addUnitAlias('isoWeek', 'W');
        addRegexToken('w', match1to2);
        addRegexToken('ww', match1to2, match2);
        addRegexToken('W', match1to2);
        addRegexToken('WW', match1to2, match2);
        addWeekParseToken(['w', 'ww', 'W', 'WW'], function(input, week, config, token) {
          week[token.substr(0, 1)] = toInt(input);
        });
        function localeWeek(mom) {
          return weekOfYear(mom, this._week.dow, this._week.doy).week;
        }
        var defaultLocaleWeek = {
          dow: 0,
          doy: 6
        };
        function localeFirstDayOfWeek() {
          return this._week.dow;
        }
        function localeFirstDayOfYear() {
          return this._week.doy;
        }
        function getSetWeek(input) {
          var week = this.localeData().week(this);
          return input == null ? week : this.add((input - week) * 7, 'd');
        }
        function getSetISOWeek(input) {
          var week = weekOfYear(this, 1, 4).week;
          return input == null ? week : this.add((input - week) * 7, 'd');
        }
        addFormatToken('D', ['DD', 2], 'Do', 'date');
        addUnitAlias('date', 'D');
        addRegexToken('D', match1to2);
        addRegexToken('DD', match1to2, match2);
        addRegexToken('Do', function(isStrict, locale) {
          return isStrict ? locale._ordinalParse : locale._ordinalParseLenient;
        });
        addParseToken(['D', 'DD'], DATE);
        addParseToken('Do', function(input, array) {
          array[DATE] = toInt(input.match(match1to2)[0], 10);
        });
        var getSetDayOfMonth = makeGetSet('Date', true);
        addFormatToken('d', 0, 'do', 'day');
        addFormatToken('dd', 0, 0, function(format) {
          return this.localeData().weekdaysMin(this, format);
        });
        addFormatToken('ddd', 0, 0, function(format) {
          return this.localeData().weekdaysShort(this, format);
        });
        addFormatToken('dddd', 0, 0, function(format) {
          return this.localeData().weekdays(this, format);
        });
        addFormatToken('e', 0, 0, 'weekday');
        addFormatToken('E', 0, 0, 'isoWeekday');
        addUnitAlias('day', 'd');
        addUnitAlias('weekday', 'e');
        addUnitAlias('isoWeekday', 'E');
        addRegexToken('d', match1to2);
        addRegexToken('e', match1to2);
        addRegexToken('E', match1to2);
        addRegexToken('dd', function(isStrict, locale) {
          return locale.weekdaysMinRegex(isStrict);
        });
        addRegexToken('ddd', function(isStrict, locale) {
          return locale.weekdaysShortRegex(isStrict);
        });
        addRegexToken('dddd', function(isStrict, locale) {
          return locale.weekdaysRegex(isStrict);
        });
        addWeekParseToken(['dd', 'ddd', 'dddd'], function(input, week, config, token) {
          var weekday = config._locale.weekdaysParse(input, token, config._strict);
          if (weekday != null) {
            week.d = weekday;
          } else {
            getParsingFlags(config).invalidWeekday = input;
          }
        });
        addWeekParseToken(['d', 'e', 'E'], function(input, week, config, token) {
          week[token] = toInt(input);
        });
        function parseWeekday(input, locale) {
          if (typeof input !== 'string') {
            return input;
          }
          if (!isNaN(input)) {
            return parseInt(input, 10);
          }
          input = locale.weekdaysParse(input);
          if (typeof input === 'number') {
            return input;
          }
          return null;
        }
        var defaultLocaleWeekdays = 'Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday'.split('_');
        function localeWeekdays(m, format) {
          return isArray(this._weekdays) ? this._weekdays[m.day()] : this._weekdays[this._weekdays.isFormat.test(format) ? 'format' : 'standalone'][m.day()];
        }
        var defaultLocaleWeekdaysShort = 'Sun_Mon_Tue_Wed_Thu_Fri_Sat'.split('_');
        function localeWeekdaysShort(m) {
          return this._weekdaysShort[m.day()];
        }
        var defaultLocaleWeekdaysMin = 'Su_Mo_Tu_We_Th_Fr_Sa'.split('_');
        function localeWeekdaysMin(m) {
          return this._weekdaysMin[m.day()];
        }
        function day_of_week__handleStrictParse(weekdayName, format, strict) {
          var i,
              ii,
              mom,
              llc = weekdayName.toLocaleLowerCase();
          if (!this._weekdaysParse) {
            this._weekdaysParse = [];
            this._shortWeekdaysParse = [];
            this._minWeekdaysParse = [];
            for (i = 0; i < 7; ++i) {
              mom = create_utc__createUTC([2000, 1]).day(i);
              this._minWeekdaysParse[i] = this.weekdaysMin(mom, '').toLocaleLowerCase();
              this._shortWeekdaysParse[i] = this.weekdaysShort(mom, '').toLocaleLowerCase();
              this._weekdaysParse[i] = this.weekdays(mom, '').toLocaleLowerCase();
            }
          }
          if (strict) {
            if (format === 'dddd') {
              ii = indexOf.call(this._weekdaysParse, llc);
              return ii !== -1 ? ii : null;
            } else if (format === 'ddd') {
              ii = indexOf.call(this._shortWeekdaysParse, llc);
              return ii !== -1 ? ii : null;
            } else {
              ii = indexOf.call(this._minWeekdaysParse, llc);
              return ii !== -1 ? ii : null;
            }
          } else {
            if (format === 'dddd') {
              ii = indexOf.call(this._weekdaysParse, llc);
              if (ii !== -1) {
                return ii;
              }
              ii = indexOf.call(this._shortWeekdaysParse, llc);
              if (ii !== -1) {
                return ii;
              }
              ii = indexOf.call(this._minWeekdaysParse, llc);
              return ii !== -1 ? ii : null;
            } else if (format === 'ddd') {
              ii = indexOf.call(this._shortWeekdaysParse, llc);
              if (ii !== -1) {
                return ii;
              }
              ii = indexOf.call(this._weekdaysParse, llc);
              if (ii !== -1) {
                return ii;
              }
              ii = indexOf.call(this._minWeekdaysParse, llc);
              return ii !== -1 ? ii : null;
            } else {
              ii = indexOf.call(this._minWeekdaysParse, llc);
              if (ii !== -1) {
                return ii;
              }
              ii = indexOf.call(this._weekdaysParse, llc);
              if (ii !== -1) {
                return ii;
              }
              ii = indexOf.call(this._shortWeekdaysParse, llc);
              return ii !== -1 ? ii : null;
            }
          }
        }
        function localeWeekdaysParse(weekdayName, format, strict) {
          var i,
              mom,
              regex;
          if (this._weekdaysParseExact) {
            return day_of_week__handleStrictParse.call(this, weekdayName, format, strict);
          }
          if (!this._weekdaysParse) {
            this._weekdaysParse = [];
            this._minWeekdaysParse = [];
            this._shortWeekdaysParse = [];
            this._fullWeekdaysParse = [];
          }
          for (i = 0; i < 7; i++) {
            mom = create_utc__createUTC([2000, 1]).day(i);
            if (strict && !this._fullWeekdaysParse[i]) {
              this._fullWeekdaysParse[i] = new RegExp('^' + this.weekdays(mom, '').replace('.', '\.?') + '$', 'i');
              this._shortWeekdaysParse[i] = new RegExp('^' + this.weekdaysShort(mom, '').replace('.', '\.?') + '$', 'i');
              this._minWeekdaysParse[i] = new RegExp('^' + this.weekdaysMin(mom, '').replace('.', '\.?') + '$', 'i');
            }
            if (!this._weekdaysParse[i]) {
              regex = '^' + this.weekdays(mom, '') + '|^' + this.weekdaysShort(mom, '') + '|^' + this.weekdaysMin(mom, '');
              this._weekdaysParse[i] = new RegExp(regex.replace('.', ''), 'i');
            }
            if (strict && format === 'dddd' && this._fullWeekdaysParse[i].test(weekdayName)) {
              return i;
            } else if (strict && format === 'ddd' && this._shortWeekdaysParse[i].test(weekdayName)) {
              return i;
            } else if (strict && format === 'dd' && this._minWeekdaysParse[i].test(weekdayName)) {
              return i;
            } else if (!strict && this._weekdaysParse[i].test(weekdayName)) {
              return i;
            }
          }
        }
        function getSetDayOfWeek(input) {
          if (!this.isValid()) {
            return input != null ? this : NaN;
          }
          var day = this._isUTC ? this._d.getUTCDay() : this._d.getDay();
          if (input != null) {
            input = parseWeekday(input, this.localeData());
            return this.add(input - day, 'd');
          } else {
            return day;
          }
        }
        function getSetLocaleDayOfWeek(input) {
          if (!this.isValid()) {
            return input != null ? this : NaN;
          }
          var weekday = (this.day() + 7 - this.localeData()._week.dow) % 7;
          return input == null ? weekday : this.add(input - weekday, 'd');
        }
        function getSetISODayOfWeek(input) {
          if (!this.isValid()) {
            return input != null ? this : NaN;
          }
          return input == null ? this.day() || 7 : this.day(this.day() % 7 ? input : input - 7);
        }
        var defaultWeekdaysRegex = matchWord;
        function weekdaysRegex(isStrict) {
          if (this._weekdaysParseExact) {
            if (!hasOwnProp(this, '_weekdaysRegex')) {
              computeWeekdaysParse.call(this);
            }
            if (isStrict) {
              return this._weekdaysStrictRegex;
            } else {
              return this._weekdaysRegex;
            }
          } else {
            return this._weekdaysStrictRegex && isStrict ? this._weekdaysStrictRegex : this._weekdaysRegex;
          }
        }
        var defaultWeekdaysShortRegex = matchWord;
        function weekdaysShortRegex(isStrict) {
          if (this._weekdaysParseExact) {
            if (!hasOwnProp(this, '_weekdaysRegex')) {
              computeWeekdaysParse.call(this);
            }
            if (isStrict) {
              return this._weekdaysShortStrictRegex;
            } else {
              return this._weekdaysShortRegex;
            }
          } else {
            return this._weekdaysShortStrictRegex && isStrict ? this._weekdaysShortStrictRegex : this._weekdaysShortRegex;
          }
        }
        var defaultWeekdaysMinRegex = matchWord;
        function weekdaysMinRegex(isStrict) {
          if (this._weekdaysParseExact) {
            if (!hasOwnProp(this, '_weekdaysRegex')) {
              computeWeekdaysParse.call(this);
            }
            if (isStrict) {
              return this._weekdaysMinStrictRegex;
            } else {
              return this._weekdaysMinRegex;
            }
          } else {
            return this._weekdaysMinStrictRegex && isStrict ? this._weekdaysMinStrictRegex : this._weekdaysMinRegex;
          }
        }
        function computeWeekdaysParse() {
          function cmpLenRev(a, b) {
            return b.length - a.length;
          }
          var minPieces = [],
              shortPieces = [],
              longPieces = [],
              mixedPieces = [],
              i,
              mom,
              minp,
              shortp,
              longp;
          for (i = 0; i < 7; i++) {
            mom = create_utc__createUTC([2000, 1]).day(i);
            minp = this.weekdaysMin(mom, '');
            shortp = this.weekdaysShort(mom, '');
            longp = this.weekdays(mom, '');
            minPieces.push(minp);
            shortPieces.push(shortp);
            longPieces.push(longp);
            mixedPieces.push(minp);
            mixedPieces.push(shortp);
            mixedPieces.push(longp);
          }
          minPieces.sort(cmpLenRev);
          shortPieces.sort(cmpLenRev);
          longPieces.sort(cmpLenRev);
          mixedPieces.sort(cmpLenRev);
          for (i = 0; i < 7; i++) {
            shortPieces[i] = regexEscape(shortPieces[i]);
            longPieces[i] = regexEscape(longPieces[i]);
            mixedPieces[i] = regexEscape(mixedPieces[i]);
          }
          this._weekdaysRegex = new RegExp('^(' + mixedPieces.join('|') + ')', 'i');
          this._weekdaysShortRegex = this._weekdaysRegex;
          this._weekdaysMinRegex = this._weekdaysRegex;
          this._weekdaysStrictRegex = new RegExp('^(' + longPieces.join('|') + ')', 'i');
          this._weekdaysShortStrictRegex = new RegExp('^(' + shortPieces.join('|') + ')', 'i');
          this._weekdaysMinStrictRegex = new RegExp('^(' + minPieces.join('|') + ')', 'i');
        }
        addFormatToken('DDD', ['DDDD', 3], 'DDDo', 'dayOfYear');
        addUnitAlias('dayOfYear', 'DDD');
        addRegexToken('DDD', match1to3);
        addRegexToken('DDDD', match3);
        addParseToken(['DDD', 'DDDD'], function(input, array, config) {
          config._dayOfYear = toInt(input);
        });
        function getSetDayOfYear(input) {
          var dayOfYear = Math.round((this.clone().startOf('day') - this.clone().startOf('year')) / 864e5) + 1;
          return input == null ? dayOfYear : this.add((input - dayOfYear), 'd');
        }
        function hFormat() {
          return this.hours() % 12 || 12;
        }
        function kFormat() {
          return this.hours() || 24;
        }
        addFormatToken('H', ['HH', 2], 0, 'hour');
        addFormatToken('h', ['hh', 2], 0, hFormat);
        addFormatToken('k', ['kk', 2], 0, kFormat);
        addFormatToken('hmm', 0, 0, function() {
          return '' + hFormat.apply(this) + zeroFill(this.minutes(), 2);
        });
        addFormatToken('hmmss', 0, 0, function() {
          return '' + hFormat.apply(this) + zeroFill(this.minutes(), 2) + zeroFill(this.seconds(), 2);
        });
        addFormatToken('Hmm', 0, 0, function() {
          return '' + this.hours() + zeroFill(this.minutes(), 2);
        });
        addFormatToken('Hmmss', 0, 0, function() {
          return '' + this.hours() + zeroFill(this.minutes(), 2) + zeroFill(this.seconds(), 2);
        });
        function meridiem(token, lowercase) {
          addFormatToken(token, 0, 0, function() {
            return this.localeData().meridiem(this.hours(), this.minutes(), lowercase);
          });
        }
        meridiem('a', true);
        meridiem('A', false);
        addUnitAlias('hour', 'h');
        function matchMeridiem(isStrict, locale) {
          return locale._meridiemParse;
        }
        addRegexToken('a', matchMeridiem);
        addRegexToken('A', matchMeridiem);
        addRegexToken('H', match1to2);
        addRegexToken('h', match1to2);
        addRegexToken('HH', match1to2, match2);
        addRegexToken('hh', match1to2, match2);
        addRegexToken('hmm', match3to4);
        addRegexToken('hmmss', match5to6);
        addRegexToken('Hmm', match3to4);
        addRegexToken('Hmmss', match5to6);
        addParseToken(['H', 'HH'], HOUR);
        addParseToken(['a', 'A'], function(input, array, config) {
          config._isPm = config._locale.isPM(input);
          config._meridiem = input;
        });
        addParseToken(['h', 'hh'], function(input, array, config) {
          array[HOUR] = toInt(input);
          getParsingFlags(config).bigHour = true;
        });
        addParseToken('hmm', function(input, array, config) {
          var pos = input.length - 2;
          array[HOUR] = toInt(input.substr(0, pos));
          array[MINUTE] = toInt(input.substr(pos));
          getParsingFlags(config).bigHour = true;
        });
        addParseToken('hmmss', function(input, array, config) {
          var pos1 = input.length - 4;
          var pos2 = input.length - 2;
          array[HOUR] = toInt(input.substr(0, pos1));
          array[MINUTE] = toInt(input.substr(pos1, 2));
          array[SECOND] = toInt(input.substr(pos2));
          getParsingFlags(config).bigHour = true;
        });
        addParseToken('Hmm', function(input, array, config) {
          var pos = input.length - 2;
          array[HOUR] = toInt(input.substr(0, pos));
          array[MINUTE] = toInt(input.substr(pos));
        });
        addParseToken('Hmmss', function(input, array, config) {
          var pos1 = input.length - 4;
          var pos2 = input.length - 2;
          array[HOUR] = toInt(input.substr(0, pos1));
          array[MINUTE] = toInt(input.substr(pos1, 2));
          array[SECOND] = toInt(input.substr(pos2));
        });
        function localeIsPM(input) {
          return ((input + '').toLowerCase().charAt(0) === 'p');
        }
        var defaultLocaleMeridiemParse = /[ap]\.?m?\.?/i;
        function localeMeridiem(hours, minutes, isLower) {
          if (hours > 11) {
            return isLower ? 'pm' : 'PM';
          } else {
            return isLower ? 'am' : 'AM';
          }
        }
        var getSetHour = makeGetSet('Hours', true);
        addFormatToken('m', ['mm', 2], 0, 'minute');
        addUnitAlias('minute', 'm');
        addRegexToken('m', match1to2);
        addRegexToken('mm', match1to2, match2);
        addParseToken(['m', 'mm'], MINUTE);
        var getSetMinute = makeGetSet('Minutes', false);
        addFormatToken('s', ['ss', 2], 0, 'second');
        addUnitAlias('second', 's');
        addRegexToken('s', match1to2);
        addRegexToken('ss', match1to2, match2);
        addParseToken(['s', 'ss'], SECOND);
        var getSetSecond = makeGetSet('Seconds', false);
        addFormatToken('S', 0, 0, function() {
          return ~~(this.millisecond() / 100);
        });
        addFormatToken(0, ['SS', 2], 0, function() {
          return ~~(this.millisecond() / 10);
        });
        addFormatToken(0, ['SSS', 3], 0, 'millisecond');
        addFormatToken(0, ['SSSS', 4], 0, function() {
          return this.millisecond() * 10;
        });
        addFormatToken(0, ['SSSSS', 5], 0, function() {
          return this.millisecond() * 100;
        });
        addFormatToken(0, ['SSSSSS', 6], 0, function() {
          return this.millisecond() * 1000;
        });
        addFormatToken(0, ['SSSSSSS', 7], 0, function() {
          return this.millisecond() * 10000;
        });
        addFormatToken(0, ['SSSSSSSS', 8], 0, function() {
          return this.millisecond() * 100000;
        });
        addFormatToken(0, ['SSSSSSSSS', 9], 0, function() {
          return this.millisecond() * 1000000;
        });
        addUnitAlias('millisecond', 'ms');
        addRegexToken('S', match1to3, match1);
        addRegexToken('SS', match1to3, match2);
        addRegexToken('SSS', match1to3, match3);
        var token;
        for (token = 'SSSS'; token.length <= 9; token += 'S') {
          addRegexToken(token, matchUnsigned);
        }
        function parseMs(input, array) {
          array[MILLISECOND] = toInt(('0.' + input) * 1000);
        }
        for (token = 'S'; token.length <= 9; token += 'S') {
          addParseToken(token, parseMs);
        }
        var getSetMillisecond = makeGetSet('Milliseconds', false);
        addFormatToken('z', 0, 0, 'zoneAbbr');
        addFormatToken('zz', 0, 0, 'zoneName');
        function getZoneAbbr() {
          return this._isUTC ? 'UTC' : '';
        }
        function getZoneName() {
          return this._isUTC ? 'Coordinated Universal Time' : '';
        }
        var momentPrototype__proto = Moment.prototype;
        momentPrototype__proto.add = add_subtract__add;
        momentPrototype__proto.calendar = moment_calendar__calendar;
        momentPrototype__proto.clone = clone;
        momentPrototype__proto.diff = diff;
        momentPrototype__proto.endOf = endOf;
        momentPrototype__proto.format = format;
        momentPrototype__proto.from = from;
        momentPrototype__proto.fromNow = fromNow;
        momentPrototype__proto.to = to;
        momentPrototype__proto.toNow = toNow;
        momentPrototype__proto.get = getSet;
        momentPrototype__proto.invalidAt = invalidAt;
        momentPrototype__proto.isAfter = isAfter;
        momentPrototype__proto.isBefore = isBefore;
        momentPrototype__proto.isBetween = isBetween;
        momentPrototype__proto.isSame = isSame;
        momentPrototype__proto.isSameOrAfter = isSameOrAfter;
        momentPrototype__proto.isSameOrBefore = isSameOrBefore;
        momentPrototype__proto.isValid = moment_valid__isValid;
        momentPrototype__proto.lang = lang;
        momentPrototype__proto.locale = locale;
        momentPrototype__proto.localeData = localeData;
        momentPrototype__proto.max = prototypeMax;
        momentPrototype__proto.min = prototypeMin;
        momentPrototype__proto.parsingFlags = parsingFlags;
        momentPrototype__proto.set = getSet;
        momentPrototype__proto.startOf = startOf;
        momentPrototype__proto.subtract = add_subtract__subtract;
        momentPrototype__proto.toArray = toArray;
        momentPrototype__proto.toObject = toObject;
        momentPrototype__proto.toDate = toDate;
        momentPrototype__proto.toISOString = moment_format__toISOString;
        momentPrototype__proto.toJSON = toJSON;
        momentPrototype__proto.toString = toString;
        momentPrototype__proto.unix = unix;
        momentPrototype__proto.valueOf = to_type__valueOf;
        momentPrototype__proto.creationData = creationData;
        momentPrototype__proto.year = getSetYear;
        momentPrototype__proto.isLeapYear = getIsLeapYear;
        momentPrototype__proto.weekYear = getSetWeekYear;
        momentPrototype__proto.isoWeekYear = getSetISOWeekYear;
        momentPrototype__proto.quarter = momentPrototype__proto.quarters = getSetQuarter;
        momentPrototype__proto.month = getSetMonth;
        momentPrototype__proto.daysInMonth = getDaysInMonth;
        momentPrototype__proto.week = momentPrototype__proto.weeks = getSetWeek;
        momentPrototype__proto.isoWeek = momentPrototype__proto.isoWeeks = getSetISOWeek;
        momentPrototype__proto.weeksInYear = getWeeksInYear;
        momentPrototype__proto.isoWeeksInYear = getISOWeeksInYear;
        momentPrototype__proto.date = getSetDayOfMonth;
        momentPrototype__proto.day = momentPrototype__proto.days = getSetDayOfWeek;
        momentPrototype__proto.weekday = getSetLocaleDayOfWeek;
        momentPrototype__proto.isoWeekday = getSetISODayOfWeek;
        momentPrototype__proto.dayOfYear = getSetDayOfYear;
        momentPrototype__proto.hour = momentPrototype__proto.hours = getSetHour;
        momentPrototype__proto.minute = momentPrototype__proto.minutes = getSetMinute;
        momentPrototype__proto.second = momentPrototype__proto.seconds = getSetSecond;
        momentPrototype__proto.millisecond = momentPrototype__proto.milliseconds = getSetMillisecond;
        momentPrototype__proto.utcOffset = getSetOffset;
        momentPrototype__proto.utc = setOffsetToUTC;
        momentPrototype__proto.local = setOffsetToLocal;
        momentPrototype__proto.parseZone = setOffsetToParsedOffset;
        momentPrototype__proto.hasAlignedHourOffset = hasAlignedHourOffset;
        momentPrototype__proto.isDST = isDaylightSavingTime;
        momentPrototype__proto.isDSTShifted = isDaylightSavingTimeShifted;
        momentPrototype__proto.isLocal = isLocal;
        momentPrototype__proto.isUtcOffset = isUtcOffset;
        momentPrototype__proto.isUtc = isUtc;
        momentPrototype__proto.isUTC = isUtc;
        momentPrototype__proto.zoneAbbr = getZoneAbbr;
        momentPrototype__proto.zoneName = getZoneName;
        momentPrototype__proto.dates = deprecate('dates accessor is deprecated. Use date instead.', getSetDayOfMonth);
        momentPrototype__proto.months = deprecate('months accessor is deprecated. Use month instead', getSetMonth);
        momentPrototype__proto.years = deprecate('years accessor is deprecated. Use year instead', getSetYear);
        momentPrototype__proto.zone = deprecate('moment().zone is deprecated, use moment().utcOffset instead. https://github.com/moment/moment/issues/1779', getSetZone);
        var momentPrototype = momentPrototype__proto;
        function moment__createUnix(input) {
          return local__createLocal(input * 1000);
        }
        function moment__createInZone() {
          return local__createLocal.apply(null, arguments).parseZone();
        }
        var defaultCalendar = {
          sameDay: '[Today at] LT',
          nextDay: '[Tomorrow at] LT',
          nextWeek: 'dddd [at] LT',
          lastDay: '[Yesterday at] LT',
          lastWeek: '[Last] dddd [at] LT',
          sameElse: 'L'
        };
        function locale_calendar__calendar(key, mom, now) {
          var output = this._calendar[key];
          return isFunction(output) ? output.call(mom, now) : output;
        }
        var defaultLongDateFormat = {
          LTS: 'h:mm:ss A',
          LT: 'h:mm A',
          L: 'MM/DD/YYYY',
          LL: 'MMMM D, YYYY',
          LLL: 'MMMM D, YYYY h:mm A',
          LLLL: 'dddd, MMMM D, YYYY h:mm A'
        };
        function longDateFormat(key) {
          var format = this._longDateFormat[key],
              formatUpper = this._longDateFormat[key.toUpperCase()];
          if (format || !formatUpper) {
            return format;
          }
          this._longDateFormat[key] = formatUpper.replace(/MMMM|MM|DD|dddd/g, function(val) {
            return val.slice(1);
          });
          return this._longDateFormat[key];
        }
        var defaultInvalidDate = 'Invalid date';
        function invalidDate() {
          return this._invalidDate;
        }
        var defaultOrdinal = '%d';
        var defaultOrdinalParse = /\d{1,2}/;
        function ordinal(number) {
          return this._ordinal.replace('%d', number);
        }
        function preParsePostFormat(string) {
          return string;
        }
        var defaultRelativeTime = {
          future: 'in %s',
          past: '%s ago',
          s: 'a few seconds',
          m: 'a minute',
          mm: '%d minutes',
          h: 'an hour',
          hh: '%d hours',
          d: 'a day',
          dd: '%d days',
          M: 'a month',
          MM: '%d months',
          y: 'a year',
          yy: '%d years'
        };
        function relative__relativeTime(number, withoutSuffix, string, isFuture) {
          var output = this._relativeTime[string];
          return (isFunction(output)) ? output(number, withoutSuffix, string, isFuture) : output.replace(/%d/i, number);
        }
        function pastFuture(diff, output) {
          var format = this._relativeTime[diff > 0 ? 'future' : 'past'];
          return isFunction(format) ? format(output) : format.replace(/%s/i, output);
        }
        var prototype__proto = Locale.prototype;
        prototype__proto._calendar = defaultCalendar;
        prototype__proto.calendar = locale_calendar__calendar;
        prototype__proto._longDateFormat = defaultLongDateFormat;
        prototype__proto.longDateFormat = longDateFormat;
        prototype__proto._invalidDate = defaultInvalidDate;
        prototype__proto.invalidDate = invalidDate;
        prototype__proto._ordinal = defaultOrdinal;
        prototype__proto.ordinal = ordinal;
        prototype__proto._ordinalParse = defaultOrdinalParse;
        prototype__proto.preparse = preParsePostFormat;
        prototype__proto.postformat = preParsePostFormat;
        prototype__proto._relativeTime = defaultRelativeTime;
        prototype__proto.relativeTime = relative__relativeTime;
        prototype__proto.pastFuture = pastFuture;
        prototype__proto.set = locale_set__set;
        prototype__proto.months = localeMonths;
        prototype__proto._months = defaultLocaleMonths;
        prototype__proto.monthsShort = localeMonthsShort;
        prototype__proto._monthsShort = defaultLocaleMonthsShort;
        prototype__proto.monthsParse = localeMonthsParse;
        prototype__proto._monthsRegex = defaultMonthsRegex;
        prototype__proto.monthsRegex = monthsRegex;
        prototype__proto._monthsShortRegex = defaultMonthsShortRegex;
        prototype__proto.monthsShortRegex = monthsShortRegex;
        prototype__proto.week = localeWeek;
        prototype__proto._week = defaultLocaleWeek;
        prototype__proto.firstDayOfYear = localeFirstDayOfYear;
        prototype__proto.firstDayOfWeek = localeFirstDayOfWeek;
        prototype__proto.weekdays = localeWeekdays;
        prototype__proto._weekdays = defaultLocaleWeekdays;
        prototype__proto.weekdaysMin = localeWeekdaysMin;
        prototype__proto._weekdaysMin = defaultLocaleWeekdaysMin;
        prototype__proto.weekdaysShort = localeWeekdaysShort;
        prototype__proto._weekdaysShort = defaultLocaleWeekdaysShort;
        prototype__proto.weekdaysParse = localeWeekdaysParse;
        prototype__proto._weekdaysRegex = defaultWeekdaysRegex;
        prototype__proto.weekdaysRegex = weekdaysRegex;
        prototype__proto._weekdaysShortRegex = defaultWeekdaysShortRegex;
        prototype__proto.weekdaysShortRegex = weekdaysShortRegex;
        prototype__proto._weekdaysMinRegex = defaultWeekdaysMinRegex;
        prototype__proto.weekdaysMinRegex = weekdaysMinRegex;
        prototype__proto.isPM = localeIsPM;
        prototype__proto._meridiemParse = defaultLocaleMeridiemParse;
        prototype__proto.meridiem = localeMeridiem;
        function lists__get(format, index, field, setter) {
          var locale = locale_locales__getLocale();
          var utc = create_utc__createUTC().set(setter, index);
          return locale[field](utc, format);
        }
        function listMonthsImpl(format, index, field) {
          if (typeof format === 'number') {
            index = format;
            format = undefined;
          }
          format = format || '';
          if (index != null) {
            return lists__get(format, index, field, 'month');
          }
          var i;
          var out = [];
          for (i = 0; i < 12; i++) {
            out[i] = lists__get(format, i, field, 'month');
          }
          return out;
        }
        function listWeekdaysImpl(localeSorted, format, index, field) {
          if (typeof localeSorted === 'boolean') {
            if (typeof format === 'number') {
              index = format;
              format = undefined;
            }
            format = format || '';
          } else {
            format = localeSorted;
            index = format;
            localeSorted = false;
            if (typeof format === 'number') {
              index = format;
              format = undefined;
            }
            format = format || '';
          }
          var locale = locale_locales__getLocale(),
              shift = localeSorted ? locale._week.dow : 0;
          if (index != null) {
            return lists__get(format, (index + shift) % 7, field, 'day');
          }
          var i;
          var out = [];
          for (i = 0; i < 7; i++) {
            out[i] = lists__get(format, (i + shift) % 7, field, 'day');
          }
          return out;
        }
        function lists__listMonths(format, index) {
          return listMonthsImpl(format, index, 'months');
        }
        function lists__listMonthsShort(format, index) {
          return listMonthsImpl(format, index, 'monthsShort');
        }
        function lists__listWeekdays(localeSorted, format, index) {
          return listWeekdaysImpl(localeSorted, format, index, 'weekdays');
        }
        function lists__listWeekdaysShort(localeSorted, format, index) {
          return listWeekdaysImpl(localeSorted, format, index, 'weekdaysShort');
        }
        function lists__listWeekdaysMin(localeSorted, format, index) {
          return listWeekdaysImpl(localeSorted, format, index, 'weekdaysMin');
        }
        locale_locales__getSetGlobalLocale('en', {
          ordinalParse: /\d{1,2}(th|st|nd|rd)/,
          ordinal: function(number) {
            var b = number % 10,
                output = (toInt(number % 100 / 10) === 1) ? 'th' : (b === 1) ? 'st' : (b === 2) ? 'nd' : (b === 3) ? 'rd' : 'th';
            return number + output;
          }
        });
        utils_hooks__hooks.lang = deprecate('moment.lang is deprecated. Use moment.locale instead.', locale_locales__getSetGlobalLocale);
        utils_hooks__hooks.langData = deprecate('moment.langData is deprecated. Use moment.localeData instead.', locale_locales__getLocale);
        var mathAbs = Math.abs;
        function duration_abs__abs() {
          var data = this._data;
          this._milliseconds = mathAbs(this._milliseconds);
          this._days = mathAbs(this._days);
          this._months = mathAbs(this._months);
          data.milliseconds = mathAbs(data.milliseconds);
          data.seconds = mathAbs(data.seconds);
          data.minutes = mathAbs(data.minutes);
          data.hours = mathAbs(data.hours);
          data.months = mathAbs(data.months);
          data.years = mathAbs(data.years);
          return this;
        }
        function duration_add_subtract__addSubtract(duration, input, value, direction) {
          var other = create__createDuration(input, value);
          duration._milliseconds += direction * other._milliseconds;
          duration._days += direction * other._days;
          duration._months += direction * other._months;
          return duration._bubble();
        }
        function duration_add_subtract__add(input, value) {
          return duration_add_subtract__addSubtract(this, input, value, 1);
        }
        function duration_add_subtract__subtract(input, value) {
          return duration_add_subtract__addSubtract(this, input, value, -1);
        }
        function absCeil(number) {
          if (number < 0) {
            return Math.floor(number);
          } else {
            return Math.ceil(number);
          }
        }
        function bubble() {
          var milliseconds = this._milliseconds;
          var days = this._days;
          var months = this._months;
          var data = this._data;
          var seconds,
              minutes,
              hours,
              years,
              monthsFromDays;
          if (!((milliseconds >= 0 && days >= 0 && months >= 0) || (milliseconds <= 0 && days <= 0 && months <= 0))) {
            milliseconds += absCeil(monthsToDays(months) + days) * 864e5;
            days = 0;
            months = 0;
          }
          data.milliseconds = milliseconds % 1000;
          seconds = absFloor(milliseconds / 1000);
          data.seconds = seconds % 60;
          minutes = absFloor(seconds / 60);
          data.minutes = minutes % 60;
          hours = absFloor(minutes / 60);
          data.hours = hours % 24;
          days += absFloor(hours / 24);
          monthsFromDays = absFloor(daysToMonths(days));
          months += monthsFromDays;
          days -= absCeil(monthsToDays(monthsFromDays));
          years = absFloor(months / 12);
          months %= 12;
          data.days = days;
          data.months = months;
          data.years = years;
          return this;
        }
        function daysToMonths(days) {
          return days * 4800 / 146097;
        }
        function monthsToDays(months) {
          return months * 146097 / 4800;
        }
        function as(units) {
          var days;
          var months;
          var milliseconds = this._milliseconds;
          units = normalizeUnits(units);
          if (units === 'month' || units === 'year') {
            days = this._days + milliseconds / 864e5;
            months = this._months + daysToMonths(days);
            return units === 'month' ? months : months / 12;
          } else {
            days = this._days + Math.round(monthsToDays(this._months));
            switch (units) {
              case 'week':
                return days / 7 + milliseconds / 6048e5;
              case 'day':
                return days + milliseconds / 864e5;
              case 'hour':
                return days * 24 + milliseconds / 36e5;
              case 'minute':
                return days * 1440 + milliseconds / 6e4;
              case 'second':
                return days * 86400 + milliseconds / 1000;
              case 'millisecond':
                return Math.floor(days * 864e5) + milliseconds;
              default:
                throw new Error('Unknown unit ' + units);
            }
          }
        }
        function duration_as__valueOf() {
          return (this._milliseconds + this._days * 864e5 + (this._months % 12) * 2592e6 + toInt(this._months / 12) * 31536e6);
        }
        function makeAs(alias) {
          return function() {
            return this.as(alias);
          };
        }
        var asMilliseconds = makeAs('ms');
        var asSeconds = makeAs('s');
        var asMinutes = makeAs('m');
        var asHours = makeAs('h');
        var asDays = makeAs('d');
        var asWeeks = makeAs('w');
        var asMonths = makeAs('M');
        var asYears = makeAs('y');
        function duration_get__get(units) {
          units = normalizeUnits(units);
          return this[units + 's']();
        }
        function makeGetter(name) {
          return function() {
            return this._data[name];
          };
        }
        var milliseconds = makeGetter('milliseconds');
        var seconds = makeGetter('seconds');
        var minutes = makeGetter('minutes');
        var hours = makeGetter('hours');
        var days = makeGetter('days');
        var months = makeGetter('months');
        var years = makeGetter('years');
        function weeks() {
          return absFloor(this.days() / 7);
        }
        var round = Math.round;
        var thresholds = {
          s: 45,
          m: 45,
          h: 22,
          d: 26,
          M: 11
        };
        function substituteTimeAgo(string, number, withoutSuffix, isFuture, locale) {
          return locale.relativeTime(number || 1, !!withoutSuffix, string, isFuture);
        }
        function duration_humanize__relativeTime(posNegDuration, withoutSuffix, locale) {
          var duration = create__createDuration(posNegDuration).abs();
          var seconds = round(duration.as('s'));
          var minutes = round(duration.as('m'));
          var hours = round(duration.as('h'));
          var days = round(duration.as('d'));
          var months = round(duration.as('M'));
          var years = round(duration.as('y'));
          var a = seconds < thresholds.s && ['s', seconds] || minutes <= 1 && ['m'] || minutes < thresholds.m && ['mm', minutes] || hours <= 1 && ['h'] || hours < thresholds.h && ['hh', hours] || days <= 1 && ['d'] || days < thresholds.d && ['dd', days] || months <= 1 && ['M'] || months < thresholds.M && ['MM', months] || years <= 1 && ['y'] || ['yy', years];
          a[2] = withoutSuffix;
          a[3] = +posNegDuration > 0;
          a[4] = locale;
          return substituteTimeAgo.apply(null, a);
        }
        function duration_humanize__getSetRelativeTimeThreshold(threshold, limit) {
          if (thresholds[threshold] === undefined) {
            return false;
          }
          if (limit === undefined) {
            return thresholds[threshold];
          }
          thresholds[threshold] = limit;
          return true;
        }
        function humanize(withSuffix) {
          var locale = this.localeData();
          var output = duration_humanize__relativeTime(this, !withSuffix, locale);
          if (withSuffix) {
            output = locale.pastFuture(+this, output);
          }
          return locale.postformat(output);
        }
        var iso_string__abs = Math.abs;
        function iso_string__toISOString() {
          var seconds = iso_string__abs(this._milliseconds) / 1000;
          var days = iso_string__abs(this._days);
          var months = iso_string__abs(this._months);
          var minutes,
              hours,
              years;
          minutes = absFloor(seconds / 60);
          hours = absFloor(minutes / 60);
          seconds %= 60;
          minutes %= 60;
          years = absFloor(months / 12);
          months %= 12;
          var Y = years;
          var M = months;
          var D = days;
          var h = hours;
          var m = minutes;
          var s = seconds;
          var total = this.asSeconds();
          if (!total) {
            return 'P0D';
          }
          return (total < 0 ? '-' : '') + 'P' + (Y ? Y + 'Y' : '') + (M ? M + 'M' : '') + (D ? D + 'D' : '') + ((h || m || s) ? 'T' : '') + (h ? h + 'H' : '') + (m ? m + 'M' : '') + (s ? s + 'S' : '');
        }
        var duration_prototype__proto = Duration.prototype;
        duration_prototype__proto.abs = duration_abs__abs;
        duration_prototype__proto.add = duration_add_subtract__add;
        duration_prototype__proto.subtract = duration_add_subtract__subtract;
        duration_prototype__proto.as = as;
        duration_prototype__proto.asMilliseconds = asMilliseconds;
        duration_prototype__proto.asSeconds = asSeconds;
        duration_prototype__proto.asMinutes = asMinutes;
        duration_prototype__proto.asHours = asHours;
        duration_prototype__proto.asDays = asDays;
        duration_prototype__proto.asWeeks = asWeeks;
        duration_prototype__proto.asMonths = asMonths;
        duration_prototype__proto.asYears = asYears;
        duration_prototype__proto.valueOf = duration_as__valueOf;
        duration_prototype__proto._bubble = bubble;
        duration_prototype__proto.get = duration_get__get;
        duration_prototype__proto.milliseconds = milliseconds;
        duration_prototype__proto.seconds = seconds;
        duration_prototype__proto.minutes = minutes;
        duration_prototype__proto.hours = hours;
        duration_prototype__proto.days = days;
        duration_prototype__proto.weeks = weeks;
        duration_prototype__proto.months = months;
        duration_prototype__proto.years = years;
        duration_prototype__proto.humanize = humanize;
        duration_prototype__proto.toISOString = iso_string__toISOString;
        duration_prototype__proto.toString = iso_string__toISOString;
        duration_prototype__proto.toJSON = iso_string__toISOString;
        duration_prototype__proto.locale = locale;
        duration_prototype__proto.localeData = localeData;
        duration_prototype__proto.toIsoString = deprecate('toIsoString() is deprecated. Please use toISOString() instead (notice the capitals)', iso_string__toISOString);
        duration_prototype__proto.lang = lang;
        addFormatToken('X', 0, 0, 'unix');
        addFormatToken('x', 0, 0, 'valueOf');
        addRegexToken('x', matchSigned);
        addRegexToken('X', matchTimestamp);
        addParseToken('X', function(input, array, config) {
          config._d = new Date(parseFloat(input, 10) * 1000);
        });
        addParseToken('x', function(input, array, config) {
          config._d = new Date(toInt(input));
        });
        utils_hooks__hooks.version = '2.13.0';
        setHookCallback(local__createLocal);
        utils_hooks__hooks.fn = momentPrototype;
        utils_hooks__hooks.min = min;
        utils_hooks__hooks.max = max;
        utils_hooks__hooks.now = now;
        utils_hooks__hooks.utc = create_utc__createUTC;
        utils_hooks__hooks.unix = moment__createUnix;
        utils_hooks__hooks.months = lists__listMonths;
        utils_hooks__hooks.isDate = isDate;
        utils_hooks__hooks.locale = locale_locales__getSetGlobalLocale;
        utils_hooks__hooks.invalid = valid__createInvalid;
        utils_hooks__hooks.duration = create__createDuration;
        utils_hooks__hooks.isMoment = isMoment;
        utils_hooks__hooks.weekdays = lists__listWeekdays;
        utils_hooks__hooks.parseZone = moment__createInZone;
        utils_hooks__hooks.localeData = locale_locales__getLocale;
        utils_hooks__hooks.isDuration = isDuration;
        utils_hooks__hooks.monthsShort = lists__listMonthsShort;
        utils_hooks__hooks.weekdaysMin = lists__listWeekdaysMin;
        utils_hooks__hooks.defineLocale = defineLocale;
        utils_hooks__hooks.updateLocale = updateLocale;
        utils_hooks__hooks.locales = locale_locales__listLocales;
        utils_hooks__hooks.weekdaysShort = lists__listWeekdaysShort;
        utils_hooks__hooks.normalizeUnits = normalizeUnits;
        utils_hooks__hooks.relativeTimeThreshold = duration_humanize__getSetRelativeTimeThreshold;
        utils_hooks__hooks.prototype = momentPrototype;
        var _moment = utils_hooks__hooks;
        return _moment;
      }));
    }, {}],
    7: [function(require, module, exports) {
      var Chart = require('./core/core')();
      require('./core/core.helpers')(Chart);
      require('./core/core.element')(Chart);
      require('./core/core.animation')(Chart);
      require('./core/core.controller')(Chart);
      require('./core/core.datasetController')(Chart);
      require('./core/core.layoutService')(Chart);
      require('./core/core.legend')(Chart);
      require('./core/core.plugin')(Chart);
      require('./core/core.scale')(Chart);
      require('./core/core.scaleService')(Chart);
      require('./core/core.title')(Chart);
      require('./core/core.tooltip')(Chart);
      require('./elements/element.arc')(Chart);
      require('./elements/element.line')(Chart);
      require('./elements/element.point')(Chart);
      require('./elements/element.rectangle')(Chart);
      require('./scales/scale.category')(Chart);
      require('./scales/scale.linear')(Chart);
      require('./scales/scale.logarithmic')(Chart);
      require('./scales/scale.radialLinear')(Chart);
      require('./scales/scale.time')(Chart);
      require('./controllers/controller.bar')(Chart);
      require('./controllers/controller.bubble')(Chart);
      require('./controllers/controller.doughnut')(Chart);
      require('./controllers/controller.line')(Chart);
      require('./controllers/controller.polarArea')(Chart);
      require('./controllers/controller.radar')(Chart);
      require('./charts/Chart.Bar')(Chart);
      require('./charts/Chart.Bubble')(Chart);
      require('./charts/Chart.Doughnut')(Chart);
      require('./charts/Chart.Line')(Chart);
      require('./charts/Chart.PolarArea')(Chart);
      require('./charts/Chart.Radar')(Chart);
      require('./charts/Chart.Scatter')(Chart);
      window.Chart = module.exports = Chart;
    }, {
      "./charts/Chart.Bar": 8,
      "./charts/Chart.Bubble": 9,
      "./charts/Chart.Doughnut": 10,
      "./charts/Chart.Line": 11,
      "./charts/Chart.PolarArea": 12,
      "./charts/Chart.Radar": 13,
      "./charts/Chart.Scatter": 14,
      "./controllers/controller.bar": 15,
      "./controllers/controller.bubble": 16,
      "./controllers/controller.doughnut": 17,
      "./controllers/controller.line": 18,
      "./controllers/controller.polarArea": 19,
      "./controllers/controller.radar": 20,
      "./core/core.animation": 21,
      "./core/core.controller": 22,
      "./core/core.datasetController": 23,
      "./core/core.element": 24,
      "./core/core.helpers": 25,
      "./core/core.js": 26,
      "./core/core.layoutService": 27,
      "./core/core.legend": 28,
      "./core/core.plugin.js": 29,
      "./core/core.scale": 30,
      "./core/core.scaleService": 31,
      "./core/core.title": 32,
      "./core/core.tooltip": 33,
      "./elements/element.arc": 34,
      "./elements/element.line": 35,
      "./elements/element.point": 36,
      "./elements/element.rectangle": 37,
      "./scales/scale.category": 38,
      "./scales/scale.linear": 39,
      "./scales/scale.logarithmic": 40,
      "./scales/scale.radialLinear": 41,
      "./scales/scale.time": 42
    }],
    8: [function(require, module, exports) {
      "use strict";
      module.exports = function(Chart) {
        Chart.Bar = function(context, config) {
          config.type = 'bar';
          return new Chart(context, config);
        };
      };
    }, {}],
    9: [function(require, module, exports) {
      "use strict";
      module.exports = function(Chart) {
        Chart.Bubble = function(context, config) {
          config.type = 'bubble';
          return new Chart(context, config);
        };
      };
    }, {}],
    10: [function(require, module, exports) {
      "use strict";
      module.exports = function(Chart) {
        Chart.Doughnut = function(context, config) {
          config.type = 'doughnut';
          return new Chart(context, config);
        };
      };
    }, {}],
    11: [function(require, module, exports) {
      "use strict";
      module.exports = function(Chart) {
        Chart.Line = function(context, config) {
          config.type = 'line';
          return new Chart(context, config);
        };
      };
    }, {}],
    12: [function(require, module, exports) {
      "use strict";
      module.exports = function(Chart) {
        Chart.PolarArea = function(context, config) {
          config.type = 'polarArea';
          return new Chart(context, config);
        };
      };
    }, {}],
    13: [function(require, module, exports) {
      "use strict";
      module.exports = function(Chart) {
        Chart.Radar = function(context, config) {
          config.options = Chart.helpers.configMerge({aspectRatio: 1}, config.options);
          config.type = 'radar';
          return new Chart(context, config);
        };
      };
    }, {}],
    14: [function(require, module, exports) {
      "use strict";
      module.exports = function(Chart) {
        var defaultConfig = {
          hover: {mode: 'single'},
          scales: {
            xAxes: [{
              type: "linear",
              position: "bottom",
              id: "x-axis-1"
            }],
            yAxes: [{
              type: "linear",
              position: "left",
              id: "y-axis-1"
            }]
          },
          tooltips: {callbacks: {
              title: function(tooltipItems, data) {
                return '';
              },
              label: function(tooltipItem, data) {
                return '(' + tooltipItem.xLabel + ', ' + tooltipItem.yLabel + ')';
              }
            }}
        };
        Chart.defaults.scatter = defaultConfig;
        Chart.controllers.scatter = Chart.controllers.line;
        Chart.Scatter = function(context, config) {
          config.type = 'scatter';
          return new Chart(context, config);
        };
      };
    }, {}],
    15: [function(require, module, exports) {
      "use strict";
      module.exports = function(Chart) {
        var helpers = Chart.helpers;
        Chart.defaults.bar = {
          hover: {mode: "label"},
          scales: {
            xAxes: [{
              type: "category",
              categoryPercentage: 0.8,
              barPercentage: 0.9,
              gridLines: {offsetGridLines: true}
            }],
            yAxes: [{type: "linear"}]
          }
        };
        Chart.controllers.bar = Chart.DatasetController.extend({
          dataElementType: Chart.elements.Rectangle,
          initialize: function(chart, datasetIndex) {
            Chart.DatasetController.prototype.initialize.call(this, chart, datasetIndex);
            this.getMeta().bar = true;
          },
          getBarCount: function getBarCount() {
            var barCount = 0;
            helpers.each(this.chart.data.datasets, function(dataset, datasetIndex) {
              var meta = this.chart.getDatasetMeta(datasetIndex);
              if (meta.bar && this.chart.isDatasetVisible(datasetIndex)) {
                ++barCount;
              }
            }, this);
            return barCount;
          },
          update: function update(reset) {
            helpers.each(this.getMeta().data, function(rectangle, index) {
              this.updateElement(rectangle, index, reset);
            }, this);
          },
          updateElement: function updateElement(rectangle, index, reset) {
            var meta = this.getMeta();
            var xScale = this.getScaleForId(meta.xAxisID);
            var yScale = this.getScaleForId(meta.yAxisID);
            var scaleBase = yScale.getBasePixel();
            var rectangleElementOptions = this.chart.options.elements.rectangle;
            var custom = rectangle.custom || {};
            var dataset = this.getDataset();
            helpers.extend(rectangle, {
              _xScale: xScale,
              _yScale: yScale,
              _datasetIndex: this.index,
              _index: index,
              _model: {
                x: this.calculateBarX(index, this.index),
                y: reset ? scaleBase : this.calculateBarY(index, this.index),
                label: this.chart.data.labels[index],
                datasetLabel: dataset.label,
                base: reset ? scaleBase : this.calculateBarBase(this.index, index),
                width: this.calculateBarWidth(index),
                backgroundColor: custom.backgroundColor ? custom.backgroundColor : helpers.getValueAtIndexOrDefault(dataset.backgroundColor, index, rectangleElementOptions.backgroundColor),
                borderSkipped: custom.borderSkipped ? custom.borderSkipped : rectangleElementOptions.borderSkipped,
                borderColor: custom.borderColor ? custom.borderColor : helpers.getValueAtIndexOrDefault(dataset.borderColor, index, rectangleElementOptions.borderColor),
                borderWidth: custom.borderWidth ? custom.borderWidth : helpers.getValueAtIndexOrDefault(dataset.borderWidth, index, rectangleElementOptions.borderWidth)
              }
            });
            rectangle.pivot();
          },
          calculateBarBase: function(datasetIndex, index) {
            var meta = this.getMeta();
            var yScale = this.getScaleForId(meta.yAxisID);
            var base = 0;
            if (yScale.options.stacked) {
              var chart = this.chart;
              var datasets = chart.data.datasets;
              var value = datasets[datasetIndex].data[index];
              if (value < 0) {
                for (var i = 0; i < datasetIndex; i++) {
                  var negDS = datasets[i];
                  var negDSMeta = chart.getDatasetMeta(i);
                  if (negDSMeta.bar && negDSMeta.yAxisID === yScale.id && chart.isDatasetVisible(i)) {
                    base += negDS.data[index] < 0 ? negDS.data[index] : 0;
                  }
                }
              } else {
                for (var j = 0; j < datasetIndex; j++) {
                  var posDS = datasets[j];
                  var posDSMeta = chart.getDatasetMeta(j);
                  if (posDSMeta.bar && posDSMeta.yAxisID === yScale.id && chart.isDatasetVisible(j)) {
                    base += posDS.data[index] > 0 ? posDS.data[index] : 0;
                  }
                }
              }
              return yScale.getPixelForValue(base);
            }
            return yScale.getBasePixel();
          },
          getRuler: function(index) {
            var meta = this.getMeta();
            var xScale = this.getScaleForId(meta.xAxisID);
            var datasetCount = this.getBarCount();
            var tickWidth;
            if (xScale.options.type === 'category') {
              tickWidth = xScale.getPixelForTick(index + 1) - xScale.getPixelForTick(index);
            } else {
              tickWidth = xScale.width / xScale.ticks.length;
            }
            var categoryWidth = tickWidth * xScale.options.categoryPercentage;
            var categorySpacing = (tickWidth - (tickWidth * xScale.options.categoryPercentage)) / 2;
            var fullBarWidth = categoryWidth / datasetCount;
            if (xScale.ticks.length !== this.chart.data.labels.length) {
              var perc = xScale.ticks.length / this.chart.data.labels.length;
              fullBarWidth = fullBarWidth * perc;
            }
            var barWidth = fullBarWidth * xScale.options.barPercentage;
            var barSpacing = fullBarWidth - (fullBarWidth * xScale.options.barPercentage);
            return {
              datasetCount: datasetCount,
              tickWidth: tickWidth,
              categoryWidth: categoryWidth,
              categorySpacing: categorySpacing,
              fullBarWidth: fullBarWidth,
              barWidth: barWidth,
              barSpacing: barSpacing
            };
          },
          calculateBarWidth: function(index) {
            var xScale = this.getScaleForId(this.getMeta().xAxisID);
            var ruler = this.getRuler(index);
            return xScale.options.stacked ? ruler.categoryWidth : ruler.barWidth;
          },
          getBarIndex: function(datasetIndex) {
            var barIndex = 0;
            var meta,
                j;
            for (j = 0; j < datasetIndex; ++j) {
              meta = this.chart.getDatasetMeta(j);
              if (meta.bar && this.chart.isDatasetVisible(j)) {
                ++barIndex;
              }
            }
            return barIndex;
          },
          calculateBarX: function(index, datasetIndex) {
            var meta = this.getMeta();
            var xScale = this.getScaleForId(meta.xAxisID);
            var barIndex = this.getBarIndex(datasetIndex);
            var ruler = this.getRuler(index);
            var leftTick = xScale.getPixelForValue(null, index, datasetIndex, this.chart.isCombo);
            leftTick -= this.chart.isCombo ? (ruler.tickWidth / 2) : 0;
            if (xScale.options.stacked) {
              return leftTick + (ruler.categoryWidth / 2) + ruler.categorySpacing;
            }
            return leftTick + (ruler.barWidth / 2) + ruler.categorySpacing + (ruler.barWidth * barIndex) + (ruler.barSpacing / 2) + (ruler.barSpacing * barIndex);
          },
          calculateBarY: function(index, datasetIndex) {
            var meta = this.getMeta();
            var yScale = this.getScaleForId(meta.yAxisID);
            var value = this.getDataset().data[index];
            if (yScale.options.stacked) {
              var sumPos = 0,
                  sumNeg = 0;
              for (var i = 0; i < datasetIndex; i++) {
                var ds = this.chart.data.datasets[i];
                var dsMeta = this.chart.getDatasetMeta(i);
                if (dsMeta.bar && dsMeta.yAxisID === yScale.id && this.chart.isDatasetVisible(i)) {
                  if (ds.data[index] < 0) {
                    sumNeg += ds.data[index] || 0;
                  } else {
                    sumPos += ds.data[index] || 0;
                  }
                }
              }
              if (value < 0) {
                return yScale.getPixelForValue(sumNeg + value);
              } else {
                return yScale.getPixelForValue(sumPos + value);
              }
            }
            return yScale.getPixelForValue(value);
          },
          draw: function(ease) {
            var easingDecimal = ease || 1;
            helpers.each(this.getMeta().data, function(rectangle, index) {
              var d = this.getDataset().data[index];
              if (d !== null && d !== undefined && !isNaN(d)) {
                rectangle.transition(easingDecimal).draw();
              }
            }, this);
          },
          setHoverStyle: function(rectangle) {
            var dataset = this.chart.data.datasets[rectangle._datasetIndex];
            var index = rectangle._index;
            var custom = rectangle.custom || {};
            var model = rectangle._model;
            model.backgroundColor = custom.hoverBackgroundColor ? custom.hoverBackgroundColor : helpers.getValueAtIndexOrDefault(dataset.hoverBackgroundColor, index, helpers.getHoverColor(model.backgroundColor));
            model.borderColor = custom.hoverBorderColor ? custom.hoverBorderColor : helpers.getValueAtIndexOrDefault(dataset.hoverBorderColor, index, helpers.getHoverColor(model.borderColor));
            model.borderWidth = custom.hoverBorderWidth ? custom.hoverBorderWidth : helpers.getValueAtIndexOrDefault(dataset.hoverBorderWidth, index, model.borderWidth);
          },
          removeHoverStyle: function(rectangle) {
            var dataset = this.chart.data.datasets[rectangle._datasetIndex];
            var index = rectangle._index;
            var custom = rectangle.custom || {};
            var model = rectangle._model;
            var rectangleElementOptions = this.chart.options.elements.rectangle;
            model.backgroundColor = custom.backgroundColor ? custom.backgroundColor : helpers.getValueAtIndexOrDefault(dataset.backgroundColor, index, rectangleElementOptions.backgroundColor);
            model.borderColor = custom.borderColor ? custom.borderColor : helpers.getValueAtIndexOrDefault(dataset.borderColor, index, rectangleElementOptions.borderColor);
            model.borderWidth = custom.borderWidth ? custom.borderWidth : helpers.getValueAtIndexOrDefault(dataset.borderWidth, index, rectangleElementOptions.borderWidth);
          }
        });
        Chart.defaults.horizontalBar = {
          hover: {mode: "label"},
          scales: {
            xAxes: [{
              type: "linear",
              position: "bottom"
            }],
            yAxes: [{
              position: "left",
              type: "category",
              categoryPercentage: 0.8,
              barPercentage: 0.9,
              gridLines: {offsetGridLines: true}
            }]
          },
          elements: {rectangle: {borderSkipped: 'left'}},
          tooltips: {callbacks: {
              title: function(tooltipItems, data) {
                var title = '';
                if (tooltipItems.length > 0) {
                  if (tooltipItems[0].yLabel) {
                    title = tooltipItems[0].yLabel;
                  } else if (data.labels.length > 0 && tooltipItems[0].index < data.labels.length) {
                    title = data.labels[tooltipItems[0].index];
                  }
                }
                return title;
              },
              label: function(tooltipItem, data) {
                var datasetLabel = data.datasets[tooltipItem.datasetIndex].label || '';
                return datasetLabel + ': ' + tooltipItem.xLabel;
              }
            }}
        };
        Chart.controllers.horizontalBar = Chart.controllers.bar.extend({
          updateElement: function updateElement(rectangle, index, reset, numBars) {
            var meta = this.getMeta();
            var xScale = this.getScaleForId(meta.xAxisID);
            var yScale = this.getScaleForId(meta.yAxisID);
            var scaleBase = xScale.getBasePixel();
            var custom = rectangle.custom || {};
            var dataset = this.getDataset();
            var rectangleElementOptions = this.chart.options.elements.rectangle;
            helpers.extend(rectangle, {
              _xScale: xScale,
              _yScale: yScale,
              _datasetIndex: this.index,
              _index: index,
              _model: {
                x: reset ? scaleBase : this.calculateBarX(index, this.index),
                y: this.calculateBarY(index, this.index),
                label: this.chart.data.labels[index],
                datasetLabel: dataset.label,
                base: reset ? scaleBase : this.calculateBarBase(this.index, index),
                height: this.calculateBarHeight(index),
                backgroundColor: custom.backgroundColor ? custom.backgroundColor : helpers.getValueAtIndexOrDefault(dataset.backgroundColor, index, rectangleElementOptions.backgroundColor),
                borderSkipped: custom.borderSkipped ? custom.borderSkipped : rectangleElementOptions.borderSkipped,
                borderColor: custom.borderColor ? custom.borderColor : helpers.getValueAtIndexOrDefault(dataset.borderColor, index, rectangleElementOptions.borderColor),
                borderWidth: custom.borderWidth ? custom.borderWidth : helpers.getValueAtIndexOrDefault(dataset.borderWidth, index, rectangleElementOptions.borderWidth)
              },
              draw: function() {
                var ctx = this._chart.ctx;
                var vm = this._view;
                var halfHeight = vm.height / 2,
                    topY = vm.y - halfHeight,
                    bottomY = vm.y + halfHeight,
                    right = vm.base - (vm.base - vm.x),
                    halfStroke = vm.borderWidth / 2;
                if (vm.borderWidth) {
                  topY += halfStroke;
                  bottomY -= halfStroke;
                  right += halfStroke;
                }
                ctx.beginPath();
                ctx.fillStyle = vm.backgroundColor;
                ctx.strokeStyle = vm.borderColor;
                ctx.lineWidth = vm.borderWidth;
                var corners = [[vm.base, bottomY], [vm.base, topY], [right, topY], [right, bottomY]];
                var borders = ['bottom', 'left', 'top', 'right'];
                var startCorner = borders.indexOf(vm.borderSkipped, 0);
                if (startCorner === -1)
                  startCorner = 0;
                function cornerAt(index) {
                  return corners[(startCorner + index) % 4];
                }
                ctx.moveTo.apply(ctx, cornerAt(0));
                for (var i = 1; i < 4; i++)
                  ctx.lineTo.apply(ctx, cornerAt(i));
                ctx.fill();
                if (vm.borderWidth) {
                  ctx.stroke();
                }
              },
              inRange: function(mouseX, mouseY) {
                var vm = this._view;
                var inRange = false;
                if (vm) {
                  if (vm.x < vm.base) {
                    inRange = (mouseY >= vm.y - vm.height / 2 && mouseY <= vm.y + vm.height / 2) && (mouseX >= vm.x && mouseX <= vm.base);
                  } else {
                    inRange = (mouseY >= vm.y - vm.height / 2 && mouseY <= vm.y + vm.height / 2) && (mouseX >= vm.base && mouseX <= vm.x);
                  }
                }
                return inRange;
              }
            });
            rectangle.pivot();
          },
          calculateBarBase: function(datasetIndex, index) {
            var meta = this.getMeta();
            var xScale = this.getScaleForId(meta.xAxisID);
            var base = 0;
            if (xScale.options.stacked) {
              var value = this.chart.data.datasets[datasetIndex].data[index];
              if (value < 0) {
                for (var i = 0; i < datasetIndex; i++) {
                  var negDS = this.chart.data.datasets[i];
                  var negDSMeta = this.chart.getDatasetMeta(i);
                  if (negDSMeta.bar && negDSMeta.xAxisID === xScale.id && this.chart.isDatasetVisible(i)) {
                    base += negDS.data[index] < 0 ? negDS.data[index] : 0;
                  }
                }
              } else {
                for (var j = 0; j < datasetIndex; j++) {
                  var posDS = this.chart.data.datasets[j];
                  var posDSMeta = this.chart.getDatasetMeta(j);
                  if (posDSMeta.bar && posDSMeta.xAxisID === xScale.id && this.chart.isDatasetVisible(j)) {
                    base += posDS.data[index] > 0 ? posDS.data[index] : 0;
                  }
                }
              }
              return xScale.getPixelForValue(base);
            }
            return xScale.getBasePixel();
          },
          getRuler: function(index) {
            var meta = this.getMeta();
            var yScale = this.getScaleForId(meta.yAxisID);
            var datasetCount = this.getBarCount();
            var tickHeight;
            if (yScale.options.type === 'category') {
              tickHeight = yScale.getPixelForTick(index + 1) - yScale.getPixelForTick(index);
            } else {
              tickHeight = yScale.width / yScale.ticks.length;
            }
            var categoryHeight = tickHeight * yScale.options.categoryPercentage;
            var categorySpacing = (tickHeight - (tickHeight * yScale.options.categoryPercentage)) / 2;
            var fullBarHeight = categoryHeight / datasetCount;
            if (yScale.ticks.length !== this.chart.data.labels.length) {
              var perc = yScale.ticks.length / this.chart.data.labels.length;
              fullBarHeight = fullBarHeight * perc;
            }
            var barHeight = fullBarHeight * yScale.options.barPercentage;
            var barSpacing = fullBarHeight - (fullBarHeight * yScale.options.barPercentage);
            return {
              datasetCount: datasetCount,
              tickHeight: tickHeight,
              categoryHeight: categoryHeight,
              categorySpacing: categorySpacing,
              fullBarHeight: fullBarHeight,
              barHeight: barHeight,
              barSpacing: barSpacing
            };
          },
          calculateBarHeight: function(index) {
            var yScale = this.getScaleForId(this.getMeta().yAxisID);
            var ruler = this.getRuler(index);
            return yScale.options.stacked ? ruler.categoryHeight : ruler.barHeight;
          },
          calculateBarX: function(index, datasetIndex) {
            var meta = this.getMeta();
            var xScale = this.getScaleForId(meta.xAxisID);
            var value = this.getDataset().data[index];
            if (xScale.options.stacked) {
              var sumPos = 0,
                  sumNeg = 0;
              for (var i = 0; i < datasetIndex; i++) {
                var ds = this.chart.data.datasets[i];
                var dsMeta = this.chart.getDatasetMeta(i);
                if (dsMeta.bar && dsMeta.xAxisID === xScale.id && this.chart.isDatasetVisible(i)) {
                  if (ds.data[index] < 0) {
                    sumNeg += ds.data[index] || 0;
                  } else {
                    sumPos += ds.data[index] || 0;
                  }
                }
              }
              if (value < 0) {
                return xScale.getPixelForValue(sumNeg + value);
              } else {
                return xScale.getPixelForValue(sumPos + value);
              }
            }
            return xScale.getPixelForValue(value);
          },
          calculateBarY: function(index, datasetIndex) {
            var meta = this.getMeta();
            var yScale = this.getScaleForId(meta.yAxisID);
            var barIndex = this.getBarIndex(datasetIndex);
            var ruler = this.getRuler(index);
            var topTick = yScale.getPixelForValue(null, index, datasetIndex, this.chart.isCombo);
            topTick -= this.chart.isCombo ? (ruler.tickHeight / 2) : 0;
            if (yScale.options.stacked) {
              return topTick + (ruler.categoryHeight / 2) + ruler.categorySpacing;
            }
            return topTick + (ruler.barHeight / 2) + ruler.categorySpacing + (ruler.barHeight * barIndex) + (ruler.barSpacing / 2) + (ruler.barSpacing * barIndex);
          }
        });
      };
    }, {}],
    16: [function(require, module, exports) {
      "use strict";
      module.exports = function(Chart) {
        var helpers = Chart.helpers;
        Chart.defaults.bubble = {
          hover: {mode: "single"},
          scales: {
            xAxes: [{
              type: "linear",
              position: "bottom",
              id: "x-axis-0"
            }],
            yAxes: [{
              type: "linear",
              position: "left",
              id: "y-axis-0"
            }]
          },
          tooltips: {callbacks: {
              title: function(tooltipItems, data) {
                return '';
              },
              label: function(tooltipItem, data) {
                var datasetLabel = data.datasets[tooltipItem.datasetIndex].label || '';
                var dataPoint = data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index];
                return datasetLabel + ': (' + dataPoint.x + ', ' + dataPoint.y + ', ' + dataPoint.r + ')';
              }
            }}
        };
        Chart.controllers.bubble = Chart.DatasetController.extend({
          dataElementType: Chart.elements.Point,
          update: function update(reset) {
            var meta = this.getMeta();
            var points = meta.data;
            helpers.each(points, function(point, index) {
              this.updateElement(point, index, reset);
            }, this);
          },
          updateElement: function(point, index, reset) {
            var meta = this.getMeta();
            var xScale = this.getScaleForId(meta.xAxisID);
            var yScale = this.getScaleForId(meta.yAxisID);
            var custom = point.custom || {};
            var dataset = this.getDataset();
            var data = dataset.data[index];
            var pointElementOptions = this.chart.options.elements.point;
            helpers.extend(point, {
              _xScale: xScale,
              _yScale: yScale,
              _datasetIndex: this.index,
              _index: index,
              _model: {
                x: reset ? xScale.getPixelForDecimal(0.5) : xScale.getPixelForValue(data, index, this.index, this.chart.isCombo),
                y: reset ? yScale.getBasePixel() : yScale.getPixelForValue(data, index, this.index),
                radius: reset ? 0 : custom.radius ? custom.radius : this.getRadius(data),
                backgroundColor: custom.backgroundColor ? custom.backgroundColor : helpers.getValueAtIndexOrDefault(dataset.backgroundColor, index, pointElementOptions.backgroundColor),
                borderColor: custom.borderColor ? custom.borderColor : helpers.getValueAtIndexOrDefault(dataset.borderColor, index, pointElementOptions.borderColor),
                borderWidth: custom.borderWidth ? custom.borderWidth : helpers.getValueAtIndexOrDefault(dataset.borderWidth, index, pointElementOptions.borderWidth),
                hitRadius: custom.hitRadius ? custom.hitRadius : helpers.getValueAtIndexOrDefault(dataset.hitRadius, index, pointElementOptions.hitRadius)
              }
            });
            var model = point._model;
            model.skip = custom.skip ? custom.skip : (isNaN(model.x) || isNaN(model.y));
            point.pivot();
          },
          getRadius: function(value) {
            return value.r || this.chart.options.elements.point.radius;
          },
          setHoverStyle: function(point) {
            var dataset = this.chart.data.datasets[point._datasetIndex];
            var index = point._index;
            var custom = point.custom || {};
            var model = point._model;
            model.radius = custom.hoverRadius ? custom.hoverRadius : (helpers.getValueAtIndexOrDefault(dataset.hoverRadius, index, this.chart.options.elements.point.hoverRadius)) + this.getRadius(this.getDataset().data[point._index]);
            model.backgroundColor = custom.hoverBackgroundColor ? custom.hoverBackgroundColor : helpers.getValueAtIndexOrDefault(dataset.hoverBackgroundColor, index, helpers.getHoverColor(model.backgroundColor));
            model.borderColor = custom.hoverBorderColor ? custom.hoverBorderColor : helpers.getValueAtIndexOrDefault(dataset.hoverBorderColor, index, helpers.getHoverColor(model.borderColor));
            model.borderWidth = custom.hoverBorderWidth ? custom.hoverBorderWidth : helpers.getValueAtIndexOrDefault(dataset.hoverBorderWidth, index, model.borderWidth);
          },
          removeHoverStyle: function(point) {
            var dataset = this.chart.data.datasets[point._datasetIndex];
            var index = point._index;
            var custom = point.custom || {};
            var model = point._model;
            var pointElementOptions = this.chart.options.elements.point;
            model.radius = custom.radius ? custom.radius : this.getRadius(dataset.data[point._index]);
            model.backgroundColor = custom.backgroundColor ? custom.backgroundColor : helpers.getValueAtIndexOrDefault(dataset.backgroundColor, index, pointElementOptions.backgroundColor);
            model.borderColor = custom.borderColor ? custom.borderColor : helpers.getValueAtIndexOrDefault(dataset.borderColor, index, pointElementOptions.borderColor);
            model.borderWidth = custom.borderWidth ? custom.borderWidth : helpers.getValueAtIndexOrDefault(dataset.borderWidth, index, pointElementOptions.borderWidth);
          }
        });
      };
    }, {}],
    17: [function(require, module, exports) {
      "use strict";
      module.exports = function(Chart) {
        var helpers = Chart.helpers,
            defaults = Chart.defaults;
        defaults.doughnut = {
          animation: {
            animateRotate: true,
            animateScale: false
          },
          aspectRatio: 1,
          hover: {mode: 'single'},
          legendCallback: function(chart) {
            var text = [];
            text.push('<ul class="' + chart.id + '-legend">');
            var data = chart.data;
            var datasets = data.datasets;
            var labels = data.labels;
            if (datasets.length) {
              for (var i = 0; i < datasets[0].data.length; ++i) {
                text.push('<li><span style="background-color:' + datasets[0].backgroundColor[i] + '"></span>');
                if (labels[i]) {
                  text.push(labels[i]);
                }
                text.push('</li>');
              }
            }
            text.push('</ul>');
            return text.join("");
          },
          legend: {
            labels: {generateLabels: function(chart) {
                var data = chart.data;
                if (data.labels.length && data.datasets.length) {
                  return data.labels.map(function(label, i) {
                    var meta = chart.getDatasetMeta(0);
                    var ds = data.datasets[0];
                    var arc = meta.data[i];
                    var custom = arc.custom || {};
                    var getValueAtIndexOrDefault = helpers.getValueAtIndexOrDefault;
                    var arcOpts = chart.options.elements.arc;
                    var fill = custom.backgroundColor ? custom.backgroundColor : getValueAtIndexOrDefault(ds.backgroundColor, i, arcOpts.backgroundColor);
                    var stroke = custom.borderColor ? custom.borderColor : getValueAtIndexOrDefault(ds.borderColor, i, arcOpts.borderColor);
                    var bw = custom.borderWidth ? custom.borderWidth : getValueAtIndexOrDefault(ds.borderWidth, i, arcOpts.borderWidth);
                    return {
                      text: label,
                      fillStyle: fill,
                      strokeStyle: stroke,
                      lineWidth: bw,
                      hidden: isNaN(ds.data[i]) || meta.data[i].hidden,
                      index: i
                    };
                  });
                } else {
                  return [];
                }
              }},
            onClick: function(e, legendItem) {
              var index = legendItem.index;
              var chart = this.chart;
              var i,
                  ilen,
                  meta;
              for (i = 0, ilen = (chart.data.datasets || []).length; i < ilen; ++i) {
                meta = chart.getDatasetMeta(i);
                meta.data[index].hidden = !meta.data[index].hidden;
              }
              chart.update();
            }
          },
          cutoutPercentage: 50,
          rotation: Math.PI * -0.5,
          circumference: Math.PI * 2.0,
          tooltips: {callbacks: {
              title: function() {
                return '';
              },
              label: function(tooltipItem, data) {
                return data.labels[tooltipItem.index] + ': ' + data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index];
              }
            }}
        };
        defaults.pie = helpers.clone(defaults.doughnut);
        helpers.extend(defaults.pie, {cutoutPercentage: 0});
        Chart.controllers.doughnut = Chart.controllers.pie = Chart.DatasetController.extend({
          dataElementType: Chart.elements.Arc,
          linkScales: helpers.noop,
          getRingIndex: function getRingIndex(datasetIndex) {
            var ringIndex = 0;
            for (var j = 0; j < datasetIndex; ++j) {
              if (this.chart.isDatasetVisible(j)) {
                ++ringIndex;
              }
            }
            return ringIndex;
          },
          update: function update(reset) {
            var _this = this;
            var chart = _this.chart,
                chartArea = chart.chartArea,
                opts = chart.options,
                arcOpts = opts.elements.arc,
                availableWidth = chartArea.right - chartArea.left - arcOpts.borderWidth,
                availableHeight = chartArea.bottom - chartArea.top - arcOpts.borderWidth,
                minSize = Math.min(availableWidth, availableHeight),
                offset = {
                  x: 0,
                  y: 0
                },
                meta = _this.getMeta(),
                cutoutPercentage = opts.cutoutPercentage,
                circumference = opts.circumference;
            if (circumference < Math.PI * 2.0) {
              var startAngle = opts.rotation % (Math.PI * 2.0);
              startAngle += Math.PI * 2.0 * (startAngle >= Math.PI ? -1 : startAngle < -Math.PI ? 1 : 0);
              var endAngle = startAngle + circumference;
              var start = {
                x: Math.cos(startAngle),
                y: Math.sin(startAngle)
              };
              var end = {
                x: Math.cos(endAngle),
                y: Math.sin(endAngle)
              };
              var contains0 = (startAngle <= 0 && 0 <= endAngle) || (startAngle <= Math.PI * 2.0 && Math.PI * 2.0 <= endAngle);
              var contains90 = (startAngle <= Math.PI * 0.5 && Math.PI * 0.5 <= endAngle) || (startAngle <= Math.PI * 2.5 && Math.PI * 2.5 <= endAngle);
              var contains180 = (startAngle <= -Math.PI && -Math.PI <= endAngle) || (startAngle <= Math.PI && Math.PI <= endAngle);
              var contains270 = (startAngle <= -Math.PI * 0.5 && -Math.PI * 0.5 <= endAngle) || (startAngle <= Math.PI * 1.5 && Math.PI * 1.5 <= endAngle);
              var cutout = cutoutPercentage / 100.0;
              var min = {
                x: contains180 ? -1 : Math.min(start.x * (start.x < 0 ? 1 : cutout), end.x * (end.x < 0 ? 1 : cutout)),
                y: contains270 ? -1 : Math.min(start.y * (start.y < 0 ? 1 : cutout), end.y * (end.y < 0 ? 1 : cutout))
              };
              var max = {
                x: contains0 ? 1 : Math.max(start.x * (start.x > 0 ? 1 : cutout), end.x * (end.x > 0 ? 1 : cutout)),
                y: contains90 ? 1 : Math.max(start.y * (start.y > 0 ? 1 : cutout), end.y * (end.y > 0 ? 1 : cutout))
              };
              var size = {
                width: (max.x - min.x) * 0.5,
                height: (max.y - min.y) * 0.5
              };
              minSize = Math.min(availableWidth / size.width, availableHeight / size.height);
              offset = {
                x: (max.x + min.x) * -0.5,
                y: (max.y + min.y) * -0.5
              };
            }
            chart.outerRadius = Math.max(minSize / 2, 0);
            chart.innerRadius = Math.max(cutoutPercentage ? (chart.outerRadius / 100) * (cutoutPercentage) : 1, 0);
            chart.radiusLength = (chart.outerRadius - chart.innerRadius) / chart.getVisibleDatasetCount();
            chart.offsetX = offset.x * chart.outerRadius;
            chart.offsetY = offset.y * chart.outerRadius;
            meta.total = _this.calculateTotal();
            _this.outerRadius = chart.outerRadius - (chart.radiusLength * _this.getRingIndex(_this.index));
            _this.innerRadius = _this.outerRadius - chart.radiusLength;
            helpers.each(meta.data, function(arc, index) {
              _this.updateElement(arc, index, reset);
            });
          },
          updateElement: function(arc, index, reset) {
            var _this = this;
            var chart = _this.chart,
                chartArea = chart.chartArea,
                opts = chart.options,
                animationOpts = opts.animation,
                arcOpts = opts.elements.arc,
                centerX = (chartArea.left + chartArea.right) / 2,
                centerY = (chartArea.top + chartArea.bottom) / 2,
                startAngle = opts.rotation,
                endAngle = opts.rotation,
                dataset = _this.getDataset(),
                circumference = reset && animationOpts.animateRotate ? 0 : arc.hidden ? 0 : _this.calculateCircumference(dataset.data[index]) * (opts.circumference / (2.0 * Math.PI)),
                innerRadius = reset && animationOpts.animateScale ? 0 : _this.innerRadius,
                outerRadius = reset && animationOpts.animateScale ? 0 : _this.outerRadius,
                custom = arc.custom || {},
                valueAtIndexOrDefault = helpers.getValueAtIndexOrDefault;
            helpers.extend(arc, {
              _datasetIndex: _this.index,
              _index: index,
              _model: {
                x: centerX + chart.offsetX,
                y: centerY + chart.offsetY,
                startAngle: startAngle,
                endAngle: endAngle,
                circumference: circumference,
                outerRadius: outerRadius,
                innerRadius: innerRadius,
                label: valueAtIndexOrDefault(dataset.label, index, chart.data.labels[index])
              }
            });
            var model = arc._model;
            model.backgroundColor = custom.backgroundColor ? custom.backgroundColor : valueAtIndexOrDefault(dataset.backgroundColor, index, arcOpts.backgroundColor);
            model.hoverBackgroundColor = custom.hoverBackgroundColor ? custom.hoverBackgroundColor : valueAtIndexOrDefault(dataset.hoverBackgroundColor, index, arcOpts.hoverBackgroundColor);
            model.borderWidth = custom.borderWidth ? custom.borderWidth : valueAtIndexOrDefault(dataset.borderWidth, index, arcOpts.borderWidth);
            model.borderColor = custom.borderColor ? custom.borderColor : valueAtIndexOrDefault(dataset.borderColor, index, arcOpts.borderColor);
            if (!reset || !animationOpts.animateRotate) {
              if (index === 0) {
                model.startAngle = opts.rotation;
              } else {
                model.startAngle = _this.getMeta().data[index - 1]._model.endAngle;
              }
              model.endAngle = model.startAngle + model.circumference;
            }
            arc.pivot();
          },
          removeHoverStyle: function(arc) {
            Chart.DatasetController.prototype.removeHoverStyle.call(this, arc, this.chart.options.elements.arc);
          },
          calculateTotal: function() {
            var dataset = this.getDataset();
            var meta = this.getMeta();
            var total = 0;
            var value;
            helpers.each(meta.data, function(element, index) {
              value = dataset.data[index];
              if (!isNaN(value) && !element.hidden) {
                total += Math.abs(value);
              }
            });
            return total;
          },
          calculateCircumference: function(value) {
            var total = this.getMeta().total;
            if (total > 0 && !isNaN(value)) {
              return (Math.PI * 2.0) * (value / total);
            } else {
              return 0;
            }
          }
        });
      };
    }, {}],
    18: [function(require, module, exports) {
      "use strict";
      module.exports = function(Chart) {
        var helpers = Chart.helpers;
        Chart.defaults.line = {
          showLines: true,
          hover: {mode: "label"},
          scales: {
            xAxes: [{
              type: "category",
              id: 'x-axis-0'
            }],
            yAxes: [{
              type: "linear",
              id: 'y-axis-0'
            }]
          }
        };
        Chart.controllers.line = Chart.DatasetController.extend({
          datasetElementType: Chart.elements.Line,
          dataElementType: Chart.elements.Point,
          addElementAndReset: function(index) {
            var me = this;
            var options = me.chart.options;
            Chart.DatasetController.prototype.addElementAndReset.call(me, index);
            if (options.showLines && options.elements.line.tension !== 0) {
              me.updateBezierControlPoints();
            }
          },
          update: function update(reset) {
            var me = this;
            var meta = me.getMeta();
            var line = meta.dataset;
            var points = meta.data || [];
            var options = me.chart.options;
            var lineElementOptions = options.elements.line;
            var scale = me.getScaleForId(meta.yAxisID);
            var i,
                ilen,
                dataset,
                custom;
            if (options.showLines) {
              dataset = me.getDataset();
              custom = line.custom || {};
              if ((dataset.tension !== undefined) && (dataset.lineTension === undefined)) {
                dataset.lineTension = dataset.tension;
              }
              line._scale = scale;
              line._datasetIndex = me.index;
              line._children = points;
              line._model = {
                tension: custom.tension ? custom.tension : helpers.getValueOrDefault(dataset.lineTension, lineElementOptions.tension),
                backgroundColor: custom.backgroundColor ? custom.backgroundColor : (dataset.backgroundColor || lineElementOptions.backgroundColor),
                borderWidth: custom.borderWidth ? custom.borderWidth : (dataset.borderWidth || lineElementOptions.borderWidth),
                borderColor: custom.borderColor ? custom.borderColor : (dataset.borderColor || lineElementOptions.borderColor),
                borderCapStyle: custom.borderCapStyle ? custom.borderCapStyle : (dataset.borderCapStyle || lineElementOptions.borderCapStyle),
                borderDash: custom.borderDash ? custom.borderDash : (dataset.borderDash || lineElementOptions.borderDash),
                borderDashOffset: custom.borderDashOffset ? custom.borderDashOffset : (dataset.borderDashOffset || lineElementOptions.borderDashOffset),
                borderJoinStyle: custom.borderJoinStyle ? custom.borderJoinStyle : (dataset.borderJoinStyle || lineElementOptions.borderJoinStyle),
                fill: custom.fill ? custom.fill : (dataset.fill !== undefined ? dataset.fill : lineElementOptions.fill),
                scaleTop: scale.top,
                scaleBottom: scale.bottom,
                scaleZero: scale.getBasePixel()
              };
              line.pivot();
            }
            for (i = 0, ilen = points.length; i < ilen; ++i) {
              me.updateElement(points[i], i, reset);
            }
            if (options.showLines && lineElementOptions.tension !== 0) {
              me.updateBezierControlPoints();
            }
          },
          getPointBackgroundColor: function(point, index) {
            var backgroundColor = this.chart.options.elements.point.backgroundColor;
            var dataset = this.getDataset();
            var custom = point.custom || {};
            if (custom.backgroundColor) {
              backgroundColor = custom.backgroundColor;
            } else if (dataset.pointBackgroundColor) {
              backgroundColor = helpers.getValueAtIndexOrDefault(dataset.pointBackgroundColor, index, backgroundColor);
            } else if (dataset.backgroundColor) {
              backgroundColor = dataset.backgroundColor;
            }
            return backgroundColor;
          },
          getPointBorderColor: function(point, index) {
            var borderColor = this.chart.options.elements.point.borderColor;
            var dataset = this.getDataset();
            var custom = point.custom || {};
            if (custom.borderColor) {
              borderColor = custom.borderColor;
            } else if (dataset.pointBorderColor) {
              borderColor = helpers.getValueAtIndexOrDefault(dataset.pointBorderColor, index, borderColor);
            } else if (dataset.borderColor) {
              borderColor = dataset.borderColor;
            }
            return borderColor;
          },
          getPointBorderWidth: function(point, index) {
            var borderWidth = this.chart.options.elements.point.borderWidth;
            var dataset = this.getDataset();
            var custom = point.custom || {};
            if (custom.borderWidth) {
              borderWidth = custom.borderWidth;
            } else if (dataset.pointBorderWidth) {
              borderWidth = helpers.getValueAtIndexOrDefault(dataset.pointBorderWidth, index, borderWidth);
            } else if (dataset.borderWidth) {
              borderWidth = dataset.borderWidth;
            }
            return borderWidth;
          },
          updateElement: function(point, index, reset) {
            var me = this;
            var meta = me.getMeta();
            var custom = point.custom || {};
            var dataset = me.getDataset();
            var datasetIndex = me.index;
            var value = dataset.data[index];
            var yScale = me.getScaleForId(meta.yAxisID);
            var xScale = me.getScaleForId(meta.xAxisID);
            var pointOptions = me.chart.options.elements.point;
            var x,
                y;
            if ((dataset.radius !== undefined) && (dataset.pointRadius === undefined)) {
              dataset.pointRadius = dataset.radius;
            }
            if ((dataset.hitRadius !== undefined) && (dataset.pointHitRadius === undefined)) {
              dataset.pointHitRadius = dataset.hitRadius;
            }
            x = xScale.getPixelForValue(value, index, datasetIndex, me.chart.isCombo);
            y = reset ? yScale.getBasePixel() : me.calculatePointY(value, index, datasetIndex, me.chart.isCombo);
            point._xScale = xScale;
            point._yScale = yScale;
            point._datasetIndex = datasetIndex;
            point._index = index;
            point._model = {
              x: x,
              y: y,
              skip: custom.skip || isNaN(x) || isNaN(y),
              radius: custom.radius || helpers.getValueAtIndexOrDefault(dataset.pointRadius, index, pointOptions.radius),
              pointStyle: custom.pointStyle || helpers.getValueAtIndexOrDefault(dataset.pointStyle, index, pointOptions.pointStyle),
              backgroundColor: me.getPointBackgroundColor(point, index),
              borderColor: me.getPointBorderColor(point, index),
              borderWidth: me.getPointBorderWidth(point, index),
              tension: meta.dataset._model ? meta.dataset._model.tension : 0,
              hitRadius: custom.hitRadius || helpers.getValueAtIndexOrDefault(dataset.pointHitRadius, index, pointOptions.hitRadius)
            };
          },
          calculatePointY: function(value, index, datasetIndex, isCombo) {
            var me = this;
            var chart = me.chart;
            var meta = me.getMeta();
            var yScale = me.getScaleForId(meta.yAxisID);
            var sumPos = 0;
            var sumNeg = 0;
            var i,
                ds,
                dsMeta;
            if (yScale.options.stacked) {
              for (i = 0; i < datasetIndex; i++) {
                ds = chart.data.datasets[i];
                dsMeta = chart.getDatasetMeta(i);
                if (dsMeta.type === 'line' && chart.isDatasetVisible(i)) {
                  if (ds.data[index] < 0) {
                    sumNeg += ds.data[index] || 0;
                  } else {
                    sumPos += ds.data[index] || 0;
                  }
                }
              }
              if (value < 0) {
                return yScale.getPixelForValue(sumNeg + value);
              } else {
                return yScale.getPixelForValue(sumPos + value);
              }
            }
            return yScale.getPixelForValue(value);
          },
          updateBezierControlPoints: function() {
            var meta = this.getMeta();
            var area = this.chart.chartArea;
            var points = meta.data || [];
            var i,
                ilen,
                point,
                model,
                controlPoints;
            for (i = 0, ilen = points.length; i < ilen; ++i) {
              point = points[i];
              model = point._model;
              controlPoints = helpers.splineCurve(helpers.previousItem(points, i)._model, model, helpers.nextItem(points, i)._model, meta.dataset._model.tension);
              model.controlPointPreviousX = Math.max(Math.min(controlPoints.previous.x, area.right), area.left);
              model.controlPointPreviousY = Math.max(Math.min(controlPoints.previous.y, area.bottom), area.top);
              model.controlPointNextX = Math.max(Math.min(controlPoints.next.x, area.right), area.left);
              model.controlPointNextY = Math.max(Math.min(controlPoints.next.y, area.bottom), area.top);
              point.pivot();
            }
          },
          draw: function(ease) {
            var meta = this.getMeta();
            var points = meta.data || [];
            var easingDecimal = ease || 1;
            var i,
                ilen;
            for (i = 0, ilen = points.length; i < ilen; ++i) {
              points[i].transition(easingDecimal);
            }
            if (this.chart.options.showLines) {
              meta.dataset.transition(easingDecimal).draw();
            }
            for (i = 0, ilen = points.length; i < ilen; ++i) {
              points[i].draw();
            }
          },
          setHoverStyle: function(point) {
            var dataset = this.chart.data.datasets[point._datasetIndex];
            var index = point._index;
            var custom = point.custom || {};
            var model = point._model;
            model.radius = custom.hoverRadius || helpers.getValueAtIndexOrDefault(dataset.pointHoverRadius, index, this.chart.options.elements.point.hoverRadius);
            model.backgroundColor = custom.hoverBackgroundColor || helpers.getValueAtIndexOrDefault(dataset.pointHoverBackgroundColor, index, helpers.getHoverColor(model.backgroundColor));
            model.borderColor = custom.hoverBorderColor || helpers.getValueAtIndexOrDefault(dataset.pointHoverBorderColor, index, helpers.getHoverColor(model.borderColor));
            model.borderWidth = custom.hoverBorderWidth || helpers.getValueAtIndexOrDefault(dataset.pointHoverBorderWidth, index, model.borderWidth);
          },
          removeHoverStyle: function(point) {
            var me = this;
            var dataset = me.chart.data.datasets[point._datasetIndex];
            var index = point._index;
            var custom = point.custom || {};
            var model = point._model;
            if ((dataset.radius !== undefined) && (dataset.pointRadius === undefined)) {
              dataset.pointRadius = dataset.radius;
            }
            model.radius = custom.radius || helpers.getValueAtIndexOrDefault(dataset.pointRadius, index, me.chart.options.elements.point.radius);
            model.backgroundColor = me.getPointBackgroundColor(point, index);
            model.borderColor = me.getPointBorderColor(point, index);
            model.borderWidth = me.getPointBorderWidth(point, index);
          }
        });
      };
    }, {}],
    19: [function(require, module, exports) {
      "use strict";
      module.exports = function(Chart) {
        var helpers = Chart.helpers;
        Chart.defaults.polarArea = {
          scale: {
            type: "radialLinear",
            lineArc: true
          },
          animation: {
            animateRotate: true,
            animateScale: true
          },
          aspectRatio: 1,
          legendCallback: function(chart) {
            var text = [];
            text.push('<ul class="' + chart.id + '-legend">');
            var data = chart.data;
            var datasets = data.datasets;
            var labels = data.labels;
            if (datasets.length) {
              for (var i = 0; i < datasets[0].data.length; ++i) {
                text.push('<li><span style="background-color:' + datasets[0].backgroundColor[i] + '">');
                if (labels[i]) {
                  text.push(labels[i]);
                }
                text.push('</span></li>');
              }
            }
            text.push('</ul>');
            return text.join("");
          },
          legend: {
            labels: {generateLabels: function(chart) {
                var data = chart.data;
                if (data.labels.length && data.datasets.length) {
                  return data.labels.map(function(label, i) {
                    var meta = chart.getDatasetMeta(0);
                    var ds = data.datasets[0];
                    var arc = meta.data[i];
                    var custom = arc.custom || {};
                    var getValueAtIndexOrDefault = helpers.getValueAtIndexOrDefault;
                    var arcOpts = chart.options.elements.arc;
                    var fill = custom.backgroundColor ? custom.backgroundColor : getValueAtIndexOrDefault(ds.backgroundColor, i, arcOpts.backgroundColor);
                    var stroke = custom.borderColor ? custom.borderColor : getValueAtIndexOrDefault(ds.borderColor, i, arcOpts.borderColor);
                    var bw = custom.borderWidth ? custom.borderWidth : getValueAtIndexOrDefault(ds.borderWidth, i, arcOpts.borderWidth);
                    return {
                      text: label,
                      fillStyle: fill,
                      strokeStyle: stroke,
                      lineWidth: bw,
                      hidden: isNaN(ds.data[i]) || meta.data[i].hidden,
                      index: i
                    };
                  });
                } else {
                  return [];
                }
              }},
            onClick: function(e, legendItem) {
              var index = legendItem.index;
              var chart = this.chart;
              var i,
                  ilen,
                  meta;
              for (i = 0, ilen = (chart.data.datasets || []).length; i < ilen; ++i) {
                meta = chart.getDatasetMeta(i);
                meta.data[index].hidden = !meta.data[index].hidden;
              }
              chart.update();
            }
          },
          tooltips: {callbacks: {
              title: function() {
                return '';
              },
              label: function(tooltipItem, data) {
                return data.labels[tooltipItem.index] + ': ' + tooltipItem.yLabel;
              }
            }}
        };
        Chart.controllers.polarArea = Chart.DatasetController.extend({
          dataElementType: Chart.elements.Arc,
          linkScales: helpers.noop,
          update: function update(reset) {
            var _this = this;
            var chart = _this.chart;
            var chartArea = chart.chartArea;
            var meta = this.getMeta();
            var opts = chart.options;
            var arcOpts = opts.elements.arc;
            var minSize = Math.min(chartArea.right - chartArea.left, chartArea.bottom - chartArea.top);
            chart.outerRadius = Math.max((minSize - arcOpts.borderWidth / 2) / 2, 0);
            chart.innerRadius = Math.max(opts.cutoutPercentage ? (chart.outerRadius / 100) * (opts.cutoutPercentage) : 1, 0);
            chart.radiusLength = (chart.outerRadius - chart.innerRadius) / chart.getVisibleDatasetCount();
            _this.outerRadius = chart.outerRadius - (chart.radiusLength * _this.index);
            _this.innerRadius = _this.outerRadius - chart.radiusLength;
            meta.count = _this.countVisibleElements();
            helpers.each(meta.data, function(arc, index) {
              _this.updateElement(arc, index, reset);
            });
          },
          updateElement: function(arc, index, reset) {
            var _this = this;
            var chart = _this.chart;
            var chartArea = chart.chartArea;
            var dataset = _this.getDataset();
            var opts = chart.options;
            var animationOpts = opts.animation;
            var arcOpts = opts.elements.arc;
            var custom = arc.custom || {};
            var scale = chart.scale;
            var getValueAtIndexOrDefault = helpers.getValueAtIndexOrDefault;
            var labels = chart.data.labels;
            var circumference = _this.calculateCircumference(dataset.data[index]);
            var centerX = (chartArea.left + chartArea.right) / 2;
            var centerY = (chartArea.top + chartArea.bottom) / 2;
            var visibleCount = 0;
            var meta = _this.getMeta();
            for (var i = 0; i < index; ++i) {
              if (!isNaN(dataset.data[i]) && !meta.data[i].hidden) {
                ++visibleCount;
              }
            }
            var distance = arc.hidden ? 0 : scale.getDistanceFromCenterForValue(dataset.data[index]);
            var startAngle = (-0.5 * Math.PI) + (circumference * visibleCount);
            var endAngle = startAngle + (arc.hidden ? 0 : circumference);
            var resetModel = {
              x: centerX,
              y: centerY,
              innerRadius: 0,
              outerRadius: animationOpts.animateScale ? 0 : scale.getDistanceFromCenterForValue(dataset.data[index]),
              startAngle: animationOpts.animateRotate ? Math.PI * -0.5 : startAngle,
              endAngle: animationOpts.animateRotate ? Math.PI * -0.5 : endAngle,
              backgroundColor: custom.backgroundColor ? custom.backgroundColor : getValueAtIndexOrDefault(dataset.backgroundColor, index, arcOpts.backgroundColor),
              borderWidth: custom.borderWidth ? custom.borderWidth : getValueAtIndexOrDefault(dataset.borderWidth, index, arcOpts.borderWidth),
              borderColor: custom.borderColor ? custom.borderColor : getValueAtIndexOrDefault(dataset.borderColor, index, arcOpts.borderColor),
              label: getValueAtIndexOrDefault(labels, index, labels[index])
            };
            helpers.extend(arc, {
              _datasetIndex: _this.index,
              _index: index,
              _scale: scale,
              _model: reset ? resetModel : {
                x: centerX,
                y: centerY,
                innerRadius: 0,
                outerRadius: distance,
                startAngle: startAngle,
                endAngle: endAngle,
                backgroundColor: custom.backgroundColor ? custom.backgroundColor : getValueAtIndexOrDefault(dataset.backgroundColor, index, arcOpts.backgroundColor),
                borderWidth: custom.borderWidth ? custom.borderWidth : getValueAtIndexOrDefault(dataset.borderWidth, index, arcOpts.borderWidth),
                borderColor: custom.borderColor ? custom.borderColor : getValueAtIndexOrDefault(dataset.borderColor, index, arcOpts.borderColor),
                label: getValueAtIndexOrDefault(labels, index, labels[index])
              }
            });
            arc.pivot();
          },
          removeHoverStyle: function(arc) {
            Chart.DatasetController.prototype.removeHoverStyle.call(this, arc, this.chart.options.elements.arc);
          },
          countVisibleElements: function() {
            var dataset = this.getDataset();
            var meta = this.getMeta();
            var count = 0;
            helpers.each(meta.data, function(element, index) {
              if (!isNaN(dataset.data[index]) && !element.hidden) {
                count++;
              }
            });
            return count;
          },
          calculateCircumference: function(value) {
            var count = this.getMeta().count;
            if (count > 0 && !isNaN(value)) {
              return (2 * Math.PI) / count;
            } else {
              return 0;
            }
          }
        });
      };
    }, {}],
    20: [function(require, module, exports) {
      "use strict";
      module.exports = function(Chart) {
        var helpers = Chart.helpers;
        Chart.defaults.radar = {
          scale: {type: "radialLinear"},
          elements: {line: {tension: 0}}
        };
        Chart.controllers.radar = Chart.DatasetController.extend({
          datasetElementType: Chart.elements.Line,
          dataElementType: Chart.elements.Point,
          linkScales: helpers.noop,
          addElementAndReset: function(index) {
            Chart.DatasetController.prototype.addElementAndReset.call(this, index);
            this.updateBezierControlPoints();
          },
          update: function update(reset) {
            var meta = this.getMeta();
            var line = meta.dataset;
            var points = meta.data;
            var custom = line.custom || {};
            var dataset = this.getDataset();
            var lineElementOptions = this.chart.options.elements.line;
            var scale = this.chart.scale;
            if ((dataset.tension !== undefined) && (dataset.lineTension === undefined)) {
              dataset.lineTension = dataset.tension;
            }
            helpers.extend(meta.dataset, {
              _datasetIndex: this.index,
              _children: points,
              _loop: true,
              _model: {
                tension: custom.tension ? custom.tension : helpers.getValueOrDefault(dataset.lineTension, lineElementOptions.tension),
                backgroundColor: custom.backgroundColor ? custom.backgroundColor : (dataset.backgroundColor || lineElementOptions.backgroundColor),
                borderWidth: custom.borderWidth ? custom.borderWidth : (dataset.borderWidth || lineElementOptions.borderWidth),
                borderColor: custom.borderColor ? custom.borderColor : (dataset.borderColor || lineElementOptions.borderColor),
                fill: custom.fill ? custom.fill : (dataset.fill !== undefined ? dataset.fill : lineElementOptions.fill),
                borderCapStyle: custom.borderCapStyle ? custom.borderCapStyle : (dataset.borderCapStyle || lineElementOptions.borderCapStyle),
                borderDash: custom.borderDash ? custom.borderDash : (dataset.borderDash || lineElementOptions.borderDash),
                borderDashOffset: custom.borderDashOffset ? custom.borderDashOffset : (dataset.borderDashOffset || lineElementOptions.borderDashOffset),
                borderJoinStyle: custom.borderJoinStyle ? custom.borderJoinStyle : (dataset.borderJoinStyle || lineElementOptions.borderJoinStyle),
                scaleTop: scale.top,
                scaleBottom: scale.bottom,
                scaleZero: scale.getBasePosition()
              }
            });
            meta.dataset.pivot();
            helpers.each(points, function(point, index) {
              this.updateElement(point, index, reset);
            }, this);
            this.updateBezierControlPoints();
          },
          updateElement: function(point, index, reset) {
            var custom = point.custom || {};
            var dataset = this.getDataset();
            var scale = this.chart.scale;
            var pointElementOptions = this.chart.options.elements.point;
            var pointPosition = scale.getPointPositionForValue(index, dataset.data[index]);
            helpers.extend(point, {
              _datasetIndex: this.index,
              _index: index,
              _scale: scale,
              _model: {
                x: reset ? scale.xCenter : pointPosition.x,
                y: reset ? scale.yCenter : pointPosition.y,
                tension: custom.tension ? custom.tension : helpers.getValueOrDefault(dataset.tension, this.chart.options.elements.line.tension),
                radius: custom.radius ? custom.radius : helpers.getValueAtIndexOrDefault(dataset.pointRadius, index, pointElementOptions.radius),
                backgroundColor: custom.backgroundColor ? custom.backgroundColor : helpers.getValueAtIndexOrDefault(dataset.pointBackgroundColor, index, pointElementOptions.backgroundColor),
                borderColor: custom.borderColor ? custom.borderColor : helpers.getValueAtIndexOrDefault(dataset.pointBorderColor, index, pointElementOptions.borderColor),
                borderWidth: custom.borderWidth ? custom.borderWidth : helpers.getValueAtIndexOrDefault(dataset.pointBorderWidth, index, pointElementOptions.borderWidth),
                pointStyle: custom.pointStyle ? custom.pointStyle : helpers.getValueAtIndexOrDefault(dataset.pointStyle, index, pointElementOptions.pointStyle),
                hitRadius: custom.hitRadius ? custom.hitRadius : helpers.getValueAtIndexOrDefault(dataset.hitRadius, index, pointElementOptions.hitRadius)
              }
            });
            point._model.skip = custom.skip ? custom.skip : (isNaN(point._model.x) || isNaN(point._model.y));
          },
          updateBezierControlPoints: function() {
            var chartArea = this.chart.chartArea;
            var meta = this.getMeta();
            helpers.each(meta.data, function(point, index) {
              var model = point._model;
              var controlPoints = helpers.splineCurve(helpers.previousItem(meta.data, index, true)._model, model, helpers.nextItem(meta.data, index, true)._model, model.tension);
              model.controlPointPreviousX = Math.max(Math.min(controlPoints.previous.x, chartArea.right), chartArea.left);
              model.controlPointPreviousY = Math.max(Math.min(controlPoints.previous.y, chartArea.bottom), chartArea.top);
              model.controlPointNextX = Math.max(Math.min(controlPoints.next.x, chartArea.right), chartArea.left);
              model.controlPointNextY = Math.max(Math.min(controlPoints.next.y, chartArea.bottom), chartArea.top);
              point.pivot();
            }, this);
          },
          draw: function(ease) {
            var meta = this.getMeta();
            var easingDecimal = ease || 1;
            helpers.each(meta.data, function(point, index) {
              point.transition(easingDecimal);
            });
            meta.dataset.transition(easingDecimal).draw();
            helpers.each(meta.data, function(point) {
              point.draw();
            });
          },
          setHoverStyle: function(point) {
            var dataset = this.chart.data.datasets[point._datasetIndex];
            var custom = point.custom || {};
            var index = point._index;
            var model = point._model;
            model.radius = custom.hoverRadius ? custom.hoverRadius : helpers.getValueAtIndexOrDefault(dataset.pointHoverRadius, index, this.chart.options.elements.point.hoverRadius);
            model.backgroundColor = custom.hoverBackgroundColor ? custom.hoverBackgroundColor : helpers.getValueAtIndexOrDefault(dataset.pointHoverBackgroundColor, index, helpers.getHoverColor(model.backgroundColor));
            model.borderColor = custom.hoverBorderColor ? custom.hoverBorderColor : helpers.getValueAtIndexOrDefault(dataset.pointHoverBorderColor, index, helpers.getHoverColor(model.borderColor));
            model.borderWidth = custom.hoverBorderWidth ? custom.hoverBorderWidth : helpers.getValueAtIndexOrDefault(dataset.pointHoverBorderWidth, index, model.borderWidth);
          },
          removeHoverStyle: function(point) {
            var dataset = this.chart.data.datasets[point._datasetIndex];
            var custom = point.custom || {};
            var index = point._index;
            var model = point._model;
            var pointElementOptions = this.chart.options.elements.point;
            model.radius = custom.radius ? custom.radius : helpers.getValueAtIndexOrDefault(dataset.radius, index, pointElementOptions.radius);
            model.backgroundColor = custom.backgroundColor ? custom.backgroundColor : helpers.getValueAtIndexOrDefault(dataset.pointBackgroundColor, index, pointElementOptions.backgroundColor);
            model.borderColor = custom.borderColor ? custom.borderColor : helpers.getValueAtIndexOrDefault(dataset.pointBorderColor, index, pointElementOptions.borderColor);
            model.borderWidth = custom.borderWidth ? custom.borderWidth : helpers.getValueAtIndexOrDefault(dataset.pointBorderWidth, index, pointElementOptions.borderWidth);
          }
        });
      };
    }, {}],
    21: [function(require, module, exports) {
      "use strict";
      module.exports = function(Chart) {
        var helpers = Chart.helpers;
        Chart.defaults.global.animation = {
          duration: 1000,
          easing: "easeOutQuart",
          onProgress: helpers.noop,
          onComplete: helpers.noop
        };
        Chart.Animation = Chart.Element.extend({
          currentStep: null,
          numSteps: 60,
          easing: "",
          render: null,
          onAnimationProgress: null,
          onAnimationComplete: null
        });
        Chart.animationService = {
          frameDuration: 17,
          animations: [],
          dropFrames: 0,
          request: null,
          addAnimation: function(chartInstance, animationObject, duration, lazy) {
            if (!lazy) {
              chartInstance.animating = true;
            }
            for (var index = 0; index < this.animations.length; ++index) {
              if (this.animations[index].chartInstance === chartInstance) {
                this.animations[index].animationObject = animationObject;
                return;
              }
            }
            this.animations.push({
              chartInstance: chartInstance,
              animationObject: animationObject
            });
            if (this.animations.length === 1) {
              this.requestAnimationFrame();
            }
          },
          cancelAnimation: function(chartInstance) {
            var index = helpers.findIndex(this.animations, function(animationWrapper) {
              return animationWrapper.chartInstance === chartInstance;
            });
            if (index !== -1) {
              this.animations.splice(index, 1);
              chartInstance.animating = false;
            }
          },
          requestAnimationFrame: function() {
            var me = this;
            if (me.request === null) {
              me.request = helpers.requestAnimFrame.call(window, function() {
                me.request = null;
                me.startDigest();
              });
            }
          },
          startDigest: function() {
            var startTime = Date.now();
            var framesToDrop = 0;
            if (this.dropFrames > 1) {
              framesToDrop = Math.floor(this.dropFrames);
              this.dropFrames = this.dropFrames % 1;
            }
            var i = 0;
            while (i < this.animations.length) {
              if (this.animations[i].animationObject.currentStep === null) {
                this.animations[i].animationObject.currentStep = 0;
              }
              this.animations[i].animationObject.currentStep += 1 + framesToDrop;
              if (this.animations[i].animationObject.currentStep > this.animations[i].animationObject.numSteps) {
                this.animations[i].animationObject.currentStep = this.animations[i].animationObject.numSteps;
              }
              this.animations[i].animationObject.render(this.animations[i].chartInstance, this.animations[i].animationObject);
              if (this.animations[i].animationObject.onAnimationProgress && this.animations[i].animationObject.onAnimationProgress.call) {
                this.animations[i].animationObject.onAnimationProgress.call(this.animations[i].chartInstance, this.animations[i]);
              }
              if (this.animations[i].animationObject.currentStep === this.animations[i].animationObject.numSteps) {
                if (this.animations[i].animationObject.onAnimationComplete && this.animations[i].animationObject.onAnimationComplete.call) {
                  this.animations[i].animationObject.onAnimationComplete.call(this.animations[i].chartInstance, this.animations[i]);
                }
                this.animations[i].chartInstance.animating = false;
                this.animations.splice(i, 1);
              } else {
                ++i;
              }
            }
            var endTime = Date.now();
            var dropFrames = (endTime - startTime) / this.frameDuration;
            this.dropFrames += dropFrames;
            if (this.animations.length > 0) {
              this.requestAnimationFrame();
            }
          }
        };
      };
    }, {}],
    22: [function(require, module, exports) {
      "use strict";
      module.exports = function(Chart) {
        var helpers = Chart.helpers;
        Chart.types = {};
        Chart.instances = {};
        Chart.controllers = {};
        Chart.Controller = function(instance) {
          this.chart = instance;
          this.config = instance.config;
          this.options = this.config.options = helpers.configMerge(Chart.defaults.global, Chart.defaults[this.config.type], this.config.options || {});
          this.id = helpers.uid();
          Object.defineProperty(this, 'data', {get: function() {
              return this.config.data;
            }});
          Chart.instances[this.id] = this;
          if (this.options.responsive) {
            this.resize(true);
          }
          this.initialize();
          return this;
        };
        helpers.extend(Chart.Controller.prototype, {
          initialize: function initialize() {
            Chart.pluginService.notifyPlugins('beforeInit', [this]);
            this.bindEvents();
            this.ensureScalesHaveIDs();
            this.buildOrUpdateControllers();
            this.buildScales();
            this.buildSurroundingItems();
            this.updateLayout();
            this.resetElements();
            this.initToolTip();
            this.update();
            Chart.pluginService.notifyPlugins('afterInit', [this]);
            return this;
          },
          clear: function clear() {
            helpers.clear(this.chart);
            return this;
          },
          stop: function stop() {
            Chart.animationService.cancelAnimation(this);
            return this;
          },
          resize: function resize(silent) {
            var canvas = this.chart.canvas;
            var newWidth = helpers.getMaximumWidth(this.chart.canvas);
            var newHeight = (this.options.maintainAspectRatio && isNaN(this.chart.aspectRatio) === false && isFinite(this.chart.aspectRatio) && this.chart.aspectRatio !== 0) ? newWidth / this.chart.aspectRatio : helpers.getMaximumHeight(this.chart.canvas);
            var sizeChanged = this.chart.width !== newWidth || this.chart.height !== newHeight;
            if (!sizeChanged)
              return this;
            canvas.width = this.chart.width = newWidth;
            canvas.height = this.chart.height = newHeight;
            helpers.retinaScale(this.chart);
            if (!silent) {
              this.stop();
              this.update(this.options.responsiveAnimationDuration);
            }
            return this;
          },
          ensureScalesHaveIDs: function ensureScalesHaveIDs() {
            var options = this.options;
            var scalesOptions = options.scales || {};
            var scaleOptions = options.scale;
            helpers.each(scalesOptions.xAxes, function(xAxisOptions, index) {
              xAxisOptions.id = xAxisOptions.id || ('x-axis-' + index);
            });
            helpers.each(scalesOptions.yAxes, function(yAxisOptions, index) {
              yAxisOptions.id = yAxisOptions.id || ('y-axis-' + index);
            });
            if (scaleOptions) {
              scaleOptions.id = scaleOptions.id || 'scale';
            }
          },
          buildScales: function buildScales() {
            var me = this;
            var options = me.options;
            var scales = me.scales = {};
            var items = [];
            if (options.scales) {
              items = items.concat((options.scales.xAxes || []).map(function(xAxisOptions) {
                return {
                  options: xAxisOptions,
                  dtype: 'category'
                };
              }), (options.scales.yAxes || []).map(function(yAxisOptions) {
                return {
                  options: yAxisOptions,
                  dtype: 'linear'
                };
              }));
            }
            if (options.scale) {
              items.push({
                options: options.scale,
                dtype: 'radialLinear',
                isDefault: true
              });
            }
            helpers.each(items, function(item, index) {
              var scaleOptions = item.options;
              var scaleType = helpers.getValueOrDefault(scaleOptions.type, item.dtype);
              var scaleClass = Chart.scaleService.getScaleConstructor(scaleType);
              if (!scaleClass) {
                return;
              }
              var scale = new scaleClass({
                id: scaleOptions.id,
                options: scaleOptions,
                ctx: me.chart.ctx,
                chart: me
              });
              scales[scale.id] = scale;
              if (item.isDefault) {
                me.scale = scale;
              }
            });
            Chart.scaleService.addScalesToLayout(this);
          },
          buildSurroundingItems: function() {
            if (this.options.title) {
              this.titleBlock = new Chart.Title({
                ctx: this.chart.ctx,
                options: this.options.title,
                chart: this
              });
              Chart.layoutService.addBox(this, this.titleBlock);
            }
            if (this.options.legend) {
              this.legend = new Chart.Legend({
                ctx: this.chart.ctx,
                options: this.options.legend,
                chart: this
              });
              Chart.layoutService.addBox(this, this.legend);
            }
          },
          updateLayout: function() {
            Chart.layoutService.update(this, this.chart.width, this.chart.height);
          },
          buildOrUpdateControllers: function buildOrUpdateControllers() {
            var types = [];
            var newControllers = [];
            helpers.each(this.data.datasets, function(dataset, datasetIndex) {
              var meta = this.getDatasetMeta(datasetIndex);
              if (!meta.type) {
                meta.type = dataset.type || this.config.type;
              }
              types.push(meta.type);
              if (meta.controller) {
                meta.controller.updateIndex(datasetIndex);
              } else {
                meta.controller = new Chart.controllers[meta.type](this, datasetIndex);
                newControllers.push(meta.controller);
              }
            }, this);
            if (types.length > 1) {
              for (var i = 1; i < types.length; i++) {
                if (types[i] !== types[i - 1]) {
                  this.isCombo = true;
                  break;
                }
              }
            }
            return newControllers;
          },
          resetElements: function resetElements() {
            helpers.each(this.data.datasets, function(dataset, datasetIndex) {
              this.getDatasetMeta(datasetIndex).controller.reset();
            }, this);
          },
          update: function update(animationDuration, lazy) {
            Chart.pluginService.notifyPlugins('beforeUpdate', [this]);
            this.tooltip._data = this.data;
            var newControllers = this.buildOrUpdateControllers();
            helpers.each(this.data.datasets, function(dataset, datasetIndex) {
              this.getDatasetMeta(datasetIndex).controller.buildOrUpdateElements();
            }, this);
            Chart.layoutService.update(this, this.chart.width, this.chart.height);
            Chart.pluginService.notifyPlugins('afterScaleUpdate', [this]);
            helpers.each(newControllers, function(controller) {
              controller.reset();
            });
            helpers.each(this.data.datasets, function(dataset, datasetIndex) {
              this.getDatasetMeta(datasetIndex).controller.update();
            }, this);
            Chart.pluginService.notifyPlugins('afterUpdate', [this]);
            this.render(animationDuration, lazy);
          },
          render: function render(duration, lazy) {
            Chart.pluginService.notifyPlugins('beforeRender', [this]);
            var animationOptions = this.options.animation;
            if (animationOptions && ((typeof duration !== 'undefined' && duration !== 0) || (typeof duration === 'undefined' && animationOptions.duration !== 0))) {
              var animation = new Chart.Animation();
              animation.numSteps = (duration || animationOptions.duration) / 16.66;
              animation.easing = animationOptions.easing;
              animation.render = function(chartInstance, animationObject) {
                var easingFunction = helpers.easingEffects[animationObject.easing];
                var stepDecimal = animationObject.currentStep / animationObject.numSteps;
                var easeDecimal = easingFunction(stepDecimal);
                chartInstance.draw(easeDecimal, stepDecimal, animationObject.currentStep);
              };
              animation.onAnimationProgress = animationOptions.onProgress;
              animation.onAnimationComplete = animationOptions.onComplete;
              Chart.animationService.addAnimation(this, animation, duration, lazy);
            } else {
              this.draw();
              if (animationOptions && animationOptions.onComplete && animationOptions.onComplete.call) {
                animationOptions.onComplete.call(this);
              }
            }
            return this;
          },
          draw: function(ease) {
            var easingDecimal = ease || 1;
            this.clear();
            Chart.pluginService.notifyPlugins('beforeDraw', [this, easingDecimal]);
            helpers.each(this.boxes, function(box) {
              box.draw(this.chartArea);
            }, this);
            if (this.scale) {
              this.scale.draw();
            }
            var context = this.chart.ctx;
            context.save();
            context.beginPath();
            context.rect(this.chartArea.left, this.chartArea.top, this.chartArea.right - this.chartArea.left, this.chartArea.bottom - this.chartArea.top);
            context.clip();
            helpers.each(this.data.datasets, function(dataset, datasetIndex) {
              if (this.isDatasetVisible(datasetIndex)) {
                this.getDatasetMeta(datasetIndex).controller.draw(ease);
              }
            }, this, true);
            context.restore();
            this.tooltip.transition(easingDecimal).draw();
            Chart.pluginService.notifyPlugins('afterDraw', [this, easingDecimal]);
          },
          getElementAtEvent: function(e) {
            var eventPosition = helpers.getRelativePosition(e, this.chart);
            var elementsArray = [];
            helpers.each(this.data.datasets, function(dataset, datasetIndex) {
              if (this.isDatasetVisible(datasetIndex)) {
                var meta = this.getDatasetMeta(datasetIndex);
                helpers.each(meta.data, function(element, index) {
                  if (element.inRange(eventPosition.x, eventPosition.y)) {
                    elementsArray.push(element);
                    return elementsArray;
                  }
                });
              }
            }, this);
            return elementsArray;
          },
          getElementsAtEvent: function(e) {
            var eventPosition = helpers.getRelativePosition(e, this.chart);
            var elementsArray = [];
            var found = (function() {
              if (this.data.datasets) {
                for (var i = 0; i < this.data.datasets.length; i++) {
                  var meta = this.getDatasetMeta(i);
                  if (this.isDatasetVisible(i)) {
                    for (var j = 0; j < meta.data.length; j++) {
                      if (meta.data[j].inRange(eventPosition.x, eventPosition.y)) {
                        return meta.data[j];
                      }
                    }
                  }
                }
              }
            }).call(this);
            if (!found) {
              return elementsArray;
            }
            helpers.each(this.data.datasets, function(dataset, datasetIndex) {
              if (this.isDatasetVisible(datasetIndex)) {
                var meta = this.getDatasetMeta(datasetIndex);
                elementsArray.push(meta.data[found._index]);
              }
            }, this);
            return elementsArray;
          },
          getElementsAtEventForMode: function(e, mode) {
            var me = this;
            switch (mode) {
              case 'single':
                return me.getElementAtEvent(e);
              case 'label':
                return me.getElementsAtEvent(e);
              case 'dataset':
                return me.getDatasetAtEvent(e);
              default:
                return e;
            }
          },
          getDatasetAtEvent: function(e) {
            var elementsArray = this.getElementAtEvent(e);
            if (elementsArray.length > 0) {
              elementsArray = this.getDatasetMeta(elementsArray[0]._datasetIndex).data;
            }
            return elementsArray;
          },
          getDatasetMeta: function(datasetIndex) {
            var dataset = this.data.datasets[datasetIndex];
            if (!dataset._meta) {
              dataset._meta = {};
            }
            var meta = dataset._meta[this.id];
            if (!meta) {
              meta = dataset._meta[this.id] = {
                type: null,
                data: [],
                dataset: null,
                controller: null,
                hidden: null,
                xAxisID: null,
                yAxisID: null
              };
            }
            return meta;
          },
          getVisibleDatasetCount: function() {
            var count = 0;
            for (var i = 0,
                ilen = this.data.datasets.length; i < ilen; ++i) {
              if (this.isDatasetVisible(i)) {
                count++;
              }
            }
            return count;
          },
          isDatasetVisible: function(datasetIndex) {
            var meta = this.getDatasetMeta(datasetIndex);
            return typeof meta.hidden === 'boolean' ? !meta.hidden : !this.data.datasets[datasetIndex].hidden;
          },
          generateLegend: function generateLegend() {
            return this.options.legendCallback(this);
          },
          destroy: function destroy() {
            this.clear();
            helpers.unbindEvents(this, this.events);
            helpers.removeResizeListener(this.chart.canvas.parentNode);
            var canvas = this.chart.canvas;
            canvas.width = this.chart.width;
            canvas.height = this.chart.height;
            if (this.chart.originalDevicePixelRatio !== undefined) {
              this.chart.ctx.scale(1 / this.chart.originalDevicePixelRatio, 1 / this.chart.originalDevicePixelRatio);
            }
            canvas.style.width = this.chart.originalCanvasStyleWidth;
            canvas.style.height = this.chart.originalCanvasStyleHeight;
            Chart.pluginService.notifyPlugins('destroy', [this]);
            delete Chart.instances[this.id];
          },
          toBase64Image: function toBase64Image() {
            return this.chart.canvas.toDataURL.apply(this.chart.canvas, arguments);
          },
          initToolTip: function initToolTip() {
            this.tooltip = new Chart.Tooltip({
              _chart: this.chart,
              _chartInstance: this,
              _data: this.data,
              _options: this.options
            }, this);
          },
          bindEvents: function bindEvents() {
            helpers.bindEvents(this, this.options.events, function(evt) {
              this.eventHandler(evt);
            });
          },
          updateHoverStyle: function(elements, mode, enabled) {
            var method = enabled ? 'setHoverStyle' : 'removeHoverStyle';
            var element,
                i,
                ilen;
            switch (mode) {
              case 'single':
                elements = [elements[0]];
                break;
              case 'label':
              case 'dataset':
                break;
              default:
                return;
            }
            for (i = 0, ilen = elements.length; i < ilen; ++i) {
              element = elements[i];
              if (element) {
                this.getDatasetMeta(element._datasetIndex).controller[method](element);
              }
            }
          },
          eventHandler: function eventHandler(e) {
            var me = this;
            var tooltip = me.tooltip;
            var options = me.options || {};
            var hoverOptions = options.hover;
            var tooltipsOptions = options.tooltips;
            me.lastActive = me.lastActive || [];
            me.lastTooltipActive = me.lastTooltipActive || [];
            if (e.type === 'mouseout') {
              me.active = [];
              me.tooltipActive = [];
            } else {
              me.active = me.getElementsAtEventForMode(e, hoverOptions.mode);
              me.tooltipActive = me.getElementsAtEventForMode(e, tooltipsOptions.mode);
            }
            if (hoverOptions.onHover) {
              hoverOptions.onHover.call(me, me.active);
            }
            if (e.type === 'mouseup' || e.type === 'click') {
              if (options.onClick) {
                options.onClick.call(me, e, me.active);
              }
              if (me.legend && me.legend.handleEvent) {
                me.legend.handleEvent(e);
              }
            }
            if (me.lastActive.length) {
              me.updateHoverStyle(me.lastActive, hoverOptions.mode, false);
            }
            if (me.active.length && hoverOptions.mode) {
              me.updateHoverStyle(me.active, hoverOptions.mode, true);
            }
            if (tooltipsOptions.enabled || tooltipsOptions.custom) {
              tooltip.initialize();
              tooltip._active = me.tooltipActive;
              tooltip.update(true);
            }
            tooltip.pivot();
            if (!me.animating) {
              if (!helpers.arrayEquals(me.active, me.lastActive) || !helpers.arrayEquals(me.tooltipActive, me.lastTooltipActive)) {
                me.stop();
                if (tooltipsOptions.enabled || tooltipsOptions.custom) {
                  tooltip.update(true);
                }
                me.render(hoverOptions.animationDuration, true);
              }
            }
            me.lastActive = me.active;
            me.lastTooltipActive = me.tooltipActive;
            return me;
          }
        });
      };
    }, {}],
    23: [function(require, module, exports) {
      "use strict";
      module.exports = function(Chart) {
        var helpers = Chart.helpers;
        var noop = helpers.noop;
        Chart.DatasetController = function(chart, datasetIndex) {
          this.initialize.call(this, chart, datasetIndex);
        };
        helpers.extend(Chart.DatasetController.prototype, {
          datasetElementType: null,
          dataElementType: null,
          initialize: function(chart, datasetIndex) {
            this.chart = chart;
            this.index = datasetIndex;
            this.linkScales();
            this.addElements();
          },
          updateIndex: function(datasetIndex) {
            this.index = datasetIndex;
          },
          linkScales: function() {
            var meta = this.getMeta();
            var dataset = this.getDataset();
            if (meta.xAxisID === null) {
              meta.xAxisID = dataset.xAxisID || this.chart.options.scales.xAxes[0].id;
            }
            if (meta.yAxisID === null) {
              meta.yAxisID = dataset.yAxisID || this.chart.options.scales.yAxes[0].id;
            }
          },
          getDataset: function() {
            return this.chart.data.datasets[this.index];
          },
          getMeta: function() {
            return this.chart.getDatasetMeta(this.index);
          },
          getScaleForId: function(scaleID) {
            return this.chart.scales[scaleID];
          },
          reset: function() {
            this.update(true);
          },
          createMetaDataset: function() {
            var me = this;
            var type = me.datasetElementType;
            return type && new type({
              _chart: me.chart.chart,
              _datasetIndex: me.index
            });
          },
          createMetaData: function(index) {
            var me = this;
            var type = me.dataElementType;
            return type && new type({
              _chart: me.chart.chart,
              _datasetIndex: me.index,
              _index: index
            });
          },
          addElements: function() {
            var me = this;
            var meta = me.getMeta();
            var data = me.getDataset().data || [];
            var metaData = meta.data;
            var i,
                ilen;
            for (i = 0, ilen = data.length; i < ilen; ++i) {
              metaData[i] = metaData[i] || me.createMetaData(meta, i);
            }
            meta.dataset = meta.dataset || me.createMetaDataset();
          },
          addElementAndReset: function(index) {
            var me = this;
            var element = me.createMetaData(index);
            me.getMeta().data.splice(index, 0, element);
            me.updateElement(element, index, true);
          },
          buildOrUpdateElements: function buildOrUpdateElements() {
            var meta = this.getMeta(),
                md = meta.data,
                numData = this.getDataset().data.length,
                numMetaData = md.length;
            if (numData < numMetaData) {
              md.splice(numData, numMetaData - numData);
            } else if (numData > numMetaData) {
              for (var index = numMetaData; index < numData; ++index) {
                this.addElementAndReset(index);
              }
            }
          },
          update: noop,
          draw: function(ease) {
            var easingDecimal = ease || 1;
            helpers.each(this.getMeta().data, function(element, index) {
              element.transition(easingDecimal).draw();
            });
          },
          removeHoverStyle: function(element, elementOpts) {
            var dataset = this.chart.data.datasets[element._datasetIndex],
                index = element._index,
                custom = element.custom || {},
                valueOrDefault = helpers.getValueAtIndexOrDefault,
                color = helpers.color,
                model = element._model;
            model.backgroundColor = custom.backgroundColor ? custom.backgroundColor : valueOrDefault(dataset.backgroundColor, index, elementOpts.backgroundColor);
            model.borderColor = custom.borderColor ? custom.borderColor : valueOrDefault(dataset.borderColor, index, elementOpts.borderColor);
            model.borderWidth = custom.borderWidth ? custom.borderWidth : valueOrDefault(dataset.borderWidth, index, elementOpts.borderWidth);
          },
          setHoverStyle: function(element) {
            var dataset = this.chart.data.datasets[element._datasetIndex],
                index = element._index,
                custom = element.custom || {},
                valueOrDefault = helpers.getValueAtIndexOrDefault,
                color = helpers.color,
                getHoverColor = helpers.getHoverColor,
                model = element._model;
            model.backgroundColor = custom.hoverBackgroundColor ? custom.hoverBackgroundColor : valueOrDefault(dataset.hoverBackgroundColor, index, getHoverColor(model.backgroundColor));
            model.borderColor = custom.hoverBorderColor ? custom.hoverBorderColor : valueOrDefault(dataset.hoverBorderColor, index, getHoverColor(model.borderColor));
            model.borderWidth = custom.hoverBorderWidth ? custom.hoverBorderWidth : valueOrDefault(dataset.hoverBorderWidth, index, model.borderWidth);
          }
        });
        Chart.DatasetController.extend = helpers.inherits;
      };
    }, {}],
    24: [function(require, module, exports) {
      "use strict";
      module.exports = function(Chart) {
        var helpers = Chart.helpers;
        Chart.elements = {};
        Chart.Element = function(configuration) {
          helpers.extend(this, configuration);
          this.initialize.apply(this, arguments);
        };
        helpers.extend(Chart.Element.prototype, {
          initialize: function() {
            this.hidden = false;
          },
          pivot: function() {
            if (!this._view) {
              this._view = helpers.clone(this._model);
            }
            this._start = helpers.clone(this._view);
            return this;
          },
          transition: function(ease) {
            if (!this._view) {
              this._view = helpers.clone(this._model);
            }
            if (ease === 1) {
              this._view = this._model;
              this._start = null;
              return this;
            }
            if (!this._start) {
              this.pivot();
            }
            helpers.each(this._model, function(value, key) {
              if (key[0] === '_') {} else if (!this._view.hasOwnProperty(key)) {
                if (typeof value === 'number' && !isNaN(this._view[key])) {
                  this._view[key] = value * ease;
                } else {
                  this._view[key] = value;
                }
              } else if (value === this._view[key]) {} else if (typeof value === 'string') {
                try {
                  var color = helpers.color(this._model[key]).mix(helpers.color(this._start[key]), ease);
                  this._view[key] = color.rgbString();
                } catch (err) {
                  this._view[key] = value;
                }
              } else if (typeof value === 'number') {
                var startVal = this._start[key] !== undefined && isNaN(this._start[key]) === false ? this._start[key] : 0;
                this._view[key] = ((this._model[key] - startVal) * ease) + startVal;
              } else {
                this._view[key] = value;
              }
            }, this);
            return this;
          },
          tooltipPosition: function() {
            return {
              x: this._model.x,
              y: this._model.y
            };
          },
          hasValue: function() {
            return helpers.isNumber(this._model.x) && helpers.isNumber(this._model.y);
          }
        });
        Chart.Element.extend = helpers.inherits;
      };
    }, {}],
    25: [function(require, module, exports) {
      "use strict";
      var color = require('chartjs-color');
      module.exports = function(Chart) {
        var helpers = Chart.helpers = {};
        helpers.each = function(loopable, callback, self, reverse) {
          var i,
              len;
          if (helpers.isArray(loopable)) {
            len = loopable.length;
            if (reverse) {
              for (i = len - 1; i >= 0; i--) {
                callback.call(self, loopable[i], i);
              }
            } else {
              for (i = 0; i < len; i++) {
                callback.call(self, loopable[i], i);
              }
            }
          } else if (typeof loopable === 'object') {
            var keys = Object.keys(loopable);
            len = keys.length;
            for (i = 0; i < len; i++) {
              callback.call(self, loopable[keys[i]], keys[i]);
            }
          }
        };
        helpers.clone = function(obj) {
          var objClone = {};
          helpers.each(obj, function(value, key) {
            if (helpers.isArray(value)) {
              objClone[key] = value.slice(0);
            } else if (typeof value === 'object' && value !== null) {
              objClone[key] = helpers.clone(value);
            } else {
              objClone[key] = value;
            }
          });
          return objClone;
        };
        helpers.extend = function(base) {
          var len = arguments.length;
          var additionalArgs = [];
          for (var i = 1; i < len; i++) {
            additionalArgs.push(arguments[i]);
          }
          helpers.each(additionalArgs, function(extensionObject) {
            helpers.each(extensionObject, function(value, key) {
              base[key] = value;
            });
          });
          return base;
        };
        helpers.configMerge = function(_base) {
          var base = helpers.clone(_base);
          helpers.each(Array.prototype.slice.call(arguments, 1), function(extension) {
            helpers.each(extension, function(value, key) {
              if (key === 'scales') {
                base[key] = helpers.scaleMerge(base.hasOwnProperty(key) ? base[key] : {}, value);
              } else if (key === 'scale') {
                base[key] = helpers.configMerge(base.hasOwnProperty(key) ? base[key] : {}, Chart.scaleService.getScaleDefaults(value.type), value);
              } else if (base.hasOwnProperty(key) && helpers.isArray(base[key]) && helpers.isArray(value)) {
                var baseArray = base[key];
                helpers.each(value, function(valueObj, index) {
                  if (index < baseArray.length) {
                    if (typeof baseArray[index] === 'object' && baseArray[index] !== null && typeof valueObj === 'object' && valueObj !== null) {
                      baseArray[index] = helpers.configMerge(baseArray[index], valueObj);
                    } else {
                      baseArray[index] = valueObj;
                    }
                  } else {
                    baseArray.push(valueObj);
                  }
                });
              } else if (base.hasOwnProperty(key) && typeof base[key] === "object" && base[key] !== null && typeof value === "object") {
                base[key] = helpers.configMerge(base[key], value);
              } else {
                base[key] = value;
              }
            });
          });
          return base;
        };
        helpers.extendDeep = function(_base) {
          return _extendDeep.apply(this, arguments);
          function _extendDeep(dst) {
            helpers.each(arguments, function(obj) {
              if (obj !== dst) {
                helpers.each(obj, function(value, key) {
                  if (dst[key] && dst[key].constructor && dst[key].constructor === Object) {
                    _extendDeep(dst[key], value);
                  } else {
                    dst[key] = value;
                  }
                });
              }
            });
            return dst;
          }
        };
        helpers.scaleMerge = function(_base, extension) {
          var base = helpers.clone(_base);
          helpers.each(extension, function(value, key) {
            if (key === 'xAxes' || key === 'yAxes') {
              if (base.hasOwnProperty(key)) {
                helpers.each(value, function(valueObj, index) {
                  var axisType = helpers.getValueOrDefault(valueObj.type, key === 'xAxes' ? 'category' : 'linear');
                  var axisDefaults = Chart.scaleService.getScaleDefaults(axisType);
                  if (index >= base[key].length || !base[key][index].type) {
                    base[key].push(helpers.configMerge(axisDefaults, valueObj));
                  } else if (valueObj.type && valueObj.type !== base[key][index].type) {
                    base[key][index] = helpers.configMerge(base[key][index], axisDefaults, valueObj);
                  } else {
                    base[key][index] = helpers.configMerge(base[key][index], valueObj);
                  }
                });
              } else {
                base[key] = [];
                helpers.each(value, function(valueObj) {
                  var axisType = helpers.getValueOrDefault(valueObj.type, key === 'xAxes' ? 'category' : 'linear');
                  base[key].push(helpers.configMerge(Chart.scaleService.getScaleDefaults(axisType), valueObj));
                });
              }
            } else if (base.hasOwnProperty(key) && typeof base[key] === "object" && base[key] !== null && typeof value === "object") {
              base[key] = helpers.configMerge(base[key], value);
            } else {
              base[key] = value;
            }
          });
          return base;
        };
        helpers.getValueAtIndexOrDefault = function(value, index, defaultValue) {
          if (value === undefined || value === null) {
            return defaultValue;
          }
          if (helpers.isArray(value)) {
            return index < value.length ? value[index] : defaultValue;
          }
          return value;
        };
        helpers.getValueOrDefault = function(value, defaultValue) {
          return value === undefined ? defaultValue : value;
        };
        helpers.indexOf = function(arrayToSearch, item) {
          if (Array.prototype.indexOf) {
            return arrayToSearch.indexOf(item);
          } else {
            for (var i = 0; i < arrayToSearch.length; i++) {
              if (arrayToSearch[i] === item)
                return i;
            }
            return -1;
          }
        };
        helpers.where = function(collection, filterCallback) {
          if (helpers.isArray(collection) && Array.prototype.filter) {
            return collection.filter(filterCallback);
          } else {
            var filtered = [];
            helpers.each(collection, function(item) {
              if (filterCallback(item)) {
                filtered.push(item);
              }
            });
            return filtered;
          }
        };
        helpers.findIndex = function(arrayToSearch, callback, thisArg) {
          var index = -1;
          if (Array.prototype.findIndex) {
            index = arrayToSearch.findIndex(callback, thisArg);
          } else {
            for (var i = 0; i < arrayToSearch.length; ++i) {
              thisArg = thisArg !== undefined ? thisArg : arrayToSearch;
              if (callback.call(thisArg, arrayToSearch[i], i, arrayToSearch)) {
                index = i;
                break;
              }
            }
          }
          return index;
        };
        helpers.findNextWhere = function(arrayToSearch, filterCallback, startIndex) {
          if (startIndex === undefined || startIndex === null) {
            startIndex = -1;
          }
          for (var i = startIndex + 1; i < arrayToSearch.length; i++) {
            var currentItem = arrayToSearch[i];
            if (filterCallback(currentItem)) {
              return currentItem;
            }
          }
        };
        helpers.findPreviousWhere = function(arrayToSearch, filterCallback, startIndex) {
          if (startIndex === undefined || startIndex === null) {
            startIndex = arrayToSearch.length;
          }
          for (var i = startIndex - 1; i >= 0; i--) {
            var currentItem = arrayToSearch[i];
            if (filterCallback(currentItem)) {
              return currentItem;
            }
          }
        };
        helpers.inherits = function(extensions) {
          var parent = this;
          var ChartElement = (extensions && extensions.hasOwnProperty("constructor")) ? extensions.constructor : function() {
            return parent.apply(this, arguments);
          };
          var Surrogate = function() {
            this.constructor = ChartElement;
          };
          Surrogate.prototype = parent.prototype;
          ChartElement.prototype = new Surrogate();
          ChartElement.extend = helpers.inherits;
          if (extensions) {
            helpers.extend(ChartElement.prototype, extensions);
          }
          ChartElement.__super__ = parent.prototype;
          return ChartElement;
        };
        helpers.noop = function() {};
        helpers.uid = (function() {
          var id = 0;
          return function() {
            return id++;
          };
        })();
        helpers.warn = function(str) {
          if (console && typeof console.warn === "function") {
            console.warn(str);
          }
        };
        helpers.isNumber = function(n) {
          return !isNaN(parseFloat(n)) && isFinite(n);
        };
        helpers.almostEquals = function(x, y, epsilon) {
          return Math.abs(x - y) < epsilon;
        };
        helpers.max = function(array) {
          return array.reduce(function(max, value) {
            if (!isNaN(value)) {
              return Math.max(max, value);
            } else {
              return max;
            }
          }, Number.NEGATIVE_INFINITY);
        };
        helpers.min = function(array) {
          return array.reduce(function(min, value) {
            if (!isNaN(value)) {
              return Math.min(min, value);
            } else {
              return min;
            }
          }, Number.POSITIVE_INFINITY);
        };
        helpers.sign = function(x) {
          if (Math.sign) {
            return Math.sign(x);
          } else {
            x = +x;
            if (x === 0 || isNaN(x)) {
              return x;
            }
            return x > 0 ? 1 : -1;
          }
        };
        helpers.log10 = function(x) {
          if (Math.log10) {
            return Math.log10(x);
          } else {
            return Math.log(x) / Math.LN10;
          }
        };
        helpers.toRadians = function(degrees) {
          return degrees * (Math.PI / 180);
        };
        helpers.toDegrees = function(radians) {
          return radians * (180 / Math.PI);
        };
        helpers.getAngleFromPoint = function(centrePoint, anglePoint) {
          var distanceFromXCenter = anglePoint.x - centrePoint.x,
              distanceFromYCenter = anglePoint.y - centrePoint.y,
              radialDistanceFromCenter = Math.sqrt(distanceFromXCenter * distanceFromXCenter + distanceFromYCenter * distanceFromYCenter);
          var angle = Math.atan2(distanceFromYCenter, distanceFromXCenter);
          if (angle < (-0.5 * Math.PI)) {
            angle += 2.0 * Math.PI;
          }
          return {
            angle: angle,
            distance: radialDistanceFromCenter
          };
        };
        helpers.aliasPixel = function(pixelWidth) {
          return (pixelWidth % 2 === 0) ? 0 : 0.5;
        };
        helpers.splineCurve = function(firstPoint, middlePoint, afterPoint, t) {
          var previous = firstPoint.skip ? middlePoint : firstPoint,
              current = middlePoint,
              next = afterPoint.skip ? middlePoint : afterPoint;
          var d01 = Math.sqrt(Math.pow(current.x - previous.x, 2) + Math.pow(current.y - previous.y, 2));
          var d12 = Math.sqrt(Math.pow(next.x - current.x, 2) + Math.pow(next.y - current.y, 2));
          var s01 = d01 / (d01 + d12);
          var s12 = d12 / (d01 + d12);
          s01 = isNaN(s01) ? 0 : s01;
          s12 = isNaN(s12) ? 0 : s12;
          var fa = t * s01;
          var fb = t * s12;
          return {
            previous: {
              x: current.x - fa * (next.x - previous.x),
              y: current.y - fa * (next.y - previous.y)
            },
            next: {
              x: current.x + fb * (next.x - previous.x),
              y: current.y + fb * (next.y - previous.y)
            }
          };
        };
        helpers.nextItem = function(collection, index, loop) {
          if (loop) {
            return index >= collection.length - 1 ? collection[0] : collection[index + 1];
          }
          return index >= collection.length - 1 ? collection[collection.length - 1] : collection[index + 1];
        };
        helpers.previousItem = function(collection, index, loop) {
          if (loop) {
            return index <= 0 ? collection[collection.length - 1] : collection[index - 1];
          }
          return index <= 0 ? collection[0] : collection[index - 1];
        };
        helpers.niceNum = function(range, round) {
          var exponent = Math.floor(helpers.log10(range));
          var fraction = range / Math.pow(10, exponent);
          var niceFraction;
          if (round) {
            if (fraction < 1.5) {
              niceFraction = 1;
            } else if (fraction < 3) {
              niceFraction = 2;
            } else if (fraction < 7) {
              niceFraction = 5;
            } else {
              niceFraction = 10;
            }
          } else {
            if (fraction <= 1.0) {
              niceFraction = 1;
            } else if (fraction <= 2) {
              niceFraction = 2;
            } else if (fraction <= 5) {
              niceFraction = 5;
            } else {
              niceFraction = 10;
            }
          }
          return niceFraction * Math.pow(10, exponent);
        };
        var easingEffects = helpers.easingEffects = {
          linear: function(t) {
            return t;
          },
          easeInQuad: function(t) {
            return t * t;
          },
          easeOutQuad: function(t) {
            return -1 * t * (t - 2);
          },
          easeInOutQuad: function(t) {
            if ((t /= 1 / 2) < 1) {
              return 1 / 2 * t * t;
            }
            return -1 / 2 * ((--t) * (t - 2) - 1);
          },
          easeInCubic: function(t) {
            return t * t * t;
          },
          easeOutCubic: function(t) {
            return 1 * ((t = t / 1 - 1) * t * t + 1);
          },
          easeInOutCubic: function(t) {
            if ((t /= 1 / 2) < 1) {
              return 1 / 2 * t * t * t;
            }
            return 1 / 2 * ((t -= 2) * t * t + 2);
          },
          easeInQuart: function(t) {
            return t * t * t * t;
          },
          easeOutQuart: function(t) {
            return -1 * ((t = t / 1 - 1) * t * t * t - 1);
          },
          easeInOutQuart: function(t) {
            if ((t /= 1 / 2) < 1) {
              return 1 / 2 * t * t * t * t;
            }
            return -1 / 2 * ((t -= 2) * t * t * t - 2);
          },
          easeInQuint: function(t) {
            return 1 * (t /= 1) * t * t * t * t;
          },
          easeOutQuint: function(t) {
            return 1 * ((t = t / 1 - 1) * t * t * t * t + 1);
          },
          easeInOutQuint: function(t) {
            if ((t /= 1 / 2) < 1) {
              return 1 / 2 * t * t * t * t * t;
            }
            return 1 / 2 * ((t -= 2) * t * t * t * t + 2);
          },
          easeInSine: function(t) {
            return -1 * Math.cos(t / 1 * (Math.PI / 2)) + 1;
          },
          easeOutSine: function(t) {
            return 1 * Math.sin(t / 1 * (Math.PI / 2));
          },
          easeInOutSine: function(t) {
            return -1 / 2 * (Math.cos(Math.PI * t / 1) - 1);
          },
          easeInExpo: function(t) {
            return (t === 0) ? 1 : 1 * Math.pow(2, 10 * (t / 1 - 1));
          },
          easeOutExpo: function(t) {
            return (t === 1) ? 1 : 1 * (-Math.pow(2, -10 * t / 1) + 1);
          },
          easeInOutExpo: function(t) {
            if (t === 0) {
              return 0;
            }
            if (t === 1) {
              return 1;
            }
            if ((t /= 1 / 2) < 1) {
              return 1 / 2 * Math.pow(2, 10 * (t - 1));
            }
            return 1 / 2 * (-Math.pow(2, -10 * --t) + 2);
          },
          easeInCirc: function(t) {
            if (t >= 1) {
              return t;
            }
            return -1 * (Math.sqrt(1 - (t /= 1) * t) - 1);
          },
          easeOutCirc: function(t) {
            return 1 * Math.sqrt(1 - (t = t / 1 - 1) * t);
          },
          easeInOutCirc: function(t) {
            if ((t /= 1 / 2) < 1) {
              return -1 / 2 * (Math.sqrt(1 - t * t) - 1);
            }
            return 1 / 2 * (Math.sqrt(1 - (t -= 2) * t) + 1);
          },
          easeInElastic: function(t) {
            var s = 1.70158;
            var p = 0;
            var a = 1;
            if (t === 0) {
              return 0;
            }
            if ((t /= 1) === 1) {
              return 1;
            }
            if (!p) {
              p = 1 * 0.3;
            }
            if (a < Math.abs(1)) {
              a = 1;
              s = p / 4;
            } else {
              s = p / (2 * Math.PI) * Math.asin(1 / a);
            }
            return -(a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * 1 - s) * (2 * Math.PI) / p));
          },
          easeOutElastic: function(t) {
            var s = 1.70158;
            var p = 0;
            var a = 1;
            if (t === 0) {
              return 0;
            }
            if ((t /= 1) === 1) {
              return 1;
            }
            if (!p) {
              p = 1 * 0.3;
            }
            if (a < Math.abs(1)) {
              a = 1;
              s = p / 4;
            } else {
              s = p / (2 * Math.PI) * Math.asin(1 / a);
            }
            return a * Math.pow(2, -10 * t) * Math.sin((t * 1 - s) * (2 * Math.PI) / p) + 1;
          },
          easeInOutElastic: function(t) {
            var s = 1.70158;
            var p = 0;
            var a = 1;
            if (t === 0) {
              return 0;
            }
            if ((t /= 1 / 2) === 2) {
              return 1;
            }
            if (!p) {
              p = 1 * (0.3 * 1.5);
            }
            if (a < Math.abs(1)) {
              a = 1;
              s = p / 4;
            } else {
              s = p / (2 * Math.PI) * Math.asin(1 / a);
            }
            if (t < 1) {
              return -0.5 * (a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * 1 - s) * (2 * Math.PI) / p));
            }
            return a * Math.pow(2, -10 * (t -= 1)) * Math.sin((t * 1 - s) * (2 * Math.PI) / p) * 0.5 + 1;
          },
          easeInBack: function(t) {
            var s = 1.70158;
            return 1 * (t /= 1) * t * ((s + 1) * t - s);
          },
          easeOutBack: function(t) {
            var s = 1.70158;
            return 1 * ((t = t / 1 - 1) * t * ((s + 1) * t + s) + 1);
          },
          easeInOutBack: function(t) {
            var s = 1.70158;
            if ((t /= 1 / 2) < 1) {
              return 1 / 2 * (t * t * (((s *= (1.525)) + 1) * t - s));
            }
            return 1 / 2 * ((t -= 2) * t * (((s *= (1.525)) + 1) * t + s) + 2);
          },
          easeInBounce: function(t) {
            return 1 - easingEffects.easeOutBounce(1 - t);
          },
          easeOutBounce: function(t) {
            if ((t /= 1) < (1 / 2.75)) {
              return 1 * (7.5625 * t * t);
            } else if (t < (2 / 2.75)) {
              return 1 * (7.5625 * (t -= (1.5 / 2.75)) * t + 0.75);
            } else if (t < (2.5 / 2.75)) {
              return 1 * (7.5625 * (t -= (2.25 / 2.75)) * t + 0.9375);
            } else {
              return 1 * (7.5625 * (t -= (2.625 / 2.75)) * t + 0.984375);
            }
          },
          easeInOutBounce: function(t) {
            if (t < 1 / 2) {
              return easingEffects.easeInBounce(t * 2) * 0.5;
            }
            return easingEffects.easeOutBounce(t * 2 - 1) * 0.5 + 1 * 0.5;
          }
        };
        helpers.requestAnimFrame = (function() {
          return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function(callback) {
            return window.setTimeout(callback, 1000 / 60);
          };
        })();
        helpers.cancelAnimFrame = (function() {
          return window.cancelAnimationFrame || window.webkitCancelAnimationFrame || window.mozCancelAnimationFrame || window.oCancelAnimationFrame || window.msCancelAnimationFrame || function(callback) {
            return window.clearTimeout(callback, 1000 / 60);
          };
        })();
        helpers.getRelativePosition = function(evt, chart) {
          var mouseX,
              mouseY;
          var e = evt.originalEvent || evt,
              canvas = evt.currentTarget || evt.srcElement,
              boundingRect = canvas.getBoundingClientRect();
          var touches = e.touches;
          if (touches && touches.length > 0) {
            mouseX = touches[0].clientX;
            mouseY = touches[0].clientY;
          } else {
            mouseX = e.clientX;
            mouseY = e.clientY;
          }
          var paddingLeft = parseFloat(helpers.getStyle(canvas, 'padding-left'));
          var paddingTop = parseFloat(helpers.getStyle(canvas, 'padding-top'));
          var paddingRight = parseFloat(helpers.getStyle(canvas, 'padding-right'));
          var paddingBottom = parseFloat(helpers.getStyle(canvas, 'padding-bottom'));
          var width = boundingRect.right - boundingRect.left - paddingLeft - paddingRight;
          var height = boundingRect.bottom - boundingRect.top - paddingTop - paddingBottom;
          mouseX = Math.round((mouseX - boundingRect.left - paddingLeft) / (width) * canvas.width / chart.currentDevicePixelRatio);
          mouseY = Math.round((mouseY - boundingRect.top - paddingTop) / (height) * canvas.height / chart.currentDevicePixelRatio);
          return {
            x: mouseX,
            y: mouseY
          };
        };
        helpers.addEvent = function(node, eventType, method) {
          if (node.addEventListener) {
            node.addEventListener(eventType, method);
          } else if (node.attachEvent) {
            node.attachEvent("on" + eventType, method);
          } else {
            node["on" + eventType] = method;
          }
        };
        helpers.removeEvent = function(node, eventType, handler) {
          if (node.removeEventListener) {
            node.removeEventListener(eventType, handler, false);
          } else if (node.detachEvent) {
            node.detachEvent("on" + eventType, handler);
          } else {
            node["on" + eventType] = helpers.noop;
          }
        };
        helpers.bindEvents = function(chartInstance, arrayOfEvents, handler) {
          var events = chartInstance.events = chartInstance.events || {};
          helpers.each(arrayOfEvents, function(eventName) {
            events[eventName] = function() {
              handler.apply(chartInstance, arguments);
            };
            helpers.addEvent(chartInstance.chart.canvas, eventName, events[eventName]);
          });
        };
        helpers.unbindEvents = function(chartInstance, arrayOfEvents) {
          var canvas = chartInstance.chart.canvas;
          helpers.each(arrayOfEvents, function(handler, eventName) {
            helpers.removeEvent(canvas, eventName, handler);
          });
        };
        function parseMaxStyle(styleValue, node, parentProperty) {
          var valueInPixels;
          if (typeof(styleValue) === 'string') {
            valueInPixels = parseInt(styleValue, 10);
            if (styleValue.indexOf('%') != -1) {
              valueInPixels = valueInPixels / 100 * node.parentNode[parentProperty];
            }
          } else {
            valueInPixels = styleValue;
          }
          return valueInPixels;
        }
        function isConstrainedValue(value) {
          return value !== undefined && value !== null && value !== 'none';
        }
        function getConstraintDimension(domNode, maxStyle, percentageProperty) {
          var view = document.defaultView;
          var parentNode = domNode.parentNode;
          var constrainedNode = view.getComputedStyle(domNode)[maxStyle];
          var constrainedContainer = view.getComputedStyle(parentNode)[maxStyle];
          var hasCNode = isConstrainedValue(constrainedNode);
          var hasCContainer = isConstrainedValue(constrainedContainer);
          var infinity = Number.POSITIVE_INFINITY;
          if (hasCNode || hasCContainer) {
            return Math.min(hasCNode ? parseMaxStyle(constrainedNode, domNode, percentageProperty) : infinity, hasCContainer ? parseMaxStyle(constrainedContainer, parentNode, percentageProperty) : infinity);
          }
          return 'none';
        }
        helpers.getConstraintWidth = function(domNode) {
          return getConstraintDimension(domNode, 'max-width', 'clientWidth');
        };
        helpers.getConstraintHeight = function(domNode) {
          return getConstraintDimension(domNode, 'max-height', 'clientHeight');
        };
        helpers.getMaximumWidth = function(domNode) {
          var container = domNode.parentNode;
          var padding = parseInt(helpers.getStyle(container, 'padding-left')) + parseInt(helpers.getStyle(container, 'padding-right'));
          var w = container.clientWidth - padding;
          var cw = helpers.getConstraintWidth(domNode);
          return isNaN(cw) ? w : Math.min(w, cw);
        };
        helpers.getMaximumHeight = function(domNode) {
          var container = domNode.parentNode;
          var padding = parseInt(helpers.getStyle(container, 'padding-top')) + parseInt(helpers.getStyle(container, 'padding-bottom'));
          var h = container.clientHeight - padding;
          var ch = helpers.getConstraintHeight(domNode);
          return isNaN(ch) ? h : Math.min(h, ch);
        };
        helpers.getStyle = function(el, property) {
          return el.currentStyle ? el.currentStyle[property] : document.defaultView.getComputedStyle(el, null).getPropertyValue(property);
        };
        helpers.retinaScale = function(chart) {
          var ctx = chart.ctx;
          var canvas = chart.canvas;
          var width = canvas.width;
          var height = canvas.height;
          var pixelRatio = chart.currentDevicePixelRatio = window.devicePixelRatio || 1;
          if (pixelRatio !== 1) {
            canvas.height = height * pixelRatio;
            canvas.width = width * pixelRatio;
            ctx.scale(pixelRatio, pixelRatio);
            chart.originalDevicePixelRatio = chart.originalDevicePixelRatio || pixelRatio;
          }
          canvas.style.width = width + 'px';
          canvas.style.height = height + 'px';
        };
        helpers.clear = function(chart) {
          chart.ctx.clearRect(0, 0, chart.width, chart.height);
        };
        helpers.fontString = function(pixelSize, fontStyle, fontFamily) {
          return fontStyle + " " + pixelSize + "px " + fontFamily;
        };
        helpers.longestText = function(ctx, font, arrayOfStrings, cache) {
          cache = cache || {};
          var data = cache.data = cache.data || {};
          var gc = cache.garbageCollect = cache.garbageCollect || [];
          if (cache.font !== font) {
            data = cache.data = {};
            gc = cache.garbageCollect = [];
            cache.font = font;
          }
          ctx.font = font;
          var longest = 0;
          helpers.each(arrayOfStrings, function(string) {
            if (string !== undefined && string !== null) {
              var textWidth = data[string];
              if (!textWidth) {
                textWidth = data[string] = ctx.measureText(string).width;
                gc.push(string);
              }
              if (textWidth > longest) {
                longest = textWidth;
              }
            }
          });
          var gcLen = gc.length / 2;
          if (gcLen > arrayOfStrings.length) {
            for (var i = 0; i < gcLen; i++) {
              delete data[gc[i]];
            }
            gc.splice(0, gcLen);
          }
          return longest;
        };
        helpers.drawRoundedRectangle = function(ctx, x, y, width, height, radius) {
          ctx.beginPath();
          ctx.moveTo(x + radius, y);
          ctx.lineTo(x + width - radius, y);
          ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
          ctx.lineTo(x + width, y + height - radius);
          ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
          ctx.lineTo(x + radius, y + height);
          ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
          ctx.lineTo(x, y + radius);
          ctx.quadraticCurveTo(x, y, x + radius, y);
          ctx.closePath();
        };
        helpers.color = function(c) {
          if (!color) {
            console.log('Color.js not found!');
            return c;
          }
          if (c instanceof CanvasGradient) {
            return color(Chart.defaults.global.defaultColor);
          }
          return color(c);
        };
        helpers.addResizeListener = function(node, callback) {
          var hiddenIframe = document.createElement('iframe');
          var hiddenIframeClass = 'chartjs-hidden-iframe';
          if (hiddenIframe.classlist) {
            hiddenIframe.classlist.add(hiddenIframeClass);
          } else {
            hiddenIframe.setAttribute('class', hiddenIframeClass);
          }
          var style = hiddenIframe.style;
          style.width = '100%';
          style.display = 'block';
          style.border = 0;
          style.height = 0;
          style.margin = 0;
          style.position = 'absolute';
          style.left = 0;
          style.right = 0;
          style.top = 0;
          style.bottom = 0;
          node.insertBefore(hiddenIframe, node.firstChild);
          (hiddenIframe.contentWindow || hiddenIframe).onresize = function() {
            if (callback) {
              callback();
            }
          };
        };
        helpers.removeResizeListener = function(node) {
          var hiddenIframe = node.querySelector('.chartjs-hidden-iframe');
          if (hiddenIframe) {
            hiddenIframe.parentNode.removeChild(hiddenIframe);
          }
        };
        helpers.isArray = function(obj) {
          if (!Array.isArray) {
            return Object.prototype.toString.call(obj) === '[object Array]';
          }
          return Array.isArray(obj);
        };
        helpers.arrayEquals = function(a0, a1) {
          var i,
              ilen,
              v0,
              v1;
          if (!a0 || !a1 || a0.length != a1.length) {
            return false;
          }
          for (i = 0, ilen = a0.length; i < ilen; ++i) {
            v0 = a0[i];
            v1 = a1[i];
            if (v0 instanceof Array && v1 instanceof Array) {
              if (!helpers.arrayEquals(v0, v1)) {
                return false;
              }
            } else if (v0 != v1) {
              return false;
            }
          }
          return true;
        };
        helpers.pushAllIfDefined = function(element, array) {
          if (typeof element === "undefined") {
            return;
          }
          if (helpers.isArray(element)) {
            array.push.apply(array, element);
          } else {
            array.push(element);
          }
        };
        helpers.callCallback = function(fn, args, _tArg) {
          if (fn && typeof fn.call === 'function') {
            fn.apply(_tArg, args);
          }
        };
        helpers.getHoverColor = function(color) {
          return (color instanceof CanvasPattern) ? color : helpers.color(color).saturate(0.5).darken(0.1).rgbString();
        };
      };
    }, {"chartjs-color": 2}],
    26: [function(require, module, exports) {
      "use strict";
      module.exports = function() {
        var Chart = function(context, config) {
          this.config = config;
          if (context.length && context[0].getContext) {
            context = context[0];
          }
          if (context.getContext) {
            context = context.getContext("2d");
          }
          this.ctx = context;
          this.canvas = context.canvas;
          this.width = context.canvas.width || parseInt(Chart.helpers.getStyle(context.canvas, 'width')) || Chart.helpers.getMaximumWidth(context.canvas);
          this.height = context.canvas.height || parseInt(Chart.helpers.getStyle(context.canvas, 'height')) || Chart.helpers.getMaximumHeight(context.canvas);
          this.aspectRatio = this.width / this.height;
          if (isNaN(this.aspectRatio) || isFinite(this.aspectRatio) === false) {
            this.aspectRatio = config.aspectRatio !== undefined ? config.aspectRatio : 2;
          }
          this.originalCanvasStyleWidth = context.canvas.style.width;
          this.originalCanvasStyleHeight = context.canvas.style.height;
          Chart.helpers.retinaScale(this);
          if (config) {
            this.controller = new Chart.Controller(this);
          }
          var _this = this;
          Chart.helpers.addResizeListener(context.canvas.parentNode, function() {
            if (_this.controller && _this.controller.config.options.responsive) {
              _this.controller.resize();
            }
          });
          return this.controller ? this.controller : this;
        };
        Chart.defaults = {global: {
            responsive: true,
            responsiveAnimationDuration: 0,
            maintainAspectRatio: true,
            events: ["mousemove", "mouseout", "click", "touchstart", "touchmove"],
            hover: {
              onHover: null,
              mode: 'single',
              animationDuration: 400
            },
            onClick: null,
            defaultColor: 'rgba(0,0,0,0.1)',
            defaultFontColor: '#666',
            defaultFontFamily: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
            defaultFontSize: 12,
            defaultFontStyle: 'normal',
            showLines: true,
            elements: {},
            legendCallback: function(chart) {
              var text = [];
              text.push('<ul class="' + chart.id + '-legend">');
              for (var i = 0; i < chart.data.datasets.length; i++) {
                text.push('<li><span style="background-color:' + chart.data.datasets[i].backgroundColor + '"></span>');
                if (chart.data.datasets[i].label) {
                  text.push(chart.data.datasets[i].label);
                }
                text.push('</li>');
              }
              text.push('</ul>');
              return text.join("");
            }
          }};
        return Chart;
      };
    }, {}],
    27: [function(require, module, exports) {
      "use strict";
      module.exports = function(Chart) {
        var helpers = Chart.helpers;
        Chart.layoutService = {
          defaults: {},
          addBox: function(chartInstance, box) {
            if (!chartInstance.boxes) {
              chartInstance.boxes = [];
            }
            chartInstance.boxes.push(box);
          },
          removeBox: function(chartInstance, box) {
            if (!chartInstance.boxes) {
              return;
            }
            chartInstance.boxes.splice(chartInstance.boxes.indexOf(box), 1);
          },
          update: function(chartInstance, width, height) {
            if (!chartInstance) {
              return;
            }
            var xPadding = 0;
            var yPadding = 0;
            var leftBoxes = helpers.where(chartInstance.boxes, function(box) {
              return box.options.position === "left";
            });
            var rightBoxes = helpers.where(chartInstance.boxes, function(box) {
              return box.options.position === "right";
            });
            var topBoxes = helpers.where(chartInstance.boxes, function(box) {
              return box.options.position === "top";
            });
            var bottomBoxes = helpers.where(chartInstance.boxes, function(box) {
              return box.options.position === "bottom";
            });
            var chartAreaBoxes = helpers.where(chartInstance.boxes, function(box) {
              return box.options.position === "chartArea";
            });
            topBoxes.sort(function(a, b) {
              return (b.options.fullWidth ? 1 : 0) - (a.options.fullWidth ? 1 : 0);
            });
            bottomBoxes.sort(function(a, b) {
              return (a.options.fullWidth ? 1 : 0) - (b.options.fullWidth ? 1 : 0);
            });
            var chartWidth = width - (2 * xPadding);
            var chartHeight = height - (2 * yPadding);
            var chartAreaWidth = chartWidth / 2;
            var chartAreaHeight = chartHeight / 2;
            var verticalBoxWidth = (width - chartAreaWidth) / (leftBoxes.length + rightBoxes.length);
            var horizontalBoxHeight = (height - chartAreaHeight) / (topBoxes.length + bottomBoxes.length);
            var maxChartAreaWidth = chartWidth;
            var maxChartAreaHeight = chartHeight;
            var minBoxSizes = [];
            helpers.each(leftBoxes.concat(rightBoxes, topBoxes, bottomBoxes), getMinimumBoxSize);
            function getMinimumBoxSize(box) {
              var minSize;
              var isHorizontal = box.isHorizontal();
              if (isHorizontal) {
                minSize = box.update(box.options.fullWidth ? chartWidth : maxChartAreaWidth, horizontalBoxHeight);
                maxChartAreaHeight -= minSize.height;
              } else {
                minSize = box.update(verticalBoxWidth, chartAreaHeight);
                maxChartAreaWidth -= minSize.width;
              }
              minBoxSizes.push({
                horizontal: isHorizontal,
                minSize: minSize,
                box: box
              });
            }
            var totalLeftBoxesWidth = xPadding;
            var totalRightBoxesWidth = xPadding;
            var totalTopBoxesHeight = yPadding;
            var totalBottomBoxesHeight = yPadding;
            helpers.each(leftBoxes.concat(rightBoxes), fitBox);
            helpers.each(leftBoxes, function(box) {
              totalLeftBoxesWidth += box.width;
            });
            helpers.each(rightBoxes, function(box) {
              totalRightBoxesWidth += box.width;
            });
            helpers.each(topBoxes.concat(bottomBoxes), fitBox);
            function fitBox(box) {
              var minBoxSize = helpers.findNextWhere(minBoxSizes, function(minBoxSize) {
                return minBoxSize.box === box;
              });
              if (minBoxSize) {
                if (box.isHorizontal()) {
                  var scaleMargin = {
                    left: totalLeftBoxesWidth,
                    right: totalRightBoxesWidth,
                    top: 0,
                    bottom: 0
                  };
                  box.update(box.options.fullWidth ? chartWidth : maxChartAreaWidth, chartHeight / 2, scaleMargin);
                } else {
                  box.update(minBoxSize.minSize.width, maxChartAreaHeight);
                }
              }
            }
            helpers.each(topBoxes, function(box) {
              totalTopBoxesHeight += box.height;
            });
            helpers.each(bottomBoxes, function(box) {
              totalBottomBoxesHeight += box.height;
            });
            helpers.each(leftBoxes.concat(rightBoxes), finalFitVerticalBox);
            function finalFitVerticalBox(box) {
              var minBoxSize = helpers.findNextWhere(minBoxSizes, function(minBoxSize) {
                return minBoxSize.box === box;
              });
              var scaleMargin = {
                left: 0,
                right: 0,
                top: totalTopBoxesHeight,
                bottom: totalBottomBoxesHeight
              };
              if (minBoxSize) {
                box.update(minBoxSize.minSize.width, maxChartAreaHeight, scaleMargin);
              }
            }
            totalLeftBoxesWidth = xPadding;
            totalRightBoxesWidth = xPadding;
            totalTopBoxesHeight = yPadding;
            totalBottomBoxesHeight = yPadding;
            helpers.each(leftBoxes, function(box) {
              totalLeftBoxesWidth += box.width;
            });
            helpers.each(rightBoxes, function(box) {
              totalRightBoxesWidth += box.width;
            });
            helpers.each(topBoxes, function(box) {
              totalTopBoxesHeight += box.height;
            });
            helpers.each(bottomBoxes, function(box) {
              totalBottomBoxesHeight += box.height;
            });
            var newMaxChartAreaHeight = height - totalTopBoxesHeight - totalBottomBoxesHeight;
            var newMaxChartAreaWidth = width - totalLeftBoxesWidth - totalRightBoxesWidth;
            if (newMaxChartAreaWidth !== maxChartAreaWidth || newMaxChartAreaHeight !== maxChartAreaHeight) {
              helpers.each(leftBoxes, function(box) {
                box.height = newMaxChartAreaHeight;
              });
              helpers.each(rightBoxes, function(box) {
                box.height = newMaxChartAreaHeight;
              });
              helpers.each(topBoxes, function(box) {
                if (!box.options.fullWidth) {
                  box.width = newMaxChartAreaWidth;
                }
              });
              helpers.each(bottomBoxes, function(box) {
                if (!box.options.fullWidth) {
                  box.width = newMaxChartAreaWidth;
                }
              });
              maxChartAreaHeight = newMaxChartAreaHeight;
              maxChartAreaWidth = newMaxChartAreaWidth;
            }
            var left = xPadding;
            var top = yPadding;
            var right = 0;
            var bottom = 0;
            helpers.each(leftBoxes.concat(topBoxes), placeBox);
            left += maxChartAreaWidth;
            top += maxChartAreaHeight;
            helpers.each(rightBoxes, placeBox);
            helpers.each(bottomBoxes, placeBox);
            function placeBox(box) {
              if (box.isHorizontal()) {
                box.left = box.options.fullWidth ? xPadding : totalLeftBoxesWidth;
                box.right = box.options.fullWidth ? width - xPadding : totalLeftBoxesWidth + maxChartAreaWidth;
                box.top = top;
                box.bottom = top + box.height;
                top = box.bottom;
              } else {
                box.left = left;
                box.right = left + box.width;
                box.top = totalTopBoxesHeight;
                box.bottom = totalTopBoxesHeight + maxChartAreaHeight;
                left = box.right;
              }
            }
            chartInstance.chartArea = {
              left: totalLeftBoxesWidth,
              top: totalTopBoxesHeight,
              right: totalLeftBoxesWidth + maxChartAreaWidth,
              bottom: totalTopBoxesHeight + maxChartAreaHeight
            };
            helpers.each(chartAreaBoxes, function(box) {
              box.left = chartInstance.chartArea.left;
              box.top = chartInstance.chartArea.top;
              box.right = chartInstance.chartArea.right;
              box.bottom = chartInstance.chartArea.bottom;
              box.update(maxChartAreaWidth, maxChartAreaHeight);
            });
          }
        };
      };
    }, {}],
    28: [function(require, module, exports) {
      "use strict";
      module.exports = function(Chart) {
        var helpers = Chart.helpers;
        var noop = helpers.noop;
        Chart.defaults.global.legend = {
          display: true,
          position: 'top',
          fullWidth: true,
          reverse: false,
          onClick: function(e, legendItem) {
            var index = legendItem.datasetIndex;
            var ci = this.chart;
            var meta = ci.getDatasetMeta(index);
            meta.hidden = meta.hidden === null ? !ci.data.datasets[index].hidden : null;
            ci.update();
          },
          labels: {
            boxWidth: 40,
            padding: 10,
            generateLabels: function(chart) {
              var data = chart.data;
              return helpers.isArray(data.datasets) ? data.datasets.map(function(dataset, i) {
                return {
                  text: dataset.label,
                  fillStyle: dataset.backgroundColor,
                  hidden: !chart.isDatasetVisible(i),
                  lineCap: dataset.borderCapStyle,
                  lineDash: dataset.borderDash,
                  lineDashOffset: dataset.borderDashOffset,
                  lineJoin: dataset.borderJoinStyle,
                  lineWidth: dataset.borderWidth,
                  strokeStyle: dataset.borderColor,
                  datasetIndex: i
                };
              }, this) : [];
            }
          }
        };
        Chart.Legend = Chart.Element.extend({
          initialize: function(config) {
            helpers.extend(this, config);
            this.legendHitBoxes = [];
            this.doughnutMode = false;
          },
          beforeUpdate: noop,
          update: function(maxWidth, maxHeight, margins) {
            this.beforeUpdate();
            this.maxWidth = maxWidth;
            this.maxHeight = maxHeight;
            this.margins = margins;
            this.beforeSetDimensions();
            this.setDimensions();
            this.afterSetDimensions();
            this.beforeBuildLabels();
            this.buildLabels();
            this.afterBuildLabels();
            this.beforeFit();
            this.fit();
            this.afterFit();
            this.afterUpdate();
            return this.minSize;
          },
          afterUpdate: noop,
          beforeSetDimensions: noop,
          setDimensions: function() {
            if (this.isHorizontal()) {
              this.width = this.maxWidth;
              this.left = 0;
              this.right = this.width;
            } else {
              this.height = this.maxHeight;
              this.top = 0;
              this.bottom = this.height;
            }
            this.paddingLeft = 0;
            this.paddingTop = 0;
            this.paddingRight = 0;
            this.paddingBottom = 0;
            this.minSize = {
              width: 0,
              height: 0
            };
          },
          afterSetDimensions: noop,
          beforeBuildLabels: noop,
          buildLabels: function() {
            this.legendItems = this.options.labels.generateLabels.call(this, this.chart);
            if (this.options.reverse) {
              this.legendItems.reverse();
            }
          },
          afterBuildLabels: noop,
          beforeFit: noop,
          fit: function() {
            var opts = this.options;
            var labelOpts = opts.labels;
            var display = opts.display;
            var ctx = this.ctx;
            var globalDefault = Chart.defaults.global,
                itemOrDefault = helpers.getValueOrDefault,
                fontSize = itemOrDefault(labelOpts.fontSize, globalDefault.defaultFontSize),
                fontStyle = itemOrDefault(labelOpts.fontStyle, globalDefault.defaultFontStyle),
                fontFamily = itemOrDefault(labelOpts.fontFamily, globalDefault.defaultFontFamily),
                labelFont = helpers.fontString(fontSize, fontStyle, fontFamily);
            var hitboxes = this.legendHitBoxes = [];
            var minSize = this.minSize;
            var isHorizontal = this.isHorizontal();
            if (isHorizontal) {
              minSize.width = this.maxWidth;
              minSize.height = display ? 10 : 0;
            } else {
              minSize.width = display ? 10 : 0;
              minSize.height = this.maxHeight;
            }
            if (display) {
              if (isHorizontal) {
                var lineWidths = this.lineWidths = [0];
                var totalHeight = this.legendItems.length ? fontSize + (labelOpts.padding) : 0;
                ctx.textAlign = "left";
                ctx.textBaseline = 'top';
                ctx.font = labelFont;
                helpers.each(this.legendItems, function(legendItem, i) {
                  var width = labelOpts.boxWidth + (fontSize / 2) + ctx.measureText(legendItem.text).width;
                  if (lineWidths[lineWidths.length - 1] + width + labelOpts.padding >= this.width) {
                    totalHeight += fontSize + (labelOpts.padding);
                    lineWidths[lineWidths.length] = this.left;
                  }
                  hitboxes[i] = {
                    left: 0,
                    top: 0,
                    width: width,
                    height: fontSize
                  };
                  lineWidths[lineWidths.length - 1] += width + labelOpts.padding;
                }, this);
                minSize.height += totalHeight;
              } else {}
            }
            this.width = minSize.width;
            this.height = minSize.height;
          },
          afterFit: noop,
          isHorizontal: function() {
            return this.options.position === "top" || this.options.position === "bottom";
          },
          draw: function() {
            var opts = this.options;
            var labelOpts = opts.labels;
            var globalDefault = Chart.defaults.global,
                lineDefault = globalDefault.elements.line,
                legendWidth = this.width,
                lineWidths = this.lineWidths;
            if (opts.display) {
              var ctx = this.ctx,
                  cursor = {
                    x: this.left + ((legendWidth - lineWidths[0]) / 2),
                    y: this.top + labelOpts.padding,
                    line: 0
                  },
                  itemOrDefault = helpers.getValueOrDefault,
                  fontColor = itemOrDefault(labelOpts.fontColor, globalDefault.defaultFontColor),
                  fontSize = itemOrDefault(labelOpts.fontSize, globalDefault.defaultFontSize),
                  fontStyle = itemOrDefault(labelOpts.fontStyle, globalDefault.defaultFontStyle),
                  fontFamily = itemOrDefault(labelOpts.fontFamily, globalDefault.defaultFontFamily),
                  labelFont = helpers.fontString(fontSize, fontStyle, fontFamily);
              if (this.isHorizontal()) {
                ctx.textAlign = "left";
                ctx.textBaseline = 'top';
                ctx.lineWidth = 0.5;
                ctx.strokeStyle = fontColor;
                ctx.fillStyle = fontColor;
                ctx.font = labelFont;
                var boxWidth = labelOpts.boxWidth,
                    hitboxes = this.legendHitBoxes;
                helpers.each(this.legendItems, function(legendItem, i) {
                  var textWidth = ctx.measureText(legendItem.text).width,
                      width = boxWidth + (fontSize / 2) + textWidth,
                      x = cursor.x,
                      y = cursor.y;
                  if (x + width >= legendWidth) {
                    y = cursor.y += fontSize + (labelOpts.padding);
                    cursor.line++;
                    x = cursor.x = this.left + ((legendWidth - lineWidths[cursor.line]) / 2);
                  }
                  ctx.save();
                  ctx.fillStyle = itemOrDefault(legendItem.fillStyle, globalDefault.defaultColor);
                  ctx.lineCap = itemOrDefault(legendItem.lineCap, lineDefault.borderCapStyle);
                  ctx.lineDashOffset = itemOrDefault(legendItem.lineDashOffset, lineDefault.borderDashOffset);
                  ctx.lineJoin = itemOrDefault(legendItem.lineJoin, lineDefault.borderJoinStyle);
                  ctx.lineWidth = itemOrDefault(legendItem.lineWidth, lineDefault.borderWidth);
                  ctx.strokeStyle = itemOrDefault(legendItem.strokeStyle, globalDefault.defaultColor);
                  if (ctx.setLineDash) {
                    ctx.setLineDash(itemOrDefault(legendItem.lineDash, lineDefault.borderDash));
                  }
                  ctx.strokeRect(x, y, boxWidth, fontSize);
                  ctx.fillRect(x, y, boxWidth, fontSize);
                  ctx.restore();
                  hitboxes[i].left = x;
                  hitboxes[i].top = y;
                  ctx.fillText(legendItem.text, boxWidth + (fontSize / 2) + x, y);
                  if (legendItem.hidden) {
                    ctx.beginPath();
                    ctx.lineWidth = 2;
                    ctx.moveTo(boxWidth + (fontSize / 2) + x, y + (fontSize / 2));
                    ctx.lineTo(boxWidth + (fontSize / 2) + x + textWidth, y + (fontSize / 2));
                    ctx.stroke();
                  }
                  cursor.x += width + (labelOpts.padding);
                }, this);
              } else {}
            }
          },
          handleEvent: function(e) {
            var position = helpers.getRelativePosition(e, this.chart.chart),
                x = position.x,
                y = position.y,
                opts = this.options;
            if (x >= this.left && x <= this.right && y >= this.top && y <= this.bottom) {
              var lh = this.legendHitBoxes;
              for (var i = 0; i < lh.length; ++i) {
                var hitBox = lh[i];
                if (x >= hitBox.left && x <= hitBox.left + hitBox.width && y >= hitBox.top && y <= hitBox.top + hitBox.height) {
                  if (opts.onClick) {
                    opts.onClick.call(this, e, this.legendItems[i]);
                  }
                  break;
                }
              }
            }
          }
        });
      };
    }, {}],
    29: [function(require, module, exports) {
      "use strict";
      module.exports = function(Chart) {
        var helpers = Chart.helpers;
        Chart.plugins = [];
        Chart.pluginService = {
          register: function(plugin) {
            var p = Chart.plugins;
            if (p.indexOf(plugin) === -1) {
              p.push(plugin);
            }
          },
          remove: function(plugin) {
            var p = Chart.plugins;
            var idx = p.indexOf(plugin);
            if (idx !== -1) {
              p.splice(idx, 1);
            }
          },
          notifyPlugins: function(method, args, scope) {
            helpers.each(Chart.plugins, function(plugin) {
              if (plugin[method] && typeof plugin[method] === 'function') {
                plugin[method].apply(scope, args);
              }
            }, scope);
          }
        };
        var noop = helpers.noop;
        Chart.PluginBase = Chart.Element.extend({
          beforeInit: noop,
          afterInit: noop,
          beforeUpdate: noop,
          afterUpdate: noop,
          beforeDraw: noop,
          afterDraw: noop,
          destroy: noop
        });
      };
    }, {}],
    30: [function(require, module, exports) {
      "use strict";
      module.exports = function(Chart) {
        var helpers = Chart.helpers;
        Chart.defaults.scale = {
          display: true,
          position: "left",
          gridLines: {
            display: true,
            color: "rgba(0, 0, 0, 0.1)",
            lineWidth: 1,
            drawBorder: true,
            drawOnChartArea: true,
            drawTicks: true,
            tickMarkLength: 10,
            zeroLineWidth: 1,
            zeroLineColor: "rgba(0,0,0,0.25)",
            offsetGridLines: false
          },
          scaleLabel: {
            labelString: '',
            display: false
          },
          ticks: {
            beginAtZero: false,
            minRotation: 0,
            maxRotation: 50,
            mirror: false,
            padding: 10,
            reverse: false,
            display: true,
            autoSkip: true,
            autoSkipPadding: 0,
            labelOffset: 0,
            callback: function(value) {
              return '' + value;
            }
          }
        };
        Chart.Scale = Chart.Element.extend({
          beforeUpdate: function() {
            helpers.callCallback(this.options.beforeUpdate, [this]);
          },
          update: function(maxWidth, maxHeight, margins) {
            this.beforeUpdate();
            this.maxWidth = maxWidth;
            this.maxHeight = maxHeight;
            this.margins = helpers.extend({
              left: 0,
              right: 0,
              top: 0,
              bottom: 0
            }, margins);
            this.beforeSetDimensions();
            this.setDimensions();
            this.afterSetDimensions();
            this.beforeDataLimits();
            this.determineDataLimits();
            this.afterDataLimits();
            this.beforeBuildTicks();
            this.buildTicks();
            this.afterBuildTicks();
            this.beforeTickToLabelConversion();
            this.convertTicksToLabels();
            this.afterTickToLabelConversion();
            this.beforeCalculateTickRotation();
            this.calculateTickRotation();
            this.afterCalculateTickRotation();
            this.beforeFit();
            this.fit();
            this.afterFit();
            this.afterUpdate();
            return this.minSize;
          },
          afterUpdate: function() {
            helpers.callCallback(this.options.afterUpdate, [this]);
          },
          beforeSetDimensions: function() {
            helpers.callCallback(this.options.beforeSetDimensions, [this]);
          },
          setDimensions: function() {
            if (this.isHorizontal()) {
              this.width = this.maxWidth;
              this.left = 0;
              this.right = this.width;
            } else {
              this.height = this.maxHeight;
              this.top = 0;
              this.bottom = this.height;
            }
            this.paddingLeft = 0;
            this.paddingTop = 0;
            this.paddingRight = 0;
            this.paddingBottom = 0;
          },
          afterSetDimensions: function() {
            helpers.callCallback(this.options.afterSetDimensions, [this]);
          },
          beforeDataLimits: function() {
            helpers.callCallback(this.options.beforeDataLimits, [this]);
          },
          determineDataLimits: helpers.noop,
          afterDataLimits: function() {
            helpers.callCallback(this.options.afterDataLimits, [this]);
          },
          beforeBuildTicks: function() {
            helpers.callCallback(this.options.beforeBuildTicks, [this]);
          },
          buildTicks: helpers.noop,
          afterBuildTicks: function() {
            helpers.callCallback(this.options.afterBuildTicks, [this]);
          },
          beforeTickToLabelConversion: function() {
            helpers.callCallback(this.options.beforeTickToLabelConversion, [this]);
          },
          convertTicksToLabels: function() {
            this.ticks = this.ticks.map(function(numericalTick, index, ticks) {
              if (this.options.ticks.userCallback) {
                return this.options.ticks.userCallback(numericalTick, index, ticks);
              }
              return this.options.ticks.callback(numericalTick, index, ticks);
            }, this);
          },
          afterTickToLabelConversion: function() {
            helpers.callCallback(this.options.afterTickToLabelConversion, [this]);
          },
          beforeCalculateTickRotation: function() {
            helpers.callCallback(this.options.beforeCalculateTickRotation, [this]);
          },
          calculateTickRotation: function() {
            var context = this.ctx;
            var globalDefaults = Chart.defaults.global;
            var optionTicks = this.options.ticks;
            var tickFontSize = helpers.getValueOrDefault(optionTicks.fontSize, globalDefaults.defaultFontSize);
            var tickFontStyle = helpers.getValueOrDefault(optionTicks.fontStyle, globalDefaults.defaultFontStyle);
            var tickFontFamily = helpers.getValueOrDefault(optionTicks.fontFamily, globalDefaults.defaultFontFamily);
            var tickLabelFont = helpers.fontString(tickFontSize, tickFontStyle, tickFontFamily);
            context.font = tickLabelFont;
            var firstWidth = context.measureText(this.ticks[0]).width;
            var lastWidth = context.measureText(this.ticks[this.ticks.length - 1]).width;
            var firstRotated;
            this.labelRotation = optionTicks.minRotation || 0;
            this.paddingRight = 0;
            this.paddingLeft = 0;
            if (this.options.display) {
              if (this.isHorizontal()) {
                this.paddingRight = lastWidth / 2 + 3;
                this.paddingLeft = firstWidth / 2 + 3;
                if (!this.longestTextCache) {
                  this.longestTextCache = {};
                }
                var originalLabelWidth = helpers.longestText(context, tickLabelFont, this.ticks, this.longestTextCache);
                var labelWidth = originalLabelWidth;
                var cosRotation;
                var sinRotation;
                var tickWidth = this.getPixelForTick(1) - this.getPixelForTick(0) - 6;
                while (labelWidth > tickWidth && this.labelRotation < optionTicks.maxRotation) {
                  cosRotation = Math.cos(helpers.toRadians(this.labelRotation));
                  sinRotation = Math.sin(helpers.toRadians(this.labelRotation));
                  firstRotated = cosRotation * firstWidth;
                  if (firstRotated + tickFontSize / 2 > this.yLabelWidth) {
                    this.paddingLeft = firstRotated + tickFontSize / 2;
                  }
                  this.paddingRight = tickFontSize / 2;
                  if (sinRotation * originalLabelWidth > this.maxHeight) {
                    this.labelRotation--;
                    break;
                  }
                  this.labelRotation++;
                  labelWidth = cosRotation * originalLabelWidth;
                }
              }
            }
            if (this.margins) {
              this.paddingLeft = Math.max(this.paddingLeft - this.margins.left, 0);
              this.paddingRight = Math.max(this.paddingRight - this.margins.right, 0);
            }
          },
          afterCalculateTickRotation: function() {
            helpers.callCallback(this.options.afterCalculateTickRotation, [this]);
          },
          beforeFit: function() {
            helpers.callCallback(this.options.beforeFit, [this]);
          },
          fit: function() {
            var minSize = this.minSize = {
              width: 0,
              height: 0
            };
            var opts = this.options;
            var globalDefaults = Chart.defaults.global;
            var tickOpts = opts.ticks;
            var scaleLabelOpts = opts.scaleLabel;
            var display = opts.display;
            var isHorizontal = this.isHorizontal();
            var tickFontSize = helpers.getValueOrDefault(tickOpts.fontSize, globalDefaults.defaultFontSize);
            var tickFontStyle = helpers.getValueOrDefault(tickOpts.fontStyle, globalDefaults.defaultFontStyle);
            var tickFontFamily = helpers.getValueOrDefault(tickOpts.fontFamily, globalDefaults.defaultFontFamily);
            var tickLabelFont = helpers.fontString(tickFontSize, tickFontStyle, tickFontFamily);
            var scaleLabelFontSize = helpers.getValueOrDefault(scaleLabelOpts.fontSize, globalDefaults.defaultFontSize);
            var scaleLabelFontStyle = helpers.getValueOrDefault(scaleLabelOpts.fontStyle, globalDefaults.defaultFontStyle);
            var scaleLabelFontFamily = helpers.getValueOrDefault(scaleLabelOpts.fontFamily, globalDefaults.defaultFontFamily);
            var scaleLabelFont = helpers.fontString(scaleLabelFontSize, scaleLabelFontStyle, scaleLabelFontFamily);
            var tickMarkLength = opts.gridLines.tickMarkLength;
            if (isHorizontal) {
              minSize.width = this.isFullWidth() ? this.maxWidth - this.margins.left - this.margins.right : this.maxWidth;
            } else {
              minSize.width = display ? tickMarkLength : 0;
            }
            if (isHorizontal) {
              minSize.height = display ? tickMarkLength : 0;
            } else {
              minSize.height = this.maxHeight;
            }
            if (scaleLabelOpts.display && display) {
              if (isHorizontal) {
                minSize.height += (scaleLabelFontSize * 1.5);
              } else {
                minSize.width += (scaleLabelFontSize * 1.5);
              }
            }
            if (tickOpts.display && display) {
              if (!this.longestTextCache) {
                this.longestTextCache = {};
              }
              var largestTextWidth = helpers.longestText(this.ctx, tickLabelFont, this.ticks, this.longestTextCache);
              if (isHorizontal) {
                this.longestLabelWidth = largestTextWidth;
                var labelHeight = (Math.sin(helpers.toRadians(this.labelRotation)) * this.longestLabelWidth) + 1.5 * tickFontSize;
                minSize.height = Math.min(this.maxHeight, minSize.height + labelHeight);
                this.ctx.font = tickLabelFont;
                var firstLabelWidth = this.ctx.measureText(this.ticks[0]).width;
                var lastLabelWidth = this.ctx.measureText(this.ticks[this.ticks.length - 1]).width;
                var cosRotation = Math.cos(helpers.toRadians(this.labelRotation));
                var sinRotation = Math.sin(helpers.toRadians(this.labelRotation));
                this.paddingLeft = this.labelRotation !== 0 ? (cosRotation * firstLabelWidth) + 3 : firstLabelWidth / 2 + 3;
                this.paddingRight = this.labelRotation !== 0 ? (sinRotation * (tickFontSize / 2)) + 3 : lastLabelWidth / 2 + 3;
              } else {
                var maxLabelWidth = this.maxWidth - minSize.width;
                var mirror = tickOpts.mirror;
                if (!mirror) {
                  largestTextWidth += this.options.ticks.padding;
                } else {
                  largestTextWidth = 0;
                }
                if (largestTextWidth < maxLabelWidth) {
                  minSize.width += largestTextWidth;
                } else {
                  minSize.width = this.maxWidth;
                }
                this.paddingTop = tickFontSize / 2;
                this.paddingBottom = tickFontSize / 2;
              }
            }
            if (this.margins) {
              this.paddingLeft = Math.max(this.paddingLeft - this.margins.left, 0);
              this.paddingTop = Math.max(this.paddingTop - this.margins.top, 0);
              this.paddingRight = Math.max(this.paddingRight - this.margins.right, 0);
              this.paddingBottom = Math.max(this.paddingBottom - this.margins.bottom, 0);
            }
            this.width = minSize.width;
            this.height = minSize.height;
          },
          afterFit: function() {
            helpers.callCallback(this.options.afterFit, [this]);
          },
          isHorizontal: function() {
            return this.options.position === "top" || this.options.position === "bottom";
          },
          isFullWidth: function() {
            return (this.options.fullWidth);
          },
          getRightValue: function getRightValue(rawValue) {
            if (rawValue === null || typeof(rawValue) === 'undefined') {
              return NaN;
            }
            if (typeof(rawValue) === 'number' && isNaN(rawValue)) {
              return NaN;
            }
            if (typeof(rawValue) === "object") {
              if ((rawValue instanceof Date) || (rawValue.isValid)) {
                return rawValue;
              } else {
                return getRightValue(this.isHorizontal() ? rawValue.x : rawValue.y);
              }
            }
            return rawValue;
          },
          getLabelForIndex: helpers.noop,
          getPixelForValue: helpers.noop,
          getValueForPixel: helpers.noop,
          getPixelForTick: function(index, includeOffset) {
            if (this.isHorizontal()) {
              var innerWidth = this.width - (this.paddingLeft + this.paddingRight);
              var tickWidth = innerWidth / Math.max((this.ticks.length - ((this.options.gridLines.offsetGridLines) ? 0 : 1)), 1);
              var pixel = (tickWidth * index) + this.paddingLeft;
              if (includeOffset) {
                pixel += tickWidth / 2;
              }
              var finalVal = this.left + Math.round(pixel);
              finalVal += this.isFullWidth() ? this.margins.left : 0;
              return finalVal;
            } else {
              var innerHeight = this.height - (this.paddingTop + this.paddingBottom);
              return this.top + (index * (innerHeight / (this.ticks.length - 1)));
            }
          },
          getPixelForDecimal: function(decimal) {
            if (this.isHorizontal()) {
              var innerWidth = this.width - (this.paddingLeft + this.paddingRight);
              var valueOffset = (innerWidth * decimal) + this.paddingLeft;
              var finalVal = this.left + Math.round(valueOffset);
              finalVal += this.isFullWidth() ? this.margins.left : 0;
              return finalVal;
            } else {
              return this.top + (decimal * this.height);
            }
          },
          getBasePixel: function() {
            var me = this;
            var min = me.min;
            var max = me.max;
            return me.getPixelForValue(me.beginAtZero ? 0 : min < 0 && max < 0 ? max : min > 0 && max > 0 ? min : 0);
          },
          draw: function(chartArea) {
            var options = this.options;
            if (!options.display) {
              return;
            }
            var context = this.ctx;
            var globalDefaults = Chart.defaults.global;
            var optionTicks = options.ticks;
            var gridLines = options.gridLines;
            var scaleLabel = options.scaleLabel;
            var setContextLineSettings;
            var isRotated = this.labelRotation !== 0;
            var skipRatio;
            var scaleLabelX;
            var scaleLabelY;
            var useAutoskipper = optionTicks.autoSkip;
            var maxTicks;
            if (optionTicks.maxTicksLimit) {
              maxTicks = optionTicks.maxTicksLimit;
            }
            var tickFontColor = helpers.getValueOrDefault(optionTicks.fontColor, globalDefaults.defaultFontColor);
            var tickFontSize = helpers.getValueOrDefault(optionTicks.fontSize, globalDefaults.defaultFontSize);
            var tickFontStyle = helpers.getValueOrDefault(optionTicks.fontStyle, globalDefaults.defaultFontStyle);
            var tickFontFamily = helpers.getValueOrDefault(optionTicks.fontFamily, globalDefaults.defaultFontFamily);
            var tickLabelFont = helpers.fontString(tickFontSize, tickFontStyle, tickFontFamily);
            var tl = gridLines.tickMarkLength;
            var scaleLabelFontColor = helpers.getValueOrDefault(scaleLabel.fontColor, globalDefaults.defaultFontColor);
            var scaleLabelFontSize = helpers.getValueOrDefault(scaleLabel.fontSize, globalDefaults.defaultFontSize);
            var scaleLabelFontStyle = helpers.getValueOrDefault(scaleLabel.fontStyle, globalDefaults.defaultFontStyle);
            var scaleLabelFontFamily = helpers.getValueOrDefault(scaleLabel.fontFamily, globalDefaults.defaultFontFamily);
            var scaleLabelFont = helpers.fontString(scaleLabelFontSize, scaleLabelFontStyle, scaleLabelFontFamily);
            var labelRotationRadians = helpers.toRadians(this.labelRotation);
            var cosRotation = Math.cos(labelRotationRadians);
            var sinRotation = Math.sin(labelRotationRadians);
            var longestRotatedLabel = this.longestLabelWidth * cosRotation;
            var rotatedLabelHeight = tickFontSize * sinRotation;
            context.fillStyle = tickFontColor;
            if (this.isHorizontal()) {
              setContextLineSettings = true;
              var yTickStart = options.position === "bottom" ? this.top : this.bottom - tl;
              var yTickEnd = options.position === "bottom" ? this.top + tl : this.bottom;
              skipRatio = false;
              if (isRotated) {
                longestRotatedLabel /= 2;
              }
              if ((longestRotatedLabel + optionTicks.autoSkipPadding) * this.ticks.length > (this.width - (this.paddingLeft + this.paddingRight))) {
                skipRatio = 1 + Math.floor(((longestRotatedLabel + optionTicks.autoSkipPadding) * this.ticks.length) / (this.width - (this.paddingLeft + this.paddingRight)));
              }
              if (maxTicks && this.ticks.length > maxTicks) {
                while (!skipRatio || this.ticks.length / (skipRatio || 1) > maxTicks) {
                  if (!skipRatio) {
                    skipRatio = 1;
                  }
                  skipRatio += 1;
                }
              }
              if (!useAutoskipper) {
                skipRatio = false;
              }
              helpers.each(this.ticks, function(label, index) {
                var isLastTick = this.ticks.length === index + 1;
                var shouldSkip = (skipRatio > 1 && index % skipRatio > 0) || (index % skipRatio === 0 && index + skipRatio >= this.ticks.length);
                if (shouldSkip && !isLastTick || (label === undefined || label === null)) {
                  return;
                }
                var xLineValue = this.getPixelForTick(index);
                var xLabelValue = this.getPixelForTick(index, gridLines.offsetGridLines);
                if (gridLines.display) {
                  if (index === (typeof this.zeroLineIndex !== 'undefined' ? this.zeroLineIndex : 0)) {
                    context.lineWidth = gridLines.zeroLineWidth;
                    context.strokeStyle = gridLines.zeroLineColor;
                    setContextLineSettings = true;
                  } else if (setContextLineSettings) {
                    context.lineWidth = gridLines.lineWidth;
                    context.strokeStyle = gridLines.color;
                    setContextLineSettings = false;
                  }
                  xLineValue += helpers.aliasPixel(context.lineWidth);
                  context.beginPath();
                  if (gridLines.drawTicks) {
                    context.moveTo(xLineValue, yTickStart);
                    context.lineTo(xLineValue, yTickEnd);
                  }
                  if (gridLines.drawOnChartArea) {
                    context.moveTo(xLineValue, chartArea.top);
                    context.lineTo(xLineValue, chartArea.bottom);
                  }
                  context.stroke();
                }
                if (optionTicks.display) {
                  context.save();
                  context.translate(xLabelValue + optionTicks.labelOffset, (isRotated) ? this.top + 12 : options.position === "top" ? this.bottom - tl : this.top + tl);
                  context.rotate(labelRotationRadians * -1);
                  context.font = tickLabelFont;
                  context.textAlign = (isRotated) ? "right" : "center";
                  context.textBaseline = (isRotated) ? "middle" : options.position === "top" ? "bottom" : "top";
                  context.fillText(label, 0, 0);
                  context.restore();
                }
              }, this);
              if (scaleLabel.display) {
                context.textAlign = "center";
                context.textBaseline = 'middle';
                context.fillStyle = scaleLabelFontColor;
                context.font = scaleLabelFont;
                scaleLabelX = this.left + ((this.right - this.left) / 2);
                scaleLabelY = options.position === 'bottom' ? this.bottom - (scaleLabelFontSize / 2) : this.top + (scaleLabelFontSize / 2);
                context.fillText(scaleLabel.labelString, scaleLabelX, scaleLabelY);
              }
            } else {
              setContextLineSettings = true;
              var xTickStart = options.position === "right" ? this.left : this.right - 5;
              var xTickEnd = options.position === "right" ? this.left + 5 : this.right;
              helpers.each(this.ticks, function(label, index) {
                if (label === undefined || label === null) {
                  return;
                }
                var yLineValue = this.getPixelForTick(index);
                if (gridLines.display) {
                  if (index === (typeof this.zeroLineIndex !== 'undefined' ? this.zeroLineIndex : 0)) {
                    context.lineWidth = gridLines.zeroLineWidth;
                    context.strokeStyle = gridLines.zeroLineColor;
                    setContextLineSettings = true;
                  } else if (setContextLineSettings) {
                    context.lineWidth = gridLines.lineWidth;
                    context.strokeStyle = gridLines.color;
                    setContextLineSettings = false;
                  }
                  yLineValue += helpers.aliasPixel(context.lineWidth);
                  context.beginPath();
                  if (gridLines.drawTicks) {
                    context.moveTo(xTickStart, yLineValue);
                    context.lineTo(xTickEnd, yLineValue);
                  }
                  if (gridLines.drawOnChartArea) {
                    context.moveTo(chartArea.left, yLineValue);
                    context.lineTo(chartArea.right, yLineValue);
                  }
                  context.stroke();
                }
                if (optionTicks.display) {
                  var xLabelValue;
                  var yLabelValue = this.getPixelForTick(index, gridLines.offsetGridLines);
                  context.save();
                  if (options.position === "left") {
                    if (optionTicks.mirror) {
                      xLabelValue = this.right + optionTicks.padding;
                      context.textAlign = "left";
                    } else {
                      xLabelValue = this.right - optionTicks.padding;
                      context.textAlign = "right";
                    }
                  } else {
                    if (optionTicks.mirror) {
                      xLabelValue = this.left - optionTicks.padding;
                      context.textAlign = "right";
                    } else {
                      xLabelValue = this.left + optionTicks.padding;
                      context.textAlign = "left";
                    }
                  }
                  context.translate(xLabelValue, yLabelValue + optionTicks.labelOffset);
                  context.rotate(labelRotationRadians * -1);
                  context.font = tickLabelFont;
                  context.textBaseline = "middle";
                  context.fillText(label, 0, 0);
                  context.restore();
                }
              }, this);
              if (scaleLabel.display) {
                scaleLabelX = options.position === 'left' ? this.left + (scaleLabelFontSize / 2) : this.right - (scaleLabelFontSize / 2);
                scaleLabelY = this.top + ((this.bottom - this.top) / 2);
                var rotation = options.position === 'left' ? -0.5 * Math.PI : 0.5 * Math.PI;
                context.save();
                context.translate(scaleLabelX, scaleLabelY);
                context.rotate(rotation);
                context.textAlign = "center";
                context.fillStyle = scaleLabelFontColor;
                context.font = scaleLabelFont;
                context.textBaseline = 'middle';
                context.fillText(scaleLabel.labelString, 0, 0);
                context.restore();
              }
            }
            if (gridLines.drawBorder) {
              context.lineWidth = gridLines.lineWidth;
              context.strokeStyle = gridLines.color;
              var x1 = this.left,
                  x2 = this.right,
                  y1 = this.top,
                  y2 = this.bottom;
              var aliasPixel = helpers.aliasPixel(context.lineWidth);
              if (this.isHorizontal()) {
                y1 = y2 = options.position === 'top' ? this.bottom : this.top;
                y1 += aliasPixel;
                y2 += aliasPixel;
              } else {
                x1 = x2 = options.position === 'left' ? this.right : this.left;
                x1 += aliasPixel;
                x2 += aliasPixel;
              }
              context.beginPath();
              context.moveTo(x1, y1);
              context.lineTo(x2, y2);
              context.stroke();
            }
          }
        });
      };
    }, {}],
    31: [function(require, module, exports) {
      "use strict";
      module.exports = function(Chart) {
        var helpers = Chart.helpers;
        Chart.scaleService = {
          constructors: {},
          defaults: {},
          registerScaleType: function(type, scaleConstructor, defaults) {
            this.constructors[type] = scaleConstructor;
            this.defaults[type] = helpers.clone(defaults);
          },
          getScaleConstructor: function(type) {
            return this.constructors.hasOwnProperty(type) ? this.constructors[type] : undefined;
          },
          getScaleDefaults: function(type) {
            return this.defaults.hasOwnProperty(type) ? helpers.scaleMerge(Chart.defaults.scale, this.defaults[type]) : {};
          },
          updateScaleDefaults: function(type, additions) {
            var defaults = this.defaults;
            if (defaults.hasOwnProperty(type)) {
              defaults[type] = helpers.extend(defaults[type], additions);
            }
          },
          addScalesToLayout: function(chartInstance) {
            helpers.each(chartInstance.scales, function(scale) {
              Chart.layoutService.addBox(chartInstance, scale);
            });
          }
        };
      };
    }, {}],
    32: [function(require, module, exports) {
      "use strict";
      module.exports = function(Chart) {
        var helpers = Chart.helpers;
        Chart.defaults.global.title = {
          display: false,
          position: 'top',
          fullWidth: true,
          fontStyle: 'bold',
          padding: 10,
          text: ''
        };
        var noop = helpers.noop;
        Chart.Title = Chart.Element.extend({
          initialize: function(config) {
            helpers.extend(this, config);
            this.options = helpers.configMerge(Chart.defaults.global.title, config.options);
            this.legendHitBoxes = [];
          },
          beforeUpdate: noop,
          update: function(maxWidth, maxHeight, margins) {
            this.beforeUpdate();
            this.maxWidth = maxWidth;
            this.maxHeight = maxHeight;
            this.margins = margins;
            this.beforeSetDimensions();
            this.setDimensions();
            this.afterSetDimensions();
            this.beforeBuildLabels();
            this.buildLabels();
            this.afterBuildLabels();
            this.beforeFit();
            this.fit();
            this.afterFit();
            this.afterUpdate();
            return this.minSize;
          },
          afterUpdate: noop,
          beforeSetDimensions: noop,
          setDimensions: function() {
            if (this.isHorizontal()) {
              this.width = this.maxWidth;
              this.left = 0;
              this.right = this.width;
            } else {
              this.height = this.maxHeight;
              this.top = 0;
              this.bottom = this.height;
            }
            this.paddingLeft = 0;
            this.paddingTop = 0;
            this.paddingRight = 0;
            this.paddingBottom = 0;
            this.minSize = {
              width: 0,
              height: 0
            };
          },
          afterSetDimensions: noop,
          beforeBuildLabels: noop,
          buildLabels: noop,
          afterBuildLabels: noop,
          beforeFit: noop,
          fit: function() {
            var _this = this,
                ctx = _this.ctx,
                valueOrDefault = helpers.getValueOrDefault,
                opts = _this.options,
                globalDefaults = Chart.defaults.global,
                display = opts.display,
                fontSize = valueOrDefault(opts.fontSize, globalDefaults.defaultFontSize),
                minSize = _this.minSize;
            if (_this.isHorizontal()) {
              minSize.width = _this.maxWidth;
              minSize.height = display ? fontSize + (opts.padding * 2) : 0;
            } else {
              minSize.width = display ? fontSize + (opts.padding * 2) : 0;
              minSize.height = _this.maxHeight;
            }
            _this.width = minSize.width;
            _this.height = minSize.height;
          },
          afterFit: noop,
          isHorizontal: function() {
            var pos = this.options.position;
            return pos === "top" || pos === "bottom";
          },
          draw: function() {
            var _this = this,
                ctx = _this.ctx,
                valueOrDefault = helpers.getValueOrDefault,
                opts = _this.options,
                globalDefaults = Chart.defaults.global;
            if (opts.display) {
              var fontSize = valueOrDefault(opts.fontSize, globalDefaults.defaultFontSize),
                  fontStyle = valueOrDefault(opts.fontStyle, globalDefaults.defaultFontStyle),
                  fontFamily = valueOrDefault(opts.fontFamily, globalDefaults.defaultFontFamily),
                  titleFont = helpers.fontString(fontSize, fontStyle, fontFamily),
                  rotation = 0,
                  titleX,
                  titleY,
                  top = _this.top,
                  left = _this.left,
                  bottom = _this.bottom,
                  right = _this.right;
              ctx.fillStyle = valueOrDefault(opts.fontColor, globalDefaults.defaultFontColor);
              ctx.font = titleFont;
              if (_this.isHorizontal()) {
                titleX = left + ((right - left) / 2);
                titleY = top + ((bottom - top) / 2);
              } else {
                titleX = opts.position === 'left' ? left + (fontSize / 2) : right - (fontSize / 2);
                titleY = top + ((bottom - top) / 2);
                rotation = Math.PI * (opts.position === 'left' ? -0.5 : 0.5);
              }
              ctx.save();
              ctx.translate(titleX, titleY);
              ctx.rotate(rotation);
              ctx.textAlign = 'center';
              ctx.textBaseline = 'middle';
              ctx.fillText(opts.text, 0, 0);
              ctx.restore();
            }
          }
        });
      };
    }, {}],
    33: [function(require, module, exports) {
      "use strict";
      module.exports = function(Chart) {
        var helpers = Chart.helpers;
        Chart.defaults.global.tooltips = {
          enabled: true,
          custom: null,
          mode: 'single',
          backgroundColor: "rgba(0,0,0,0.8)",
          titleFontStyle: "bold",
          titleSpacing: 2,
          titleMarginBottom: 6,
          titleColor: "#fff",
          titleAlign: "left",
          bodySpacing: 2,
          bodyColor: "#fff",
          bodyAlign: "left",
          footerFontStyle: "bold",
          footerSpacing: 2,
          footerMarginTop: 6,
          footerColor: "#fff",
          footerAlign: "left",
          yPadding: 6,
          xPadding: 6,
          yAlign: 'center',
          xAlign: 'center',
          caretSize: 5,
          cornerRadius: 6,
          multiKeyBackground: '#fff',
          callbacks: {
            beforeTitle: helpers.noop,
            title: function(tooltipItems, data) {
              var title = '';
              if (tooltipItems.length > 0) {
                if (tooltipItems[0].xLabel) {
                  title = tooltipItems[0].xLabel;
                } else if (data.labels.length > 0 && tooltipItems[0].index < data.labels.length) {
                  title = data.labels[tooltipItems[0].index];
                }
              }
              return title;
            },
            afterTitle: helpers.noop,
            beforeBody: helpers.noop,
            beforeLabel: helpers.noop,
            label: function(tooltipItem, data) {
              var datasetLabel = data.datasets[tooltipItem.datasetIndex].label || '';
              return datasetLabel + ': ' + tooltipItem.yLabel;
            },
            afterLabel: helpers.noop,
            afterBody: helpers.noop,
            beforeFooter: helpers.noop,
            footer: helpers.noop,
            afterFooter: helpers.noop
          }
        };
        function pushOrConcat(base, toPush) {
          if (toPush) {
            if (helpers.isArray(toPush)) {
              base = base.concat(toPush);
            } else {
              base.push(toPush);
            }
          }
          return base;
        }
        Chart.Tooltip = Chart.Element.extend({
          initialize: function() {
            var globalDefaults = Chart.defaults.global;
            var options = this._options;
            var tooltips = options.tooltips;
            helpers.extend(this, {_model: {
                xPadding: tooltips.xPadding,
                yPadding: tooltips.yPadding,
                xAlign: tooltips.yAlign,
                yAlign: tooltips.xAlign,
                bodyColor: tooltips.bodyColor,
                _bodyFontFamily: helpers.getValueOrDefault(tooltips.bodyFontFamily, globalDefaults.defaultFontFamily),
                _bodyFontStyle: helpers.getValueOrDefault(tooltips.bodyFontStyle, globalDefaults.defaultFontStyle),
                _bodyAlign: tooltips.bodyAlign,
                bodyFontSize: helpers.getValueOrDefault(tooltips.bodyFontSize, globalDefaults.defaultFontSize),
                bodySpacing: tooltips.bodySpacing,
                titleColor: tooltips.titleColor,
                _titleFontFamily: helpers.getValueOrDefault(tooltips.titleFontFamily, globalDefaults.defaultFontFamily),
                _titleFontStyle: helpers.getValueOrDefault(tooltips.titleFontStyle, globalDefaults.defaultFontStyle),
                titleFontSize: helpers.getValueOrDefault(tooltips.titleFontSize, globalDefaults.defaultFontSize),
                _titleAlign: tooltips.titleAlign,
                titleSpacing: tooltips.titleSpacing,
                titleMarginBottom: tooltips.titleMarginBottom,
                footerColor: tooltips.footerColor,
                _footerFontFamily: helpers.getValueOrDefault(tooltips.footerFontFamily, globalDefaults.defaultFontFamily),
                _footerFontStyle: helpers.getValueOrDefault(tooltips.footerFontStyle, globalDefaults.defaultFontStyle),
                footerFontSize: helpers.getValueOrDefault(tooltips.footerFontSize, globalDefaults.defaultFontSize),
                _footerAlign: tooltips.footerAlign,
                footerSpacing: tooltips.footerSpacing,
                footerMarginTop: tooltips.footerMarginTop,
                caretSize: tooltips.caretSize,
                cornerRadius: tooltips.cornerRadius,
                backgroundColor: tooltips.backgroundColor,
                opacity: 0,
                legendColorBackground: tooltips.multiKeyBackground
              }});
          },
          getTitle: function() {
            var beforeTitle = this._options.tooltips.callbacks.beforeTitle.apply(this, arguments),
                title = this._options.tooltips.callbacks.title.apply(this, arguments),
                afterTitle = this._options.tooltips.callbacks.afterTitle.apply(this, arguments);
            var lines = [];
            lines = pushOrConcat(lines, beforeTitle);
            lines = pushOrConcat(lines, title);
            lines = pushOrConcat(lines, afterTitle);
            return lines;
          },
          getBeforeBody: function() {
            var lines = this._options.tooltips.callbacks.beforeBody.apply(this, arguments);
            return helpers.isArray(lines) ? lines : lines !== undefined ? [lines] : [];
          },
          getBody: function(tooltipItems, data) {
            var lines = [];
            helpers.each(tooltipItems, function(bodyItem) {
              helpers.pushAllIfDefined(this._options.tooltips.callbacks.beforeLabel.call(this, bodyItem, data), lines);
              helpers.pushAllIfDefined(this._options.tooltips.callbacks.label.call(this, bodyItem, data), lines);
              helpers.pushAllIfDefined(this._options.tooltips.callbacks.afterLabel.call(this, bodyItem, data), lines);
            }, this);
            return lines;
          },
          getAfterBody: function() {
            var lines = this._options.tooltips.callbacks.afterBody.apply(this, arguments);
            return helpers.isArray(lines) ? lines : lines !== undefined ? [lines] : [];
          },
          getFooter: function() {
            var beforeFooter = this._options.tooltips.callbacks.beforeFooter.apply(this, arguments);
            var footer = this._options.tooltips.callbacks.footer.apply(this, arguments);
            var afterFooter = this._options.tooltips.callbacks.afterFooter.apply(this, arguments);
            var lines = [];
            lines = pushOrConcat(lines, beforeFooter);
            lines = pushOrConcat(lines, footer);
            lines = pushOrConcat(lines, afterFooter);
            return lines;
          },
          getAveragePosition: function(elements) {
            if (!elements.length) {
              return false;
            }
            var xPositions = [];
            var yPositions = [];
            helpers.each(elements, function(el) {
              if (el && el.hasValue()) {
                var pos = el.tooltipPosition();
                xPositions.push(pos.x);
                yPositions.push(pos.y);
              }
            });
            var x = 0,
                y = 0;
            for (var i = 0; i < xPositions.length; i++) {
              x += xPositions[i];
              y += yPositions[i];
            }
            return {
              x: Math.round(x / xPositions.length),
              y: Math.round(y / xPositions.length)
            };
          },
          update: function(changed) {
            if (this._active.length) {
              this._model.opacity = 1;
              var element = this._active[0],
                  labelColors = [],
                  tooltipPosition;
              var tooltipItems = [];
              if (this._options.tooltips.mode === 'single') {
                var yScale = element._yScale || element._scale;
                tooltipItems.push({
                  xLabel: element._xScale ? element._xScale.getLabelForIndex(element._index, element._datasetIndex) : '',
                  yLabel: yScale ? yScale.getLabelForIndex(element._index, element._datasetIndex) : '',
                  index: element._index,
                  datasetIndex: element._datasetIndex
                });
                tooltipPosition = this.getAveragePosition(this._active);
              } else {
                helpers.each(this._data.datasets, function(dataset, datasetIndex) {
                  if (!this._chartInstance.isDatasetVisible(datasetIndex)) {
                    return;
                  }
                  var meta = this._chartInstance.getDatasetMeta(datasetIndex);
                  var currentElement = meta.data[element._index];
                  if (currentElement) {
                    var yScale = element._yScale || element._scale;
                    tooltipItems.push({
                      xLabel: currentElement._xScale ? currentElement._xScale.getLabelForIndex(currentElement._index, currentElement._datasetIndex) : '',
                      yLabel: yScale ? yScale.getLabelForIndex(currentElement._index, currentElement._datasetIndex) : '',
                      index: element._index,
                      datasetIndex: datasetIndex
                    });
                  }
                }, this);
                helpers.each(this._active, function(active) {
                  if (active) {
                    labelColors.push({
                      borderColor: active._view.borderColor,
                      backgroundColor: active._view.backgroundColor
                    });
                  }
                }, null);
                tooltipPosition = this.getAveragePosition(this._active);
              }
              helpers.extend(this._model, {
                title: this.getTitle(tooltipItems, this._data),
                beforeBody: this.getBeforeBody(tooltipItems, this._data),
                body: this.getBody(tooltipItems, this._data),
                afterBody: this.getAfterBody(tooltipItems, this._data),
                footer: this.getFooter(tooltipItems, this._data)
              });
              helpers.extend(this._model, {
                x: Math.round(tooltipPosition.x),
                y: Math.round(tooltipPosition.y),
                caretPadding: helpers.getValueOrDefault(tooltipPosition.padding, 2),
                labelColors: labelColors
              });
              var tooltipSize = this.getTooltipSize(this._model);
              this.determineAlignment(tooltipSize);
              helpers.extend(this._model, this.getBackgroundPoint(this._model, tooltipSize));
            } else {
              this._model.opacity = 0;
            }
            if (changed && this._options.tooltips.custom) {
              this._options.tooltips.custom.call(this, this._model);
            }
            return this;
          },
          getTooltipSize: function getTooltipSize(vm) {
            var ctx = this._chart.ctx;
            var size = {
              height: vm.yPadding * 2,
              width: 0
            };
            var combinedBodyLength = vm.body.length + vm.beforeBody.length + vm.afterBody.length;
            size.height += vm.title.length * vm.titleFontSize;
            size.height += (vm.title.length - 1) * vm.titleSpacing;
            size.height += vm.title.length ? vm.titleMarginBottom : 0;
            size.height += combinedBodyLength * vm.bodyFontSize;
            size.height += combinedBodyLength ? (combinedBodyLength - 1) * vm.bodySpacing : 0;
            size.height += vm.footer.length ? vm.footerMarginTop : 0;
            size.height += vm.footer.length * (vm.footerFontSize);
            size.height += vm.footer.length ? (vm.footer.length - 1) * vm.footerSpacing : 0;
            ctx.font = helpers.fontString(vm.titleFontSize, vm._titleFontStyle, vm._titleFontFamily);
            helpers.each(vm.title, function(line) {
              size.width = Math.max(size.width, ctx.measureText(line).width);
            });
            ctx.font = helpers.fontString(vm.bodyFontSize, vm._bodyFontStyle, vm._bodyFontFamily);
            helpers.each(vm.beforeBody.concat(vm.afterBody), function(line) {
              size.width = Math.max(size.width, ctx.measureText(line).width);
            });
            helpers.each(vm.body, function(line) {
              size.width = Math.max(size.width, ctx.measureText(line).width + (this._options.tooltips.mode !== 'single' ? (vm.bodyFontSize + 2) : 0));
            }, this);
            ctx.font = helpers.fontString(vm.footerFontSize, vm._footerFontStyle, vm._footerFontFamily);
            helpers.each(vm.footer, function(line) {
              size.width = Math.max(size.width, ctx.measureText(line).width);
            });
            size.width += 2 * vm.xPadding;
            return size;
          },
          determineAlignment: function determineAlignment(size) {
            if (this._model.y < size.height) {
              this._model.yAlign = 'top';
            } else if (this._model.y > (this._chart.height - size.height)) {
              this._model.yAlign = 'bottom';
            }
            var lf,
                rf;
            var olf,
                orf;
            var yf;
            var _this = this;
            var midX = (this._chartInstance.chartArea.left + this._chartInstance.chartArea.right) / 2;
            var midY = (this._chartInstance.chartArea.top + this._chartInstance.chartArea.bottom) / 2;
            if (this._model.yAlign === 'center') {
              lf = function(x) {
                return x <= midX;
              };
              rf = function(x) {
                return x > midX;
              };
            } else {
              lf = function(x) {
                return x <= (size.width / 2);
              };
              rf = function(x) {
                return x >= (_this._chart.width - (size.width / 2));
              };
            }
            olf = function(x) {
              return x + size.width > _this._chart.width;
            };
            orf = function(x) {
              return x - size.width < 0;
            };
            yf = function(y) {
              return y <= midY ? 'top' : 'bottom';
            };
            if (lf(this._model.x)) {
              this._model.xAlign = 'left';
              if (olf(this._model.x)) {
                this._model.xAlign = 'center';
                this._model.yAlign = yf(this._model.y);
              }
            } else if (rf(this._model.x)) {
              this._model.xAlign = 'right';
              if (orf(this._model.x)) {
                this._model.xAlign = 'center';
                this._model.yAlign = yf(this._model.y);
              }
            }
          },
          getBackgroundPoint: function getBackgroundPoint(vm, size) {
            var pt = {
              x: vm.x,
              y: vm.y
            };
            if (vm.xAlign === 'right') {
              pt.x -= size.width;
            } else if (vm.xAlign === 'center') {
              pt.x -= (size.width / 2);
            }
            if (vm.yAlign === 'top') {
              pt.y += vm.caretPadding + vm.caretSize;
            } else if (vm.yAlign === 'bottom') {
              pt.y -= size.height + vm.caretPadding + vm.caretSize;
            } else {
              pt.y -= (size.height / 2);
            }
            if (vm.yAlign === 'center') {
              if (vm.xAlign === 'left') {
                pt.x += vm.caretPadding + vm.caretSize;
              } else if (vm.xAlign === 'right') {
                pt.x -= vm.caretPadding + vm.caretSize;
              }
            } else {
              if (vm.xAlign === 'left') {
                pt.x -= vm.cornerRadius + vm.caretPadding;
              } else if (vm.xAlign === 'right') {
                pt.x += vm.cornerRadius + vm.caretPadding;
              }
            }
            return pt;
          },
          drawCaret: function drawCaret(tooltipPoint, size, opacity, caretPadding) {
            var vm = this._view;
            var ctx = this._chart.ctx;
            var x1,
                x2,
                x3;
            var y1,
                y2,
                y3;
            if (vm.yAlign === 'center') {
              if (vm.xAlign === 'left') {
                x1 = tooltipPoint.x;
                x2 = x1 - vm.caretSize;
                x3 = x1;
              } else {
                x1 = tooltipPoint.x + size.width;
                x2 = x1 + vm.caretSize;
                x3 = x1;
              }
              y2 = tooltipPoint.y + (size.height / 2);
              y1 = y2 - vm.caretSize;
              y3 = y2 + vm.caretSize;
            } else {
              if (vm.xAlign === 'left') {
                x1 = tooltipPoint.x + vm.cornerRadius;
                x2 = x1 + vm.caretSize;
                x3 = x2 + vm.caretSize;
              } else if (vm.xAlign === 'right') {
                x1 = tooltipPoint.x + size.width - vm.cornerRadius;
                x2 = x1 - vm.caretSize;
                x3 = x2 - vm.caretSize;
              } else {
                x2 = tooltipPoint.x + (size.width / 2);
                x1 = x2 - vm.caretSize;
                x3 = x2 + vm.caretSize;
              }
              if (vm.yAlign === 'top') {
                y1 = tooltipPoint.y;
                y2 = y1 - vm.caretSize;
                y3 = y1;
              } else {
                y1 = tooltipPoint.y + size.height;
                y2 = y1 + vm.caretSize;
                y3 = y1;
              }
            }
            var bgColor = helpers.color(vm.backgroundColor);
            ctx.fillStyle = bgColor.alpha(opacity * bgColor.alpha()).rgbString();
            ctx.beginPath();
            ctx.moveTo(x1, y1);
            ctx.lineTo(x2, y2);
            ctx.lineTo(x3, y3);
            ctx.closePath();
            ctx.fill();
          },
          drawTitle: function drawTitle(pt, vm, ctx, opacity) {
            if (vm.title.length) {
              ctx.textAlign = vm._titleAlign;
              ctx.textBaseline = "top";
              var titleColor = helpers.color(vm.titleColor);
              ctx.fillStyle = titleColor.alpha(opacity * titleColor.alpha()).rgbString();
              ctx.font = helpers.fontString(vm.titleFontSize, vm._titleFontStyle, vm._titleFontFamily);
              helpers.each(vm.title, function(title, i) {
                ctx.fillText(title, pt.x, pt.y);
                pt.y += vm.titleFontSize + vm.titleSpacing;
                if (i + 1 === vm.title.length) {
                  pt.y += vm.titleMarginBottom - vm.titleSpacing;
                }
              });
            }
          },
          drawBody: function drawBody(pt, vm, ctx, opacity) {
            ctx.textAlign = vm._bodyAlign;
            ctx.textBaseline = "top";
            var bodyColor = helpers.color(vm.bodyColor);
            ctx.fillStyle = bodyColor.alpha(opacity * bodyColor.alpha()).rgbString();
            ctx.font = helpers.fontString(vm.bodyFontSize, vm._bodyFontStyle, vm._bodyFontFamily);
            helpers.each(vm.beforeBody, function(beforeBody) {
              ctx.fillText(beforeBody, pt.x, pt.y);
              pt.y += vm.bodyFontSize + vm.bodySpacing;
            });
            helpers.each(vm.body, function(body, i) {
              if (this._options.tooltips.mode !== 'single') {
                ctx.fillStyle = helpers.color(vm.legendColorBackground).alpha(opacity).rgbaString();
                ctx.fillRect(pt.x, pt.y, vm.bodyFontSize, vm.bodyFontSize);
                ctx.strokeStyle = helpers.color(vm.labelColors[i].borderColor).alpha(opacity).rgbaString();
                ctx.strokeRect(pt.x, pt.y, vm.bodyFontSize, vm.bodyFontSize);
                ctx.fillStyle = helpers.color(vm.labelColors[i].backgroundColor).alpha(opacity).rgbaString();
                ctx.fillRect(pt.x + 1, pt.y + 1, vm.bodyFontSize - 2, vm.bodyFontSize - 2);
                ctx.fillStyle = helpers.color(vm.bodyColor).alpha(opacity).rgbaString();
              }
              ctx.fillText(body, pt.x + (this._options.tooltips.mode !== 'single' ? (vm.bodyFontSize + 2) : 0), pt.y);
              pt.y += vm.bodyFontSize + vm.bodySpacing;
            }, this);
            helpers.each(vm.afterBody, function(afterBody) {
              ctx.fillText(afterBody, pt.x, pt.y);
              pt.y += vm.bodyFontSize;
            });
            pt.y -= vm.bodySpacing;
          },
          drawFooter: function drawFooter(pt, vm, ctx, opacity) {
            if (vm.footer.length) {
              pt.y += vm.footerMarginTop;
              ctx.textAlign = vm._footerAlign;
              ctx.textBaseline = "top";
              var footerColor = helpers.color(vm.footerColor);
              ctx.fillStyle = footerColor.alpha(opacity * footerColor.alpha()).rgbString();
              ctx.font = helpers.fontString(vm.footerFontSize, vm._footerFontStyle, vm._footerFontFamily);
              helpers.each(vm.footer, function(footer) {
                ctx.fillText(footer, pt.x, pt.y);
                pt.y += vm.footerFontSize + vm.footerSpacing;
              });
            }
          },
          draw: function draw() {
            var ctx = this._chart.ctx;
            var vm = this._view;
            if (vm.opacity === 0) {
              return;
            }
            var caretPadding = vm.caretPadding;
            var tooltipSize = this.getTooltipSize(vm);
            var pt = {
              x: vm.x,
              y: vm.y
            };
            var opacity = Math.abs(vm.opacity < 1e-3) ? 0 : vm.opacity;
            if (this._options.tooltips.enabled) {
              var bgColor = helpers.color(vm.backgroundColor);
              ctx.fillStyle = bgColor.alpha(opacity * bgColor.alpha()).rgbString();
              helpers.drawRoundedRectangle(ctx, pt.x, pt.y, tooltipSize.width, tooltipSize.height, vm.cornerRadius);
              ctx.fill();
              this.drawCaret(pt, tooltipSize, opacity, caretPadding);
              pt.x += vm.xPadding;
              pt.y += vm.yPadding;
              this.drawTitle(pt, vm, ctx, opacity);
              this.drawBody(pt, vm, ctx, opacity);
              this.drawFooter(pt, vm, ctx, opacity);
            }
          }
        });
      };
    }, {}],
    34: [function(require, module, exports) {
      "use strict";
      module.exports = function(Chart, moment) {
        var helpers = Chart.helpers,
            globalOpts = Chart.defaults.global;
        globalOpts.elements.arc = {
          backgroundColor: globalOpts.defaultColor,
          borderColor: "#fff",
          borderWidth: 2
        };
        Chart.elements.Arc = Chart.Element.extend({
          inLabelRange: function(mouseX) {
            var vm = this._view;
            if (vm) {
              return (Math.pow(mouseX - vm.x, 2) < Math.pow(vm.radius + vm.hoverRadius, 2));
            } else {
              return false;
            }
          },
          inRange: function(chartX, chartY) {
            var vm = this._view;
            if (vm) {
              var pointRelativePosition = helpers.getAngleFromPoint(vm, {
                x: chartX,
                y: chartY
              }),
                  angle = pointRelativePosition.angle,
                  distance = pointRelativePosition.distance;
              var startAngle = vm.startAngle;
              var endAngle = vm.endAngle;
              while (endAngle < startAngle) {
                endAngle += 2.0 * Math.PI;
              }
              while (angle > endAngle) {
                angle -= 2.0 * Math.PI;
              }
              while (angle < startAngle) {
                angle += 2.0 * Math.PI;
              }
              var betweenAngles = (angle >= startAngle && angle <= endAngle),
                  withinRadius = (distance >= vm.innerRadius && distance <= vm.outerRadius);
              return (betweenAngles && withinRadius);
            } else {
              return false;
            }
          },
          tooltipPosition: function() {
            var vm = this._view;
            var centreAngle = vm.startAngle + ((vm.endAngle - vm.startAngle) / 2),
                rangeFromCentre = (vm.outerRadius - vm.innerRadius) / 2 + vm.innerRadius;
            return {
              x: vm.x + (Math.cos(centreAngle) * rangeFromCentre),
              y: vm.y + (Math.sin(centreAngle) * rangeFromCentre)
            };
          },
          draw: function() {
            var ctx = this._chart.ctx,
                vm = this._view,
                sA = vm.startAngle,
                eA = vm.endAngle;
            ctx.beginPath();
            ctx.arc(vm.x, vm.y, vm.outerRadius, sA, eA);
            ctx.arc(vm.x, vm.y, vm.innerRadius, eA, sA, true);
            ctx.closePath();
            ctx.strokeStyle = vm.borderColor;
            ctx.lineWidth = vm.borderWidth;
            ctx.fillStyle = vm.backgroundColor;
            ctx.fill();
            ctx.lineJoin = 'bevel';
            if (vm.borderWidth) {
              ctx.stroke();
            }
          }
        });
      };
    }, {}],
    35: [function(require, module, exports) {
      "use strict";
      module.exports = function(Chart) {
        var helpers = Chart.helpers;
        var globalDefaults = Chart.defaults.global;
        Chart.defaults.global.elements.line = {
          tension: 0.4,
          backgroundColor: globalDefaults.defaultColor,
          borderWidth: 3,
          borderColor: globalDefaults.defaultColor,
          borderCapStyle: 'butt',
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: 'miter',
          fill: true
        };
        Chart.elements.Line = Chart.Element.extend({
          lineToNextPoint: function(previousPoint, point, nextPoint, skipHandler, previousSkipHandler) {
            var ctx = this._chart.ctx;
            if (point._view.skip) {
              skipHandler.call(this, previousPoint, point, nextPoint);
            } else if (previousPoint._view.skip) {
              previousSkipHandler.call(this, previousPoint, point, nextPoint);
            } else if (point._view.tension === 0) {
              ctx.lineTo(point._view.x, point._view.y);
            } else {
              ctx.bezierCurveTo(previousPoint._view.controlPointNextX, previousPoint._view.controlPointNextY, point._view.controlPointPreviousX, point._view.controlPointPreviousY, point._view.x, point._view.y);
            }
          },
          draw: function() {
            var _this = this;
            var vm = this._view;
            var ctx = this._chart.ctx;
            var first = this._children[0];
            var last = this._children[this._children.length - 1];
            function loopBackToStart(drawLineToCenter) {
              if (!first._view.skip && !last._view.skip) {
                ctx.bezierCurveTo(last._view.controlPointNextX, last._view.controlPointNextY, first._view.controlPointPreviousX, first._view.controlPointPreviousY, first._view.x, first._view.y);
              } else if (drawLineToCenter) {
                ctx.lineTo(_this._view.scaleZero.x, _this._view.scaleZero.y);
              }
            }
            ctx.save();
            if (this._children.length > 0 && vm.fill) {
              ctx.beginPath();
              helpers.each(this._children, function(point, index) {
                var previous = helpers.previousItem(this._children, index);
                var next = helpers.nextItem(this._children, index);
                if (index === 0) {
                  if (this._loop) {
                    ctx.moveTo(vm.scaleZero.x, vm.scaleZero.y);
                  } else {
                    ctx.moveTo(point._view.x, vm.scaleZero);
                  }
                  if (point._view.skip) {
                    if (!this._loop) {
                      ctx.moveTo(next._view.x, this._view.scaleZero);
                    }
                  } else {
                    ctx.lineTo(point._view.x, point._view.y);
                  }
                } else {
                  this.lineToNextPoint(previous, point, next, function(previousPoint, point, nextPoint) {
                    if (this._loop) {
                      ctx.lineTo(this._view.scaleZero.x, this._view.scaleZero.y);
                    } else {
                      ctx.lineTo(previousPoint._view.x, this._view.scaleZero);
                      ctx.moveTo(nextPoint._view.x, this._view.scaleZero);
                    }
                  }, function(previousPoint, point) {
                    ctx.lineTo(point._view.x, point._view.y);
                  });
                }
              }, this);
              if (this._loop) {
                loopBackToStart(true);
              } else {
                ctx.lineTo(this._children[this._children.length - 1]._view.x, vm.scaleZero);
                ctx.lineTo(this._children[0]._view.x, vm.scaleZero);
              }
              ctx.fillStyle = vm.backgroundColor || globalDefaults.defaultColor;
              ctx.closePath();
              ctx.fill();
            }
            var globalOptionLineElements = globalDefaults.elements.line;
            ctx.lineCap = vm.borderCapStyle || globalOptionLineElements.borderCapStyle;
            if (ctx.setLineDash) {
              ctx.setLineDash(vm.borderDash || globalOptionLineElements.borderDash);
            }
            ctx.lineDashOffset = vm.borderDashOffset || globalOptionLineElements.borderDashOffset;
            ctx.lineJoin = vm.borderJoinStyle || globalOptionLineElements.borderJoinStyle;
            ctx.lineWidth = vm.borderWidth || globalOptionLineElements.borderWidth;
            ctx.strokeStyle = vm.borderColor || globalDefaults.defaultColor;
            ctx.beginPath();
            helpers.each(this._children, function(point, index) {
              var previous = helpers.previousItem(this._children, index);
              var next = helpers.nextItem(this._children, index);
              if (index === 0) {
                ctx.moveTo(point._view.x, point._view.y);
              } else {
                this.lineToNextPoint(previous, point, next, function(previousPoint, point, nextPoint) {
                  ctx.moveTo(nextPoint._view.x, nextPoint._view.y);
                }, function(previousPoint, point) {
                  ctx.moveTo(point._view.x, point._view.y);
                });
              }
            }, this);
            if (this._loop && this._children.length > 0) {
              loopBackToStart();
            }
            ctx.stroke();
            ctx.restore();
          }
        });
      };
    }, {}],
    36: [function(require, module, exports) {
      "use strict";
      module.exports = function(Chart) {
        var helpers = Chart.helpers,
            globalOpts = Chart.defaults.global,
            defaultColor = globalOpts.defaultColor;
        globalOpts.elements.point = {
          radius: 3,
          pointStyle: 'circle',
          backgroundColor: defaultColor,
          borderWidth: 1,
          borderColor: defaultColor,
          hitRadius: 1,
          hoverRadius: 4,
          hoverBorderWidth: 1
        };
        Chart.elements.Point = Chart.Element.extend({
          inRange: function(mouseX, mouseY) {
            var vm = this._view;
            return vm ? ((Math.pow(mouseX - vm.x, 2) + Math.pow(mouseY - vm.y, 2)) < Math.pow(vm.hitRadius + vm.radius, 2)) : false;
          },
          inLabelRange: function(mouseX) {
            var vm = this._view;
            return vm ? (Math.pow(mouseX - vm.x, 2) < Math.pow(vm.radius + vm.hitRadius, 2)) : false;
          },
          tooltipPosition: function() {
            var vm = this._view;
            return {
              x: vm.x,
              y: vm.y,
              padding: vm.radius + vm.borderWidth
            };
          },
          draw: function() {
            var vm = this._view;
            var ctx = this._chart.ctx;
            var pointStyle = vm.pointStyle;
            var radius = vm.radius;
            var x = vm.x;
            var y = vm.y;
            var type,
                edgeLength,
                xOffset,
                yOffset,
                height,
                size;
            if (vm.skip) {
              return;
            }
            if (typeof pointStyle === 'object') {
              type = pointStyle.toString();
              if (type === '[object HTMLImageElement]' || type === '[object HTMLCanvasElement]') {
                ctx.drawImage(pointStyle, x - pointStyle.width / 2, y - pointStyle.height / 2);
                return;
              }
            }
            if (isNaN(radius) || radius <= 0) {
              return;
            }
            ctx.strokeStyle = vm.borderColor || defaultColor;
            ctx.lineWidth = helpers.getValueOrDefault(vm.borderWidth, globalOpts.elements.point.borderWidth);
            ctx.fillStyle = vm.backgroundColor || defaultColor;
            switch (pointStyle) {
              default:
                ctx.beginPath();
                ctx.arc(x, y, radius, 0, Math.PI * 2);
                ctx.closePath();
                ctx.fill();
                break;
              case 'triangle':
                ctx.beginPath();
                edgeLength = 3 * radius / Math.sqrt(3);
                height = edgeLength * Math.sqrt(3) / 2;
                ctx.moveTo(x - edgeLength / 2, y + height / 3);
                ctx.lineTo(x + edgeLength / 2, y + height / 3);
                ctx.lineTo(x, y - 2 * height / 3);
                ctx.closePath();
                ctx.fill();
                break;
              case 'rect':
                size = 1 / Math.SQRT2 * radius;
                ctx.fillRect(x - size, y - size, 2 * size, 2 * size);
                ctx.strokeRect(x - size, y - size, 2 * size, 2 * size);
                break;
              case 'rectRot':
                ctx.translate(x, y);
                ctx.rotate(Math.PI / 4);
                size = 1 / Math.SQRT2 * radius;
                ctx.fillRect(-size, -size, 2 * size, 2 * size);
                ctx.strokeRect(-size, -size, 2 * size, 2 * size);
                ctx.setTransform(1, 0, 0, 1, 0, 0);
                break;
              case 'cross':
                ctx.beginPath();
                ctx.moveTo(x, y + radius);
                ctx.lineTo(x, y - radius);
                ctx.moveTo(x - radius, y);
                ctx.lineTo(x + radius, y);
                ctx.closePath();
                break;
              case 'crossRot':
                ctx.beginPath();
                xOffset = Math.cos(Math.PI / 4) * radius;
                yOffset = Math.sin(Math.PI / 4) * radius;
                ctx.moveTo(x - xOffset, y - yOffset);
                ctx.lineTo(x + xOffset, y + yOffset);
                ctx.moveTo(x - xOffset, y + yOffset);
                ctx.lineTo(x + xOffset, y - yOffset);
                ctx.closePath();
                break;
              case 'star':
                ctx.beginPath();
                ctx.moveTo(x, y + radius);
                ctx.lineTo(x, y - radius);
                ctx.moveTo(x - radius, y);
                ctx.lineTo(x + radius, y);
                xOffset = Math.cos(Math.PI / 4) * radius;
                yOffset = Math.sin(Math.PI / 4) * radius;
                ctx.moveTo(x - xOffset, y - yOffset);
                ctx.lineTo(x + xOffset, y + yOffset);
                ctx.moveTo(x - xOffset, y + yOffset);
                ctx.lineTo(x + xOffset, y - yOffset);
                ctx.closePath();
                break;
              case 'line':
                ctx.beginPath();
                ctx.moveTo(x - radius, y);
                ctx.lineTo(x + radius, y);
                ctx.closePath();
                break;
              case 'dash':
                ctx.beginPath();
                ctx.moveTo(x, y);
                ctx.lineTo(x + radius, y);
                ctx.closePath();
                break;
            }
            ctx.stroke();
          }
        });
      };
    }, {}],
    37: [function(require, module, exports) {
      "use strict";
      module.exports = function(Chart) {
        var helpers = Chart.helpers,
            globalOpts = Chart.defaults.global;
        globalOpts.elements.rectangle = {
          backgroundColor: globalOpts.defaultColor,
          borderWidth: 0,
          borderColor: globalOpts.defaultColor,
          borderSkipped: 'bottom'
        };
        Chart.elements.Rectangle = Chart.Element.extend({
          draw: function() {
            var ctx = this._chart.ctx;
            var vm = this._view;
            var halfWidth = vm.width / 2,
                leftX = vm.x - halfWidth,
                rightX = vm.x + halfWidth,
                top = vm.base - (vm.base - vm.y),
                halfStroke = vm.borderWidth / 2;
            if (vm.borderWidth) {
              leftX += halfStroke;
              rightX -= halfStroke;
              top += halfStroke;
            }
            ctx.beginPath();
            ctx.fillStyle = vm.backgroundColor;
            ctx.strokeStyle = vm.borderColor;
            ctx.lineWidth = vm.borderWidth;
            var corners = [[leftX, vm.base], [leftX, top], [rightX, top], [rightX, vm.base]];
            var borders = ['bottom', 'left', 'top', 'right'];
            var startCorner = borders.indexOf(vm.borderSkipped, 0);
            if (startCorner === -1)
              startCorner = 0;
            function cornerAt(index) {
              return corners[(startCorner + index) % 4];
            }
            ctx.moveTo.apply(ctx, cornerAt(0));
            for (var i = 1; i < 4; i++)
              ctx.lineTo.apply(ctx, cornerAt(i));
            ctx.fill();
            if (vm.borderWidth) {
              ctx.stroke();
            }
          },
          height: function() {
            var vm = this._view;
            return vm.base - vm.y;
          },
          inRange: function(mouseX, mouseY) {
            var vm = this._view;
            return vm ? (vm.y < vm.base ? (mouseX >= vm.x - vm.width / 2 && mouseX <= vm.x + vm.width / 2) && (mouseY >= vm.y && mouseY <= vm.base) : (mouseX >= vm.x - vm.width / 2 && mouseX <= vm.x + vm.width / 2) && (mouseY >= vm.base && mouseY <= vm.y)) : false;
          },
          inLabelRange: function(mouseX) {
            var vm = this._view;
            return vm ? (mouseX >= vm.x - vm.width / 2 && mouseX <= vm.x + vm.width / 2) : false;
          },
          tooltipPosition: function() {
            var vm = this._view;
            return {
              x: vm.x,
              y: vm.y
            };
          }
        });
      };
    }, {}],
    38: [function(require, module, exports) {
      "use strict";
      module.exports = function(Chart) {
        var helpers = Chart.helpers;
        var defaultConfig = {position: "bottom"};
        var DatasetScale = Chart.Scale.extend({
          determineDataLimits: function() {
            this.minIndex = 0;
            this.maxIndex = this.chart.data.labels.length - 1;
            var findIndex;
            if (this.options.ticks.min !== undefined) {
              findIndex = helpers.indexOf(this.chart.data.labels, this.options.ticks.min);
              this.minIndex = findIndex !== -1 ? findIndex : this.minIndex;
            }
            if (this.options.ticks.max !== undefined) {
              findIndex = helpers.indexOf(this.chart.data.labels, this.options.ticks.max);
              this.maxIndex = findIndex !== -1 ? findIndex : this.maxIndex;
            }
            this.min = this.chart.data.labels[this.minIndex];
            this.max = this.chart.data.labels[this.maxIndex];
          },
          buildTicks: function(index) {
            this.ticks = (this.minIndex === 0 && this.maxIndex === this.chart.data.labels.length - 1) ? this.chart.data.labels : this.chart.data.labels.slice(this.minIndex, this.maxIndex + 1);
          },
          getLabelForIndex: function(index, datasetIndex) {
            return this.ticks[index];
          },
          getPixelForValue: function(value, index, datasetIndex, includeOffset) {
            var offsetAmt = Math.max((this.maxIndex + 1 - this.minIndex - ((this.options.gridLines.offsetGridLines) ? 0 : 1)), 1);
            if (this.isHorizontal()) {
              var innerWidth = this.width - (this.paddingLeft + this.paddingRight);
              var valueWidth = innerWidth / offsetAmt;
              var widthOffset = (valueWidth * (index - this.minIndex)) + this.paddingLeft;
              if (this.options.gridLines.offsetGridLines && includeOffset) {
                widthOffset += (valueWidth / 2);
              }
              return this.left + Math.round(widthOffset);
            } else {
              var innerHeight = this.height - (this.paddingTop + this.paddingBottom);
              var valueHeight = innerHeight / offsetAmt;
              var heightOffset = (valueHeight * (index - this.minIndex)) + this.paddingTop;
              if (this.options.gridLines.offsetGridLines && includeOffset) {
                heightOffset += (valueHeight / 2);
              }
              return this.top + Math.round(heightOffset);
            }
          },
          getPixelForTick: function(index, includeOffset) {
            return this.getPixelForValue(this.ticks[index], index + this.minIndex, null, includeOffset);
          },
          getValueForPixel: function(pixel) {
            var value;
            ;
            var offsetAmt = Math.max((this.ticks.length - ((this.options.gridLines.offsetGridLines) ? 0 : 1)), 1);
            var horz = this.isHorizontal();
            var innerDimension = horz ? this.width - (this.paddingLeft + this.paddingRight) : this.height - (this.paddingTop + this.paddingBottom);
            var valueDimension = innerDimension / offsetAmt;
            if (this.options.gridLines.offsetGridLines) {
              pixel -= (valueDimension / 2);
            }
            pixel -= horz ? this.paddingLeft : this.paddingTop;
            if (pixel <= 0) {
              value = 0;
            } else {
              value = Math.round(pixel / valueDimension);
            }
            return value;
          }
        });
        Chart.scaleService.registerScaleType("category", DatasetScale, defaultConfig);
      };
    }, {}],
    39: [function(require, module, exports) {
      "use strict";
      module.exports = function(Chart) {
        var helpers = Chart.helpers;
        var defaultConfig = {
          position: "left",
          ticks: {callback: function(tickValue, index, ticks) {
              var delta = ticks.length > 3 ? ticks[2] - ticks[1] : ticks[1] - ticks[0];
              if (Math.abs(delta) > 1) {
                if (tickValue !== Math.floor(tickValue)) {
                  delta = tickValue - Math.floor(tickValue);
                }
              }
              var logDelta = helpers.log10(Math.abs(delta));
              var tickString = '';
              if (tickValue !== 0) {
                var numDecimal = -1 * Math.floor(logDelta);
                numDecimal = Math.max(Math.min(numDecimal, 20), 0);
                tickString = tickValue.toFixed(numDecimal);
              } else {
                tickString = '0';
              }
              return tickString;
            }}
        };
        var LinearScale = Chart.Scale.extend({
          determineDataLimits: function() {
            var _this = this;
            var opts = _this.options;
            var tickOpts = opts.ticks;
            var chart = _this.chart;
            var data = chart.data;
            var datasets = data.datasets;
            var isHorizontal = _this.isHorizontal();
            function IDMatches(meta) {
              return isHorizontal ? meta.xAxisID === _this.id : meta.yAxisID === _this.id;
            }
            _this.min = null;
            _this.max = null;
            if (opts.stacked) {
              var valuesPerType = {};
              var hasPositiveValues = false;
              var hasNegativeValues = false;
              helpers.each(datasets, function(dataset, datasetIndex) {
                var meta = chart.getDatasetMeta(datasetIndex);
                if (valuesPerType[meta.type] === undefined) {
                  valuesPerType[meta.type] = {
                    positiveValues: [],
                    negativeValues: []
                  };
                }
                var positiveValues = valuesPerType[meta.type].positiveValues;
                var negativeValues = valuesPerType[meta.type].negativeValues;
                if (chart.isDatasetVisible(datasetIndex) && IDMatches(meta)) {
                  helpers.each(dataset.data, function(rawValue, index) {
                    var value = +_this.getRightValue(rawValue);
                    if (isNaN(value) || meta.data[index].hidden) {
                      return;
                    }
                    positiveValues[index] = positiveValues[index] || 0;
                    negativeValues[index] = negativeValues[index] || 0;
                    if (opts.relativePoints) {
                      positiveValues[index] = 100;
                    } else {
                      if (value < 0) {
                        hasNegativeValues = true;
                        negativeValues[index] += value;
                      } else {
                        hasPositiveValues = true;
                        positiveValues[index] += value;
                      }
                    }
                  });
                }
              });
              helpers.each(valuesPerType, function(valuesForType) {
                var values = valuesForType.positiveValues.concat(valuesForType.negativeValues);
                var minVal = helpers.min(values);
                var maxVal = helpers.max(values);
                _this.min = _this.min === null ? minVal : Math.min(_this.min, minVal);
                _this.max = _this.max === null ? maxVal : Math.max(_this.max, maxVal);
              });
            } else {
              helpers.each(datasets, function(dataset, datasetIndex) {
                var meta = chart.getDatasetMeta(datasetIndex);
                if (chart.isDatasetVisible(datasetIndex) && IDMatches(meta)) {
                  helpers.each(dataset.data, function(rawValue, index) {
                    var value = +_this.getRightValue(rawValue);
                    if (isNaN(value) || meta.data[index].hidden) {
                      return;
                    }
                    if (_this.min === null) {
                      _this.min = value;
                    } else if (value < _this.min) {
                      _this.min = value;
                    }
                    if (_this.max === null) {
                      _this.max = value;
                    } else if (value > _this.max) {
                      _this.max = value;
                    }
                  });
                }
              });
            }
            if (tickOpts.beginAtZero) {
              var minSign = helpers.sign(_this.min);
              var maxSign = helpers.sign(_this.max);
              if (minSign < 0 && maxSign < 0) {
                _this.max = 0;
              } else if (minSign > 0 && maxSign > 0) {
                _this.min = 0;
              }
            }
            if (tickOpts.min !== undefined) {
              _this.min = tickOpts.min;
            } else if (tickOpts.suggestedMin !== undefined) {
              _this.min = Math.min(_this.min, tickOpts.suggestedMin);
            }
            if (tickOpts.max !== undefined) {
              _this.max = tickOpts.max;
            } else if (tickOpts.suggestedMax !== undefined) {
              _this.max = Math.max(_this.max, tickOpts.suggestedMax);
            }
            if (_this.min === _this.max) {
              _this.max++;
              if (!tickOpts.beginAtZero) {
                _this.min--;
              }
            }
          },
          buildTicks: function() {
            var _this = this;
            var opts = _this.options;
            var tickOpts = opts.ticks;
            var getValueOrDefault = helpers.getValueOrDefault;
            var isHorizontal = _this.isHorizontal();
            var ticks = _this.ticks = [];
            var maxTicks;
            if (isHorizontal) {
              maxTicks = Math.min(tickOpts.maxTicksLimit ? tickOpts.maxTicksLimit : 11, Math.ceil(_this.width / 50));
            } else {
              var tickFontSize = getValueOrDefault(tickOpts.fontSize, Chart.defaults.global.defaultFontSize);
              maxTicks = Math.min(tickOpts.maxTicksLimit ? tickOpts.maxTicksLimit : 11, Math.ceil(_this.height / (2 * tickFontSize)));
            }
            maxTicks = Math.max(2, maxTicks);
            var spacing;
            var fixedStepSizeSet = (tickOpts.fixedStepSize && tickOpts.fixedStepSize > 0) || (tickOpts.stepSize && tickOpts.stepSize > 0);
            if (fixedStepSizeSet) {
              spacing = getValueOrDefault(tickOpts.fixedStepSize, tickOpts.stepSize);
            } else {
              var niceRange = helpers.niceNum(_this.max - _this.min, false);
              spacing = helpers.niceNum(niceRange / (maxTicks - 1), true);
            }
            var niceMin = Math.floor(_this.min / spacing) * spacing;
            var niceMax = Math.ceil(_this.max / spacing) * spacing;
            var numSpaces = (niceMax - niceMin) / spacing;
            if (helpers.almostEquals(numSpaces, Math.round(numSpaces), spacing / 1000)) {
              numSpaces = Math.round(numSpaces);
            } else {
              numSpaces = Math.ceil(numSpaces);
            }
            ticks.push(tickOpts.min !== undefined ? tickOpts.min : niceMin);
            for (var j = 1; j < numSpaces; ++j) {
              ticks.push(niceMin + (j * spacing));
            }
            ticks.push(tickOpts.max !== undefined ? tickOpts.max : niceMax);
            if (!isHorizontal) {
              ticks.reverse();
            }
            _this.max = helpers.max(ticks);
            _this.min = helpers.min(ticks);
            if (tickOpts.reverse) {
              ticks.reverse();
              _this.start = _this.max;
              _this.end = _this.min;
            } else {
              _this.start = _this.min;
              _this.end = _this.max;
            }
          },
          getLabelForIndex: function(index, datasetIndex) {
            return +this.getRightValue(this.chart.data.datasets[datasetIndex].data[index]);
          },
          convertTicksToLabels: function() {
            var _this = this;
            _this.ticksAsNumbers = _this.ticks.slice();
            _this.zeroLineIndex = _this.ticks.indexOf(0);
            Chart.Scale.prototype.convertTicksToLabels.call(_this);
          },
          getPixelForValue: function(value, index, datasetIndex, includeOffset) {
            var _this = this;
            var paddingLeft = _this.paddingLeft;
            var paddingBottom = _this.paddingBottom;
            var start = _this.start;
            var rightValue = +_this.getRightValue(value);
            var pixel;
            var innerDimension;
            var range = _this.end - start;
            if (_this.isHorizontal()) {
              innerDimension = _this.width - (paddingLeft + _this.paddingRight);
              pixel = _this.left + (innerDimension / range * (rightValue - start));
              return Math.round(pixel + paddingLeft);
            } else {
              innerDimension = _this.height - (_this.paddingTop + paddingBottom);
              pixel = (_this.bottom - paddingBottom) - (innerDimension / range * (rightValue - start));
              return Math.round(pixel);
            }
          },
          getValueForPixel: function(pixel) {
            var _this = this;
            var isHorizontal = _this.isHorizontal();
            var paddingLeft = _this.paddingLeft;
            var paddingBottom = _this.paddingBottom;
            var innerDimension = isHorizontal ? _this.width - (paddingLeft + _this.paddingRight) : _this.height - (_this.paddingTop + paddingBottom);
            var offset = (isHorizontal ? pixel - _this.left - paddingLeft : _this.bottom - paddingBottom - pixel) / innerDimension;
            return _this.start + ((_this.end - _this.start) * offset);
          },
          getPixelForTick: function(index, includeOffset) {
            return this.getPixelForValue(this.ticksAsNumbers[index], null, null, includeOffset);
          }
        });
        Chart.scaleService.registerScaleType("linear", LinearScale, defaultConfig);
      };
    }, {}],
    40: [function(require, module, exports) {
      "use strict";
      module.exports = function(Chart) {
        var helpers = Chart.helpers;
        var defaultConfig = {
          position: "left",
          ticks: {callback: function(value, index, arr) {
              var remain = value / (Math.pow(10, Math.floor(helpers.log10(value))));
              if (remain === 1 || remain === 2 || remain === 5 || index === 0 || index === arr.length - 1) {
                return value.toExponential();
              } else {
                return '';
              }
            }}
        };
        var LogarithmicScale = Chart.Scale.extend({
          determineDataLimits: function() {
            var _this = this;
            var opts = _this.options;
            var tickOpts = opts.ticks;
            var chart = _this.chart;
            var data = chart.data;
            var datasets = data.datasets;
            var getValueOrDefault = helpers.getValueOrDefault;
            var isHorizontal = _this.isHorizontal();
            function IDMatches(meta) {
              return isHorizontal ? meta.xAxisID === _this.id : meta.yAxisID === _this.id;
            }
            _this.min = null;
            _this.max = null;
            if (opts.stacked) {
              var valuesPerType = {};
              helpers.each(datasets, function(dataset, datasetIndex) {
                var meta = chart.getDatasetMeta(datasetIndex);
                if (chart.isDatasetVisible(datasetIndex) && IDMatches(meta)) {
                  if (valuesPerType[meta.type] === undefined) {
                    valuesPerType[meta.type] = [];
                  }
                  helpers.each(dataset.data, function(rawValue, index) {
                    var values = valuesPerType[meta.type];
                    var value = +_this.getRightValue(rawValue);
                    if (isNaN(value) || meta.data[index].hidden) {
                      return;
                    }
                    values[index] = values[index] || 0;
                    if (opts.relativePoints) {
                      values[index] = 100;
                    } else {
                      values[index] += value;
                    }
                  });
                }
              });
              helpers.each(valuesPerType, function(valuesForType) {
                var minVal = helpers.min(valuesForType);
                var maxVal = helpers.max(valuesForType);
                _this.min = _this.min === null ? minVal : Math.min(_this.min, minVal);
                _this.max = _this.max === null ? maxVal : Math.max(_this.max, maxVal);
              });
            } else {
              helpers.each(datasets, function(dataset, datasetIndex) {
                var meta = chart.getDatasetMeta(datasetIndex);
                if (chart.isDatasetVisible(datasetIndex) && IDMatches(meta)) {
                  helpers.each(dataset.data, function(rawValue, index) {
                    var value = +_this.getRightValue(rawValue);
                    if (isNaN(value) || meta.data[index].hidden) {
                      return;
                    }
                    if (_this.min === null) {
                      _this.min = value;
                    } else if (value < _this.min) {
                      _this.min = value;
                    }
                    if (_this.max === null) {
                      _this.max = value;
                    } else if (value > _this.max) {
                      _this.max = value;
                    }
                  });
                }
              });
            }
            _this.min = getValueOrDefault(tickOpts.min, _this.min);
            _this.max = getValueOrDefault(tickOpts.max, _this.max);
            if (_this.min === _this.max) {
              if (_this.min !== 0 && _this.min !== null) {
                _this.min = Math.pow(10, Math.floor(helpers.log10(_this.min)) - 1);
                _this.max = Math.pow(10, Math.floor(helpers.log10(_this.max)) + 1);
              } else {
                _this.min = 1;
                _this.max = 10;
              }
            }
          },
          buildTicks: function() {
            var _this = this;
            var opts = _this.options;
            var tickOpts = opts.ticks;
            var getValueOrDefault = helpers.getValueOrDefault;
            var ticks = _this.ticks = [];
            var tickVal = getValueOrDefault(tickOpts.min, Math.pow(10, Math.floor(helpers.log10(_this.min))));
            while (tickVal < _this.max) {
              ticks.push(tickVal);
              var exp = Math.floor(helpers.log10(tickVal));
              var significand = Math.floor(tickVal / Math.pow(10, exp)) + 1;
              if (significand === 10) {
                significand = 1;
                ++exp;
              }
              tickVal = significand * Math.pow(10, exp);
            }
            var lastTick = getValueOrDefault(tickOpts.max, tickVal);
            ticks.push(lastTick);
            if (!_this.isHorizontal()) {
              ticks.reverse();
            }
            _this.max = helpers.max(ticks);
            _this.min = helpers.min(ticks);
            if (tickOpts.reverse) {
              ticks.reverse();
              _this.start = _this.max;
              _this.end = _this.min;
            } else {
              _this.start = _this.min;
              _this.end = _this.max;
            }
          },
          convertTicksToLabels: function() {
            this.tickValues = this.ticks.slice();
            Chart.Scale.prototype.convertTicksToLabels.call(this);
          },
          getLabelForIndex: function(index, datasetIndex) {
            return +this.getRightValue(this.chart.data.datasets[datasetIndex].data[index]);
          },
          getPixelForTick: function(index, includeOffset) {
            return this.getPixelForValue(this.tickValues[index], null, null, includeOffset);
          },
          getPixelForValue: function(value, index, datasetIndex, includeOffset) {
            var _this = this;
            var innerDimension;
            var pixel;
            var start = _this.start;
            var newVal = +_this.getRightValue(value);
            var range = helpers.log10(_this.end) - helpers.log10(start);
            var paddingTop = _this.paddingTop;
            var paddingBottom = _this.paddingBottom;
            var paddingLeft = _this.paddingLeft;
            if (_this.isHorizontal()) {
              if (newVal === 0) {
                pixel = _this.left + paddingLeft;
              } else {
                innerDimension = _this.width - (paddingLeft + _this.paddingRight);
                pixel = _this.left + (innerDimension / range * (helpers.log10(newVal) - helpers.log10(start)));
                pixel += paddingLeft;
              }
            } else {
              if (newVal === 0) {
                pixel = _this.top + paddingTop;
              } else {
                innerDimension = _this.height - (paddingTop + paddingBottom);
                pixel = (_this.bottom - paddingBottom) - (innerDimension / range * (helpers.log10(newVal) - helpers.log10(start)));
              }
            }
            return pixel;
          },
          getValueForPixel: function(pixel) {
            var _this = this;
            var offset;
            var range = helpers.log10(_this.end) - helpers.log10(_this.start);
            var value;
            var innerDimension;
            if (_this.isHorizontal()) {
              innerDimension = _this.width - (_this.paddingLeft + _this.paddingRight);
              value = _this.start * Math.pow(10, (pixel - _this.left - _this.paddingLeft) * range / innerDimension);
            } else {
              innerDimension = _this.height - (_this.paddingTop + _this.paddingBottom);
              value = Math.pow(10, (_this.bottom - _this.paddingBottom - pixel) * range / innerDimension) / _this.start;
            }
            return value;
          }
        });
        Chart.scaleService.registerScaleType("logarithmic", LogarithmicScale, defaultConfig);
      };
    }, {}],
    41: [function(require, module, exports) {
      "use strict";
      module.exports = function(Chart) {
        var helpers = Chart.helpers;
        var globalDefaults = Chart.defaults.global;
        var defaultConfig = {
          display: true,
          animate: true,
          lineArc: false,
          position: "chartArea",
          angleLines: {
            display: true,
            color: "rgba(0, 0, 0, 0.1)",
            lineWidth: 1
          },
          ticks: {
            showLabelBackdrop: true,
            backdropColor: "rgba(255,255,255,0.75)",
            backdropPaddingY: 2,
            backdropPaddingX: 2
          },
          pointLabels: {
            fontSize: 10,
            callback: function(label) {
              return label;
            }
          }
        };
        var LinearRadialScale = Chart.Scale.extend({
          getValueCount: function() {
            return this.chart.data.labels.length;
          },
          setDimensions: function() {
            var options = this.options;
            this.width = this.maxWidth;
            this.height = this.maxHeight;
            this.xCenter = Math.round(this.width / 2);
            this.yCenter = Math.round(this.height / 2);
            var minSize = helpers.min([this.height, this.width]);
            var tickFontSize = helpers.getValueOrDefault(options.ticks.fontSize, globalDefaults.defaultFontSize);
            this.drawingArea = (options.display) ? (minSize / 2) - (tickFontSize / 2 + options.ticks.backdropPaddingY) : (minSize / 2);
          },
          determineDataLimits: function() {
            this.min = null;
            this.max = null;
            helpers.each(this.chart.data.datasets, function(dataset, datasetIndex) {
              if (this.chart.isDatasetVisible(datasetIndex)) {
                var meta = this.chart.getDatasetMeta(datasetIndex);
                helpers.each(dataset.data, function(rawValue, index) {
                  var value = +this.getRightValue(rawValue);
                  if (isNaN(value) || meta.data[index].hidden) {
                    return;
                  }
                  if (this.min === null) {
                    this.min = value;
                  } else if (value < this.min) {
                    this.min = value;
                  }
                  if (this.max === null) {
                    this.max = value;
                  } else if (value > this.max) {
                    this.max = value;
                  }
                }, this);
              }
            }, this);
            if (this.options.ticks.beginAtZero) {
              var minSign = helpers.sign(this.min);
              var maxSign = helpers.sign(this.max);
              if (minSign < 0 && maxSign < 0) {
                this.max = 0;
              } else if (minSign > 0 && maxSign > 0) {
                this.min = 0;
              }
            }
            if (this.options.ticks.min !== undefined) {
              this.min = this.options.ticks.min;
            } else if (this.options.ticks.suggestedMin !== undefined) {
              this.min = Math.min(this.min, this.options.ticks.suggestedMin);
            }
            if (this.options.ticks.max !== undefined) {
              this.max = this.options.ticks.max;
            } else if (this.options.ticks.suggestedMax !== undefined) {
              this.max = Math.max(this.max, this.options.ticks.suggestedMax);
            }
            if (this.min === this.max) {
              this.min--;
              this.max++;
            }
          },
          buildTicks: function() {
            this.ticks = [];
            var tickFontSize = helpers.getValueOrDefault(this.options.ticks.fontSize, globalDefaults.defaultFontSize);
            var maxTicks = Math.min(this.options.ticks.maxTicksLimit ? this.options.ticks.maxTicksLimit : 11, Math.ceil(this.drawingArea / (1.5 * tickFontSize)));
            maxTicks = Math.max(2, maxTicks);
            var niceRange = helpers.niceNum(this.max - this.min, false);
            var spacing = helpers.niceNum(niceRange / (maxTicks - 1), true);
            var niceMin = Math.floor(this.min / spacing) * spacing;
            var niceMax = Math.ceil(this.max / spacing) * spacing;
            var numSpaces = Math.ceil((niceMax - niceMin) / spacing);
            this.ticks.push(this.options.ticks.min !== undefined ? this.options.ticks.min : niceMin);
            for (var j = 1; j < numSpaces; ++j) {
              this.ticks.push(niceMin + (j * spacing));
            }
            this.ticks.push(this.options.ticks.max !== undefined ? this.options.ticks.max : niceMax);
            this.max = helpers.max(this.ticks);
            this.min = helpers.min(this.ticks);
            if (this.options.ticks.reverse) {
              this.ticks.reverse();
              this.start = this.max;
              this.end = this.min;
            } else {
              this.start = this.min;
              this.end = this.max;
            }
            this.zeroLineIndex = this.ticks.indexOf(0);
          },
          convertTicksToLabels: function() {
            Chart.Scale.prototype.convertTicksToLabels.call(this);
            this.pointLabels = this.chart.data.labels.map(this.options.pointLabels.callback, this);
          },
          getLabelForIndex: function(index, datasetIndex) {
            return +this.getRightValue(this.chart.data.datasets[datasetIndex].data[index]);
          },
          fit: function() {
            var pointLabels = this.options.pointLabels;
            var pointLabelFontSize = helpers.getValueOrDefault(pointLabels.fontSize, globalDefaults.defaultFontSize);
            var pointLabeFontStyle = helpers.getValueOrDefault(pointLabels.fontStyle, globalDefaults.defaultFontStyle);
            var pointLabeFontFamily = helpers.getValueOrDefault(pointLabels.fontFamily, globalDefaults.defaultFontFamily);
            var pointLabeFont = helpers.fontString(pointLabelFontSize, pointLabeFontStyle, pointLabeFontFamily);
            var largestPossibleRadius = helpers.min([(this.height / 2 - pointLabelFontSize - 5), this.width / 2]),
                pointPosition,
                i,
                textWidth,
                halfTextWidth,
                furthestRight = this.width,
                furthestRightIndex,
                furthestRightAngle,
                furthestLeft = 0,
                furthestLeftIndex,
                furthestLeftAngle,
                xProtrusionLeft,
                xProtrusionRight,
                radiusReductionRight,
                radiusReductionLeft,
                maxWidthRadius;
            this.ctx.font = pointLabeFont;
            for (i = 0; i < this.getValueCount(); i++) {
              pointPosition = this.getPointPosition(i, largestPossibleRadius);
              textWidth = this.ctx.measureText(this.pointLabels[i] ? this.pointLabels[i] : '').width + 5;
              if (i === 0 || i === this.getValueCount() / 2) {
                halfTextWidth = textWidth / 2;
                if (pointPosition.x + halfTextWidth > furthestRight) {
                  furthestRight = pointPosition.x + halfTextWidth;
                  furthestRightIndex = i;
                }
                if (pointPosition.x - halfTextWidth < furthestLeft) {
                  furthestLeft = pointPosition.x - halfTextWidth;
                  furthestLeftIndex = i;
                }
              } else if (i < this.getValueCount() / 2) {
                if (pointPosition.x + textWidth > furthestRight) {
                  furthestRight = pointPosition.x + textWidth;
                  furthestRightIndex = i;
                }
              } else if (i > this.getValueCount() / 2) {
                if (pointPosition.x - textWidth < furthestLeft) {
                  furthestLeft = pointPosition.x - textWidth;
                  furthestLeftIndex = i;
                }
              }
            }
            xProtrusionLeft = furthestLeft;
            xProtrusionRight = Math.ceil(furthestRight - this.width);
            furthestRightAngle = this.getIndexAngle(furthestRightIndex);
            furthestLeftAngle = this.getIndexAngle(furthestLeftIndex);
            radiusReductionRight = xProtrusionRight / Math.sin(furthestRightAngle + Math.PI / 2);
            radiusReductionLeft = xProtrusionLeft / Math.sin(furthestLeftAngle + Math.PI / 2);
            radiusReductionRight = (helpers.isNumber(radiusReductionRight)) ? radiusReductionRight : 0;
            radiusReductionLeft = (helpers.isNumber(radiusReductionLeft)) ? radiusReductionLeft : 0;
            this.drawingArea = Math.round(largestPossibleRadius - (radiusReductionLeft + radiusReductionRight) / 2);
            this.setCenterPoint(radiusReductionLeft, radiusReductionRight);
          },
          setCenterPoint: function(leftMovement, rightMovement) {
            var maxRight = this.width - rightMovement - this.drawingArea,
                maxLeft = leftMovement + this.drawingArea;
            this.xCenter = Math.round(((maxLeft + maxRight) / 2) + this.left);
            this.yCenter = Math.round((this.height / 2) + this.top);
          },
          getIndexAngle: function(index) {
            var angleMultiplier = (Math.PI * 2) / this.getValueCount();
            return index * angleMultiplier - (Math.PI / 2);
          },
          getDistanceFromCenterForValue: function(value) {
            if (value === null) {
              return 0;
            }
            var scalingFactor = this.drawingArea / (this.max - this.min);
            if (this.options.reverse) {
              return (this.max - value) * scalingFactor;
            } else {
              return (value - this.min) * scalingFactor;
            }
          },
          getPointPosition: function(index, distanceFromCenter) {
            var thisAngle = this.getIndexAngle(index);
            return {
              x: Math.round(Math.cos(thisAngle) * distanceFromCenter) + this.xCenter,
              y: Math.round(Math.sin(thisAngle) * distanceFromCenter) + this.yCenter
            };
          },
          getPointPositionForValue: function(index, value) {
            return this.getPointPosition(index, this.getDistanceFromCenterForValue(value));
          },
          getBasePosition: function() {
            var me = this;
            var min = me.min;
            var max = me.max;
            return me.getPointPositionForValue(0, me.beginAtZero ? 0 : min < 0 && max < 0 ? max : min > 0 && max > 0 ? min : 0);
          },
          draw: function() {
            if (this.options.display) {
              var ctx = this.ctx;
              helpers.each(this.ticks, function(label, index) {
                if (index > 0 || this.options.reverse) {
                  var yCenterOffset = this.getDistanceFromCenterForValue(this.ticks[index]);
                  var yHeight = this.yCenter - yCenterOffset;
                  if (this.options.gridLines.display) {
                    ctx.strokeStyle = this.options.gridLines.color;
                    ctx.lineWidth = this.options.gridLines.lineWidth;
                    if (this.options.lineArc) {
                      ctx.beginPath();
                      ctx.arc(this.xCenter, this.yCenter, yCenterOffset, 0, Math.PI * 2);
                      ctx.closePath();
                      ctx.stroke();
                    } else {
                      ctx.beginPath();
                      for (var i = 0; i < this.getValueCount(); i++) {
                        var pointPosition = this.getPointPosition(i, this.getDistanceFromCenterForValue(this.ticks[index]));
                        if (i === 0) {
                          ctx.moveTo(pointPosition.x, pointPosition.y);
                        } else {
                          ctx.lineTo(pointPosition.x, pointPosition.y);
                        }
                      }
                      ctx.closePath();
                      ctx.stroke();
                    }
                  }
                  if (this.options.ticks.display) {
                    var tickFontColor = helpers.getValueOrDefault(this.options.ticks.fontColor, globalDefaults.defaultFontColor);
                    var tickFontSize = helpers.getValueOrDefault(this.options.ticks.fontSize, globalDefaults.defaultFontSize);
                    var tickFontStyle = helpers.getValueOrDefault(this.options.ticks.fontStyle, globalDefaults.defaultFontStyle);
                    var tickFontFamily = helpers.getValueOrDefault(this.options.ticks.fontFamily, globalDefaults.defaultFontFamily);
                    var tickLabelFont = helpers.fontString(tickFontSize, tickFontStyle, tickFontFamily);
                    ctx.font = tickLabelFont;
                    if (this.options.ticks.showLabelBackdrop) {
                      var labelWidth = ctx.measureText(label).width;
                      ctx.fillStyle = this.options.ticks.backdropColor;
                      ctx.fillRect(this.xCenter - labelWidth / 2 - this.options.ticks.backdropPaddingX, yHeight - tickFontSize / 2 - this.options.ticks.backdropPaddingY, labelWidth + this.options.ticks.backdropPaddingX * 2, tickFontSize + this.options.ticks.backdropPaddingY * 2);
                    }
                    ctx.textAlign = 'center';
                    ctx.textBaseline = "middle";
                    ctx.fillStyle = tickFontColor;
                    ctx.fillText(label, this.xCenter, yHeight);
                  }
                }
              }, this);
              if (!this.options.lineArc) {
                ctx.lineWidth = this.options.angleLines.lineWidth;
                ctx.strokeStyle = this.options.angleLines.color;
                for (var i = this.getValueCount() - 1; i >= 0; i--) {
                  if (this.options.angleLines.display) {
                    var outerPosition = this.getPointPosition(i, this.getDistanceFromCenterForValue(this.options.reverse ? this.min : this.max));
                    ctx.beginPath();
                    ctx.moveTo(this.xCenter, this.yCenter);
                    ctx.lineTo(outerPosition.x, outerPosition.y);
                    ctx.stroke();
                    ctx.closePath();
                  }
                  var pointLabelPosition = this.getPointPosition(i, this.getDistanceFromCenterForValue(this.options.reverse ? this.min : this.max) + 5);
                  var pointLabelFontColor = helpers.getValueOrDefault(this.options.pointLabels.fontColor, globalDefaults.defaultFontColor);
                  var pointLabelFontSize = helpers.getValueOrDefault(this.options.pointLabels.fontSize, globalDefaults.defaultFontSize);
                  var pointLabeFontStyle = helpers.getValueOrDefault(this.options.pointLabels.fontStyle, globalDefaults.defaultFontStyle);
                  var pointLabeFontFamily = helpers.getValueOrDefault(this.options.pointLabels.fontFamily, globalDefaults.defaultFontFamily);
                  var pointLabeFont = helpers.fontString(pointLabelFontSize, pointLabeFontStyle, pointLabeFontFamily);
                  ctx.font = pointLabeFont;
                  ctx.fillStyle = pointLabelFontColor;
                  var labelsCount = this.pointLabels.length,
                      halfLabelsCount = this.pointLabels.length / 2,
                      quarterLabelsCount = halfLabelsCount / 2,
                      upperHalf = (i < quarterLabelsCount || i > labelsCount - quarterLabelsCount),
                      exactQuarter = (i === quarterLabelsCount || i === labelsCount - quarterLabelsCount);
                  if (i === 0) {
                    ctx.textAlign = 'center';
                  } else if (i === halfLabelsCount) {
                    ctx.textAlign = 'center';
                  } else if (i < halfLabelsCount) {
                    ctx.textAlign = 'left';
                  } else {
                    ctx.textAlign = 'right';
                  }
                  if (exactQuarter) {
                    ctx.textBaseline = 'middle';
                  } else if (upperHalf) {
                    ctx.textBaseline = 'bottom';
                  } else {
                    ctx.textBaseline = 'top';
                  }
                  ctx.fillText(this.pointLabels[i] ? this.pointLabels[i] : '', pointLabelPosition.x, pointLabelPosition.y);
                }
              }
            }
          }
        });
        Chart.scaleService.registerScaleType("radialLinear", LinearRadialScale, defaultConfig);
      };
    }, {}],
    42: [function(require, module, exports) {
      "use strict";
      var moment = require('moment');
      moment = typeof(moment) === 'function' ? moment : window.moment;
      module.exports = function(Chart) {
        var helpers = Chart.helpers;
        var time = {units: [{
            name: 'millisecond',
            steps: [1, 2, 5, 10, 20, 50, 100, 250, 500]
          }, {
            name: 'second',
            steps: [1, 2, 5, 10, 30]
          }, {
            name: 'minute',
            steps: [1, 2, 5, 10, 30]
          }, {
            name: 'hour',
            steps: [1, 2, 3, 6, 12]
          }, {
            name: 'day',
            steps: [1, 2, 5]
          }, {
            name: 'week',
            maxStep: 4
          }, {
            name: 'month',
            maxStep: 3
          }, {
            name: 'quarter',
            maxStep: 4
          }, {
            name: 'year',
            maxStep: false
          }]};
        var defaultConfig = {
          position: "bottom",
          time: {
            parser: false,
            format: false,
            unit: false,
            round: false,
            displayFormat: false,
            isoWeekday: false,
            displayFormats: {
              'millisecond': 'h:mm:ss.SSS a',
              'second': 'h:mm:ss a',
              'minute': 'h:mm:ss a',
              'hour': 'MMM D, hA',
              'day': 'll',
              'week': 'll',
              'month': 'MMM YYYY',
              'quarter': '[Q]Q - YYYY',
              'year': 'YYYY'
            }
          },
          ticks: {autoSkip: false}
        };
        var TimeScale = Chart.Scale.extend({
          initialize: function() {
            if (!moment) {
              throw new Error('Chart.js - Moment.js could not be found! You must include it before Chart.js to use the time scale. Download at https://momentjs.com');
            }
            Chart.Scale.prototype.initialize.call(this);
          },
          getLabelMoment: function(datasetIndex, index) {
            return this.labelMoments[datasetIndex][index];
          },
          getMomentStartOf: function(tick) {
            if (this.options.time.unit === 'week' && this.options.time.isoWeekday !== false) {
              return tick.clone().startOf('isoWeek').isoWeekday(this.options.time.isoWeekday);
            } else {
              return tick.clone().startOf(this.tickUnit);
            }
          },
          determineDataLimits: function() {
            this.labelMoments = [];
            var scaleLabelMoments = [];
            if (this.chart.data.labels && this.chart.data.labels.length > 0) {
              helpers.each(this.chart.data.labels, function(label, index) {
                var labelMoment = this.parseTime(label);
                if (labelMoment.isValid()) {
                  if (this.options.time.round) {
                    labelMoment.startOf(this.options.time.round);
                  }
                  scaleLabelMoments.push(labelMoment);
                }
              }, this);
              this.firstTick = moment.min.call(this, scaleLabelMoments);
              this.lastTick = moment.max.call(this, scaleLabelMoments);
            } else {
              this.firstTick = null;
              this.lastTick = null;
            }
            helpers.each(this.chart.data.datasets, function(dataset, datasetIndex) {
              var momentsForDataset = [];
              var datasetVisible = this.chart.isDatasetVisible(datasetIndex);
              if (typeof dataset.data[0] === 'object' && dataset.data[0] !== null) {
                helpers.each(dataset.data, function(value, index) {
                  var labelMoment = this.parseTime(this.getRightValue(value));
                  if (labelMoment.isValid()) {
                    if (this.options.time.round) {
                      labelMoment.startOf(this.options.time.round);
                    }
                    momentsForDataset.push(labelMoment);
                    if (datasetVisible) {
                      this.firstTick = this.firstTick !== null ? moment.min(this.firstTick, labelMoment) : labelMoment;
                      this.lastTick = this.lastTick !== null ? moment.max(this.lastTick, labelMoment) : labelMoment;
                    }
                  }
                }, this);
              } else {
                momentsForDataset = scaleLabelMoments;
              }
              this.labelMoments.push(momentsForDataset);
            }, this);
            if (this.options.time.min) {
              this.firstTick = this.parseTime(this.options.time.min);
            }
            if (this.options.time.max) {
              this.lastTick = this.parseTime(this.options.time.max);
            }
            this.firstTick = (this.firstTick || moment()).clone();
            this.lastTick = (this.lastTick || moment()).clone();
          },
          buildTicks: function(index) {
            this.ctx.save();
            var tickFontSize = helpers.getValueOrDefault(this.options.ticks.fontSize, Chart.defaults.global.defaultFontSize);
            var tickFontStyle = helpers.getValueOrDefault(this.options.ticks.fontStyle, Chart.defaults.global.defaultFontStyle);
            var tickFontFamily = helpers.getValueOrDefault(this.options.ticks.fontFamily, Chart.defaults.global.defaultFontFamily);
            var tickLabelFont = helpers.fontString(tickFontSize, tickFontStyle, tickFontFamily);
            this.ctx.font = tickLabelFont;
            this.ticks = [];
            this.unitScale = 1;
            this.scaleSizeInUnits = 0;
            if (this.options.time.unit) {
              this.tickUnit = this.options.time.unit || 'day';
              this.displayFormat = this.options.time.displayFormats[this.tickUnit];
              this.scaleSizeInUnits = this.lastTick.diff(this.firstTick, this.tickUnit, true);
              this.unitScale = helpers.getValueOrDefault(this.options.time.unitStepSize, 1);
            } else {
              var innerWidth = this.isHorizontal() ? this.width - (this.paddingLeft + this.paddingRight) : this.height - (this.paddingTop + this.paddingBottom);
              var tempFirstLabel = this.tickFormatFunction(this.firstTick, 0, []);
              var tickLabelWidth = this.ctx.measureText(tempFirstLabel).width;
              var cosRotation = Math.cos(helpers.toRadians(this.options.ticks.maxRotation));
              var sinRotation = Math.sin(helpers.toRadians(this.options.ticks.maxRotation));
              tickLabelWidth = (tickLabelWidth * cosRotation) + (tickFontSize * sinRotation);
              var labelCapacity = innerWidth / (tickLabelWidth);
              this.tickUnit = 'millisecond';
              this.scaleSizeInUnits = this.lastTick.diff(this.firstTick, this.tickUnit, true);
              this.displayFormat = this.options.time.displayFormats[this.tickUnit];
              var unitDefinitionIndex = 0;
              var unitDefinition = time.units[unitDefinitionIndex];
              while (unitDefinitionIndex < time.units.length) {
                this.unitScale = 1;
                if (helpers.isArray(unitDefinition.steps) && Math.ceil(this.scaleSizeInUnits / labelCapacity) < helpers.max(unitDefinition.steps)) {
                  for (var idx = 0; idx < unitDefinition.steps.length; ++idx) {
                    if (unitDefinition.steps[idx] >= Math.ceil(this.scaleSizeInUnits / labelCapacity)) {
                      this.unitScale = helpers.getValueOrDefault(this.options.time.unitStepSize, unitDefinition.steps[idx]);
                      break;
                    }
                  }
                  break;
                } else if ((unitDefinition.maxStep === false) || (Math.ceil(this.scaleSizeInUnits / labelCapacity) < unitDefinition.maxStep)) {
                  this.unitScale = helpers.getValueOrDefault(this.options.time.unitStepSize, Math.ceil(this.scaleSizeInUnits / labelCapacity));
                  break;
                } else {
                  ++unitDefinitionIndex;
                  unitDefinition = time.units[unitDefinitionIndex];
                  this.tickUnit = unitDefinition.name;
                  var leadingUnitBuffer = this.firstTick.diff(this.getMomentStartOf(this.firstTick), this.tickUnit, true);
                  var trailingUnitBuffer = this.getMomentStartOf(this.lastTick.clone().add(1, this.tickUnit)).diff(this.lastTick, this.tickUnit, true);
                  this.scaleSizeInUnits = this.lastTick.diff(this.firstTick, this.tickUnit, true) + leadingUnitBuffer + trailingUnitBuffer;
                  this.displayFormat = this.options.time.displayFormats[unitDefinition.name];
                }
              }
            }
            var roundedStart;
            if (!this.options.time.min) {
              this.firstTick = this.getMomentStartOf(this.firstTick);
              roundedStart = this.firstTick;
            } else {
              roundedStart = this.getMomentStartOf(this.firstTick);
            }
            if (!this.options.time.max) {
              var roundedEnd = this.getMomentStartOf(this.lastTick);
              if (roundedEnd.diff(this.lastTick, this.tickUnit, true) !== 0) {
                this.lastTick = this.getMomentStartOf(this.lastTick.add(1, this.tickUnit));
              }
            }
            this.smallestLabelSeparation = this.width;
            helpers.each(this.chart.data.datasets, function(dataset, datasetIndex) {
              for (var i = 1; i < this.labelMoments[datasetIndex].length; i++) {
                this.smallestLabelSeparation = Math.min(this.smallestLabelSeparation, this.labelMoments[datasetIndex][i].diff(this.labelMoments[datasetIndex][i - 1], this.tickUnit, true));
              }
            }, this);
            if (this.options.time.displayFormat) {
              this.displayFormat = this.options.time.displayFormat;
            }
            this.ticks.push(this.firstTick.clone());
            for (var i = 1; i <= this.scaleSizeInUnits; ++i) {
              var newTick = roundedStart.clone().add(i, this.tickUnit);
              if (this.options.time.max && newTick.diff(this.lastTick, this.tickUnit, true) >= 0) {
                break;
              }
              if (i % this.unitScale === 0) {
                this.ticks.push(newTick);
              }
            }
            var diff = this.ticks[this.ticks.length - 1].diff(this.lastTick, this.tickUnit);
            if (diff !== 0 || this.scaleSizeInUnits === 0) {
              if (this.options.time.max) {
                this.ticks.push(this.lastTick.clone());
                this.scaleSizeInUnits = this.lastTick.diff(this.ticks[0], this.tickUnit, true);
              } else {
                this.ticks.push(this.lastTick.clone());
                this.scaleSizeInUnits = this.lastTick.diff(this.firstTick, this.tickUnit, true);
              }
            }
            this.ctx.restore();
          },
          getLabelForIndex: function(index, datasetIndex) {
            var label = this.chart.data.labels && index < this.chart.data.labels.length ? this.chart.data.labels[index] : '';
            if (typeof this.chart.data.datasets[datasetIndex].data[0] === 'object') {
              label = this.getRightValue(this.chart.data.datasets[datasetIndex].data[index]);
            }
            if (this.options.time.tooltipFormat) {
              label = this.parseTime(label).format(this.options.time.tooltipFormat);
            }
            return label;
          },
          tickFormatFunction: function tickFormatFunction(tick, index, ticks) {
            var formattedTick = tick.format(this.displayFormat);
            var tickOpts = this.options.ticks;
            var callback = helpers.getValueOrDefault(tickOpts.callback, tickOpts.userCallback);
            if (callback) {
              return callback(formattedTick, index, ticks);
            } else {
              return formattedTick;
            }
          },
          convertTicksToLabels: function() {
            this.tickMoments = this.ticks;
            this.ticks = this.ticks.map(this.tickFormatFunction, this);
          },
          getPixelForValue: function(value, index, datasetIndex, includeOffset) {
            var labelMoment = value && value.isValid && value.isValid() ? value : this.getLabelMoment(datasetIndex, index);
            if (labelMoment) {
              var offset = labelMoment.diff(this.firstTick, this.tickUnit, true);
              var decimal = offset / this.scaleSizeInUnits;
              if (this.isHorizontal()) {
                var innerWidth = this.width - (this.paddingLeft + this.paddingRight);
                var valueWidth = innerWidth / Math.max(this.ticks.length - 1, 1);
                var valueOffset = (innerWidth * decimal) + this.paddingLeft;
                return this.left + Math.round(valueOffset);
              } else {
                var innerHeight = this.height - (this.paddingTop + this.paddingBottom);
                var valueHeight = innerHeight / Math.max(this.ticks.length - 1, 1);
                var heightOffset = (innerHeight * decimal) + this.paddingTop;
                return this.top + Math.round(heightOffset);
              }
            }
          },
          getPixelForTick: function(index, includeOffset) {
            return this.getPixelForValue(this.tickMoments[index], null, null, includeOffset);
          },
          getValueForPixel: function(pixel) {
            var innerDimension = this.isHorizontal() ? this.width - (this.paddingLeft + this.paddingRight) : this.height - (this.paddingTop + this.paddingBottom);
            var offset = (pixel - (this.isHorizontal() ? this.left + this.paddingLeft : this.top + this.paddingTop)) / innerDimension;
            offset *= this.scaleSizeInUnits;
            return this.firstTick.clone().add(moment.duration(offset, this.tickUnit).asSeconds(), 'seconds');
          },
          parseTime: function(label) {
            if (typeof this.options.time.parser === 'string') {
              return moment(label, this.options.time.parser);
            }
            if (typeof this.options.time.parser === 'function') {
              return this.options.time.parser(label);
            }
            if (typeof label.getMonth === 'function' || typeof label === 'number') {
              return moment(label);
            }
            if (label.isValid && label.isValid()) {
              return label;
            }
            if (typeof this.options.time.format !== 'string' && this.options.time.format.call) {
              console.warn("options.time.format is deprecated and replaced by options.time.parser. See http://nnnick.github.io/Chart.js/docs-v2/#scales-time-scale");
              return this.options.time.format(label);
            }
            return moment(label, this.options.time.format);
          }
        });
        Chart.scaleService.registerScaleType("time", TimeScale, defaultConfig);
      };
    }, {"moment": 6}]
  }, {}, [7]);
})(require('buffer').Buffer, require('process'));
