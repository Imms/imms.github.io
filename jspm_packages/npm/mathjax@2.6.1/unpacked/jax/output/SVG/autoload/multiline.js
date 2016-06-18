/* */ 
(function(process) {
  MathJax.Hub.Register.StartupHook("SVG Jax Ready", function() {
    var VERSION = "2.6.0";
    var MML = MathJax.ElementJax.mml,
        SVG = MathJax.OutputJax.SVG,
        BBOX = SVG.BBOX;
    var PENALTY = {
      newline: 0,
      nobreak: 1000000,
      goodbreak: [-200],
      badbreak: [+200],
      auto: [0],
      toobig: 800,
      nestfactor: 400,
      spacefactor: -100,
      spaceoffset: 2,
      spacelimit: 1,
      fence: 500,
      close: 500
    };
    var ENDVALUES = {linebreakstyle: "after"};
    MML.mrow.Augment({SVGmultiline: function(svg) {
        var parent = this;
        while (parent.inferred || (parent.parent && parent.parent.type === "mrow" && parent.parent.data.length === 1)) {
          parent = parent.parent;
        }
        var isTop = ((parent.type === "math" && parent.Get("display") === "block") || parent.type === "mtd");
        parent.isMultiline = true;
        var VALUES = this.getValues("linebreak", "linebreakstyle", "lineleading", "linebreakmultchar", "indentalign", "indentshift", "indentalignfirst", "indentshiftfirst", "indentalignlast", "indentshiftlast");
        if (VALUES.linebreakstyle === MML.LINEBREAKSTYLE.INFIXLINEBREAKSTYLE) {
          VALUES.linebreakstyle = this.Get("infixlinebreakstyle");
        }
        VALUES.lineleading = SVG.length2em(VALUES.lineleading, 1, 0.5);
        svg = this.SVG();
        if (isTop && parent.type !== "mtd") {
          if (SVG.linebreakWidth < SVG.BIGDIMEN) {
            svg.w = SVG.linebreakWidth;
          } else {
            svg.w = SVG.cwidth;
          }
        }
        var state = {
          n: 0,
          Y: 0,
          scale: this.scale || 1,
          isTop: isTop,
          values: {},
          VALUES: VALUES
        },
            align = this.SVGgetAlign(state, {}),
            shift = this.SVGgetShift(state, {}, align),
            start = [],
            end = {
              index: [],
              penalty: PENALTY.nobreak,
              w: 0,
              W: shift,
              shift: shift,
              scanW: shift,
              nest: 0
            },
            broken = false;
        while (this.SVGbetterBreak(end, state) && (end.scanW >= SVG.linebreakWidth || end.penalty === PENALTY.newline)) {
          this.SVGaddLine(svg, start, end.index, state, end.values, broken);
          start = end.index.slice(0);
          broken = true;
          align = this.SVGgetAlign(state, end.values);
          shift = this.SVGgetShift(state, end.values, align);
          if (align === MML.INDENTALIGN.CENTER) {
            shift = 0;
          }
          end.W = end.shift = end.scanW = shift;
          end.penalty = PENALTY.nobreak;
        }
        state.isLast = true;
        this.SVGaddLine(svg, start, [], state, ENDVALUES, broken);
        this.SVGhandleSpace(svg);
        this.SVGhandleColor(svg);
        svg.isMultiline = true;
        this.SVGsaveData(svg);
        return svg;
      }});
    MML.mbase.Augment({
      SVGlinebreakPenalty: PENALTY,
      SVGbetterBreak: function(info, state) {
        if (this.isToken) {
          return false;
        }
        if (this.isEmbellished()) {
          info.embellished = this;
          return this.CoreMO().SVGbetterBreak(info, state);
        }
        if (this.linebreakContainer) {
          return false;
        }
        var index = info.index.slice(0),
            i = info.index.shift(),
            m = this.data.length,
            W,
            w,
            scanW,
            broken = (info.index.length > 0),
            better = false;
        if (i == null) {
          i = -1;
        }
        ;
        if (!broken) {
          i++;
          info.W += info.w;
          info.w = 0;
        }
        scanW = info.scanW = info.W;
        info.nest++;
        while (i < m && info.scanW < 1.33 * SVG.linebreakWidth) {
          if (this.data[i]) {
            if (this.data[i].SVGbetterBreak(info, state)) {
              better = true;
              index = [i].concat(info.index);
              W = info.W;
              w = info.w;
              if (info.penalty === PENALTY.newline) {
                info.index = index;
                if (info.nest) {
                  info.nest--;
                }
                return true;
              }
            }
            scanW = (broken ? info.scanW : this.SVGaddWidth(i, info, scanW));
          }
          info.index = [];
          i++;
          broken = false;
        }
        if (info.nest) {
          info.nest--;
        }
        info.index = index;
        if (better) {
          info.W = W;
        }
        return better;
      },
      SVGaddWidth: function(i, info, scanW) {
        if (this.data[i]) {
          var svg = this.data[i].SVGdata;
          scanW += svg.w + svg.x;
          if (svg.X) {
            scanW += svg.X;
          }
          info.W = info.scanW = scanW;
          info.w = 0;
        }
        return scanW;
      },
      SVGaddLine: function(svg, start, end, state, values, broken) {
        var line = BBOX();
        state.first = broken;
        state.last = true;
        this.SVGmoveLine(start, end, line, state, values);
        line.Clean();
        var align = this.SVGgetAlign(state, values),
            shift = this.SVGgetShift(state, values, align);
        if (state.n > 0) {
          var LHD = SVG.FONTDATA.baselineskip * state.scale;
          var leading = (state.values.lineleading == null ? state.VALUES : state.values).lineleading * state.scale;
          state.Y -= Math.max(LHD, state.d + line.h + leading);
        }
        if (line.w + shift > svg.w)
          svg.w = line.w + shift;
        svg.Align(line, align, 0, state.Y, shift);
        state.d = line.d;
        state.values = values;
        state.n++;
      },
      SVGgetAlign: function(state, values) {
        var cur = values,
            prev = state.values,
            def = state.VALUES,
            align;
        if (state.n === 0) {
          align = cur.indentalignfirst || prev.indentalignfirst || def.indentalignfirst;
        } else if (state.isLast) {
          align = prev.indentalignlast || def.indentalignlast;
        } else {
          align = prev.indentalign || def.indentalign;
        }
        if (align === MML.INDENTALIGN.INDENTALIGN) {
          align = prev.indentalign || def.indentalign;
        }
        if (align === MML.INDENTALIGN.AUTO) {
          align = (state.isTop ? this.displayAlign : MML.INDENTALIGN.LEFT);
        }
        return align;
      },
      SVGgetShift: function(state, values, align) {
        var cur = values,
            prev = state.values,
            def = state.VALUES,
            shift;
        if (state.n === 0) {
          shift = cur.indentshiftfirst || prev.indentshiftfirst || def.indentshiftfirst;
        } else if (state.isLast) {
          shift = prev.indentshiftlast || def.indentshiftlast;
        } else {
          shift = prev.indentshift || def.indentshift;
        }
        if (shift === MML.INDENTSHIFT.INDENTSHIFT) {
          shift = prev.indentshift || def.indentshift;
        }
        if (shift === "auto" || shift === "") {
          shift = "0";
        }
        shift = SVG.length2em(shift, 1, SVG.cwidth);
        if (state.isTop && this.displayIndent !== "0") {
          var indent = SVG.length2em(this.displayIndent, 1, SVG.cwidth);
          shift += (align === MML.INDENTALIGN.RIGHT ? -indent : indent);
        }
        return shift;
      },
      SVGmoveLine: function(start, end, svg, state, values) {
        var i = start[0],
            j = end[0];
        if (i == null) {
          i = -1;
        }
        ;
        if (j == null) {
          j = this.data.length - 1;
        }
        if (i === j && start.length > 1) {
          this.data[i].SVGmoveSlice(start.slice(1), end.slice(1), svg, state, values, "paddingLeft");
        } else {
          var last = state.last;
          state.last = false;
          while (i < j) {
            if (this.data[i]) {
              if (start.length <= 1) {
                this.data[i].SVGmove(svg, state, values);
              } else {
                this.data[i].SVGmoveSlice(start.slice(1), [], svg, state, values, "paddingLeft");
              }
            }
            i++;
            state.first = false;
            start = [];
          }
          state.last = last;
          if (this.data[i]) {
            if (end.length <= 1) {
              this.data[i].SVGmove(svg, state, values);
            } else {
              this.data[i].SVGmoveSlice([], end.slice(1), svg, state, values, "paddingRight");
            }
          }
        }
      },
      SVGmoveSlice: function(start, end, svg, state, values, padding) {
        var slice = BBOX();
        this.SVGmoveLine(start, end, slice, state, values);
        slice.Clean();
        this.SVGhandleColor(slice);
        svg.Add(slice, svg.w, 0, true);
        return slice;
      },
      SVGmove: function(line, state, values) {
        if (!(state.first || state.last) || (state.first && state.values.linebreakstyle === MML.LINEBREAKSTYLE.BEFORE) || (state.last && values.linebreakstyle === MML.LINEBREAKSTYLE.AFTER)) {
          var svg = this.toSVG(this.SVGdata.HW, this.SVGdata.D);
          if (state.first || state.nextIsFirst) {
            svg.x = 0;
          }
          if (state.last && svg.X) {
            svg.X = 0;
          }
          line.Add(svg, line.w, 0, true);
        }
        if (state.first && svg && svg.w === 0) {
          state.nextIsFirst = true;
        } else {
          delete state.nextIsFirst;
        }
      }
    });
    MML.mfenced.Augment({
      SVGbetterBreak: function(info, state) {
        var index = info.index.slice(0),
            i = info.index.shift(),
            m = this.data.length,
            W,
            w,
            scanW,
            broken = (info.index.length > 0),
            better = false;
        if (i == null) {
          i = -1;
        }
        ;
        if (!broken) {
          i++;
          info.W += info.w;
          info.w = 0;
        }
        scanW = info.scanW = info.W;
        info.nest++;
        if (!this.dataI) {
          this.dataI = [];
          if (this.data.open) {
            this.dataI.push("open");
          }
          if (m) {
            this.dataI.push(0);
          }
          for (var j = 1; j < m; j++) {
            if (this.data["sep" + j]) {
              this.dataI.push("sep" + j);
            }
            this.dataI.push(j);
          }
          if (this.data.close) {
            this.dataI.push("close");
          }
        }
        m = this.dataI.length;
        while (i < m && info.scanW < 1.33 * SVG.linebreakWidth) {
          var k = this.dataI[i];
          if (this.data[k]) {
            if (this.data[k].SVGbetterBreak(info, state)) {
              better = true;
              index = [i].concat(info.index);
              W = info.W;
              w = info.w;
              if (info.penalty === PENALTY.newline) {
                info.index = index;
                if (info.nest) {
                  info.nest--;
                }
                return true;
              }
            }
            scanW = (broken ? info.scanW : this.SVGaddWidth(i, info, scanW));
          }
          info.index = [];
          i++;
          broken = false;
        }
        if (info.nest) {
          info.nest--;
        }
        info.index = index;
        if (better) {
          info.W = W;
          info.w = w;
        }
        return better;
      },
      SVGmoveLine: function(start, end, svg, state, values) {
        var i = start[0],
            j = end[0];
        if (i == null) {
          i = -1;
        }
        ;
        if (j == null) {
          j = this.dataI.length - 1;
        }
        if (i === j && start.length > 1) {
          this.data[this.dataI[i]].SVGmoveSlice(start.slice(1), end.slice(1), svg, state, values, "paddingLeft");
        } else {
          var last = state.last;
          state.last = false;
          var k = this.dataI[i];
          while (i < j) {
            if (this.data[k]) {
              if (start.length <= 1) {
                this.data[k].SVGmove(svg, state, values);
              } else {
                this.data[k].SVGmoveSlice(start.slice(1), [], svg, state, values, "paddingLeft");
              }
            }
            i++;
            k = this.dataI[i];
            state.first = false;
            start = [];
          }
          state.last = last;
          if (this.data[k]) {
            if (end.length <= 1) {
              this.data[k].SVGmove(svg, state, values);
            } else {
              this.data[k].SVGmoveSlice([], end.slice(1), svg, state, values, "paddingRight");
            }
          }
        }
      }
    });
    MML.msubsup.Augment({
      SVGbetterBreak: function(info, state) {
        if (!this.data[this.base]) {
          return false;
        }
        var index = info.index.slice(0),
            i = info.index.shift(),
            W,
            w,
            scanW,
            broken = (info.index.length > 0),
            better = false;
        if (!broken) {
          info.W += info.w;
          info.w = 0;
        }
        scanW = info.scanW = info.W;
        if (i == null) {
          this.SVGdata.dw = this.SVGdata.w - this.data[this.base].SVGdata.w;
        }
        if (this.data[this.base].SVGbetterBreak(info, state)) {
          better = true;
          index = [this.base].concat(info.index);
          W = info.W;
          w = info.w;
          if (info.penalty === PENALTY.newline) {
            better = broken = true;
          }
        }
        if (!broken) {
          this.SVGaddWidth(this.base, info, scanW);
        }
        info.scanW += this.SVGdata.dw;
        info.W = info.scanW;
        info.index = [];
        if (better) {
          info.W = W;
          info.w = w;
          info.index = index;
        }
        return better;
      },
      SVGmoveLine: function(start, end, svg, state, values) {
        if (this.data[this.base]) {
          if (start.length > 1) {
            this.data[this.base].SVGmoveSlice(start.slice(1), end.slice(1), svg, state, values, "paddingLeft");
          } else {
            if (end.length <= 1) {
              this.data[this.base].SVGmove(svg, state, values);
            } else {
              this.data[this.base].SVGmoveSlice([], end.slice(1), svg, state, values, "paddingRight");
            }
          }
        }
        if (end.length === 0) {
          var sup = this.data[this.sup],
              sub = this.data[this.sub],
              w = svg.w,
              data;
          if (sup) {
            data = sup.SVGdata || {};
            svg.Add(sup.toSVG(), w + (data.dx || 0), data.dy);
          }
          if (sub) {
            data = sub.SVGdata || {};
            svg.Add(sub.toSVG(), w + (data.dx || 0), data.dy);
          }
        }
      }
    });
    MML.mmultiscripts.Augment({
      SVGbetterBreak: function(info, state) {
        if (!this.data[this.base]) {
          return false;
        }
        var index = info.index.slice(0);
        info.index.shift();
        var W,
            w,
            scanW,
            broken = (info.index.length > 0),
            better = false;
        if (!broken) {
          info.W += info.w;
          info.w = 0;
        }
        info.scanW = info.W;
        var dw = this.SVGdata.w - this.data[this.base].SVGdata.w - this.SVGdata.dx;
        info.scanW += this.SVGdata.dx;
        scanW = info.scanW;
        if (this.data[this.base].SVGbetterBreak(info, state)) {
          better = true;
          index = [this.base].concat(info.index);
          W = info.W;
          w = info.w;
          if (info.penalty === PENALTY.newline) {
            better = broken = true;
          }
        }
        if (!broken) {
          this.SVGaddWidth(this.base, info, scanW);
        }
        info.scanW += dw;
        info.W = info.scanW;
        info.index = [];
        if (better) {
          info.W = W;
          info.w = w;
          info.index = index;
        }
        return better;
      },
      SVGmoveLine: function(start, end, svg, state, values) {
        var dx,
            data = this.SVGdata;
        if (start.length < 1) {
          this.scriptBox = this.SVGgetScripts(this.SVGdata.s);
          var presub = this.scriptBox[2],
              presup = this.scriptBox[3];
          dx = svg.w + data.dx;
          if (presup) {
            svg.Add(presup, dx + data.delta - presup.w, data.u);
          }
          if (presub) {
            svg.Add(presub, dx - presub.w, -data.v);
          }
        }
        if (this.data[this.base]) {
          if (start.length > 1) {
            this.data[this.base].SVGmoveSlice(start.slice(1), end.slice(1), svg, state, values, "paddingLeft");
          } else {
            if (end.length <= 1) {
              this.data[this.base].SVGmove(svg, state, values);
            } else {
              this.data[this.base].SVGmoveSlice([], end.slice(1), svg, state, values, "paddingRight");
            }
          }
        }
        if (end.length === 0) {
          var sub = this.scriptBox[0],
              sup = this.scriptBox[1];
          dx = svg.w + data.s;
          if (sup) {
            svg.Add(sup, dx, data.u);
          }
          if (sub) {
            svg.Add(sub, dx - data.delta, -data.v);
          }
          delete this.scriptBox;
        }
      }
    });
    MML.mo.Augment({SVGbetterBreak: function(info, state) {
        if (info.values && info.values.last === this) {
          return false;
        }
        var values = this.getValues("linebreak", "linebreakstyle", "lineleading", "linebreakmultchar", "indentalign", "indentshift", "indentalignfirst", "indentshiftfirst", "indentalignlast", "indentshiftlast", "texClass", "fence");
        if (values.linebreakstyle === MML.LINEBREAKSTYLE.INFIXLINEBREAKSTYLE) {
          values.linebreakstyle = this.Get("infixlinebreakstyle");
        }
        if (values.texClass === MML.TEXCLASS.OPEN) {
          info.nest++;
        }
        if (values.texClass === MML.TEXCLASS.CLOSE && info.nest) {
          info.nest--;
        }
        var W = info.scanW,
            mo = info.embellished;
        delete info.embellished;
        if (!mo || !mo.SVGdata) {
          mo = this;
        }
        var svg = mo.SVGdata,
            w = svg.w + svg.x;
        if (values.linebreakstyle === MML.LINEBREAKSTYLE.AFTER) {
          W += w;
          w = 0;
        }
        if (W - info.shift === 0 && values.linebreak !== MML.LINEBREAK.NEWLINE) {
          return false;
        }
        var offset = SVG.linebreakWidth - W;
        if (state.n === 0 && (values.indentshiftfirst !== state.VALUES.indentshiftfirst || values.indentalignfirst !== state.VALUES.indentalignfirst)) {
          var align = this.SVGgetAlign(state, values),
              shift = this.SVGgetShift(state, values, align);
          offset += (info.shift - shift);
        }
        var penalty = Math.floor(offset / SVG.linebreakWidth * 1000);
        if (penalty < 0) {
          penalty = PENALTY.toobig - 3 * penalty;
        }
        if (values.fence) {
          penalty += PENALTY.fence;
        }
        if ((values.linebreakstyle === MML.LINEBREAKSTYLE.AFTER && values.texClass === MML.TEXCLASS.OPEN) || values.texClass === MML.TEXCLASS.CLOSE) {
          penalty += PENALTY.close;
        }
        penalty += info.nest * PENALTY.nestfactor;
        var linebreak = PENALTY[values.linebreak || MML.LINEBREAK.AUTO];
        if (!(linebreak instanceof Array)) {
          if (offset >= 0) {
            penalty = linebreak * info.nest;
          }
        } else {
          penalty = Math.max(1, penalty + linebreak[0] * info.nest);
        }
        if (penalty >= info.penalty) {
          return false;
        }
        info.penalty = penalty;
        info.values = values;
        info.W = W;
        info.w = w;
        values.lineleading = SVG.length2em(values.lineleading, 1, state.VALUES.lineleading);
        values.last = this;
        return true;
      }});
    MML.mspace.Augment({SVGbetterBreak: function(info, state) {
        if (info.values && info.values.last === this) {
          return false;
        }
        var values = this.getValues("linebreak");
        var linebreakValue = values.linebreak;
        if (!linebreakValue || this.hasDimAttr()) {
          linebreakValue = MML.LINEBREAK.AUTO;
        }
        var W = info.scanW,
            svg = this.SVGdata,
            w = svg.w + svg.x;
        if (W - info.shift === 0) {
          return false;
        }
        var offset = SVG.linebreakWidth - W;
        var penalty = Math.floor(offset / SVG.linebreakWidth * 1000);
        if (penalty < 0) {
          penalty = PENALTY.toobig - 3 * penalty;
        }
        penalty += info.nest * PENALTY.nestfactor;
        var linebreak = PENALTY[linebreakValue];
        if (linebreakValue === MML.LINEBREAK.AUTO && w >= PENALTY.spacelimit * 1000 && !this.mathbackground && !this.backrgound) {
          linebreak = [(w / 1000 + PENALTY.spaceoffset) * PENALTY.spacefactor];
        }
        if (!(linebreak instanceof Array)) {
          if (offset >= 0) {
            penalty = linebreak * info.nest;
          }
        } else {
          penalty = Math.max(1, penalty + linebreak[0] * info.nest);
        }
        if (penalty >= info.penalty) {
          return false;
        }
        info.penalty = penalty;
        info.values = values;
        info.W = W;
        info.w = w;
        values.lineleading = state.VALUES.lineleading;
        values.linebreakstyle = "before";
        values.last = this;
        return true;
      }});
    MathJax.Hub.Register.StartupHook("TeX mathchoice Ready", function() {
      MML.TeXmathchoice.Augment({
        SVGbetterBreak: function(info, state) {
          return this.Core().SVGbetterBreak(info, state);
        },
        SVGmoveLine: function(start, end, svg, state, values) {
          return this.Core().SVGmoveSlice(start, end, svg, state, values);
        }
      });
    });
    MML.maction.Augment({
      SVGbetterBreak: function(info, state) {
        return this.Core().SVGbetterBreak(info, state);
      },
      SVGmoveLine: function(start, end, svg, state, values) {
        return this.Core().SVGmoveSlice(start, end, svg, state, values);
      }
    });
    MML.semantics.Augment({
      SVGbetterBreak: function(info, state) {
        return (this.data[0] ? this.data[0].SVGbetterBreak(info, state) : false);
      },
      SVGmoveLine: function(start, end, svg, state, values) {
        return (this.data[0] ? this.data[0].SVGmoveSlice(start, end, svg, state, values) : null);
      }
    });
    MathJax.Hub.Startup.signal.Post("SVG multiline Ready");
    MathJax.Ajax.loadComplete(SVG.autoloadDir + "/multiline.js");
  });
})(require('process'));
