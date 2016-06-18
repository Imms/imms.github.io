/* */ 
(function(process) {
  MathJax.Hub.Register.StartupHook("HTML-CSS Jax Ready", function() {
    var VERSION = "2.6.0";
    var MML = MathJax.ElementJax.mml,
        HTMLCSS = MathJax.OutputJax["HTML-CSS"];
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
    MML.mbase.Augment({
      HTMLlinebreakPenalty: PENALTY,
      HTMLmultiline: function(span) {
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
        VALUES.lineleading = HTMLCSS.length2em(VALUES.lineleading, 1, 0.5);
        this.HTMLremoveColor(span);
        var stack = HTMLCSS.createStack(span);
        this.HTMLgetScale();
        var state = {
          n: 0,
          Y: 0,
          scale: this.scale || 1,
          isTop: isTop,
          values: {},
          VALUES: VALUES
        },
            align = this.HTMLgetAlign(state, {}),
            shift = this.HTMLgetShift(state, {}, align),
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
        while (this.HTMLbetterBreak(end, state) && (end.scanW >= HTMLCSS.linebreakWidth || end.penalty === PENALTY.newline)) {
          this.HTMLaddLine(stack, start, end.index, state, end.values, broken);
          start = end.index.slice(0);
          broken = true;
          align = this.HTMLgetAlign(state, end.values);
          shift = this.HTMLgetShift(state, end.values, align);
          if (align === MML.INDENTALIGN.CENTER) {
            shift = 0;
          }
          end.W = end.shift = end.scanW = shift;
          end.penalty = PENALTY.nobreak;
        }
        state.isLast = true;
        this.HTMLaddLine(stack, start, [], state, ENDVALUES, broken);
        if (isTop) {
          stack.style.width = "100%";
          if (parent.type === "math") {
            span.bbox.width = "100%";
          }
        }
        this.HTMLhandleSpace(span);
        this.HTMLhandleColor(span);
        span.bbox.isMultiline = true;
        return span;
      },
      HTMLbetterBreak: function(info, state) {
        if (this.isToken) {
          return false;
        }
        if (this.isEmbellished()) {
          info.embellished = this;
          return this.CoreMO().HTMLbetterBreak(info, state);
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
        while (i < m && info.scanW < 1.33 * HTMLCSS.linebreakWidth) {
          if (this.data[i]) {
            if (this.data[i].HTMLbetterBreak(info, state)) {
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
            scanW = (broken ? info.scanW : this.HTMLaddWidth(i, info, scanW));
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
      HTMLaddWidth: function(i, info, scanW) {
        if (this.data[i]) {
          var span = this.data[i].HTMLspanElement();
          scanW += span.bbox.w;
          if (span.style.paddingLeft) {
            scanW += HTMLCSS.unEm(span.style.paddingLeft);
          }
          if (span.style.paddingRight) {
            scanW += HTMLCSS.unEm(span.style.paddingRight);
          }
          info.W = info.scanW = scanW;
          info.w = 0;
        }
        return scanW;
      },
      HTMLaddLine: function(stack, start, end, state, values, broken) {
        line = HTMLCSS.createBox(stack);
        line.bbox = this.HTMLemptyBBox({});
        state.first = broken;
        state.last = true;
        this.HTMLmoveLine(start, end, line, state, values);
        this.HTMLcleanBBox(line.bbox);
        var align = this.HTMLgetAlign(state, values),
            shift = this.HTMLgetShift(state, values, align);
        if (state.n > 0) {
          var LHD = HTMLCSS.FONTDATA.baselineskip * state.scale;
          var leading = (state.values.lineleading == null ? state.VALUES : state.values).lineleading * state.scale;
          state.Y -= Math.max(LHD, state.d + line.bbox.h + leading);
        }
        HTMLCSS.alignBox(line, align, state.Y, shift);
        state.d = line.bbox.d;
        state.values = values;
        state.n++;
      },
      HTMLgetAlign: function(state, values) {
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
      HTMLgetShift: function(state, values, align) {
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
        shift = HTMLCSS.length2em(shift, 1, HTMLCSS.cwidth);
        if (state.isTop && this.displayIndent !== "0") {
          var indent = HTMLCSS.length2em(this.displayIndent, 1, HTMLCSS.cwidth);
          shift += (align === MML.INDENTALIGN.RIGHT ? -indent : indent);
        }
        return shift;
      },
      HTMLmoveLine: function(start, end, span, state, values) {
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
          this.data[i].HTMLmoveSlice(start.slice(1), end.slice(1), span, state, values, "paddingLeft");
        } else {
          var last = state.last;
          state.last = false;
          while (i < j) {
            if (this.data[i]) {
              if (start.length <= 1) {
                this.data[i].HTMLmoveSpan(span, state, values);
              } else {
                this.data[i].HTMLmoveSlice(start.slice(1), [], span, state, values, "paddingLeft");
              }
            }
            i++;
            state.first = false;
            start = [];
          }
          state.last = last;
          if (this.data[i]) {
            if (end.length <= 1) {
              this.data[i].HTMLmoveSpan(span, state, values);
            } else {
              this.data[i].HTMLmoveSlice([], end.slice(1), span, state, values, "paddingRight");
            }
          }
        }
      },
      HTMLmoveSlice: function(start, end, span, state, values, padding) {
        this.HTMLremoveColor();
        var slice = this.HTMLcreateSliceSpan(span);
        this.HTMLmoveLine(start, end, slice, state, values);
        slice.style[padding] = "";
        this.HTMLcombineBBoxes(slice, span.bbox);
        this.HTMLcleanBBox(slice.bbox);
        if (end.length === 0) {
          span = this.HTMLspanElement();
          span.parentNode.removeChild(span);
          span.nextMathJaxSpan.id = span.id;
          var n = 0;
          while (span = span.nextMathJaxSpan) {
            var color = this.HTMLhandleColor(span);
            if (color) {
              color.id += "-MathJax-Continue-" + n;
              n++;
            }
          }
        }
        return slice;
      },
      HTMLcreateSliceSpan: function(span) {
        var SPAN = this.HTMLspanElement(),
            n = 0;
        var LAST = SPAN;
        while (LAST.nextMathJaxSpan) {
          LAST = LAST.nextMathJaxSpan;
          n++;
        }
        var SLICE = SPAN.cloneNode(false);
        LAST.nextMathJaxSpan = SLICE;
        SLICE.nextMathJaxSpan = null;
        SLICE.id += "-MathJax-Continue-" + n;
        SLICE.bbox = this.HTMLemptyBBox({});
        return span.appendChild(SLICE);
      },
      HTMLmoveSpan: function(line, state, values) {
        if (!(state.first || state.last) || (state.first && state.values.linebreakstyle === MML.LINEBREAKSTYLE.BEFORE) || (state.last && values.linebreakstyle === MML.LINEBREAKSTYLE.AFTER)) {
          var color = document.getElementById("MathJax-Color-" + this.spanID + HTMLCSS.idPostfix);
          if (color) {
            line.appendChild(color);
          }
          var span = this.HTMLspanElement();
          line.appendChild(span);
          if (state.last) {
            span.style.paddingRight = "";
          }
          if (state.first || state.nextIsFirst) {
            span.style.paddingLeft = "";
            if (color) {
              this.HTMLremoveColor(span);
              this.HTMLhandleColor(span);
            }
          }
          if (state.first && span.bbox.w === 0) {
            state.nextIsFirst = true;
          } else {
            delete state.nextIsFirst;
          }
          this.HTMLcombineBBoxes(this, line.bbox);
        }
      }
    });
    MML.mfenced.Augment({
      HTMLbetterBreak: function(info, state) {
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
        while (i < m && info.scanW < 1.33 * HTMLCSS.linebreakWidth) {
          var k = this.dataI[i];
          if (this.data[k]) {
            if (this.data[k].HTMLbetterBreak(info, state)) {
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
            scanW = (broken ? info.scanW : this.HTMLaddWidth(i, info, scanW));
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
      HTMLmoveLine: function(start, end, span, state, values) {
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
          this.data[this.dataI[i]].HTMLmoveSlice(start.slice(1), end.slice(1), span, state, values, "paddingLeft");
        } else {
          var last = state.last;
          state.last = false;
          var k = this.dataI[i];
          while (i < j) {
            if (this.data[k]) {
              if (start.length <= 1) {
                this.data[k].HTMLmoveSpan(span, state, values);
              } else {
                this.data[k].HTMLmoveSlice(start.slice(1), [], span, state, values, "paddingLeft");
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
              this.data[k].HTMLmoveSpan(span, state, values);
            } else {
              this.data[k].HTMLmoveSlice([], end.slice(1), span, state, values, "paddingRight");
            }
          }
        }
      }
    });
    MML.msubsup.Augment({
      HTMLbetterBreak: function(info, state) {
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
          this.HTMLbaseW = this.data[this.base].HTMLspanElement().bbox.w;
          this.HTMLdw = this.HTMLspanElement().bbox.w - this.HTMLbaseW;
        }
        if (this.data[this.base].HTMLbetterBreak(info, state)) {
          better = true;
          index = [this.base].concat(info.index);
          W = info.W;
          w = info.w;
          if (info.penalty === PENALTY.newline) {
            better = broken = true;
          }
        }
        if (!broken) {
          this.HTMLaddWidth(this.base, info, scanW);
        }
        info.scanW += this.HTMLdw;
        info.W = info.scanW;
        info.index = [];
        if (better) {
          info.W = W;
          info.w = w;
          info.index = index;
        }
        return better;
      },
      HTMLmoveLine: function(start, end, span, state, values) {
        if (this.data[this.base]) {
          if (start.length > 1) {
            this.data[this.base].HTMLmoveSlice(start.slice(1), end.slice(1), span, state, values, "paddingLeft");
          } else {
            if (end.length <= 1) {
              this.data[this.base].HTMLmoveSpan(span, state, values);
            } else {
              this.data[this.base].HTMLmoveSlice([], end.slice(1), span, state, values, "paddingRight");
            }
          }
        }
        if (end.length === 0) {
          var s = this.data[this.sup] || this.data[this.sub];
          if (s && this.HTMLnotEmpty(s)) {
            var box = s.HTMLspanElement().parentNode,
                stack = box.parentNode;
            if (this.data[this.base]) {
              stack.removeChild(stack.firstChild);
            }
            for (box = stack.firstChild; box; box = box.nextSibling) {
              box.style.left = HTMLCSS.Em(HTMLCSS.unEm(box.style.left) - this.HTMLbaseW);
            }
            stack.bbox.w -= this.HTMLbaseW;
            stack.style.width = HTMLCSS.Em(stack.bbox.w);
            this.HTMLcombineBBoxes(stack, span.bbox);
            span.appendChild(stack);
          }
        }
      }
    });
    MML.mmultiscripts.Augment({
      HTMLbetterBreak: function(info, state) {
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
        var bbox = this.HTMLspanElement().bbox,
            base = this.data[this.base].HTMLspanElement().bbox;
        var dw = bbox.w - base.w;
        info.scanW += bbox.dx;
        scanW = info.scanW;
        if (this.data[this.base].HTMLbetterBreak(info, state)) {
          better = true;
          index = [this.base].concat(info.index);
          W = info.W;
          w = info.w;
          if (info.penalty === PENALTY.newline) {
            better = broken = true;
          }
        }
        if (!broken) {
          this.HTMLaddWidth(this.base, info, scanW);
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
      HTMLmoveLine: function(start, end, span, state, values) {
        var SPAN = this.HTMLspanElement(),
            data = SPAN.bbox,
            stack = SPAN.firstChild,
            BOX = {};
        if (HTMLCSS.msiePaddingWidthBug) {
          stack = stack.nextSibling;
        }
        var box = stack.firstChild;
        while (box) {
          if (box.bbox && box.bbox.name) {
            BOX[box.bbox.name] = box;
          }
          box = box.nextSibling;
        }
        if (start.length < 1) {
          if (BOX.presub || BOX.presup) {
            var STACK = HTMLCSS.createStack(span);
            if (BOX.presup) {
              HTMLCSS.addBox(STACK, BOX.presup);
              HTMLCSS.placeBox(BOX.presup, data.dx - BOX.presup.bbox.w, data.u);
            }
            if (BOX.presub) {
              HTMLCSS.addBox(STACK, BOX.presub);
              HTMLCSS.placeBox(BOX.presub, data.dx + data.delta - BOX.presub.bbox.w, -data.v);
            }
            this.HTMLcombineBBoxes(STACK, span.bbox);
            span.appendChild(STACK);
            STACK.style.width = HTMLCSS.Em(data.dx);
          }
        }
        if (this.data[this.base]) {
          if (start.length > 1) {
            this.data[this.base].HTMLmoveSlice(start.slice(1), end.slice(1), span, state, values, "paddingLeft");
          } else {
            if (end.length <= 1) {
              this.data[this.base].HTMLmoveSpan(span, state, values);
            } else {
              this.data[this.base].HTMLmoveSlice([], end.slice(1), span, state, values, "paddingRight");
            }
          }
        }
        if (end.length === 0) {
          if (this.data[this.base]) {
            stack.removeChild(stack.firstChild);
          }
          for (box = stack.firstChild; box; box = box.nextSibling) {
            box.style.left = HTMLCSS.Em(HTMLCSS.unEm(box.style.left) - data.px);
          }
          stack.bbox.w -= data.px;
          stack.style.width = HTMLCSS.Em(stack.bbox.w);
          this.HTMLcombineBBoxes(stack, span.bbox);
          span.appendChild(stack);
        }
      }
    });
    MML.mo.Augment({HTMLbetterBreak: function(info, state) {
        if (info.values && info.values.id === this.spanID) {
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
            mo = (info.embellished || this);
        delete info.embellished;
        var span = mo.HTMLspanElement(),
            w = span.bbox.w;
        if (span.style.paddingLeft) {
          w += HTMLCSS.unEm(span.style.paddingLeft);
        }
        if (values.linebreakstyle === MML.LINEBREAKSTYLE.AFTER) {
          W += w;
          w = 0;
        }
        if (W - info.shift === 0 && values.linebreak !== MML.LINEBREAK.NEWLINE) {
          return false;
        }
        var offset = HTMLCSS.linebreakWidth - W;
        if (state.n === 0 && (values.indentshiftfirst !== state.VALUES.indentshiftfirst || values.indentalignfirst !== state.VALUES.indentalignfirst)) {
          var align = this.HTMLgetAlign(state, values),
              shift = this.HTMLgetShift(state, values, align);
          offset += (info.shift - shift);
        }
        var penalty = Math.floor(offset / HTMLCSS.linebreakWidth * 1000);
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
        values.lineleading = HTMLCSS.length2em(values.lineleading, 1, state.VALUES.lineleading);
        values.id = this.spanID;
        return true;
      }});
    MML.mspace.Augment({HTMLbetterBreak: function(info, state) {
        if (info.values && info.values.id === this.spanID) {
          return false;
        }
        var values = this.getValues("linebreak");
        var linebreakValue = values.linebreak;
        if (!linebreakValue || this.hasDimAttr()) {
          linebreakValue = MML.LINEBREAK.AUTO;
        }
        var W = info.scanW,
            span = this.HTMLspanElement(),
            w = span.bbox.w;
        if (span.style.paddingLeft) {
          w += HTMLCSS.unEm(span.style.paddingLeft);
        }
        if (W - info.shift === 0) {
          return false;
        }
        var offset = HTMLCSS.linebreakWidth - W;
        var penalty = Math.floor(offset / HTMLCSS.linebreakWidth * 1000);
        if (penalty < 0) {
          penalty = PENALTY.toobig - 3 * penalty;
        }
        penalty += info.nest * PENALTY.nestfactor;
        var linebreak = PENALTY[linebreakValue];
        if (linebreakValue === MML.LINEBREAK.AUTO && w >= PENALTY.spacelimit && !this.mathbackground && !this.background) {
          linebreak = [(w + PENALTY.spaceoffset) * PENALTY.spacefactor];
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
        values.id = this.spanID;
        return true;
      }});
    MathJax.Hub.Register.StartupHook("TeX mathchoice Ready", function() {
      MML.TeXmathchoice.Augment({
        HTMLbetterBreak: function(info, state) {
          return this.Core().HTMLbetterBreak(info, state);
        },
        HTMLmoveLine: function(start, end, span, state, values) {
          return this.Core().HTMLmoveSlice(start, end, span, state, values);
        }
      });
    });
    MML.maction.Augment({
      HTMLbetterBreak: function(info, state) {
        return this.Core().HTMLbetterBreak(info, state);
      },
      HTMLmoveLine: function(start, end, span, state, values) {
        return this.Core().HTMLmoveSlice(start, end, span, state, values);
      },
      HTMLmoveSlice: function(start, end, span, state, values, padding) {
        var hitbox = document.getElementById("MathJax-HitBox-" + this.spanID + HTMLCSS.idPostfix);
        if (hitbox) {
          hitbox.parentNode.removeChild(hitbox);
        }
        var slice = this.SUPER(arguments).HTMLmoveSlice.apply(this, arguments);
        if (end.length === 0) {
          span = this.HTMLspanElement();
          var n = 0;
          while (span) {
            hitbox = this.HTMLhandleHitBox(span, "-Continue-" + n);
            span = span.nextMathJaxSpan;
            n++;
          }
        }
        return slice;
      }
    });
    MML.semantics.Augment({
      HTMLbetterBreak: function(info, state) {
        return (this.data[0] ? this.data[0].HTMLbetterBreak(info, state) : false);
      },
      HTMLmoveLine: function(start, end, span, state, values) {
        return (this.data[0] ? this.data[0].HTMLmoveSlice(start, end, span, state, values) : null);
      }
    });
    MathJax.Hub.Startup.signal.Post("HTML-CSS multiline Ready");
    MathJax.Ajax.loadComplete(HTMLCSS.autoloadDir + "/multiline.js");
  });
})(require('process'));
