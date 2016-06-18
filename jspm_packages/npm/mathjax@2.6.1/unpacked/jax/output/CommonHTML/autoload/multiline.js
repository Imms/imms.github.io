/* */ 
(function(process) {
  MathJax.Hub.Register.StartupHook("CommonHTML Jax Ready", function() {
    var VERSION = "2.6.0";
    var MML = MathJax.ElementJax.mml,
        CONFIG = MathJax.Hub.config,
        CHTML = MathJax.OutputJax.CommonHTML;
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
      CHTMLlinebreakPenalty: PENALTY,
      CHTMLmultiline: function(node) {
        var parent = this;
        while (parent.inferred || (parent.parent && parent.parent.type === "mrow" && parent.parent.data.length === 1)) {
          parent = parent.parent;
        }
        var isTop = ((parent.type === "math" && parent.Get("display") === "block") || parent.type === "mtd");
        parent.isMultiline = true;
        var VALUES = this.getValues("linebreak", "linebreakstyle", "lineleading", "linebreakmultchar", "indentalign", "indentshift", "indentalignfirst", "indentshiftfirst", "indentalignlast", "indentshiftlast");
        if (VALUES.linebreakstyle === MML.LINEBREAKSTYLE.INFIXLINEBREAKSTYLE)
          VALUES.linebreakstyle = this.Get("infixlinebreakstyle");
        VALUES.lineleading = this.CHTMLlength2em(VALUES.lineleading, 0.5);
        CHTML.BBOX.empty(this.CHTML);
        var stack = CHTML.addElement(node, "mjx-stack");
        var state = {
          BBOX: this.CHTML,
          n: 0,
          Y: 0,
          scale: (this.CHTML.scale || 1),
          isTop: isTop,
          values: {},
          VALUES: VALUES
        },
            align = this.CHTMLgetAlign(state, {}),
            shift = this.CHTMLgetShift(state, {}, align),
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
        while (this.CHTMLbetterBreak(end, state) && (end.scanW >= CHTML.linebreakWidth || end.penalty === PENALTY.newline)) {
          this.CHTMLaddLine(stack, start, end.index, state, end.values, broken);
          start = end.index.slice(0);
          broken = true;
          align = this.CHTMLgetAlign(state, end.values);
          shift = this.CHTMLgetShift(state, end.values, align);
          end.W = end.shift = end.scanW = shift;
          end.penalty = PENALTY.nobreak;
        }
        state.isLast = true;
        this.CHTMLaddLine(stack, start, [], state, ENDVALUES, broken);
        node.style.width = stack.style.width = this.CHTML.pwidth = "100%";
        this.CHTML.mwidth = CHTML.Em(this.CHTML.w);
        this.CHTML.isMultiline = parent.CHTML.isMultiline = true;
        stack.style.verticalAlign = CHTML.Em(state.d - this.CHTML.d);
        return node;
      },
      CHTMLbetterBreak: function(info, state) {
        if (this.isToken)
          return false;
        if (this.isEmbellished()) {
          info.embellished = this;
          return this.CoreMO().CHTMLbetterBreak(info, state);
        }
        if (this.linebreakContainer)
          return false;
        var index = info.index.slice(0),
            i = info.index.shift(),
            m = this.data.length,
            W,
            w,
            scanW,
            broken = (info.index.length > 0),
            better = false;
        if (i == null)
          i = -1;
        if (!broken) {
          i++;
          info.W += info.w;
          info.w = 0;
        }
        scanW = info.scanW = info.W;
        info.nest++;
        while (i < m && info.scanW < 1.33 * CHTML.linebreakWidth) {
          if (this.data[i]) {
            if (this.data[i].CHTMLbetterBreak(info, state)) {
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
            scanW = (broken ? info.scanW : this.CHTMLaddWidth(i, info, scanW));
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
      CHTMLaddWidth: function(i, info, scanW) {
        if (this.data[i]) {
          var bbox = this.data[i].CHTML;
          scanW += bbox.w + (bbox.L || 0) + (bbox.R || 0);
          info.W = info.scanW = scanW;
          info.w = 0;
        }
        return scanW;
      },
      CHTMLaddLine: function(stack, start, end, state, values, broken) {
        var block = CHTML.addElement(stack, "mjx-block", {}, [["mjx-box"]]),
            line = block.firstChild;
        var bbox = state.bbox = CHTML.BBOX.empty();
        state.first = broken;
        state.last = true;
        this.CHTMLmoveLine(start, end, line, state, values);
        bbox.clean();
        var align = this.CHTMLgetAlign(state, values),
            shift = this.CHTMLgetShift(state, values, align, true);
        var dY = 0;
        if (state.n > 0) {
          var LHD = CHTML.FONTDATA.baselineskip;
          var leading = (state.values.lineleading == null ? state.VALUES : state.values).lineleading * state.scale;
          var Y = state.Y;
          state.Y -= Math.max(LHD, state.d + bbox.h + leading);
          dY = Y - state.Y - state.d - bbox.h;
        }
        if (shift)
          line.style.margin = "0 " + CHTML.Em(-shift) + " 0 " + CHTML.Em(shift);
        if (align !== MML.INDENTALIGN.LEFT)
          block.style.textAlign = align;
        if (dY)
          block.style.paddingTop = CHTML.Em(dY);
        state.BBOX.combine(bbox, shift, state.Y);
        state.d = state.bbox.d;
        state.values = values;
        state.n++;
      },
      CHTMLgetAlign: function(state, values) {
        var cur = values,
            prev = state.values,
            def = state.VALUES,
            align;
        if (state.n === 0)
          align = cur.indentalignfirst || prev.indentalignfirst || def.indentalignfirst;
        else if (state.isLast)
          align = prev.indentalignlast || def.indentalignlast;
        else
          align = prev.indentalign || def.indentalign;
        if (align === MML.INDENTALIGN.INDENTALIGN)
          align = prev.indentalign || def.indentalign;
        if (align === MML.INDENTALIGN.AUTO)
          align = (state.isTop ? CONFIG.displayAlign : MML.INDENTALIGN.LEFT);
        return align;
      },
      CHTMLgetShift: function(state, values, align, noadjust) {
        var cur = values,
            prev = state.values,
            def = state.VALUES,
            shift;
        if (state.n === 0)
          shift = cur.indentshiftfirst || prev.indentshiftfirst || def.indentshiftfirst;
        else if (state.isLast)
          shift = prev.indentshiftlast || def.indentshiftlast;
        else
          shift = prev.indentshift || def.indentshift;
        if (shift === MML.INDENTSHIFT.INDENTSHIFT)
          shift = prev.indentshift || def.indentshift;
        if (shift === "auto" || shift === "")
          shift = "0";
        shift = this.CHTMLlength2em(shift, CHTML.cwidth);
        if (state.isTop && CONFIG.displayIndent !== "0") {
          var indent = this.CHTMLlength2em(CONFIG.displayIndent, CHTML.cwidth);
          shift += (align === MML.INDENTALIGN.RIGHT ? -indent : indent);
        }
        return (align === MML.INDENTALIGN.RIGHT && !noadjust ? -shift : shift);
      },
      CHTMLmoveLine: function(start, end, node, state, values) {
        var i = start[0],
            j = end[0];
        if (i == null)
          i = -1;
        if (j == null)
          j = this.data.length - 1;
        if (i === j && start.length > 1) {
          this.data[i].CHTMLmoveSlice(start.slice(1), end.slice(1), node, state, values, "marginLeft");
        } else {
          var last = state.last;
          state.last = false;
          while (i < j) {
            if (this.data[i]) {
              if (start.length <= 1)
                this.data[i].CHTMLmoveNode(node, state, values);
              else
                this.data[i].CHTMLmoveSlice(start.slice(1), [], node, state, values, "marginLeft");
            }
            i++;
            state.first = false;
            start = [];
          }
          state.last = last;
          if (this.data[i]) {
            if (end.length <= 1)
              this.data[i].CHTMLmoveNode(node, state, values);
            else
              this.data[i].CHTMLmoveSlice([], end.slice(1), node, state, values, "marginRight");
          }
        }
      },
      CHTMLmoveSlice: function(start, end, node, state, values, margin) {
        var slice = this.CHTMLcreateSliceNode(node);
        this.CHTMLmoveLine(start, end, slice, state, values);
        if (slice.style[margin])
          slice.style[margin] = "";
        if (this.CHTML.L) {
          if (margin !== "marginLeft")
            state.bbox.w += this.CHTML.L;
          else
            slice.className = slice.className.replace(/ MJXc-space\d/, "");
        }
        if (this.CHTML.R && margin !== "marginRight")
          state.bbox.w += this.CHTML.R;
        if (end.length === 0) {
          node = this.CHTMLnodeElement();
          node.parentNode.removeChild(node);
          node.nextMathJaxNode.id = node.id;
        }
        return slice;
      },
      CHTMLcreateSliceNode: function(node) {
        var NODE = this.CHTMLnodeElement(),
            n = 0;
        var LAST = NODE;
        while (LAST.nextMathJaxNode) {
          LAST = LAST.nextMathJaxNode;
          n++;
        }
        var SLICE = NODE.cloneNode(false);
        LAST.nextMathJaxNode = SLICE;
        SLICE.nextMathJaxNode = null;
        SLICE.id += "-MJX-Continue-" + n;
        return node.appendChild(SLICE);
      },
      CHTMLmoveNode: function(line, state, values) {
        if (!(state.first || state.last) || (state.first && state.values.linebreakstyle === MML.LINEBREAKSTYLE.BEFORE) || (state.last && values.linebreakstyle === MML.LINEBREAKSTYLE.AFTER)) {
          var node = this.CHTMLnodeElement();
          line.appendChild(node);
          if (state.last)
            node.style.marginRight = "";
          if (state.first || state.nextIsFirst) {
            node.style.marginLeft = "";
            this.CHTML.L = 0;
            node.className = node.className.replace(/ MJXc-space\d/, "");
          }
          if (state.first && this.CHTML.w === 0)
            state.nextIsFirst = true;
          else
            delete state.nextIsFirst;
          state.bbox.combine(this.CHTML, state.bbox.w, 0);
        }
      }
    });
    MML.mfenced.Augment({
      CHTMLbetterBreak: function(info, state) {
        var index = info.index.slice(0),
            i = info.index.shift(),
            m = this.data.length,
            W,
            w,
            scanW,
            broken = (info.index.length > 0),
            better = false;
        if (i == null)
          i = -1;
        if (!broken) {
          i++;
          info.W += info.w;
          info.w = 0;
        }
        scanW = info.scanW = info.W;
        info.nest++;
        if (!this.dataI) {
          this.dataI = [];
          if (this.data.open)
            this.dataI.push("open");
          if (m)
            this.dataI.push(0);
          for (var j = 1; j < m; j++) {
            if (this.data["sep" + j])
              this.dataI.push("sep" + j);
            this.dataI.push(j);
          }
          if (this.data.close)
            this.dataI.push("close");
        }
        m = this.dataI.length;
        while (i < m && info.scanW < 1.33 * CHTML.linebreakWidth) {
          var k = this.dataI[i];
          if (this.data[k]) {
            if (this.data[k].CHTMLbetterBreak(info, state)) {
              better = true;
              index = [i].concat(info.index);
              W = info.W;
              w = info.w;
              if (info.penalty === PENALTY.newline) {
                info.index = index;
                if (info.nest)
                  info.nest--;
                return true;
              }
            }
            scanW = (broken ? info.scanW : this.CHTMLaddWidth(i, info, scanW));
          }
          info.index = [];
          i++;
          broken = false;
        }
        if (info.nest)
          info.nest--;
        info.index = index;
        if (better) {
          info.W = W;
          info.w = w;
        }
        return better;
      },
      CHTMLmoveLine: function(start, end, node, state, values) {
        var i = start[0],
            j = end[0];
        if (i == null)
          i = -1;
        if (j == null)
          j = this.dataI.length - 1;
        if (i === j && start.length > 1) {
          this.data[this.dataI[i]].CHTMLmoveSlice(start.slice(1), end.slice(1), node, state, values, "marginLeft");
        } else {
          var last = state.last;
          state.last = false;
          var k = this.dataI[i];
          while (i < j) {
            if (this.data[k]) {
              if (start.length <= 1)
                this.data[k].CHTMLmoveNode(node, state, values);
              else
                this.data[k].CHTMLmoveSlice(start.slice(1), [], node, state, values, "marginLeft");
            }
            i++;
            k = this.dataI[i];
            state.first = false;
            start = [];
          }
          state.last = last;
          if (this.data[k]) {
            if (end.length <= 1)
              this.data[k].CHTMLmoveNode(node, state, values);
            else
              this.data[k].CHTMLmoveSlice([], end.slice(1), node, state, values, "marginRight");
          }
        }
      }
    });
    MML.msubsup.Augment({
      CHTMLbetterBreak: function(info, state) {
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
          this.CHTML.baseW = this.data[this.base].CHTML.w;
          this.CHTML.dw = this.CHTML.w - this.CHTML.baseW;
        }
        if (this.data[this.base].CHTMLbetterBreak(info, state)) {
          better = true;
          index = [this.base].concat(info.index);
          W = info.W;
          w = info.w;
          if (info.penalty === PENALTY.newline)
            better = broken = true;
        }
        if (!broken)
          this.CHTMLaddWidth(this.base, info, scanW);
        info.scanW += this.CHTML.dw;
        info.W = info.scanW;
        info.index = [];
        if (better) {
          info.W = W;
          info.w = w;
          info.index = index;
        }
        return better;
      },
      CHTMLmoveLine: function(start, end, node, state, values) {
        if (this.data[this.base]) {
          var base = CHTML.addElement(node, "mjx-base");
          if (start.length > 1) {
            this.data[this.base].CHTMLmoveSlice(start.slice(1), end.slice(1), base, state, values, "marginLeft");
          } else {
            if (end.length <= 1)
              this.data[this.base].CHTMLmoveNode(base, state, values);
            else
              this.data[this.base].CHTMLmoveSlice([], end.slice(1), base, state, values, "marginRight");
          }
        }
        if (end.length === 0) {
          var NODE = this.CHTMLnodeElement(),
              stack = CHTML.getNode(NODE, "mjx-stack"),
              sup = CHTML.getNode(NODE, "mjx-sup"),
              sub = CHTML.getNode(NODE, "mjx-sub");
          if (stack)
            node.appendChild(stack);
          else if (sup)
            node.appendChild(sup);
          else if (sub)
            node.appendChild(sub);
          var w = state.bbox.w,
              bbox;
          if (sup) {
            bbox = this.data[this.sup].CHTML;
            state.bbox.combine(bbox, w, bbox.Y);
          }
          if (sub) {
            bbox = this.data[this.sub].CHTML;
            state.bbox.combine(bbox, w, bbox.Y);
          }
        }
      }
    });
    MML.mmultiscripts.Augment({
      CHTMLbetterBreak: function(info, state) {
        if (!this.data[this.base])
          return false;
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
        var bbox = this.CHTML,
            base = this.data[this.base].CHTML;
        var dw = bbox.w - base.w - bbox.X;
        info.scanW += bbox.X;
        scanW = info.scanW;
        if (this.data[this.base].CHTMLbetterBreak(info, state)) {
          better = true;
          index = [this.base].concat(info.index);
          W = info.W;
          w = info.w;
          if (info.penalty === PENALTY.newline)
            better = broken = true;
        }
        if (!broken)
          this.CHTMLaddWidth(this.base, info, scanW);
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
      CHTMLmoveLine: function(start, end, node, state, values) {
        var NODE = this.CHTMLnodeElement(),
            BOX = this.CHTMLbbox,
            w;
        if (start.length < 1) {
          NODE = this.CHTMLnodeElement();
          var prestack = CHTML.getNode(NODE, "mjx-prestack"),
              presup = CHTML.getNode(NODE, "mjx-presup"),
              presub = CHTML.getNode(NODE, "mjx-presub");
          if (prestack)
            node.appendChild(prestack);
          else if (presup)
            node.appendChild(presup);
          else if (presub)
            node.appendChild(presub);
          w = state.bbox.w;
          if (presup)
            state.bbox.combine(BOX.presup, w + BOX.presup.X, BOX.presup.Y);
          if (presub)
            state.bbox.combine(BOX.presub, w + BOX.presub.X, BOX.presub.Y);
        }
        if (this.data[this.base]) {
          var base = CHTML.addElement(node, "mjx-base");
          if (start.length > 1) {
            this.data[this.base].CHTMLmoveSlice(start.slice(1), end.slice(1), base, state, values, "marginLeft");
          } else {
            if (end.length <= 1)
              this.data[this.base].CHTMLmoveNode(base, state, values);
            else
              this.data[this.base].CHTMLmoveSlice([], end.slice(1), base, state, values, "marginRight");
          }
        }
        if (end.length === 0) {
          NODE = this.CHTMLnodeElement();
          var stack = CHTML.getNode(NODE, "mjx-stack"),
              sup = CHTML.getNode(NODE, "mjx-sup"),
              sub = CHTML.getNode(NODE, "mjx-sub");
          if (stack)
            node.appendChild(stack);
          else if (sup)
            node.appendChild(sup);
          else if (sub)
            node.appendChild(sub);
          w = state.bbox.w;
          if (sup)
            state.bbox.combine(BOX.sup, w, BOX.sup.Y);
          if (sub)
            state.bbox.combine(BOX.sub, w, BOX.sub.Y);
        }
      }
    });
    MML.mo.Augment({CHTMLbetterBreak: function(info, state) {
        if (info.values && info.values.id === this.CHTMLnodeID)
          return false;
        var values = this.getValues("linebreak", "linebreakstyle", "lineleading", "linebreakmultchar", "indentalign", "indentshift", "indentalignfirst", "indentshiftfirst", "indentalignlast", "indentshiftlast", "texClass", "fence");
        if (values.linebreakstyle === MML.LINEBREAKSTYLE.INFIXLINEBREAKSTYLE)
          values.linebreakstyle = this.Get("infixlinebreakstyle");
        if (values.texClass === MML.TEXCLASS.OPEN)
          info.nest++;
        if (values.texClass === MML.TEXCLASS.CLOSE && info.nest)
          info.nest--;
        var W = info.scanW;
        delete info.embellished;
        var w = this.CHTML.w + (this.CHTML.L || 0) + (this.CHTML.R || 0);
        if (values.linebreakstyle === MML.LINEBREAKSTYLE.AFTER) {
          W += w;
          w = 0;
        }
        if (W - info.shift === 0 && values.linebreak !== MML.LINEBREAK.NEWLINE)
          return false;
        var offset = CHTML.linebreakWidth - W;
        if (state.n === 0 && (values.indentshiftfirst !== state.VALUES.indentshiftfirst || values.indentalignfirst !== state.VALUES.indentalignfirst)) {
          var align = this.CHTMLgetAlign(state, values),
              shift = this.CHTMLgetShift(state, values, align);
          offset += (info.shift - shift);
        }
        var penalty = Math.floor(offset / CHTML.linebreakWidth * 1000);
        if (penalty < 0)
          penalty = PENALTY.toobig - 3 * penalty;
        if (values.fence)
          penalty += PENALTY.fence;
        if ((values.linebreakstyle === MML.LINEBREAKSTYLE.AFTER && values.texClass === MML.TEXCLASS.OPEN) || values.texClass === MML.TEXCLASS.CLOSE)
          penalty += PENALTY.close;
        penalty += info.nest * PENALTY.nestfactor;
        var linebreak = PENALTY[values.linebreak || MML.LINEBREAK.AUTO];
        if (!(linebreak instanceof Array)) {
          if (offset >= 0) {
            penalty = linebreak * info.nest;
          }
        } else {
          penalty = Math.max(1, penalty + linebreak[0] * info.nest);
        }
        if (penalty >= info.penalty)
          return false;
        info.penalty = penalty;
        info.values = values;
        info.W = W;
        info.w = w;
        values.lineleading = this.CHTMLlength2em(values.lineleading, state.VALUES.lineleading);
        values.id = this.CHTMLnodeID;
        return true;
      }});
    MML.mspace.Augment({CHTMLbetterBreak: function(info, state) {
        if (info.values && info.values.id === this.CHTMLnodeID)
          return false;
        var values = this.getValues("linebreak");
        var linebreakValue = values.linebreak;
        if (!linebreakValue || this.hasDimAttr()) {
          linebreakValue = MML.LINEBREAK.AUTO;
        }
        var W = info.scanW,
            w = this.CHTML.w + (this.CHTML.L || 0) + (this.CHTML.R || 0);
        if (W - info.shift === 0)
          return false;
        var offset = CHTML.linebreakWidth - W;
        var penalty = Math.floor(offset / CHTML.linebreakWidth * 1000);
        if (penalty < 0)
          penalty = PENALTY.toobig - 3 * penalty;
        penalty += info.nest * PENALTY.nestfactor;
        var linebreak = PENALTY[linebreakValue];
        if (linebreakValue === MML.LINEBREAK.AUTO && w >= PENALTY.spacelimit && !this.mathbackground && !this.background)
          linebreak = [(w + PENALTY.spaceoffset) * PENALTY.spacefactor];
        if (!(linebreak instanceof Array)) {
          if (offset >= 0) {
            penalty = linebreak * info.nest;
          }
        } else {
          penalty = Math.max(1, penalty + linebreak[0] * info.nest);
        }
        if (penalty >= info.penalty)
          return false;
        info.penalty = penalty;
        info.values = values;
        info.W = W;
        info.w = w;
        values.lineleading = state.VALUES.lineleading;
        values.linebreakstyle = "before";
        values.id = this.CHTMLnodeID;
        return true;
      }});
    MathJax.Hub.Register.StartupHook("TeX mathchoice Ready", function() {
      MML.TeXmathchoice.Augment({
        CHTMLbetterBreak: function(info, state) {
          return this.Core().CHTMLbetterBreak(info, state);
        },
        CHTMLmoveLine: function(start, end, node, state, values) {
          return this.Core().CHTMLmoveSlice(start, end, node, state, values);
        }
      });
    });
    MML.maction.Augment({
      CHTMLbetterBreak: function(info, state) {
        return this.Core().CHTMLbetterBreak(info, state);
      },
      CHTMLmoveLine: function(start, end, node, state, values) {
        return this.Core().CHTMLmoveSlice(start, end, node, state, values);
      }
    });
    MML.semantics.Augment({
      CHTMLbetterBreak: function(info, state) {
        return (this.data[0] ? this.data[0].CHTMLbetterBreak(info, state) : false);
      },
      CHTMLmoveLine: function(start, end, node, state, values) {
        return (this.data[0] ? this.data[0].CHTMLmoveSlice(start, end, node, state, values) : null);
      }
    });
    MathJax.Hub.Startup.signal.Post("CommonHTML multiline Ready");
    MathJax.Ajax.loadComplete(CHTML.autoloadDir + "/multiline.js");
  });
})(require('process'));
