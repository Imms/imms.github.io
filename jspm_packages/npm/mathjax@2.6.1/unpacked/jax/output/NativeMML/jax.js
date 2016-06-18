/* */ 
(function(process) {
  (function(nMML, HUB, AJAX, HTML) {
    var MML,
        isMSIE = HUB.Browser.isMSIE;
    var EVENT,
        TOUCH,
        HOVER,
        ZOOM;
    HUB.Register.StartupHook("MathZoom Ready", function() {
      ZOOM = MathJax.Extension.MathZoom;
    });
    var NOPADDING = function(side, obj) {
      var span = HTML.Element("span");
      side = "padding" + side;
      if (obj) {
        span.style.cssText = (obj.getAttribute("style") || "");
        if (span.style.padding === "" && (span.style[side] || "") === "") {
          span.style[side] = "0px";
          obj.setAttribute("style", span.style.cssText);
        }
      }
    };
    var CELLSPACING = function(obj, rowSpacing, columnSpacing) {
      if (obj) {
        var span = HTML.Element("span");
        span.style.cssText = (obj.getAttribute("style") || "");
        if (span.style.padding === "") {
          var padding = {
            paddingLeft: columnSpacing,
            paddingTop: rowSpacing,
            paddingRight: "0px",
            paddingBottom: "0px"
          };
          for (var side in padding) {
            if (padding.hasOwnProperty(side)) {
              if ((span.style[side] || "") === "") {
                span.style[side] = padding[side];
              }
            }
          }
        }
        obj.setAttribute("style", span.style.cssText);
      }
    };
    nMML.Augment({
      config: {styles: {
          ".MathJax_MathML": {
            "font-style": "normal",
            "font-weight": "normal",
            "line-height": "normal",
            "font-size": "100%",
            "font-size-adjust": "none",
            "text-indent": 0,
            "text-align": "left",
            "text-transform": "none",
            "letter-spacing": "normal",
            "word-spacing": "normal",
            "word-wrap": "normal",
            "white-space": "nowrap",
            "float": "none",
            "direction": "ltr",
            "max-width": "none",
            "max-height": "none",
            "min-width": 0,
            "min-height": 0,
            border: 0,
            padding: 0,
            margin: 0
          },
          "span.MathJax_MathML": {display: "inline!important"},
          "div.MathJax_MathML": {display: "block!important"},
          ".MathJax_mmlExBox": {
            display: "block!important",
            overflow: "hidden",
            height: "1px",
            width: "60ex",
            "min-height": 0,
            "max-height": "none",
            padding: 0,
            border: 0,
            margin: 0
          }
        }},
      handlesVariants: false,
      settings: HUB.config.menuSettings,
      ex: 1,
      scale: 1,
      adjustWidths: [],
      Config: function() {
        this.SUPER(arguments).Config.call(this);
        if (this.settings.scale) {
          this.config.scale = this.settings.scale;
        }
        if (HUB.config.displayAlign !== "center") {
          var align = HUB.config.displayAlign,
              indent = HUB.config.displayIndent;
          var def = {"text-align": align + "!important"};
          def["margin-" + align] = indent + "!important";
          HUB.Insert(this.config.styles, {
            "div.MathJax_MathML": def,
            "div.MathJax_MathML math": {"text-align": align},
            "div.MathJax_MathContainer > span": {"text-align": align + "!important"}
          });
        }
        if (!this.require) {
          this.require = [];
        }
        this.require.push(MathJax.OutputJax.extensionDir + "/MathEvents.js");
      },
      Startup: function() {
        EVENT = MathJax.Extension.MathEvents.Event;
        TOUCH = MathJax.Extension.MathEvents.Touch;
        HOVER = MathJax.Extension.MathEvents.Hover;
        this.ContextMenu = EVENT.ContextMenu;
        this.Mousedown = EVENT.AltContextMenu;
        this.Mouseover = HOVER.Mouseover;
        this.Mouseout = HOVER.Mouseout;
        this.Mousemove = HOVER.Mousemove;
        if (!HUB.Browser.hasMathPlayer) {
          this.EmExSpan = HTML.Element("span", {style: {
              position: "absolute",
              "font-size-adjust": "none"
            }}, [["div", {className: "MathJax_mmlExBox"}], ["span", {className: "MathJax_MathML"}]]);
          MML.math(MML.mspace().With({width: "60ex"})).toNativeMML(this.EmExSpan.lastChild);
        }
        return AJAX.Styles(this.config.styles);
      },
      InitializeMML: function() {
        this.initialized = true;
        if (HUB.Browser.hasMathPlayer) {
          try {
            if (!HUB.Browser.mpNamespace) {
              var mathplayer = document.createElement("object");
              mathplayer.id = "mathplayer";
              mathplayer.classid = "clsid:32F66A20-7614-11D4-BD11-00104BD3F987";
              document.getElementsByTagName("head")[0].appendChild(mathplayer);
              document.namespaces.add("m", "http://www.w3.org/1998/Math/MathML");
              HUB.Browser.mpNamespace = true;
            }
            if (!HUB.Browser.mpImported) {
              document.namespaces.m.doImport("#mathplayer");
              HUB.Browser.mpImported = true;
            }
          } catch (err) {
            if (!this.config.noMathPlayerWarning) {
              alert(MathJax.Localization._(["MathML", "MathPlayer"], "MathJax was not able to set up MathPlayer.\n\n" + "If MathPlayer is not installed, you need to install it first.\n" + "Otherwise, your security settings may be preventing ActiveX     \n" + "controls from running.  Use the Internet Options item under\n" + "the Tools menu and select the Security tab, then press the\n" + "Custom Level button. Check that the settings for\n" + "'Run ActiveX Controls', and 'Binary and script behaviors'\n" + "are enabled.\n\n" + "Currently you will see error messages rather than\n" + "typeset mathematics."));
            }
          }
        } else {
          document.body.appendChild(this.EmExSpan);
          this.defaultEx = this.EmExSpan.firstChild.offsetWidth / 60;
          this.defaultMEx = this.EmExSpan.lastChild.offsetWidth / 60;
          document.body.removeChild(this.EmExSpan);
        }
      },
      preTranslate: function(state) {
        var scripts = state.jax[this.id],
            i,
            m = scripts.length,
            script,
            prev,
            span,
            test,
            math,
            jax,
            ex,
            mex,
            scale;
        for (i = 0; i < m; i++) {
          script = scripts[i];
          if (!script.parentNode)
            continue;
          if (!this.initialized) {
            this.InitializeMML();
          }
          prev = script.previousSibling;
          if (prev && prev.className === "MathJax_MathML") {
            prev.parentNode.removeChild(prev);
          }
          jax = script.MathJax.elementJax;
          if (!jax)
            continue;
          math = jax.root;
          jax.NativeMML = {};
          var type = (math.Get("display") === "block" ? "div" : "span");
          span = HTML.Element(type, {
            className: "MathJax_MathML",
            id: jax.inputID + "-Frame"
          }, [["span", {
            className: "MathJax_MathContainer",
            isMathJax: true,
            jaxID: this.id,
            style: {
              position: "relative",
              display: "inline-block",
              "white-space": "nowrap"
            }
          }, [["span", {
            isMathJax: true,
            style: {display: "inline-block"}
          }]]]]);
          script.parentNode.insertBefore(span, script);
          if (!isMSIE) {
            script.parentNode.insertBefore(this.EmExSpan.cloneNode(true), script);
          }
        }
        for (i = 0; i < m; i++) {
          script = scripts[i];
          if (!script.parentNode)
            continue;
          jax = script.MathJax.elementJax;
          if (!jax)
            continue;
          if (!isMSIE) {
            test = script.previousSibling;
            ex = test.firstChild.offsetWidth / 60;
            mex = test.lastChild.offsetWidth / 60;
            if (ex === 0 || ex === "NaN") {
              ex = this.defaultEx;
              mex = this.defaultMEx;
            }
            scale = (this.config.matchFontHeight && mex > 1 ? ex / mex : 1);
            scale = Math.floor(Math.max(this.config.minScaleAdjust / 100, scale) * this.config.scale);
            jax.NativeMML.ex = ex;
            jax.NativeMML.mex = mex;
          } else {
            scale = 100;
          }
          jax.NativeMML.fontSize = scale + "%";
          jax.NativeMML.scale = scale / 100;
        }
        if (!isMSIE) {
          for (i = 0; i < m; i++) {
            script = scripts[i];
            if (script.parentNode && script.MathJax.elementJax) {
              script.parentNode.removeChild(script.previousSibling);
            }
          }
        }
      },
      Translate: function(script) {
        if (!script.parentNode)
          return;
        var jax = script.MathJax.elementJax,
            math = jax.root;
        var span = document.getElementById(jax.inputID + "-Frame");
        if (!span)
          return;
        var container = span.firstChild,
            mspan = container.firstChild;
        this.ex = jax.NativeMML.ex || this.defaultEx;
        this.scale = jax.NativeMML.scale || 1;
        if (this.scale !== 1) {
          span.style.fontSize = jax.NativeMML.fontSize;
        }
        try {
          math.toNativeMML(mspan, jax);
        } catch (err) {
          if (err.restart) {
            while (mspan.firstChild) {
              mspan.removeChild(mspan.firstChild);
            }
          }
          throw err;
        }
        if (isMSIE) {
          if (container.addEventListener) {
            for (var id in this.MSIE9events) {
              if (this.MSIE9events.hasOwnProperty(id)) {
                container.addEventListener(id, this.MSIE9event, true);
              }
            }
          } else {
            var config = (this.config.showMathMenuMSIE != null ? this : HUB).config;
            if (config.showMathMenuMSIE && !this.settings.mpContext && !this.settings.mpMouse) {
              this.MSIEoverlay(container);
            } else {
              container.style.position = "";
              mspan.firstChild.onmousedown = this.MSIEaltMenu;
            }
          }
        } else {
          container.oncontextmenu = EVENT.Menu;
          container.onmouseover = EVENT.Mouseover;
          container.onmouseout = EVENT.Mouseout;
          container.onmousedown = EVENT.Mousedown;
          container.onclick = EVENT.Click;
          container.ondblclick = EVENT.DblClick;
          container.onkeydown = EVENT.Keydown;
          container.tabIndex = HUB.getTabOrder(jax);
          if (HUB.Browser.noContextMenu) {
            container.ontouchstart = TOUCH.start;
            container.ontouchend = TOUCH.end;
          }
        }
      },
      postTranslate: function(state) {
        if (this.forceReflow) {
          var sheet = (document.styleSheets || [])[0] || {};
          sheet.disabled = true;
          sheet.disabled = false;
        }
      },
      Remove: function(jax) {
        var span = jax.SourceElement();
        if (!span)
          return;
        span = span.previousSibling;
        if (!span)
          return;
        if (span.className.match(/MathJax_MathML/)) {
          span.parentNode.removeChild(span);
        }
      },
      MMLnamespace: "http://www.w3.org/1998/Math/MathML",
      isFullWidth: function(node) {
        if (!node)
          return;
        var width = node.getAttribute("width") || (String(node.getAttribute("style")).match(/(?:^| )width: *([^; ]*)/) || [])[1];
        if (width)
          return !!width.match(/%/);
        if (node.nodeName.match(/^(semantics|math|mstyle)$/)) {
          width = this.isFullWidth(node.firstChild);
        } else if (node.nodeName.toLowerCase() === "mrow") {
          for (var i = 0,
              m = node.childNodes.length; i < m && !width; i++)
            width = this.isFullWidth(node.childNodes[i]);
        }
        if (width) {
          var style = "width:100%; " + (node.getAttribute("style") || "");
          node.setAttribute("style", style.replace(/ +$/, ""));
        }
        return width;
      },
      MSIEoverlay: function(span) {
        var math = span.firstChild;
        if (math.nodeName.toLowerCase() === "span") {
          math = math.firstChild;
        }
        var bbox = this.getHoverBBox(null, math, {});
        HTML.addElement(span, "span", {style: {
            display: "inline-block",
            width: 0,
            height: 0,
            position: "relative"
          }}, [["span", {
          isMathJax: true,
          className: "MathJax_MathPlayer_Overlay",
          style: {
            display: "inline-block",
            position: "absolute",
            left: HOVER.Px(-bbox.w),
            top: HOVER.Px(-bbox.h - (bbox.y || 0) - 1),
            width: HOVER.Px(bbox.w),
            height: HOVER.Px(bbox.h + bbox.d),
            cursor: "pointer",
            "background-color": "white",
            filter: "alpha(opacity=0)"
          }
        }]]);
        HUB.Insert(span, {
          msieMath: math,
          onmousedown: this.MSIEevent,
          oncontextmenu: this.MSIEevent,
          onclick: this.MSIEevent,
          onmouseup: this.MSIEevent,
          onmousemove: this.MSIEevent,
          ondblclick: this.MSIEevent,
          onmouseover: this.MSIEevent,
          onmouseout: this.MSIEevent
        });
      },
      MSIEevents: {
        mousedown: "Mousedown",
        contextmenu: "ContextMenu",
        click: "Click",
        mouseup: "Mouseup",
        mousemove: "Mousemove",
        dblclick: "DblClick",
        mouseover: "Mouseover",
        mouseout: "Mouseout"
      },
      MSIEevent: function() {
        var event = window.event;
        var type = nMML.MSIEevents[event.type];
        if (nMML[type] && nMML[type](event, this) === false) {
          return false;
        }
        if (ZOOM && ZOOM.HandleEvent(event, type, this) === false) {
          return false;
        }
        if (event.srcElement.className === "MathJax_MathPlayer_Overlay" && this.msieMath.fireEvent) {
          if (type === "ContextMenu" || type === "Mouseover" || type === "Mouseout") {
            this.msieMath.fireEvent("on" + event.type, event);
          }
        }
        return EVENT.False(event);
      },
      MSIEaltMenu: function() {
        var container = this.parentNode.parentNode;
        while (!container.jaxID) {
          container = container.parentNode;
        }
        EVENT.AltContextMenu(window.event, container);
      },
      MSIE9events: {
        contextmenu: "Menu",
        click: "Click",
        dblclick: "DblClick",
        mouseup: "False",
        mouseover: "Mouseover",
        mouseout: "Mouseout"
      },
      MSIE9event: function(event) {
        if (event.type === "contextmenu" && nMML.settings.mpContext) {
          return true;
        }
        if (event.type === "mouseup" && nMML.settings.mpMouse) {
          return true;
        }
        if (event.type === "click" && nMML.settings.mpContext) {
          return EVENT.AltContextMenu(event, this);
        }
        var type = nMML.MSIE9events[event.type];
        return EVENT[type].call(this, event);
      },
      getJaxFromMath: function(math) {
        math = math.parentNode;
        do {
          math = math.nextSibling;
        } while (math && math.nodeName.toLowerCase() !== "script");
        return HUB.getJaxFor(math);
      },
      getHoverSpan: function(jax, math) {
        return math.firstChild;
      },
      getHoverBBox: function(jax, span, math) {
        return EVENT.getBBox(span.parentNode);
      },
      Zoom: function(jax, span, math, Mw, Mh) {
        jax.root.toNativeMML(span);
        if (this.msieIE8HeightBug) {
          span.style.position = "absolute";
        }
        if (nMML.widthBug) {
          span.style.width = span.parentNode.style.width = "";
        }
        if (span.parentNode.style.width.match(/%$/)) {
          span.parentNode.style.minWidth = Math.ceil(3 * Mh / 4) + "px";
        }
        var mW = math.offsetWidth || math.scrollWidth,
            mH = math.offsetHeight || math.scrollHeight;
        var zW = span.offsetWidth,
            zH = span.offsetHeight;
        if (nMML.widthBug || span.style.width.match(/%/)) {
          var W = span.firstChild.firstChild.scrollWidth;
          if (W > zW) {
            zW = W;
            span.parentNode.style.width = span.style.minWidth = zW + "px";
          }
        }
        if (this.msieIE8HeightBug) {
          span.style.position = "";
        }
        return {
          Y: -EVENT.getBBox(span.parentNode).h,
          mW: mW,
          mH: mH,
          zW: zW,
          zH: zH
        };
      },
      NAMEDSPACE: {
        negativeveryverythinmathspace: "-.0556em",
        negativeverythinmathspace: "-.1111em",
        negativethinmathspace: "-.1667em",
        negativemediummathspace: "-.2222em",
        negativethickmathspace: "-.2778em",
        negativeverythickmathspace: "-.3333em",
        negativeveryverythickmathspace: "-.3889em",
        veryverythinmathspace: ".0556em",
        verythinmathspace: ".1111em",
        thinmathspace: ".1667em",
        mediummathspace: ".2222em",
        thickmathspace: ".2778em",
        verythickmathspace: ".3333em",
        veryverythickmathspace: ".3889em"
      }
    });
    HUB.Register.StartupHook("mml Jax Ready", function() {
      MML = MathJax.ElementJax.mml;
      MML.mbase.Augment({
        toNativeMML: function(parent) {
          var tag = this.NativeMMLelement(this.type);
          this.NativeMMLattributes(tag);
          for (var i = 0,
              m = this.data.length; i < m; i++) {
            if (this.data[i]) {
              this.data[i].toNativeMML(tag);
            } else {
              tag.appendChild(this.NativeMMLelement("mrow"));
            }
          }
          parent.appendChild(tag);
        },
        NativeMMLattributes: function(tag) {
          var defaults = (this.type === "mstyle" ? MML.math.prototype.defaults : this.defaults);
          var names = (this.attrNames || MML.copyAttributeNames),
              skip = MML.skipAttributes,
              copy = MML.copyAttributes;
          if (!this.attrNames) {
            for (var id in defaults) {
              if (!skip[id] && !copy[id] && defaults.hasOwnProperty(id)) {
                if (this[id] != null && this[id] !== defaults[id])
                  tag.setAttribute(id, this.NativeMMLattribute(this[id]));
              }
            }
          }
          for (var i = 0,
              m = names.length; i < m; i++) {
            if (copy[names[i]] === 1 && !defaults.hasOwnProperty(names[i]))
              continue;
            var value = (this.attr || {})[names[i]];
            if (value == null) {
              value = this[names[i]];
            }
            if (value != null) {
              tag.setAttribute(names[i], this.NativeMMLattribute(value));
            }
          }
          this.NativeMMLclass(tag);
        },
        NativeMMLclass: function(tag) {
          var CLASS = [];
          if (this["class"]) {
            CLASS.push(this["class"]);
          }
          if (this.isa(MML.TeXAtom)) {
            var TEXCLASS = ["ORD", "OP", "BIN", "REL", "OPEN", "CLOSE", "PUNCT", "INNER", "VCENTER"][this.texClass];
            if (TEXCLASS) {
              CLASS.push("MJX-TeXAtom-" + TEXCLASS);
              if (TEXCLASS === "OP" && !this.movablelimits)
                CLASS.push("MJX-fixedlimits");
            }
          }
          if (this.mathvariant && this.NativeMMLvariants[this.mathvariant]) {
            CLASS.push("MJX" + this.mathvariant);
          }
          if (this.variantForm) {
            CLASS.push("MJX-variant");
          }
          if (CLASS.length) {
            tag.setAttribute("class", CLASS.join(" "));
          }
        },
        NativeMMLattribute: function(value) {
          value = String(value);
          if (nMML.NAMEDSPACE[value]) {
            value = nMML.NAMEDSPACE[value];
          } else if (value.match(/^\s*(([-+])?(\d+(\.\d*)?|\.\d+))\s*mu\s*$/)) {
            value = (RegExp.$2 || "") + ((1 / 18) * RegExp.$3).toFixed(3).replace(/\.?0+$/, "") + "em";
          } else if (this.NativeMMLvariants[value]) {
            value = this.NativeMMLvariants[value];
          }
          return value;
        },
        NativeMMLvariants: {
          "-tex-caligraphic": MML.VARIANT.SCRIPT,
          "-tex-caligraphic-bold": MML.VARIANT.BOLDSCRIPT,
          "-tex-oldstyle": MML.VARIANT.NORMAL,
          "-tex-oldstyle-bold": MML.VARIANT.BOLD,
          "-tex-mathit": MML.VARIANT.ITALIC
        },
        NativeMMLelement: function(type) {
          var math = (HUB.Browser.mpNamespace ? document.createElement("m:" + type) : (document.createElementNS ? document.createElementNS(nMML.MMLnamespace, type) : document.createElement(type)));
          math.isMathJax = true;
          return math;
        }
      });
      MML.mrow.Augment({toNativeMML: function(parent) {
          var i,
              m;
          if (this.inferred && this.parent.inferRow) {
            for (i = 0, m = this.data.length; i < m; i++) {
              if (this.data[i]) {
                this.data[i].toNativeMML(parent);
              } else {
                parent.appendChild(this.NativeMMLelement("mrow"));
              }
            }
          } else if (nMML.stretchyMoBug && (this.open || this.close)) {
            var mfenced = this.NativeMMLelement("mfenced");
            this.NativeMMLattributes(mfenced);
            i = 0, m = this.data.length;
            if (this.open) {
              mfenced.setAttribute("open", this.open);
              i++;
            }
            if (this.close) {
              mfenced.setAttribute("close", this.close);
              m--;
            }
            var tag = mfenced;
            if (m - i + 1 > 1) {
              tag = this.NativeMMLelement("mrow");
              parent.appendChild(mfenced);
              parent = mfenced;
            }
            for (; i < m; i++) {
              if (this.data[i]) {
                this.data[i].toNativeMML(tag);
              } else {
                tag.appendChild(this.NativeMMLelement("mrow"));
              }
            }
            parent.appendChild(tag);
          } else {
            this.SUPER(arguments).toNativeMML.call(this, parent);
          }
        }});
      MML.msubsup.Augment({toNativeMML: function(parent) {
          var type = this.type;
          if (this.data[this.sup] == null) {
            type = "msub";
          }
          if (this.data[this.sub] == null) {
            type = "msup";
          }
          var tag = this.NativeMMLelement(type);
          this.NativeMMLattributes(tag);
          if (this.data[0]) {
            delete this.data[0].inferred;
          }
          for (var i = 0,
              m = this.data.length; i < m; i++) {
            if (this.data[i]) {
              this.data[i].toNativeMML(tag);
            }
          }
          parent.appendChild(tag);
        }});
      MML.munderover.Augment({toNativeMML: function(parent) {
          var type = this.type;
          var base = this.data[this.base];
          if (base && base.isa(MML.TeXAtom) && base.movablelimits && !base.Get("displaystyle")) {
            type = "msubsup";
            if (this.data[this.under] == null) {
              type = "msup";
            }
            if (this.data[this.over] == null) {
              type = "msub";
            }
          } else {
            if (this.data[this.under] == null) {
              type = "mover";
            }
            if (this.data[this.over] == null) {
              type = "munder";
            }
          }
          var tag = this.NativeMMLelement(type);
          this.NativeMMLattributes(tag);
          if (this.data[0]) {
            delete this.data[0].inferred;
          }
          for (var i = 0,
              m = this.data.length; i < m; i++) {
            if (this.data[i]) {
              this.data[i].toNativeMML(tag);
            }
          }
          parent.appendChild(tag);
        }});
      if (!isMSIE) {
        var SPLIT = HUB.SplitList;
        MML.mtable.Augment({toNativeMML: function(parent) {
            var i,
                m;
            if (nMML.tableSpacingBug) {
              var values = this.getValues("rowspacing", "columnspacing");
              this.nMMLtopPadding = SPLIT("0px " + values.rowspacing);
              this.nMMLleftPadding = SPLIT("0px " + values.columnspacing);
              var tp = this.nMMLtopPadding,
                  M = tp.length;
              for (i = 0, m = this.data.length; i < m; i++) {
                if (this.data[i]) {
                  this.data[i].nMMLtopPadding = tp[i < M ? i : M - 1];
                }
              }
            }
            if (nMML.tableLabelBug) {
              for (i = 0, m = this.data.length; i < m; i++) {
                if (this.data[i] && this.data[i].isa(MML.mlabeledtr)) {
                  var align = HUB.config.displayAlign.charAt(0),
                      side = this.Get("side").charAt(0);
                  this.nMMLhasLabels = true;
                  this.nMMLlaMatch = (align === side);
                  this.nMMLforceWidth = (align === "c" || !!((this.width || "").match("%")));
                  break;
                }
              }
            }
            if (this.width && this.ffTableWidthBug) {
              var styles = (this.style || "").replace(/;\s*$/, "").split(";");
              if (styles[0] === "") {
                styles.shift();
              }
              styles.push("width:" + this.width);
              this.style = styles.join(";");
            }
            this.SUPER(arguments).toNativeMML.call(this, parent);
            if (this.nMMLhasLabels) {
              var mtable = parent.firstChild;
              if (this.nMMLforceWidth || side !== "r") {
                var n = (align !== "l" ? 1 : 0) + (side === "l" ? 1 : 0);
                if (n) {
                  var attr = {
                    columnalign: "left",
                    columnwidth: "auto",
                    columnspacing: "0px",
                    columnlines: "none"
                  };
                  for (var id in attr) {
                    if (attr.hasOwnProperty(id) && this[id]) {
                      var cols = [attr[id], attr[id]].slice(2 - n).join(" ") + " ";
                      mtable.setAttribute(id, cols + mtable.getAttribute(id));
                    }
                  }
                }
              }
              if (this.nMMLforceWidth || !this.nMMLlaMatch) {
                mtable.setAttribute("width", "100%");
              }
            }
          }});
        MML.mtr.Augment({toNativeMML: function(parent) {
            this.SUPER(arguments).toNativeMML.call(this, parent);
            var mtr = parent.lastChild;
            if (nMML.tableSpacingBug) {
              var lp = this.parent.nMMLleftPadding,
                  M = lp.length;
              for (var mtd = mtr.firstChild,
                  i = 0; mtd; mtd = mtd.nextSibling, i++) {
                CELLSPACING(mtd, this.nMMLtopPadding, lp[i < M ? i : M - 1]);
              }
            }
            if (nMML.tableLabelBug) {
              var forceWidth = this.parent.nMMLforceWidth,
                  side = this.parent.Get("side").charAt(0),
                  align = HUB.config.displayAlign.charAt(0);
              if (this.parent.nMMLhasLabels && mtr.firstChild) {
                if (forceWidth || side !== "r") {
                  NOPADDING("Left", mtr.firstChild);
                  if (align !== "l") {
                    mtr.insertBefore(this.NativeMMLelement("mtd"), mtr.firstChild).setAttribute("style", "padding:0");
                  }
                  if (side === "l") {
                    mtr.insertBefore(this.NativeMMLelement("mtd"), mtr.firstChild).setAttribute("style", "padding:0");
                  }
                }
                if (forceWidth || side !== "l") {
                  NOPADDING("Right", mtr.lastChild);
                }
              }
            }
          }});
        MML.mlabeledtr.Augment({toNativeMML: function(parent) {
            var mtr = this.NativeMMLelement("mtr");
            this.NativeMMLattributes(mtr);
            for (var i = 1,
                m = this.data.length; i < m; i++) {
              if (this.data[i]) {
                this.data[i].toNativeMML(mtr);
              } else {
                mtr.appendChild(this.NativeMMLelement("mtd"));
              }
            }
            if (nMML.tableSpacingBug) {
              var lp = this.parent.nMMLleftPadding,
                  M = lp.length;
              i = 0;
              for (var mtd = mtr.firstChild; mtd; mtd = mtd.nextSibling, i++) {
                CELLSPACING(mtd, this.nMMLtopPadding, lp[i < M ? i : M - 1]);
              }
            }
            if (nMML.tableLabelBug && this.data[0]) {
              var side = this.parent.Get("side").charAt(0),
                  align = HUB.config.displayAlign.charAt(0),
                  indent = HUB.config.displayIndent;
              this.data[0].toNativeMML(mtr);
              var label = mtr.lastChild,
                  pad = label;
              if (side === align) {
                label.setAttribute("style", "width:" + indent);
                label.setAttribute("columnalign", HUB.config.displayAlign);
              } else {
                pad = this.NativeMMLelement("mpadded");
                pad.setAttribute("style", "width:0");
                pad.setAttribute("width", "0px");
                pad.appendChild(label.firstChild);
                label.appendChild(pad);
              }
              NOPADDING("", label);
              mtr.removeChild(label);
              var width = 100,
                  forceWidth = this.parent.nMMLforceWidth;
              if ((this.parent.width || "").match(/%/)) {
                width -= parseFloat(this.parent.width);
              }
              ;
              var w = width;
              if (forceWidth || side !== "r") {
                NOPADDING("Left", mtr.firstChild);
                if (align !== "l") {
                  if (align === "c") {
                    w /= 2;
                  }
                  ;
                  width -= w;
                  mtr.insertBefore(this.NativeMMLelement("mtd"), mtr.firstChild).setAttribute("style", "padding:0;width:" + w + "%");
                }
                if (side === "l") {
                  mtr.insertBefore(label, mtr.firstChild);
                }
              }
              if (forceWidth || side !== "l") {
                NOPADDING("Right", mtr.lastChild);
                if (align !== "r") {
                  mtr.appendChild(this.NativeMMLelement("mtd")).setAttribute("style", "padding:0;width:" + width + "%");
                }
                if (side === "r") {
                  if (side !== align) {
                    pad.setAttribute("lspace", "-1width");
                  }
                  mtr.appendChild(label);
                }
              }
            }
            parent.appendChild(mtr);
          }});
        MML.mtd.Augment({toNativeMML: function(parent) {
            var tag = parent.appendChild(this.NativeMMLelement(this.type));
            this.NativeMMLattributes(tag);
            if (nMML.mtdWidthBug) {
              nMML.adjustWidths.push(tag);
              tag = tag.appendChild(this.NativeMMLelement("mrow"));
            }
            for (var i = 0,
                m = this.data.length; i < m; i++) {
              if (this.data[i]) {
                this.data[i].toNativeMML(tag);
              } else {
                tag.appendChild(this.NativeMMLelement("mrow"));
              }
            }
          }});
        MML.mspace.Augment({toNativeMML: function(parent) {
            this.SUPER(arguments).toNativeMML.call(this, parent);
            if (nMML.spaceWidthBug && this.width) {
              var mspace = parent.lastChild;
              var width = mspace.getAttribute("width");
              var style = (mspace.getAttribute("style") || "").replace(/;?\s*/, "; ");
              mspace.setAttribute("style", style + "width:" + width);
            }
          }});
        var fontDir = AJAX.fileURL(MathJax.OutputJax.fontDir + "/HTML-CSS/TeX/otf");
        nMML.Augment({config: {styles: {
              '[class="MJX-tex-oldstyle"]': {"font-family": "MathJax_Caligraphic, MathJax_Caligraphic-WEB"},
              '[class="MJX-tex-oldstyle-bold"]': {
                "font-family": "MathJax_Caligraphic, MathJax_Caligraphic-WEB",
                "font-weight": "bold"
              },
              '[class="MJX-tex-caligraphic"]': {"font-family": "MathJax_Caligraphic, MathJax_Caligraphic-WEB"},
              '[class="MJX-tex-caligraphic-bold"]': {
                "font-family": "MathJax_Caligraphic, MathJax_Caligraphic-WEB",
                "font-weight": "bold"
              },
              '@font-face /*1*/': {
                "font-family": "MathJax_Caligraphic-WEB",
                "src": "url('" + fontDir + "/MathJax_Caligraphic-Regular.otf')"
              },
              '@font-face /*2*/': {
                "font-family": "MathJax_Caligraphic-WEB",
                "font-weight": "bold",
                "src": "url('" + fontDir + "/MathJax_Caligraphic-Bold.otf')"
              }
            }}});
        if (!this.handlesVariants) {
          nMML.Augment({config: {styles: {
                '[mathvariant="double-struck"]': {"font-family": "MathJax_AMS, MathJax_AMS-WEB"},
                '[mathvariant="script"]': {"font-family": "MathJax_Script, MathJax_Script-WEB"},
                '[mathvariant="fraktur"]': {"font-family": "MathJax_Fraktur, MathJax_Fraktur-WEB"},
                '[mathvariant="bold-script"]': {
                  "font-family": "MathJax_Script, MathJax_Caligraphic-WEB",
                  "font-weight": "bold"
                },
                '[mathvariant="bold-fraktur"]': {
                  "font-family": "MathJax_Fraktur, MathJax_Fraktur-WEB",
                  "font-weight": "bold"
                },
                '[mathvariant="monospace"]': {"font-family": "monospace"},
                '[mathvariant="sans-serif"]': {"font-family": "sans-serif"},
                '[mathvariant="bold-sans-serif"]': {
                  "font-family": "sans-serif",
                  "font-weight": "bold"
                },
                '[mathvariant="sans-serif-italic"]': {
                  "font-family": "sans-serif",
                  "font-style": "italic"
                },
                '[mathvariant="sans-serif-bold-italic"]': {
                  "font-family": "sans-serif",
                  "font-style": "italic",
                  "font-weight": "bold"
                },
                '@font-face /*3*/': {
                  "font-family": "MathJax_AMS-WEB",
                  "src": "url('" + fontDir + "/MathJax_AMS-Regular.otf')"
                },
                '@font-face /*4*/': {
                  "font-family": "MathJax_Script-WEB",
                  "src": "url('" + fontDir + "/MathJax_Script-Regular.otf')"
                },
                '@font-face /*5*/': {
                  "font-family": "MathJax_Fraktur-WEB",
                  "src": "url('" + fontDir + "/MathJax_Fraktur-Regular.otf')"
                },
                '@font-face /*6*/': {
                  "font-family": "MathJax_Fraktur-WEB",
                  "font-weight": "bold",
                  "src": "url('" + fontDir + "/MathJax_Fraktur-Bold.otf')"
                }
              }}});
        }
      }
      MML.math.Augment({toNativeMML: function(parent, jax) {
          var tag = this.NativeMMLelement(this.type),
              math = tag;
          var annotate = (jax ? MathJax.InputJax[jax.inputJax].annotationEncoding : null);
          var i,
              m;
          nMML.adjustWidths = [];
          tag.setAttribute("xmlns", nMML.MMLnamespace);
          this.NativeMMLattributes(tag);
          if (nMML.widthBug) {
            tag = tag.appendChild(this.NativeMMLelement("mrow"));
          }
          if (annotate) {
            tag = tag.appendChild(this.NativeMMLelement("semantics"));
            tag.appendChild(this.NativeMMLelement("mrow"));
            var annotation = tag.appendChild(this.NativeMMLelement("annotation"));
            annotation.appendChild(document.createTextNode(jax.originalText));
            annotation.setAttribute("encoding", annotate);
            tag = tag.firstChild;
          }
          for (i = 0, m = this.data.length; i < m; i++) {
            if (this.data[i]) {
              this.data[i].toNativeMML(tag);
            } else {
              tag.appendChild(this.NativeMMLelement("mrow"));
            }
          }
          var mtable = ((this.data[0] || {data: []}).data[0] || {});
          if (mtable.nMMLhasLabels) {
            if (mtable.nMMLforceWidth || !mtable.nMMLlaMatch) {
              tag.setAttribute("style", "width:100%");
              if (annotate)
                tag.parentNode.setAttribute("style", "width:100%");
            }
            ;
            if (mtable.nMMLlaMatch) {
              if (parent.parentNode.parentNode.nodeName.toLowerCase() === "div") {
                parent.parentNode.parentNode.style.setProperty("margin-" + HUB.config.displayAlign, "0px", "important");
              }
            }
          }
          var fullWidth = nMML.isFullWidth(math);
          if (fullWidth) {
            parent.style.width = parent.parentNode.style.width = "100%";
          }
          parent.appendChild(math);
          if (nMML.widthBug && !fullWidth) {
            parent.style.width = (math.firstChild.scrollWidth / nMML.ex / nMML.scale).toFixed(3) + "ex";
            if (jax) {
              jax.NativeMML.scrollWidth = math.firstChild.scrollWidth;
            }
          }
          if (nMML.adjustWidths.length) {
            var mtd = [];
            for (i = 0, m = nMML.adjustWidths.length; i < m; i++) {
              tag = nMML.adjustWidths[i];
              var style = tag.getAttribute("style") || "";
              if (!style.match(/(^|;)\s*min-width:/)) {
                var width = tag.firstChild.scrollWidth;
                mtd.push(width);
                width = (width / nMML.ex).toFixed(3) + "ex";
                style = style.replace(/;?\s*$/, "; ");
                tag.setAttribute("style", style + "min-width:" + width);
              }
            }
            if (!jax) {
              jax = HUB.getJaxFor(parent);
            }
            if (jax) {
              jax.NativeMML.mtds = mtd;
            }
            math.MathJaxMtds = nMML.adjustWidths;
            nMML.adjustWidths = [];
          }
        }});
      MML.mfenced.Augment({toNativeMML: function(parent) {
          if (!nMML.mfencedBug) {
            this.SUPER(arguments).toNativeMML.call(this, parent);
            return;
          }
          var isOpera = HUB.Browser.isOpera;
          var i,
              m,
              operator;
          var values = this.getValues("open", "close", "separators");
          values.open = values.open.replace(/^\s+/, "").replace(/\s+$/, "");
          values.close = values.close.replace(/^\s+/, "").replace(/\s+$/, "");
          values.separators = values.separators.replace(/\s+/g, "").split("");
          if (values.separators.length == 0) {
            values.separators = null;
          } else if (values.separators.length < this.data.length - 1) {
            var s = values.separators[values.separators.length - 1];
            for (i = this.data.length - 1 - values.separators.length; i > 0; i--) {
              values.separators.push(s);
            }
          }
          var tag = this.NativeMMLelement(isOpera ? this.type : "mrow");
          this.NativeMMLattributes(tag);
          tag.removeAttribute("separators");
          if (isOpera) {
            tag.setAttribute("open", values.open);
            tag.setAttribute("close", values.close);
            if (this.data.length > 1) {
              parent.appendChild(tag);
              parent = tag;
              tag = this.NativeMMLelement("mrow");
            }
          } else {
            tag.removeAttribute("open");
            tag.removeAttribute("close");
          }
          if (!isOpera) {
            operator = this.NativeMMLelement("mo");
            operator.setAttribute("fence", "true");
            operator.textContent = values.open;
            tag.appendChild(operator);
          }
          for (i = 0, m = this.data.length; i < m; i++) {
            if (values.separators && i > 0) {
              operator = this.NativeMMLelement("mo");
              operator.setAttribute("separator", "true");
              operator.textContent = values.separators[i - 1];
              tag.appendChild(operator);
            }
            if (this.data[i]) {
              this.data[i].toNativeMML(tag);
            } else {
              tag.appendChild(this.NativeMMLelement("mrow"));
            }
          }
          if (!isOpera) {
            operator = this.NativeMMLelement("mo");
            operator.setAttribute("fence", "true");
            operator.textContent = values.close;
            tag.appendChild(operator);
          }
          parent.appendChild(tag);
        }});
      MML.TeXAtom.Augment({toNativeMML: function(parent) {
          var tag = this.NativeMMLelement("mrow");
          this.NativeMMLattributes(tag);
          this.data[0].toNativeMML(tag);
          parent.appendChild(tag);
        }});
      MML.chars.Augment({toNativeMML: function(parent) {
          parent.appendChild(document.createTextNode(this.toString()));
        }});
      MML.entity.Augment({toNativeMML: function(parent) {
          parent.appendChild(document.createTextNode(this.toString()));
        }});
      MML.xml.Augment({toNativeMML: function(parent) {
          for (var i = 0,
              m = this.data.length; i < m; i++) {
            parent.appendChild(this.data[i].cloneNode(true));
          }
        }});
      MML.mi.Augment({toNativeMML: function(parent) {
          this.SUPER(arguments).toNativeMML.call(this, parent);
          if (nMML.miItalicBug) {
            if (this.Get("mathvariant") === MML.VARIANT.NORMAL) {
              var mi = parent.lastChild;
              mi.setAttribute("mathvariant", MML.VARIANT.NORMAL);
            }
          }
        }});
      MML.mo.Augment({toNativeMML: function(parent) {
          this.SUPER(arguments).toNativeMML.call(this, parent);
          if (nMML.webkitMoSpacingBug) {
            var lspace = 0,
                rspace = 0,
                p = this.parent;
            if (p && p.type === "mrow" && (p.inferred || !p.isEmbellished())) {
              var values = this.getValues("lspace", "rspace");
              lspace = values.lspace, rspace = values.rspace;
              if (nMML.NAMEDSPACE[lspace]) {
                lspace = nMML.NAMEDSPACE[lspace];
              }
              if (nMML.NAMEDSPACE[rspace]) {
                rspace = nMML.NAMEDSPACE[rspace];
              }
            }
            var mo = parent.lastChild;
            var span = HTML.Element("span");
            span.style.cssText = (mo.getAttribute("style") || "");
            span.style.setProperty("-webkit-margin-start", lspace);
            span.style.setProperty("-webkit-margin-end", rspace);
            mo.setAttribute("style", span.style.cssText);
          }
        }});
      MML.mmultiscripts.Augment({toNativeMML: function(parent) {
          if (!nMML.mmultiscriptsBug || this.data.length === 0) {
            this.SUPER(arguments).toNativeMML.call(this, parent);
            return;
          }
          var tag = this.NativeMMLelement("mrow");
          this.NativeMMLattributes(tag);
          if (this.data[0]) {
            this.data[0].toNativeMML(tag);
          } else {
            tag.appendChild(this.NativeMMLelement("mrow"));
          }
          var base = tag.removeChild(tag.lastChild);
          var m = this.data.length,
              i,
              msubsup;
          for (i = 1; i < m; i += 2) {
            if (this.data[i].type === "mprescripts")
              break;
            msubsup = this.NativeMMLelement("msubsup");
            msubsup.appendChild(base);
            if (this.data[i]) {
              this.data[i].toNativeMML(msubsup);
            } else {
              msubsup.appendChild(this.NativeMMLelement("mrow"));
            }
            if (i + 1 < m && this.data[i + 1]) {
              this.data[i + 1].toNativeMML(msubsup);
            } else {
              msubsup.appendChild(this.NativeMMLelement("mrow"));
            }
            base = msubsup;
          }
          tag.appendChild(base);
          for (i++; i < m; i += 2) {
            msubsup = this.NativeMMLelement("msubsup");
            msubsup.appendChild(this.NativeMMLelement("mrow"));
            if (this.data[i]) {
              this.data[i].toNativeMML(msubsup);
            } else {
              msubsup.appendChild(this.NativeMMLelement("mrow"));
            }
            if (i + 1 < m && this.data[i + 1]) {
              this.data[i + 1].toNativeMML(msubsup);
            } else {
              msubsup.appendChild(this.NativeMMLelement("mrow"));
            }
            tag.insertBefore(msubsup, base);
          }
          parent.appendChild(tag);
        }});
      HUB.Register.StartupHook("TeX mathchoice Ready", function() {
        MML.TeXmathchoice.Augment({toNativeMML: function(parent) {
            this.Core().toNativeMML(parent);
          }});
      });
      setTimeout(MathJax.Callback(["loadComplete", nMML, "jax.js"]), 0);
    });
    HUB.Browser.Select({
      MSIE: function(browser) {
        var mode = (document.documentMode || 0);
        nMML.msieIE8HeightBug = (mode === 8);
      },
      Opera: function(browser) {
        nMML.stretchyMoBug = true;
        nMML.tableLabelBug = true;
        nMML.mfencedBug = true;
        nMML.miBug = true;
        nMML.mmultiscriptsBug = true;
      },
      Firefox: function(browser) {
        var is29 = browser.versionAtLeast("29.0");
        nMML.ffTableWidthBug = !browser.versionAtLeast("13.0");
        nMML.forceReflow = !is29;
        nMML.widthBug = !is29;
        nMML.mtdWidthBug = true;
        nMML.handlesVariants = is29;
        nMML.spaceWidthBug = !browser.versionAtLeast("20.0");
        nMML.tableSpacingBug = !browser.versionAtLeast("33.0");
        nMML.tableLabelBug = true;
        nMML.mfencedBug = true;
      },
      Chrome: function(browser) {
        nMML.tableSpacingBug = true;
        nMML.tableLabelBug = true;
        nMML.mfencedBug = true;
      },
      Safari: function(browser) {
        nMML.tableSpacingBug = true;
        nMML.tableLabelBug = true;
        nMML.mfencedBug = true;
        nMML.miItalicBug = true;
        nMML.webkitMoSpacingBug = true;
        nMML.spaceWidthBug = true;
        nMML.mmultiscriptsBug = true;
      }
    });
    HUB.Register.StartupHook("End Cookie", function() {
      if (HUB.config.menuSettings.zoom !== "None") {
        AJAX.Require("[MathJax]/extensions/MathZoom.js");
      }
    });
  })(MathJax.OutputJax.NativeMML, MathJax.Hub, MathJax.Ajax, MathJax.HTML);
})(require('process'));
