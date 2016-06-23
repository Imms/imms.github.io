/* */ 
(function(process) {
  MathJax.Hub.Config({delayJaxRegistration: true});
  MathJax.Ajax.Preloading("[MathJax]/jax/input/MathML/config.js", "[MathJax]/jax/output/HTML-CSS/config.js", "[MathJax]/jax/output/NativeMML/config.js", "[MathJax]/jax/output/PreviewHTML/config.js", "[MathJax]/config/MMLorHTML.js", "[MathJax]/extensions/mml2jax.js", "[MathJax]/extensions/MathEvents.js", "[MathJax]/extensions/MathZoom.js", "[MathJax]/extensions/MathMenu.js", "[MathJax]/jax/element/mml/jax.js", "[MathJax]/extensions/toMathML.js", "[MathJax]/jax/input/MathML/jax.js", "[MathJax]/jax/output/NativeMML/jax.js", "[MathJax]/jax/output/HTML-CSS/jax.js", "[MathJax]/jax/output/HTML-CSS/autoload/mtable.js", "[MathJax]/jax/output/PreviewHTML/jax.js", "[MathJax]/extensions/fast-preview.js", "[MathJax]/extensions/AssistiveMML.js");
  MathJax.Hub.Config({"v1.0-compatible": false});
  MathJax.InputJax.MathML = MathJax.InputJax({
    id: "MathML",
    version: "2.6.1",
    directory: MathJax.InputJax.directory + "/MathML",
    extensionDir: MathJax.InputJax.extensionDir + "/MathML",
    entityDir: MathJax.InputJax.directory + "/MathML/entities",
    config: {useMathMLspacing: false}
  });
  MathJax.InputJax.MathML.Register("math/mml");
  MathJax.InputJax.MathML.loadComplete("config.js");
  MathJax.OutputJax["HTML-CSS"] = MathJax.OutputJax({
    id: "HTML-CSS",
    version: "2.6.1",
    directory: MathJax.OutputJax.directory + "/HTML-CSS",
    extensionDir: MathJax.OutputJax.extensionDir + "/HTML-CSS",
    autoloadDir: MathJax.OutputJax.directory + "/HTML-CSS/autoload",
    fontDir: MathJax.OutputJax.directory + "/HTML-CSS/fonts",
    webfontDir: MathJax.OutputJax.fontDir + "/HTML-CSS",
    config: {
      noReflows: true,
      matchFontHeight: true,
      scale: 100,
      minScaleAdjust: 50,
      availableFonts: ["STIX", "TeX"],
      preferredFont: "TeX",
      webFont: "TeX",
      imageFont: "TeX",
      undefinedFamily: "STIXGeneral,'Arial Unicode MS',serif",
      mtextFontInherit: false,
      EqnChunk: (MathJax.Hub.Browser.isMobile ? 10 : 50),
      EqnChunkFactor: 1.5,
      EqnChunkDelay: 100,
      linebreaks: {
        automatic: false,
        width: "container"
      },
      styles: {
        ".MathJax_Display": {
          "text-align": "center",
          margin: "1em 0em"
        },
        ".MathJax .merror": {
          "background-color": "#FFFF88",
          color: "#CC0000",
          border: "1px solid #CC0000",
          padding: "1px 3px",
          "font-style": "normal",
          "font-size": "90%"
        },
        ".MathJax .MJX-monospace": {"font-family": "monospace"},
        ".MathJax .MJX-sans-serif": {"font-family": "sans-serif"},
        "#MathJax_Tooltip": {
          "background-color": "InfoBackground",
          color: "InfoText",
          border: "1px solid black",
          "box-shadow": "2px 2px 5px #AAAAAA",
          "-webkit-box-shadow": "2px 2px 5px #AAAAAA",
          "-moz-box-shadow": "2px 2px 5px #AAAAAA",
          "-khtml-box-shadow": "2px 2px 5px #AAAAAA",
          filter: "progid:DXImageTransform.Microsoft.dropshadow(OffX=2, OffY=2, Color='gray', Positive='true')",
          padding: "3px 4px",
          "z-index": 401
        }
      }
    }
  });
  if (MathJax.Hub.Browser.isMSIE && document.documentMode >= 9) {
    delete MathJax.OutputJax["HTML-CSS"].config.styles["#MathJax_Tooltip"].filter;
  }
  if (!MathJax.Hub.config.delayJaxRegistration) {
    MathJax.OutputJax["HTML-CSS"].Register("jax/mml");
  }
  MathJax.Hub.Register.StartupHook("End Config", [function(b, c) {
    var a = b.Insert({
      minBrowserVersion: {
        Firefox: 3,
        Opera: 9.52,
        MSIE: 6,
        Chrome: 0.3,
        Safari: 2,
        Konqueror: 4
      },
      inlineMathDelimiters: ["$", "$"],
      displayMathDelimiters: ["$$", "$$"],
      multilineDisplay: true,
      minBrowserTranslate: function(f) {
        var e = b.getJaxFor(f),
            k = ["[Math]"],
            j;
        var h = document.createElement("span", {className: "MathJax_Preview"});
        if (e.inputJax === "TeX") {
          if (e.root.Get("displaystyle")) {
            j = a.displayMathDelimiters;
            k = [j[0] + e.originalText + j[1]];
            if (a.multilineDisplay) {
              k = k[0].split(/\n/);
            }
          } else {
            j = a.inlineMathDelimiters;
            k = [j[0] + e.originalText.replace(/^\s+/, "").replace(/\s+$/, "") + j[1]];
          }
        }
        for (var g = 0,
            d = k.length; g < d; g++) {
          h.appendChild(document.createTextNode(k[g]));
          if (g < d - 1) {
            h.appendChild(document.createElement("br"));
          }
        }
        f.parentNode.insertBefore(h, f);
      }
    }, (b.config["HTML-CSS"] || {}));
    if (b.Browser.version !== "0.0" && !b.Browser.versionAtLeast(a.minBrowserVersion[b.Browser] || 0)) {
      c.Translate = a.minBrowserTranslate;
      b.Config({showProcessingMessages: false});
      MathJax.Message.Set(["MathJaxNotSupported", "Your browser does not support MathJax"], null, 4000);
      b.Startup.signal.Post("MathJax not supported");
    }
  }, MathJax.Hub, MathJax.OutputJax["HTML-CSS"]]);
  MathJax.OutputJax["HTML-CSS"].loadComplete("config.js");
  MathJax.OutputJax.NativeMML = MathJax.OutputJax({
    id: "NativeMML",
    version: "2.6.1",
    directory: MathJax.OutputJax.directory + "/NativeMML",
    extensionDir: MathJax.OutputJax.extensionDir + "/NativeMML",
    config: {
      matchFontHeight: true,
      scale: 100,
      minScaleAdjust: 50,
      styles: {"div.MathJax_MathML": {
          "text-align": "center",
          margin: ".75em 0px"
        }}
    }
  });
  if (!MathJax.Hub.config.delayJaxRegistration) {
    MathJax.OutputJax.NativeMML.Register("jax/mml");
  }
  MathJax.OutputJax.NativeMML.loadComplete("config.js");
  MathJax.OutputJax.PreviewHTML = MathJax.OutputJax({
    id: "PreviewHTML",
    version: "2.6.1",
    directory: MathJax.OutputJax.directory + "/PreviewHTML",
    extensionDir: MathJax.OutputJax.extensionDir + "/PreviewHTML",
    noFastPreview: true,
    config: {
      scale: 100,
      minScaleAdjust: 50,
      mtextFontInherit: false,
      linebreaks: {
        automatic: false,
        width: "container"
      }
    }
  });
  if (!MathJax.Hub.config.delayJaxRegistration) {
    MathJax.OutputJax.PreviewHTML.Register("jax/mml");
  }
  MathJax.OutputJax.PreviewHTML.loadComplete("config.js");
  (function(c, g) {
    var f = "2.6.0";
    var a = MathJax.Hub.CombineConfig("MMLorHTML", {prefer: {
        MSIE: "MML",
        Firefox: "HTML",
        Opera: "HTML",
        Chrome: "HTML",
        Safari: "HTML",
        other: "HTML"
      }});
    var e = {
      Firefox: 3,
      Opera: 9.52,
      MSIE: 6,
      Chrome: 0.3,
      Safari: 2,
      Konqueror: 4
    };
    var b = (g.version === "0.0" || g.versionAtLeast(e[g] || 0));
    var d = (g.isFirefox && g.versionAtLeast("1.5")) || (g.isMSIE && g.hasMathPlayer) || (g.isSafari && g.versionAtLeast("5.0")) || (g.isOpera && g.versionAtLeast("9.52"));
    c.Register.StartupHook("End Config", function() {
      var h = (a.prefer && typeof(a.prefer) === "object" ? a.prefer[MathJax.Hub.Browser] || a.prefer.other || "HTML" : a.prefer);
      if (b || d) {
        if (d && (h === "MML" || !b)) {
          if (MathJax.OutputJax.NativeMML) {
            MathJax.OutputJax.NativeMML.Register("jax/mml");
          } else {
            c.config.jax.unshift("output/NativeMML");
          }
          c.Startup.signal.Post("NativeMML output selected");
        } else {
          if (MathJax.OutputJax["HTML-CSS"]) {
            MathJax.OutputJax["HTML-CSS"].Register("jax/mml");
          } else {
            c.config.jax.unshift("output/HTML-CSS");
          }
          c.Startup.signal.Post("HTML-CSS output selected");
        }
      } else {
        c.PreProcess.disabled = true;
        c.prepareScripts.disabled = true;
        MathJax.Message.Set(["MathJaxNotSupported", "Your browser does not support MathJax"], null, 4000);
        c.Startup.signal.Post("MathJax not supported");
      }
    });
  })(MathJax.Hub, MathJax.Hub.Browser);
  MathJax.Ajax.loadComplete("[MathJax]/config/MMLorHTML.js");
  MathJax.Extension.mml2jax = {
    version: "2.6.0",
    config: {preview: "mathml"},
    MMLnamespace: "http://www.w3.org/1998/Math/MathML",
    PreProcess: function(e) {
      if (!this.configured) {
        this.config = MathJax.Hub.CombineConfig("mml2jax", this.config);
        if (this.config.Augment) {
          MathJax.Hub.Insert(this, this.config.Augment);
        }
        this.InitBrowser();
        this.configured = true;
      }
      if (typeof(e) === "string") {
        e = document.getElementById(e);
      }
      if (!e) {
        e = document.body;
      }
      var h = [];
      this.PushMathElements(h, e, "math");
      this.PushMathElements(h, e, "math", this.MMLnamespace);
      var d,
          b;
      if (typeof(document.namespaces) !== "undefined") {
        try {
          for (d = 0, b = document.namespaces.length; d < b; d++) {
            var f = document.namespaces[d];
            if (f.urn === this.MMLnamespace) {
              this.PushMathElements(h, e, f.name + ":math");
            }
          }
        } catch (g) {}
      } else {
        var c = document.getElementsByTagName("html")[0];
        if (c) {
          for (d = 0, b = c.attributes.length; d < b; d++) {
            var a = c.attributes[d];
            if (a.nodeName.substr(0, 6) === "xmlns:" && a.nodeValue === this.MMLnamespace) {
              this.PushMathElements(h, e, a.nodeName.substr(6) + ":math");
            }
          }
        }
      }
      this.ProcessMathArray(h);
    },
    PushMathElements: function(f, d, a, c) {
      var h,
          g = MathJax.Hub.config.preRemoveClass;
      if (c) {
        if (!d.getElementsByTagNameNS) {
          return;
        }
        h = d.getElementsByTagNameNS(c, a);
      } else {
        h = d.getElementsByTagName(a);
      }
      for (var e = 0,
          b = h.length; e < b; e++) {
        var j = h[e].parentNode;
        if (j && j.className !== g && !j.isMathJax && !h[e].prefix === !c) {
          f.push(h[e]);
        }
      }
    },
    ProcessMathArray: function(c) {
      var b,
          a = c.length;
      if (a) {
        if (this.MathTagBug) {
          for (b = 0; b < a; b++) {
            if (c[b].nodeName === "MATH") {
              this.ProcessMathFlattened(c[b]);
            } else {
              this.ProcessMath(c[b]);
            }
          }
        } else {
          for (b = 0; b < a; b++) {
            this.ProcessMath(c[b]);
          }
        }
      }
    },
    ProcessMath: function(e) {
      var d = e.parentNode;
      if (!d || d.className === MathJax.Hub.config.preRemoveClass) {
        return;
      }
      var a = document.createElement("script");
      a.type = "math/mml";
      d.insertBefore(a, e);
      if (this.AttributeBug) {
        var b = this.OuterHTML(e);
        if (this.CleanupHTML) {
          b = b.replace(/<\?import .*?>/i, "").replace(/<\?xml:namespace .*?\/>/i, "");
          b = b.replace(/&nbsp;/g, "&#xA0;");
        }
        MathJax.HTML.setScript(a, b);
        d.removeChild(e);
      } else {
        var c = MathJax.HTML.Element("span");
        c.appendChild(e);
        MathJax.HTML.setScript(a, c.innerHTML);
      }
      if (this.config.preview !== "none") {
        this.createPreview(e, a);
      }
    },
    ProcessMathFlattened: function(f) {
      var d = f.parentNode;
      if (!d || d.className === MathJax.Hub.config.preRemoveClass) {
        return;
      }
      var b = document.createElement("script");
      b.type = "math/mml";
      d.insertBefore(b, f);
      var c = "",
          e,
          a = f;
      while (f && f.nodeName !== "/MATH") {
        e = f;
        f = f.nextSibling;
        c += this.NodeHTML(e);
        e.parentNode.removeChild(e);
      }
      if (f && f.nodeName === "/MATH") {
        f.parentNode.removeChild(f);
      }
      b.text = c + "</math>";
      if (this.config.preview !== "none") {
        this.createPreview(a, b);
      }
    },
    NodeHTML: function(e) {
      var c,
          b,
          a;
      if (e.nodeName === "#text") {
        c = this.quoteHTML(e.nodeValue);
      } else {
        if (e.nodeName === "#comment") {
          c = "<!--" + e.nodeValue + "-->";
        } else {
          c = "<" + e.nodeName.toLowerCase();
          for (b = 0, a = e.attributes.length; b < a; b++) {
            var d = e.attributes[b];
            if (d.specified && d.nodeName.substr(0, 10) !== "_moz-math-") {
              c += " " + d.nodeName.toLowerCase().replace(/xmlns:xmlns/, "xmlns") + "=";
              var f = d.nodeValue;
              if (f == null && d.nodeName === "style" && e.style) {
                f = e.style.cssText;
              }
              c += '"' + this.quoteHTML(f) + '"';
            }
          }
          c += ">";
          if (e.outerHTML != null && e.outerHTML.match(/(.<\/[A-Z]+>|\/>)$/)) {
            for (b = 0, a = e.childNodes.length; b < a; b++) {
              c += this.OuterHTML(e.childNodes[b]);
            }
            c += "</" + e.nodeName.toLowerCase() + ">";
          }
        }
      }
      return c;
    },
    OuterHTML: function(d) {
      if (d.nodeName.charAt(0) === "#") {
        return this.NodeHTML(d);
      }
      if (!this.AttributeBug) {
        return d.outerHTML;
      }
      var c = this.NodeHTML(d);
      for (var b = 0,
          a = d.childNodes.length; b < a; b++) {
        c += this.OuterHTML(d.childNodes[b]);
      }
      c += "</" + d.nodeName.toLowerCase() + ">";
      return c;
    },
    quoteHTML: function(a) {
      if (a == null) {
        a = "";
      }
      return a.replace(/&/g, "&#x26;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/\"/g, "&quot;");
    },
    createPreview: function(f, b) {
      var g = this.config.preview;
      if (g === "none") {
        return;
      }
      var a = false;
      if (g === "mathml") {
        a = true;
        if (this.MathTagBug) {
          g = "alttext";
        } else {
          g = f.cloneNode(true);
        }
      }
      if (g === "alttext" || g === "altimg") {
        a = true;
        var c = this.filterPreview(f.getAttribute("alttext"));
        if (g === "alttext") {
          if (c != null) {
            g = MathJax.HTML.TextNode(c);
          } else {
            g = null;
          }
        } else {
          var h = f.getAttribute("altimg");
          if (h != null) {
            var e = {
              width: f.getAttribute("altimg-width"),
              height: f.getAttribute("altimg-height")
            };
            g = MathJax.HTML.Element("img", {
              src: h,
              alt: c,
              style: e
            });
          } else {
            g = null;
          }
        }
      }
      if (g) {
        var d;
        if (a) {
          d = MathJax.HTML.Element("span", {className: MathJax.Hub.config.preRemoveClass});
          d.appendChild(g);
        } else {
          d = MathJax.HTML.Element("span", {className: MathJax.Hub.config.preRemoveClass}, g);
        }
        b.parentNode.insertBefore(d, b);
      }
    },
    filterPreview: function(a) {
      return a;
    },
    InitBrowser: function() {
      var b = MathJax.HTML.Element("span", {
        id: "<",
        className: "mathjax",
        innerHTML: "<math><mi>x</mi><mspace /></math>"
      });
      var a = b.outerHTML || "";
      this.AttributeBug = a !== "" && !(a.match(/id="&lt;"/) && a.match(/class="mathjax"/) && a.match(/<\/math>/));
      this.MathTagBug = b.childNodes.length > 1;
      this.CleanupHTML = MathJax.Hub.Browser.isMSIE;
    }
  };
  MathJax.Hub.Register.PreProcessor(["PreProcess", MathJax.Extension.mml2jax], 5);
  MathJax.Ajax.loadComplete("[MathJax]/extensions/mml2jax.js");
  (function(d, h, l, g, m, b, j) {
    var p = "2.6.0";
    var i = MathJax.Extension;
    var c = i.MathEvents = {version: p};
    var k = d.config.menuSettings;
    var o = {
      hover: 500,
      frame: {
        x: 3.5,
        y: 5,
        bwidth: 1,
        bcolor: "#A6D",
        hwidth: "15px",
        hcolor: "#83A"
      },
      button: {
        x: -6,
        y: -3,
        wx: -2
      },
      fadeinInc: 0.2,
      fadeoutInc: 0.05,
      fadeDelay: 50,
      fadeoutStart: 400,
      fadeoutDelay: 15 * 1000,
      styles: {
        ".MathJax_Hover_Frame": {
          "border-radius": ".25em",
          "-webkit-border-radius": ".25em",
          "-moz-border-radius": ".25em",
          "-khtml-border-radius": ".25em",
          "box-shadow": "0px 0px 15px #83A",
          "-webkit-box-shadow": "0px 0px 15px #83A",
          "-moz-box-shadow": "0px 0px 15px #83A",
          "-khtml-box-shadow": "0px 0px 15px #83A",
          border: "1px solid #A6D ! important",
          display: "inline-block",
          position: "absolute"
        },
        ".MathJax_Menu_Button .MathJax_Hover_Arrow": {
          position: "absolute",
          cursor: "pointer",
          display: "inline-block",
          border: "2px solid #AAA",
          "border-radius": "4px",
          "-webkit-border-radius": "4px",
          "-moz-border-radius": "4px",
          "-khtml-border-radius": "4px",
          "font-family": "'Courier New',Courier",
          "font-size": "9px",
          color: "#F0F0F0"
        },
        ".MathJax_Menu_Button .MathJax_Hover_Arrow span": {
          display: "block",
          "background-color": "#AAA",
          border: "1px solid",
          "border-radius": "3px",
          "line-height": 0,
          padding: "4px"
        },
        ".MathJax_Hover_Arrow:hover": {
          color: "white!important",
          border: "2px solid #CCC!important"
        },
        ".MathJax_Hover_Arrow:hover span": {"background-color": "#CCC!important"}
      }
    };
    var n = c.Event = {
      LEFTBUTTON: 0,
      RIGHTBUTTON: 2,
      MENUKEY: "altKey",
      KEY: {
        RETURN: 13,
        ESCAPE: 27,
        SPACE: 32,
        LEFT: 37,
        UP: 38,
        RIGHT: 39,
        DOWN: 40
      },
      Mousedown: function(q) {
        return n.Handler(q, "Mousedown", this);
      },
      Mouseup: function(q) {
        return n.Handler(q, "Mouseup", this);
      },
      Mousemove: function(q) {
        return n.Handler(q, "Mousemove", this);
      },
      Mouseover: function(q) {
        return n.Handler(q, "Mouseover", this);
      },
      Mouseout: function(q) {
        return n.Handler(q, "Mouseout", this);
      },
      Click: function(q) {
        return n.Handler(q, "Click", this);
      },
      DblClick: function(q) {
        return n.Handler(q, "DblClick", this);
      },
      Menu: function(q) {
        return n.Handler(q, "ContextMenu", this);
      },
      Handler: function(t, r, s) {
        if (l.loadingMathMenu) {
          return n.False(t);
        }
        var q = b[s.jaxID];
        if (!t) {
          t = window.event;
        }
        t.isContextMenu = (r === "ContextMenu");
        if (q[r]) {
          return q[r](t, s);
        }
        if (i.MathZoom) {
          return i.MathZoom.HandleEvent(t, r, s);
        }
      },
      False: function(q) {
        if (!q) {
          q = window.event;
        }
        if (q) {
          if (q.preventDefault) {
            q.preventDefault();
          } else {
            q.returnValue = false;
          }
          if (q.stopPropagation) {
            q.stopPropagation();
          }
          q.cancelBubble = true;
        }
        return false;
      },
      Keydown: function(r, q) {
        if (!r) {
          r = window.event;
        }
        if (r.keyCode === n.KEY.SPACE) {
          n.ContextMenu(r, this);
        }
      },
      ContextMenu: function(t, E, w) {
        var B = b[E.jaxID],
            v = B.getJaxFromMath(E);
        var F = (B.config.showMathMenu != null ? B : d).config.showMathMenu;
        if (!F || (k.context !== "MathJax" && !w)) {
          return;
        }
        if (c.msieEventBug) {
          t = window.event || t;
        }
        n.ClearSelection();
        f.ClearHoverTimer();
        if (v.hover) {
          if (v.hover.remove) {
            clearTimeout(v.hover.remove);
            delete v.hover.remove;
          }
          v.hover.nofade = true;
        }
        var u = MathJax.Menu;
        var G,
            D;
        if (u) {
          if (u.loadingDomain) {
            return n.False(t);
          }
          G = m.loadDomain("MathMenu");
          if (!G) {
            u.jax = v;
            var r = u.menu.Find("Show Math As").submenu;
            r.items[0].name = v.sourceMenuTitle;
            r.items[0].format = (v.sourceMenuFormat || "MathML");
            r.items[1].name = j[v.inputJax].sourceMenuTitle;
            r.items[5].disabled = !j[v.inputJax].annotationEncoding;
            var A = r.items[2];
            A.disabled = true;
            var q = A.submenu.items;
            annotationList = MathJax.Hub.Config.semanticsAnnotations;
            for (var z = 0,
                y = q.length; z < y; z++) {
              var s = q[z].name[1];
              if (v.root && v.root.getAnnotation(s) !== null) {
                A.disabled = false;
                q[z].hidden = false;
              } else {
                q[z].hidden = true;
              }
            }
            var x = u.menu.Find("Math Settings", "MathPlayer");
            x.hidden = !(v.outputJax === "NativeMML" && d.Browser.hasMathPlayer);
            return u.menu.Post(t);
          }
          u.loadingDomain = true;
          D = function() {
            delete u.loadingDomain;
          };
        } else {
          if (l.loadingMathMenu) {
            return n.False(t);
          }
          l.loadingMathMenu = true;
          G = l.Require("[MathJax]/extensions/MathMenu.js");
          D = function() {
            delete l.loadingMathMenu;
            if (!MathJax.Menu) {
              MathJax.Menu = {};
            }
          };
        }
        var C = {
          pageX: t.pageX,
          pageY: t.pageY,
          clientX: t.clientX,
          clientY: t.clientY
        };
        g.Queue(G, D, ["ContextMenu", n, C, E, w]);
        return n.False(t);
      },
      AltContextMenu: function(s, r) {
        var t = b[r.jaxID];
        var q = (t.config.showMathMenu != null ? t : d).config.showMathMenu;
        if (q) {
          q = (t.config.showMathMenuMSIE != null ? t : d).config.showMathMenuMSIE;
          if (k.context === "MathJax" && !k.mpContext && q) {
            if (!c.noContextMenuBug || s.button !== n.RIGHTBUTTON) {
              return;
            }
          } else {
            if (!s[n.MENUKEY] || s.button !== n.LEFTBUTTON) {
              return;
            }
          }
          return t.ContextMenu(s, r, true);
        }
      },
      ClearSelection: function() {
        if (c.safariContextMenuBug) {
          setTimeout("window.getSelection().empty()", 0);
        }
        if (document.selection) {
          setTimeout("document.selection.empty()", 0);
        }
      },
      getBBox: function(s) {
        s.appendChild(c.topImg);
        var r = c.topImg.offsetTop,
            t = s.offsetHeight - r,
            q = s.offsetWidth;
        s.removeChild(c.topImg);
        return {
          w: q,
          h: r,
          d: t
        };
      }
    };
    var f = c.Hover = {
      Mouseover: function(s, r) {
        if (k.discoverable || k.zoom === "Hover") {
          var u = s.fromElement || s.relatedTarget,
              t = s.toElement || s.target;
          if (u && t && (d.isMathJaxNode(u) !== d.isMathJaxNode(t) || d.getJaxFor(u) !== d.getJaxFor(t))) {
            var q = this.getJaxFromMath(r);
            if (q.hover) {
              f.ReHover(q);
            } else {
              f.HoverTimer(q, r);
            }
            return n.False(s);
          }
        }
      },
      Mouseout: function(s, r) {
        if (k.discoverable || k.zoom === "Hover") {
          var u = s.fromElement || s.relatedTarget,
              t = s.toElement || s.target;
          if (u && t && (d.isMathJaxNode(u) !== d.isMathJaxNode(t) || d.getJaxFor(u) !== d.getJaxFor(t))) {
            var q = this.getJaxFromMath(r);
            if (q.hover) {
              f.UnHover(q);
            } else {
              f.ClearHoverTimer();
            }
            return n.False(s);
          }
        }
      },
      Mousemove: function(s, r) {
        if (k.discoverable || k.zoom === "Hover") {
          var q = this.getJaxFromMath(r);
          if (q.hover) {
            return;
          }
          if (f.lastX == s.clientX && f.lastY == s.clientY) {
            return;
          }
          f.lastX = s.clientX;
          f.lastY = s.clientY;
          f.HoverTimer(q, r);
          return n.False(s);
        }
      },
      HoverTimer: function(q, r) {
        this.ClearHoverTimer();
        this.hoverTimer = setTimeout(g(["Hover", this, q, r]), o.hover);
      },
      ClearHoverTimer: function() {
        if (this.hoverTimer) {
          clearTimeout(this.hoverTimer);
          delete this.hoverTimer;
        }
      },
      Hover: function(q, u) {
        if (i.MathZoom && i.MathZoom.Hover({}, u)) {
          return;
        }
        var t = b[q.outputJax],
            v = t.getHoverSpan(q, u),
            y = t.getHoverBBox(q, v, u),
            w = (t.config.showMathMenu != null ? t : d).config.showMathMenu;
        var A = o.frame.x,
            z = o.frame.y,
            x = o.frame.bwidth;
        if (c.msieBorderWidthBug) {
          x = 0;
        }
        q.hover = {
          opacity: 0,
          id: q.inputID + "-Hover"
        };
        var r = h.Element("span", {
          id: q.hover.id,
          isMathJax: true,
          style: {
            display: "inline-block",
            width: 0,
            height: 0,
            position: "relative"
          }
        }, [["span", {
          className: "MathJax_Hover_Frame",
          isMathJax: true,
          style: {
            display: "inline-block",
            position: "absolute",
            top: this.Px(-y.h - z - x - (y.y || 0)),
            left: this.Px(-A - x + (y.x || 0)),
            width: this.Px(y.w + 2 * A),
            height: this.Px(y.h + y.d + 2 * z),
            opacity: 0,
            filter: "alpha(opacity=0)"
          }
        }]]);
        var s = h.Element("span", {
          isMathJax: true,
          id: q.hover.id + "Menu",
          className: "MathJax_Menu_Button",
          style: {
            display: "inline-block",
            "z-index": 1,
            width: 0,
            height: 0,
            position: "relative"
          }
        }, [["span", {
          className: "MathJax_Hover_Arrow",
          isMathJax: true,
          math: u,
          onclick: this.HoverMenu,
          jax: t.id,
          style: {
            left: this.Px(y.w + A + x + (y.x || 0) + o.button.x),
            top: this.Px(-y.h - z - x - (y.y || 0) - o.button.y),
            opacity: 0,
            filter: "alpha(opacity=0)"
          }
        }, [["span", {isMathJax: true}, "\u25BC"]]]]);
        if (y.width) {
          r.style.width = s.style.width = y.width;
          r.style.marginRight = s.style.marginRight = "-" + y.width;
          r.firstChild.style.width = y.width;
          s.firstChild.style.left = "";
          s.firstChild.style.right = this.Px(o.button.wx);
        }
        v.parentNode.insertBefore(r, v);
        if (w) {
          v.parentNode.insertBefore(s, v);
        }
        if (v.style) {
          v.style.position = "relative";
        }
        this.ReHover(q);
      },
      ReHover: function(q) {
        if (q.hover.remove) {
          clearTimeout(q.hover.remove);
        }
        q.hover.remove = setTimeout(g(["UnHover", this, q]), o.fadeoutDelay);
        this.HoverFadeTimer(q, o.fadeinInc);
      },
      UnHover: function(q) {
        if (!q.hover.nofade) {
          this.HoverFadeTimer(q, -o.fadeoutInc, o.fadeoutStart);
        }
      },
      HoverFade: function(q) {
        delete q.hover.timer;
        q.hover.opacity = Math.max(0, Math.min(1, q.hover.opacity + q.hover.inc));
        q.hover.opacity = Math.floor(1000 * q.hover.opacity) / 1000;
        var s = document.getElementById(q.hover.id),
            r = document.getElementById(q.hover.id + "Menu");
        s.firstChild.style.opacity = q.hover.opacity;
        s.firstChild.style.filter = "alpha(opacity=" + Math.floor(100 * q.hover.opacity) + ")";
        if (r) {
          r.firstChild.style.opacity = q.hover.opacity;
          r.firstChild.style.filter = s.style.filter;
        }
        if (q.hover.opacity === 1) {
          return;
        }
        if (q.hover.opacity > 0) {
          this.HoverFadeTimer(q, q.hover.inc);
          return;
        }
        s.parentNode.removeChild(s);
        if (r) {
          r.parentNode.removeChild(r);
        }
        if (q.hover.remove) {
          clearTimeout(q.hover.remove);
        }
        delete q.hover;
      },
      HoverFadeTimer: function(q, s, r) {
        q.hover.inc = s;
        if (!q.hover.timer) {
          q.hover.timer = setTimeout(g(["HoverFade", this, q]), (r || o.fadeDelay));
        }
      },
      HoverMenu: function(q) {
        if (!q) {
          q = window.event;
        }
        return b[this.jax].ContextMenu(q, this.math, true);
      },
      ClearHover: function(q) {
        if (q.hover.remove) {
          clearTimeout(q.hover.remove);
        }
        if (q.hover.timer) {
          clearTimeout(q.hover.timer);
        }
        f.ClearHoverTimer();
        delete q.hover;
      },
      Px: function(q) {
        if (Math.abs(q) < 0.006) {
          return "0px";
        }
        return q.toFixed(2).replace(/\.?0+$/, "") + "px";
      },
      getImages: function() {
        if (k.discoverable) {
          var q = new Image();
          q.src = o.button.src;
        }
      }
    };
    var a = c.Touch = {
      last: 0,
      delay: 500,
      start: function(r) {
        var q = new Date().getTime();
        var s = (q - a.last < a.delay && a.up);
        a.last = q;
        a.up = false;
        if (s) {
          a.timeout = setTimeout(a.menu, a.delay, r, this);
          r.preventDefault();
        }
      },
      end: function(r) {
        var q = new Date().getTime();
        a.up = (q - a.last < a.delay);
        if (a.timeout) {
          clearTimeout(a.timeout);
          delete a.timeout;
          a.last = 0;
          a.up = false;
          r.preventDefault();
          return n.Handler((r.touches[0] || r.touch), "DblClick", this);
        }
      },
      menu: function(r, q) {
        delete a.timeout;
        a.last = 0;
        a.up = false;
        return n.Handler((r.touches[0] || r.touch), "ContextMenu", q);
      }
    };
    d.Browser.Select({
      MSIE: function(q) {
        var s = (document.documentMode || 0);
        var r = q.versionAtLeast("8.0");
        c.msieBorderWidthBug = (document.compatMode === "BackCompat");
        c.msieEventBug = q.isIE9;
        c.msieAlignBug = (!r || s < 8);
        if (s < 9) {
          n.LEFTBUTTON = 1;
        }
      },
      Safari: function(q) {
        c.safariContextMenuBug = true;
      },
      Opera: function(q) {
        c.operaPositionBug = true;
      },
      Konqueror: function(q) {
        c.noContextMenuBug = true;
      }
    });
    c.topImg = (c.msieAlignBug ? h.Element("img", {
      style: {
        width: 0,
        height: 0,
        position: "relative"
      },
      src: "about:blank"
    }) : h.Element("span", {style: {
        width: 0,
        height: 0,
        display: "inline-block"
      }}));
    if (c.operaPositionBug) {
      c.topImg.style.border = "1px solid";
    }
    c.config = o = d.CombineConfig("MathEvents", o);
    var e = function() {
      var q = o.styles[".MathJax_Hover_Frame"];
      q.border = o.frame.bwidth + "px solid " + o.frame.bcolor + " ! important";
      q["box-shadow"] = q["-webkit-box-shadow"] = q["-moz-box-shadow"] = q["-khtml-box-shadow"] = "0px 0px " + o.frame.hwidth + " " + o.frame.hcolor;
    };
    g.Queue(d.Register.StartupHook("End Config", {}), [e], ["getImages", f], ["Styles", l, o.styles], ["Post", d.Startup.signal, "MathEvents Ready"], ["loadComplete", l, "[MathJax]/extensions/MathEvents.js"]);
  })(MathJax.Hub, MathJax.HTML, MathJax.Ajax, MathJax.Callback, MathJax.Localization, MathJax.OutputJax, MathJax.InputJax);
  (function(a, d, f, c, j) {
    var k = "2.6.0";
    var i = a.CombineConfig("MathZoom", {styles: {
        "#MathJax_Zoom": {
          position: "absolute",
          "background-color": "#F0F0F0",
          overflow: "auto",
          display: "block",
          "z-index": 301,
          padding: ".5em",
          border: "1px solid black",
          margin: 0,
          "font-weight": "normal",
          "font-style": "normal",
          "text-align": "left",
          "text-indent": 0,
          "text-transform": "none",
          "line-height": "normal",
          "letter-spacing": "normal",
          "word-spacing": "normal",
          "word-wrap": "normal",
          "white-space": "nowrap",
          "float": "none",
          "-webkit-box-sizing": "content-box",
          "-moz-box-sizing": "content-box",
          "box-sizing": "content-box",
          "box-shadow": "5px 5px 15px #AAAAAA",
          "-webkit-box-shadow": "5px 5px 15px #AAAAAA",
          "-moz-box-shadow": "5px 5px 15px #AAAAAA",
          "-khtml-box-shadow": "5px 5px 15px #AAAAAA",
          filter: "progid:DXImageTransform.Microsoft.dropshadow(OffX=2, OffY=2, Color='gray', Positive='true')"
        },
        "#MathJax_ZoomOverlay": {
          position: "absolute",
          left: 0,
          top: 0,
          "z-index": 300,
          display: "inline-block",
          width: "100%",
          height: "100%",
          border: 0,
          padding: 0,
          margin: 0,
          "background-color": "white",
          opacity: 0,
          filter: "alpha(opacity=0)"
        },
        "#MathJax_ZoomFrame": {
          position: "relative",
          display: "inline-block",
          height: 0,
          width: 0
        },
        "#MathJax_ZoomEventTrap": {
          position: "absolute",
          left: 0,
          top: 0,
          "z-index": 302,
          display: "inline-block",
          border: 0,
          padding: 0,
          margin: 0,
          "background-color": "white",
          opacity: 0,
          filter: "alpha(opacity=0)"
        }
      }});
    var e,
        b,
        g;
    MathJax.Hub.Register.StartupHook("MathEvents Ready", function() {
      g = MathJax.Extension.MathEvents.Event;
      e = MathJax.Extension.MathEvents.Event.False;
      b = MathJax.Extension.MathEvents.Hover;
    });
    var h = MathJax.Extension.MathZoom = {
      version: k,
      settings: a.config.menuSettings,
      scrollSize: 18,
      HandleEvent: function(n, l, m) {
        if (h.settings.CTRL && !n.ctrlKey) {
          return true;
        }
        if (h.settings.ALT && !n.altKey) {
          return true;
        }
        if (h.settings.CMD && !n.metaKey) {
          return true;
        }
        if (h.settings.Shift && !n.shiftKey) {
          return true;
        }
        if (!h[l]) {
          return true;
        }
        return h[l](n, m);
      },
      Click: function(m, l) {
        if (this.settings.zoom === "Click") {
          return this.Zoom(m, l);
        }
      },
      DblClick: function(m, l) {
        if (this.settings.zoom === "Double-Click" || this.settings.zoom === "DoubleClick") {
          return this.Zoom(m, l);
        }
      },
      Hover: function(m, l) {
        if (this.settings.zoom === "Hover") {
          this.Zoom(m, l);
          return true;
        }
        return false;
      },
      Zoom: function(o, u) {
        this.Remove();
        b.ClearHoverTimer();
        g.ClearSelection();
        var s = MathJax.OutputJax[u.jaxID];
        var p = s.getJaxFromMath(u);
        if (p.hover) {
          b.UnHover(p);
        }
        var q = this.findContainer(u);
        var l = Math.floor(0.85 * q.clientWidth),
            t = Math.max(document.body.clientHeight, document.documentElement.clientHeight);
        if (this.getOverflow(q) !== "visible") {
          t = Math.min(q.clientHeight, t);
        }
        t = Math.floor(0.85 * t);
        var n = d.Element("span", {id: "MathJax_ZoomFrame"}, [["span", {
          id: "MathJax_ZoomOverlay",
          onmousedown: this.Remove
        }], ["span", {
          id: "MathJax_Zoom",
          onclick: this.Remove,
          style: {
            visibility: "hidden",
            fontSize: this.settings.zscale
          }
        }, [["span", {style: {
            display: "inline-block",
            "white-space": "nowrap"
          }}]]]]);
        var z = n.lastChild,
            w = z.firstChild,
            r = n.firstChild;
        u.parentNode.insertBefore(n, u);
        u.parentNode.insertBefore(u, n);
        if (w.addEventListener) {
          w.addEventListener("mousedown", this.Remove, true);
        }
        var m = z.offsetWidth || z.clientWidth;
        l -= m;
        t -= m;
        z.style.maxWidth = l + "px";
        z.style.maxHeight = t + "px";
        if (this.msieTrapEventBug) {
          var y = d.Element("span", {
            id: "MathJax_ZoomEventTrap",
            onmousedown: this.Remove
          });
          n.insertBefore(y, z);
        }
        if (this.msieZIndexBug) {
          var v = d.addElement(document.body, "img", {
            src: "about:blank",
            id: "MathJax_ZoomTracker",
            width: 0,
            height: 0,
            style: {
              width: 0,
              height: 0,
              position: "relative"
            }
          });
          n.style.position = "relative";
          n.style.zIndex = i.styles["#MathJax_ZoomOverlay"]["z-index"];
          n = v;
        }
        var x = s.Zoom(p, w, u, l, t);
        if (this.msiePositionBug) {
          if (this.msieSizeBug) {
            z.style.height = x.zH + "px";
            z.style.width = x.zW + "px";
          }
          if (z.offsetHeight > t) {
            z.style.height = t + "px";
            z.style.width = (x.zW + this.scrollSize) + "px";
          }
          if (z.offsetWidth > l) {
            z.style.width = l + "px";
            z.style.height = (x.zH + this.scrollSize) + "px";
          }
        }
        if (this.operaPositionBug) {
          z.style.width = Math.min(l, x.zW) + "px";
        }
        if (z.offsetWidth > m && z.offsetWidth - m < l && z.offsetHeight - m < t) {
          z.style.overflow = "visible";
        }
        this.Position(z, x);
        if (this.msieTrapEventBug) {
          y.style.height = z.clientHeight + "px";
          y.style.width = z.clientWidth + "px";
          y.style.left = (parseFloat(z.style.left) + z.clientLeft) + "px";
          y.style.top = (parseFloat(z.style.top) + z.clientTop) + "px";
        }
        z.style.visibility = "";
        if (this.settings.zoom === "Hover") {
          r.onmouseover = this.Remove;
        }
        if (window.addEventListener) {
          addEventListener("resize", this.Resize, false);
        } else {
          if (window.attachEvent) {
            attachEvent("onresize", this.Resize);
          } else {
            this.onresize = window.onresize;
            window.onresize = this.Resize;
          }
        }
        a.signal.Post(["math zoomed", p]);
        return e(o);
      },
      Position: function(p, r) {
        p.style.display = "none";
        var q = this.Resize(),
            m = q.x,
            s = q.y,
            l = r.mW;
        p.style.display = "";
        var o = -l - Math.floor((p.offsetWidth - l) / 2),
            n = r.Y;
        p.style.left = Math.max(o, 10 - m) + "px";
        p.style.top = Math.max(n, 10 - s) + "px";
        if (!h.msiePositionBug) {
          h.SetWH();
        }
      },
      Resize: function(m) {
        if (h.onresize) {
          h.onresize(m);
        }
        var q = document.getElementById("MathJax_ZoomFrame"),
            l = document.getElementById("MathJax_ZoomOverlay");
        var o = h.getXY(q),
            n = h.findContainer(q);
        if (h.getOverflow(n) !== "visible") {
          l.scroll_parent = n;
          var p = h.getXY(n);
          o.x -= p.x;
          o.y -= p.y;
          p = h.getBorder(n);
          o.x -= p.x;
          o.y -= p.y;
        }
        l.style.left = (-o.x) + "px";
        l.style.top = (-o.y) + "px";
        if (h.msiePositionBug) {
          setTimeout(h.SetWH, 0);
        } else {
          h.SetWH();
        }
        return o;
      },
      SetWH: function() {
        var l = document.getElementById("MathJax_ZoomOverlay");
        if (!l) {
          return;
        }
        l.style.display = "none";
        var m = l.scroll_parent || document.documentElement || document.body;
        l.style.width = m.scrollWidth + "px";
        l.style.height = Math.max(m.clientHeight, m.scrollHeight) + "px";
        l.style.display = "";
      },
      findContainer: function(l) {
        l = l.parentNode;
        while (l.parentNode && l !== document.body && h.getOverflow(l) === "visible") {
          l = l.parentNode;
        }
        return l;
      },
      getOverflow: (window.getComputedStyle ? function(l) {
        return getComputedStyle(l).overflow;
      } : function(l) {
        return (l.currentStyle || {overflow: "visible"}).overflow;
      }),
      getBorder: function(o) {
        var m = {
          thin: 1,
          medium: 2,
          thick: 3
        };
        var n = (window.getComputedStyle ? getComputedStyle(o) : (o.currentStyle || {
          borderLeftWidth: 0,
          borderTopWidth: 0
        }));
        var l = n.borderLeftWidth,
            p = n.borderTopWidth;
        if (m[l]) {
          l = m[l];
        } else {
          l = parseInt(l);
        }
        if (m[p]) {
          p = m[p];
        } else {
          p = parseInt(p);
        }
        return {
          x: l,
          y: p
        };
      },
      getXY: function(o) {
        var l = 0,
            n = 0,
            m;
        m = o;
        while (m.offsetParent) {
          l += m.offsetLeft;
          m = m.offsetParent;
        }
        if (h.operaPositionBug) {
          o.style.border = "1px solid";
        }
        m = o;
        while (m.offsetParent) {
          n += m.offsetTop;
          m = m.offsetParent;
        }
        if (h.operaPositionBug) {
          o.style.border = "";
        }
        return {
          x: l,
          y: n
        };
      },
      Remove: function(n) {
        var p = document.getElementById("MathJax_ZoomFrame");
        if (p) {
          var o = MathJax.OutputJax[p.previousSibling.jaxID];
          var l = o.getJaxFromMath(p.previousSibling);
          a.signal.Post(["math unzoomed", l]);
          p.parentNode.removeChild(p);
          p = document.getElementById("MathJax_ZoomTracker");
          if (p) {
            p.parentNode.removeChild(p);
          }
          if (h.operaRefreshBug) {
            var m = d.addElement(document.body, "div", {
              style: {
                position: "fixed",
                left: 0,
                top: 0,
                width: "100%",
                height: "100%",
                backgroundColor: "white",
                opacity: 0
              },
              id: "MathJax_OperaDiv"
            });
            document.body.removeChild(m);
          }
          if (window.removeEventListener) {
            removeEventListener("resize", h.Resize, false);
          } else {
            if (window.detachEvent) {
              detachEvent("onresize", h.Resize);
            } else {
              window.onresize = h.onresize;
              delete h.onresize;
            }
          }
        }
        return e(n);
      }
    };
    a.Browser.Select({
      MSIE: function(l) {
        var n = (document.documentMode || 0);
        var m = (n >= 9);
        h.msiePositionBug = !m;
        h.msieSizeBug = l.versionAtLeast("7.0") && (!document.documentMode || n === 7 || n === 8);
        h.msieZIndexBug = (n <= 7);
        h.msieInlineBlockAlignBug = (n <= 7);
        h.msieTrapEventBug = !window.addEventListener;
        if (document.compatMode === "BackCompat") {
          h.scrollSize = 52;
        }
        if (m) {
          delete i.styles["#MathJax_Zoom"].filter;
        }
      },
      Opera: function(l) {
        h.operaPositionBug = true;
        h.operaRefreshBug = true;
      }
    });
    h.topImg = (h.msieInlineBlockAlignBug ? d.Element("img", {
      style: {
        width: 0,
        height: 0,
        position: "relative"
      },
      src: "about:blank"
    }) : d.Element("span", {style: {
        width: 0,
        height: 0,
        display: "inline-block"
      }}));
    if (h.operaPositionBug || h.msieTopBug) {
      h.topImg.style.border = "1px solid";
    }
    MathJax.Callback.Queue(["StartupHook", MathJax.Hub.Register, "Begin Styles", {}], ["Styles", f, i.styles], ["Post", a.Startup.signal, "MathZoom Ready"], ["loadComplete", f, "[MathJax]/extensions/MathZoom.js"]);
  })(MathJax.Hub, MathJax.HTML, MathJax.Ajax, MathJax.OutputJax["HTML-CSS"], MathJax.OutputJax.NativeMML);
  (function(f, n, p, e, q) {
    var o = "2.6.1";
    var d = MathJax.Callback.Signal("menu");
    MathJax.Extension.MathMenu = {
      version: o,
      signal: d
    };
    var s = function(t) {
      return MathJax.Localization._.apply(MathJax.Localization, [["MathMenu", t]].concat([].slice.call(arguments, 1)));
    };
    var a = f.Browser.isPC,
        k = f.Browser.isMSIE,
        l = ((document.documentMode || 0) > 8);
    var i = (a ? null : "5px");
    var r = f.CombineConfig("MathMenu", {
      delay: 150,
      showRenderer: true,
      showMathPlayer: true,
      showFontMenu: false,
      showContext: false,
      showDiscoverable: false,
      showLocale: true,
      showLocaleURL: false,
      semanticsAnnotations: {
        TeX: ["TeX", "LaTeX", "application/x-tex"],
        StarMath: ["StarMath 5.0"],
        Maple: ["Maple"],
        ContentMathML: ["MathML-Content", "application/mathml-content+xml"],
        OpenMath: ["OpenMath"]
      },
      windowSettings: {
        status: "no",
        toolbar: "no",
        locationbar: "no",
        menubar: "no",
        directories: "no",
        personalbar: "no",
        resizable: "yes",
        scrollbars: "yes",
        width: 400,
        height: 300,
        left: Math.round((screen.width - 400) / 2),
        top: Math.round((screen.height - 300) / 3)
      },
      styles: {
        "#MathJax_About": {
          position: "fixed",
          left: "50%",
          width: "auto",
          "text-align": "center",
          border: "3px outset",
          padding: "1em 2em",
          "background-color": "#DDDDDD",
          color: "black",
          cursor: "default",
          "font-family": "message-box",
          "font-size": "120%",
          "font-style": "normal",
          "text-indent": 0,
          "text-transform": "none",
          "line-height": "normal",
          "letter-spacing": "normal",
          "word-spacing": "normal",
          "word-wrap": "normal",
          "white-space": "nowrap",
          "float": "none",
          "z-index": 201,
          "border-radius": "15px",
          "-webkit-border-radius": "15px",
          "-moz-border-radius": "15px",
          "-khtml-border-radius": "15px",
          "box-shadow": "0px 10px 20px #808080",
          "-webkit-box-shadow": "0px 10px 20px #808080",
          "-moz-box-shadow": "0px 10px 20px #808080",
          "-khtml-box-shadow": "0px 10px 20px #808080",
          filter: "progid:DXImageTransform.Microsoft.dropshadow(OffX=2, OffY=2, Color='gray', Positive='true')"
        },
        "#MathJax_About.MathJax_MousePost": {outline: "none"},
        ".MathJax_Menu": {
          position: "absolute",
          "background-color": "white",
          color: "black",
          width: "auto",
          padding: (a ? "2px" : "5px 0px"),
          border: "1px solid #CCCCCC",
          margin: 0,
          cursor: "default",
          font: "menu",
          "text-align": "left",
          "text-indent": 0,
          "text-transform": "none",
          "line-height": "normal",
          "letter-spacing": "normal",
          "word-spacing": "normal",
          "word-wrap": "normal",
          "white-space": "nowrap",
          "float": "none",
          "z-index": 201,
          "border-radius": i,
          "-webkit-border-radius": i,
          "-moz-border-radius": i,
          "-khtml-border-radius": i,
          "box-shadow": "0px 10px 20px #808080",
          "-webkit-box-shadow": "0px 10px 20px #808080",
          "-moz-box-shadow": "0px 10px 20px #808080",
          "-khtml-box-shadow": "0px 10px 20px #808080",
          filter: "progid:DXImageTransform.Microsoft.dropshadow(OffX=2, OffY=2, Color='gray', Positive='true')"
        },
        ".MathJax_MenuItem": {
          padding: (a ? "2px 2em" : "1px 2em"),
          background: "transparent"
        },
        ".MathJax_MenuArrow": {
          position: "absolute",
          right: ".5em",
          "padding-top": ".25em",
          color: "#666666",
          "font-family": (k ? "'Arial unicode MS'" : null),
          "font-size": ".75em"
        },
        ".MathJax_MenuActive .MathJax_MenuArrow": {color: "white"},
        ".MathJax_MenuArrow.RTL": {
          left: ".5em",
          right: "auto"
        },
        ".MathJax_MenuCheck": {
          position: "absolute",
          left: ".7em",
          "font-family": (k ? "'Arial unicode MS'" : null)
        },
        ".MathJax_MenuCheck.RTL": {
          right: ".7em",
          left: "auto"
        },
        ".MathJax_MenuRadioCheck": {
          position: "absolute",
          left: (a ? "1em" : ".7em")
        },
        ".MathJax_MenuRadioCheck.RTL": {
          right: (a ? "1em" : ".7em"),
          left: "auto"
        },
        ".MathJax_MenuLabel": {
          padding: (a ? "2px 2em 4px 1.33em" : "1px 2em 3px 1.33em"),
          "font-style": "italic"
        },
        ".MathJax_MenuRule": {
          "border-top": (a ? "1px solid #CCCCCC" : "1px solid #DDDDDD"),
          margin: (a ? "4px 1px 0px" : "4px 3px")
        },
        ".MathJax_MenuDisabled": {color: "GrayText"},
        ".MathJax_MenuActive": {
          "background-color": (a ? "Highlight" : "#606872"),
          color: (a ? "HighlightText" : "white")
        },
        ".MathJax_MenuDisabled:focus, .MathJax_MenuLabel:focus": {"background-color": "#E8E8E8"},
        ".MathJax_ContextMenu:focus": {outline: "none"},
        ".MathJax_ContextMenu .MathJax_MenuItem:focus": {outline: "none"},
        "#MathJax_AboutClose": {
          top: ".2em",
          right: ".2em"
        },
        ".MathJax_Menu .MathJax_MenuClose": {
          top: "-10px",
          left: "-10px"
        },
        ".MathJax_MenuClose": {
          position: "absolute",
          cursor: "pointer",
          display: "inline-block",
          border: "2px solid #AAA",
          "border-radius": "18px",
          "-webkit-border-radius": "18px",
          "-moz-border-radius": "18px",
          "-khtml-border-radius": "18px",
          "font-family": "'Courier New',Courier",
          "font-size": "24px",
          color: "#F0F0F0"
        },
        ".MathJax_MenuClose span": {
          display: "block",
          "background-color": "#AAA",
          border: "1.5px solid",
          "border-radius": "18px",
          "-webkit-border-radius": "18px",
          "-moz-border-radius": "18px",
          "-khtml-border-radius": "18px",
          "line-height": 0,
          padding: "8px 0 6px"
        },
        ".MathJax_MenuClose:hover": {
          color: "white!important",
          border: "2px solid #CCC!important"
        },
        ".MathJax_MenuClose:hover span": {"background-color": "#CCC!important"},
        ".MathJax_MenuClose:hover:focus": {outline: "none"}
      }
    });
    var m,
        j,
        b;
    f.Register.StartupHook("MathEvents Ready", function() {
      m = MathJax.Extension.MathEvents.Event.False;
      j = MathJax.Extension.MathEvents.Hover;
      b = MathJax.Extension.MathEvents.Event.KEY;
    });
    var h = MathJax.Object.Subclass({
      Keydown: function(t, u) {
        switch (t.keyCode) {
          case b.ESCAPE:
            this.Remove(t, u);
            break;
          case b.RIGHT:
            this.Right(t, u);
            break;
          case b.LEFT:
            this.Left(t, u);
            break;
          case b.UP:
            this.Up(t, u);
            break;
          case b.DOWN:
            this.Down(t, u);
            break;
          case b.RETURN:
          case b.SPACE:
            this.Space(t, u);
            break;
          default:
            return;
            break;
        }
        return m(t);
      },
      Escape: function(t, u) {},
      Right: function(t, u) {},
      Left: function(t, u) {},
      Up: function(t, u) {},
      Down: function(t, u) {},
      Space: function(t, u) {}
    }, {});
    var g = MathJax.Menu = h.Subclass({
      version: o,
      items: [],
      posted: false,
      title: null,
      margin: 5,
      Init: function(t) {
        this.items = [].slice.call(arguments, 0);
      },
      With: function(t) {
        if (t) {
          f.Insert(this, t);
        }
        return this;
      },
      Post: function(u, I, G) {
        if (!u) {
          u = window.event || {};
        }
        var t = document.getElementById("MathJax_MenuFrame");
        if (!t) {
          t = g.Background(this);
          delete c.lastItem;
          delete c.lastMenu;
          delete g.skipUp;
          d.Post(["post", g.jax]);
          g.isRTL = (MathJax.Localization.fontDirection() === "rtl");
        }
        var v = n.Element("div", {
          onmouseup: g.Mouseup,
          ondblclick: m,
          ondragstart: m,
          onselectstart: m,
          oncontextmenu: m,
          menuItem: this,
          className: "MathJax_Menu",
          onkeydown: g.Keydown,
          role: "menu"
        });
        if (u.type === "contextmenu" || u.type === "mouseover") {
          v.className += " MathJax_ContextMenu";
        }
        if (!G) {
          MathJax.Localization.setCSS(v);
        }
        for (var B = 0,
            z = this.items.length; B < z; B++) {
          this.items[B].Create(v);
        }
        if (g.isMobile) {
          n.addElement(v, "span", {
            className: "MathJax_MenuClose",
            menu: I,
            ontouchstart: g.Close,
            ontouchend: m,
            onmousedown: g.Close,
            onmouseup: m
          }, [["span", {}, "\u00D7"]]);
        }
        t.appendChild(v);
        this.posted = true;
        if (v.offsetWidth) {
          v.style.width = (v.offsetWidth + 2) + "px";
        }
        var H = u.pageX,
            F = u.pageY;
        if (!H && !F && "clientX" in u) {
          H = u.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
          F = u.clientY + document.body.scrollTop + document.documentElement.scrollTop;
        }
        if (!I) {
          var w = g.CurrentNode() || u.target;
          if ((u.type === "keydown" || (!H && !F)) && w) {
            var C = window.pageXOffset || document.documentElement.scrollLeft;
            var A = window.pageYOffset || document.documentElement.scrollTop;
            var E = w.getBoundingClientRect();
            H = (E.right + E.left) / 2 + C;
            F = (E.bottom + E.top) / 2 + A;
          }
          if (H + v.offsetWidth > document.body.offsetWidth - this.margin) {
            H = document.body.offsetWidth - v.offsetWidth - this.margin;
          }
          if (g.isMobile) {
            H = Math.max(5, H - Math.floor(v.offsetWidth / 2));
            F -= 20;
          }
          g.skipUp = u.isContextMenu;
        } else {
          var D = "left",
              L = I.offsetWidth;
          H = (g.isMobile ? 30 : L - 2);
          F = 0;
          while (I && I !== t) {
            H += I.offsetLeft;
            F += I.offsetTop;
            I = I.parentNode;
          }
          if (!g.isMobile) {
            if ((g.isRTL && H - L - v.offsetWidth > this.margin) || (!g.isRTL && H + v.offsetWidth > document.body.offsetWidth - this.margin)) {
              D = "right";
              H = Math.max(this.margin, H - L - v.offsetWidth + 6);
            }
          }
          if (!a) {
            v.style["borderRadiusTop" + D] = 0;
            v.style["WebkitBorderRadiusTop" + D] = 0;
            v.style["MozBorderRadiusTop" + D] = 0;
            v.style["KhtmlBorderRadiusTop" + D] = 0;
          }
        }
        v.style.left = H + "px";
        v.style.top = F + "px";
        if (document.selection && document.selection.empty) {
          document.selection.empty();
        }
        var K = window.pageXOffset || document.documentElement.scrollLeft;
        var J = window.pageYOffset || document.documentElement.scrollTop;
        g.Focus(v);
        if (u.type === "keydown") {
          g.skipMouseoverFromKey = true;
          setTimeout(function() {
            delete g.skipMouseoverFromKey;
          }, r.delay);
        }
        window.scrollTo(K, J);
        return m(u);
      },
      Remove: function(t, u) {
        d.Post(["unpost", g.jax]);
        var v = document.getElementById("MathJax_MenuFrame");
        if (v) {
          v.parentNode.removeChild(v);
          if (this.msieFixedPositionBug) {
            detachEvent("onresize", g.Resize);
          }
        }
        if (g.jax.hover) {
          delete g.jax.hover.nofade;
          j.UnHover(g.jax);
        }
        g.Unfocus(u);
        if (t.type === "mousedown") {
          g.CurrentNode().blur();
        }
        return m(t);
      },
      Find: function(t) {
        return this.FindN(1, t, [].slice.call(arguments, 1));
      },
      FindId: function(t) {
        return this.FindN(0, t, [].slice.call(arguments, 1));
      },
      FindN: function(x, u, w) {
        for (var v = 0,
            t = this.items.length; v < t; v++) {
          if (this.items[v].name[x] === u) {
            if (w.length) {
              if (!this.items[v].submenu) {
                return null;
              }
              return this.items[v].submenu.FindN(x, w[0], w.slice(1));
            }
            return this.items[v];
          }
        }
        return null;
      },
      IndexOf: function(t) {
        return this.IndexOfN(1, t);
      },
      IndexOfId: function(t) {
        return this.IndexOfN(0, t);
      },
      IndexOfN: function(w, u) {
        for (var v = 0,
            t = this.items.length; v < t; v++) {
          if (this.items[v].name[w] === u) {
            return v;
          }
        }
        return null;
      },
      Right: function(t, u) {
        g.Right(t, u);
      },
      Left: function(t, u) {
        g.Left(t, u);
      },
      Up: function(u, v) {
        var t = v.lastChild;
        t.menuItem.Activate(u, t);
      },
      Down: function(u, v) {
        var t = v.firstChild;
        t.menuItem.Activate(u, t);
      },
      Space: function(t, u) {
        this.Remove(t, u);
      }
    }, {
      config: r,
      Remove: function(t) {
        return g.Event(t, this, "Remove");
      },
      Mouseover: function(t) {
        return g.Event(t, this, "Mouseover");
      },
      Mouseout: function(t) {
        return g.Event(t, this, "Mouseout");
      },
      Mousedown: function(t) {
        return g.Event(t, this, "Mousedown");
      },
      Mouseup: function(t) {
        return g.Event(t, this, "Mouseup");
      },
      Keydown: function(t) {
        return g.Event(t, this, "Keydown");
      },
      Touchstart: function(t) {
        return g.Event(t, this, "Touchstart");
      },
      Touchend: function(t) {
        return g.Event(t, this, "Touchend");
      },
      Close: function(t) {
        return g.Event(t, this.menu || this.parentNode, (this.menu ? "Touchend" : "Remove"));
      },
      Event: function(v, x, t, w) {
        if (g.skipMouseover && t === "Mouseover" && !w) {
          return m(v);
        }
        if (g.skipMouseoverFromKey && t === "Mouseover") {
          delete g.skipMouseoverFromKey;
          return m(v);
        }
        if (g.skipUp) {
          if (t.match(/Mouseup|Touchend/)) {
            delete g.skipUp;
            return m(v);
          }
          if (t === "Touchstart" || (t === "Mousedown" && !g.skipMousedown)) {
            delete g.skipUp;
          }
        }
        if (!v) {
          v = window.event;
        }
        var u = x.menuItem;
        if (u && u[t]) {
          return u[t](v, x);
        }
        return null;
      },
      BGSTYLE: {
        position: "absolute",
        left: 0,
        top: 0,
        "z-index": 200,
        width: "100%",
        height: "100%",
        border: 0,
        padding: 0,
        margin: 0
      },
      Background: function(u) {
        var v = n.addElement(document.body, "div", {
          style: this.BGSTYLE,
          id: "MathJax_MenuFrame"
        }, [["div", {
          style: this.BGSTYLE,
          menuItem: u,
          onmousedown: this.Remove
        }]]);
        var t = v.firstChild;
        if (g.msieBackgroundBug) {
          t.style.backgroundColor = "white";
          t.style.filter = "alpha(opacity=0)";
        }
        if (g.msieFixedPositionBug) {
          v.width = v.height = 0;
          this.Resize();
          attachEvent("onresize", this.Resize);
        } else {
          t.style.position = "fixed";
        }
        return v;
      },
      Resize: function() {
        setTimeout(g.SetWH, 0);
      },
      SetWH: function() {
        var t = document.getElementById("MathJax_MenuFrame");
        if (t) {
          t = t.firstChild;
          t.style.width = t.style.height = "1px";
          t.style.width = document.body.scrollWidth + "px";
          t.style.height = document.body.scrollHeight + "px";
        }
      },
      posted: false,
      active: null,
      GetNode: function(t) {
        var u = document.getElementById(t.inputID + "-Frame");
        return u.isMathJax ? u : u.firstChild;
      },
      CurrentNode: function() {
        return g.GetNode(g.jax);
      },
      AllNodes: function() {
        var u = MathJax.Hub.getAllJax();
        var v = [];
        for (var w = 0,
            t; t = u[w]; w++) {
          v.push(g.GetNode(t));
        }
        return v;
      },
      ActiveNode: function() {
        return g.active;
      },
      FocusNode: function(t) {
        g.active = t;
        t.focus();
      },
      Focus: function(t) {
        !g.posted ? g.Activate(t) : g.ActiveNode().tabIndex = -1;
        t.tabIndex = 0;
        g.FocusNode(t);
      },
      Activate: function(t, u) {
        g.UnsetTabIndex();
        g.posted = true;
      },
      Unfocus: function() {
        g.ActiveNode().tabIndex = -1;
        g.SetTabIndex();
        g.FocusNode(g.CurrentNode());
        g.posted = false;
      },
      MoveHorizontal: function(x, y, v) {
        if (!x.shiftKey) {
          return;
        }
        var u = g.AllNodes();
        var t = u.length;
        if (t === 0) {
          return;
        }
        var w = u[g.Mod(v(g.IndexOf(u, g.CurrentNode())), t)];
        if (w === g.CurrentNode()) {
          return;
        }
        g.menu.Remove(x, y);
        g.jax = MathJax.Hub.getJaxFor(w);
        g.FocusNode(w);
        g.menu.Post(null);
      },
      Right: function(t, u) {
        g.MoveHorizontal(t, u, function(v) {
          return v + 1;
        });
      },
      Left: function(t, u) {
        g.MoveHorizontal(t, u, function(v) {
          return v - 1;
        });
      },
      UnsetTabIndex: function() {
        var u = g.AllNodes();
        for (var v = 0,
            t; t = u[v]; v++) {
          if (t.tabIndex > 0) {
            t.oldTabIndex = t.tabIndex;
          }
          t.tabIndex = -1;
        }
      },
      SetTabIndex: function() {
        var u = g.AllNodes();
        for (var v = 0,
            t; t = u[v]; v++) {
          if (t.oldTabIndex !== undefined) {
            t.tabIndex = t.oldTabIndex;
            delete t.oldTabIndex;
          } else {
            t.tabIndex = f.getTabOrder(t);
          }
        }
      },
      Mod: function(t, u) {
        return ((t % u) + u) % u;
      },
      IndexOf: (Array.prototype.indexOf ? function(t, u, v) {
        return t.indexOf(u, v);
      } : function(t, w, x) {
        for (var v = (x || 0),
            u = t.length; v < u; v++) {
          if (w === t[v]) {
            return v;
          }
        }
        return -1;
      }),
      saveCookie: function() {
        n.Cookie.Set("menu", this.cookie);
      },
      getCookie: function() {
        this.cookie = n.Cookie.Get("menu");
      }
    });
    MathJax.Menu.NAV = h;
    var c = g.ITEM = h.Subclass({
      name: "",
      node: null,
      menu: null,
      Attributes: function(t) {
        return f.Insert({
          onmouseup: g.Mouseup,
          ondragstart: m,
          onselectstart: m,
          onselectend: m,
          ontouchstart: g.Touchstart,
          ontouchend: g.Touchend,
          className: "MathJax_MenuItem",
          role: this.role,
          menuItem: this
        }, t);
      },
      Create: function(v) {
        if (!this.hidden) {
          var u = this.Attributes();
          var t = this.Label(u, v);
          n.addElement(v, "div", u, t);
        }
      },
      Name: function() {
        return s(this.name[0], this.name[1]);
      },
      Mouseover: function(t, u) {
        if (u.parentNode === g.ActiveNode().parentNode) {
          this.Deactivate(g.ActiveNode());
        }
        this.Activate(t, u);
      },
      Mouseout: function(t, u) {
        this.Deactivate(u);
      },
      Mouseup: function(t, u) {
        return this.Remove(t, u);
      },
      DeactivateSubmenus: function(y) {
        var x = document.getElementById("MathJax_MenuFrame").childNodes,
            u = c.GetMenuNode(y).childNodes;
        for (var v = 0,
            t = u.length; v < t; v++) {
          var w = u[v].menuItem;
          if (w && w.submenu && w.submenu.posted && w !== y.menuItem) {
            w.Deactivate(u[v]);
          }
        }
        this.RemoveSubmenus(y, x);
      },
      RemoveSubmenus: function(v, u) {
        u = u || document.getElementById("MathJax_MenuFrame").childNodes;
        var t = u.length - 1;
        while (t >= 0 && c.GetMenuNode(v).menuItem !== u[t].menuItem) {
          u[t].menuItem.posted = false;
          u[t].parentNode.removeChild(u[t]);
          t--;
        }
      },
      Touchstart: function(t, u) {
        return this.TouchEvent(t, u, "Mousedown");
      },
      Touchend: function(t, u) {
        return this.TouchEvent(t, u, "Mouseup");
      },
      TouchEvent: function(u, v, t) {
        if (this !== c.lastItem) {
          if (c.lastMenu) {
            g.Event(u, c.lastMenu, "Mouseout");
          }
          g.Event(u, v, "Mouseover", true);
          c.lastItem = this;
          c.lastMenu = v;
        }
        if (this.nativeTouch) {
          return null;
        }
        g.Event(u, v, t);
        return false;
      },
      Remove: function(t, u) {
        u = u.parentNode.menuItem;
        return u.Remove(t, u);
      },
      With: function(t) {
        if (t) {
          f.Insert(this, t);
        }
        return this;
      },
      isRTL: function() {
        return g.isRTL;
      },
      rtlClass: function() {
        return (this.isRTL() ? " RTL" : "");
      }
    }, {GetMenuNode: function(t) {
        return t.parentNode;
      }});
    g.ENTRY = g.ITEM.Subclass({
      role: "menuitem",
      Attributes: function(t) {
        t = f.Insert({
          onmouseover: g.Mouseover,
          onmouseout: g.Mouseout,
          onmousedown: g.Mousedown,
          onkeydown: g.Keydown,
          "aria-disabled": !!this.disabled
        }, t);
        t = this.SUPER(arguments).Attributes.call(this, t);
        if (this.disabled) {
          t.className += " MathJax_MenuDisabled";
        }
        return t;
      },
      MoveVertical: function(t, D, v) {
        var w = c.GetMenuNode(D);
        var C = [];
        for (var y = 0,
            B = w.menuItem.items,
            x; x = B[y]; y++) {
          if (!x.hidden) {
            C.push(x);
          }
        }
        var A = g.IndexOf(C, this);
        if (A === -1) {
          return;
        }
        var z = C.length;
        var u = w.childNodes;
        do {
          A = g.Mod(v(A), z);
        } while (C[A].hidden || !u[A].role || u[A].role === "separator");
        this.Deactivate(D);
        C[A].Activate(t, u[A]);
      },
      Up: function(u, t) {
        this.MoveVertical(u, t, function(v) {
          return v - 1;
        });
      },
      Down: function(u, t) {
        this.MoveVertical(u, t, function(v) {
          return v + 1;
        });
      },
      Right: function(u, t) {
        this.MoveHorizontal(u, t, g.Right, !this.isRTL());
      },
      Left: function(u, t) {
        this.MoveHorizontal(u, t, g.Left, this.isRTL());
      },
      MoveHorizontal: function(z, y, t, A) {
        var w = c.GetMenuNode(y);
        if (w.menuItem === g.menu && z.shiftKey) {
          t(z, y);
        }
        if (A) {
          return;
        }
        if (w.menuItem !== g.menu) {
          this.Deactivate(y);
        }
        var u = w.previousSibling.childNodes;
        var x = u.length;
        while (x--) {
          var v = u[x];
          if (v.menuItem.submenu && v.menuItem.submenu === w.menuItem) {
            g.Focus(v);
            break;
          }
        }
        this.RemoveSubmenus(y);
      },
      Space: function(t, u) {
        this.Mouseup(t, u);
      },
      Activate: function(t, u) {
        this.Deactivate(u);
        if (!this.disabled) {
          u.className += " MathJax_MenuActive";
        }
        this.DeactivateSubmenus(u);
        g.Focus(u);
      },
      Deactivate: function(t) {
        t.className = t.className.replace(/ MathJax_MenuActive/, "");
      }
    });
    g.ITEM.COMMAND = g.ENTRY.Subclass({
      action: function() {},
      Init: function(t, v, u) {
        if (!(t instanceof Array)) {
          t = [t, t];
        }
        this.name = t;
        this.action = v;
        this.With(u);
      },
      Label: function(t, u) {
        return [this.Name()];
      },
      Mouseup: function(t, u) {
        if (!this.disabled) {
          this.Remove(t, u);
          d.Post(["command", this]);
          this.action.call(this, t);
        }
        return m(t);
      }
    });
    g.ITEM.SUBMENU = g.ENTRY.Subclass({
      submenu: null,
      marker: "\u25BA",
      markerRTL: "\u25C4",
      Attributes: function(t) {
        t = f.Insert({"aria-haspopup": "true"}, t);
        t = this.SUPER(arguments).Attributes.call(this, t);
        return t;
      },
      Init: function(t, v) {
        if (!(t instanceof Array)) {
          t = [t, t];
        }
        this.name = t;
        var u = 1;
        if (!(v instanceof g.ITEM)) {
          this.With(v), u++;
        }
        this.submenu = g.apply(g, [].slice.call(arguments, u));
      },
      Label: function(t, u) {
        this.submenu.posted = false;
        return [this.Name() + " ", ["span", {className: "MathJax_MenuArrow" + this.rtlClass()}, [this.isRTL() ? this.markerRTL : this.marker]]];
      },
      Timer: function(t, u) {
        this.ClearTimer();
        t = {
          type: t.type,
          clientX: t.clientX,
          clientY: t.clientY
        };
        this.timer = setTimeout(e(["Mouseup", this, t, u]), r.delay);
      },
      ClearTimer: function() {
        if (this.timer) {
          clearTimeout(this.timer);
        }
      },
      Touchend: function(u, w) {
        var v = this.submenu.posted;
        var t = this.SUPER(arguments).Touchend.apply(this, arguments);
        if (v) {
          this.Deactivate(w);
          delete c.lastItem;
          delete c.lastMenu;
        }
        return t;
      },
      Mouseout: function(t, u) {
        if (!this.submenu.posted) {
          this.Deactivate(u);
        }
        this.ClearTimer();
      },
      Mouseover: function(t, u) {
        this.Activate(t, u);
      },
      Mouseup: function(t, u) {
        if (!this.disabled) {
          if (!this.submenu.posted) {
            this.ClearTimer();
            this.submenu.Post(t, u, this.ltr);
            g.Focus(u);
          } else {
            this.DeactivateSubmenus(u);
          }
        }
        return m(t);
      },
      Activate: function(t, u) {
        if (!this.disabled) {
          this.Deactivate(u);
          u.className += " MathJax_MenuActive";
        }
        if (!this.submenu.posted) {
          this.DeactivateSubmenus(u);
          if (!g.isMobile) {
            this.Timer(t, u);
          }
        }
        g.Focus(u);
      },
      MoveVertical: function(v, u, t) {
        this.ClearTimer();
        this.SUPER(arguments).MoveVertical.apply(this, arguments);
      },
      MoveHorizontal: function(v, x, u, w) {
        if (!w) {
          this.SUPER(arguments).MoveHorizontal.apply(this, arguments);
          return;
        }
        if (this.disabled) {
          return;
        }
        if (!this.submenu.posted) {
          this.Activate(v, x);
          return;
        }
        var t = c.GetMenuNode(x).nextSibling.childNodes;
        if (t.length > 0) {
          this.submenu.items[0].Activate(v, t[0]);
        }
      }
    });
    g.ITEM.RADIO = g.ENTRY.Subclass({
      variable: null,
      marker: (a ? "\u25CF" : "\u2713"),
      role: "menuitemradio",
      Attributes: function(u) {
        var t = r.settings[this.variable] === this.value ? "true" : "false";
        u = f.Insert({"aria-checked": t}, u);
        u = this.SUPER(arguments).Attributes.call(this, u);
        return u;
      },
      Init: function(u, t, v) {
        if (!(u instanceof Array)) {
          u = [u, u];
        }
        this.name = u;
        this.variable = t;
        this.With(v);
        if (this.value == null) {
          this.value = this.name[0];
        }
      },
      Label: function(u, v) {
        var t = {className: "MathJax_MenuRadioCheck" + this.rtlClass()};
        if (r.settings[this.variable] !== this.value) {
          t = {style: {display: "none"}};
        }
        return [["span", t, [this.marker]], " " + this.Name()];
      },
      Mouseup: function(w, x) {
        if (!this.disabled) {
          var y = x.parentNode.childNodes;
          for (var u = 0,
              t = y.length; u < t; u++) {
            var v = y[u].menuItem;
            if (v && v.variable === this.variable) {
              y[u].firstChild.style.display = "none";
            }
          }
          x.firstChild.display = "";
          r.settings[this.variable] = this.value;
          g.cookie[this.variable] = r.settings[this.variable];
          g.saveCookie();
          d.Post(["radio button", this]);
        }
        this.Remove(w, x);
        if (this.action && !this.disabled) {
          this.action.call(g, this);
        }
        return m(w);
      }
    });
    g.ITEM.CHECKBOX = g.ENTRY.Subclass({
      variable: null,
      marker: "\u2713",
      role: "menuitemcheckbox",
      Attributes: function(u) {
        var t = r.settings[this.variable] ? "true" : "false";
        u = f.Insert({"aria-checked": t}, u);
        u = this.SUPER(arguments).Attributes.call(this, u);
        return u;
      },
      Init: function(u, t, v) {
        if (!(u instanceof Array)) {
          u = [u, u];
        }
        this.name = u;
        this.variable = t;
        this.With(v);
      },
      Label: function(u, v) {
        var t = {className: "MathJax_MenuCheck" + this.rtlClass()};
        if (!r.settings[this.variable]) {
          t = {style: {display: "none"}};
        }
        return [["span", t, [this.marker]], " " + this.Name()];
      },
      Mouseup: function(t, u) {
        if (!this.disabled) {
          u.firstChild.display = (r.settings[this.variable] ? "none" : "");
          r.settings[this.variable] = !r.settings[this.variable];
          g.cookie[this.variable] = r.settings[this.variable];
          g.saveCookie();
          d.Post(["checkbox", this]);
        }
        this.Remove(t, u);
        if (this.action && !this.disabled) {
          this.action.call(g, this);
        }
        return m(t);
      }
    });
    g.ITEM.LABEL = g.ENTRY.Subclass({
      role: "menuitem",
      Init: function(t, u) {
        if (!(t instanceof Array)) {
          t = [t, t];
        }
        this.name = t;
        this.With(u);
      },
      Label: function(t, u) {
        t.className += " MathJax_MenuLabel";
        return [this.Name()];
      },
      Activate: function(t, u) {
        this.Deactivate(u);
        g.Focus(u);
      },
      Mouseup: function(t, u) {}
    });
    g.ITEM.RULE = g.ITEM.Subclass({
      role: "separator",
      Attributes: function(t) {
        t = f.Insert({"aria-orientation": "vertical"}, t);
        t = this.SUPER(arguments).Attributes.call(this, t);
        return t;
      },
      Label: function(t, u) {
        t.className += " MathJax_MenuRule";
        return null;
      }
    });
    g.About = function(x) {
      var u = g.About.GetFont();
      var z = g.About.GetFormat();
      var t = ["MathJax.js v" + MathJax.fileversion, ["br"]];
      t.push(["div", {style: {
          "border-top": "groove 2px",
          margin: ".25em 0"
        }}]);
      g.About.GetJax(t, MathJax.InputJax, ["InputJax", "%1 Input Jax v%2"]);
      g.About.GetJax(t, MathJax.OutputJax, ["OutputJax", "%1 Output Jax v%2"]);
      g.About.GetJax(t, MathJax.ElementJax, ["ElementJax", "%1 Element Jax v%2"]);
      t.push(["div", {style: {
          "border-top": "groove 2px",
          margin: ".25em 0"
        }}]);
      g.About.GetJax(t, MathJax.Extension, ["Extension", "%1 Extension v%2"], true);
      t.push(["div", {style: {
          "border-top": "groove 2px",
          margin: ".25em 0"
        }}], ["center", {}, [f.Browser + " v" + f.Browser.version + (z ? " \u2014 " + s(z.replace(/ /g, ""), z) : "")]]);
      g.About.div = g.Background(g.About);
      var w = n.addElement(g.About.div, "div", {
        id: "MathJax_About",
        tabIndex: 0,
        onkeydown: g.About.Keydown
      }, [["b", {style: {fontSize: "120%"}}, ["MathJax"]], " v" + MathJax.version, ["br"], s(u.replace(/ /g, ""), "using " + u), ["br"], ["br"], ["span", {
        style: {
          display: "inline-block",
          "text-align": "left",
          "font-size": "80%",
          "max-height": "20em",
          overflow: "auto",
          "background-color": "#E4E4E4",
          padding: ".4em .6em",
          border: "1px inset"
        },
        tabIndex: 0
      }, t], ["br"], ["br"], ["a", {href: "http://www.mathjax.org/"}, ["www.mathjax.org"]], ["span", {
        className: "MathJax_MenuClose",
        id: "MathJax_AboutClose",
        onclick: g.About.Remove,
        onkeydown: g.About.Keydown,
        tabIndex: 0,
        role: "button",
        "aria-label": s("CloseAboutDialog", "Close about MathJax dialog")
      }, [["span", {}, "\u00D7"]]]]);
      if (x.type === "mouseup") {
        w.className += " MathJax_MousePost";
      }
      w.focus();
      MathJax.Localization.setCSS(w);
      var y = (document.documentElement || {});
      var v = window.innerHeight || y.clientHeight || y.scrollHeight || 0;
      if (g.prototype.msieAboutBug) {
        w.style.width = "20em";
        w.style.position = "absolute";
        w.style.left = Math.floor((document.documentElement.scrollWidth - w.offsetWidth) / 2) + "px";
        w.style.top = (Math.floor((v - w.offsetHeight) / 3) + document.body.scrollTop) + "px";
      } else {
        w.style.marginLeft = Math.floor(-w.offsetWidth / 2) + "px";
        w.style.top = Math.floor((v - w.offsetHeight) / 3) + "px";
      }
    };
    g.About.Remove = function(t) {
      if (g.About.div) {
        document.body.removeChild(g.About.div);
        delete g.About.div;
      }
    };
    g.About.Keydown = function(t) {
      if (t.keyCode === b.ESCAPE || (this.id === "MathJax_AboutClose" && (t.keyCode === b.SPACE || t.keyCode === b.RETURN))) {
        g.About.Remove(t);
        g.CurrentNode().focus();
        m(t);
      }
    }, g.About.GetJax = function(u, z, x, w) {
      var y = [];
      for (var A in z) {
        if (z.hasOwnProperty(A) && z[A]) {
          if ((w && z[A].version) || (z[A].isa && z[A].isa(z))) {
            y.push(s(x[0], x[1], (z[A].id || A), z[A].version));
          }
        }
      }
      y.sort();
      for (var v = 0,
          t = y.length; v < t; v++) {
        u.push(y[v], ["br"]);
      }
      return u;
    };
    g.About.GetFont = function() {
      var t = MathJax.Hub.outputJax["jax/mml"][0] || {};
      var u = {
        SVG: "web SVG",
        CommonHTML: "web TeX",
        "HTML-CSS": (t.imgFonts ? "image" : (t.webFonts ? "web" : "local") + " " + t.fontInUse)
      }[t.id] || "generic";
      return u + " fonts";
    };
    g.About.GetFormat = function() {
      var t = MathJax.Hub.outputJax["jax/mml"][0] || {};
      if (t.id !== "HTML-CSS" || !t.webFonts || t.imgFonts) {
        return;
      }
      return t.allowWebFonts.replace(/otf/, "woff or otf") + " fonts";
    };
    g.Help = function(t) {
      p.Require("[MathJax]/extensions/HelpDialog.js", function() {
        MathJax.Extension.Help.Dialog({type: t.type});
      });
    };
    g.ShowSource = function(x) {
      if (!x) {
        x = window.event;
      }
      var w = {
        screenX: x.screenX,
        screenY: x.screenY
      };
      if (!g.jax) {
        return;
      }
      if (this.format === "MathML") {
        var u = MathJax.ElementJax.mml;
        if (u && typeof(u.mbase.prototype.toMathML) !== "undefined") {
          try {
            g.ShowSource.Text(g.jax.root.toMathML("", g.jax), x);
          } catch (v) {
            if (!v.restart) {
              throw v;
            }
            e.After([this, g.ShowSource, w], v.restart);
          }
        } else {
          if (!p.loadingToMathML) {
            p.loadingToMathML = true;
            g.ShowSource.Window(x);
            e.Queue(p.Require("[MathJax]/extensions/toMathML.js"), function() {
              delete p.loadingToMathML;
              if (!u.mbase.prototype.toMathML) {
                u.mbase.prototype.toMathML = function() {};
              }
            }, [this, g.ShowSource, w]);
            return;
          }
        }
      } else {
        if (this.format === "Error") {
          g.ShowSource.Text(g.jax.errorText, x);
        } else {
          if (r.semanticsAnnotations[this.format]) {
            var t = g.jax.root.getAnnotation(this.format);
            if (t.data[0]) {
              g.ShowSource.Text(t.data[0].toString());
            }
          } else {
            if (g.jax.originalText == null) {
              alert(s("NoOriginalForm", "No original form available"));
              return;
            }
            g.ShowSource.Text(g.jax.originalText, x);
          }
        }
      }
    };
    g.ShowSource.Window = function(u) {
      if (!g.ShowSource.w) {
        var v = [],
            t = r.windowSettings;
        for (var w in t) {
          if (t.hasOwnProperty(w)) {
            v.push(w + "=" + t[w]);
          }
        }
        g.ShowSource.w = window.open("", "_blank", v.join(","));
      }
      return g.ShowSource.w;
    };
    g.ShowSource.Text = function(y, v) {
      var t = g.ShowSource.Window(v);
      delete g.ShowSource.w;
      y = y.replace(/^\s*/, "").replace(/\s*$/, "");
      y = y.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
      var x = s("EqSource", "MathJax Equation Source");
      if (g.isMobile) {
        t.document.open();
        t.document.write("<html><head><meta name='viewport' content='width=device-width, initial-scale=1.0' /><title>" + x + "</title></head><body style='font-size:85%'>");
        t.document.write("<pre>" + y + "</pre>");
        t.document.write("<hr><input type='button' value='" + s("Close", "Close") + "' onclick='window.close()' />");
        t.document.write("</body></html>");
        t.document.close();
      } else {
        t.document.open();
        t.document.write("<html><head><title>" + x + "</title></head><body style='font-size:85%'>");
        t.document.write("<table><tr><td><pre>" + y + "</pre></td></tr></table>");
        t.document.write("</body></html>");
        t.document.close();
        var u = t.document.body.firstChild;
        setTimeout(function() {
          var A = (t.outerHeight - t.innerHeight) || 30,
              z = (t.outerWidth - t.innerWidth) || 30,
              w,
              D;
          z = Math.max(140, Math.min(Math.floor(0.5 * screen.width), u.offsetWidth + z + 25));
          A = Math.max(40, Math.min(Math.floor(0.5 * screen.height), u.offsetHeight + A + 25));
          if (g.prototype.msieHeightBug) {
            A += 35;
          }
          t.resizeTo(z, A);
          var C;
          try {
            C = v.screenX;
          } catch (B) {}
          if (v && C != null) {
            w = Math.max(0, Math.min(v.screenX - Math.floor(z / 2), screen.width - z - 20));
            D = Math.max(0, Math.min(v.screenY - Math.floor(A / 2), screen.height - A - 20));
            t.moveTo(w, D);
          }
        }, 50);
      }
    };
    g.Scale = function() {
      var y = ["CommonHTML", "HTML-CSS", "SVG", "NativeMML", "PreviewHTML"],
          t = y.length,
          x = 100,
          v,
          u;
      for (v = 0; v < t; v++) {
        u = q[y[v]];
        if (u) {
          x = u.config.scale;
          break;
        }
      }
      var w = prompt(s("ScaleMath", "Scale all mathematics (compared to surrounding text) by"), x + "%");
      if (w) {
        if (w.match(/^\s*\d+(\.\d*)?\s*%?\s*$/)) {
          w = parseFloat(w);
          if (w) {
            if (w !== x) {
              for (v = 0; v < t; v++) {
                u = q[y[v]];
                if (u) {
                  u.config.scale = w;
                }
              }
              g.cookie.scale = f.config.scale = w;
              g.saveCookie();
              f.Queue(["Rerender", f]);
            }
          } else {
            alert(s("NonZeroScale", "The scale should not be zero"));
          }
        } else {
          alert(s("PercentScale", "The scale should be a percentage (e.g., 120%%)"));
        }
      }
    };
    g.Zoom = function() {
      if (!MathJax.Extension.MathZoom) {
        p.Require("[MathJax]/extensions/MathZoom.js");
      }
    };
    g.Renderer = function() {
      var u = f.outputJax["jax/mml"];
      if (u[0] !== r.settings.renderer) {
        var x = f.Browser,
            w,
            t = g.Renderer.Messages,
            v;
        switch (r.settings.renderer) {
          case "NativeMML":
            if (!r.settings.warnedMML) {
              if (x.isChrome && x.version.substr(0, 3) !== "24.") {
                w = t.MML.WebKit;
              } else {
                if (x.isSafari && !x.versionAtLeast("5.0")) {
                  w = t.MML.WebKit;
                } else {
                  if (x.isMSIE) {
                    if (!x.hasMathPlayer) {
                      w = t.MML.MSIE;
                    }
                  } else {
                    if (x.isEdge) {
                      w = t.MML.WebKit;
                    } else {
                      w = t.MML[x];
                    }
                  }
                }
              }
              v = "warnedMML";
            }
            break;
          case "SVG":
            if (!r.settings.warnedSVG) {
              if (x.isMSIE && !l) {
                w = t.SVG.MSIE;
              }
            }
            break;
        }
        if (w) {
          w = s(w[0], w[1]);
          w += "\n\n";
          w += s("SwitchAnyway", "Switch the renderer anyway?\n\n(Press OK to switch, CANCEL to continue with the current renderer)");
          g.cookie.renderer = u[0].id;
          g.saveCookie();
          if (!confirm(w)) {
            g.cookie.renderer = r.settings.renderer = n.Cookie.Get("menu").renderer;
            g.saveCookie();
            return;
          }
          if (v) {
            g.cookie.warned = r.settings.warned = true;
          }
          g.cookie.renderer = r.settings.renderer;
          g.saveCookie();
        }
        f.Queue(["setRenderer", f, r.settings.renderer, "jax/mml"], ["Rerender", f]);
      }
    };
    g.Renderer.Messages = {
      MML: {
        WebKit: ["WebkitNativeMMLWarning", "Your browser doesn't seem to support MathML natively, so switching to MathML output may cause the mathematics on the page to become unreadable."],
        MSIE: ["MSIENativeMMLWarning", "Internet Explorer requires the MathPlayer plugin in order to process MathML output."],
        Opera: ["OperaNativeMMLWarning", "Opera's support for MathML is limited, so switching to MathML output may cause some expressions to render poorly."],
        Safari: ["SafariNativeMMLWarning", "Your browser's native MathML does not implement all the features used by MathJax, so some expressions may not render properly."],
        Firefox: ["FirefoxNativeMMLWarning", "Your browser's native MathML does not implement all the features used by MathJax, so some expressions may not render properly."]
      },
      SVG: {MSIE: ["MSIESVGWarning", "SVG is not implemented in Internet Explorer prior to IE9 or when it is emulating IE8 or below. Switching to SVG output will cause the mathematics to not display properly."]}
    };
    g.AssistiveMML = function(v, t) {
      var u = MathJax.Extension.AssistiveMML;
      if (!u) {
        if (!t) {
          p.Require("[MathJax]/extensions/AssistiveMML.js", ["AssistiveMML", g, v, true]);
        }
        return;
      }
      MathJax.Hub.Queue([(r.settings.assistiveMML ? "Add" : "Remove") + "AssistiveMathML", u]);
    };
    g.Font = function() {
      var t = q["HTML-CSS"];
      if (!t) {
        return;
      }
      document.location.reload();
    };
    g.Locale = function() {
      MathJax.Localization.setLocale(r.settings.locale);
      MathJax.Hub.Queue(["Reprocess", MathJax.Hub]);
    };
    g.LoadLocale = function() {
      var t = prompt(s("LoadURL", "Load translation data from this URL:"));
      if (t) {
        if (!t.match(/\.js$/)) {
          alert(s("BadURL", "The URL should be for a javascript file that defines MathJax translation data.  Javascript file names should end with '.js'"));
        }
        p.Require(t, function(u) {
          if (u != p.STATUS.OK) {
            alert(s("BadData", "Failed to load translation data from %1", t));
          }
        });
      }
    };
    g.MPEvents = function(v) {
      var u = r.settings.discoverable,
          t = g.MPEvents.Messages;
      if (!l) {
        if (r.settings.mpMouse && !confirm(s.apply(s, t.IE8warning))) {
          delete g.cookie.mpContext;
          delete r.settings.mpContext;
          delete g.cookie.mpMouse;
          delete r.settings.mpMouse;
          g.saveCookie();
          return;
        }
        r.settings.mpContext = r.settings.mpMouse;
        g.cookie.mpContext = g.cookie.mpMouse = r.settings.mpMouse;
        g.saveCookie();
        MathJax.Hub.Queue(["Rerender", MathJax.Hub]);
      } else {
        if (!u && v.name[1] === "Menu Events" && r.settings.mpContext) {
          alert(s.apply(s, t.IE9warning));
        }
      }
    };
    g.MPEvents.Messages = {
      IE8warning: ["IE8warning", "This will disable the MathJax menu and zoom features, but you can Alt-Click on an expression to obtain the MathJax menu instead.\n\nReally change the MathPlayer settings?"],
      IE9warning: ["IE9warning", "The MathJax contextual menu will be disabled, but you can Alt-Click on an expression to obtain the MathJax menu instead."]
    };
    f.Browser.Select({
      MSIE: function(t) {
        var u = (document.compatMode === "BackCompat");
        var v = t.versionAtLeast("8.0") && document.documentMode > 7;
        g.Augment({
          margin: 20,
          msieBackgroundBug: ((document.documentMode || 0) < 9),
          msieFixedPositionBug: (u || !v),
          msieAboutBug: u,
          msieHeightBug: ((document.documentMode || 0) < 9)
        });
        if (l) {
          delete r.styles["#MathJax_About"].filter;
          delete r.styles[".MathJax_Menu"].filter;
        }
      },
      Firefox: function(t) {
        g.skipMouseover = t.isMobile && t.versionAtLeast("6.0");
        g.skipMousedown = t.isMobile;
      }
    });
    g.isMobile = f.Browser.isMobile;
    g.noContextMenu = f.Browser.noContextMenu;
    g.CreateLocaleMenu = function() {
      if (!g.menu) {
        return;
      }
      var y = g.menu.Find("Language").submenu,
          v = y.items;
      var u = [],
          A = MathJax.Localization.strings;
      for (var z in A) {
        if (A.hasOwnProperty(z)) {
          u.push(z);
        }
      }
      u = u.sort();
      y.items = [];
      for (var w = 0,
          t = u.length; w < t; w++) {
        var x = A[u[w]].menuTitle;
        if (x) {
          x += " (" + u[w] + ")";
        } else {
          x = u[w];
        }
        y.items.push(c.RADIO([u[w], x], "locale", {action: g.Locale}));
      }
      y.items.push(v[v.length - 2], v[v.length - 1]);
    };
    g.CreateAnnotationMenu = function() {
      if (!g.menu) {
        return;
      }
      var v = g.menu.Find("Show Math As", "Annotation").submenu;
      var u = r.semanticsAnnotations;
      for (var t in u) {
        if (u.hasOwnProperty(t)) {
          v.items.push(c.COMMAND([t, t], g.ShowSource, {
            hidden: true,
            nativeTouch: true,
            format: t
          }));
        }
      }
    };
    f.Register.StartupHook("End Config", function() {
      r.settings = f.config.menuSettings;
      if (typeof(r.settings.showRenderer) !== "undefined") {
        r.showRenderer = r.settings.showRenderer;
      }
      if (typeof(r.settings.showFontMenu) !== "undefined") {
        r.showFontMenu = r.settings.showFontMenu;
      }
      if (typeof(r.settings.showContext) !== "undefined") {
        r.showContext = r.settings.showContext;
      }
      g.getCookie();
      g.menu = g(c.SUBMENU(["Show", "Show Math As"], c.COMMAND(["MathMLcode", "MathML Code"], g.ShowSource, {
        nativeTouch: true,
        format: "MathML"
      }), c.COMMAND(["Original", "Original Form"], g.ShowSource, {nativeTouch: true}), c.SUBMENU(["Annotation", "Annotation"], {disabled: true}), c.RULE(), c.CHECKBOX(["texHints", "Show TeX hints in MathML"], "texHints"), c.CHECKBOX(["semantics", "Add original form as annotation"], "semantics")), c.RULE(), c.SUBMENU(["Settings", "Math Settings"], c.SUBMENU(["ZoomTrigger", "Zoom Trigger"], c.RADIO(["Hover", "Hover"], "zoom", {action: g.Zoom}), c.RADIO(["Click", "Click"], "zoom", {action: g.Zoom}), c.RADIO(["DoubleClick", "Double-Click"], "zoom", {action: g.Zoom}), c.RADIO(["NoZoom", "No Zoom"], "zoom", {value: "None"}), c.RULE(), c.LABEL(["TriggerRequires", "Trigger Requires:"]), c.CHECKBOX((f.Browser.isMac ? ["Option", "Option"] : ["Alt", "Alt"]), "ALT"), c.CHECKBOX(["Command", "Command"], "CMD", {hidden: !f.Browser.isMac}), c.CHECKBOX(["Control", "Control"], "CTRL", {hidden: f.Browser.isMac}), c.CHECKBOX(["Shift", "Shift"], "Shift")), c.SUBMENU(["ZoomFactor", "Zoom Factor"], c.RADIO("125%", "zscale"), c.RADIO("133%", "zscale"), c.RADIO("150%", "zscale"), c.RADIO("175%", "zscale"), c.RADIO("200%", "zscale"), c.RADIO("250%", "zscale"), c.RADIO("300%", "zscale"), c.RADIO("400%", "zscale")), c.RULE(), c.SUBMENU(["Renderer", "Math Renderer"], {hidden: !r.showRenderer}, c.RADIO(["HTML-CSS", "HTML-CSS"], "renderer", {action: g.Renderer}), c.RADIO(["CommonHTML", "Common HTML"], "renderer", {
        action: g.Renderer,
        value: "CommonHTML"
      }), c.RADIO(["PreviewHTML", "Preview HTML"], "renderer", {
        action: g.Renderer,
        value: "PreviewHTML"
      }), c.RADIO(["MathML", "MathML"], "renderer", {
        action: g.Renderer,
        value: "NativeMML"
      }), c.RADIO(["SVG", "SVG"], "renderer", {action: g.Renderer}), c.RADIO(["PlainSource", "Plain Source"], "renderer", {
        action: g.Renderer,
        value: "PlainSource"
      }), c.RULE(), c.CHECKBOX(["FastPreview", "Fast Preview"], "FastPreview"), c.CHECKBOX(["AssistiveMML", "Assistive MathML"], "assistiveMML", {action: g.AssistiveMML}), c.CHECKBOX(["InTabOrder", "Include in Tab Order"], "inTabOrder")), c.SUBMENU("MathPlayer", {
        hidden: !f.Browser.isMSIE || !r.showMathPlayer,
        disabled: !f.Browser.hasMathPlayer
      }, c.LABEL(["MPHandles", "Let MathPlayer Handle:"]), c.CHECKBOX(["MenuEvents", "Menu Events"], "mpContext", {
        action: g.MPEvents,
        hidden: !l
      }), c.CHECKBOX(["MouseEvents", "Mouse Events"], "mpMouse", {
        action: g.MPEvents,
        hidden: !l
      }), c.CHECKBOX(["MenuAndMouse", "Mouse and Menu Events"], "mpMouse", {
        action: g.MPEvents,
        hidden: l
      })), c.SUBMENU(["FontPrefs", "Font Preference"], {hidden: !r.showFontMenu}, c.LABEL(["ForHTMLCSS", "For HTML-CSS:"]), c.RADIO(["Auto", "Auto"], "font", {action: g.Font}), c.RULE(), c.RADIO(["TeXLocal", "TeX (local)"], "font", {action: g.Font}), c.RADIO(["TeXWeb", "TeX (web)"], "font", {action: g.Font}), c.RADIO(["TeXImage", "TeX (image)"], "font", {action: g.Font}), c.RULE(), c.RADIO(["STIXLocal", "STIX (local)"], "font", {action: g.Font}), c.RADIO(["STIXWeb", "STIX (web)"], "font", {action: g.Font}), c.RULE(), c.RADIO(["AsanaMathWeb", "Asana Math (web)"], "font", {action: g.Font}), c.RADIO(["GyrePagellaWeb", "Gyre Pagella (web)"], "font", {action: g.Font}), c.RADIO(["GyreTermesWeb", "Gyre Termes (web)"], "font", {action: g.Font}), c.RADIO(["LatinModernWeb", "Latin Modern (web)"], "font", {action: g.Font}), c.RADIO(["NeoEulerWeb", "Neo Euler (web)"], "font", {action: g.Font})), c.SUBMENU(["ContextMenu", "Contextual Menu"], {hidden: !r.showContext}, c.RADIO(["MathJax", "MathJax"], "context"), c.RADIO(["Browser", "Browser"], "context")), c.COMMAND(["Scale", "Scale All Math ..."], g.Scale), c.RULE().With({
        hidden: !r.showDiscoverable,
        name: ["", "discover_rule"]
      }), c.CHECKBOX(["Discoverable", "Highlight on Hover"], "discoverable", {hidden: !r.showDiscoverable})), c.SUBMENU(["Locale", "Language"], {
        hidden: !r.showLocale,
        ltr: true
      }, c.RADIO("en", "locale", {action: g.Locale}), c.RULE().With({
        hidden: !r.showLocaleURL,
        name: ["", "localURL_rule"]
      }), c.COMMAND(["LoadLocale", "Load from URL ..."], g.LoadLocale, {hidden: !r.showLocaleURL})), c.RULE(), c.COMMAND(["About", "About MathJax"], g.About), c.COMMAND(["Help", "MathJax Help"], g.Help));
      if (g.isMobile) {
        (function() {
          var u = r.settings;
          var t = g.menu.Find("Math Settings", "Zoom Trigger").submenu;
          t.items[0].disabled = t.items[1].disabled = true;
          if (u.zoom === "Hover" || u.zoom == "Click") {
            u.zoom = "None";
          }
          t.items = t.items.slice(0, 4);
          if (navigator.appVersion.match(/[ (]Android[) ]/)) {
            g.ITEM.SUBMENU.Augment({marker: "\u00BB"});
          }
        })();
      }
      g.CreateLocaleMenu();
      g.CreateAnnotationMenu();
    });
    g.showRenderer = function(t) {
      g.cookie.showRenderer = r.showRenderer = t;
      g.saveCookie();
      g.menu.Find("Math Settings", "Math Renderer").hidden = !t;
    };
    g.showMathPlayer = function(t) {
      g.cookie.showMathPlayer = r.showMathPlayer = t;
      g.saveCookie();
      g.menu.Find("Math Settings", "MathPlayer").hidden = !t;
    };
    g.showFontMenu = function(t) {
      g.cookie.showFontMenu = r.showFontMenu = t;
      g.saveCookie();
      g.menu.Find("Math Settings", "Font Preference").hidden = !t;
    };
    g.showContext = function(t) {
      g.cookie.showContext = r.showContext = t;
      g.saveCookie();
      g.menu.Find("Math Settings", "Contextual Menu").hidden = !t;
    };
    g.showDiscoverable = function(t) {
      g.cookie.showDiscoverable = r.showDiscoverable = t;
      g.saveCookie();
      g.menu.Find("Math Settings", "Highlight on Hover").hidden = !t;
      g.menu.Find("Math Settings", "discover_rule").hidden = !t;
    };
    g.showLocale = function(t) {
      g.cookie.showLocale = r.showLocale = t;
      g.saveCookie();
      g.menu.Find("Language").hidden = !t;
    };
    MathJax.Hub.Register.StartupHook("HTML-CSS Jax Ready", function() {
      if (!MathJax.OutputJax["HTML-CSS"].config.imageFont) {
        g.menu.Find("Math Settings", "Font Preference", "TeX (image)").disabled = true;
      }
    });
    e.Queue(f.Register.StartupHook("End Config", {}), ["Styles", p, r.styles], ["Post", f.Startup.signal, "MathMenu Ready"], ["loadComplete", p, "[MathJax]/extensions/MathMenu.js"]);
  })(MathJax.Hub, MathJax.HTML, MathJax.Ajax, MathJax.CallBack, MathJax.OutputJax);
  MathJax.ElementJax.mml = MathJax.ElementJax({mimeType: "jax/mml"}, {
    id: "mml",
    version: "2.6.0",
    directory: MathJax.ElementJax.directory + "/mml",
    extensionDir: MathJax.ElementJax.extensionDir + "/mml",
    optableDir: MathJax.ElementJax.directory + "/mml/optable"
  });
  MathJax.ElementJax.mml.Augment({Init: function() {
      if (arguments.length === 1 && arguments[0].type === "math") {
        this.root = arguments[0];
      } else {
        this.root = MathJax.ElementJax.mml.math.apply(this, arguments);
      }
      if (this.root.attr && this.root.attr.mode) {
        if (!this.root.display && this.root.attr.mode === "display") {
          this.root.display = "block";
          this.root.attrNames.push("display");
        }
        delete this.root.attr.mode;
        for (var b = 0,
            a = this.root.attrNames.length; b < a; b++) {
          if (this.root.attrNames[b] === "mode") {
            this.root.attrNames.splice(b, 1);
            break;
          }
        }
      }
    }}, {
    INHERIT: "_inherit_",
    AUTO: "_auto_",
    SIZE: {
      INFINITY: "infinity",
      SMALL: "small",
      NORMAL: "normal",
      BIG: "big"
    },
    COLOR: {TRANSPARENT: "transparent"},
    VARIANT: {
      NORMAL: "normal",
      BOLD: "bold",
      ITALIC: "italic",
      BOLDITALIC: "bold-italic",
      DOUBLESTRUCK: "double-struck",
      FRAKTUR: "fraktur",
      BOLDFRAKTUR: "bold-fraktur",
      SCRIPT: "script",
      BOLDSCRIPT: "bold-script",
      SANSSERIF: "sans-serif",
      BOLDSANSSERIF: "bold-sans-serif",
      SANSSERIFITALIC: "sans-serif-italic",
      SANSSERIFBOLDITALIC: "sans-serif-bold-italic",
      MONOSPACE: "monospace",
      INITIAL: "inital",
      TAILED: "tailed",
      LOOPED: "looped",
      STRETCHED: "stretched",
      CALIGRAPHIC: "-tex-caligraphic",
      OLDSTYLE: "-tex-oldstyle"
    },
    FORM: {
      PREFIX: "prefix",
      INFIX: "infix",
      POSTFIX: "postfix"
    },
    LINEBREAK: {
      AUTO: "auto",
      NEWLINE: "newline",
      NOBREAK: "nobreak",
      GOODBREAK: "goodbreak",
      BADBREAK: "badbreak"
    },
    LINEBREAKSTYLE: {
      BEFORE: "before",
      AFTER: "after",
      DUPLICATE: "duplicate",
      INFIXLINBREAKSTYLE: "infixlinebreakstyle"
    },
    INDENTALIGN: {
      LEFT: "left",
      CENTER: "center",
      RIGHT: "right",
      AUTO: "auto",
      ID: "id",
      INDENTALIGN: "indentalign"
    },
    INDENTSHIFT: {INDENTSHIFT: "indentshift"},
    LINETHICKNESS: {
      THIN: "thin",
      MEDIUM: "medium",
      THICK: "thick"
    },
    NOTATION: {
      LONGDIV: "longdiv",
      ACTUARIAL: "actuarial",
      RADICAL: "radical",
      BOX: "box",
      ROUNDEDBOX: "roundedbox",
      CIRCLE: "circle",
      LEFT: "left",
      RIGHT: "right",
      TOP: "top",
      BOTTOM: "bottom",
      UPDIAGONALSTRIKE: "updiagonalstrike",
      DOWNDIAGONALSTRIKE: "downdiagonalstrike",
      UPDIAGONALARROW: "updiagonalarrow",
      VERTICALSTRIKE: "verticalstrike",
      HORIZONTALSTRIKE: "horizontalstrike",
      PHASORANGLE: "phasorangle",
      MADRUWB: "madruwb"
    },
    ALIGN: {
      TOP: "top",
      BOTTOM: "bottom",
      CENTER: "center",
      BASELINE: "baseline",
      AXIS: "axis",
      LEFT: "left",
      RIGHT: "right"
    },
    LINES: {
      NONE: "none",
      SOLID: "solid",
      DASHED: "dashed"
    },
    SIDE: {
      LEFT: "left",
      RIGHT: "right",
      LEFTOVERLAP: "leftoverlap",
      RIGHTOVERLAP: "rightoverlap"
    },
    WIDTH: {
      AUTO: "auto",
      FIT: "fit"
    },
    ACTIONTYPE: {
      TOGGLE: "toggle",
      STATUSLINE: "statusline",
      TOOLTIP: "tooltip",
      INPUT: "input"
    },
    LENGTH: {
      VERYVERYTHINMATHSPACE: "veryverythinmathspace",
      VERYTHINMATHSPACE: "verythinmathspace",
      THINMATHSPACE: "thinmathspace",
      MEDIUMMATHSPACE: "mediummathspace",
      THICKMATHSPACE: "thickmathspace",
      VERYTHICKMATHSPACE: "verythickmathspace",
      VERYVERYTHICKMATHSPACE: "veryverythickmathspace",
      NEGATIVEVERYVERYTHINMATHSPACE: "negativeveryverythinmathspace",
      NEGATIVEVERYTHINMATHSPACE: "negativeverythinmathspace",
      NEGATIVETHINMATHSPACE: "negativethinmathspace",
      NEGATIVEMEDIUMMATHSPACE: "negativemediummathspace",
      NEGATIVETHICKMATHSPACE: "negativethickmathspace",
      NEGATIVEVERYTHICKMATHSPACE: "negativeverythickmathspace",
      NEGATIVEVERYVERYTHICKMATHSPACE: "negativeveryverythickmathspace"
    },
    OVERFLOW: {
      LINBREAK: "linebreak",
      SCROLL: "scroll",
      ELIDE: "elide",
      TRUNCATE: "truncate",
      SCALE: "scale"
    },
    UNIT: {
      EM: "em",
      EX: "ex",
      PX: "px",
      IN: "in",
      CM: "cm",
      MM: "mm",
      PT: "pt",
      PC: "pc"
    },
    TEXCLASS: {
      ORD: 0,
      OP: 1,
      BIN: 2,
      REL: 3,
      OPEN: 4,
      CLOSE: 5,
      PUNCT: 6,
      INNER: 7,
      VCENTER: 8,
      NONE: -1
    },
    TEXCLASSNAMES: ["ORD", "OP", "BIN", "REL", "OPEN", "CLOSE", "PUNCT", "INNER", "VCENTER"],
    skipAttributes: {
      texClass: true,
      useHeight: true,
      texprimestyle: true
    },
    copyAttributes: {
      displaystyle: 1,
      scriptlevel: 1,
      open: 1,
      close: 1,
      form: 1,
      actiontype: 1,
      fontfamily: true,
      fontsize: true,
      fontweight: true,
      fontstyle: true,
      color: true,
      background: true,
      id: true,
      "class": 1,
      href: true,
      style: true
    },
    copyAttributeNames: ["displaystyle", "scriptlevel", "open", "close", "form", "actiontype", "fontfamily", "fontsize", "fontweight", "fontstyle", "color", "background", "id", "class", "href", "style"],
    nocopyAttributes: {
      fontfamily: true,
      fontsize: true,
      fontweight: true,
      fontstyle: true,
      color: true,
      background: true,
      id: true,
      "class": true,
      href: true,
      style: true,
      xmlns: true
    },
    Error: function(d, e) {
      var c = this.merror(d),
          b = MathJax.Localization.fontDirection(),
          a = MathJax.Localization.fontFamily();
      if (e) {
        c = c.With(e);
      }
      if (b || a) {
        c = this.mstyle(c);
        if (b) {
          c.dir = b;
        }
        if (a) {
          c.style.fontFamily = "font-family: " + a;
        }
      }
      return c;
    }
  });
  (function(a) {
    a.mbase = MathJax.Object.Subclass({
      type: "base",
      isToken: false,
      defaults: {
        mathbackground: a.INHERIT,
        mathcolor: a.INHERIT,
        dir: a.INHERIT
      },
      noInherit: {},
      noInheritAttribute: {texClass: true},
      getRemoved: {},
      linebreakContainer: false,
      Init: function() {
        this.data = [];
        if (this.inferRow && !(arguments.length === 1 && arguments[0].inferred)) {
          this.Append(a.mrow().With({
            inferred: true,
            notParent: true
          }));
        }
        this.Append.apply(this, arguments);
      },
      With: function(e) {
        for (var f in e) {
          if (e.hasOwnProperty(f)) {
            this[f] = e[f];
          }
        }
        return this;
      },
      Append: function() {
        if (this.inferRow && this.data.length) {
          this.data[0].Append.apply(this.data[0], arguments);
        } else {
          for (var f = 0,
              e = arguments.length; f < e; f++) {
            this.SetData(this.data.length, arguments[f]);
          }
        }
      },
      SetData: function(e, f) {
        if (f != null) {
          if (!(f instanceof a.mbase)) {
            f = (this.isToken || this.isChars ? a.chars(f) : a.mtext(f));
          }
          f.parent = this;
          f.setInherit(this.inheritFromMe ? this : this.inherit);
        }
        this.data[e] = f;
      },
      Parent: function() {
        var e = this.parent;
        while (e && e.notParent) {
          e = e.parent;
        }
        return e;
      },
      Get: function(f, k, l) {
        if (!l) {
          if (this[f] != null) {
            return this[f];
          }
          if (this.attr && this.attr[f] != null) {
            return this.attr[f];
          }
        }
        var g = this.Parent();
        if (g && g["adjustChild_" + f] != null) {
          return (g["adjustChild_" + f])(this.childPosition(), k);
        }
        var j = this.inherit;
        var e = j;
        while (j) {
          var i = j[f];
          if (i == null && j.attr) {
            i = j.attr[f];
          }
          if (j.removedStyles && j.getRemoved[f] && i == null) {
            i = j.removedStyles[j.getRemoved[f]];
          }
          if (i != null && j.noInheritAttribute && !j.noInheritAttribute[f]) {
            var h = j.noInherit[this.type];
            if (!(h && h[f])) {
              return i;
            }
          }
          e = j;
          j = j.inherit;
        }
        if (!k) {
          if (this.defaults[f] === a.AUTO) {
            return this.autoDefault(f);
          }
          if (this.defaults[f] !== a.INHERIT && this.defaults[f] != null) {
            return this.defaults[f];
          }
          if (e) {
            return e.defaults[f];
          }
        }
        return null;
      },
      hasValue: function(e) {
        return (this.Get(e, true) != null);
      },
      getValues: function() {
        var f = {};
        for (var g = 0,
            e = arguments.length; g < e; g++) {
          f[arguments[g]] = this.Get(arguments[g]);
        }
        return f;
      },
      adjustChild_scriptlevel: function(f, e) {
        return this.Get("scriptlevel", e);
      },
      adjustChild_displaystyle: function(f, e) {
        return this.Get("displaystyle", e);
      },
      adjustChild_texprimestyle: function(f, e) {
        return this.Get("texprimestyle", e);
      },
      childPosition: function() {
        var h = this,
            g = h.parent;
        while (g.notParent) {
          h = g;
          g = h.parent;
        }
        for (var f = 0,
            e = g.data.length; f < e; f++) {
          if (g.data[f] === h) {
            return f;
          }
        }
        return null;
      },
      setInherit: function(g) {
        if (g !== this.inherit && this.inherit == null) {
          this.inherit = g;
          for (var f = 0,
              e = this.data.length; f < e; f++) {
            if (this.data[f] && this.data[f].setInherit) {
              this.data[f].setInherit(g);
            }
          }
        }
      },
      setTeXclass: function(e) {
        this.getPrevClass(e);
        return (typeof(this.texClass) !== "undefined" ? this : e);
      },
      getPrevClass: function(e) {
        if (e) {
          this.prevClass = e.Get("texClass");
          this.prevLevel = e.Get("scriptlevel");
        }
      },
      updateTeXclass: function(e) {
        if (e) {
          this.prevClass = e.prevClass;
          delete e.prevClass;
          this.prevLevel = e.prevLevel;
          delete e.prevLevel;
          this.texClass = e.Get("texClass");
        }
      },
      texSpacing: function() {
        var f = (this.prevClass != null ? this.prevClass : a.TEXCLASS.NONE);
        var e = (this.Get("texClass") || a.TEXCLASS.ORD);
        if (f === a.TEXCLASS.NONE || e === a.TEXCLASS.NONE) {
          return "";
        }
        if (f === a.TEXCLASS.VCENTER) {
          f = a.TEXCLASS.ORD;
        }
        if (e === a.TEXCLASS.VCENTER) {
          e = a.TEXCLASS.ORD;
        }
        var g = this.TEXSPACE[f][e];
        if (this.prevLevel > 0 && this.Get("scriptlevel") > 0 && g >= 0) {
          return "";
        }
        return this.TEXSPACELENGTH[Math.abs(g)];
      },
      TEXSPACELENGTH: ["", a.LENGTH.THINMATHSPACE, a.LENGTH.MEDIUMMATHSPACE, a.LENGTH.THICKMATHSPACE],
      TEXSPACE: [[0, -1, 2, 3, 0, 0, 0, 1], [-1, -1, 0, 3, 0, 0, 0, 1], [2, 2, 0, 0, 2, 0, 0, 2], [3, 3, 0, 0, 3, 0, 0, 3], [0, 0, 0, 0, 0, 0, 0, 0], [0, -1, 2, 3, 0, 0, 0, 1], [1, 1, 0, 1, 1, 1, 1, 1], [1, -1, 2, 3, 1, 0, 1, 1]],
      autoDefault: function(e) {
        return "";
      },
      isSpacelike: function() {
        return false;
      },
      isEmbellished: function() {
        return false;
      },
      Core: function() {
        return this;
      },
      CoreMO: function() {
        return this;
      },
      childIndex: function(g) {
        if (g == null) {
          return;
        }
        for (var f = 0,
            e = this.data.length; f < e; f++) {
          if (g === this.data[f]) {
            return f;
          }
        }
      },
      CoreIndex: function() {
        return (this.inferRow ? this.data[0] || this : this).childIndex(this.Core());
      },
      hasNewline: function() {
        if (this.isEmbellished()) {
          return this.CoreMO().hasNewline();
        }
        if (this.isToken || this.linebreakContainer) {
          return false;
        }
        for (var f = 0,
            e = this.data.length; f < e; f++) {
          if (this.data[f] && this.data[f].hasNewline()) {
            return true;
          }
        }
        return false;
      },
      array: function() {
        if (this.inferred) {
          return this.data;
        } else {
          return [this];
        }
      },
      toString: function() {
        return this.type + "(" + this.data.join(",") + ")";
      },
      getAnnotation: function() {
        return null;
      }
    }, {
      childrenSpacelike: function() {
        for (var f = 0,
            e = this.data.length; f < e; f++) {
          if (!this.data[f].isSpacelike()) {
            return false;
          }
        }
        return true;
      },
      childEmbellished: function() {
        return (this.data[0] && this.data[0].isEmbellished());
      },
      childCore: function() {
        return (this.inferRow && this.data[0] ? this.data[0].Core() : this.data[0]);
      },
      childCoreMO: function() {
        return (this.data[0] ? this.data[0].CoreMO() : null);
      },
      setChildTeXclass: function(e) {
        if (this.data[0]) {
          e = this.data[0].setTeXclass(e);
          this.updateTeXclass(this.data[0]);
        }
        return e;
      },
      setBaseTeXclasses: function(g) {
        this.getPrevClass(g);
        this.texClass = null;
        if (this.data[0]) {
          if (this.isEmbellished() || this.data[0].isa(a.mi)) {
            g = this.data[0].setTeXclass(g);
            this.updateTeXclass(this.Core());
          } else {
            this.data[0].setTeXclass();
            g = this;
          }
        } else {
          g = this;
        }
        for (var f = 1,
            e = this.data.length; f < e; f++) {
          if (this.data[f]) {
            this.data[f].setTeXclass();
          }
        }
        return g;
      },
      setSeparateTeXclasses: function(g) {
        this.getPrevClass(g);
        for (var f = 0,
            e = this.data.length; f < e; f++) {
          if (this.data[f]) {
            this.data[f].setTeXclass();
          }
        }
        if (this.isEmbellished()) {
          this.updateTeXclass(this.Core());
        }
        return this;
      }
    });
    a.mi = a.mbase.Subclass({
      type: "mi",
      isToken: true,
      texClass: a.TEXCLASS.ORD,
      defaults: {
        mathvariant: a.AUTO,
        mathsize: a.INHERIT,
        mathbackground: a.INHERIT,
        mathcolor: a.INHERIT,
        dir: a.INHERIT
      },
      autoDefault: function(f) {
        if (f === "mathvariant") {
          var e = (this.data[0] || "").toString();
          return (e.length === 1 || (e.length === 2 && e.charCodeAt(0) >= 55296 && e.charCodeAt(0) < 56320) ? a.VARIANT.ITALIC : a.VARIANT.NORMAL);
        }
        return "";
      },
      setTeXclass: function(f) {
        this.getPrevClass(f);
        var e = this.data.join("");
        if (e.length > 1 && e.match(/^[a-z][a-z0-9]*$/i) && this.texClass === a.TEXCLASS.ORD) {
          this.texClass = a.TEXCLASS.OP;
          this.autoOP = true;
        }
        return this;
      }
    });
    a.mn = a.mbase.Subclass({
      type: "mn",
      isToken: true,
      texClass: a.TEXCLASS.ORD,
      defaults: {
        mathvariant: a.INHERIT,
        mathsize: a.INHERIT,
        mathbackground: a.INHERIT,
        mathcolor: a.INHERIT,
        dir: a.INHERIT
      }
    });
    a.mo = a.mbase.Subclass({
      type: "mo",
      isToken: true,
      defaults: {
        mathvariant: a.INHERIT,
        mathsize: a.INHERIT,
        mathbackground: a.INHERIT,
        mathcolor: a.INHERIT,
        dir: a.INHERIT,
        form: a.AUTO,
        fence: a.AUTO,
        separator: a.AUTO,
        lspace: a.AUTO,
        rspace: a.AUTO,
        stretchy: a.AUTO,
        symmetric: a.AUTO,
        maxsize: a.AUTO,
        minsize: a.AUTO,
        largeop: a.AUTO,
        movablelimits: a.AUTO,
        accent: a.AUTO,
        linebreak: a.LINEBREAK.AUTO,
        lineleading: a.INHERIT,
        linebreakstyle: a.AUTO,
        linebreakmultchar: a.INHERIT,
        indentalign: a.INHERIT,
        indentshift: a.INHERIT,
        indenttarget: a.INHERIT,
        indentalignfirst: a.INHERIT,
        indentshiftfirst: a.INHERIT,
        indentalignlast: a.INHERIT,
        indentshiftlast: a.INHERIT,
        texClass: a.AUTO
      },
      defaultDef: {
        form: a.FORM.INFIX,
        fence: false,
        separator: false,
        lspace: a.LENGTH.THICKMATHSPACE,
        rspace: a.LENGTH.THICKMATHSPACE,
        stretchy: false,
        symmetric: false,
        maxsize: a.SIZE.INFINITY,
        minsize: "0em",
        largeop: false,
        movablelimits: false,
        accent: false,
        linebreak: a.LINEBREAK.AUTO,
        lineleading: "1ex",
        linebreakstyle: "before",
        indentalign: a.INDENTALIGN.AUTO,
        indentshift: "0",
        indenttarget: "",
        indentalignfirst: a.INDENTALIGN.INDENTALIGN,
        indentshiftfirst: a.INDENTSHIFT.INDENTSHIFT,
        indentalignlast: a.INDENTALIGN.INDENTALIGN,
        indentshiftlast: a.INDENTSHIFT.INDENTSHIFT,
        texClass: a.TEXCLASS.REL
      },
      SPACE_ATTR: {
        lspace: 1,
        rspace: 2,
        form: 4
      },
      useMMLspacing: 7,
      autoDefault: function(g, n) {
        var l = this.def;
        if (!l) {
          if (g === "form") {
            this.useMMLspacing &= ~this.SPACE_ATTR.form;
            return this.getForm();
          }
          var k = this.data.join("");
          var f = [this.Get("form"), a.FORM.INFIX, a.FORM.POSTFIX, a.FORM.PREFIX];
          for (var h = 0,
              e = f.length; h < e; h++) {
            var j = this.OPTABLE[f[h]][k];
            if (j) {
              l = this.makeDef(j);
              break;
            }
          }
          if (!l) {
            l = this.CheckRange(k);
          }
          if (!l && n) {
            l = {};
          } else {
            if (!l) {
              l = MathJax.Hub.Insert({}, this.defaultDef);
            }
            if (this.parent) {
              this.def = l;
            } else {
              l = MathJax.Hub.Insert({}, l);
            }
            l.form = f[0];
          }
        }
        this.useMMLspacing &= ~(this.SPACE_ATTR[g] || 0);
        if (l[g] != null) {
          return l[g];
        } else {
          if (!n) {
            return this.defaultDef[g];
          }
        }
        return "";
      },
      CheckRange: function(j) {
        var k = j.charCodeAt(0);
        if (k >= 55296 && k < 56320) {
          k = (((k - 55296) << 10) + (j.charCodeAt(1) - 56320)) + 65536;
        }
        for (var g = 0,
            e = this.RANGES.length; g < e && this.RANGES[g][0] <= k; g++) {
          if (k <= this.RANGES[g][1]) {
            if (this.RANGES[g][3]) {
              var f = a.optableDir + "/" + this.RANGES[g][3] + ".js";
              this.RANGES[g][3] = null;
              MathJax.Hub.RestartAfter(MathJax.Ajax.Require(f));
            }
            var h = a.TEXCLASSNAMES[this.RANGES[g][2]];
            h = this.OPTABLE.infix[j] = a.mo.OPTYPES[h === "BIN" ? "BIN3" : h];
            return this.makeDef(h);
          }
        }
        return null;
      },
      makeDef: function(f) {
        if (f[2] == null) {
          f[2] = this.defaultDef.texClass;
        }
        if (!f[3]) {
          f[3] = {};
        }
        var e = MathJax.Hub.Insert({}, f[3]);
        e.lspace = this.SPACE[f[0]];
        e.rspace = this.SPACE[f[1]];
        e.texClass = f[2];
        if (e.texClass === a.TEXCLASS.REL && (this.movablelimits || this.data.join("").match(/^[a-z]+$/i))) {
          e.texClass = a.TEXCLASS.OP;
        }
        return e;
      },
      getForm: function() {
        var e = this,
            g = this.parent,
            f = this.Parent();
        while (f && f.isEmbellished()) {
          e = g;
          g = f.parent;
          f = f.Parent();
        }
        if (g && g.type === "mrow" && g.NonSpaceLength() !== 1) {
          if (g.FirstNonSpace() === e) {
            return a.FORM.PREFIX;
          }
          if (g.LastNonSpace() === e) {
            return a.FORM.POSTFIX;
          }
        }
        return a.FORM.INFIX;
      },
      isEmbellished: function() {
        return true;
      },
      hasNewline: function() {
        return (this.Get("linebreak") === a.LINEBREAK.NEWLINE);
      },
      CoreParent: function() {
        var e = this;
        while (e && e.isEmbellished() && e.CoreMO() === this && !e.isa(a.math)) {
          e = e.Parent();
        }
        return e;
      },
      CoreText: function(e) {
        if (!e) {
          return "";
        }
        if (e.isEmbellished()) {
          return e.CoreMO().data.join("");
        }
        while ((((e.isa(a.mrow) || e.isa(a.TeXAtom) || e.isa(a.mstyle) || e.isa(a.mphantom)) && e.data.length === 1) || e.isa(a.munderover)) && e.data[0]) {
          e = e.data[0];
        }
        if (!e.isToken) {
          return "";
        } else {
          return e.data.join("");
        }
      },
      remapChars: {
        "*": "\u2217",
        '"': "\u2033",
        "\u00B0": "\u2218",
        "\u00B2": "2",
        "\u00B3": "3",
        "\u00B4": "\u2032",
        "\u00B9": "1"
      },
      remap: function(f, e) {
        f = f.replace(/-/g, "\u2212");
        if (e) {
          f = f.replace(/'/g, "\u2032").replace(/`/g, "\u2035");
          if (f.length === 1) {
            f = e[f] || f;
          }
        }
        return f;
      },
      setTeXclass: function(f) {
        var e = this.getValues("form", "lspace", "rspace", "fence");
        if (this.useMMLspacing) {
          this.texClass = a.TEXCLASS.NONE;
          return this;
        }
        if (e.fence && !this.texClass) {
          if (e.form === a.FORM.PREFIX) {
            this.texClass = a.TEXCLASS.OPEN;
          }
          if (e.form === a.FORM.POSTFIX) {
            this.texClass = a.TEXCLASS.CLOSE;
          }
        }
        this.texClass = this.Get("texClass");
        if (this.data.join("") === "\u2061") {
          if (f) {
            f.texClass = a.TEXCLASS.OP;
            f.fnOP = true;
          }
          this.texClass = this.prevClass = a.TEXCLASS.NONE;
          return f;
        }
        return this.adjustTeXclass(f);
      },
      adjustTeXclass: function(f) {
        if (this.texClass === a.TEXCLASS.NONE) {
          return f;
        }
        if (f) {
          if (f.autoOP && (this.texClass === a.TEXCLASS.BIN || this.texClass === a.TEXCLASS.REL)) {
            f.texClass = a.TEXCLASS.ORD;
          }
          this.prevClass = f.texClass || a.TEXCLASS.ORD;
          this.prevLevel = f.Get("scriptlevel");
        } else {
          this.prevClass = a.TEXCLASS.NONE;
        }
        if (this.texClass === a.TEXCLASS.BIN && (this.prevClass === a.TEXCLASS.NONE || this.prevClass === a.TEXCLASS.BIN || this.prevClass === a.TEXCLASS.OP || this.prevClass === a.TEXCLASS.REL || this.prevClass === a.TEXCLASS.OPEN || this.prevClass === a.TEXCLASS.PUNCT)) {
          this.texClass = a.TEXCLASS.ORD;
        } else {
          if (this.prevClass === a.TEXCLASS.BIN && (this.texClass === a.TEXCLASS.REL || this.texClass === a.TEXCLASS.CLOSE || this.texClass === a.TEXCLASS.PUNCT)) {
            f.texClass = this.prevClass = a.TEXCLASS.ORD;
          } else {
            if (this.texClass === a.TEXCLASS.BIN) {
              var g = this,
                  e = this.parent;
              while (e && e.parent && e.isEmbellished() && (e.data.length === 1 || (e.type !== "mrow" && e.Core() === g))) {
                g = e;
                e = e.parent;
              }
              if (e.data[e.data.length - 1] === g) {
                this.texClass = a.TEXCLASS.ORD;
              }
            }
          }
        }
        return this;
      }
    });
    a.mtext = a.mbase.Subclass({
      type: "mtext",
      isToken: true,
      isSpacelike: function() {
        return true;
      },
      texClass: a.TEXCLASS.ORD,
      defaults: {
        mathvariant: a.INHERIT,
        mathsize: a.INHERIT,
        mathbackground: a.INHERIT,
        mathcolor: a.INHERIT,
        dir: a.INHERIT
      }
    });
    a.mspace = a.mbase.Subclass({
      type: "mspace",
      isToken: true,
      isSpacelike: function() {
        return true;
      },
      defaults: {
        mathbackground: a.INHERIT,
        mathcolor: a.INHERIT,
        width: "0em",
        height: "0ex",
        depth: "0ex",
        linebreak: a.LINEBREAK.AUTO
      },
      hasDimAttr: function() {
        return (this.hasValue("width") || this.hasValue("height") || this.hasValue("depth"));
      },
      hasNewline: function() {
        return (!this.hasDimAttr() && this.Get("linebreak") === a.LINEBREAK.NEWLINE);
      }
    });
    a.ms = a.mbase.Subclass({
      type: "ms",
      isToken: true,
      texClass: a.TEXCLASS.ORD,
      defaults: {
        mathvariant: a.INHERIT,
        mathsize: a.INHERIT,
        mathbackground: a.INHERIT,
        mathcolor: a.INHERIT,
        dir: a.INHERIT,
        lquote: '"',
        rquote: '"'
      }
    });
    a.mglyph = a.mbase.Subclass({
      type: "mglyph",
      isToken: true,
      texClass: a.TEXCLASS.ORD,
      defaults: {
        mathbackground: a.INHERIT,
        mathcolor: a.INHERIT,
        alt: "",
        src: "",
        width: a.AUTO,
        height: a.AUTO,
        valign: "0em"
      }
    });
    a.mrow = a.mbase.Subclass({
      type: "mrow",
      isSpacelike: a.mbase.childrenSpacelike,
      inferred: false,
      notParent: false,
      isEmbellished: function() {
        var f = false;
        for (var g = 0,
            e = this.data.length; g < e; g++) {
          if (this.data[g] == null) {
            continue;
          }
          if (this.data[g].isEmbellished()) {
            if (f) {
              return false;
            }
            f = true;
            this.core = g;
          } else {
            if (!this.data[g].isSpacelike()) {
              return false;
            }
          }
        }
        return f;
      },
      NonSpaceLength: function() {
        var g = 0;
        for (var f = 0,
            e = this.data.length; f < e; f++) {
          if (this.data[f] && !this.data[f].isSpacelike()) {
            g++;
          }
        }
        return g;
      },
      FirstNonSpace: function() {
        for (var f = 0,
            e = this.data.length; f < e; f++) {
          if (this.data[f] && !this.data[f].isSpacelike()) {
            return this.data[f];
          }
        }
        return null;
      },
      LastNonSpace: function() {
        for (var e = this.data.length - 1; e >= 0; e--) {
          if (this.data[0] && !this.data[e].isSpacelike()) {
            return this.data[e];
          }
        }
        return null;
      },
      Core: function() {
        if (!(this.isEmbellished()) || typeof(this.core) === "undefined") {
          return this;
        }
        return this.data[this.core];
      },
      CoreMO: function() {
        if (!(this.isEmbellished()) || typeof(this.core) === "undefined") {
          return this;
        }
        return this.data[this.core].CoreMO();
      },
      toString: function() {
        if (this.inferred) {
          return "[" + this.data.join(",") + "]";
        }
        return this.SUPER(arguments).toString.call(this);
      },
      setTeXclass: function(g) {
        var f,
            e = this.data.length;
        if ((this.open || this.close) && (!g || !g.fnOP)) {
          this.getPrevClass(g);
          g = null;
          for (f = 0; f < e; f++) {
            if (this.data[f]) {
              g = this.data[f].setTeXclass(g);
            }
          }
          if (!this.hasOwnProperty("texClass")) {
            this.texClass = a.TEXCLASS.INNER;
          }
          return this;
        } else {
          for (f = 0; f < e; f++) {
            if (this.data[f]) {
              g = this.data[f].setTeXclass(g);
            }
          }
          if (this.data[0]) {
            this.updateTeXclass(this.data[0]);
          }
          return g;
        }
      },
      getAnnotation: function(e) {
        if (this.data.length != 1) {
          return null;
        }
        return this.data[0].getAnnotation(e);
      }
    });
    a.mfrac = a.mbase.Subclass({
      type: "mfrac",
      num: 0,
      den: 1,
      linebreakContainer: true,
      isEmbellished: a.mbase.childEmbellished,
      Core: a.mbase.childCore,
      CoreMO: a.mbase.childCoreMO,
      defaults: {
        mathbackground: a.INHERIT,
        mathcolor: a.INHERIT,
        linethickness: a.LINETHICKNESS.MEDIUM,
        numalign: a.ALIGN.CENTER,
        denomalign: a.ALIGN.CENTER,
        bevelled: false
      },
      adjustChild_displaystyle: function(e) {
        return false;
      },
      adjustChild_scriptlevel: function(f) {
        var e = this.Get("scriptlevel");
        if (!this.Get("displaystyle") || e > 0) {
          e++;
        }
        return e;
      },
      adjustChild_texprimestyle: function(e) {
        if (e == this.den) {
          return true;
        }
        return this.Get("texprimestyle");
      },
      setTeXclass: a.mbase.setSeparateTeXclasses
    });
    a.msqrt = a.mbase.Subclass({
      type: "msqrt",
      inferRow: true,
      linebreakContainer: true,
      texClass: a.TEXCLASS.ORD,
      setTeXclass: a.mbase.setSeparateTeXclasses,
      adjustChild_texprimestyle: function(e) {
        return true;
      }
    });
    a.mroot = a.mbase.Subclass({
      type: "mroot",
      linebreakContainer: true,
      texClass: a.TEXCLASS.ORD,
      adjustChild_displaystyle: function(e) {
        if (e === 1) {
          return false;
        }
        return this.Get("displaystyle");
      },
      adjustChild_scriptlevel: function(f) {
        var e = this.Get("scriptlevel");
        if (f === 1) {
          e += 2;
        }
        return e;
      },
      adjustChild_texprimestyle: function(e) {
        if (e === 0) {
          return true;
        }
        return this.Get("texprimestyle");
      },
      setTeXclass: a.mbase.setSeparateTeXclasses
    });
    a.mstyle = a.mbase.Subclass({
      type: "mstyle",
      isSpacelike: a.mbase.childrenSpacelike,
      isEmbellished: a.mbase.childEmbellished,
      Core: a.mbase.childCore,
      CoreMO: a.mbase.childCoreMO,
      inferRow: true,
      defaults: {
        scriptlevel: a.INHERIT,
        displaystyle: a.INHERIT,
        scriptsizemultiplier: Math.sqrt(1 / 2),
        scriptminsize: "8pt",
        mathbackground: a.INHERIT,
        mathcolor: a.INHERIT,
        dir: a.INHERIT,
        infixlinebreakstyle: a.LINEBREAKSTYLE.BEFORE,
        decimalseparator: "."
      },
      adjustChild_scriptlevel: function(g) {
        var f = this.scriptlevel;
        if (f == null) {
          f = this.Get("scriptlevel");
        } else {
          if (String(f).match(/^ *[-+]/)) {
            var e = this.Get("scriptlevel", null, true);
            f = e + parseInt(f);
          }
        }
        return f;
      },
      inheritFromMe: true,
      noInherit: {
        mpadded: {
          width: true,
          height: true,
          depth: true,
          lspace: true,
          voffset: true
        },
        mtable: {
          width: true,
          height: true,
          depth: true,
          align: true
        }
      },
      getRemoved: {
        fontfamily: "fontFamily",
        fontweight: "fontWeight",
        fontstyle: "fontStyle",
        fontsize: "fontSize"
      },
      setTeXclass: a.mbase.setChildTeXclass
    });
    a.merror = a.mbase.Subclass({
      type: "merror",
      inferRow: true,
      linebreakContainer: true,
      texClass: a.TEXCLASS.ORD
    });
    a.mpadded = a.mbase.Subclass({
      type: "mpadded",
      inferRow: true,
      isSpacelike: a.mbase.childrenSpacelike,
      isEmbellished: a.mbase.childEmbellished,
      Core: a.mbase.childCore,
      CoreMO: a.mbase.childCoreMO,
      defaults: {
        mathbackground: a.INHERIT,
        mathcolor: a.INHERIT,
        width: "",
        height: "",
        depth: "",
        lspace: 0,
        voffset: 0
      },
      setTeXclass: a.mbase.setChildTeXclass
    });
    a.mphantom = a.mbase.Subclass({
      type: "mphantom",
      texClass: a.TEXCLASS.ORD,
      inferRow: true,
      isSpacelike: a.mbase.childrenSpacelike,
      isEmbellished: a.mbase.childEmbellished,
      Core: a.mbase.childCore,
      CoreMO: a.mbase.childCoreMO,
      setTeXclass: a.mbase.setChildTeXclass
    });
    a.mfenced = a.mbase.Subclass({
      type: "mfenced",
      defaults: {
        mathbackground: a.INHERIT,
        mathcolor: a.INHERIT,
        open: "(",
        close: ")",
        separators: ","
      },
      addFakeNodes: function() {
        var f = this.getValues("open", "close", "separators");
        f.open = f.open.replace(/[ \t\n\r]/g, "");
        f.close = f.close.replace(/[ \t\n\r]/g, "");
        f.separators = f.separators.replace(/[ \t\n\r]/g, "");
        if (f.open !== "") {
          this.SetData("open", a.mo(f.open).With({
            fence: true,
            form: a.FORM.PREFIX,
            texClass: a.TEXCLASS.OPEN
          }));
          this.data.open.useMMLspacing = 0;
        }
        if (f.separators !== "") {
          while (f.separators.length < this.data.length) {
            f.separators += f.separators.charAt(f.separators.length - 1);
          }
          for (var g = 1,
              e = this.data.length; g < e; g++) {
            if (this.data[g]) {
              this.SetData("sep" + g, a.mo(f.separators.charAt(g - 1)).With({separator: true}));
              this.data["sep" + g].useMMLspacing = 0;
            }
          }
        }
        if (f.close !== "") {
          this.SetData("close", a.mo(f.close).With({
            fence: true,
            form: a.FORM.POSTFIX,
            texClass: a.TEXCLASS.CLOSE
          }));
          this.data.close.useMMLspacing = 0;
        }
      },
      texClass: a.TEXCLASS.OPEN,
      setTeXclass: function(g) {
        this.addFakeNodes();
        this.getPrevClass(g);
        if (this.data.open) {
          g = this.data.open.setTeXclass(g);
        }
        if (this.data[0]) {
          g = this.data[0].setTeXclass(g);
        }
        for (var f = 1,
            e = this.data.length; f < e; f++) {
          if (this.data["sep" + f]) {
            g = this.data["sep" + f].setTeXclass(g);
          }
          if (this.data[f]) {
            g = this.data[f].setTeXclass(g);
          }
        }
        if (this.data.close) {
          g = this.data.close.setTeXclass(g);
        }
        this.updateTeXclass(this.data.open);
        this.texClass = a.TEXCLASS.INNER;
        return g;
      }
    });
    a.menclose = a.mbase.Subclass({
      type: "menclose",
      inferRow: true,
      linebreakContainer: true,
      defaults: {
        mathbackground: a.INHERIT,
        mathcolor: a.INHERIT,
        notation: a.NOTATION.LONGDIV,
        texClass: a.TEXCLASS.ORD
      },
      setTeXclass: a.mbase.setSeparateTeXclasses
    });
    a.msubsup = a.mbase.Subclass({
      type: "msubsup",
      base: 0,
      sub: 1,
      sup: 2,
      isEmbellished: a.mbase.childEmbellished,
      Core: a.mbase.childCore,
      CoreMO: a.mbase.childCoreMO,
      defaults: {
        mathbackground: a.INHERIT,
        mathcolor: a.INHERIT,
        subscriptshift: "",
        superscriptshift: "",
        texClass: a.AUTO
      },
      autoDefault: function(e) {
        if (e === "texClass") {
          return (this.isEmbellished() ? this.CoreMO().Get(e) : a.TEXCLASS.ORD);
        }
        return 0;
      },
      adjustChild_displaystyle: function(e) {
        if (e > 0) {
          return false;
        }
        return this.Get("displaystyle");
      },
      adjustChild_scriptlevel: function(f) {
        var e = this.Get("scriptlevel");
        if (f > 0) {
          e++;
        }
        return e;
      },
      adjustChild_texprimestyle: function(e) {
        if (e === this.sub) {
          return true;
        }
        return this.Get("texprimestyle");
      },
      setTeXclass: a.mbase.setBaseTeXclasses
    });
    a.msub = a.msubsup.Subclass({type: "msub"});
    a.msup = a.msubsup.Subclass({
      type: "msup",
      sub: 2,
      sup: 1
    });
    a.mmultiscripts = a.msubsup.Subclass({
      type: "mmultiscripts",
      adjustChild_texprimestyle: function(e) {
        if (e % 2 === 1) {
          return true;
        }
        return this.Get("texprimestyle");
      }
    });
    a.mprescripts = a.mbase.Subclass({type: "mprescripts"});
    a.none = a.mbase.Subclass({type: "none"});
    a.munderover = a.mbase.Subclass({
      type: "munderover",
      base: 0,
      under: 1,
      over: 2,
      sub: 1,
      sup: 2,
      ACCENTS: ["", "accentunder", "accent"],
      linebreakContainer: true,
      isEmbellished: a.mbase.childEmbellished,
      Core: a.mbase.childCore,
      CoreMO: a.mbase.childCoreMO,
      defaults: {
        mathbackground: a.INHERIT,
        mathcolor: a.INHERIT,
        accent: a.AUTO,
        accentunder: a.AUTO,
        align: a.ALIGN.CENTER,
        texClass: a.AUTO,
        subscriptshift: "",
        superscriptshift: ""
      },
      autoDefault: function(e) {
        if (e === "texClass") {
          return (this.isEmbellished() ? this.CoreMO().Get(e) : a.TEXCLASS.ORD);
        }
        if (e === "accent" && this.data[this.over]) {
          return this.data[this.over].CoreMO().Get("accent");
        }
        if (e === "accentunder" && this.data[this.under]) {
          return this.data[this.under].CoreMO().Get("accent");
        }
        return false;
      },
      adjustChild_displaystyle: function(e) {
        if (e > 0) {
          return false;
        }
        return this.Get("displaystyle");
      },
      adjustChild_scriptlevel: function(g) {
        var f = this.Get("scriptlevel");
        var e = (this.data[this.base] && !this.Get("displaystyle") && this.data[this.base].CoreMO().Get("movablelimits"));
        if (g == this.under && (e || !this.Get("accentunder"))) {
          f++;
        }
        if (g == this.over && (e || !this.Get("accent"))) {
          f++;
        }
        return f;
      },
      adjustChild_texprimestyle: function(e) {
        if (e === this.base && this.data[this.over]) {
          return true;
        }
        return this.Get("texprimestyle");
      },
      setTeXclass: a.mbase.setBaseTeXclasses
    });
    a.munder = a.munderover.Subclass({type: "munder"});
    a.mover = a.munderover.Subclass({
      type: "mover",
      over: 1,
      under: 2,
      sup: 1,
      sub: 2,
      ACCENTS: ["", "accent", "accentunder"]
    });
    a.mtable = a.mbase.Subclass({
      type: "mtable",
      defaults: {
        mathbackground: a.INHERIT,
        mathcolor: a.INHERIT,
        align: a.ALIGN.AXIS,
        rowalign: a.ALIGN.BASELINE,
        columnalign: a.ALIGN.CENTER,
        groupalign: "{left}",
        alignmentscope: true,
        columnwidth: a.WIDTH.AUTO,
        width: a.WIDTH.AUTO,
        rowspacing: "1ex",
        columnspacing: ".8em",
        rowlines: a.LINES.NONE,
        columnlines: a.LINES.NONE,
        frame: a.LINES.NONE,
        framespacing: "0.4em 0.5ex",
        equalrows: false,
        equalcolumns: false,
        displaystyle: false,
        side: a.SIDE.RIGHT,
        minlabelspacing: "0.8em",
        texClass: a.TEXCLASS.ORD,
        useHeight: 1
      },
      adjustChild_displaystyle: function() {
        return (this.displaystyle != null ? this.displaystyle : this.defaults.displaystyle);
      },
      inheritFromMe: true,
      noInherit: {
        mover: {align: true},
        munder: {align: true},
        munderover: {align: true},
        mtable: {
          align: true,
          rowalign: true,
          columnalign: true,
          groupalign: true,
          alignmentscope: true,
          columnwidth: true,
          width: true,
          rowspacing: true,
          columnspacing: true,
          rowlines: true,
          columnlines: true,
          frame: true,
          framespacing: true,
          equalrows: true,
          equalcolumns: true,
          displaystyle: true,
          side: true,
          minlabelspacing: true,
          texClass: true,
          useHeight: 1
        }
      },
      linebreakContainer: true,
      Append: function() {
        for (var f = 0,
            e = arguments.length; f < e; f++) {
          if (!((arguments[f] instanceof a.mtr) || (arguments[f] instanceof a.mlabeledtr))) {
            arguments[f] = a.mtr(arguments[f]);
          }
        }
        this.SUPER(arguments).Append.apply(this, arguments);
      },
      setTeXclass: a.mbase.setSeparateTeXclasses
    });
    a.mtr = a.mbase.Subclass({
      type: "mtr",
      defaults: {
        mathbackground: a.INHERIT,
        mathcolor: a.INHERIT,
        rowalign: a.INHERIT,
        columnalign: a.INHERIT,
        groupalign: a.INHERIT
      },
      inheritFromMe: true,
      noInherit: {
        mrow: {
          rowalign: true,
          columnalign: true,
          groupalign: true
        },
        mtable: {
          rowalign: true,
          columnalign: true,
          groupalign: true
        }
      },
      linebreakContainer: true,
      Append: function() {
        for (var f = 0,
            e = arguments.length; f < e; f++) {
          if (!(arguments[f] instanceof a.mtd)) {
            arguments[f] = a.mtd(arguments[f]);
          }
        }
        this.SUPER(arguments).Append.apply(this, arguments);
      },
      setTeXclass: a.mbase.setSeparateTeXclasses
    });
    a.mtd = a.mbase.Subclass({
      type: "mtd",
      inferRow: true,
      linebreakContainer: true,
      isEmbellished: a.mbase.childEmbellished,
      Core: a.mbase.childCore,
      CoreMO: a.mbase.childCoreMO,
      defaults: {
        mathbackground: a.INHERIT,
        mathcolor: a.INHERIT,
        rowspan: 1,
        columnspan: 1,
        rowalign: a.INHERIT,
        columnalign: a.INHERIT,
        groupalign: a.INHERIT
      },
      setTeXclass: a.mbase.setSeparateTeXclasses
    });
    a.maligngroup = a.mbase.Subclass({
      type: "maligngroup",
      isSpacelike: function() {
        return true;
      },
      defaults: {
        mathbackground: a.INHERIT,
        mathcolor: a.INHERIT,
        groupalign: a.INHERIT
      },
      inheritFromMe: true,
      noInherit: {
        mrow: {groupalign: true},
        mtable: {groupalign: true}
      }
    });
    a.malignmark = a.mbase.Subclass({
      type: "malignmark",
      defaults: {
        mathbackground: a.INHERIT,
        mathcolor: a.INHERIT,
        edge: a.SIDE.LEFT
      },
      isSpacelike: function() {
        return true;
      }
    });
    a.mlabeledtr = a.mtr.Subclass({type: "mlabeledtr"});
    a.maction = a.mbase.Subclass({
      type: "maction",
      defaults: {
        mathbackground: a.INHERIT,
        mathcolor: a.INHERIT,
        actiontype: a.ACTIONTYPE.TOGGLE,
        selection: 1
      },
      selected: function() {
        return this.data[this.Get("selection") - 1] || a.NULL;
      },
      isEmbellished: function() {
        return this.selected().isEmbellished();
      },
      isSpacelike: function() {
        return this.selected().isSpacelike();
      },
      Core: function() {
        return this.selected().Core();
      },
      CoreMO: function() {
        return this.selected().CoreMO();
      },
      setTeXclass: function(f) {
        if (this.Get("actiontype") === a.ACTIONTYPE.TOOLTIP && this.data[1]) {
          this.data[1].setTeXclass();
        }
        var e = this.selected();
        f = e.setTeXclass(f);
        this.updateTeXclass(e);
        return f;
      }
    });
    a.semantics = a.mbase.Subclass({
      type: "semantics",
      notParent: true,
      isEmbellished: a.mbase.childEmbellished,
      Core: a.mbase.childCore,
      CoreMO: a.mbase.childCoreMO,
      defaults: {
        definitionURL: null,
        encoding: null
      },
      setTeXclass: a.mbase.setChildTeXclass,
      getAnnotation: function(g) {
        var l = MathJax.Hub.config.MathMenu.semanticsAnnotations[g];
        if (l) {
          for (var h = 0,
              e = this.data.length; h < e; h++) {
            var k = this.data[h].Get("encoding");
            if (k) {
              for (var f = 0,
                  o = l.length; f < o; f++) {
                if (l[f] === k) {
                  return this.data[h];
                }
              }
            }
          }
        }
        return null;
      }
    });
    a.annotation = a.mbase.Subclass({
      type: "annotation",
      isChars: true,
      linebreakContainer: true,
      defaults: {
        definitionURL: null,
        encoding: null,
        cd: "mathmlkeys",
        name: "",
        src: null
      }
    });
    a["annotation-xml"] = a.mbase.Subclass({
      type: "annotation-xml",
      linebreakContainer: true,
      defaults: {
        definitionURL: null,
        encoding: null,
        cd: "mathmlkeys",
        name: "",
        src: null
      }
    });
    a.math = a.mstyle.Subclass({
      type: "math",
      defaults: {
        mathvariant: a.VARIANT.NORMAL,
        mathsize: a.SIZE.NORMAL,
        mathcolor: "",
        mathbackground: a.COLOR.TRANSPARENT,
        dir: "ltr",
        scriptlevel: 0,
        displaystyle: a.AUTO,
        display: "inline",
        maxwidth: "",
        overflow: a.OVERFLOW.LINEBREAK,
        altimg: "",
        "altimg-width": "",
        "altimg-height": "",
        "altimg-valign": "",
        alttext: "",
        cdgroup: "",
        scriptsizemultiplier: Math.sqrt(1 / 2),
        scriptminsize: "8px",
        infixlinebreakstyle: a.LINEBREAKSTYLE.BEFORE,
        lineleading: "1ex",
        indentshift: "auto",
        indentalign: a.INDENTALIGN.AUTO,
        indentalignfirst: a.INDENTALIGN.INDENTALIGN,
        indentshiftfirst: a.INDENTSHIFT.INDENTSHIFT,
        indentalignlast: a.INDENTALIGN.INDENTALIGN,
        indentshiftlast: a.INDENTSHIFT.INDENTSHIFT,
        decimalseparator: ".",
        texprimestyle: false
      },
      autoDefault: function(e) {
        if (e === "displaystyle") {
          return this.Get("display") === "block";
        }
        return "";
      },
      linebreakContainer: true,
      setTeXclass: a.mbase.setChildTeXclass,
      getAnnotation: function(e) {
        if (this.data.length != 1) {
          return null;
        }
        return this.data[0].getAnnotation(e);
      }
    });
    a.chars = a.mbase.Subclass({
      type: "chars",
      Append: function() {
        this.data.push.apply(this.data, arguments);
      },
      value: function() {
        return this.data.join("");
      },
      toString: function() {
        return this.data.join("");
      }
    });
    a.entity = a.mbase.Subclass({
      type: "entity",
      Append: function() {
        this.data.push.apply(this.data, arguments);
      },
      value: function() {
        if (this.data[0].substr(0, 2) === "#x") {
          return parseInt(this.data[0].substr(2), 16);
        } else {
          if (this.data[0].substr(0, 1) === "#") {
            return parseInt(this.data[0].substr(1));
          } else {
            return 0;
          }
        }
      },
      toString: function() {
        var e = this.value();
        if (e <= 65535) {
          return String.fromCharCode(e);
        }
        e -= 65536;
        return String.fromCharCode((e >> 10) + 55296) + String.fromCharCode((e & 1023) + 56320);
      }
    });
    a.xml = a.mbase.Subclass({
      type: "xml",
      Init: function() {
        this.div = document.createElement("div");
        return this.SUPER(arguments).Init.apply(this, arguments);
      },
      Append: function() {
        for (var f = 0,
            e = arguments.length; f < e; f++) {
          var g = this.Import(arguments[f]);
          this.data.push(g);
          this.div.appendChild(g);
        }
      },
      Import: function(j) {
        if (document.importNode) {
          return document.importNode(j, true);
        }
        var f,
            g,
            e;
        if (j.nodeType === 1) {
          f = document.createElement(j.nodeName);
          for (g = 0, e = j.attributes.length; g < e; g++) {
            var h = j.attributes[g];
            if (h.specified && h.nodeValue != null && h.nodeValue != "") {
              f.setAttribute(h.nodeName, h.nodeValue);
            }
            if (h.nodeName === "style") {
              f.style.cssText = h.nodeValue;
            }
          }
          if (j.className) {
            f.className = j.className;
          }
        } else {
          if (j.nodeType === 3 || j.nodeType === 4) {
            f = document.createTextNode(j.nodeValue);
          } else {
            if (j.nodeType === 8) {
              f = document.createComment(j.nodeValue);
            } else {
              return document.createTextNode("");
            }
          }
        }
        for (g = 0, e = j.childNodes.length; g < e; g++) {
          f.appendChild(this.Import(j.childNodes[g]));
        }
        return f;
      },
      value: function() {
        return this.div;
      },
      toString: function() {
        return this.div.innerHTML;
      }
    });
    a.TeXAtom = a.mbase.Subclass({
      type: "texatom",
      inferRow: true,
      notParent: true,
      texClass: a.TEXCLASS.ORD,
      Core: a.mbase.childCore,
      CoreMO: a.mbase.childCoreMO,
      isEmbellished: a.mbase.childEmbellished,
      setTeXclass: function(e) {
        this.data[0].setTeXclass();
        return this.adjustTeXclass(e);
      },
      adjustTeXclass: a.mo.prototype.adjustTeXclass
    });
    a.NULL = a.mbase().With({type: "null"});
    var b = a.TEXCLASS;
    var d = {
      ORD: [0, 0, b.ORD],
      ORD11: [1, 1, b.ORD],
      ORD21: [2, 1, b.ORD],
      ORD02: [0, 2, b.ORD],
      ORD55: [5, 5, b.ORD],
      OP: [1, 2, b.OP, {
        largeop: true,
        movablelimits: true,
        symmetric: true
      }],
      OPFIXED: [1, 2, b.OP, {
        largeop: true,
        movablelimits: true
      }],
      INTEGRAL: [0, 1, b.OP, {
        largeop: true,
        symmetric: true
      }],
      INTEGRAL2: [1, 2, b.OP, {
        largeop: true,
        symmetric: true
      }],
      BIN3: [3, 3, b.BIN],
      BIN4: [4, 4, b.BIN],
      BIN01: [0, 1, b.BIN],
      BIN5: [5, 5, b.BIN],
      TALLBIN: [4, 4, b.BIN, {stretchy: true}],
      BINOP: [4, 4, b.BIN, {
        largeop: true,
        movablelimits: true
      }],
      REL: [5, 5, b.REL],
      REL1: [1, 1, b.REL, {stretchy: true}],
      REL4: [4, 4, b.REL],
      RELSTRETCH: [5, 5, b.REL, {stretchy: true}],
      RELACCENT: [5, 5, b.REL, {accent: true}],
      WIDEREL: [5, 5, b.REL, {
        accent: true,
        stretchy: true
      }],
      OPEN: [0, 0, b.OPEN, {
        fence: true,
        stretchy: true,
        symmetric: true
      }],
      CLOSE: [0, 0, b.CLOSE, {
        fence: true,
        stretchy: true,
        symmetric: true
      }],
      INNER: [0, 0, b.INNER],
      PUNCT: [0, 3, b.PUNCT],
      ACCENT: [0, 0, b.ORD, {accent: true}],
      WIDEACCENT: [0, 0, b.ORD, {
        accent: true,
        stretchy: true
      }]
    };
    a.mo.Augment({
      SPACE: ["0em", "0.1111em", "0.1667em", "0.2222em", "0.2667em", "0.3333em"],
      RANGES: [[32, 127, b.REL, "BasicLatin"], [160, 255, b.ORD, "Latin1Supplement"], [256, 383, b.ORD], [384, 591, b.ORD], [688, 767, b.ORD, "SpacingModLetters"], [768, 879, b.ORD, "CombDiacritMarks"], [880, 1023, b.ORD, "GreekAndCoptic"], [7680, 7935, b.ORD], [8192, 8303, b.PUNCT, "GeneralPunctuation"], [8304, 8351, b.ORD], [8352, 8399, b.ORD], [8400, 8447, b.ORD, "CombDiactForSymbols"], [8448, 8527, b.ORD, "LetterlikeSymbols"], [8528, 8591, b.ORD], [8592, 8703, b.REL, "Arrows"], [8704, 8959, b.BIN, "MathOperators"], [8960, 9215, b.ORD, "MiscTechnical"], [9312, 9471, b.ORD], [9472, 9631, b.ORD], [9632, 9727, b.ORD, "GeometricShapes"], [9984, 10175, b.ORD, "Dingbats"], [10176, 10223, b.ORD, "MiscMathSymbolsA"], [10224, 10239, b.REL, "SupplementalArrowsA"], [10496, 10623, b.REL, "SupplementalArrowsB"], [10624, 10751, b.ORD, "MiscMathSymbolsB"], [10752, 11007, b.BIN, "SuppMathOperators"], [11008, 11263, b.ORD, "MiscSymbolsAndArrows"], [119808, 120831, b.ORD]],
      OPTABLE: {
        prefix: {
          "\u2200": d.ORD21,
          "\u2202": d.ORD21,
          "\u2203": d.ORD21,
          "\u2207": d.ORD21,
          "\u220F": d.OP,
          "\u2210": d.OP,
          "\u2211": d.OP,
          "\u2212": d.BIN01,
          "\u2213": d.BIN01,
          "\u221A": [1, 1, b.ORD, {stretchy: true}],
          "\u2220": d.ORD,
          "\u222B": d.INTEGRAL,
          "\u222E": d.INTEGRAL,
          "\u22C0": d.OP,
          "\u22C1": d.OP,
          "\u22C2": d.OP,
          "\u22C3": d.OP,
          "\u2308": d.OPEN,
          "\u230A": d.OPEN,
          "\u27E8": d.OPEN,
          "\u27EE": d.OPEN,
          "\u2A00": d.OP,
          "\u2A01": d.OP,
          "\u2A02": d.OP,
          "\u2A04": d.OP,
          "\u2A06": d.OP,
          "\u00AC": d.ORD21,
          "\u00B1": d.BIN01,
          "(": d.OPEN,
          "+": d.BIN01,
          "-": d.BIN01,
          "[": d.OPEN,
          "{": d.OPEN,
          "|": d.OPEN
        },
        postfix: {
          "!": [1, 0, b.CLOSE],
          "&": d.ORD,
          "\u2032": d.ORD02,
          "\u203E": d.WIDEACCENT,
          "\u2309": d.CLOSE,
          "\u230B": d.CLOSE,
          "\u23DE": d.WIDEACCENT,
          "\u23DF": d.WIDEACCENT,
          "\u266D": d.ORD02,
          "\u266E": d.ORD02,
          "\u266F": d.ORD02,
          "\u27E9": d.CLOSE,
          "\u27EF": d.CLOSE,
          "\u02C6": d.WIDEACCENT,
          "\u02C7": d.WIDEACCENT,
          "\u02C9": d.WIDEACCENT,
          "\u02CA": d.ACCENT,
          "\u02CB": d.ACCENT,
          "\u02D8": d.ACCENT,
          "\u02D9": d.ACCENT,
          "\u02DC": d.WIDEACCENT,
          "\u0302": d.WIDEACCENT,
          "\u00A8": d.ACCENT,
          "\u00AF": d.WIDEACCENT,
          ")": d.CLOSE,
          "]": d.CLOSE,
          "^": d.WIDEACCENT,
          _: d.WIDEACCENT,
          "`": d.ACCENT,
          "|": d.CLOSE,
          "}": d.CLOSE,
          "~": d.WIDEACCENT
        },
        infix: {
          "": d.ORD,
          "%": [3, 3, b.ORD],
          "\u2022": d.BIN4,
          "\u2026": d.INNER,
          "\u2044": d.TALLBIN,
          "\u2061": d.ORD,
          "\u2062": d.ORD,
          "\u2063": [0, 0, b.ORD, {
            linebreakstyle: "after",
            separator: true
          }],
          "\u2064": d.ORD,
          "\u2190": d.WIDEREL,
          "\u2191": d.RELSTRETCH,
          "\u2192": d.WIDEREL,
          "\u2193": d.RELSTRETCH,
          "\u2194": d.WIDEREL,
          "\u2195": d.RELSTRETCH,
          "\u2196": d.RELSTRETCH,
          "\u2197": d.RELSTRETCH,
          "\u2198": d.RELSTRETCH,
          "\u2199": d.RELSTRETCH,
          "\u21A6": d.WIDEREL,
          "\u21A9": d.WIDEREL,
          "\u21AA": d.WIDEREL,
          "\u21BC": d.WIDEREL,
          "\u21BD": d.WIDEREL,
          "\u21C0": d.WIDEREL,
          "\u21C1": d.WIDEREL,
          "\u21CC": d.WIDEREL,
          "\u21D0": d.WIDEREL,
          "\u21D1": d.RELSTRETCH,
          "\u21D2": d.WIDEREL,
          "\u21D3": d.RELSTRETCH,
          "\u21D4": d.WIDEREL,
          "\u21D5": d.RELSTRETCH,
          "\u2208": d.REL,
          "\u2209": d.REL,
          "\u220B": d.REL,
          "\u2212": d.BIN4,
          "\u2213": d.BIN4,
          "\u2215": d.TALLBIN,
          "\u2216": d.BIN4,
          "\u2217": d.BIN4,
          "\u2218": d.BIN4,
          "\u2219": d.BIN4,
          "\u221D": d.REL,
          "\u2223": d.REL,
          "\u2225": d.REL,
          "\u2227": d.BIN4,
          "\u2228": d.BIN4,
          "\u2229": d.BIN4,
          "\u222A": d.BIN4,
          "\u223C": d.REL,
          "\u2240": d.BIN4,
          "\u2243": d.REL,
          "\u2245": d.REL,
          "\u2248": d.REL,
          "\u224D": d.REL,
          "\u2250": d.REL,
          "\u2260": d.REL,
          "\u2261": d.REL,
          "\u2264": d.REL,
          "\u2265": d.REL,
          "\u226A": d.REL,
          "\u226B": d.REL,
          "\u227A": d.REL,
          "\u227B": d.REL,
          "\u2282": d.REL,
          "\u2283": d.REL,
          "\u2286": d.REL,
          "\u2287": d.REL,
          "\u228E": d.BIN4,
          "\u2291": d.REL,
          "\u2292": d.REL,
          "\u2293": d.BIN4,
          "\u2294": d.BIN4,
          "\u2295": d.BIN4,
          "\u2296": d.BIN4,
          "\u2297": d.BIN4,
          "\u2298": d.BIN4,
          "\u2299": d.BIN4,
          "\u22A2": d.REL,
          "\u22A3": d.REL,
          "\u22A4": d.ORD55,
          "\u22A5": d.REL,
          "\u22A8": d.REL,
          "\u22C4": d.BIN4,
          "\u22C5": d.BIN4,
          "\u22C6": d.BIN4,
          "\u22C8": d.REL,
          "\u22EE": d.ORD55,
          "\u22EF": d.INNER,
          "\u22F1": [5, 5, b.INNER],
          "\u25B3": d.BIN4,
          "\u25B5": d.BIN4,
          "\u25B9": d.BIN4,
          "\u25BD": d.BIN4,
          "\u25BF": d.BIN4,
          "\u25C3": d.BIN4,
          "\u2758": d.REL,
          "\u27F5": d.WIDEREL,
          "\u27F6": d.WIDEREL,
          "\u27F7": d.WIDEREL,
          "\u27F8": d.WIDEREL,
          "\u27F9": d.WIDEREL,
          "\u27FA": d.WIDEREL,
          "\u27FC": d.WIDEREL,
          "\u2A2F": d.BIN4,
          "\u2A3F": d.BIN4,
          "\u2AAF": d.REL,
          "\u2AB0": d.REL,
          "\u00B1": d.BIN4,
          "\u00B7": d.BIN4,
          "\u00D7": d.BIN4,
          "\u00F7": d.BIN4,
          "*": d.BIN3,
          "+": d.BIN4,
          ",": [0, 3, b.PUNCT, {
            linebreakstyle: "after",
            separator: true
          }],
          "-": d.BIN4,
          ".": [3, 3, b.ORD],
          "/": d.ORD11,
          ":": [1, 2, b.REL],
          ";": [0, 3, b.PUNCT, {
            linebreakstyle: "after",
            separator: true
          }],
          "<": d.REL,
          "=": d.REL,
          ">": d.REL,
          "?": [1, 1, b.CLOSE],
          "\\": d.ORD,
          "^": d.ORD11,
          _: d.ORD11,
          "|": [2, 2, b.ORD, {
            fence: true,
            stretchy: true,
            symmetric: true
          }],
          "#": d.ORD,
          "$": d.ORD,
          "\u002E": [0, 3, b.PUNCT, {separator: true}],
          "\u02B9": d.ORD,
          "\u0300": d.ACCENT,
          "\u0301": d.ACCENT,
          "\u0303": d.WIDEACCENT,
          "\u0304": d.ACCENT,
          "\u0306": d.ACCENT,
          "\u0307": d.ACCENT,
          "\u0308": d.ACCENT,
          "\u030C": d.ACCENT,
          "\u0332": d.WIDEACCENT,
          "\u0338": d.REL4,
          "\u2015": [0, 0, b.ORD, {stretchy: true}],
          "\u2017": [0, 0, b.ORD, {stretchy: true}],
          "\u2020": d.BIN3,
          "\u2021": d.BIN3,
          "\u20D7": d.ACCENT,
          "\u2111": d.ORD,
          "\u2113": d.ORD,
          "\u2118": d.ORD,
          "\u211C": d.ORD,
          "\u2205": d.ORD,
          "\u221E": d.ORD,
          "\u2305": d.BIN3,
          "\u2306": d.BIN3,
          "\u2322": d.REL4,
          "\u2323": d.REL4,
          "\u2329": d.OPEN,
          "\u232A": d.CLOSE,
          "\u23AA": d.ORD,
          "\u23AF": [0, 0, b.ORD, {stretchy: true}],
          "\u23B0": d.OPEN,
          "\u23B1": d.CLOSE,
          "\u2500": d.ORD,
          "\u25EF": d.BIN3,
          "\u2660": d.ORD,
          "\u2661": d.ORD,
          "\u2662": d.ORD,
          "\u2663": d.ORD,
          "\u3008": d.OPEN,
          "\u3009": d.CLOSE,
          "\uFE37": d.WIDEACCENT,
          "\uFE38": d.WIDEACCENT
        }
      }
    }, {OPTYPES: d});
    var c = a.mo.prototype.OPTABLE;
    c.infix["^"] = d.WIDEREL;
    c.infix._ = d.WIDEREL;
    c.prefix["\u2223"] = d.OPEN;
    c.prefix["\u2225"] = d.OPEN;
    c.postfix["\u2223"] = d.CLOSE;
    c.postfix["\u2225"] = d.CLOSE;
  })(MathJax.ElementJax.mml);
  MathJax.ElementJax.mml.loadComplete("jax.js");
  MathJax.Hub.Register.LoadHook("[MathJax]/jax/element/mml/jax.js", function() {
    var c = "2.6.1";
    var a = MathJax.ElementJax.mml,
        b = MathJax.Hub.config.menuSettings;
    a.mbase.Augment({
      toMathML: function(l) {
        var h = (this.inferred && this.parent.inferRow);
        if (l == null) {
          l = "";
        }
        var f = this.type,
            e = this.toMathMLattributes();
        if (f === "mspace") {
          return l + "<" + f + e + " />";
        }
        var k = [],
            j = (this.isToken ? "" : l + (h ? "" : "  "));
        for (var g = 0,
            d = this.data.length; g < d; g++) {
          if (this.data[g]) {
            k.push(this.data[g].toMathML(j));
          } else {
            if (!this.isToken && !this.isChars) {
              k.push(j + "<mrow />");
            }
          }
        }
        if (this.isToken || this.isChars) {
          return l + "<" + f + e + ">" + k.join("") + "</" + f + ">";
        }
        if (h) {
          return k.join("\n");
        }
        if (k.length === 0 || (k.length === 1 && k[0] === "")) {
          return l + "<" + f + e + " />";
        }
        return l + "<" + f + e + ">\n" + k.join("\n") + "\n" + l + "</" + f + ">";
      },
      toMathMLattributes: function() {
        var j = (this.type === "mstyle" ? a.math.prototype.defaults : this.defaults);
        var h = (this.attrNames || a.copyAttributeNames),
            g = a.skipAttributes,
            l = a.copyAttributes;
        var e = [];
        if (this.type === "math" && (!this.attr || !this.attr.xmlns)) {
          e.push('xmlns="http://www.w3.org/1998/Math/MathML"');
        }
        if (!this.attrNames) {
          for (var k in j) {
            if (!g[k] && !l[k] && j.hasOwnProperty(k)) {
              if (this[k] != null && this[k] !== j[k]) {
                if (this.Get(k, null, 1) !== this[k]) {
                  e.push(k + '="' + this.toMathMLattribute(this[k]) + '"');
                }
              }
            }
          }
        }
        for (var f = 0,
            d = h.length; f < d; f++) {
          if (l[h[f]] === 1 && !j.hasOwnProperty(h[f])) {
            continue;
          }
          value = (this.attr || {})[h[f]];
          if (value == null) {
            value = this[h[f]];
          }
          if (value != null) {
            e.push(h[f] + '="' + this.toMathMLquote(value) + '"');
          }
        }
        this.toMathMLclass(e);
        if (e.length) {
          return " " + e.join(" ");
        } else {
          return "";
        }
      },
      toMathMLclass: function(d) {
        var f = [];
        if (this["class"]) {
          f.push(this["class"]);
        }
        if (this.isa(a.TeXAtom) && b.texHints) {
          var e = ["ORD", "OP", "BIN", "REL", "OPEN", "CLOSE", "PUNCT", "INNER", "VCENTER"][this.texClass];
          if (e) {
            f.push("MJX-TeXAtom-" + e);
            if (e === "OP" && !this.movablelimits) {
              f.push("MJX-fixedlimits");
            }
          }
        }
        if (this.mathvariant && this.toMathMLvariants[this.mathvariant]) {
          f.push("MJX" + this.mathvariant);
        }
        if (this.variantForm) {
          f.push("MJX-variant");
        }
        if (f.length) {
          d.unshift('class="' + f.join(" ") + '"');
        }
      },
      toMathMLattribute: function(d) {
        if (typeof(d) === "string" && d.replace(/ /g, "").match(/^(([-+])?(\d+(\.\d*)?|\.\d+))mu$/)) {
          return (RegExp.$2 || "") + ((1 / 18) * RegExp.$3).toFixed(3).replace(/\.?0+$/, "") + "em";
        } else {
          if (this.toMathMLvariants[d]) {
            return this.toMathMLvariants[d];
          }
        }
        return this.toMathMLquote(d);
      },
      toMathMLvariants: {
        "-tex-caligraphic": a.VARIANT.SCRIPT,
        "-tex-caligraphic-bold": a.VARIANT.BOLDSCRIPT,
        "-tex-oldstyle": a.VARIANT.NORMAL,
        "-tex-oldstyle-bold": a.VARIANT.BOLD,
        "-tex-mathit": a.VARIANT.ITALIC
      },
      toMathMLquote: function(f) {
        f = String(f).split("");
        for (var g = 0,
            d = f.length; g < d; g++) {
          var k = f[g].charCodeAt(0);
          if (k <= 55295 || 57344 <= k) {
            if (k > 126 || (k < 32 && k !== 10 && k !== 13 && k !== 9)) {
              f[g] = "&#x" + k.toString(16).toUpperCase() + ";";
            } else {
              var j = {
                "&": "&amp;",
                "<": "&lt;",
                ">": "&gt;",
                '"': "&quot;"
              }[f[g]];
              if (j) {
                f[g] = j;
              }
            }
          } else {
            if (g + 1 < d) {
              var h = f[g + 1].charCodeAt(0);
              var e = (((k - 55296) << 10) + (h - 56320) + 65536);
              f[g] = "&#x" + e.toString(16).toUpperCase() + ";";
              f[g + 1] = "";
              g++;
            } else {
              f[g] = "";
            }
          }
        }
        return f.join("");
      }
    });
    a.math.Augment({toMathML: function(d, e) {
        var g;
        if (d == null) {
          d = "";
        }
        if (e && e.originalText && b.semantics) {
          g = MathJax.InputJax[e.inputJax].annotationEncoding;
        }
        var n = (this.data[0] && this.data[0].data.length > 1);
        var p = this.type,
            k = this.toMathMLattributes();
        var j = [],
            o = d + (g ? "  " + (n ? "  " : "") : "") + "  ";
        for (var h = 0,
            f = this.data.length; h < f; h++) {
          if (this.data[h]) {
            j.push(this.data[h].toMathML(o));
          } else {
            j.push(o + "<mrow />");
          }
        }
        if (j.length === 0 || (j.length === 1 && j[0] === "")) {
          if (!g) {
            return "<" + p + k + " />";
          }
          j.push(o + "<mrow />");
        }
        if (g) {
          if (n) {
            j.unshift(d + "    <mrow>");
            j.push(d + "    </mrow>");
          }
          j.unshift(d + "  <semantics>");
          var l = e.originalText.replace(/[&<>]/g, function(i) {
            return {
              ">": "&gt;",
              "<": "&lt;",
              "&": "&amp;"
            }[i];
          });
          j.push(d + '    <annotation encoding="' + g + '">' + l + "</annotation>");
          j.push(d + "  </semantics>");
        }
        return d + "<" + p + k + ">\n" + j.join("\n") + "\n" + d + "</" + p + ">";
      }});
    a.msubsup.Augment({toMathML: function(j) {
        var f = this.type;
        if (this.data[this.sup] == null) {
          f = "msub";
        }
        if (this.data[this.sub] == null) {
          f = "msup";
        }
        var e = this.toMathMLattributes();
        delete this.data[0].inferred;
        var h = [];
        for (var g = 0,
            d = this.data.length; g < d; g++) {
          if (this.data[g]) {
            h.push(this.data[g].toMathML(j + "  "));
          }
        }
        return j + "<" + f + e + ">\n" + h.join("\n") + "\n" + j + "</" + f + ">";
      }});
    a.munderover.Augment({toMathML: function(k) {
        var f = this.type;
        var j = this.data[this.base];
        if (j && j.isa(a.TeXAtom) && j.movablelimits && !j.Get("displaystyle")) {
          type = "msubsup";
          if (this.data[this.under] == null) {
            f = "msup";
          }
          if (this.data[this.over] == null) {
            f = "msub";
          }
        } else {
          if (this.data[this.under] == null) {
            f = "mover";
          }
          if (this.data[this.over] == null) {
            f = "munder";
          }
        }
        var e = this.toMathMLattributes();
        delete this.data[0].inferred;
        var h = [];
        for (var g = 0,
            d = this.data.length; g < d; g++) {
          if (this.data[g]) {
            h.push(this.data[g].toMathML(k + "  "));
          }
        }
        return k + "<" + f + e + ">\n" + h.join("\n") + "\n" + k + "</" + f + ">";
      }});
    a.TeXAtom.Augment({toMathML: function(e) {
        var d = this.toMathMLattributes();
        if (!d && this.data[0].data.length === 1) {
          return e.substr(2) + this.data[0].toMathML(e);
        }
        return e + "<mrow" + d + ">\n" + this.data[0].toMathML(e + "  ") + "\n" + e + "</mrow>";
      }});
    a.chars.Augment({toMathML: function(d) {
        return (d || "") + this.toMathMLquote(this.toString());
      }});
    a.entity.Augment({toMathML: function(d) {
        return (d || "") + "&" + this.data[0] + ";<!-- " + this.toString() + " -->";
      }});
    a.xml.Augment({toMathML: function(d) {
        return (d || "") + this.toString();
      }});
    MathJax.Hub.Register.StartupHook("TeX mathchoice Ready", function() {
      a.TeXmathchoice.Augment({toMathML: function(d) {
          return this.Core().toMathML(d);
        }});
    });
    MathJax.Hub.Startup.signal.Post("toMathML Ready");
  });
  MathJax.Ajax.loadComplete("[MathJax]/extensions/toMathML.js");
  (function(c, d) {
    var a;
    var b = function(e) {
      return MathJax.Localization._.apply(MathJax.Localization, [["MathML", e]].concat([].slice.call(arguments, 1)));
    };
    c.Parse = MathJax.Object.Subclass({
      Init: function(f, e) {
        this.Parse(f, e);
      },
      Parse: function(h, e) {
        var j;
        if (typeof h !== "string") {
          j = h.parentNode;
        } else {
          j = c.ParseXML(this.preProcessMath.call(this, h));
          if (j == null) {
            c.Error(["ErrorParsingMathML", "Error parsing MathML"]);
          }
        }
        var g = j.getElementsByTagName("parsererror")[0];
        if (g) {
          c.Error(["ParsingError", "Error parsing MathML: %1", g.textContent.replace(/This page.*?errors:|XML Parsing Error: |Below is a rendering of the page.*/g, "")]);
        }
        if (j.childNodes.length !== 1) {
          c.Error(["MathMLSingleElement", "MathML must be formed by a single element"]);
        }
        if (j.firstChild.nodeName.toLowerCase() === "html") {
          var f = j.getElementsByTagName("h1")[0];
          if (f && f.textContent === "XML parsing error" && f.nextSibling) {
            c.Error(["ParsingError", "Error parsing MathML: %1", String(f.nextSibling.nodeValue).replace(/fatal parsing error: /, "")]);
          }
        }
        if (j.firstChild.nodeName.toLowerCase().replace(/^[a-z]+:/, "") !== "math") {
          c.Error(["MathMLRootElement", "MathML must be formed by a <math> element, not %1", "<" + j.firstChild.nodeName + ">"]);
        }
        var i = {
          math: j.firstChild,
          script: e
        };
        c.DOMfilterHooks.Execute(i);
        this.mml = this.MakeMML(i.math);
      },
      MakeMML: function(h) {
        var i = String(h.getAttribute("class") || "");
        var f,
            g = h.nodeName.toLowerCase().replace(/^[a-z]+:/, "");
        var e = (i.match(/(^| )MJX-TeXAtom-([^ ]*)/));
        if (e) {
          f = this.TeXAtom(e[2], e[2] === "OP" && !i.match(/MJX-fixedlimits/));
        } else {
          if (!(a[g] && a[g].isa && a[g].isa(a.mbase))) {
            MathJax.Hub.signal.Post(["MathML Jax - unknown node type", g]);
            return a.Error(b("UnknownNodeType", "Unknown node type: %1", g));
          } else {
            f = a[g]();
          }
        }
        this.AddAttributes(f, h);
        this.CheckClass(f, f["class"]);
        this.AddChildren(f, h);
        if (c.config.useMathMLspacing) {
          f.useMMLspacing = 8;
        }
        return f;
      },
      TeXAtom: function(g, f) {
        var e = a.TeXAtom().With({texClass: a.TEXCLASS[g]});
        if (f) {
          e.movesupsub = e.movablelimits = true;
        }
        return e;
      },
      CheckClass: function(f, h) {
        h = (h || "").split(/ /);
        var j = [];
        for (var g = 0,
            e = h.length; g < e; g++) {
          if (h[g].substr(0, 4) === "MJX-") {
            if (h[g] === "MJX-arrow") {
              if (!f.notation.match("/" + a.NOTATION.UPDIAGONALARROW + "/")) {
                f.notation += " " + a.NOTATION.UPDIAGONALARROW;
              }
            } else {
              if (h[g] === "MJX-variant") {
                f.variantForm = true;
                if (!MathJax.Extension["TeX/AMSsymbols"]) {
                  MathJax.Hub.RestartAfter(MathJax.Ajax.Require("[MathJax]/extensions/TeX/AMSsymbols.js"));
                }
              } else {
                if (h[g].substr(0, 11) !== "MJX-TeXAtom") {
                  f.mathvariant = h[g].substr(3);
                  if (f.mathvariant === "-tex-caligraphic-bold" || f.mathvariant === "-tex-oldstyle-bold") {
                    if (!MathJax.Extension["TeX/boldsymbol"]) {
                      MathJax.Hub.RestartAfter(MathJax.Ajax.Require("[MathJax]/extensions/TeX/boldsymbol.js"));
                    }
                  }
                }
              }
            }
          } else {
            j.push(h[g]);
          }
        }
        if (j.length) {
          f["class"] = j.join(" ");
        } else {
          delete f["class"];
        }
      },
      AddAttributes: function(g, j) {
        g.attr = {};
        g.attrNames = [];
        for (var h = 0,
            e = j.attributes.length; h < e; h++) {
          var f = j.attributes[h].name;
          if (f == "xlink:href") {
            f = "href";
          }
          if (f.match(/:/)) {
            continue;
          }
          if (f.match(/^_moz-math-((column|row)(align|line)|font-style)$/)) {
            continue;
          }
          var k = j.attributes[h].value;
          k = this.filterAttribute(f, k);
          var l = (g.type === "mstyle" ? a.math.prototype.defaults : g.defaults);
          if (k != null) {
            if (k.toLowerCase() === "true") {
              k = true;
            } else {
              if (k.toLowerCase() === "false") {
                k = false;
              }
            }
            if (l[f] != null || a.copyAttributes[f]) {
              g[f] = k;
            } else {
              g.attr[f] = k;
            }
            g.attrNames.push(f);
          }
        }
      },
      filterAttribute: function(e, f) {
        return f;
      },
      AddChildren: function(e, g) {
        for (var k = 0,
            j = g.childNodes.length; k < j; k++) {
          var f = g.childNodes[k];
          if (f.nodeName === "#comment") {
            continue;
          }
          if (f.nodeName === "#text") {
            if ((e.isToken || e.isChars) && !e.mmlSelfClosing) {
              var o = f.nodeValue;
              if (e.isToken) {
                o = o.replace(/&([a-z][a-z0-9]*);/ig, this.replaceEntity);
                o = this.trimSpace(o);
              }
              e.Append(a.chars(o));
            } else {
              if (f.nodeValue.match(/\S/)) {
                c.Error(["UnexpectedTextNode", "Unexpected text node: %1", "'" + f.nodeValue + "'"]);
              }
            }
          } else {
            if (e.type === "annotation-xml") {
              e.Append(a.xml(f));
            } else {
              var h = this.MakeMML(f);
              e.Append(h);
              if (h.mmlSelfClosing && h.data.length) {
                e.Append.apply(e, h.data);
                h.data = [];
              }
            }
          }
        }
        if (e.type === "mrow" && e.data.length >= 2) {
          var l = e.data[0],
              n = e.data[e.data.length - 1];
          if (l.type === "mo" && l.Get("fence") && n.type === "mo" && n.Get("fence")) {
            if (l.data[0]) {
              e.open = l.data.join("");
            }
            if (n.data[0]) {
              e.close = n.data.join("");
            }
          }
        }
      },
      preProcessMath: function(f) {
        if (f.match(/^<[a-z]+:/i) && !f.match(/^<[^<>]* xmlns:/)) {
          f = f.replace(/^<([a-z]+)(:math)/i, '<$1$2 xmlns:$1="http://www.w3.org/1998/Math/MathML"');
        }
        var e = f.match(/^(<math( ('.*?'|".*?"|[^>])+)>)/i);
        if (e && e[2].match(/ (?!xmlns=)[a-z]+=\"http:/i)) {
          f = e[1].replace(/ (?!xmlns=)([a-z]+=(['"])http:.*?\2)/ig, " xmlns:$1 $1") + f.substr(e[0].length);
        }
        if (f.match(/^<math/i) && !f.match(/^<[^<>]* xmlns=/)) {
          f = f.replace(/^<(math)/i, '<math xmlns="http://www.w3.org/1998/Math/MathML"');
        }
        f = f.replace(/^\s*(?:\/\/)?<!(--)?\[CDATA\[((.|\n)*)(\/\/)?\]\]\1>\s*$/, "$2");
        return f.replace(/&([a-z][a-z0-9]*);/ig, this.replaceEntity);
      },
      trimSpace: function(e) {
        return e.replace(/[\t\n\r]/g, " ").replace(/^ +/, "").replace(/ +$/, "").replace(/  +/g, " ");
      },
      replaceEntity: function(g, f) {
        if (f.match(/^(lt|amp|quot)$/)) {
          return g;
        }
        if (c.Parse.Entity[f]) {
          return c.Parse.Entity[f];
        }
        var h = f.charAt(0).toLowerCase();
        var e = f.match(/^[a-zA-Z](fr|scr|opf)$/);
        if (e) {
          h = e[1];
        }
        if (!c.Parse.loaded[h]) {
          c.Parse.loaded[h] = true;
          MathJax.Hub.RestartAfter(MathJax.Ajax.Require(c.entityDir + "/" + h + ".js"));
        }
        return g;
      }
    }, {loaded: []});
    c.Augment({
      sourceMenuTitle: ["OriginalMathML", "Original MathML"],
      prefilterHooks: MathJax.Callback.Hooks(true),
      DOMfilterHooks: MathJax.Callback.Hooks(true),
      postfilterHooks: MathJax.Callback.Hooks(true),
      Translate: function(e) {
        if (!this.ParseXML) {
          this.ParseXML = this.createParser();
        }
        var f,
            h,
            i = {script: e};
        if (e.firstChild && e.firstChild.nodeName.toLowerCase().replace(/^[a-z]+:/, "") === "math") {
          i.math = e.firstChild;
        } else {
          h = MathJax.HTML.getScript(e);
          if (d.isMSIE) {
            h = h.replace(/(&nbsp;)+$/, "");
          }
          i.math = h;
        }
        var j = this.prefilterHooks.Execute(i);
        if (j) {
          return j;
        }
        h = i.math;
        try {
          f = c.Parse(h, e).mml;
        } catch (g) {
          if (!g.mathmlError) {
            throw g;
          }
          f = this.formatError(g, h, e);
        }
        i.math = a(f);
        return this.postfilterHooks.Execute(i) || i.math;
      },
      prefilterMath: function(f, e) {
        return f;
      },
      prefilterMathML: function(f, e) {
        return f;
      },
      formatError: function(h, g, e) {
        var f = h.message.replace(/\n.*/, "");
        MathJax.Hub.signal.Post(["MathML Jax - parse error", f, g, e]);
        return a.Error(f);
      },
      Error: function(e) {
        if (e instanceof Array) {
          e = b.apply(b, e);
        }
        throw MathJax.Hub.Insert(Error(e), {mathmlError: true});
      },
      parseDOM: function(e) {
        return this.parser.parseFromString(e, "text/xml");
      },
      parseMS: function(e) {
        return (this.parser.loadXML(e) ? this.parser : null);
      },
      parseDIV: function(e) {
        this.div.innerHTML = "<div>" + e.replace(/<([a-z]+)([^>]*)\/>/g, "<$1$2></$1>") + "</div>";
        var f = this.div.firstChild;
        this.div.innerHTML = "";
        return f;
      },
      parseError: function(e) {
        return null;
      },
      createMSParser: function() {
        var j = null;
        var f = ["MSXML2.DOMDocument.6.0", "MSXML2.DOMDocument.5.0", "MSXML2.DOMDocument.4.0", "MSXML2.DOMDocument.3.0", "MSXML2.DOMDocument.2.0", "Microsoft.XMLDOM"];
        for (var g = 0,
            e = f.length; g < e && !j; g++) {
          try {
            j = new ActiveXObject(f[g]);
          } catch (h) {}
        }
        return j;
      },
      createParser: function() {
        if (window.DOMParser) {
          this.parser = new DOMParser();
          return (this.parseDOM);
        } else {
          if (window.ActiveXObject) {
            this.parser = this.createMSParser();
            if (!this.parser) {
              MathJax.Localization.Try(this.parserCreationError);
              return (this.parseError);
            }
            this.parser.async = false;
            return (this.parseMS);
          }
        }
        this.div = MathJax.Hub.Insert(document.createElement("div"), {style: {
            visibility: "hidden",
            overflow: "hidden",
            height: "1px",
            position: "absolute",
            top: 0
          }});
        if (!document.body.firstChild) {
          document.body.appendChild(this.div);
        } else {
          document.body.insertBefore(this.div, document.body.firstChild);
        }
        return (this.parseDIV);
      },
      parserCreationError: function() {
        alert(b("CantCreateXMLParser", "MathJax can't create an XML parser for MathML.  Check that\nthe 'Script ActiveX controls marked safe for scripting' security\nsetting is enabled (use the Internet Options item in the Tools\nmenu, and select the Security panel, then press the Custom Level\nbutton to check this).\n\nMathML equations will not be able to be processed by MathJax."));
      },
      Startup: function() {
        a = MathJax.ElementJax.mml;
        a.mspace.Augment({mmlSelfClosing: true});
        a.none.Augment({mmlSelfClosing: true});
        a.mprescripts.Augment({mmlSelfClosing: true});
        a.maligngroup.Augment({mmlSelfClosing: true});
        a.malignmark.Augment({mmlSelfClosing: true});
      }
    });
    c.prefilterHooks.Add(function(e) {
      e.math = (typeof(e.math) === "string" ? c.prefilterMath(e.math, e.script) : c.prefilterMathML(e.math, e.script));
    });
    c.Parse.Entity = {
      ApplyFunction: "\u2061",
      Backslash: "\u2216",
      Because: "\u2235",
      Breve: "\u02D8",
      Cap: "\u22D2",
      CenterDot: "\u00B7",
      CircleDot: "\u2299",
      CircleMinus: "\u2296",
      CirclePlus: "\u2295",
      CircleTimes: "\u2297",
      Congruent: "\u2261",
      ContourIntegral: "\u222E",
      Coproduct: "\u2210",
      Cross: "\u2A2F",
      Cup: "\u22D3",
      CupCap: "\u224D",
      Dagger: "\u2021",
      Del: "\u2207",
      Delta: "\u0394",
      Diamond: "\u22C4",
      DifferentialD: "\u2146",
      DotEqual: "\u2250",
      DoubleDot: "\u00A8",
      DoubleRightTee: "\u22A8",
      DoubleVerticalBar: "\u2225",
      DownArrow: "\u2193",
      DownLeftVector: "\u21BD",
      DownRightVector: "\u21C1",
      DownTee: "\u22A4",
      Downarrow: "\u21D3",
      Element: "\u2208",
      EqualTilde: "\u2242",
      Equilibrium: "\u21CC",
      Exists: "\u2203",
      ExponentialE: "\u2147",
      FilledVerySmallSquare: "\u25AA",
      ForAll: "\u2200",
      Gamma: "\u0393",
      Gg: "\u22D9",
      GreaterEqual: "\u2265",
      GreaterEqualLess: "\u22DB",
      GreaterFullEqual: "\u2267",
      GreaterLess: "\u2277",
      GreaterSlantEqual: "\u2A7E",
      GreaterTilde: "\u2273",
      Hacek: "\u02C7",
      Hat: "\u005E",
      HumpDownHump: "\u224E",
      HumpEqual: "\u224F",
      Im: "\u2111",
      ImaginaryI: "\u2148",
      Integral: "\u222B",
      Intersection: "\u22C2",
      InvisibleComma: "\u2063",
      InvisibleTimes: "\u2062",
      Lambda: "\u039B",
      Larr: "\u219E",
      LeftAngleBracket: "\u27E8",
      LeftArrow: "\u2190",
      LeftArrowRightArrow: "\u21C6",
      LeftCeiling: "\u2308",
      LeftDownVector: "\u21C3",
      LeftFloor: "\u230A",
      LeftRightArrow: "\u2194",
      LeftTee: "\u22A3",
      LeftTriangle: "\u22B2",
      LeftTriangleEqual: "\u22B4",
      LeftUpVector: "\u21BF",
      LeftVector: "\u21BC",
      Leftarrow: "\u21D0",
      Leftrightarrow: "\u21D4",
      LessEqualGreater: "\u22DA",
      LessFullEqual: "\u2266",
      LessGreater: "\u2276",
      LessSlantEqual: "\u2A7D",
      LessTilde: "\u2272",
      Ll: "\u22D8",
      Lleftarrow: "\u21DA",
      LongLeftArrow: "\u27F5",
      LongLeftRightArrow: "\u27F7",
      LongRightArrow: "\u27F6",
      Longleftarrow: "\u27F8",
      Longleftrightarrow: "\u27FA",
      Longrightarrow: "\u27F9",
      Lsh: "\u21B0",
      MinusPlus: "\u2213",
      NestedGreaterGreater: "\u226B",
      NestedLessLess: "\u226A",
      NotDoubleVerticalBar: "\u2226",
      NotElement: "\u2209",
      NotEqual: "\u2260",
      NotExists: "\u2204",
      NotGreater: "\u226F",
      NotGreaterEqual: "\u2271",
      NotLeftTriangle: "\u22EA",
      NotLeftTriangleEqual: "\u22EC",
      NotLess: "\u226E",
      NotLessEqual: "\u2270",
      NotPrecedes: "\u2280",
      NotPrecedesSlantEqual: "\u22E0",
      NotRightTriangle: "\u22EB",
      NotRightTriangleEqual: "\u22ED",
      NotSubsetEqual: "\u2288",
      NotSucceeds: "\u2281",
      NotSucceedsSlantEqual: "\u22E1",
      NotSupersetEqual: "\u2289",
      NotTilde: "\u2241",
      NotVerticalBar: "\u2224",
      Omega: "\u03A9",
      OverBar: "\u203E",
      OverBrace: "\u23DE",
      PartialD: "\u2202",
      Phi: "\u03A6",
      Pi: "\u03A0",
      PlusMinus: "\u00B1",
      Precedes: "\u227A",
      PrecedesEqual: "\u2AAF",
      PrecedesSlantEqual: "\u227C",
      PrecedesTilde: "\u227E",
      Product: "\u220F",
      Proportional: "\u221D",
      Psi: "\u03A8",
      Rarr: "\u21A0",
      Re: "\u211C",
      ReverseEquilibrium: "\u21CB",
      RightAngleBracket: "\u27E9",
      RightArrow: "\u2192",
      RightArrowLeftArrow: "\u21C4",
      RightCeiling: "\u2309",
      RightDownVector: "\u21C2",
      RightFloor: "\u230B",
      RightTee: "\u22A2",
      RightTeeArrow: "\u21A6",
      RightTriangle: "\u22B3",
      RightTriangleEqual: "\u22B5",
      RightUpVector: "\u21BE",
      RightVector: "\u21C0",
      Rightarrow: "\u21D2",
      Rrightarrow: "\u21DB",
      Rsh: "\u21B1",
      Sigma: "\u03A3",
      SmallCircle: "\u2218",
      Sqrt: "\u221A",
      Square: "\u25A1",
      SquareIntersection: "\u2293",
      SquareSubset: "\u228F",
      SquareSubsetEqual: "\u2291",
      SquareSuperset: "\u2290",
      SquareSupersetEqual: "\u2292",
      SquareUnion: "\u2294",
      Star: "\u22C6",
      Subset: "\u22D0",
      SubsetEqual: "\u2286",
      Succeeds: "\u227B",
      SucceedsEqual: "\u2AB0",
      SucceedsSlantEqual: "\u227D",
      SucceedsTilde: "\u227F",
      SuchThat: "\u220B",
      Sum: "\u2211",
      Superset: "\u2283",
      SupersetEqual: "\u2287",
      Supset: "\u22D1",
      Therefore: "\u2234",
      Theta: "\u0398",
      Tilde: "\u223C",
      TildeEqual: "\u2243",
      TildeFullEqual: "\u2245",
      TildeTilde: "\u2248",
      UnderBar: "\u005F",
      UnderBrace: "\u23DF",
      Union: "\u22C3",
      UnionPlus: "\u228E",
      UpArrow: "\u2191",
      UpDownArrow: "\u2195",
      UpTee: "\u22A5",
      Uparrow: "\u21D1",
      Updownarrow: "\u21D5",
      Upsilon: "\u03A5",
      Vdash: "\u22A9",
      Vee: "\u22C1",
      VerticalBar: "\u2223",
      VerticalTilde: "\u2240",
      Vvdash: "\u22AA",
      Wedge: "\u22C0",
      Xi: "\u039E",
      acute: "\u00B4",
      aleph: "\u2135",
      alpha: "\u03B1",
      amalg: "\u2A3F",
      and: "\u2227",
      ang: "\u2220",
      angmsd: "\u2221",
      angsph: "\u2222",
      ape: "\u224A",
      backprime: "\u2035",
      backsim: "\u223D",
      backsimeq: "\u22CD",
      beta: "\u03B2",
      beth: "\u2136",
      between: "\u226C",
      bigcirc: "\u25EF",
      bigodot: "\u2A00",
      bigoplus: "\u2A01",
      bigotimes: "\u2A02",
      bigsqcup: "\u2A06",
      bigstar: "\u2605",
      bigtriangledown: "\u25BD",
      bigtriangleup: "\u25B3",
      biguplus: "\u2A04",
      blacklozenge: "\u29EB",
      blacktriangle: "\u25B4",
      blacktriangledown: "\u25BE",
      blacktriangleleft: "\u25C2",
      bowtie: "\u22C8",
      boxdl: "\u2510",
      boxdr: "\u250C",
      boxminus: "\u229F",
      boxplus: "\u229E",
      boxtimes: "\u22A0",
      boxul: "\u2518",
      boxur: "\u2514",
      bsol: "\u005C",
      bull: "\u2022",
      cap: "\u2229",
      check: "\u2713",
      chi: "\u03C7",
      circ: "\u02C6",
      circeq: "\u2257",
      circlearrowleft: "\u21BA",
      circlearrowright: "\u21BB",
      circledR: "\u00AE",
      circledS: "\u24C8",
      circledast: "\u229B",
      circledcirc: "\u229A",
      circleddash: "\u229D",
      clubs: "\u2663",
      colon: "\u003A",
      comp: "\u2201",
      ctdot: "\u22EF",
      cuepr: "\u22DE",
      cuesc: "\u22DF",
      cularr: "\u21B6",
      cup: "\u222A",
      curarr: "\u21B7",
      curlyvee: "\u22CE",
      curlywedge: "\u22CF",
      dagger: "\u2020",
      daleth: "\u2138",
      ddarr: "\u21CA",
      deg: "\u00B0",
      delta: "\u03B4",
      digamma: "\u03DD",
      div: "\u00F7",
      divideontimes: "\u22C7",
      dot: "\u02D9",
      doteqdot: "\u2251",
      dotplus: "\u2214",
      dotsquare: "\u22A1",
      dtdot: "\u22F1",
      ecir: "\u2256",
      efDot: "\u2252",
      egs: "\u2A96",
      ell: "\u2113",
      els: "\u2A95",
      empty: "\u2205",
      epsi: "\u03B5",
      epsiv: "\u03F5",
      erDot: "\u2253",
      eta: "\u03B7",
      eth: "\u00F0",
      flat: "\u266D",
      fork: "\u22D4",
      frown: "\u2322",
      gEl: "\u2A8C",
      gamma: "\u03B3",
      gap: "\u2A86",
      gimel: "\u2137",
      gnE: "\u2269",
      gnap: "\u2A8A",
      gne: "\u2A88",
      gnsim: "\u22E7",
      gt: "\u003E",
      gtdot: "\u22D7",
      harrw: "\u21AD",
      hbar: "\u210F",
      hellip: "\u2026",
      hookleftarrow: "\u21A9",
      hookrightarrow: "\u21AA",
      imath: "\u0131",
      infin: "\u221E",
      intcal: "\u22BA",
      iota: "\u03B9",
      jmath: "\u0237",
      kappa: "\u03BA",
      kappav: "\u03F0",
      lEg: "\u2A8B",
      lambda: "\u03BB",
      lap: "\u2A85",
      larrlp: "\u21AB",
      larrtl: "\u21A2",
      lbrace: "\u007B",
      lbrack: "\u005B",
      le: "\u2264",
      leftleftarrows: "\u21C7",
      leftthreetimes: "\u22CB",
      lessdot: "\u22D6",
      lmoust: "\u23B0",
      lnE: "\u2268",
      lnap: "\u2A89",
      lne: "\u2A87",
      lnsim: "\u22E6",
      longmapsto: "\u27FC",
      looparrowright: "\u21AC",
      lowast: "\u2217",
      loz: "\u25CA",
      lt: "\u003C",
      ltimes: "\u22C9",
      ltri: "\u25C3",
      macr: "\u00AF",
      malt: "\u2720",
      mho: "\u2127",
      mu: "\u03BC",
      multimap: "\u22B8",
      nLeftarrow: "\u21CD",
      nLeftrightarrow: "\u21CE",
      nRightarrow: "\u21CF",
      nVDash: "\u22AF",
      nVdash: "\u22AE",
      natur: "\u266E",
      nearr: "\u2197",
      nharr: "\u21AE",
      nlarr: "\u219A",
      not: "\u00AC",
      nrarr: "\u219B",
      nu: "\u03BD",
      nvDash: "\u22AD",
      nvdash: "\u22AC",
      nwarr: "\u2196",
      omega: "\u03C9",
      omicron: "\u03BF",
      or: "\u2228",
      osol: "\u2298",
      period: "\u002E",
      phi: "\u03C6",
      phiv: "\u03D5",
      pi: "\u03C0",
      piv: "\u03D6",
      prap: "\u2AB7",
      precnapprox: "\u2AB9",
      precneqq: "\u2AB5",
      precnsim: "\u22E8",
      prime: "\u2032",
      psi: "\u03C8",
      rarrtl: "\u21A3",
      rbrace: "\u007D",
      rbrack: "\u005D",
      rho: "\u03C1",
      rhov: "\u03F1",
      rightrightarrows: "\u21C9",
      rightthreetimes: "\u22CC",
      ring: "\u02DA",
      rmoust: "\u23B1",
      rtimes: "\u22CA",
      rtri: "\u25B9",
      scap: "\u2AB8",
      scnE: "\u2AB6",
      scnap: "\u2ABA",
      scnsim: "\u22E9",
      sdot: "\u22C5",
      searr: "\u2198",
      sect: "\u00A7",
      sharp: "\u266F",
      sigma: "\u03C3",
      sigmav: "\u03C2",
      simne: "\u2246",
      smile: "\u2323",
      spades: "\u2660",
      sub: "\u2282",
      subE: "\u2AC5",
      subnE: "\u2ACB",
      subne: "\u228A",
      supE: "\u2AC6",
      supnE: "\u2ACC",
      supne: "\u228B",
      swarr: "\u2199",
      tau: "\u03C4",
      theta: "\u03B8",
      thetav: "\u03D1",
      tilde: "\u02DC",
      times: "\u00D7",
      triangle: "\u25B5",
      triangleq: "\u225C",
      upsi: "\u03C5",
      upuparrows: "\u21C8",
      veebar: "\u22BB",
      vellip: "\u22EE",
      weierp: "\u2118",
      xi: "\u03BE",
      yen: "\u00A5",
      zeta: "\u03B6",
      zigrarr: "\u21DD"
    };
    c.loadComplete("jax.js");
  })(MathJax.InputJax.MathML, MathJax.Hub.Browser);
  (function(l, c, g, e) {
    var f,
        i = c.Browser.isMSIE;
    var h,
        b,
        d,
        k;
    c.Register.StartupHook("MathZoom Ready", function() {
      k = MathJax.Extension.MathZoom;
    });
    var j = function(m, o) {
      var n = e.Element("span");
      m = "padding" + m;
      if (o) {
        n.style.cssText = (o.getAttribute("style") || "");
        if (n.style.padding === "" && (n.style[m] || "") === "") {
          n.style[m] = "0px";
          o.setAttribute("style", n.style.cssText);
        }
      }
    };
    var a = function(r, m, p) {
      if (r) {
        var o = e.Element("span");
        o.style.cssText = (r.getAttribute("style") || "");
        if (o.style.padding === "") {
          var q = {
            paddingLeft: p,
            paddingTop: m,
            paddingRight: "0px",
            paddingBottom: "0px"
          };
          for (var n in q) {
            if (q.hasOwnProperty(n)) {
              if ((o.style[n] || "") === "") {
                o.style[n] = q[n];
              }
            }
          }
        }
        r.setAttribute("style", o.style.cssText);
      }
    };
    l.Augment({
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
            direction: "ltr",
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
      settings: c.config.menuSettings,
      ex: 1,
      scale: 1,
      adjustWidths: [],
      Config: function() {
        this.SUPER(arguments).Config.call(this);
        if (this.settings.scale) {
          this.config.scale = this.settings.scale;
        }
        if (c.config.displayAlign !== "center") {
          var o = c.config.displayAlign,
              m = c.config.displayIndent;
          var n = {"text-align": o + "!important"};
          n["margin-" + o] = m + "!important";
          c.Insert(this.config.styles, {
            "div.MathJax_MathML": n,
            "div.MathJax_MathML math": {"text-align": o},
            "div.MathJax_MathContainer > span": {"text-align": o + "!important"}
          });
        }
        if (!this.require) {
          this.require = [];
        }
        this.require.push(MathJax.OutputJax.extensionDir + "/MathEvents.js");
      },
      Startup: function() {
        h = MathJax.Extension.MathEvents.Event;
        b = MathJax.Extension.MathEvents.Touch;
        d = MathJax.Extension.MathEvents.Hover;
        this.ContextMenu = h.ContextMenu;
        this.Mousedown = h.AltContextMenu;
        this.Mouseover = d.Mouseover;
        this.Mouseout = d.Mouseout;
        this.Mousemove = d.Mousemove;
        if (!c.Browser.hasMathPlayer) {
          this.EmExSpan = e.Element("span", {style: {
              position: "absolute",
              "font-size-adjust": "none"
            }}, [["div", {className: "MathJax_mmlExBox"}], ["span", {className: "MathJax_MathML"}]]);
          f.math(f.mspace().With({width: "60ex"})).toNativeMML(this.EmExSpan.lastChild);
        }
        return g.Styles(this.config.styles);
      },
      InitializeMML: function() {
        this.initialized = true;
        if (c.Browser.hasMathPlayer) {
          try {
            if (!c.Browser.mpNamespace) {
              var m = document.createElement("object");
              m.id = "mathplayer";
              m.classid = "clsid:32F66A20-7614-11D4-BD11-00104BD3F987";
              document.getElementsByTagName("head")[0].appendChild(m);
              document.namespaces.add("m", "http://www.w3.org/1998/Math/MathML");
              c.Browser.mpNamespace = true;
            }
            if (!c.Browser.mpImported) {
              document.namespaces.m.doImport("#mathplayer");
              c.Browser.mpImported = true;
            }
          } catch (n) {
            if (!this.config.noMathPlayerWarning) {
              alert(MathJax.Localization._(["MathML", "MathPlayer"], "MathJax was not able to set up MathPlayer.\n\nIf MathPlayer is not installed, you need to install it first.\nOtherwise, your security settings may be preventing ActiveX     \ncontrols from running.  Use the Internet Options item under\nthe Tools menu and select the Security tab, then press the\nCustom Level button. Check that the settings for\n'Run ActiveX Controls', and 'Binary and script behaviors'\nare enabled.\n\nCurrently you will see error messages rather than\ntypeset mathematics."));
            }
          }
        } else {
          document.body.appendChild(this.EmExSpan);
          this.defaultEx = this.EmExSpan.firstChild.offsetWidth / 60;
          this.defaultMEx = this.EmExSpan.lastChild.offsetWidth / 60;
          document.body.removeChild(this.EmExSpan);
        }
      },
      preTranslate: function(o) {
        var t = o.jax[this.id],
            u,
            p = t.length,
            y,
            r,
            A,
            w,
            z,
            n,
            v,
            s,
            q;
        for (u = 0; u < p; u++) {
          y = t[u];
          if (!y.parentNode) {
            continue;
          }
          if (!this.initialized) {
            this.InitializeMML();
          }
          r = y.previousSibling;
          if (r && r.className === "MathJax_MathML") {
            r.parentNode.removeChild(r);
          }
          n = y.MathJax.elementJax;
          if (!n) {
            continue;
          }
          z = n.root;
          n.NativeMML = {};
          var x = (z.Get("display") === "block" ? "div" : "span");
          A = e.Element(x, {
            className: "MathJax_MathML",
            id: n.inputID + "-Frame"
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
          y.parentNode.insertBefore(A, y);
          if (!i) {
            y.parentNode.insertBefore(this.EmExSpan.cloneNode(true), y);
          }
        }
        for (u = 0; u < p; u++) {
          y = t[u];
          if (!y.parentNode) {
            continue;
          }
          n = y.MathJax.elementJax;
          if (!n) {
            continue;
          }
          if (!i) {
            w = y.previousSibling;
            v = w.firstChild.offsetWidth / 60;
            s = w.lastChild.offsetWidth / 60;
            if (v === 0 || v === "NaN") {
              v = this.defaultEx;
              s = this.defaultMEx;
            }
            q = (this.config.matchFontHeight && s > 1 ? v / s : 1);
            q = Math.floor(Math.max(this.config.minScaleAdjust / 100, q) * this.config.scale);
            n.NativeMML.ex = v;
            n.NativeMML.mex = s;
          } else {
            q = 100;
          }
          n.NativeMML.fontSize = q + "%";
          n.NativeMML.scale = q / 100;
        }
        if (!i) {
          for (u = 0; u < p; u++) {
            y = t[u];
            if (y.parentNode && y.MathJax.elementJax) {
              y.parentNode.removeChild(y.previousSibling);
            }
          }
        }
      },
      Translate: function(s) {
        if (!s.parentNode) {
          return;
        }
        var m = s.MathJax.elementJax,
            t = m.root;
        var u = document.getElementById(m.inputID + "-Frame");
        if (!u) {
          return;
        }
        var n = u.firstChild,
            q = n.firstChild;
        this.ex = m.NativeMML.ex || this.defaultEx;
        this.scale = m.NativeMML.scale || 1;
        if (this.scale !== 1) {
          u.style.fontSize = m.NativeMML.fontSize;
        }
        try {
          t.toNativeMML(q, m);
        } catch (r) {
          if (r.restart) {
            while (q.firstChild) {
              q.removeChild(q.firstChild);
            }
          }
          throw r;
        }
        if (i) {
          if (n.addEventListener) {
            for (var o in this.MSIE9events) {
              if (this.MSIE9events.hasOwnProperty(o)) {
                n.addEventListener(o, this.MSIE9event, true);
              }
            }
          } else {
            var p = (this.config.showMathMenuMSIE != null ? this : c).config;
            if (p.showMathMenuMSIE && !this.settings.mpContext && !this.settings.mpMouse) {
              this.MSIEoverlay(n);
            } else {
              n.style.position = "";
              q.firstChild.onmousedown = this.MSIEaltMenu;
            }
          }
        } else {
          n.oncontextmenu = h.Menu;
          n.onmouseover = h.Mouseover;
          n.onmouseout = h.Mouseout;
          n.onmousedown = h.Mousedown;
          n.onclick = h.Click;
          n.ondblclick = h.DblClick;
          n.onkeydown = h.Keydown;
          n.tabIndex = c.getTabOrder(m);
          if (c.Browser.noContextMenu) {
            n.ontouchstart = b.start;
            n.ontouchend = b.end;
          }
        }
      },
      postTranslate: function(n) {
        if (this.forceReflow) {
          var m = (document.styleSheets || [])[0] || {};
          m.disabled = true;
          m.disabled = false;
        }
      },
      Remove: function(m) {
        var n = m.SourceElement();
        if (!n) {
          return;
        }
        n = n.previousSibling;
        if (!n) {
          return;
        }
        if (n.className.match(/MathJax_MathML/)) {
          n.parentNode.removeChild(n);
        }
      },
      MMLnamespace: "http://www.w3.org/1998/Math/MathML",
      isFullWidth: function(r) {
        if (!r) {
          return;
        }
        var q = r.getAttribute("width") || (String(r.getAttribute("style")).match(/(?:^| )width: *([^; ]*)/) || [])[1];
        if (q) {
          return !!q.match(/%/);
        }
        if (r.nodeName.match(/^(semantics|math|mstyle)$/)) {
          q = this.isFullWidth(r.firstChild);
        } else {
          if (r.nodeName.toLowerCase() === "mrow") {
            for (var o = 0,
                n = r.childNodes.length; o < n && !q; o++) {
              q = this.isFullWidth(r.childNodes[o]);
            }
          }
        }
        if (q) {
          var p = "width:100%; " + (r.getAttribute("style") || "");
          r.setAttribute("style", p.replace(/ +$/, ""));
        }
        return q;
      },
      MSIEoverlay: function(m) {
        var n = m.firstChild;
        if (n.nodeName.toLowerCase() === "span") {
          n = n.firstChild;
        }
        var o = this.getHoverBBox(null, n, {});
        e.addElement(m, "span", {style: {
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
            left: d.Px(-o.w),
            top: d.Px(-o.h - (o.y || 0) - 1),
            width: d.Px(o.w),
            height: d.Px(o.h + o.d),
            cursor: "pointer",
            "background-color": "white",
            filter: "alpha(opacity=0)"
          }
        }]]);
        c.Insert(m, {
          msieMath: n,
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
        var n = window.event;
        var m = l.MSIEevents[n.type];
        if (l[m] && l[m](n, this) === false) {
          return false;
        }
        if (k && k.HandleEvent(n, m, this) === false) {
          return false;
        }
        if (n.srcElement.className === "MathJax_MathPlayer_Overlay" && this.msieMath.fireEvent) {
          if (m === "ContextMenu" || m === "Mouseover" || m === "Mouseout") {
            this.msieMath.fireEvent("on" + n.type, n);
          }
        }
        return h.False(n);
      },
      MSIEaltMenu: function() {
        var m = this.parentNode.parentNode;
        while (!m.jaxID) {
          m = m.parentNode;
        }
        h.AltContextMenu(window.event, m);
      },
      MSIE9events: {
        contextmenu: "Menu",
        click: "Click",
        dblclick: "DblClick",
        mouseup: "False",
        mouseover: "Mouseover",
        mouseout: "Mouseout"
      },
      MSIE9event: function(n) {
        if (n.type === "contextmenu" && l.settings.mpContext) {
          return true;
        }
        if (n.type === "mouseup" && l.settings.mpMouse) {
          return true;
        }
        if (n.type === "click" && l.settings.mpContext) {
          return h.AltContextMenu(n, this);
        }
        var m = l.MSIE9events[n.type];
        return h[m].call(this, n);
      },
      getJaxFromMath: function(m) {
        m = m.parentNode;
        do {
          m = m.nextSibling;
        } while (m && m.nodeName.toLowerCase() !== "script");
        return c.getJaxFor(m);
      },
      getHoverSpan: function(m, n) {
        return n.firstChild;
      },
      getHoverBBox: function(m, n, o) {
        return h.getBBox(n.parentNode);
      },
      Zoom: function(n, u, s, m, r) {
        n.root.toNativeMML(u);
        if (this.msieIE8HeightBug) {
          u.style.position = "absolute";
        }
        if (l.widthBug) {
          u.style.width = u.parentNode.style.width = "";
        }
        if (u.parentNode.style.width.match(/%$/)) {
          u.parentNode.style.minWidth = Math.ceil(3 * r / 4) + "px";
        }
        var p = s.offsetWidth || s.scrollWidth,
            v = s.offsetHeight || s.scrollHeight;
        var t = u.offsetWidth,
            q = u.offsetHeight;
        if (l.widthBug || u.style.width.match(/%/)) {
          var o = u.firstChild.firstChild.scrollWidth;
          if (o > t) {
            t = o;
            u.parentNode.style.width = u.style.minWidth = t + "px";
          }
        }
        if (this.msieIE8HeightBug) {
          u.style.position = "";
        }
        return {
          Y: -h.getBBox(u.parentNode).h,
          mW: p,
          mH: v,
          zW: t,
          zH: q
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
    c.Register.StartupHook("mml Jax Ready", function() {
      f = MathJax.ElementJax.mml;
      f.mbase.Augment({
        toNativeMML: function(r) {
          var p = this.NativeMMLelement(this.type);
          this.NativeMMLattributes(p);
          for (var q = 0,
              o = this.data.length; q < o; q++) {
            if (this.data[q]) {
              this.data[q].toNativeMML(p);
            } else {
              p.appendChild(this.NativeMMLelement("mrow"));
            }
          }
          r.appendChild(p);
        },
        NativeMMLattributes: function(w) {
          var r = (this.type === "mstyle" ? f.math.prototype.defaults : this.defaults);
          var t = (this.attrNames || f.copyAttributeNames),
              v = f.skipAttributes,
              o = f.copyAttributes;
          if (!this.attrNames) {
            for (var p in r) {
              if (!v[p] && !o[p] && r.hasOwnProperty(p)) {
                if (this[p] != null && this[p] !== r[p]) {
                  w.setAttribute(p, this.NativeMMLattribute(this[p]));
                }
              }
            }
          }
          for (var s = 0,
              q = t.length; s < q; s++) {
            if (o[t[s]] === 1 && !r.hasOwnProperty(t[s])) {
              continue;
            }
            var u = (this.attr || {})[t[s]];
            if (u == null) {
              u = this[t[s]];
            }
            if (u != null) {
              w.setAttribute(t[s], this.NativeMMLattribute(u));
            }
          }
          this.NativeMMLclass(w);
        },
        NativeMMLclass: function(o) {
          var q = [];
          if (this["class"]) {
            q.push(this["class"]);
          }
          if (this.isa(f.TeXAtom)) {
            var p = ["ORD", "OP", "BIN", "REL", "OPEN", "CLOSE", "PUNCT", "INNER", "VCENTER"][this.texClass];
            if (p) {
              q.push("MJX-TeXAtom-" + p);
              if (p === "OP" && !this.movablelimits) {
                q.push("MJX-fixedlimits");
              }
            }
          }
          if (this.mathvariant && this.NativeMMLvariants[this.mathvariant]) {
            q.push("MJX" + this.mathvariant);
          }
          if (this.variantForm) {
            q.push("MJX-variant");
          }
          if (q.length) {
            o.setAttribute("class", q.join(" "));
          }
        },
        NativeMMLattribute: function(o) {
          o = String(o);
          if (l.NAMEDSPACE[o]) {
            o = l.NAMEDSPACE[o];
          } else {
            if (o.match(/^\s*(([-+])?(\d+(\.\d*)?|\.\d+))\s*mu\s*$/)) {
              o = (RegExp.$2 || "") + ((1 / 18) * RegExp.$3).toFixed(3).replace(/\.?0+$/, "") + "em";
            } else {
              if (this.NativeMMLvariants[o]) {
                o = this.NativeMMLvariants[o];
              }
            }
          }
          return o;
        },
        NativeMMLvariants: {
          "-tex-caligraphic": f.VARIANT.SCRIPT,
          "-tex-caligraphic-bold": f.VARIANT.BOLDSCRIPT,
          "-tex-oldstyle": f.VARIANT.NORMAL,
          "-tex-oldstyle-bold": f.VARIANT.BOLD,
          "-tex-mathit": f.VARIANT.ITALIC
        },
        NativeMMLelement: function(o) {
          var p = (c.Browser.mpNamespace ? document.createElement("m:" + o) : (document.createElementNS ? document.createElementNS(l.MMLnamespace, o) : document.createElement(o)));
          p.isMathJax = true;
          return p;
        }
      });
      f.mrow.Augment({toNativeMML: function(s) {
          var r,
              p;
          if (this.inferred && this.parent.inferRow) {
            for (r = 0, p = this.data.length; r < p; r++) {
              if (this.data[r]) {
                this.data[r].toNativeMML(s);
              } else {
                s.appendChild(this.NativeMMLelement("mrow"));
              }
            }
          } else {
            if (l.stretchyMoBug && (this.open || this.close)) {
              var q = this.NativeMMLelement("mfenced");
              this.NativeMMLattributes(q);
              r = 0, p = this.data.length;
              if (this.open) {
                q.setAttribute("open", this.open);
                r++;
              }
              if (this.close) {
                q.setAttribute("close", this.close);
                p--;
              }
              var o = q;
              if (p - r + 1 > 1) {
                o = this.NativeMMLelement("mrow");
                s.appendChild(q);
                s = q;
              }
              for (; r < p; r++) {
                if (this.data[r]) {
                  this.data[r].toNativeMML(o);
                } else {
                  o.appendChild(this.NativeMMLelement("mrow"));
                }
              }
              s.appendChild(o);
            } else {
              this.SUPER(arguments).toNativeMML.call(this, s);
            }
          }
        }});
      f.msubsup.Augment({toNativeMML: function(s) {
          var r = this.type;
          if (this.data[this.sup] == null) {
            r = "msub";
          }
          if (this.data[this.sub] == null) {
            r = "msup";
          }
          var p = this.NativeMMLelement(r);
          this.NativeMMLattributes(p);
          if (this.data[0]) {
            delete this.data[0].inferred;
          }
          for (var q = 0,
              o = this.data.length; q < o; q++) {
            if (this.data[q]) {
              this.data[q].toNativeMML(p);
            }
          }
          s.appendChild(p);
        }});
      f.munderover.Augment({toNativeMML: function(s) {
          var r = this.type;
          var t = this.data[this.base];
          if (t && t.isa(f.TeXAtom) && t.movablelimits && !t.Get("displaystyle")) {
            r = "msubsup";
            if (this.data[this.under] == null) {
              r = "msup";
            }
            if (this.data[this.over] == null) {
              r = "msub";
            }
          } else {
            if (this.data[this.under] == null) {
              r = "mover";
            }
            if (this.data[this.over] == null) {
              r = "munder";
            }
          }
          var p = this.NativeMMLelement(r);
          this.NativeMMLattributes(p);
          if (this.data[0]) {
            delete this.data[0].inferred;
          }
          for (var q = 0,
              o = this.data.length; q < o; q++) {
            if (this.data[q]) {
              this.data[q].toNativeMML(p);
            }
          }
          s.appendChild(p);
        }});
      if (!i) {
        var m = c.SplitList;
        f.mtable.Augment({toNativeMML: function(z) {
            var s,
                q;
            if (l.tableSpacingBug) {
              var A = this.getValues("rowspacing", "columnspacing");
              this.nMMLtopPadding = m("0px " + A.rowspacing);
              this.nMMLleftPadding = m("0px " + A.columnspacing);
              var y = this.nMMLtopPadding,
                  v = y.length;
              for (s = 0, q = this.data.length; s < q; s++) {
                if (this.data[s]) {
                  this.data[s].nMMLtopPadding = y[s < v ? s : v - 1];
                }
              }
            }
            if (l.tableLabelBug) {
              for (s = 0, q = this.data.length; s < q; s++) {
                if (this.data[s] && this.data[s].isa(f.mlabeledtr)) {
                  var u = c.config.displayAlign.charAt(0),
                      w = this.Get("side").charAt(0);
                  this.nMMLhasLabels = true;
                  this.nMMLlaMatch = (u === w);
                  this.nMMLforceWidth = (u === "c" || !!((this.width || "").match("%")));
                  break;
                }
              }
            }
            if (this.width && this.ffTableWidthBug) {
              var B = (this.style || "").replace(/;\s*$/, "").split(";");
              if (B[0] === "") {
                B.shift();
              }
              B.push("width:" + this.width);
              this.style = B.join(";");
            }
            this.SUPER(arguments).toNativeMML.call(this, z);
            if (this.nMMLhasLabels) {
              var r = z.firstChild;
              if (this.nMMLforceWidth || w !== "r") {
                var p = (u !== "l" ? 1 : 0) + (w === "l" ? 1 : 0);
                if (p) {
                  var t = {
                    columnalign: "left",
                    columnwidth: "auto",
                    columnspacing: "0px",
                    columnlines: "none"
                  };
                  for (var o in t) {
                    if (t.hasOwnProperty(o) && this[o]) {
                      var x = [t[o], t[o]].slice(2 - p).join(" ") + " ";
                      r.setAttribute(o, x + r.getAttribute(o));
                    }
                  }
                }
              }
              if (this.nMMLforceWidth || !this.nMMLlaMatch) {
                r.setAttribute("width", "100%");
              }
            }
          }});
        f.mtr.Augment({toNativeMML: function(v) {
            this.SUPER(arguments).toNativeMML.call(this, v);
            var p = v.lastChild;
            if (l.tableSpacingBug) {
              var r = this.parent.nMMLleftPadding,
                  t = r.length;
              for (var w = p.firstChild,
                  q = 0; w; w = w.nextSibling, q++) {
                a(w, this.nMMLtopPadding, r[q < t ? q : t - 1]);
              }
            }
            if (l.tableLabelBug) {
              var o = this.parent.nMMLforceWidth,
                  u = this.parent.Get("side").charAt(0),
                  s = c.config.displayAlign.charAt(0);
              if (this.parent.nMMLhasLabels && p.firstChild) {
                if (o || u !== "r") {
                  j("Left", p.firstChild);
                  if (s !== "l") {
                    p.insertBefore(this.NativeMMLelement("mtd"), p.firstChild).setAttribute("style", "padding:0");
                  }
                  if (u === "l") {
                    p.insertBefore(this.NativeMMLelement("mtd"), p.firstChild).setAttribute("style", "padding:0");
                  }
                }
                if (o || u !== "l") {
                  j("Right", p.lastChild);
                }
              }
            }
          }});
        f.mlabeledtr.Augment({toNativeMML: function(C) {
            var t = this.NativeMMLelement("mtr");
            this.NativeMMLattributes(t);
            for (var u = 1,
                s = this.data.length; u < s; u++) {
              if (this.data[u]) {
                this.data[u].toNativeMML(t);
              } else {
                t.appendChild(this.NativeMMLelement("mtd"));
              }
            }
            if (l.tableSpacingBug) {
              var v = this.parent.nMMLleftPadding,
                  y = v.length;
              u = 0;
              for (var D = t.firstChild; D; D = D.nextSibling, u++) {
                a(D, this.nMMLtopPadding, v[u < y ? u : y - 1]);
              }
            }
            if (l.tableLabelBug && this.data[0]) {
              var z = this.parent.Get("side").charAt(0),
                  x = c.config.displayAlign.charAt(0),
                  q = c.config.displayIndent;
              this.data[0].toNativeMML(t);
              var A = t.lastChild,
                  r = A;
              if (z === x) {
                A.setAttribute("style", "width:" + q);
                A.setAttribute("columnalign", c.config.displayAlign);
              } else {
                r = this.NativeMMLelement("mpadded");
                r.setAttribute("style", "width:0");
                r.setAttribute("width", "0px");
                r.appendChild(A.firstChild);
                A.appendChild(r);
              }
              j("", A);
              t.removeChild(A);
              var o = 100,
                  p = this.parent.nMMLforceWidth;
              if ((this.parent.width || "").match(/%/)) {
                o -= parseFloat(this.parent.width);
              }
              var B = o;
              if (p || z !== "r") {
                j("Left", t.firstChild);
                if (x !== "l") {
                  if (x === "c") {
                    B /= 2;
                  }
                  o -= B;
                  t.insertBefore(this.NativeMMLelement("mtd"), t.firstChild).setAttribute("style", "padding:0;width:" + B + "%");
                }
                if (z === "l") {
                  t.insertBefore(A, t.firstChild);
                }
              }
              if (p || z !== "l") {
                j("Right", t.lastChild);
                if (x !== "r") {
                  t.appendChild(this.NativeMMLelement("mtd")).setAttribute("style", "padding:0;width:" + o + "%");
                }
                if (z === "r") {
                  if (z !== x) {
                    r.setAttribute("lspace", "-1width");
                  }
                  t.appendChild(A);
                }
              }
            }
            C.appendChild(t);
          }});
        f.mtd.Augment({toNativeMML: function(r) {
            var p = r.appendChild(this.NativeMMLelement(this.type));
            this.NativeMMLattributes(p);
            if (l.mtdWidthBug) {
              l.adjustWidths.push(p);
              p = p.appendChild(this.NativeMMLelement("mrow"));
            }
            for (var q = 0,
                o = this.data.length; q < o; q++) {
              if (this.data[q]) {
                this.data[q].toNativeMML(p);
              } else {
                p.appendChild(this.NativeMMLelement("mrow"));
              }
            }
          }});
        f.mspace.Augment({toNativeMML: function(q) {
            this.SUPER(arguments).toNativeMML.call(this, q);
            if (l.spaceWidthBug && this.width) {
              var r = q.lastChild;
              var p = r.getAttribute("width");
              var o = (r.getAttribute("style") || "").replace(/;?\s*/, "; ");
              r.setAttribute("style", o + "width:" + p);
            }
          }});
        var n = g.fileURL(MathJax.OutputJax.fontDir + "/HTML-CSS/TeX/otf");
        l.Augment({config: {styles: {
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
              "@font-face /*1*/": {
                "font-family": "MathJax_Caligraphic-WEB",
                src: "url('" + n + "/MathJax_Caligraphic-Regular.otf')"
              },
              "@font-face /*2*/": {
                "font-family": "MathJax_Caligraphic-WEB",
                "font-weight": "bold",
                src: "url('" + n + "/MathJax_Caligraphic-Bold.otf')"
              }
            }}});
        if (!this.handlesVariants) {
          l.Augment({config: {styles: {
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
                "@font-face /*3*/": {
                  "font-family": "MathJax_AMS-WEB",
                  src: "url('" + n + "/MathJax_AMS-Regular.otf')"
                },
                "@font-face /*4*/": {
                  "font-family": "MathJax_Script-WEB",
                  src: "url('" + n + "/MathJax_Script-Regular.otf')"
                },
                "@font-face /*5*/": {
                  "font-family": "MathJax_Fraktur-WEB",
                  src: "url('" + n + "/MathJax_Fraktur-Regular.otf')"
                },
                "@font-face /*6*/": {
                  "font-family": "MathJax_Fraktur-WEB",
                  "font-weight": "bold",
                  src: "url('" + n + "/MathJax_Fraktur-Bold.otf')"
                }
              }}});
        }
      }
      f.math.Augment({toNativeMML: function(y, p) {
          var A = this.NativeMMLelement(this.type),
              w = A;
          var u = (p ? MathJax.InputJax[p.inputJax].annotationEncoding : null);
          var v,
              r;
          l.adjustWidths = [];
          A.setAttribute("xmlns", l.MMLnamespace);
          this.NativeMMLattributes(A);
          if (l.widthBug) {
            A = A.appendChild(this.NativeMMLelement("mrow"));
          }
          if (u) {
            A = A.appendChild(this.NativeMMLelement("semantics"));
            A.appendChild(this.NativeMMLelement("mrow"));
            var s = A.appendChild(this.NativeMMLelement("annotation"));
            s.appendChild(document.createTextNode(p.originalText));
            s.setAttribute("encoding", u);
            A = A.firstChild;
          }
          for (v = 0, r = this.data.length; v < r; v++) {
            if (this.data[v]) {
              this.data[v].toNativeMML(A);
            } else {
              A.appendChild(this.NativeMMLelement("mrow"));
            }
          }
          var t = ((this.data[0] || {data: []}).data[0] || {});
          if (t.nMMLhasLabels) {
            if (t.nMMLforceWidth || !t.nMMLlaMatch) {
              A.setAttribute("style", "width:100%");
              if (u) {
                A.parentNode.setAttribute("style", "width:100%");
              }
            }
            if (t.nMMLlaMatch) {
              if (y.parentNode.parentNode.nodeName.toLowerCase() === "div") {
                y.parentNode.parentNode.style.setProperty("margin-" + c.config.displayAlign, "0px", "important");
              }
            }
          }
          var x = l.isFullWidth(w);
          if (x) {
            y.style.width = y.parentNode.style.width = "100%";
          }
          y.appendChild(w);
          if (l.widthBug && !x) {
            y.style.width = (w.firstChild.scrollWidth / l.ex / l.scale).toFixed(3) + "ex";
            if (p) {
              p.NativeMML.scrollWidth = w.firstChild.scrollWidth;
            }
          }
          if (l.adjustWidths.length) {
            var z = [];
            for (v = 0, r = l.adjustWidths.length; v < r; v++) {
              A = l.adjustWidths[v];
              var o = A.getAttribute("style") || "";
              if (!o.match(/(^|;)\s*min-width:/)) {
                var q = A.firstChild.scrollWidth;
                z.push(q);
                q = (q / l.ex).toFixed(3) + "ex";
                o = o.replace(/;?\s*$/, "; ");
                A.setAttribute("style", o + "min-width:" + q);
              }
            }
            if (!p) {
              p = c.getJaxFor(y);
            }
            if (p) {
              p.NativeMML.mtds = z;
            }
            w.MathJaxMtds = l.adjustWidths;
            l.adjustWidths = [];
          }
        }});
      f.mfenced.Augment({toNativeMML: function(w) {
          if (!l.mfencedBug) {
            this.SUPER(arguments).toNativeMML.call(this, w);
            return;
          }
          var t = c.Browser.isOpera;
          var u,
              p,
              r;
          var q = this.getValues("open", "close", "separators");
          q.open = q.open.replace(/^\s+/, "").replace(/\s+$/, "");
          q.close = q.close.replace(/^\s+/, "").replace(/\s+$/, "");
          q.separators = q.separators.replace(/\s+/g, "").split("");
          if (q.separators.length == 0) {
            q.separators = null;
          } else {
            if (q.separators.length < this.data.length - 1) {
              var v = q.separators[q.separators.length - 1];
              for (u = this.data.length - 1 - q.separators.length; u > 0; u--) {
                q.separators.push(v);
              }
            }
          }
          var o = this.NativeMMLelement(t ? this.type : "mrow");
          this.NativeMMLattributes(o);
          o.removeAttribute("separators");
          if (t) {
            o.setAttribute("open", q.open);
            o.setAttribute("close", q.close);
            if (this.data.length > 1) {
              w.appendChild(o);
              w = o;
              o = this.NativeMMLelement("mrow");
            }
          } else {
            o.removeAttribute("open");
            o.removeAttribute("close");
          }
          if (!t) {
            r = this.NativeMMLelement("mo");
            r.setAttribute("fence", "true");
            r.textContent = q.open;
            o.appendChild(r);
          }
          for (u = 0, p = this.data.length; u < p; u++) {
            if (q.separators && u > 0) {
              r = this.NativeMMLelement("mo");
              r.setAttribute("separator", "true");
              r.textContent = q.separators[u - 1];
              o.appendChild(r);
            }
            if (this.data[u]) {
              this.data[u].toNativeMML(o);
            } else {
              o.appendChild(this.NativeMMLelement("mrow"));
            }
          }
          if (!t) {
            r = this.NativeMMLelement("mo");
            r.setAttribute("fence", "true");
            r.textContent = q.close;
            o.appendChild(r);
          }
          w.appendChild(o);
        }});
      f.TeXAtom.Augment({toNativeMML: function(p) {
          var o = this.NativeMMLelement("mrow");
          this.NativeMMLattributes(o);
          this.data[0].toNativeMML(o);
          p.appendChild(o);
        }});
      f.chars.Augment({toNativeMML: function(o) {
          o.appendChild(document.createTextNode(this.toString()));
        }});
      f.entity.Augment({toNativeMML: function(o) {
          o.appendChild(document.createTextNode(this.toString()));
        }});
      f.xml.Augment({toNativeMML: function(q) {
          for (var p = 0,
              o = this.data.length; p < o; p++) {
            q.appendChild(this.data[p].cloneNode(true));
          }
        }});
      f.mi.Augment({toNativeMML: function(p) {
          this.SUPER(arguments).toNativeMML.call(this, p);
          if (l.miItalicBug) {
            if (this.Get("mathvariant") === f.VARIANT.NORMAL) {
              var o = p.lastChild;
              o.setAttribute("mathvariant", f.VARIANT.NORMAL);
            }
          }
        }});
      f.mo.Augment({toNativeMML: function(t) {
          this.SUPER(arguments).toNativeMML.call(this, t);
          if (l.webkitMoSpacingBug) {
            var o = 0,
                s = 0,
                v = this.parent;
            if (v && v.type === "mrow" && (v.inferred || !v.isEmbellished())) {
              var q = this.getValues("lspace", "rspace");
              o = q.lspace, s = q.rspace;
              if (l.NAMEDSPACE[o]) {
                o = l.NAMEDSPACE[o];
              }
              if (l.NAMEDSPACE[s]) {
                s = l.NAMEDSPACE[s];
              }
            }
            var u = t.lastChild;
            var r = e.Element("span");
            r.style.cssText = (u.getAttribute("style") || "");
            r.style.setProperty("-webkit-margin-start", o);
            r.style.setProperty("-webkit-margin-end", s);
            u.setAttribute("style", r.style.cssText);
          }
        }});
      f.mmultiscripts.Augment({toNativeMML: function(s) {
          if (!l.mmultiscriptsBug || this.data.length === 0) {
            this.SUPER(arguments).toNativeMML.call(this, s);
            return;
          }
          var q = this.NativeMMLelement("mrow");
          this.NativeMMLattributes(q);
          if (this.data[0]) {
            this.data[0].toNativeMML(q);
          } else {
            q.appendChild(this.NativeMMLelement("mrow"));
          }
          var t = q.removeChild(q.lastChild);
          var p = this.data.length,
              r,
              o;
          for (r = 1; r < p; r += 2) {
            if (this.data[r].type === "mprescripts") {
              break;
            }
            o = this.NativeMMLelement("msubsup");
            o.appendChild(t);
            if (this.data[r]) {
              this.data[r].toNativeMML(o);
            } else {
              o.appendChild(this.NativeMMLelement("mrow"));
            }
            if (r + 1 < p && this.data[r + 1]) {
              this.data[r + 1].toNativeMML(o);
            } else {
              o.appendChild(this.NativeMMLelement("mrow"));
            }
            t = o;
          }
          q.appendChild(t);
          for (r++; r < p; r += 2) {
            o = this.NativeMMLelement("msubsup");
            o.appendChild(this.NativeMMLelement("mrow"));
            if (this.data[r]) {
              this.data[r].toNativeMML(o);
            } else {
              o.appendChild(this.NativeMMLelement("mrow"));
            }
            if (r + 1 < p && this.data[r + 1]) {
              this.data[r + 1].toNativeMML(o);
            } else {
              o.appendChild(this.NativeMMLelement("mrow"));
            }
            q.insertBefore(o, t);
          }
          s.appendChild(q);
        }});
      c.Register.StartupHook("TeX mathchoice Ready", function() {
        f.TeXmathchoice.Augment({toNativeMML: function(o) {
            this.Core().toNativeMML(o);
          }});
      });
      setTimeout(MathJax.Callback(["loadComplete", l, "jax.js"]), 0);
    });
    c.Browser.Select({
      MSIE: function(m) {
        var n = (document.documentMode || 0);
        l.msieIE8HeightBug = (n === 8);
      },
      Opera: function(m) {
        l.stretchyMoBug = true;
        l.tableLabelBug = true;
        l.mfencedBug = true;
        l.miBug = true;
        l.mmultiscriptsBug = true;
      },
      Firefox: function(m) {
        var n = m.versionAtLeast("29.0");
        l.ffTableWidthBug = !m.versionAtLeast("13.0");
        l.forceReflow = !n;
        l.widthBug = !n;
        l.mtdWidthBug = true;
        l.handlesVariants = n;
        l.spaceWidthBug = !m.versionAtLeast("20.0");
        l.tableSpacingBug = !m.versionAtLeast("33.0");
        l.tableLabelBug = true;
        l.mfencedBug = true;
      },
      Chrome: function(m) {
        l.tableSpacingBug = true;
        l.tableLabelBug = true;
        l.mfencedBug = true;
      },
      Safari: function(m) {
        l.tableSpacingBug = true;
        l.tableLabelBug = true;
        l.mfencedBug = true;
        l.miItalicBug = true;
        l.webkitMoSpacingBug = true;
        l.spaceWidthBug = true;
        l.mmultiscriptsBug = true;
      }
    });
    c.Register.StartupHook("End Cookie", function() {
      if (c.config.menuSettings.zoom !== "None") {
        g.Require("[MathJax]/extensions/MathZoom.js");
      }
    });
  })(MathJax.OutputJax.NativeMML, MathJax.Hub, MathJax.Ajax, MathJax.HTML);
  (function(h, b, d) {
    var g,
        i = b.Browser.isMobile;
    var e = function() {
      var k = [].slice.call(arguments, 0);
      k[0][0] = ["HTML-CSS", k[0][0]];
      return MathJax.Message.Set.apply(MathJax.Message, k);
    };
    var f = MathJax.Object.Subclass({
      timeout: (i ? 15 : 8) * 1000,
      comparisonFont: ["sans-serif", "monospace", "script", "Times", "Courier", "Arial", "Helvetica"],
      testSize: ["40px", "50px", "60px", "30px", "20px"],
      FedoraSTIXcheck: {
        family: "STIXSizeOneSym",
        testString: "abcABC",
        noStyleChar: true
      },
      Init: function() {
        this.div = MathJax.HTML.addElement(document.body, "div", {style: {
            position: "absolute",
            width: 0,
            height: 0,
            overflow: "hidden",
            padding: 0,
            border: 0,
            margin: 0
          }}, [["div", {
          id: "MathJax_Font_Test",
          style: {
            position: "absolute",
            visibility: "hidden",
            top: 0,
            left: 0,
            width: "auto",
            padding: 0,
            border: 0,
            margin: 0,
            whiteSpace: "nowrap",
            textAlign: "left",
            textIndent: 0,
            textTransform: "none",
            lineHeight: "normal",
            letterSpacing: "normal",
            wordSpacing: "normal",
            fontSize: this.testSize[0],
            fontWeight: "normal",
            fontStyle: "normal",
            fontSizeAdjust: "none"
          }
        }, [""]]]).firstChild;
        this.text = this.div.firstChild;
      },
      findFont: function(p, l) {
        var o = null;
        if (l && this.testCollection(l)) {
          o = l;
        } else {
          for (var n = 0,
              k = p.length; n < k; n++) {
            if (p[n] === l) {
              continue;
            }
            if (this.testCollection(p[n])) {
              o = p[n];
              break;
            }
          }
        }
        if (o === "STIX" && this.testFont(this.FedoraSTIXcheck)) {
          o = null;
        }
        return o;
      },
      testCollection: function(l) {
        var k = {testString: "() {} []"};
        k.family = {
          TeX: "MathJax_Size1",
          STIX: "STIXSizeOneSym"
        }[l] || l.replace(/-(Math)?/, "") + "MathJax_Size1";
        if (l === "STIX") {
          k.noStyleChar = true;
        }
        return this.testFont(k);
      },
      testFont: function(n) {
        if (n.isWebFont && d.FontFaceBug) {
          this.div.style.fontWeight = this.div.style.fontStyle = "normal";
        } else {
          this.div.style.fontWeight = (n.weight || "normal");
          this.div.style.fontStyle = (n.style || "normal");
        }
        var p = n.familyFixed || n.family;
        if (!n.isWebFont && !p.match(/^(STIX|MathJax)|'/)) {
          p = p.replace(/_/g, " ").replace(/([a-z])([A-Z])/g, "$1 $2").replace(/ Jax/, "Jax") + "','" + p + "','" + p + "-";
          if (n.weight) {
            p += "Bold";
          }
          if (n.style) {
            p += "Italic";
          }
          if (!n.weight && !n.style) {
            p += "Regular";
          }
          n.familyFixed = p = "'" + p + "'";
        }
        var l = this.getComparisonWidths(n.testString, n.noStyleChar);
        var q = null;
        if (l) {
          this.div.style.fontFamily = p + "," + this.comparisonFont[0];
          if (this.div.offsetWidth == l[0]) {
            this.div.style.fontFamily = p + "," + this.comparisonFont[l[2]];
            if (this.div.offsetWidth == l[1]) {
              q = false;
            }
          }
          if (q === null && (this.div.offsetWidth != l[3] || this.div.offsetHeight != l[4])) {
            if (!n.noStyleChar && d.FONTDATA && d.FONTDATA.hasStyleChar) {
              for (var o = 0,
                  k = this.testSize.length; o < k; o++) {
                if (this.testStyleChar(n, this.testSize[o])) {
                  q = true;
                  k = 0;
                }
              }
            } else {
              q = true;
            }
          }
        }
        if (d.safariTextNodeBug) {
          this.div.innerHTML = "";
        } else {
          this.text.nodeValue = "";
        }
        return q;
      },
      styleChar: "\uEFFD",
      versionChar: "\uEFFE",
      compChar: "\uEFFF",
      testStyleChar: function(m, p) {
        var s = 3 + (m.weight ? 2 : 0) + (m.style ? 4 : 0);
        var l = "",
            o = 0;
        var r = this.div.style.fontSize;
        this.div.style.fontSize = p;
        if (d.msieItalicWidthBug && m.style === "italic") {
          this.text.nodeValue = l = this.compChar;
          o = this.div.offsetWidth;
        }
        if (d.safariTextNodeBug) {
          this.div.innerHTML = this.compChar + l;
        } else {
          this.text.nodeValue = this.compChar + l;
        }
        var k = this.div.offsetWidth - o;
        if (d.safariTextNodeBug) {
          this.div.innerHTML = this.styleChar + l;
        } else {
          this.text.nodeValue = this.styleChar + l;
        }
        var q = Math.floor((this.div.offsetWidth - o) / k + 0.5);
        if (q === s) {
          if (d.safariTextNodeBug) {
            this.div.innerHTML = this.versionChar + l;
          } else {
            this.text.nodeValue = this.versionChar + l;
          }
          m.version = Math.floor((this.div.offsetWidth - o) / k + 1.5) / 2;
        }
        this.div.style.fontSize = r;
        return (q === s);
      },
      getComparisonWidths: function(p, n) {
        if (d.FONTDATA && d.FONTDATA.hasStyleChar && !n) {
          p += this.styleChar + " " + this.compChar;
        }
        if (d.safariTextNodeBug) {
          this.div.innerHTML = p;
        } else {
          this.text.nodeValue = p;
        }
        this.div.style.fontFamily = this.comparisonFont[0];
        var l = this.div.offsetWidth;
        this.div.style.fontFamily = d.webFontDefault;
        var r = this.div.offsetWidth,
            o = this.div.offsetHeight;
        for (var q = 1,
            k = this.comparisonFont.length; q < k; q++) {
          this.div.style.fontFamily = this.comparisonFont[q];
          if (this.div.offsetWidth != l) {
            return [l, this.div.offsetWidth, q, r, o];
          }
        }
        return null;
      },
      loadWebFont: function(l) {
        b.Startup.signal.Post("HTML-CSS Jax - Web-Font " + d.fontInUse + "/" + l.directory);
        var o = e(["LoadWebFont", "Loading web-font %1", d.fontInUse + "/" + l.directory]);
        var k = MathJax.Callback({});
        var m = MathJax.Callback(["loadComplete", this, l, o, k]);
        h.timer.start(h, [this.checkWebFont, l, m], 0, this.timeout);
        return k;
      },
      loadComplete: function(m, p, l, k) {
        MathJax.Message.Clear(p);
        if (k === h.STATUS.OK) {
          this.webFontLoaded = true;
          l();
          return;
        }
        this.loadError(m);
        if (b.Browser.isFirefox && d.allowWebFonts) {
          var o = document.location.protocol + "//" + document.location.hostname;
          if (document.location.port != "") {
            o += ":" + document.location.port;
          }
          o += "/";
          if (h.fileURL(d.webfontDir).substr(0, o.length) !== o) {
            this.firefoxFontError(m);
          }
        }
        if (!this.webFontLoaded) {
          d.loadWebFontError(m, l);
        } else {
          l();
        }
      },
      loadError: function(k) {
        e(["CantLoadWebFont", "Can't load web font %1", d.fontInUse + "/" + k.directory], null, 2000);
        b.Startup.signal.Post(["HTML-CSS Jax - web font error", d.fontInUse + "/" + k.directory, k]);
      },
      firefoxFontError: function(k) {
        e(["FirefoxCantLoadWebFont", "Firefox can't load web fonts from a remote host"], null, 3000);
        b.Startup.signal.Post("HTML-CSS Jax - Firefox web fonts on remote host error");
      },
      checkWebFont: function(k, l, m) {
        if (k.time(m)) {
          return;
        }
        if (d.Font.testFont(l)) {
          m(k.STATUS.OK);
        } else {
          setTimeout(k, k.delay);
        }
      },
      fontFace: function(o) {
        var p = d.allowWebFonts;
        var r = d.FONTDATA.FONTS[o];
        if (d.msieFontCSSBug && !r.family.match(/-Web$/)) {
          r.family += "-Web";
        }
        if (r.isWebFont) {
          delete r.familyFixed;
        }
        var k = d.webfontDir + "/" + p;
        var n = h.fileURL(k);
        var m = o.replace(/-b/, "-B").replace(/-i/, "-I").replace(/-Bold-/, "-Bold");
        if (!m.match(/-/)) {
          m += "-Regular";
        }
        if (p === "svg") {
          m += ".svg#" + m;
        } else {
          m += "." + p;
        }
        var l = h.fileRev(k + "/" + m.replace(/#.*/, ""));
        var q = {
          "font-family": r.family,
          src: "url('" + n + "/" + m + l + "')"
        };
        if (p === "otf") {
          m = m.replace(/otf$/, "woff");
          l = h.fileRev(k + "/" + m);
          q.src += " format('opentype')";
          n = h.fileURL(d.webfontDir + "/woff");
          q.src = "url('" + n + "/" + m + l + "') format('woff'), " + q.src;
        } else {
          if (p !== "eot") {
            q.src += " format('" + p + "')";
          }
        }
        if (!(d.FontFaceBug && r.isWebFont)) {
          if (o.match(/-bold/)) {
            q["font-weight"] = "bold";
          }
          if (o.match(/-italic/)) {
            q["font-style"] = "italic";
          }
        }
        return q;
      }
    });
    var j,
        a,
        c;
    d.Augment({
      config: {styles: {
          ".MathJax": {
            display: "inline",
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
            direction: "ltr",
            "max-width": "none",
            "max-height": "none",
            "min-width": 0,
            "min-height": 0,
            border: 0,
            padding: 0,
            margin: 0
          },
          ".MathJax:focus, body :focus .MathJax": {display: "inline-table"},
          ".MathJax_Display": {
            position: "relative",
            display: "block!important",
            "text-indent": 0,
            "max-width": "none",
            "max-height": "none",
            "min-width": 0,
            "min-height": 0,
            width: "100%"
          },
          ".MathJax img, .MathJax nobr, .MathJax a": {
            border: 0,
            padding: 0,
            margin: 0,
            "max-width": "none",
            "max-height": "none",
            "min-width": 0,
            "min-height": 0,
            "vertical-align": 0,
            "line-height": "normal",
            "text-decoration": "none"
          },
          "img.MathJax_strut": {
            border: "0!important",
            padding: "0!important",
            margin: "0!important",
            "vertical-align": "0!important"
          },
          ".MathJax span": {
            display: "inline",
            position: "static",
            border: 0,
            padding: 0,
            margin: 0,
            "vertical-align": 0,
            "line-height": "normal",
            "text-decoration": "none"
          },
          ".MathJax nobr": {"white-space": "nowrap!important"},
          ".MathJax img": {
            display: "inline!important",
            "float": "none!important"
          },
          ".MathJax *": {
            transition: "none",
            "-webkit-transition": "none",
            "-moz-transition": "none",
            "-ms-transition": "none",
            "-o-transition": "none"
          },
          ".MathJax_Processing": {
            visibility: "hidden",
            position: "fixed",
            width: 0,
            height: 0,
            overflow: "hidden"
          },
          ".MathJax_Processed": {display: "none!important"},
          ".MathJax_ExBox": {
            display: "block!important",
            overflow: "hidden",
            width: "1px",
            height: "60ex",
            "min-height": 0,
            "max-height": "none"
          },
          ".MathJax .MathJax_EmBox": {
            display: "block!important",
            overflow: "hidden",
            width: "1px",
            height: "60em",
            "min-height": 0,
            "max-height": "none"
          },
          ".MathJax .MathJax_HitBox": {
            cursor: "text",
            background: "white",
            opacity: 0,
            filter: "alpha(opacity=0)"
          },
          ".MathJax .MathJax_HitBox *": {
            filter: "none",
            opacity: 1,
            background: "transparent"
          },
          "#MathJax_Tooltip": {
            position: "absolute",
            left: 0,
            top: 0,
            width: "auto",
            height: "auto",
            display: "none"
          },
          "#MathJax_Tooltip *": {
            filter: "none",
            opacity: 1,
            background: "transparent"
          },
          "@font-face": {
            "font-family": "MathJax_Blank",
            src: "url('about:blank')"
          }
        }},
      settings: b.config.menuSettings,
      Font: null,
      webFontDefault: "MathJax_Blank",
      allowWebFonts: "otf",
      maxStretchyParts: 1000,
      fontName: {
        TeXLocal: "TeX",
        TeXWeb: ["", "TeX"],
        TeXImage: ["", ""],
        STIXLocal: ["STIX", "STIX-Web"],
        STIXWeb: "STIX-Web",
        AsanaMathWeb: "Asana-Math",
        GyrePagellaWeb: "Gyre-Pagella",
        GyreTermesWeb: "Gyre-Termes",
        LatinModernWeb: "Latin-Modern",
        NeoEulerWeb: "Neo-Euler"
      },
      fontInUse: "generic",
      FONTDATA: {
        TeX_factor: 1,
        baselineskip: 1.2,
        lineH: 0.8,
        lineD: 0.2,
        ffLineH: 0.8,
        FONTS: {},
        VARIANT: {
          normal: {fonts: []},
          "-generic-variant": {},
          "-largeOp": {},
          "-smallOp": {}
        },
        RANGES: [],
        DELIMITERS: {},
        RULECHAR: 45,
        REMAP: {}
      },
      Config: function() {
        if (!this.require) {
          this.require = [];
        }
        this.Font = f();
        this.SUPER(arguments).Config.call(this);
        var m = this.settings,
            l = this.config,
            k = m.font;
        if (this.adjustAvailableFonts) {
          this.adjustAvailableFonts(l.availableFonts);
        }
        if (m.scale) {
          l.scale = m.scale;
        }
        if (k && k !== "Auto" && this.fontName[k]) {
          l.availableFonts = [];
          delete l.fonts;
          if (this.fontName[k] instanceof Array) {
            l.preferredFont = this.fontName[k][0];
            l.webFont = this.fontName[k][1];
          } else {
            l.preferredFont = l.webFont = this.fontName[k];
          }
          if (l.preferredFont) {
            l.availableFonts[0] = l.preferredFont;
          }
        }
        if (l.fonts) {
          l.availableFonts = l.fonts;
          l.preferredFont = l.webFont = l.fonts[0];
          if (l.webFont === "STIX") {
            l.webFont += "-Web";
          }
        }
        k = this.Font.findFont(l.availableFonts, l.preferredFont);
        if (!k && this.allowWebFonts) {
          k = l.webFont;
          if (k) {
            this.webFonts = true;
          }
        }
        if (!k && this.config.imageFont) {
          k = l.imageFont;
          this.imgFonts = true;
        }
        if (k) {
          this.fontInUse = k;
          this.fontDir += "/" + k;
          this.webfontDir += "/" + k;
          this.require.push(this.fontDir + "/fontdata.js");
          if (this.imgFonts) {
            this.require.push(this.directory + "/imageFonts.js");
            b.Startup.signal.Post("HTML-CSS Jax - using image fonts");
          }
        } else {
          e(["CantFindFontUsing", "Can't find a valid font using %1", "[" + this.config.availableFonts.join(", ") + "]"], null, 3000);
          b.Startup.signal.Post("HTML-CSS Jax - no valid font");
        }
        this.require.push(MathJax.OutputJax.extensionDir + "/MathEvents.js");
      },
      Startup: function() {
        j = MathJax.Extension.MathEvents.Event;
        a = MathJax.Extension.MathEvents.Touch;
        c = MathJax.Extension.MathEvents.Hover;
        this.ContextMenu = j.ContextMenu;
        this.Mousedown = j.AltContextMenu;
        this.Mouseover = c.Mouseover;
        this.Mouseout = c.Mouseout;
        this.Mousemove = c.Mousemove;
        this.hiddenDiv = this.Element("div", {style: {
            visibility: "hidden",
            overflow: "hidden",
            position: "absolute",
            top: 0,
            height: "1px",
            width: "auto",
            padding: 0,
            border: 0,
            margin: 0,
            textAlign: "left",
            textIndent: 0,
            textTransform: "none",
            lineHeight: "normal",
            letterSpacing: "normal",
            wordSpacing: "normal"
          }});
        if (!document.body.firstChild) {
          document.body.appendChild(this.hiddenDiv);
        } else {
          document.body.insertBefore(this.hiddenDiv, document.body.firstChild);
        }
        this.hiddenDiv = this.addElement(this.hiddenDiv, "div", {id: "MathJax_Hidden"});
        var l = this.addElement(this.hiddenDiv, "div", {style: {width: "5in"}});
        this.pxPerInch = l.offsetWidth / 5;
        this.hiddenDiv.removeChild(l);
        this.startMarker = this.createStrut(this.Element("span"), 10, true);
        this.endMarker = this.addText(this.Element("span"), "x").parentNode;
        this.HDspan = this.Element("span");
        if (this.operaHeightBug) {
          this.createStrut(this.HDspan, 0);
        }
        if (this.msieInlineBlockAlignBug) {
          this.HDimg = this.addElement(this.HDspan, "img", {style: {
              height: "0px",
              width: "1px"
            }});
          try {
            this.HDimg.src = "about:blank";
          } catch (k) {}
        } else {
          this.HDimg = this.createStrut(this.HDspan, 0);
        }
        this.EmExSpan = this.Element("span", {style: {
            position: "absolute",
            "font-size-adjust": "none"
          }}, [["span", {className: "MathJax_ExBox"}], ["span", {className: "MathJax"}, [["span", {className: "MathJax_EmBox"}]]]]);
        this.linebreakSpan = this.Element("span", null, [["hr", {style: {
            width: "100%",
            size: 1,
            padding: 0,
            border: 0,
            margin: 0
          }}]]);
        return h.Styles(this.config.styles, ["InitializeHTML", this]);
      },
      removeSTIXfonts: function(n) {
        for (var l = 0,
            k = n.length; l < k; l++) {
          if (n[l] === "STIX") {
            n.splice(l, 1);
            k--;
            l--;
          }
        }
        if (this.config.preferredFont === "STIX") {
          this.config.preferredFont = n[0];
        }
      },
      PreloadWebFonts: function() {
        if (!d.allowWebFonts || !d.config.preloadWebFonts) {
          return;
        }
        for (var l = 0,
            k = d.config.preloadWebFonts.length; l < k; l++) {
          var n = d.FONTDATA.FONTS[d.config.preloadWebFonts[l]];
          if (!n.available) {
            d.Font.testFont(n);
          }
        }
      },
      InitializeHTML: function() {
        this.PreloadWebFonts();
        this.getDefaultExEm();
        if (this.defaultEm) {
          return;
        }
        var k = MathJax.Callback();
        h.timer.start(h, function(l) {
          if (l.time(k)) {
            b.signal.Post(["HTML-CSS Jax - no default em size"]);
            return;
          }
          d.getDefaultExEm();
          if (d.defaultEm) {
            k();
          } else {
            setTimeout(l, l.delay);
          }
        }, this.defaultEmDelay, this.defaultEmTimeout);
        return k;
      },
      defaultEmDelay: 100,
      defaultEmTimeout: 1000,
      getDefaultExEm: function() {
        document.body.appendChild(this.EmExSpan);
        document.body.appendChild(this.linebreakSpan);
        this.defaultEx = this.EmExSpan.firstChild.offsetHeight / 60;
        this.defaultEm = this.EmExSpan.lastChild.firstChild.offsetHeight / 60;
        this.defaultWidth = this.linebreakSpan.firstChild.offsetWidth;
        document.body.removeChild(this.linebreakSpan);
        document.body.removeChild(this.EmExSpan);
      },
      preTranslate: function(q) {
        var p = q.jax[this.id],
            B,
            x = p.length,
            w,
            E,
            u,
            A,
            s,
            C,
            l,
            D,
            k,
            F,
            t,
            r = false,
            y,
            o = this.config.linebreaks.automatic,
            v = this.config.linebreaks.width;
        if (o) {
          r = (v.match(/^\s*(\d+(\.\d*)?%\s*)?container\s*$/) != null);
          if (r) {
            v = v.replace(/\s*container\s*/, "");
          } else {
            t = this.defaultWidth;
          }
          if (v === "") {
            v = "100%";
          }
        } else {
          t = 100000;
        }
        for (B = 0; B < x; B++) {
          E = p[B];
          if (!E.parentNode) {
            continue;
          }
          u = E.previousSibling;
          if (u && String(u.className).match(/^MathJax(_Display)?( MathJax_Processing)?$/)) {
            u.parentNode.removeChild(u);
          }
          l = E.MathJax.elementJax;
          if (!l) {
            continue;
          }
          l.HTMLCSS = {display: (l.root.Get("display") === "block")};
          A = s = this.Element("span", {
            className: "MathJax",
            id: l.inputID + "-Frame",
            isMathJax: true,
            jaxID: this.id,
            oncontextmenu: j.Menu,
            onmousedown: j.Mousedown,
            onmouseover: j.Mouseover,
            onmouseout: j.Mouseout,
            onmousemove: j.Mousemove,
            onclick: j.Click,
            ondblclick: j.DblClick,
            onkeydown: j.Keydown,
            tabIndex: b.getTabOrder(l)
          });
          if (b.Browser.noContextMenu) {
            A.ontouchstart = a.start;
            A.ontouchend = a.end;
          }
          if (l.HTMLCSS.display) {
            s = this.Element("div", {className: "MathJax_Display"});
            s.appendChild(A);
          } else {
            if (this.msieDisappearingBug) {
              A.style.display = "inline-block";
            }
          }
          s.className += " MathJax_Processing";
          E.parentNode.insertBefore(s, E);
          E.parentNode.insertBefore(this.EmExSpan.cloneNode(true), E);
          s.parentNode.insertBefore(this.linebreakSpan.cloneNode(true), s);
        }
        var z = [];
        for (B = 0; B < x; B++) {
          E = p[B];
          if (!E.parentNode) {
            continue;
          }
          C = E.previousSibling;
          s = C.previousSibling;
          l = E.MathJax.elementJax;
          if (!l) {
            continue;
          }
          D = C.firstChild.offsetHeight / 60;
          k = C.lastChild.firstChild.offsetHeight / 60;
          y = s.previousSibling.firstChild.offsetWidth;
          if (r) {
            t = y;
          }
          if (D === 0 || D === "NaN") {
            z.push(s);
            l.HTMLCSS.isHidden = true;
            D = this.defaultEx;
            k = this.defaultEm;
            y = this.defaultWidth;
            if (r) {
              t = y;
            }
          }
          F = (this.config.matchFontHeight ? D / this.TeX.x_height / k : 1);
          F = Math.floor(Math.max(this.config.minScaleAdjust / 100, F) * this.config.scale);
          l.HTMLCSS.scale = F / 100;
          l.HTMLCSS.fontSize = F + "%";
          l.HTMLCSS.em = l.HTMLCSS.outerEm = k;
          this.em = k * F / 100;
          l.HTMLCSS.ex = D;
          l.HTMLCSS.cwidth = y / this.em;
          l.HTMLCSS.lineWidth = (o ? this.length2em(v, 1, t / this.em) : 1000000);
        }
        for (B = 0, w = z.length; B < w; B++) {
          this.hiddenDiv.appendChild(z[B]);
          this.addElement(this.hiddenDiv, "br");
        }
        for (B = 0; B < x; B++) {
          E = p[B];
          if (!E.parentNode) {
            continue;
          }
          C = p[B].previousSibling;
          l = p[B].MathJax.elementJax;
          if (!l) {
            continue;
          }
          A = C.previousSibling;
          if (!l.HTMLCSS.isHidden) {
            A = A.previousSibling;
          }
          A.parentNode.removeChild(A);
          C.parentNode.removeChild(C);
        }
        q.HTMLCSSeqn = q.HTMLCSSlast = 0;
        q.HTMLCSSi = -1;
        q.HTMLCSSchunk = this.config.EqnChunk;
        q.HTMLCSSdelay = false;
      },
      PHASE: {
        I: 1,
        II: 2,
        III: 3
      },
      Translate: function(l, p) {
        if (!l.parentNode) {
          return;
        }
        if (p.HTMLCSSdelay) {
          p.HTMLCSSdelay = false;
          b.RestartAfter(MathJax.Callback.Delay(this.config.EqnChunkDelay));
        }
        var k = l.MathJax.elementJax,
            o = k.root,
            m = document.getElementById(k.inputID + "-Frame"),
            q = (k.HTMLCSS.display ? (m || {}).parentNode : m);
        if (!q) {
          return;
        }
        this.getMetrics(k);
        if (this.scale !== 1) {
          m.style.fontSize = k.HTMLCSS.fontSize;
        }
        this.initImg(m);
        this.initHTML(o, m);
        this.savePreview(l);
        try {
          o.setTeXclass();
          k.HTMLCSS.span = m;
          k.HTMLCSS.div = q;
          o.toHTML(m, q, this.PHASE.I);
        } catch (n) {
          if (n.restart) {
            while (m.firstChild) {
              m.removeChild(m.firstChild);
            }
          }
          this.restorePreview(l);
          throw n;
        }
        this.restorePreview(l);
        q.className = q.className.split(/ /)[0] + " MathJax_Processed";
        b.signal.Post(["New Math Pending", k.inputID]);
        p.HTMLCSSeqn += (p.i - p.HTMLCSSi);
        p.HTMLCSSi = p.i;
        if (p.HTMLCSSeqn >= p.HTMLCSSlast + p.HTMLCSSchunk) {
          this.postTranslate(p, true);
          p.HTMLCSSchunk = Math.floor(p.HTMLCSSchunk * this.config.EqnChunkFactor);
          p.HTMLCSSdelay = true;
        }
        return false;
      },
      savePreview: function(k) {
        var l = k.MathJax.preview;
        if (l) {
          k.MathJax.tmpPreview = document.createElement("span");
          l.parentNode.replaceChild(k.MathJax.tmpPreview, l);
        }
      },
      restorePreview: function(k) {
        var l = k.MathJax.tmpPreview;
        if (l) {
          l.parentNode.replaceChild(k.MathJax.preview, l);
          delete k.MathJax.tmpPreview;
        }
      },
      getMetrics: function(k) {
        var l = k.HTMLCSS;
        this.em = g.mbase.prototype.em = l.em * l.scale;
        this.outerEm = l.em;
        this.scale = l.scale;
        this.cwidth = l.cwidth;
        this.linebreakWidth = l.lineWidth;
      },
      postTranslate: function(l, s) {
        var p = l.jax[this.id],
            t,
            n,
            q,
            o;
        for (q = l.HTMLCSSlast, o = l.HTMLCSSeqn; q < o; q++) {
          t = p[q];
          if (t && t.MathJax.elementJax) {
            var k = t.MathJax.elementJax.HTMLCSS.div;
            k.className = k.className.split(/ /)[0];
            if (t.MathJax.preview) {
              t.MathJax.preview.innerHTML = "";
            }
          }
        }
        for (q = l.HTMLCSSlast, o = l.HTMLCSSeqn; q < o; q++) {
          t = p[q];
          if (t && t.MathJax.elementJax) {
            n = t.MathJax.elementJax;
            this.getMetrics(n);
            n.root.toHTML(n.HTMLCSS.span, n.HTMLCSS.div, this.PHASE.II);
          }
        }
        for (q = l.HTMLCSSlast, o = l.HTMLCSSeqn; q < o; q++) {
          t = p[q];
          if (t && t.MathJax.elementJax) {
            n = t.MathJax.elementJax;
            this.getMetrics(n);
            n.root.toHTML(n.HTMLCSS.span, n.HTMLCSS.div, this.PHASE.III);
            if (n.HTMLCSS.isHidden) {
              t.parentNode.insertBefore(n.HTMLCSS.div, t);
            }
            delete n.HTMLCSS.span;
            delete n.HTMLCSS.div;
            t.MathJax.state = n.STATE.PROCESSED;
            b.signal.Post(["New Math", t.MathJax.elementJax.inputID]);
          }
        }
        if (this.forceReflow) {
          var r = (document.styleSheets || [])[0] || {};
          r.disabled = true;
          r.disabled = false;
        }
        l.HTMLCSSlast = l.HTMLCSSeqn;
      },
      getJaxFromMath: function(k) {
        if (k.parentNode.className === "MathJax_Display") {
          k = k.parentNode;
        }
        do {
          k = k.nextSibling;
        } while (k && k.nodeName.toLowerCase() !== "script");
        return b.getJaxFor(k);
      },
      getHoverSpan: function(k, l) {
        return k.root.HTMLspanElement();
      },
      getHoverBBox: function(k, n, o) {
        var p = n.bbox,
            m = k.HTMLCSS.outerEm;
        var l = {
          w: p.w * m,
          h: p.h * m,
          d: p.d * m
        };
        if (p.width) {
          l.width = p.width;
        }
        return l;
      },
      Zoom: function(l, w, v, k, t) {
        w.className = "MathJax";
        w.style.fontSize = l.HTMLCSS.fontSize;
        var z = w.appendChild(this.EmExSpan.cloneNode(true));
        var o = z.lastChild.firstChild.offsetHeight / 60;
        this.em = g.mbase.prototype.em = o;
        this.outerEm = o / l.HTMLCSS.scale;
        z.parentNode.removeChild(z);
        this.scale = l.HTMLCSS.scale;
        this.linebreakWidth = l.HTMLCSS.lineWidth;
        this.cwidth = l.HTMLCSS.cwidth;
        this.zoomScale = parseInt(b.config.menuSettings.zscale) / 100;
        this.idPostfix = "-zoom";
        l.root.toHTML(w, w);
        this.idPostfix = "";
        this.zoomScale = 1;
        var x = l.root.HTMLspanElement().bbox,
            n = x.width;
        if (n) {
          if (x.tw) {
            k = x.tw * o;
          }
          if (x.w * o < k) {
            k = x.w * o;
          }
          w.style.width = Math.floor(k - 1.5 * d.em) + "px";
          w.style.display = "inline-block";
          var m = (l.root.id || "MathJax-Span-" + l.root.spanID) + "-zoom";
          var p = document.getElementById(m).firstChild;
          while (p && p.style.width !== n) {
            p = p.nextSibling;
          }
          if (p) {
            var s = p.offsetWidth;
            p.style.width = "100%";
            if (s > k) {
              w.style.width = (s + 100) + "px";
            }
          }
        }
        p = w.firstChild.firstChild.style;
        if (x.H != null && x.H > x.h) {
          p.marginTop = d.Em(x.H - Math.max(x.h, d.FONTDATA.lineH));
        }
        if (x.D != null && x.D > x.d) {
          p.marginBottom = d.Em(x.D - Math.max(x.d, d.FONTDATA.lineD));
        }
        if (x.lw < 0) {
          p.paddingLeft = d.Em(-x.lw);
        }
        if (x.rw > x.w) {
          p.marginRight = d.Em(x.rw - x.w);
        }
        w.style.position = "absolute";
        if (!n) {
          v.style.position = "absolute";
        }
        var u = w.offsetWidth,
            r = w.offsetHeight,
            y = v.offsetHeight,
            q = v.offsetWidth;
        w.style.position = v.style.position = "";
        return {
          Y: -j.getBBox(w).h,
          mW: q,
          mH: y,
          zW: u,
          zH: r
        };
      },
      initImg: function(k) {},
      initHTML: function(l, k) {},
      initFont: function(k) {
        var m = d.FONTDATA.FONTS,
            l = d.config.availableFonts;
        if (l && l.length && d.Font.testFont(m[k])) {
          m[k].available = true;
          if (m[k].familyFixed) {
            m[k].family = m[k].familyFixed;
            delete m[k].familyFixed;
          }
          return null;
        }
        if (!this.allowWebFonts) {
          return null;
        }
        m[k].isWebFont = true;
        if (d.FontFaceBug) {
          m[k].family = k;
          if (d.msieFontCSSBug) {
            m[k].family += "-Web";
          }
        }
        return h.Styles({"@font-face": this.Font.fontFace(k)});
      },
      Remove: function(k) {
        var l = document.getElementById(k.inputID + "-Frame");
        if (l) {
          if (k.HTMLCSS.display) {
            l = l.parentNode;
          }
          l.parentNode.removeChild(l);
        }
        delete k.HTMLCSS;
      },
      getHD: function(l, m) {
        if (l.bbox && this.config.noReflows && !m) {
          return {
            h: l.bbox.h,
            d: l.bbox.d
          };
        }
        var k = l.style.position;
        l.style.position = "absolute";
        this.HDimg.style.height = "0px";
        l.appendChild(this.HDspan);
        var n = {h: l.offsetHeight};
        this.HDimg.style.height = n.h + "px";
        n.d = l.offsetHeight - n.h;
        n.h -= n.d;
        n.h /= this.em;
        n.d /= this.em;
        l.removeChild(this.HDspan);
        l.style.position = k;
        return n;
      },
      getW: function(o) {
        var l,
            n,
            m = (o.bbox || {}).w,
            p = o;
        if (o.bbox && this.config.noReflows && o.bbox.exactW !== false) {
          if (!o.bbox.exactW) {
            if (o.style.paddingLeft) {
              m += this.unEm(o.style.paddingLeft) * (o.scale || 1);
            }
            if (o.style.paddingRight) {
              m += this.unEm(o.style.paddingRight) * (o.scale || 1);
            }
          }
          return m;
        }
        if (o.bbox && o.bbox.exactW) {
          return m;
        }
        if ((o.bbox && m >= 0 && !this.initialSkipBug && !this.msieItalicWidthBug) || this.negativeBBoxes || !o.firstChild) {
          l = o.offsetWidth;
          n = o.parentNode.offsetHeight;
        } else {
          if (o.bbox && m < 0 && this.msieNegativeBBoxBug) {
            l = -o.offsetWidth, n = o.parentNode.offsetHeight;
          } else {
            var k = o.style.position;
            o.style.position = "absolute";
            p = this.startMarker;
            o.insertBefore(p, o.firstChild);
            o.appendChild(this.endMarker);
            l = this.endMarker.offsetLeft - p.offsetLeft;
            o.removeChild(this.endMarker);
            o.removeChild(p);
            o.style.position = k;
          }
        }
        if (n != null) {
          o.parentNode.HH = n / this.em;
        }
        return l / this.em;
      },
      Measured: function(m, l) {
        var n = m.bbox;
        if (n.width == null && n.w && !n.isMultiline) {
          var k = this.getW(m);
          n.rw += k - n.w;
          n.w = k;
          n.exactW = true;
        }
        if (!l) {
          l = m.parentNode;
        }
        if (!l.bbox) {
          l.bbox = n;
        }
        return m;
      },
      Remeasured: function(l, k) {
        k.bbox = this.Measured(l, k).bbox;
      },
      MeasureSpans: function(o) {
        var r = [],
            t,
            q,
            n,
            u,
            k,
            p,
            l,
            s;
        for (q = 0, n = o.length; q < n; q++) {
          t = o[q];
          if (!t) {
            continue;
          }
          u = t.bbox;
          s = this.parentNode(t);
          if (u.exactW || u.width || u.w === 0 || u.isMultiline || (this.config.noReflows && u.exactW !== false)) {
            if (!s.bbox) {
              s.bbox = u;
            }
            continue;
          }
          if (this.negativeBBoxes || !t.firstChild || (u.w >= 0 && !this.initialSkipBug) || (u.w < 0 && this.msieNegativeBBoxBug)) {
            r.push([t]);
          } else {
            if (this.initialSkipBug) {
              k = this.startMarker.cloneNode(true);
              p = this.endMarker.cloneNode(true);
              t.insertBefore(k, t.firstChild);
              t.appendChild(p);
              r.push([t, k, p, t.style.position]);
              t.style.position = "absolute";
            } else {
              p = this.endMarker.cloneNode(true);
              t.appendChild(p);
              r.push([t, null, p]);
            }
          }
        }
        for (q = 0, n = r.length; q < n; q++) {
          t = r[q][0];
          u = t.bbox;
          s = this.parentNode(t);
          if ((u.w >= 0 && !this.initialSkipBug) || this.negativeBBoxes || !t.firstChild) {
            l = t.offsetWidth;
            s.HH = s.offsetHeight / this.em;
          } else {
            if (u.w < 0 && this.msieNegativeBBoxBug) {
              l = -t.offsetWidth, s.HH = s.offsetHeight / this.em;
            } else {
              l = r[q][2].offsetLeft - ((r[q][1] || {}).offsetLeft || 0);
            }
          }
          l /= this.em;
          u.rw += l - u.w;
          u.w = l;
          u.exactW = true;
          if (!s.bbox) {
            s.bbox = u;
          }
        }
        for (q = 0, n = r.length; q < n; q++) {
          t = r[q];
          if (t[1]) {
            t[1].parentNode.removeChild(t[1]), t[0].style.position = t[3];
          }
          if (t[2]) {
            t[2].parentNode.removeChild(t[2]);
          }
        }
      },
      Em: function(k) {
        if (Math.abs(k) < 0.0006) {
          return "0em";
        }
        return k.toFixed(3).replace(/\.?0+$/, "") + "em";
      },
      EmRounded: function(k) {
        k = (Math.round(k * d.em) + 0.05) / d.em;
        if (Math.abs(k) < 0.0006) {
          return "0em";
        }
        return k.toFixed(3).replace(/\.?0+$/, "") + "em";
      },
      unEm: function(k) {
        return parseFloat(k);
      },
      Px: function(k) {
        k *= this.em;
        var l = (k < 0 ? "-" : "");
        return l + Math.abs(k).toFixed(1).replace(/\.?0+$/, "") + "px";
      },
      unPx: function(k) {
        return parseFloat(k) / this.em;
      },
      Percent: function(k) {
        return (100 * k).toFixed(1).replace(/\.?0+$/, "") + "%";
      },
      length2em: function(r, l, p) {
        if (typeof(r) !== "string") {
          r = r.toString();
        }
        if (r === "") {
          return "";
        }
        if (r === g.SIZE.NORMAL) {
          return 1;
        }
        if (r === g.SIZE.BIG) {
          return 2;
        }
        if (r === g.SIZE.SMALL) {
          return 0.71;
        }
        if (r === "infinity") {
          return d.BIGDIMEN;
        }
        var o = this.FONTDATA.TeX_factor,
            s = (d.zoomScale || 1) / d.em;
        if (r.match(/mathspace$/)) {
          return d.MATHSPACE[r] * o;
        }
        var n = r.match(/^\s*([-+]?(?:\.\d+|\d+(?:\.\d*)?))?(pt|em|ex|mu|px|pc|in|mm|cm|%)?/);
        var k = parseFloat(n[1] || "1"),
            q = n[2];
        if (p == null) {
          p = 1;
        }
        if (l == null) {
          l = 1;
        }
        if (q === "em") {
          return k * o;
        }
        if (q === "ex") {
          return k * d.TeX.x_height * o;
        }
        if (q === "%") {
          return k / 100 * p;
        }
        if (q === "px") {
          return k * s;
        }
        if (q === "pt") {
          return k / 10 * o;
        }
        if (q === "pc") {
          return k * 1.2 * o;
        }
        if (q === "in") {
          return k * this.pxPerInch * s;
        }
        if (q === "cm") {
          return k * this.pxPerInch * s / 2.54;
        }
        if (q === "mm") {
          return k * this.pxPerInch * s / 25.4;
        }
        if (q === "mu") {
          return k / 18 * o * l;
        }
        return k * p;
      },
      thickness2em: function(l, k) {
        var m = d.TeX.rule_thickness;
        if (l === g.LINETHICKNESS.MEDIUM) {
          return m;
        }
        if (l === g.LINETHICKNESS.THIN) {
          return 0.67 * m;
        }
        if (l === g.LINETHICKNESS.THICK) {
          return 1.67 * m;
        }
        return this.length2em(l, k, m);
      },
      getPadding: function(l) {
        var n = {
          top: 0,
          right: 0,
          bottom: 0,
          left: 0
        },
            k = false;
        for (var o in n) {
          if (n.hasOwnProperty(o)) {
            var m = l.style["padding" + o.charAt(0).toUpperCase() + o.substr(1)];
            if (m) {
              n[o] = this.length2em(m);
              k = true;
            }
          }
        }
        return (k ? n : false);
      },
      getBorders: function(p) {
        var m = {
          top: 0,
          right: 0,
          bottom: 0,
          left: 0
        },
            n = {},
            l = false;
        for (var q in m) {
          if (m.hasOwnProperty(q)) {
            var k = "border" + q.charAt(0).toUpperCase() + q.substr(1);
            var o = p.style[k + "Style"];
            if (o) {
              l = true;
              m[q] = this.length2em(p.style[k + "Width"]);
              n[k] = [p.style[k + "Width"], p.style[k + "Style"], p.style[k + "Color"]].join(" ");
            }
          }
        }
        m.css = n;
        return (l ? m : false);
      },
      setBorders: function(k, l) {
        if (l) {
          for (var m in l.css) {
            if (l.css.hasOwnProperty(m)) {
              k.style[m] = l.css[m];
            }
          }
        }
      },
      createStrut: function(m, l, n) {
        var k = this.Element("span", {
          isMathJax: true,
          style: {
            display: "inline-block",
            overflow: "hidden",
            height: l + "px",
            width: "1px",
            marginRight: "-1px"
          }
        });
        if (n) {
          m.insertBefore(k, m.firstChild);
        } else {
          m.appendChild(k);
        }
        return k;
      },
      createBlank: function(l, k, m) {
        var n = this.Element("span", {
          isMathJax: true,
          style: {
            display: "inline-block",
            overflow: "hidden",
            height: "1px",
            width: this.Em(k)
          }
        });
        if (k < 0) {
          n.style.marginRight = n.style.width;
          n.style.width = 0;
        }
        if (m) {
          l.insertBefore(n, l.firstChild);
        } else {
          l.appendChild(n);
        }
        return n;
      },
      createShift: function(l, k, n) {
        var m = this.Element("span", {
          style: {marginLeft: this.Em(k)},
          isMathJax: true
        });
        if (n) {
          l.insertBefore(m, l.firstChild);
        } else {
          l.appendChild(m);
        }
        return m;
      },
      createSpace: function(p, n, o, q, m, s) {
        if (n < -o) {
          o = -n;
        }
        var r = this.Em(n + o),
            k = this.Em(-o);
        if (this.msieInlineBlockAlignBug) {
          k = this.Em(d.getHD(p.parentNode, true).d - o);
        }
        if (p.isBox || s) {
          var l = (p.scale == null ? 1 : p.scale);
          p.bbox = {
            exactW: true,
            h: n * l,
            d: o * l,
            w: q * l,
            rw: q * l,
            lw: 0
          };
          p.style.height = r;
          p.style.verticalAlign = k;
          p.HH = (n + o) * l;
        } else {
          p = this.addElement(p, "span", {
            style: {
              height: r,
              verticalAlign: k
            },
            isMathJax: true
          });
        }
        if (q >= 0) {
          p.style.width = this.Em(q);
          p.style.display = "inline-block";
          p.style.overflow = "hidden";
        } else {
          if (this.msieNegativeSpaceBug) {
            p.style.height = "";
          }
          p.style.marginLeft = this.Em(q);
          if (d.safariNegativeSpaceBug && p.parentNode.firstChild == p) {
            this.createBlank(p, 0, true);
          }
        }
        if (m && m !== g.COLOR.TRANSPARENT) {
          p.style.backgroundColor = m;
          p.style.position = "relative";
        }
        return p;
      },
      createRule: function(r, n, p, s, l) {
        if (n < -p) {
          p = -n;
        }
        var m = d.TeX.min_rule_thickness,
            o = 1;
        if (s > 0 && s * this.em < m) {
          s = m / this.em;
        }
        if (n + p > 0 && (n + p) * this.em < m) {
          o = 1 / (n + p) * (m / this.em);
          n *= o;
          p *= o;
        }
        if (!l) {
          l = "solid";
        } else {
          l = "solid " + l;
        }
        var k = {
          display: "inline-block",
          overflow: "hidden",
          verticalAlign: this.Em(-p)
        };
        if (s > n + p) {
          k.borderTop = this.Px(n + p) + " " + l;
          k.width = this.Em(s);
          k.height = (this.msieRuleBug && n + p > 0 ? this.Em(n + p) : 0);
        } else {
          k.borderLeft = this.Px(s) + " " + l;
          k.width = (this.msieRuleBug && s > 0 ? this.Em(s) : 0);
          k.height = this.Em(n + p);
        }
        var q = this.addElement(r, "span", {
          style: k,
          noAdjust: true,
          HH: n + p,
          isMathJax: true,
          bbox: {
            h: n,
            d: p,
            w: s,
            rw: s,
            lw: 0,
            exactW: true
          }
        });
        if (r.isBox || r.className == "mspace") {
          r.bbox = q.bbox, r.HH = n + p;
        }
        return q;
      },
      createFrame: function(s, q, r, u, x, l) {
        if (q < -r) {
          r = -q;
        }
        var p = 2 * x;
        if (this.msieFrameSizeBug) {
          if (u < p) {
            u = p;
          }
          if (q + r < p) {
            q = p - r;
          }
        }
        if (this.msieBorderWidthBug) {
          p = 0;
        }
        var v = this.Em(q + r - p),
            k = this.Em(-r - x),
            o = this.Em(u - p);
        var m = this.Px(x) + " " + l;
        var n = this.addElement(s, "span", {
          style: {
            border: m,
            display: "inline-block",
            overflow: "hidden",
            width: o,
            height: v
          },
          bbox: {
            h: q,
            d: r,
            w: u,
            rw: u,
            lw: 0,
            exactW: true
          },
          noAdjust: true,
          HH: q + r,
          isMathJax: true
        });
        if (k) {
          n.style.verticalAlign = k;
        }
        return n;
      },
      parentNode: function(l) {
        var k = l.parentNode;
        if (k.nodeName.toLowerCase() === "a") {
          k = k.parentNode;
        }
        return k;
      },
      createStack: function(m, o, l) {
        if (this.msiePaddingWidthBug) {
          this.createStrut(m, 0);
        }
        var n = String(l).match(/%$/);
        var k = (!n && l != null ? l : 0);
        m = this.addElement(m, "span", {
          noAdjust: true,
          HH: 0,
          isMathJax: true,
          style: {
            display: "inline-block",
            position: "relative",
            width: (n ? "100%" : this.Em(k)),
            height: 0
          }
        });
        if (!o) {
          m.parentNode.bbox = m.bbox = {
            exactW: true,
            h: -this.BIGDIMEN,
            d: -this.BIGDIMEN,
            w: k,
            lw: this.BIGDIMEN,
            rw: (!n && l != null ? l : -this.BIGDIMEN)
          };
          if (n) {
            m.bbox.width = l;
          }
        }
        return m;
      },
      createBox: function(l, k) {
        var m = this.addElement(l, "span", {
          style: {position: "absolute"},
          isBox: true,
          isMathJax: true
        });
        if (k != null) {
          m.style.width = k;
        }
        return m;
      },
      addBox: function(k, l) {
        l.style.position = "absolute";
        l.isBox = l.isMathJax = true;
        return k.appendChild(l);
      },
      placeBox: function(u, s, q, o) {
        u.isMathJax = true;
        var v = d.parentNode(u),
            C = u.bbox,
            z = v.bbox;
        if (this.msiePlaceBoxBug) {
          this.addText(u, this.NBSP);
        }
        if (this.imgSpaceBug) {
          this.addText(u, this.imgSpace);
        }
        var w,
            F = 0;
        if (u.HH != null) {
          w = u.HH;
        } else {
          if (C) {
            w = Math.max(3, C.h + C.d);
          } else {
            w = u.offsetHeight / this.em;
          }
        }
        if (!u.noAdjust) {
          w += 1;
          w = Math.round(w * this.em) / this.em;
          if (this.msieInlineBlockAlignBug) {
            this.addElement(u, "img", {
              className: "MathJax_strut",
              border: 0,
              src: "about:blank",
              isMathJax: true,
              style: {
                width: 0,
                height: this.Em(w)
              }
            });
          } else {
            this.addElement(u, "span", {
              isMathJax: true,
              style: {
                display: "inline-block",
                width: 0,
                height: this.Em(w)
              }
            });
            if (d.chromeHeightBug) {
              w -= (u.lastChild.offsetHeight - Math.round(w * this.em)) / this.em;
            }
          }
        }
        if (C) {
          if (this.initialSkipBug) {
            if (C.lw < 0) {
              F = C.lw;
              d.createBlank(u, -F, true);
            }
            if (C.rw > C.w) {
              d.createBlank(u, C.rw - C.w + 0.1);
            }
          }
          if (!this.msieClipRectBug && !C.noclip && !o) {
            var B = 3 / this.em;
            var A = (C.H == null ? C.h : C.H),
                m = (C.D == null ? C.d : C.D);
            var E = w - A - B,
                p = w + m + B,
                n = -1000,
                k = C.rw + 1000;
            u.style.clip = "rect(" + this.Em(E) + " " + this.Em(k) + " " + this.Em(p) + " " + this.Em(n) + ")";
          }
        }
        u.style.top = this.Em(-q - w);
        u.style.left = this.Em(s + F);
        if (C && z) {
          if (C.H != null && (z.H == null || C.H + q > z.H)) {
            z.H = C.H + q;
          }
          if (C.D != null && (z.D == null || C.D - q > z.D)) {
            z.D = C.D - q;
          }
          if (C.h + q > z.h) {
            z.h = C.h + q;
          }
          if (C.d - q > z.d) {
            z.d = C.d - q;
          }
          if (z.H != null && z.H <= z.h) {
            delete z.H;
          }
          if (z.D != null && z.D <= z.d) {
            delete z.D;
          }
          if (C.w + s > z.w) {
            z.w = C.w + s;
            if (z.width == null) {
              v.style.width = this.Em(z.w);
            }
          }
          if (C.rw + s > z.rw) {
            z.rw = C.rw + s;
          }
          if (C.lw + s < z.lw) {
            z.lw = C.lw + s;
          }
          if (C.width != null && !C.isFixed) {
            if (z.width == null) {
              v.style.width = z.width = "100%";
              if (C.minWidth) {
                v.style.minWidth = z.minWidth = C.minWidth;
              }
            }
            u.style.width = C.width;
          }
          if (C.tw) {
            z.tw = C.tw;
          }
        }
      },
      alignBox: function(s, o, q, v) {
        if (v == null) {
          v = 0;
        }
        this.placeBox(s, v, q);
        if (this.msiePlaceBoxBug) {
          var m = s.lastChild;
          while (m && m.nodeName !== "#text") {
            m = m.previousSibling;
          }
          if (m) {
            s.removeChild(m);
          }
        }
        var u = s.bbox;
        if (u.isMultiline) {
          return;
        }
        var t = u.width != null && !u.isFixed;
        var k = 0,
            p = v - u.w / 2,
            n = "50%";
        if (this.initialSkipBug) {
          k = u.w - u.rw - 0.1;
          p += u.lw;
        }
        if (this.msieMarginScaleBug) {
          p = (p * this.em) + "px";
        } else {
          p = this.Em(p);
        }
        if (t) {
          p = (v === 0 ? "" : this.Em(v));
          n = (50 - parseFloat(u.width) / 2) + "%";
        }
        b.Insert(s.style, ({
          right: {
            left: "",
            right: this.Em(k - v)
          },
          center: {
            left: n,
            marginLeft: p
          }
        })[o]);
      },
      setStackWidth: function(l, k) {
        if (typeof(k) === "number") {
          l.style.width = this.Em(Math.max(0, k));
          var m = l.bbox;
          if (m) {
            m.w = k;
            m.exactW = true;
          }
          m = l.parentNode.bbox;
          if (m) {
            m.w = k;
            m.exactW = true;
          }
        } else {
          l.style.width = l.parentNode.style.width = "100%";
          if (l.bbox) {
            l.bbox.width = k;
          }
          if (l.parentNode.bbox) {
            l.parentNode.bbox.width = k;
          }
        }
      },
      createDelimiter: function(u, k, n, q, o) {
        if (!k) {
          u.bbox = {
            h: 0,
            d: 0,
            w: this.TeX.nulldelimiterspace,
            lw: 0
          };
          u.bbox.rw = u.bbox.w;
          this.createSpace(u, u.bbox.h, u.bbox.d, u.bbox.w);
          return;
        }
        if (!q) {
          q = 1;
        }
        if (!(n instanceof Array)) {
          n = [n, n];
        }
        var t = n[1];
        n = n[0];
        var l = {alias: k};
        while (l.alias) {
          k = l.alias;
          l = this.FONTDATA.DELIMITERS[k];
          if (!l) {
            l = {HW: [0, this.FONTDATA.VARIANT[g.VARIANT.NORMAL]]};
          }
        }
        if (l.load) {
          b.RestartAfter(h.Require(this.fontDir + "/fontdata-" + l.load + ".js"));
        }
        for (var s = 0,
            p = l.HW.length; s < p; s++) {
          if (l.HW[s][0] * q >= n - 0.01 || (s == p - 1 && !l.stretch)) {
            if (l.HW[s][2]) {
              q *= l.HW[s][2];
            }
            if (l.HW[s][3]) {
              k = l.HW[s][3];
            }
            var r = this.addElement(u, "span");
            this.createChar(r, [k, l.HW[s][1]], q, o);
            u.bbox = r.bbox;
            u.offset = 0.65 * u.bbox.w;
            u.scale = q;
            return;
          }
        }
        if (l.stretch) {
          this["extendDelimiter" + l.dir](u, t, l.stretch, q, o);
        }
      },
      extendDelimiterV: function(A, t, E, F, w) {
        var o = this.createStack(A, true);
        var v = this.createBox(o),
            u = this.createBox(o);
        this.createChar(v, (E.top || E.ext), F, w);
        this.createChar(u, (E.bot || E.ext), F, w);
        var m = {bbox: {
            w: 0,
            lw: 0,
            rw: 0
          }},
            D = m,
            p;
        var B = v.bbox.h + v.bbox.d + u.bbox.h + u.bbox.d;
        var r = -v.bbox.h;
        this.placeBox(v, 0, r, true);
        r -= v.bbox.d;
        if (E.mid) {
          D = this.createBox(o);
          this.createChar(D, E.mid, F, w);
          B += D.bbox.h + D.bbox.d;
        }
        if (E.min && t < B * E.min) {
          t = B * E.min;
        }
        if (t > B) {
          m = this.Element("span");
          this.createChar(m, E.ext, F, w);
          var C = m.bbox.h + m.bbox.d,
              l = C - 0.05,
              x,
              q,
              z = (E.mid ? 2 : 1);
          q = x = Math.min(Math.ceil((t - B) / (z * l)), this.maxStretchyParts);
          if (!E.fullExtenders) {
            l = (t - B) / (z * x);
          }
          var s = (x / (x + 1)) * (C - l);
          l = C - s;
          r += s + l - m.bbox.h;
          while (z-- > 0) {
            while (x-- > 0) {
              if (!this.msieCloneNodeBug) {
                p = m.cloneNode(true);
              } else {
                p = this.Element("span");
                this.createChar(p, E.ext, F, w);
              }
              p.bbox = m.bbox;
              r -= l;
              this.placeBox(this.addBox(o, p), 0, r, true);
            }
            r += s - m.bbox.d;
            if (E.mid && z) {
              this.placeBox(D, 0, r - D.bbox.h, true);
              x = q;
              r += -(D.bbox.h + D.bbox.d) + s + l - m.bbox.h;
            }
          }
        } else {
          r += (B - t) / 2;
          if (E.mid) {
            this.placeBox(D, 0, r - D.bbox.h, true);
            r += -(D.bbox.h + D.bbox.d);
          }
          r += (B - t) / 2;
        }
        this.placeBox(u, 0, r - u.bbox.h, true);
        r -= u.bbox.h + u.bbox.d;
        A.bbox = {
          w: Math.max(v.bbox.w, m.bbox.w, u.bbox.w, D.bbox.w),
          lw: Math.min(v.bbox.lw, m.bbox.lw, u.bbox.lw, D.bbox.lw),
          rw: Math.max(v.bbox.rw, m.bbox.rw, u.bbox.rw, D.bbox.rw),
          h: 0,
          d: -r,
          exactW: true
        };
        A.scale = F;
        A.offset = 0.55 * A.bbox.w;
        A.isMultiChar = true;
        this.setStackWidth(o, A.bbox.w);
      },
      extendDelimiterH: function(B, o, E, G, y) {
        var r = this.createStack(B, true);
        var p = this.createBox(r),
            C = this.createBox(r);
        this.createChar(p, (E.left || E.rep), G, y);
        this.createChar(C, (E.right || E.rep), G, y);
        var l = this.Element("span");
        this.createChar(l, E.rep, G, y);
        var D = {bbox: {
            h: -this.BIGDIMEN,
            d: -this.BIGDIMEN
          }},
            m;
        this.placeBox(p, -p.bbox.lw, 0, true);
        var u = (p.bbox.rw - p.bbox.lw) + (C.bbox.rw - C.bbox.lw) - 0.05,
            t = p.bbox.rw - p.bbox.lw - 0.025,
            v;
        if (E.mid) {
          D = this.createBox(r);
          this.createChar(D, E.mid, G, y);
          u += D.bbox.w;
        }
        if (E.min && o < u * E.min) {
          o = u * E.min;
        }
        if (o > u) {
          var F = l.bbox.rw - l.bbox.lw,
              q = F - 0.05,
              z,
              s,
              A = (E.mid ? 2 : 1);
          s = z = Math.min(Math.ceil((o - u) / (A * q)), this.maxStretchyParts);
          if (!E.fillExtenders) {
            q = (o - u) / (A * z);
          }
          v = (z / (z + 1)) * (F - q);
          q = F - v;
          t -= l.bbox.lw + v;
          while (A-- > 0) {
            while (z-- > 0) {
              if (!this.cloneNodeBug) {
                m = l.cloneNode(true);
              } else {
                m = this.Element("span");
                this.createChar(m, E.rep, G, y);
              }
              m.bbox = l.bbox;
              this.placeBox(this.addBox(r, m), t, 0, true);
              t += q;
            }
            if (E.mid && A) {
              this.placeBox(D, t, 0, true);
              t += D.bbox.w - v;
              z = s;
            }
          }
        } else {
          t -= (u - o) / 2;
          if (E.mid) {
            this.placeBox(D, t, 0, true);
            t += D.bbox.w;
          }
          t -= (u - o) / 2;
        }
        this.placeBox(C, t, 0, true);
        B.bbox = {
          w: t + C.bbox.rw,
          lw: 0,
          rw: t + C.bbox.rw,
          h: Math.max(p.bbox.h, l.bbox.h, C.bbox.h, D.bbox.h),
          d: Math.max(p.bbox.d, l.bbox.d, C.bbox.d, D.bbox.d),
          exactW: true
        };
        B.scale = G;
        B.isMultiChar = true;
        this.setStackWidth(r, B.bbox.w);
      },
      createChar: function(s, p, n, k) {
        s.isMathJax = true;
        var r = s,
            t = "",
            o = {
              fonts: [p[1]],
              noRemap: true
            };
        if (k && k === g.VARIANT.BOLD) {
          o.fonts = [p[1] + "-bold", p[1]];
        }
        if (typeof(p[1]) !== "string") {
          o = p[1];
        }
        if (p[0] instanceof Array) {
          for (var q = 0,
              l = p[0].length; q < l; q++) {
            t += String.fromCharCode(p[0][q]);
          }
        } else {
          t = String.fromCharCode(p[0]);
        }
        if (p[4]) {
          n *= p[4];
        }
        if (n !== 1 || p[3]) {
          r = this.addElement(s, "span", {
            style: {fontSize: this.Percent(n)},
            scale: n,
            isMathJax: true
          });
          this.handleVariant(r, o, t);
          s.bbox = r.bbox;
        } else {
          this.handleVariant(s, o, t);
        }
        if (p[2]) {
          s.style.marginLeft = this.Em(p[2]);
        }
        if (p[3]) {
          s.firstChild.style.verticalAlign = this.Em(p[3]);
          s.bbox.h += p[3];
          if (s.bbox.h < 0) {
            s.bbox.h = 0;
          }
        }
        if (p[5]) {
          s.bbox.h += p[5];
        }
        if (p[6]) {
          s.bbox.d += p[6];
        }
        if (this.AccentBug && s.bbox.w === 0) {
          r.firstChild.nodeValue += this.NBSP;
        }
      },
      positionDelimiter: function(l, k) {
        k -= l.bbox.h;
        l.bbox.d -= k;
        l.bbox.h += k;
        if (k) {
          if (this.safariVerticalAlignBug || this.konquerorVerticalAlignBug || (this.operaVerticalAlignBug && l.isMultiChar)) {
            if (l.firstChild.style.display === "" && l.style.top !== "") {
              l = l.firstChild;
              k -= d.unEm(l.style.top);
            }
            l.style.position = "relative";
            l.style.top = this.Em(-k);
          } else {
            l.style.verticalAlign = this.Em(k);
            if (d.ffVerticalAlignBug) {
              d.createRule(l.parentNode, l.bbox.h, 0, 0);
              delete l.parentNode.bbox;
            }
          }
        }
      },
      handleVariant: function(z, o, r) {
        var y = "",
            w,
            B,
            s,
            C,
            k = z,
            l = !!z.style.fontFamily;
        if (r.length === 0) {
          return;
        }
        if (!z.bbox) {
          z.bbox = {
            w: 0,
            h: -this.BIGDIMEN,
            d: -this.BIGDIMEN,
            rw: -this.BIGDIMEN,
            lw: this.BIGDIMEN
          };
        }
        if (!o) {
          o = this.FONTDATA.VARIANT[g.VARIANT.NORMAL];
        }
        C = o;
        for (var A = 0,
            x = r.length; A < x; A++) {
          o = C;
          w = r.charCodeAt(A);
          B = r.charAt(A);
          if (w >= 55296 && w < 56319) {
            A++;
            w = (((w - 55296) << 10) + (r.charCodeAt(A) - 56320)) + 65536;
            if (this.FONTDATA.RemapPlane1) {
              var D = this.FONTDATA.RemapPlane1(w, o);
              w = D.n;
              o = D.variant;
            }
          } else {
            var t,
                q,
                u = this.FONTDATA.RANGES;
            for (t = 0, q = u.length; t < q; t++) {
              if (u[t].name === "alpha" && o.noLowerCase) {
                continue;
              }
              var p = o["offset" + u[t].offset];
              if (p && w >= u[t].low && w <= u[t].high) {
                if (u[t].remap && u[t].remap[w]) {
                  w = p + u[t].remap[w];
                } else {
                  w = w - u[t].low + p;
                  if (u[t].add) {
                    w += u[t].add;
                  }
                }
                if (o["variant" + u[t].offset]) {
                  o = this.FONTDATA.VARIANT[o["variant" + u[t].offset]];
                }
                break;
              }
            }
          }
          if (o.remap && o.remap[w]) {
            w = o.remap[w];
            if (o.remap.variant) {
              o = this.FONTDATA.VARIANT[o.remap.variant];
            }
          } else {
            if (this.FONTDATA.REMAP[w] && !o.noRemap) {
              w = this.FONTDATA.REMAP[w];
            }
          }
          if (w instanceof Array) {
            o = this.FONTDATA.VARIANT[w[1]];
            w = w[0];
          }
          if (typeof(w) === "string") {
            r = w + r.substr(A + 1);
            x = r.length;
            A = -1;
            continue;
          }
          s = this.lookupChar(o, w);
          B = s[w];
          if (l || (!this.checkFont(s, k.style) && !B[5].img)) {
            if (y.length) {
              this.addText(k, y);
              y = "";
            }
            var v = !!k.style.fontFamily || !!z.style.fontStyle || !!z.style.fontWeight || !s.directory || l;
            l = false;
            if (k !== z) {
              v = !this.checkFont(s, z.style);
              k = z;
            }
            if (v) {
              k = this.addElement(z, "span", {
                isMathJax: true,
                subSpan: true
              });
            }
            this.handleFont(k, s, k !== z);
          }
          y = this.handleChar(k, s, B, w, y);
          if (!(B[5] || {}).space) {
            if (B[0] / 1000 > z.bbox.h) {
              z.bbox.h = B[0] / 1000;
            }
            if (B[1] / 1000 > z.bbox.d) {
              z.bbox.d = B[1] / 1000;
            }
          }
          if (z.bbox.w + B[3] / 1000 < z.bbox.lw) {
            z.bbox.lw = z.bbox.w + B[3] / 1000;
          }
          if (z.bbox.w + B[4] / 1000 > z.bbox.rw) {
            z.bbox.rw = z.bbox.w + B[4] / 1000;
          }
          z.bbox.w += B[2] / 1000;
          if ((B[5] || {}).isUnknown) {
            z.bbox.exactW = false;
          }
        }
        if (y.length) {
          this.addText(k, y);
        }
        if (z.scale && z.scale !== 1) {
          z.bbox.h *= z.scale;
          z.bbox.d *= z.scale;
          z.bbox.w *= z.scale;
          z.bbox.lw *= z.scale;
          z.bbox.rw *= z.scale;
        }
        if (r.length == 1 && s.skew && s.skew[w]) {
          z.bbox.skew = s.skew[w];
        }
      },
      checkFont: function(k, l) {
        var m = (l.fontWeight || "normal");
        if (m.match(/^\d+$/)) {
          m = (parseInt(m) >= 600 ? "bold" : "normal");
        }
        return (k.family.replace(/'/g, "") === l.fontFamily.replace(/'/g, "") && (k.style || "normal") === (l.fontStyle || "normal") && (k.weight || "normal") === m);
      },
      handleFont: function(m, k, o) {
        m.style.fontFamily = k.family;
        if (!k.directory) {
          m.style.fontSize = Math.floor(d.config.scale / d.scale + 0.5) + "%";
        }
        if (!(d.FontFaceBug && k.isWebFont)) {
          var l = k.style || "normal",
              n = k.weight || "normal";
          if (l !== "normal" || o) {
            m.style.fontStyle = l;
          }
          if (n !== "normal" || o) {
            m.style.fontWeight = n;
          }
        }
      },
      handleChar: function(l, k, s, r, q) {
        var p = s[5];
        if (p.space) {
          if (q.length) {
            this.addText(l, q);
          }
          d.createShift(l, s[2] / 1000);
          return "";
        }
        if (p.img) {
          return this.handleImg(l, k, s, r, q);
        }
        if (p.isUnknown && this.FONTDATA.DELIMITERS[r]) {
          if (q.length) {
            this.addText(l, q);
          }
          var o = l.scale;
          d.createDelimiter(l, r, 0, 1, k);
          if (this.FONTDATA.DELIMITERS[r].dir === "V") {
            l.style.verticalAlign = this.Em(l.bbox.d);
            l.bbox.h += l.bbox.d;
            l.bbox.d = 0;
          }
          l.scale = o;
          s[0] = l.bbox.h * 1000;
          s[1] = l.bbox.d * 1000;
          s[2] = l.bbox.w * 1000;
          s[3] = l.bbox.lw * 1000;
          s[4] = l.bbox.rw * 1000;
          return "";
        }
        if (p.c == null) {
          if (r <= 65535) {
            p.c = String.fromCharCode(r);
          } else {
            var m = r - 65536;
            p.c = String.fromCharCode((m >> 10) + 55296) + String.fromCharCode((m & 1023) + 56320);
          }
        }
        if (d.ffFontOptimizationBug && s[4] - s[2] > 125) {
          l.style.textRendering = "optimizeLegibility";
        }
        if (p.rfix) {
          this.addText(l, q + p.c);
          d.createShift(l, p.rfix / 1000);
          return "";
        }
        if (s[2] || !this.msieAccentBug || q.length) {
          return q + p.c;
        }
        d.createShift(l, s[3] / 1000);
        d.createShift(l, (s[4] - s[3]) / 1000);
        this.addText(l, p.c);
        d.createShift(l, -s[4] / 1000);
        return "";
      },
      handleImg: function(l, k, p, o, m) {
        return m;
      },
      lookupChar: function(p, s) {
        var o,
            k;
        if (!p.FONTS) {
          var r = this.FONTDATA.FONTS;
          var q = (p.fonts || this.FONTDATA.VARIANT.normal.fonts);
          if (!(q instanceof Array)) {
            q = [q];
          }
          if (p.fonts != q) {
            p.fonts = q;
          }
          p.FONTS = [];
          for (o = 0, k = q.length; o < k; o++) {
            if (r[q[o]]) {
              p.FONTS.push(r[q[o]]);
              r[q[o]].name = q[o];
            }
          }
        }
        for (o = 0, k = p.FONTS.length; o < k; o++) {
          var l = p.FONTS[o];
          if (typeof(l) === "string") {
            delete p.FONTS;
            this.loadFont(l);
          }
          if (l[s]) {
            if (l[s].length === 5) {
              l[s][5] = {};
            }
            if (d.allowWebFonts && !l.available) {
              this.loadWebFont(l);
            } else {
              return l;
            }
          } else {
            this.findBlock(l, s);
          }
        }
        return this.unknownChar(p, s);
      },
      unknownChar: function(k, m) {
        var l = (k.defaultFont || {family: d.config.undefinedFamily});
        if (k.bold) {
          l.weight = "bold";
        }
        if (k.italic) {
          l.style = "italic";
        }
        if (!l[m]) {
          l[m] = [800, 200, 500, 0, 500, {isUnknown: true}];
        }
        b.signal.Post(["HTML-CSS Jax - unknown char", m, k]);
        return l;
      },
      findBlock: function(l, q) {
        if (l.Ranges) {
          for (var p = 0,
              k = l.Ranges.length; p < k; p++) {
            if (q < l.Ranges[p][0]) {
              return;
            }
            if (q <= l.Ranges[p][1]) {
              var o = l.Ranges[p][2];
              for (var n = l.Ranges.length - 1; n >= 0; n--) {
                if (l.Ranges[n][2] == o) {
                  l.Ranges.splice(n, 1);
                }
              }
              this.loadFont(l.directory + "/" + o + ".js");
            }
          }
        }
      },
      loadFont: function(l) {
        var k = MathJax.Callback.Queue();
        k.Push(["Require", h, this.fontDir + "/" + l]);
        if (this.imgFonts) {
          if (!MathJax.isPacked) {
            l = l.replace(/\/([^\/]*)$/, d.imgPacked + "/$1");
          }
          k.Push(["Require", h, this.webfontDir + "/png/" + l]);
        }
        b.RestartAfter(k.Push({}));
      },
      loadWebFont: function(k) {
        k.available = k.isWebFont = true;
        if (d.FontFaceBug) {
          k.family = k.name;
          if (d.msieFontCSSBug) {
            k.family += "-Web";
          }
        }
        b.RestartAfter(this.Font.loadWebFont(k));
      },
      loadWebFontError: function(l, k) {
        b.Startup.signal.Post("HTML-CSS Jax - disable web fonts");
        l.isWebFont = false;
        if (this.config.imageFont && this.config.imageFont === this.fontInUse) {
          this.imgFonts = true;
          b.Startup.signal.Post("HTML-CSS Jax - switch to image fonts");
          b.Startup.signal.Post("HTML-CSS Jax - using image fonts");
          e(["WebFontNotAvailable", "Web-Fonts not available -- using image fonts instead"], null, 3000);
          h.Require(this.directory + "/imageFonts.js", k);
        } else {
          this.allowWebFonts = false;
          k();
        }
      },
      Element: MathJax.HTML.Element,
      addElement: MathJax.HTML.addElement,
      TextNode: MathJax.HTML.TextNode,
      addText: MathJax.HTML.addText,
      ucMatch: MathJax.HTML.ucMatch,
      BIGDIMEN: 10000000,
      ID: 0,
      idPostfix: "",
      GetID: function() {
        this.ID++;
        return this.ID;
      },
      MATHSPACE: {
        veryverythinmathspace: 1 / 18,
        verythinmathspace: 2 / 18,
        thinmathspace: 3 / 18,
        mediummathspace: 4 / 18,
        thickmathspace: 5 / 18,
        verythickmathspace: 6 / 18,
        veryverythickmathspace: 7 / 18,
        negativeveryverythinmathspace: -1 / 18,
        negativeverythinmathspace: -2 / 18,
        negativethinmathspace: -3 / 18,
        negativemediummathspace: -4 / 18,
        negativethickmathspace: -5 / 18,
        negativeverythickmathspace: -6 / 18,
        negativeveryverythickmathspace: -7 / 18
      },
      TeX: {
        x_height: 0.430554,
        quad: 1,
        num1: 0.676508,
        num2: 0.393732,
        num3: 0.44373,
        denom1: 0.685951,
        denom2: 0.344841,
        sup1: 0.412892,
        sup2: 0.362892,
        sup3: 0.288888,
        sub1: 0.15,
        sub2: 0.247217,
        sup_drop: 0.386108,
        sub_drop: 0.05,
        delim1: 2.39,
        delim2: 1,
        axis_height: 0.25,
        rule_thickness: 0.06,
        big_op_spacing1: 0.111111,
        big_op_spacing2: 0.166666,
        big_op_spacing3: 0.2,
        big_op_spacing4: 0.6,
        big_op_spacing5: 0.1,
        scriptspace: 0.1,
        nulldelimiterspace: 0.12,
        delimiterfactor: 901,
        delimitershortfall: 0.3,
        min_rule_thickness: 1.25
      },
      NBSP: "\u00A0",
      rfuzz: 0
    });
    MathJax.Hub.Register.StartupHook("mml Jax Ready", function() {
      g = MathJax.ElementJax.mml;
      g.mbase.Augment({
        toHTML: function(o) {
          o = this.HTMLcreateSpan(o);
          if (this.type != "mrow") {
            o = this.HTMLhandleSize(o);
          }
          for (var l = 0,
              k = this.data.length; l < k; l++) {
            if (this.data[l]) {
              this.data[l].toHTML(o);
            }
          }
          var s = this.HTMLcomputeBBox(o);
          var n = o.bbox.h,
              r = o.bbox.d,
              p = false,
              q;
          for (l = 0, k = s.length; l < k; l++) {
            q = s[l].HTMLspanElement().bbox;
            if (s[l].forceStretch || q.h !== n || q.d !== r) {
              s[l].HTMLstretchV(o, n, r);
              p = true;
            } else {
              if (s[l].needsBBox) {
                p = true;
              }
            }
          }
          if (p) {
            this.HTMLcomputeBBox(o, true);
          }
          if (this.HTMLlineBreaks(o)) {
            o = this.HTMLmultiline(o);
          }
          this.HTMLhandleSpace(o);
          this.HTMLhandleColor(o);
          if (this.data.length === 1 && this.data[0]) {
            q = this.data[0].HTMLspanElement().bbox;
            if (q.skew) {
              o.bbox.skew = q.skew;
            }
          }
          return o;
        },
        HTMLlineBreaks: function() {
          return false;
        },
        HTMLmultiline: function() {
          g.mbase.HTMLautoloadFile("multiline");
        },
        HTMLcomputeBBox: function(q, p, o, k) {
          if (o == null) {
            o = 0;
          }
          if (k == null) {
            k = this.data.length;
          }
          var n = q.bbox = {exactW: true},
              r = [];
          while (o < k) {
            var l = this.data[o];
            if (!l) {
              continue;
            }
            if (!p && l.HTMLcanStretch("Vertical")) {
              r.push(l);
              l = (l.CoreMO() || l);
              r[r.length - 1].needsBBox = (l !== this.data[o]);
            }
            this.HTMLcombineBBoxes(l, n);
            o++;
          }
          this.HTMLcleanBBox(n);
          return r;
        },
        HTMLcombineBBoxes: function(k, l) {
          if (l.w == null) {
            this.HTMLemptyBBox(l);
          }
          var n = (k.bbox ? k : k.HTMLspanElement());
          if (!n || !n.bbox) {
            return;
          }
          var m = n.bbox;
          if (m.d > l.d) {
            l.d = m.d;
          }
          if (m.h > l.h) {
            l.h = m.h;
          }
          if (m.D != null && m.D > l.D) {
            l.D = m.D;
          }
          if (m.H != null && m.H > l.H) {
            l.H = m.H;
          }
          if (n.style.paddingLeft) {
            l.w += d.unEm(n.style.paddingLeft) * (n.scale || 1);
          }
          if (l.w + m.lw < l.lw) {
            l.lw = l.w + m.lw;
          }
          if (l.w + m.rw > l.rw) {
            l.rw = l.w + m.rw;
          }
          l.w += m.w;
          if (n.style.paddingRight) {
            l.w += d.unEm(n.style.paddingRight) * (n.scale || 1);
          }
          if (m.width) {
            l.width = m.width;
            l.minWidth = m.minWidth;
          }
          if (m.tw) {
            l.tw = m.tw;
          }
          if (m.ic) {
            l.ic = m.ic;
          } else {
            delete l.ic;
          }
          if (l.exactW && !m.exactW) {
            l.exactW = m.exactW;
          }
        },
        HTMLemptyBBox: function(k) {
          k.h = k.d = k.H = k.D = k.rw = -d.BIGDIMEN;
          k.w = 0;
          k.lw = d.BIGDIMEN;
          return k;
        },
        HTMLcleanBBox: function(k) {
          if (k.h === this.BIGDIMEN) {
            k.h = k.d = k.H = k.D = k.w = k.rw = k.lw = 0;
          }
          if (k.D <= k.d) {
            delete k.D;
          }
          if (k.H <= k.h) {
            delete k.H;
          }
        },
        HTMLzeroBBox: function() {
          return {
            h: 0,
            d: 0,
            w: 0,
            lw: 0,
            rw: 0
          };
        },
        HTMLcanStretch: function(l) {
          if (this.isEmbellished()) {
            var k = this.Core();
            if (k && k !== this) {
              return k.HTMLcanStretch(l);
            }
          }
          return false;
        },
        HTMLstretchH: function(l, k) {
          return this.HTMLspanElement();
        },
        HTMLstretchV: function(l, k, m) {
          return this.HTMLspanElement();
        },
        HTMLnotEmpty: function(k) {
          while (k) {
            if ((k.type !== "mrow" && k.type !== "texatom") || k.data.length > 1) {
              return true;
            }
            k = k.data[0];
          }
          return false;
        },
        HTMLmeasureChild: function(l, k) {
          if (this.data[l]) {
            d.Measured(this.data[l].toHTML(k), k);
          } else {
            k.bbox = this.HTMLzeroBBox();
          }
        },
        HTMLboxChild: function(l, k) {
          if (!this.data[l]) {
            this.SetData(l, g.mrow());
          }
          return this.data[l].toHTML(k);
        },
        HTMLcreateSpan: function(k) {
          if (this.spanID) {
            var l = this.HTMLspanElement();
            if (l && (l.parentNode === k || (l.parentNode || {}).parentNode === k)) {
              while (l.firstChild) {
                l.removeChild(l.firstChild);
              }
              l.bbox = this.HTMLzeroBBox();
              l.scale = 1;
              l.isMultChar = l.HH = null;
              l.style.cssText = "";
              return l;
            }
          }
          if (this.href) {
            k = d.addElement(k, "a", {
              href: this.href,
              isMathJax: true
            });
          }
          k = d.addElement(k, "span", {
            className: this.type,
            isMathJax: true
          });
          if (d.imgHeightBug) {
            k.style.display = "inline-block";
          }
          if (this["class"]) {
            k.className += " " + this["class"];
          }
          if (!this.spanID) {
            this.spanID = d.GetID();
          }
          k.id = (this.id || "MathJax-Span-" + this.spanID) + d.idPostfix;
          k.bbox = this.HTMLzeroBBox();
          this.styles = {};
          if (this.style) {
            k.style.cssText = this.style;
            if (k.style.fontSize) {
              this.mathsize = k.style.fontSize;
              k.style.fontSize = "";
            }
            this.styles = {
              border: d.getBorders(k),
              padding: d.getPadding(k)
            };
            if (this.styles.border) {
              k.style.border = "";
            }
            if (this.styles.padding) {
              k.style.padding = "";
            }
          }
          if (this.href) {
            k.parentNode.bbox = k.bbox;
          }
          this.HTMLaddAttributes(k);
          return k;
        },
        HTMLaddAttributes: function(n) {
          if (this.attrNames) {
            var s = this.attrNames,
                o = g.nocopyAttributes,
                r = b.config.ignoreMMLattributes;
            var p = (this.type === "mstyle" ? g.math.prototype.defaults : this.defaults);
            for (var l = 0,
                k = s.length; l < k; l++) {
              var q = s[l];
              if (r[q] == false || (!o[q] && !r[q] && p[q] == null && typeof(n[q]) === "undefined")) {
                n.setAttribute(q, this.attr[q]);
              }
            }
          }
        },
        HTMLspanElement: function() {
          if (!this.spanID) {
            return null;
          }
          return document.getElementById((this.id || "MathJax-Span-" + this.spanID) + d.idPostfix);
        },
        HTMLhandleVariant: function(l, k, m) {
          d.handleVariant(l, k, m);
        },
        HTMLhandleSize: function(k) {
          if (!k.scale) {
            k.scale = this.HTMLgetScale();
            if (k.scale !== 1) {
              k.style.fontSize = d.Percent(k.scale);
            }
          }
          return k;
        },
        HTMLhandleDir: function(l) {
          var k = this.Get("dir", true);
          if (k) {
            l.dir = k;
          }
          return l;
        },
        HTMLhandleColor: function(w) {
          var y = this.getValues("mathcolor", "color");
          if (this.mathbackground) {
            y.mathbackground = this.mathbackground;
          }
          if (this.background) {
            y.background = this.background;
          }
          if (this.style && w.style.backgroundColor) {
            y.mathbackground = w.style.backgroundColor;
            w.style.backgroundColor = "transparent";
          }
          var t = (this.styles || {}).border,
              v = (this.styles || {}).padding;
          if (y.color && !this.mathcolor) {
            y.mathcolor = y.color;
          }
          if (y.background && !this.mathbackground) {
            y.mathbackground = y.background;
          }
          if (y.mathcolor) {
            w.style.color = y.mathcolor;
          }
          if ((y.mathbackground && y.mathbackground !== g.COLOR.TRANSPARENT) || t || v) {
            var A = w.bbox,
                z = (A.exact ? 0 : 1 / d.em),
                u = 0,
                s = 0,
                m = w.style.paddingLeft,
                q = w.style.paddingRight;
            if (this.isToken) {
              u = A.lw;
              s = A.rw - A.w;
            }
            if (m !== "") {
              u += d.unEm(m) * (w.scale || 1);
            }
            if (q !== "") {
              s -= d.unEm(q) * (w.scale || 1);
            }
            var l = (d.PaddingWidthBug || A.keepPadding || A.exactW ? 0 : s - u);
            var o = Math.max(0, d.getW(w) + l);
            var x = A.h + A.d,
                k = -A.d,
                r = 0,
                p = 0;
            if (o > 0) {
              o += 2 * z;
              u -= z;
            }
            if (x > 0) {
              x += 2 * z;
              k -= z;
            }
            s = -o - u;
            if (t) {
              s -= t.right;
              k -= t.bottom;
              r += t.left;
              p += t.right;
              A.h += t.top;
              A.d += t.bottom;
              A.w += t.left + t.right;
              A.lw -= t.left;
              A.rw += t.right;
            }
            if (v) {
              x += v.top + v.bottom;
              o += v.left + v.right;
              s -= v.right;
              k -= v.bottom;
              r += v.left;
              p += v.right;
              A.h += v.top;
              A.d += v.bottom;
              A.w += v.left + v.right;
              A.lw -= v.left;
              A.rw += v.right;
            }
            if (p) {
              w.style.paddingRight = d.Em(p);
            }
            var n = d.Element("span", {
              id: "MathJax-Color-" + this.spanID + d.idPostfix,
              isMathJax: true,
              style: {
                display: "inline-block",
                backgroundColor: y.mathbackground,
                width: d.Em(o),
                height: d.Em(x),
                verticalAlign: d.Em(k),
                marginLeft: d.Em(u),
                marginRight: d.Em(s)
              }
            });
            d.setBorders(n, t);
            if (A.width) {
              n.style.width = A.width;
              n.style.marginRight = "-" + A.width;
            }
            if (d.msieInlineBlockAlignBug) {
              n.style.position = "relative";
              n.style.width = n.style.height = 0;
              n.style.verticalAlign = n.style.marginLeft = n.style.marginRight = "";
              n.style.border = n.style.padding = "";
              if (t && d.msieBorderWidthBug) {
                x += t.top + t.bottom;
                o += t.left + t.right;
              }
              n.style.width = d.Em(r + z);
              d.placeBox(d.addElement(n, "span", {
                noAdjust: true,
                isMathJax: true,
                style: {
                  display: "inline-block",
                  position: "absolute",
                  overflow: "hidden",
                  background: (y.mathbackground || "transparent"),
                  width: d.Em(o),
                  height: d.Em(x)
                }
              }), u, A.h + z);
              d.setBorders(n.firstChild, t);
            }
            w.parentNode.insertBefore(n, w);
            if (d.msieColorPositionBug) {
              w.style.position = "relative";
            }
            return n;
          }
          return null;
        },
        HTMLremoveColor: function() {
          var k = document.getElementById("MathJax-Color-" + this.spanID + d.idPostfix);
          if (k) {
            k.parentNode.removeChild(k);
          }
        },
        HTMLhandleSpace: function(o) {
          if (this.useMMLspacing) {
            if (this.type !== "mo") {
              return;
            }
            var m = this.getValues("scriptlevel", "lspace", "rspace");
            if (m.scriptlevel <= 0 || this.hasValue("lspace") || this.hasValue("rspace")) {
              var l = this.HTMLgetMu(o);
              m.lspace = Math.max(0, d.length2em(m.lspace, l));
              m.rspace = Math.max(0, d.length2em(m.rspace, l));
              var k = this,
                  n = this.Parent();
              while (n && n.isEmbellished() && n.Core() === k) {
                k = n;
                n = n.Parent();
                o = k.HTMLspanElement();
              }
              if (m.lspace) {
                o.style.paddingLeft = d.Em(m.lspace);
              }
              if (m.rspace) {
                o.style.paddingRight = d.Em(m.rspace);
              }
            }
          } else {
            var p = this.texSpacing();
            if (p !== "") {
              this.HTMLgetScale();
              p = d.length2em(p, this.scale) / (o.scale || 1) * this.mscale;
              if (o.style.paddingLeft) {
                p += d.unEm(o.style.paddingLeft);
              }
              o.style.paddingLeft = d.Em(p);
            }
          }
        },
        HTMLgetScale: function() {
          if (this.scale) {
            return this.scale * this.mscale;
          }
          var m = 1,
              k = this.getValues("scriptlevel", "fontsize");
          k.mathsize = (this.isToken ? this : this.Parent()).Get("mathsize");
          if (this.style) {
            var l = this.HTMLspanElement();
            if (l.style.fontSize != "") {
              k.fontsize = l.style.fontSize;
            }
          }
          if (k.fontsize && !this.mathsize) {
            k.mathsize = k.fontsize;
          }
          if (k.scriptlevel !== 0) {
            if (k.scriptlevel > 2) {
              k.scriptlevel = 2;
            }
            m = Math.pow(this.Get("scriptsizemultiplier"), k.scriptlevel);
            k.scriptminsize = d.length2em(this.Get("scriptminsize"));
            if (m < k.scriptminsize) {
              m = k.scriptminsize;
            }
          }
          this.scale = m;
          this.mscale = d.length2em(k.mathsize);
          return m * this.mscale;
        },
        HTMLgetMu: function(m) {
          var k = 1,
              l = this.getValues("scriptlevel", "scriptsizemultiplier");
          if (m.scale && m.scale !== 1) {
            k = 1 / m.scale;
          }
          if (l.scriptlevel !== 0) {
            if (l.scriptlevel > 2) {
              l.scriptlevel = 2;
            }
            k = Math.sqrt(Math.pow(l.scriptsizemultiplier, l.scriptlevel));
          }
          return k;
        },
        HTMLgetVariant: function() {
          var k = this.getValues("mathvariant", "fontfamily", "fontweight", "fontstyle");
          k.hasVariant = this.Get("mathvariant", true);
          if (!k.hasVariant) {
            k.family = k.fontfamily;
            k.weight = k.fontweight;
            k.style = k.fontstyle;
          }
          if (this.style) {
            var m = this.HTMLspanElement();
            if (!k.family && m.style.fontFamily) {
              k.family = m.style.fontFamily;
            }
            if (!k.weight && m.style.fontWeight) {
              k.weight = m.style.fontWeight;
            }
            if (!k.style && m.style.fontStyle) {
              k.style = m.style.fontStyle;
            }
          }
          if (k.weight && k.weight.match(/^\d+$/)) {
            k.weight = (parseInt(k.weight) > 600 ? "bold" : "normal");
          }
          var l = k.mathvariant;
          if (this.variantForm) {
            l = "-" + d.fontInUse + "-variant";
          }
          if (k.family && !k.hasVariant) {
            if (!k.weight && k.mathvariant.match(/bold/)) {
              k.weight = "bold";
            }
            if (!k.style && k.mathvariant.match(/italic/)) {
              k.style = "italic";
            }
            return {
              FONTS: [],
              fonts: [],
              noRemap: true,
              defaultFont: {
                family: k.family,
                style: k.style,
                weight: k.weight
              }
            };
          }
          if (k.weight === "bold") {
            l = {
              normal: g.VARIANT.BOLD,
              italic: g.VARIANT.BOLDITALIC,
              fraktur: g.VARIANT.BOLDFRAKTUR,
              script: g.VARIANT.BOLDSCRIPT,
              "sans-serif": g.VARIANT.BOLDSANSSERIF,
              "sans-serif-italic": g.VARIANT.SANSSERIFBOLDITALIC
            }[l] || l;
          } else {
            if (k.weight === "normal") {
              l = {
                bold: g.VARIANT.normal,
                "bold-italic": g.VARIANT.ITALIC,
                "bold-fraktur": g.VARIANT.FRAKTUR,
                "bold-script": g.VARIANT.SCRIPT,
                "bold-sans-serif": g.VARIANT.SANSSERIF,
                "sans-serif-bold-italic": g.VARIANT.SANSSERIFITALIC
              }[l] || l;
            }
          }
          if (k.style === "italic") {
            l = {
              normal: g.VARIANT.ITALIC,
              bold: g.VARIANT.BOLDITALIC,
              "sans-serif": g.VARIANT.SANSSERIFITALIC,
              "bold-sans-serif": g.VARIANT.SANSSERIFBOLDITALIC
            }[l] || l;
          } else {
            if (k.style === "normal") {
              l = {
                italic: g.VARIANT.NORMAL,
                "bold-italic": g.VARIANT.BOLD,
                "sans-serif-italic": g.VARIANT.SANSSERIF,
                "sans-serif-bold-italic": g.VARIANT.BOLDSANSSERIF
              }[l] || l;
            }
          }
          if (!(l in d.FONTDATA.VARIANT)) {
            l = "normal";
          }
          return d.FONTDATA.VARIANT[l];
        },
        HTMLdrawBBox: function(k) {
          var m = k.bbox;
          var l = d.Element("span", {style: {
              "font-size": k.style.fontSize,
              display: "inline-block",
              opacity: 0.25,
              "margin-left": d.Em(-m.w)
            }}, [["span", {style: {
              height: d.Em(m.h),
              width: d.Em(m.w),
              "background-color": "red",
              display: "inline-block"
            }}], ["span", {style: {
              height: d.Em(m.d),
              width: d.Em(m.w),
              "margin-left": d.Em(-m.w),
              "vertical-align": d.Em(-m.d),
              "background-color": "green",
              display: "inline-block"
            }}]]);
          if (k.nextSibling) {
            k.parentNode.insertBefore(l, k.nextSibling);
          } else {
            k.parentNode.appendChild(l);
          }
        }
      }, {
        HTMLautoload: function() {
          var k = d.autoloadDir + "/" + this.type + ".js";
          b.RestartAfter(h.Require(k));
        },
        HTMLautoloadFile: function(k) {
          var l = d.autoloadDir + "/" + k + ".js";
          b.RestartAfter(h.Require(l));
        },
        HTMLstretchH: function(l, k) {
          this.HTMLremoveColor();
          return this.toHTML(l, k);
        },
        HTMLstretchV: function(l, k, m) {
          this.HTMLremoveColor();
          return this.toHTML(l, k, m);
        }
      });
      g.chars.Augment({toHTML: function(n, m, l, o) {
          var r = this.data.join("").replace(/[\u2061-\u2064]/g, "");
          if (l) {
            r = l(r, o);
          }
          if (m.fontInherit) {
            var q = Math.floor(d.config.scale / d.scale + 0.5) + "%";
            d.addElement(n, "span", {style: {"font-size": q}}, [r]);
            if (m.bold) {
              n.lastChild.style.fontWeight = "bold";
            }
            if (m.italic) {
              n.lastChild.style.fontStyle = "italic";
            }
            n.bbox = null;
            var p = d.getHD(n),
                k = d.getW(n);
            n.bbox = {
              h: p.h,
              d: p.d,
              w: k,
              lw: 0,
              rw: k,
              exactW: true
            };
          } else {
            this.HTMLhandleVariant(n, m, r);
          }
        }});
      g.entity.Augment({toHTML: function(n, m, l, o) {
          var r = this.toString().replace(/[\u2061-\u2064]/g, "");
          if (l) {
            r = l(r, o);
          }
          if (m.fontInherit) {
            var q = Math.floor(d.config.scale / d.scale + 0.5) + "%";
            d.addElement(n, "span", {style: {"font-size": q}}, [r]);
            if (m.bold) {
              n.lastChild.style.fontWeight = "bold";
            }
            if (m.italic) {
              n.lastChild.style.fontStyle = "italic";
            }
            delete n.bbox;
            var p = d.getHD(n),
                k = d.getW(n);
            n.bbox = {
              h: p.h,
              d: p.d,
              w: k,
              lw: 0,
              rw: k,
              exactW: true
            };
          } else {
            this.HTMLhandleVariant(n, m, r);
          }
        }});
      g.mi.Augment({toHTML: function(o) {
          o = this.HTMLhandleSize(this.HTMLcreateSpan(o));
          o.bbox = null;
          var n = this.HTMLgetVariant();
          for (var l = 0,
              k = this.data.length; l < k; l++) {
            if (this.data[l]) {
              this.data[l].toHTML(o, n);
            }
          }
          if (!o.bbox) {
            o.bbox = this.HTMLzeroBBox();
          }
          var q = this.data.join(""),
              p = o.bbox;
          if (p.skew && q.length !== 1) {
            delete p.skew;
          }
          if (p.rw > p.w && q.length === 1 && !n.noIC) {
            p.ic = p.rw - p.w;
            d.createBlank(o, p.ic / this.mscale);
            p.w = p.rw;
          }
          this.HTMLhandleSpace(o);
          this.HTMLhandleColor(o);
          this.HTMLhandleDir(o);
          return o;
        }});
      g.mn.Augment({toHTML: function(o) {
          o = this.HTMLhandleSize(this.HTMLcreateSpan(o));
          o.bbox = null;
          var n = this.HTMLgetVariant();
          for (var l = 0,
              k = this.data.length; l < k; l++) {
            if (this.data[l]) {
              this.data[l].toHTML(o, n);
            }
          }
          if (!o.bbox) {
            o.bbox = this.HTMLzeroBBox();
          }
          if (this.data.join("").length !== 1) {
            delete o.bbox.skew;
          }
          this.HTMLhandleSpace(o);
          this.HTMLhandleColor(o);
          this.HTMLhandleDir(o);
          return o;
        }});
      g.mo.Augment({
        toHTML: function(v) {
          v = this.HTMLhandleSize(this.HTMLcreateSpan(v));
          if (this.data.length == 0) {
            return v;
          } else {
            v.bbox = null;
          }
          var y = this.data.join("");
          var q = this.HTMLgetVariant();
          var x = this.getValues("largeop", "displaystyle");
          if (x.largeop) {
            q = d.FONTDATA.VARIANT[x.displaystyle ? "-largeOp" : "-smallOp"];
          }
          var w = this.CoreParent(),
              o = (w && w.isa(g.msubsup) && this !== w.data[w.base]),
              l = (o ? this.remapChars : null);
          if (y.length === 1 && w && w.isa(g.munderover) && this.CoreText(w.data[w.base]).length === 1) {
            var s = w.data[w.over],
                u = w.data[w.under];
            if (s && this === s.CoreMO() && w.Get("accent")) {
              l = d.FONTDATA.REMAPACCENT;
            } else {
              if (u && this === u.CoreMO() && w.Get("accentunder")) {
                l = d.FONTDATA.REMAPACCENTUNDER;
              }
            }
          }
          if (o && y.match(/['`"\u00B4\u2032-\u2037\u2057]/)) {
            q = d.FONTDATA.VARIANT["-" + d.fontInUse + "-variant"];
          }
          for (var r = 0,
              n = this.data.length; r < n; r++) {
            if (this.data[r]) {
              this.data[r].toHTML(v, q, this.remap, l);
            }
          }
          if (!v.bbox) {
            v.bbox = this.HTMLzeroBBox();
          }
          if (y.length !== 1) {
            delete v.bbox.skew;
          }
          if (d.AccentBug && v.bbox.w === 0 && y.length === 1 && v.firstChild) {
            v.firstChild.nodeValue += d.NBSP;
            d.createSpace(v, 0, 0, -v.offsetWidth / d.em);
          }
          if (x.largeop) {
            var t = d.TeX.axis_height * this.scale * this.mscale;
            var k = (v.bbox.h - v.bbox.d) / 2 - t;
            if (d.safariVerticalAlignBug && v.lastChild.nodeName === "IMG") {
              v.lastChild.style.verticalAlign = d.Em(d.unEm(v.lastChild.style.verticalAlign || 0) / d.em - k / v.scale);
            } else {
              if (d.konquerorVerticalAlignBug && v.lastChild.nodeName === "IMG") {
                v.style.position = "relative";
                v.lastChild.style.position = "relative";
                v.lastChild.style.top = d.Em(k / v.scale);
              } else {
                v.style.verticalAlign = d.Em(-k / v.scale);
              }
            }
            v.bbox.h -= k;
            v.bbox.d += k;
            if (v.bbox.rw > v.bbox.w) {
              v.bbox.ic = v.bbox.rw - v.bbox.w;
              d.createBlank(v, v.bbox.ic / this.mscale);
              v.bbox.w = v.bbox.rw;
            }
          }
          this.HTMLhandleSpace(v);
          this.HTMLhandleColor(v);
          this.HTMLhandleDir(v);
          return v;
        },
        HTMLcanStretch: function(o) {
          if (!this.Get("stretchy")) {
            return false;
          }
          var p = this.data.join("");
          if (p.length > 1) {
            return false;
          }
          var m = this.CoreParent();
          if (m && m.isa(g.munderover) && this.CoreText(m.data[m.base]).length === 1) {
            var n = m.data[m.over],
                l = m.data[m.under];
            if (n && this === n.CoreMO() && m.Get("accent")) {
              p = d.FONTDATA.REMAPACCENT[p] || p;
            } else {
              if (l && this === l.CoreMO() && m.Get("accentunder")) {
                p = d.FONTDATA.REMAPACCENTUNDER[p] || p;
              }
            }
          }
          p = d.FONTDATA.DELIMITERS[p.charCodeAt(0)];
          var k = (p && p.dir === o.substr(0, 1));
          this.forceStretch = (k && (this.Get("minsize", true) || this.Get("maxsize", true)));
          return k;
        },
        HTMLstretchV: function(m, n, o) {
          this.HTMLremoveColor();
          var r = this.getValues("symmetric", "maxsize", "minsize");
          var p = this.HTMLspanElement(),
              s = this.HTMLgetMu(p),
              q;
          var l = this.HTMLgetScale(),
              k = d.TeX.axis_height * l;
          if (r.symmetric) {
            q = 2 * Math.max(n - k, o + k);
          } else {
            q = n + o;
          }
          r.maxsize = d.length2em(r.maxsize, s, p.bbox.h + p.bbox.d);
          r.minsize = d.length2em(r.minsize, s, p.bbox.h + p.bbox.d);
          q = Math.max(r.minsize, Math.min(r.maxsize, q));
          if (q != r.minsize) {
            q = [Math.max(q * d.TeX.delimiterfactor / 1000, q - d.TeX.delimitershortfall), q];
          }
          p = this.HTMLcreateSpan(m);
          d.createDelimiter(p, this.data.join("").charCodeAt(0), q, l);
          if (r.symmetric) {
            q = (p.bbox.h + p.bbox.d) / 2 + k;
          } else {
            q = (p.bbox.h + p.bbox.d) * n / (n + o);
          }
          d.positionDelimiter(p, q);
          this.HTMLhandleSpace(p);
          this.HTMLhandleColor(p);
          return p;
        },
        HTMLstretchH: function(o, k) {
          this.HTMLremoveColor();
          var m = this.getValues("maxsize", "minsize", "mathvariant", "fontweight");
          if ((m.fontweight === "bold" || parseInt(m.fontweight) >= 600) && !this.Get("mathvariant", true)) {
            m.mathvariant = g.VARIANT.BOLD;
          }
          var n = this.HTMLspanElement(),
              l = this.HTMLgetMu(n),
              p = n.scale;
          m.maxsize = d.length2em(m.maxsize, l, n.bbox.w);
          m.minsize = d.length2em(m.minsize, l, n.bbox.w);
          k = Math.max(m.minsize, Math.min(m.maxsize, k));
          n = this.HTMLcreateSpan(o);
          d.createDelimiter(n, this.data.join("").charCodeAt(0), k, p, m.mathvariant);
          this.HTMLhandleSpace(n);
          this.HTMLhandleColor(n);
          return n;
        }
      });
      g.mtext.Augment({toHTML: function(o) {
          o = this.HTMLhandleSize(this.HTMLcreateSpan(o));
          var n = this.HTMLgetVariant();
          if (d.config.mtextFontInherit || this.Parent().type === "merror") {
            var p = this.Get("mathvariant");
            if (p === "monospace") {
              o.className += " MJX-monospace";
            } else {
              if (p.match(/sans-serif/)) {
                o.className += " MJX-sans-serif";
              }
            }
            n = {
              bold: n.bold,
              italic: n.italic,
              fontInherit: true
            };
          }
          for (var l = 0,
              k = this.data.length; l < k; l++) {
            if (this.data[l]) {
              this.data[l].toHTML(o, n);
            }
          }
          if (!o.bbox) {
            o.bbox = this.HTMLzeroBBox();
          }
          if (this.data.join("").length !== 1) {
            delete o.bbox.skew;
          }
          this.HTMLhandleSpace(o);
          this.HTMLhandleColor(o);
          this.HTMLhandleDir(o);
          return o;
        }});
      g.merror.Augment({toHTML: function(l) {
          var n = MathJax.HTML.addElement(l, "span", {style: {display: "inline-block"}});
          l = this.SUPER(arguments).toHTML.call(this, n);
          var m = d.getHD(n),
              k = d.getW(n);
          n.bbox = {
            h: m.h,
            d: m.d,
            w: k,
            lw: 0,
            rw: k,
            exactW: true
          };
          n.id = l.id;
          l.id = null;
          return n;
        }});
      g.ms.Augment({toHTML: g.mbase.HTMLautoload});
      g.mglyph.Augment({toHTML: g.mbase.HTMLautoload});
      g.mspace.Augment({toHTML: function(o) {
          o = this.HTMLcreateSpan(o);
          var m = this.getValues("height", "depth", "width");
          var l = this.HTMLgetMu(o);
          this.HTMLgetScale();
          m.mathbackground = this.mathbackground;
          if (this.background && !this.mathbackground) {
            m.mathbackground = this.background;
          }
          var n = d.length2em(m.height, l) * this.mscale,
              p = d.length2em(m.depth, l) * this.mscale,
              k = d.length2em(m.width, l) * this.mscale;
          d.createSpace(o, n, p, k, m.mathbackground, true);
          return o;
        }});
      g.mphantom.Augment({
        toHTML: function(o, l, q) {
          o = this.HTMLcreateSpan(o);
          if (this.data[0] != null) {
            var p = this.data[0].toHTML(o);
            if (q != null) {
              d.Remeasured(this.data[0].HTMLstretchV(o, l, q), o);
            } else {
              if (l != null) {
                d.Remeasured(this.data[0].HTMLstretchH(o, l), o);
              } else {
                p = d.Measured(p, o);
              }
            }
            o.bbox = {
              w: p.bbox.w,
              h: p.bbox.h,
              d: p.bbox.d,
              lw: 0,
              rw: 0,
              exactW: true
            };
            for (var n = 0,
                k = o.childNodes.length; n < k; n++) {
              o.childNodes[n].style.visibility = "hidden";
            }
          }
          this.HTMLhandleSpace(o);
          this.HTMLhandleColor(o);
          return o;
        },
        HTMLstretchH: g.mbase.HTMLstretchH,
        HTMLstretchV: g.mbase.HTMLstretchV
      });
      g.mpadded.Augment({
        toHTML: function(s, m, k) {
          s = this.HTMLcreateSpan(s);
          if (this.data[0] != null) {
            var q = d.createStack(s, true);
            var n = d.createBox(q);
            var l = this.data[0].toHTML(n);
            if (k != null) {
              d.Remeasured(this.data[0].HTMLstretchV(n, m, k), n);
            } else {
              if (m != null) {
                d.Remeasured(this.data[0].HTMLstretchH(n, m), n);
              } else {
                d.Measured(l, n);
              }
            }
            var t = this.getValues("height", "depth", "width", "lspace", "voffset"),
                r = 0,
                p = 0,
                u = this.HTMLgetMu(s);
            this.HTMLgetScale();
            if (t.lspace) {
              r = this.HTMLlength2em(n, t.lspace, u);
            }
            if (t.voffset) {
              p = this.HTMLlength2em(n, t.voffset, u);
            }
            d.placeBox(n, r, p);
            r /= this.mscale;
            p /= this.mscale;
            s.bbox = {
              h: n.bbox.h,
              d: n.bbox.d,
              w: n.bbox.w,
              exactW: true,
              lw: n.bbox.lw + r,
              rw: n.bbox.rw + r,
              H: Math.max((n.bbox.H == null ? -d.BIGDIMEN : n.bbox.H + p), n.bbox.h + p),
              D: Math.max((n.bbox.D == null ? -d.BIGDIMEN : n.bbox.D - p), n.bbox.d - p)
            };
            if (t.height !== "") {
              s.bbox.h = this.HTMLlength2em(n, t.height, u, "h", 0);
            }
            if (t.depth !== "") {
              s.bbox.d = this.HTMLlength2em(n, t.depth, u, "d", 0);
            }
            if (t.width !== "") {
              s.bbox.w = this.HTMLlength2em(n, t.width, u, "w", 0);
            }
            if (s.bbox.H <= s.bbox.h) {
              delete s.bbox.H;
            }
            if (s.bbox.D <= s.bbox.d) {
              delete s.bbox.D;
            }
            var o = /^\s*(\d+(\.\d*)?|\.\d+)\s*(pt|em|ex|mu|px|pc|in|mm|cm)\s*$/;
            s.bbox.exact = !!((this.data[0] && this.data[0].data.length == 0) || o.exec(t.height) || o.exec(t.width) || o.exec(t.depth));
            d.setStackWidth(q, s.bbox.w);
          }
          this.HTMLhandleSpace(s);
          this.HTMLhandleColor(s);
          return s;
        },
        HTMLlength2em: function(q, r, l, s, k) {
          if (k == null) {
            k = -d.BIGDIMEN;
          }
          var o = String(r).match(/width|height|depth/);
          var p = (o ? q.bbox[o[0].charAt(0)] : (s ? q.bbox[s] : 0));
          var n = d.length2em(r, l, p / this.mscale) * this.mscale;
          if (s && String(r).match(/^\s*[-+]/)) {
            return Math.max(k, q.bbox[s] + n);
          } else {
            return n;
          }
        },
        HTMLstretchH: g.mbase.HTMLstretchH,
        HTMLstretchV: g.mbase.HTMLstretchV
      });
      g.mrow.Augment({
        HTMLlineBreaks: function(k) {
          if (!this.parent.linebreakContainer) {
            return false;
          }
          return (d.config.linebreaks.automatic && k.bbox.w > d.linebreakWidth) || this.hasNewline();
        },
        HTMLstretchH: function(m, k) {
          this.HTMLremoveColor();
          var l = this.HTMLspanElement();
          this.data[this.core].HTMLstretchH(l, k);
          this.HTMLcomputeBBox(l, true);
          this.HTMLhandleColor(l);
          return l;
        },
        HTMLstretchV: function(m, l, n) {
          this.HTMLremoveColor();
          var k = this.HTMLspanElement();
          this.data[this.core].HTMLstretchV(k, l, n);
          this.HTMLcomputeBBox(k, true);
          this.HTMLhandleColor(k);
          return k;
        }
      });
      g.mstyle.Augment({
        toHTML: function(l, k, m) {
          l = this.HTMLcreateSpan(l);
          if (this.data[0] != null) {
            var n = this.data[0].toHTML(l);
            if (m != null) {
              this.data[0].HTMLstretchV(l, k, m);
            } else {
              if (k != null) {
                this.data[0].HTMLstretchH(l, k);
              }
            }
            l.bbox = n.bbox;
          }
          this.HTMLhandleSpace(l);
          this.HTMLhandleColor(l);
          return l;
        },
        HTMLstretchH: g.mbase.HTMLstretchH,
        HTMLstretchV: g.mbase.HTMLstretchV
      });
      g.mfrac.Augment({
        toHTML: function(D) {
          D = this.HTMLcreateSpan(D);
          var m = d.createStack(D);
          var r = d.createBox(m),
              o = d.createBox(m);
          d.MeasureSpans([this.HTMLboxChild(0, r), this.HTMLboxChild(1, o)]);
          var k = this.getValues("displaystyle", "linethickness", "numalign", "denomalign", "bevelled");
          var I = this.HTMLgetScale(),
              C = k.displaystyle;
          var G = d.TeX.axis_height * I;
          if (k.bevelled) {
            var F = (C ? 0.4 : 0.15);
            var s = Math.max(r.bbox.h + r.bbox.d, o.bbox.h + o.bbox.d) + 2 * F;
            var E = d.createBox(m);
            d.createDelimiter(E, 47, s);
            d.placeBox(r, 0, (r.bbox.d - r.bbox.h) / 2 + G + F);
            d.placeBox(E, r.bbox.w - F / 2, (E.bbox.d - E.bbox.h) / 2 + G);
            d.placeBox(o, r.bbox.w + E.bbox.w - F, (o.bbox.d - o.bbox.h) / 2 + G - F);
          } else {
            var l = Math.max(r.bbox.w, o.bbox.w);
            var y = d.thickness2em(k.linethickness, this.scale) * this.mscale,
                A,
                z,
                x,
                w;
            var B = d.TeX.min_rule_thickness / this.em;
            if (C) {
              x = d.TeX.num1;
              w = d.TeX.denom1;
            } else {
              x = (y === 0 ? d.TeX.num3 : d.TeX.num2);
              w = d.TeX.denom2;
            }
            x *= I;
            w *= I;
            if (y === 0) {
              A = Math.max((C ? 7 : 3) * d.TeX.rule_thickness, 2 * B);
              z = (x - r.bbox.d) - (o.bbox.h - w);
              if (z < A) {
                x += (A - z) / 2;
                w += (A - z) / 2;
              }
            } else {
              A = Math.max((C ? 2 : 0) * B + y, y / 2 + 1.5 * B);
              z = (x - r.bbox.d) - (G + y / 2);
              if (z < A) {
                x += A - z;
              }
              z = (G - y / 2) - (o.bbox.h - w);
              if (z < A) {
                w += A - z;
              }
              var n = d.createBox(m);
              d.createRule(n, y, 0, l + 2 * y);
              d.placeBox(n, 0, G - y / 2);
            }
            d.alignBox(r, k.numalign, x);
            d.alignBox(o, k.denomalign, -w);
          }
          this.HTMLhandleSpace(D);
          this.HTMLhandleColor(D);
          return D;
        },
        HTMLcanStretch: function(k) {
          return false;
        },
        HTMLhandleSpace: function(l) {
          if (!this.texWithDelims && !this.useMMLspacing) {
            var m = d.TeX.nulldelimiterspace * this.mscale;
            var k = l.childNodes[d.msiePaddingWidthBug ? 1 : 0].style;
            k.marginLeft = k.marginRight = d.Em(m);
            l.bbox.w += 2 * m;
            l.bbox.rw += 2 * m;
          }
          this.SUPER(arguments).HTMLhandleSpace.call(this, l);
        }
      });
      g.msqrt.Augment({
        toHTML: function(w) {
          w = this.HTMLcreateSpan(w);
          var z = d.createStack(w);
          var n = d.createBox(z),
              u = d.createBox(z),
              s = d.createBox(z);
          var r = this.HTMLgetScale();
          var A = d.TeX.rule_thickness * r,
              m,
              l,
              y,
              o;
          if (this.Get("displaystyle")) {
            m = d.TeX.x_height * r;
          } else {
            m = A;
          }
          l = Math.max(A + m / 4, 1.5 * d.TeX.min_rule_thickness / this.em);
          var k = this.HTMLboxChild(0, n);
          y = k.bbox.h + k.bbox.d + l + A;
          d.createDelimiter(s, 8730, y, r);
          d.MeasureSpans([k, s]);
          o = k.bbox.w;
          var v = 0;
          if (s.isMultiChar || (d.AdjustSurd && d.imgFonts)) {
            s.bbox.w *= 0.95;
          }
          if (s.bbox.h + s.bbox.d > y) {
            l = ((s.bbox.h + s.bbox.d) - (y - A)) / 2;
          }
          var B = d.FONTDATA.DELIMITERS[d.FONTDATA.RULECHAR];
          if (!B || o < B.HW[0][0] * r || r < 0.75) {
            d.createRule(u, 0, A, o);
          } else {
            d.createDelimiter(u, d.FONTDATA.RULECHAR, o, r);
          }
          y = k.bbox.h + l + A;
          l = y * d.rfuzz;
          if (s.isMultiChar) {
            l = d.rfuzz;
          }
          v = this.HTMLaddRoot(z, s, v, s.bbox.h + s.bbox.d - y, r);
          d.placeBox(s, v, y - s.bbox.h);
          d.placeBox(u, v + s.bbox.w, y - u.bbox.h + l);
          d.placeBox(n, v + s.bbox.w, 0);
          this.HTMLhandleSpace(w);
          this.HTMLhandleColor(w);
          return w;
        },
        HTMLaddRoot: function(m, l, k, o, n) {
          return k;
        }
      });
      g.mroot.Augment({
        toHTML: g.msqrt.prototype.toHTML,
        HTMLaddRoot: function(s, l, q, o, k) {
          var m = d.createBox(s);
          if (this.data[1]) {
            var p = this.data[1].toHTML(m);
            p.style.paddingRight = p.style.paddingLeft = "";
            d.Measured(p, m);
          } else {
            m.bbox = this.HTMLzeroBBox();
          }
          var n = this.HTMLrootHeight(l.bbox.h + l.bbox.d, k, m) - o;
          var r = Math.min(m.bbox.w, m.bbox.rw);
          q = Math.max(r, l.offset);
          d.placeBox(m, q - r, n);
          return q - l.offset;
        },
        HTMLrootHeight: function(m, l, k) {
          return 0.45 * (m - 0.9 * l) + 0.6 * l + Math.max(0, k.bbox.d - 0.075);
        }
      });
      g.mfenced.Augment({
        toHTML: function(o) {
          o = this.HTMLcreateSpan(o);
          if (this.data.open) {
            this.data.open.toHTML(o);
          }
          if (this.data[0] != null) {
            this.data[0].toHTML(o);
          }
          for (var l = 1,
              k = this.data.length; l < k; l++) {
            if (this.data[l]) {
              if (this.data["sep" + l]) {
                this.data["sep" + l].toHTML(o);
              }
              this.data[l].toHTML(o);
            }
          }
          if (this.data.close) {
            this.data.close.toHTML(o);
          }
          var q = this.HTMLcomputeBBox(o);
          var n = o.bbox.h,
              p = o.bbox.d;
          for (l = 0, k = q.length; l < k; l++) {
            q[l].HTMLstretchV(o, n, p);
          }
          if (q.length) {
            this.HTMLcomputeBBox(o, true);
          }
          this.HTMLhandleSpace(o);
          this.HTMLhandleColor(o);
          return o;
        },
        HTMLcomputeBBox: function(p, o) {
          var l = p.bbox = {},
              q = [];
          this.HTMLcheckStretchy(this.data.open, l, q, o);
          this.HTMLcheckStretchy(this.data[0], l, q, o);
          for (var n = 1,
              k = this.data.length; n < k; n++) {
            if (this.data[n]) {
              this.HTMLcheckStretchy(this.data["sep" + n], l, q, o);
              this.HTMLcheckStretchy(this.data[n], l, q, o);
            }
          }
          this.HTMLcheckStretchy(this.data.close, l, q, o);
          this.HTMLcleanBBox(l);
          return q;
        },
        HTMLcheckStretchy: function(k, l, n, m) {
          if (k) {
            if (!m && k.HTMLcanStretch("Vertical")) {
              n.push(k);
              k = (k.CoreMO() || k);
            }
            this.HTMLcombineBBoxes(k, l);
          }
        }
      });
      g.menclose.Augment({toHTML: g.mbase.HTMLautoload});
      g.maction.Augment({toHTML: g.mbase.HTMLautoload});
      g.semantics.Augment({
        toHTML: function(l, k, m) {
          l = this.HTMLcreateSpan(l);
          if (this.data[0] != null) {
            var n = this.data[0].toHTML(l);
            if (m != null) {
              this.data[0].HTMLstretchV(l, k, m);
            } else {
              if (k != null) {
                this.data[0].HTMLstretchH(l, k);
              }
            }
            l.bbox = n.bbox;
          }
          this.HTMLhandleSpace(l);
          return l;
        },
        HTMLstretchH: g.mbase.HTMLstretchH,
        HTMLstretchV: g.mbase.HTMLstretchV
      });
      g.munderover.Augment({
        toHTML: function(L, H, F) {
          var l = this.getValues("displaystyle", "accent", "accentunder", "align");
          var p = this.data[this.base];
          if (!l.displaystyle && p != null && (p.movablelimits || p.CoreMO().Get("movablelimits"))) {
            return g.msubsup.prototype.toHTML.call(this, L);
          }
          L = this.HTMLcreateSpan(L);
          var P = this.HTMLgetScale();
          var q = d.createStack(L);
          var r = [],
              o = [],
              N = [],
              w,
              M,
              I;
          for (M = 0, I = this.data.length; M < I; M++) {
            if (this.data[M] != null) {
              w = r[M] = d.createBox(q);
              o[M] = this.data[M].toHTML(w);
              if (M == this.base) {
                if (F != null) {
                  this.data[this.base].HTMLstretchV(w, H, F);
                } else {
                  if (H != null) {
                    this.data[this.base].HTMLstretchH(w, H);
                  }
                }
                N[M] = (F == null && H != null ? false : this.data[M].HTMLcanStretch("Horizontal"));
              } else {
                N[M] = this.data[M].HTMLcanStretch("Horizontal");
                o[M].style.paddingLeft = o[M].style.paddingRight = "";
              }
            }
          }
          d.MeasureSpans(o);
          var n = -d.BIGDIMEN,
              K = n;
          for (M = 0, I = this.data.length; M < I; M++) {
            if (this.data[M]) {
              if (r[M].bbox.w > K) {
                K = r[M].bbox.w;
              }
              if (!N[M] && K > n) {
                n = K;
              }
            }
          }
          if (F == null && H != null) {
            n = H;
          } else {
            if (n == -d.BIGDIMEN) {
              n = K;
            }
          }
          for (M = K = 0, I = this.data.length; M < I; M++) {
            if (this.data[M]) {
              w = r[M];
              if (N[M]) {
                w.bbox = this.data[M].HTMLstretchH(w, n).bbox;
                if (M !== this.base) {
                  o[M].style.paddingLeft = o[M].style.paddingRight = "";
                }
              }
              if (w.bbox.w > K) {
                K = w.bbox.w;
              }
            }
          }
          var E = d.TeX.rule_thickness * this.mscale,
              G = d.FONTDATA.TeX_factor;
          var v,
              s,
              A,
              z,
              u,
              C,
              J,
              O = 0;
          p = r[this.base] || {bbox: this.HTMLzeroBBox()};
          if (p.bbox.ic) {
            O = 1.3 * p.bbox.ic + 0.05;
          }
          for (M = 0, I = this.data.length; M < I; M++) {
            if (this.data[M] != null) {
              w = r[M];
              u = d.TeX.big_op_spacing5 * P;
              var B = (M != this.base && l[this.ACCENTS[M]]);
              if (B && w.bbox.w <= 1 / d.em + 0.0001) {
                w.bbox.w = w.bbox.rw - w.bbox.lw;
                w.bbox.noclip = true;
                if (w.bbox.lw) {
                  w.insertBefore(d.createSpace(w.parentNode, 0, 0, -w.bbox.lw), w.firstChild);
                }
                d.createBlank(w, 0, 0, w.bbox.rw + 0.1);
              }
              C = {
                left: 0,
                center: (K - w.bbox.w) / 2,
                right: K - w.bbox.w
              }[l.align];
              v = C;
              s = 0;
              if (M == this.over) {
                if (B) {
                  J = Math.max(E * P * G, 2.5 / this.em);
                  u = 0;
                  if (p.bbox.skew) {
                    v += p.bbox.skew;
                    L.bbox.skew = p.bbox.skew;
                    if (v + w.bbox.w > K) {
                      L.bbox.skew += (K - w.bbox.w - v) / 2;
                    }
                  }
                } else {
                  A = d.TeX.big_op_spacing1 * P * G;
                  z = d.TeX.big_op_spacing3 * P * G;
                  J = Math.max(A, z - Math.max(0, w.bbox.d));
                }
                J = Math.max(J, 1.5 / this.em);
                v += O / 2;
                s = p.bbox.h + w.bbox.d + J;
                w.bbox.h += u;
              } else {
                if (M == this.under) {
                  if (B) {
                    J = 3 * E * P * G;
                    u = 0;
                  } else {
                    A = d.TeX.big_op_spacing2 * P * G;
                    z = d.TeX.big_op_spacing4 * P * G;
                    J = Math.max(A, z - w.bbox.h);
                  }
                  J = Math.max(J, 1.5 / this.em);
                  v -= O / 2;
                  s = -(p.bbox.d + w.bbox.h + J);
                  w.bbox.d += u;
                }
              }
              d.placeBox(w, v, s);
            }
          }
          this.HTMLhandleSpace(L);
          this.HTMLhandleColor(L);
          return L;
        },
        HTMLstretchH: g.mbase.HTMLstretchH,
        HTMLstretchV: g.mbase.HTMLstretchV
      });
      g.msubsup.Augment({
        toHTML: function(K, I, C) {
          K = this.HTMLcreateSpan(K);
          var N = this.HTMLgetScale(),
              H = this.HTMLgetMu(K);
          var w = d.createStack(K),
              l,
              n = [];
          var o = d.createBox(w);
          if (this.data[this.base]) {
            n.push(this.data[this.base].toHTML(o));
            if (C != null) {
              this.data[this.base].HTMLstretchV(o, I, C);
            } else {
              if (I != null) {
                this.data[this.base].HTMLstretchH(o, I);
              }
            }
          } else {
            o.bbox = this.HTMLzeroBBox();
          }
          var L = d.TeX.x_height * N,
              B = d.TeX.scriptspace * N * 0.75;
          var k,
              x;
          if (this.HTMLnotEmpty(this.data[this.sup])) {
            k = d.createBox(w);
            n.push(this.data[this.sup].toHTML(k));
          }
          if (this.HTMLnotEmpty(this.data[this.sub])) {
            x = d.createBox(w);
            n.push(this.data[this.sub].toHTML(x));
          }
          d.MeasureSpans(n);
          if (k) {
            k.bbox.w += B;
            k.bbox.rw = Math.max(k.bbox.w, k.bbox.rw);
          }
          if (x) {
            x.bbox.w += B;
            x.bbox.rw = Math.max(x.bbox.w, x.bbox.rw);
          }
          d.placeBox(o, 0, 0);
          var m = N;
          if (k) {
            m = this.data[this.sup].HTMLgetScale();
          } else {
            if (x) {
              m = this.data[this.sub].HTMLgetScale();
            }
          }
          var F = d.TeX.sup_drop * m,
              E = d.TeX.sub_drop * m;
          var z = o.bbox.h - F,
              y = o.bbox.d + E,
              M = 0,
              G;
          if (o.bbox.ic) {
            o.bbox.w -= o.bbox.ic;
            M = 1.3 * o.bbox.ic + 0.05;
          }
          if (this.data[this.base] && I == null && C == null && (this.data[this.base].type === "mi" || this.data[this.base].type === "mo")) {
            if (this.data[this.base].data.join("").length === 1 && n[0].scale === 1 && !this.data[this.base].Get("largeop")) {
              z = y = 0;
            }
          }
          var J = this.getValues("subscriptshift", "superscriptshift");
          J.subscriptshift = (J.subscriptshift === "" ? 0 : d.length2em(J.subscriptshift, H));
          J.superscriptshift = (J.superscriptshift === "" ? 0 : d.length2em(J.superscriptshift, H));
          if (!k) {
            if (x) {
              y = Math.max(y, d.TeX.sub1 * N, x.bbox.h - (4 / 5) * L, J.subscriptshift);
              d.placeBox(x, o.bbox.w, -y, x.bbox);
            }
          } else {
            if (!x) {
              l = this.getValues("displaystyle", "texprimestyle");
              G = d.TeX[(l.displaystyle ? "sup1" : (l.texprimestyle ? "sup3" : "sup2"))];
              z = Math.max(z, G * N, k.bbox.d + (1 / 4) * L, J.superscriptshift);
              d.placeBox(k, o.bbox.w + M, z, k.bbox);
            } else {
              y = Math.max(y, d.TeX.sub2 * N);
              var A = d.TeX.rule_thickness * N;
              if ((z - k.bbox.d) - (x.bbox.h - y) < 3 * A) {
                y = 3 * A - z + k.bbox.d + x.bbox.h;
                F = (4 / 5) * L - (z - k.bbox.d);
                if (F > 0) {
                  z += F;
                  y -= F;
                }
              }
              d.placeBox(k, o.bbox.w + M, Math.max(z, J.superscriptshift));
              d.placeBox(x, o.bbox.w, -Math.max(y, J.subscriptshift));
            }
          }
          this.HTMLhandleSpace(K);
          this.HTMLhandleColor(K);
          return K;
        },
        HTMLstretchH: g.mbase.HTMLstretchH,
        HTMLstretchV: g.mbase.HTMLstretchV
      });
      g.mmultiscripts.Augment({toHTML: g.mbase.HTMLautoload});
      g.mtable.Augment({toHTML: g.mbase.HTMLautoload});
      g["annotation-xml"].Augment({toHTML: g.mbase.HTMLautoload});
      g.annotation.Augment({toHTML: function(k) {
          return this.HTMLcreateSpan(k);
        }});
      g.math.Augment({
        toHTML: function(B, y, q) {
          var r,
              t,
              u,
              n,
              k = B;
          if (!q || q === d.PHASE.I) {
            var z = d.addElement(B, "nobr", {isMathJax: true});
            B = this.HTMLcreateSpan(z);
            var l = this.Get("alttext");
            if (l && !B.getAttribute("aria-label")) {
              B.setAttribute("aria-label", l);
            }
            if (!B.getAttribute("role")) {
              B.setAttribute("role", "math");
            }
            r = d.createStack(B);
            t = d.createBox(r);
            r.style.fontSize = z.parentNode.style.fontSize;
            z.parentNode.style.fontSize = "";
            if (this.data[0] != null) {
              g.mbase.prototype.displayAlign = b.config.displayAlign;
              g.mbase.prototype.displayIndent = b.config.displayIndent;
              if (String(b.config.displayIndent).match(/^0($|[a-z%])/i)) {
                g.mbase.prototype.displayIndent = "0";
              }
              u = this.data[0].toHTML(t);
              u.bbox.exactW = false;
            }
          } else {
            B = B.firstChild.firstChild;
            if (this.href) {
              B = B.firstChild;
            }
            r = B.firstChild;
            if (r.style.position !== "relative") {
              r = r.nextSibling;
            }
            t = r.firstChild;
            u = t.firstChild;
          }
          n = ((!q || q === d.PHASE.II) ? d.Measured(u, t) : u);
          if (!q || q === d.PHASE.III) {
            d.placeBox(t, 0, 0);
            B.style.width = d.Em(Math.max(0, Math.round(n.bbox.w * this.em) + 0.25) / d.outerEm);
            B.style.display = "inline-block";
            var x = 1 / d.em,
                D = d.em / d.outerEm;
            d.em /= D;
            B.bbox.h *= D;
            B.bbox.d *= D;
            B.bbox.w *= D;
            B.bbox.lw *= D;
            B.bbox.rw *= D;
            if (B.bbox.H) {
              B.bbox.H *= D;
            }
            if (B.bbox.D) {
              B.bbox.D *= D;
            }
            if (n && n.bbox.width != null) {
              B.style.minWidth = (n.bbox.minWidth || B.style.width);
              B.style.width = n.bbox.width;
              t.style.width = r.style.width = k.style.width = "100%";
            }
            var A = this.HTMLhandleColor(B);
            if (n) {
              d.createRule(B, (n.bbox.h + x) * D, (n.bbox.d + x) * D, 0);
            }
            if (!this.isMultiline && this.Get("display") === "block" && B.bbox.width == null) {
              var m = this.getValues("indentalignfirst", "indentshiftfirst", "indentalign", "indentshift");
              if (m.indentalignfirst !== g.INDENTALIGN.INDENTALIGN) {
                m.indentalign = m.indentalignfirst;
              }
              if (m.indentalign === g.INDENTALIGN.AUTO) {
                m.indentalign = this.displayAlign;
              }
              if (m.indentshiftfirst !== g.INDENTSHIFT.INDENTSHIFT) {
                m.indentshift = m.indentshiftfirst;
              }
              if (m.indentshift === "auto") {
                m.indentshift = "0";
              }
              var C = d.length2em(m.indentshift, 1, d.scale * d.cwidth);
              if (this.displayIndent !== "0") {
                var v = d.length2em(this.displayIndent, 1, d.scale * d.cwidth);
                C += (m.indentalign === g.INDENTALIGN.RIGHT ? -v : v);
              }
              y.style.textAlign = m.indentalign;
              if (C) {
                b.Insert(B.style, ({
                  left: {marginLeft: d.Em(C)},
                  right: {marginRight: d.Em(-C)},
                  center: {
                    marginLeft: d.Em(C),
                    marginRight: d.Em(-C)
                  }
                })[m.indentalign]);
                if (A) {
                  var s = parseFloat(A.style.marginLeft || "0") + C,
                      o = parseFloat(A.style.marginRight || "0") - C;
                  A.style.marginLeft = d.Em(s);
                  A.style.marginRight = d.Em(o + (m.indentalign === "right" ? B.bbox.w + C - B.bbox.w : 0));
                  if (d.msieColorBug && m.indentalign === "right") {
                    if (parseFloat(A.style.marginLeft) > 0) {
                      var w = MathJax.HTML.addElement(A.parentNode, "span");
                      w.style.marginLeft = d.Em(o + Math.min(0, B.bbox.w + C));
                      A.nextSibling.style.marginRight = "0em";
                    }
                    A.nextSibling.style.marginLeft = "0em";
                    A.style.marginRight = A.style.marginLeft = "0em";
                  }
                }
              }
            }
          }
          return B;
        },
        HTMLspanElement: g.mbase.prototype.HTMLspanElement
      });
      g.TeXAtom.Augment({
        toHTML: function(o, m, q) {
          o = this.HTMLcreateSpan(o);
          if (this.data[0] != null) {
            if (this.texClass === g.TEXCLASS.VCENTER) {
              var k = d.createStack(o);
              var p = d.createBox(k);
              var r = this.data[0].toHTML(p);
              if (q != null) {
                d.Remeasured(this.data[0].HTMLstretchV(p, m, q), p);
              } else {
                if (m != null) {
                  d.Remeasured(this.data[0].HTMLstretchH(p, m), p);
                } else {
                  d.Measured(r, p);
                }
              }
              var l = d.TeX.axis_height * this.HTMLgetScale();
              d.placeBox(p, 0, l - (p.bbox.h + p.bbox.d) / 2 + p.bbox.d);
            } else {
              var n = this.data[0].toHTML(o, m, q);
              if (q != null) {
                n = this.data[0].HTMLstretchV(p, m, q);
              } else {
                if (m != null) {
                  n = this.data[0].HTMLstretchH(p, m);
                }
              }
              o.bbox = n.bbox;
            }
          }
          this.HTMLhandleSpace(o);
          this.HTMLhandleColor(o);
          return o;
        },
        HTMLstretchH: g.mbase.HTMLstretchH,
        HTMLstretchV: g.mbase.HTMLstretchV
      });
      b.Register.StartupHook("onLoad", function() {
        setTimeout(MathJax.Callback(["loadComplete", d, "jax.js"]), 0);
      });
    });
    b.Register.StartupHook("End Config", function() {
      b.Browser.Select({
        MSIE: function(k) {
          var o = (document.documentMode || 0);
          var n = k.versionAtLeast("7.0");
          var m = k.versionAtLeast("8.0") && o > 7;
          var l = (document.compatMode === "BackCompat");
          if (o < 9) {
            d.config.styles[".MathJax .MathJax_HitBox"]["background-color"] = "white";
            d.config.styles[".MathJax .MathJax_HitBox"].opacity = 0;
            d.config.styles[".MathJax .MathJax_HitBox"].filter = "alpha(opacity=0)";
          }
          d.Augment({
            PaddingWidthBug: true,
            msieAccentBug: true,
            msieColorBug: (o < 8),
            msieColorPositionBug: true,
            msieRelativeWidthBug: l,
            msieDisappearingBug: (o >= 8),
            msieMarginScaleBug: (o < 8),
            msiePaddingWidthBug: true,
            msieBorderWidthBug: l,
            msieFrameSizeBug: (o <= 8),
            msieInlineBlockAlignBug: (!m || l),
            msiePlaceBoxBug: (m && !l),
            msieClipRectBug: !m,
            msieNegativeSpaceBug: l,
            msieRuleBug: (o < 7),
            cloneNodeBug: (m && k.version === "8.0"),
            msieItalicWidthBug: true,
            initialSkipBug: (o < 8),
            msieNegativeBBoxBug: (o >= 8),
            msieIE6: !n,
            msieItalicWidthBug: true,
            FontFaceBug: (o < 9),
            msieFontCSSBug: k.isIE9,
            allowWebFonts: (o >= 9 ? "woff" : "eot")
          });
        },
        Firefox: function(l) {
          var m = false;
          if (l.versionAtLeast("3.5")) {
            var k = String(document.location).replace(/[^\/]*$/, "");
            if (document.location.protocol !== "file:" || b.config.root.match(/^https?:\/\//) || (b.config.root + "/").substr(0, k.length) === k) {
              m = "otf";
            }
          }
          d.Augment({
            ffVerticalAlignBug: !l.versionAtLeast("20.0"),
            AccentBug: true,
            allowWebFonts: m,
            ffFontOptimizationBug: true
          });
        },
        Safari: function(p) {
          var n = p.versionAtLeast("3.0");
          var m = p.versionAtLeast("3.1");
          var k = navigator.appVersion.match(/ Safari\/\d/) && navigator.appVersion.match(/ Version\/\d/) && navigator.vendor.match(/Apple/);
          var l = (navigator.appVersion.match(/ Android (\d+)\.(\d+)/));
          var q = (m && p.isMobile && ((navigator.platform.match(/iPad|iPod|iPhone/) && !p.versionAtLeast("5.0")) || (l != null && (l[1] < 2 || (l[1] == 2 && l[2] < 2)))));
          d.Augment({
            config: {styles: {".MathJax img, .MathJax nobr, .MathJax a": {
                  "max-width": "5000em",
                  "max-height": "5000em"
                }}},
            Em: ((p.webkit || 0) >= 538 ? d.EmRounded : d.Em),
            rfuzz: 0.011,
            AccentBug: true,
            AdjustSurd: true,
            negativeBBoxes: true,
            safariNegativeSpaceBug: true,
            safariVerticalAlignBug: !m,
            safariTextNodeBug: !n,
            forceReflow: true,
            FontFaceBug: true,
            allowWebFonts: (m && !q ? "otf" : false)
          });
          if (k) {
            d.Augment({webFontDefault: (p.isMobile ? "sans-serif" : "serif")});
          }
          if (p.isPC) {
            d.Augment({
              adjustAvailableFonts: d.removeSTIXfonts,
              checkWebFontsTwice: true
            });
          }
          if (q) {
            var o = b.config["HTML-CSS"];
            if (o) {
              o.availableFonts = [];
              o.preferredFont = null;
            } else {
              b.config["HTML-CSS"] = {
                availableFonts: [],
                preferredFont: null
              };
            }
          }
        },
        Chrome: function(k) {
          d.Augment({
            Em: d.EmRounded,
            cloneNodeBug: true,
            rfuzz: -0.02,
            AccentBug: true,
            AdjustSurd: true,
            FontFaceBug: k.versionAtLeast("32.0"),
            negativeBBoxes: true,
            safariNegativeSpaceBug: true,
            safariWebFontSerif: [""],
            forceReflow: true,
            allowWebFonts: (k.versionAtLeast("4.0") ? "otf" : "svg")
          });
        },
        Opera: function(k) {
          k.isMini = (navigator.appVersion.match("Opera Mini") != null);
          d.config.styles[".MathJax .merror"]["vertical-align"] = null;
          d.config.styles[".MathJax span"]["z-index"] = 0;
          d.Augment({
            operaHeightBug: true,
            operaVerticalAlignBug: true,
            operaFontSizeBug: k.versionAtLeast("10.61"),
            initialSkipBug: true,
            FontFaceBug: true,
            PaddingWidthBug: true,
            allowWebFonts: (k.versionAtLeast("10.0") && !k.isMini ? "otf" : false),
            adjustAvailableFonts: d.removeSTIXfonts
          });
        },
        Konqueror: function(k) {
          d.Augment({konquerorVerticalAlignBug: true});
        }
      });
    });
    MathJax.Hub.Register.StartupHook("End Cookie", function() {
      if (b.config.menuSettings.zoom !== "None") {
        h.Require("[MathJax]/extensions/MathZoom.js");
      }
    });
  })(MathJax.Ajax, MathJax.Hub, MathJax.OutputJax["HTML-CSS"]);
  MathJax.Hub.Register.StartupHook("HTML-CSS Jax Ready", function() {
    var c = "2.6.0";
    var a = MathJax.ElementJax.mml,
        b = MathJax.OutputJax["HTML-CSS"];
    a.mtable.Augment({
      toHTML: function(r) {
        r = this.HTMLcreateSpan(r);
        if (this.data.length === 0) {
          return r;
        }
        var I = this.getValues("columnalign", "rowalign", "columnspacing", "rowspacing", "columnwidth", "equalcolumns", "equalrows", "columnlines", "rowlines", "frame", "framespacing", "align", "useHeight", "width", "side", "minlabelspacing");
        var aM = I.width.match(/%$/);
        var ay = b.createStack(r);
        var aJ = this.HTMLgetScale(),
            aB = this.HTMLgetMu(r),
            aC = -1;
        var aq = [],
            au = [],
            aj = [],
            aw = [],
            av = [],
            ae,
            ad,
            ap = -1,
            ac,
            ao,
            X,
            aH,
            Q,
            aE,
            aR = [],
            aW;
        var G = b.FONTDATA.lineH * aJ * I.useHeight,
            N = b.FONTDATA.lineD * aJ * I.useHeight;
        for (ae = 0, ac = this.data.length; ae < ac; ae++) {
          aH = this.data[ae];
          X = (aH.type === "mlabeledtr" ? aC : 0);
          aw[ae] = [];
          aq[ae] = G;
          au[ae] = N;
          for (ad = X, ao = aH.data.length + X; ad < ao; ad++) {
            if (aj[ad] == null) {
              if (ad > ap) {
                ap = ad;
              }
              av[ad] = b.createStack(b.createBox(ay));
              aj[ad] = -b.BIGDIMEN;
            }
            aw[ae][ad] = b.createBox(av[ad]);
            aR.push(aH.data[ad - X].toHTML(aw[ae][ad]));
          }
        }
        b.MeasureSpans(aR);
        for (ae = 0, ac = this.data.length; ae < ac; ae++) {
          aH = this.data[ae];
          X = (aH.type === "mlabeledtr" ? aC : 0);
          for (ad = X, ao = aH.data.length + X; ad < ao; ad++) {
            Q = aH.data[ad - X];
            if (Q.isMultiline) {
              aw[ae][ad].style.width = "100%";
            }
            if (Q.isEmbellished()) {
              aE = Q.CoreMO();
              var aV = aE.Get("minsize", true);
              if (aV) {
                var aO = aE.HTMLspanElement().bbox;
                if (aE.HTMLcanStretch("Vertical")) {
                  aW = aO.h + aO.d;
                  if (aW) {
                    aV = b.length2em(aV, aB, aW);
                    if (aV * aO.h / aW > aq[ae]) {
                      aq[ae] = aV * aO.h / aW;
                    }
                    if (aV * aO.d / aW > au[ae]) {
                      au[ae] = aV * aO.d / aW;
                    }
                  }
                } else {
                  if (aE.HTMLcanStretch("Horizontal")) {
                    aV = b.length2em(aV, aB, aO.w);
                    if (aV > aj[ad]) {
                      aj[ad] = aV;
                    }
                  }
                }
              }
            }
            if (aw[ae][ad].bbox.h > aq[ae]) {
              aq[ae] = aw[ae][ad].bbox.h;
            }
            if (aw[ae][ad].bbox.d > au[ae]) {
              au[ae] = aw[ae][ad].bbox.d;
            }
            if (aw[ae][ad].bbox.w > aj[ad]) {
              aj[ad] = aw[ae][ad].bbox.w;
            }
          }
        }
        var aG = MathJax.Hub.SplitList;
        var aA = aG(I.columnspacing),
            aT = aG(I.rowspacing),
            e = aG(I.columnalign),
            B = aG(I.rowalign),
            d = aG(I.columnlines),
            w = aG(I.rowlines),
            aP = aG(I.columnwidth),
            U = [];
        for (ae = 0, ac = aA.length; ae < ac; ae++) {
          aA[ae] = b.length2em(aA[ae], aB);
        }
        for (ae = 0, ac = aT.length; ae < ac; ae++) {
          aT[ae] = b.length2em(aT[ae], aB);
        }
        while (aA.length < ap) {
          aA.push(aA[aA.length - 1]);
        }
        while (e.length <= ap) {
          e.push(e[e.length - 1]);
        }
        while (d.length < ap) {
          d.push(d[d.length - 1]);
        }
        while (aP.length <= ap) {
          aP.push(aP[aP.length - 1]);
        }
        while (aT.length < aw.length) {
          aT.push(aT[aT.length - 1]);
        }
        while (B.length <= aw.length) {
          B.push(B[B.length - 1]);
        }
        while (w.length < aw.length) {
          w.push(w[w.length - 1]);
        }
        if (av[aC]) {
          e[aC] = (I.side.substr(0, 1) === "l" ? "left" : "right");
          aA[aC] = -aj[aC];
        }
        for (ae = 0, ac = aw.length; ae < ac; ae++) {
          aH = this.data[ae];
          U[ae] = [];
          if (aH.rowalign) {
            B[ae] = aH.rowalign;
          }
          if (aH.columnalign) {
            U[ae] = aG(aH.columnalign);
            while (U[ae].length <= ap) {
              U[ae].push(U[ae][U[ae].length - 1]);
            }
          }
        }
        if (I.equalrows) {
          var aF = Math.max.apply(Math, aq),
              V = Math.max.apply(Math, au);
          for (ae = 0, ac = aw.length; ae < ac; ae++) {
            X = ((aF + V) - (aq[ae] + au[ae])) / 2;
            aq[ae] += X;
            au[ae] += X;
          }
        }
        aW = aq[0] + au[aw.length - 1];
        for (ae = 0, ac = aw.length - 1; ae < ac; ae++) {
          aW += Math.max(0, au[ae] + aq[ae + 1] + aT[ae]);
        }
        var aL = 0,
            aK = 0,
            aZ,
            g = aW;
        if (I.frame !== "none" || (I.columnlines + I.rowlines).match(/solid|dashed/)) {
          var v = aG(I.framespacing);
          if (v.length != 2) {
            v = aG(this.defaults.framespacing);
          }
          aL = b.length2em(v[0], aB);
          aK = b.length2em(v[1], aB);
          g = aW + 2 * aK;
        }
        var ai,
            aY,
            aa = "";
        if (typeof(I.align) !== "string") {
          I.align = String(I.align);
        }
        if (I.align.match(/(top|bottom|center|baseline|axis)( +(-?\d+))?/)) {
          aa = RegExp.$3 || "";
          I.align = RegExp.$1;
        } else {
          I.align = this.defaults.align;
        }
        if (aa !== "") {
          aa = parseInt(aa);
          if (aa < 0) {
            aa = aw.length + 1 + aa;
          }
          if (aa < 1) {
            aa = 1;
          } else {
            if (aa > aw.length) {
              aa = aw.length;
            }
          }
          ai = 0;
          aY = -(aW + aK) + aq[0];
          for (ae = 0, ac = aa - 1; ae < ac; ae++) {
            var L = Math.max(0, au[ae] + aq[ae + 1] + aT[ae]);
            ai += L;
            aY += L;
          }
        } else {
          ai = ({
            top: -(aq[0] + aK),
            bottom: aW + aK - aq[0],
            center: aW / 2 - aq[0],
            baseline: aW / 2 - aq[0],
            axis: aW / 2 + b.TeX.axis_height * aJ - aq[0]
          })[I.align];
          aY = ({
            top: -(aW + 2 * aK),
            bottom: 0,
            center: -(aW / 2 + aK),
            baseline: -(aW / 2 + aK),
            axis: b.TeX.axis_height * aJ - aW / 2 - aK
          })[I.align];
        }
        var ab,
            af = 0,
            z = 0,
            K = 0,
            Z = 0,
            ag = 0,
            am = [],
            at = [],
            R = 1;
        if (I.equalcolumns && I.width !== "auto") {
          if (aM) {
            ab = (100 / (ap + 1)).toFixed(2).replace(/\.?0+$/, "") + "%";
            for (ae = 0, ac = Math.min(ap + 1, aP.length); ae < ac; ae++) {
              aP[ae] = ab;
            }
            ab = 0;
            af = 1;
            ag = ap + 1;
            for (ae = 0, ac = Math.min(ap + 1, aA.length); ae < ac; ae++) {
              ab += aA[ae];
            }
          } else {
            ab = b.length2em(I.width, aB);
            for (ae = 0, ac = Math.min(ap, aA.length); ae < ac; ae++) {
              ab -= aA[ae];
            }
            ab /= ap;
            for (ae = 0, ac = Math.min(ap + 1, aP.length); ae < ac; ae++) {
              aj[ae] = ab;
            }
          }
        } else {
          for (ae = 0, ac = Math.min(ap + 1, aP.length); ae < ac; ae++) {
            if (aP[ae] === "auto") {
              z += aj[ae];
            } else {
              if (aP[ae] === "fit") {
                at[ag] = ae;
                ag++;
                z += aj[ae];
              } else {
                if (aP[ae].match(/%$/)) {
                  am[Z] = ae;
                  Z++;
                  K += aj[ae];
                  af += b.length2em(aP[ae], aB, 1);
                } else {
                  aj[ae] = b.length2em(aP[ae], aB);
                  z += aj[ae];
                }
              }
            }
          }
          if (aM) {
            ab = 0;
            for (ae = 0, ac = Math.min(ap, aA.length); ae < ac; ae++) {
              ab += aA[ae];
            }
            if (af > 0.98) {
              R = 0.98 / af;
              af = 0.98;
            }
          } else {
            if (I.width === "auto") {
              if (af > 0.98) {
                R = K / (z + K);
                ab = z + K;
              } else {
                ab = z / (1 - af);
              }
            } else {
              ab = b.length2em(I.width, aB);
              for (ae = 0, ac = Math.min(ap, aA.length); ae < ac; ae++) {
                ab -= aA[ae];
              }
            }
            for (ae = 0, ac = am.length; ae < ac; ae++) {
              aj[am[ae]] = b.length2em(aP[am[ae]], aB, ab * R);
              z += aj[am[ae]];
            }
            if (Math.abs(ab - z) > 0.01) {
              if (ag && ab > z) {
                ab = (ab - z) / ag;
                for (ae = 0, ac = at.length; ae < ac; ae++) {
                  aj[at[ae]] += ab;
                }
              } else {
                ab = ab / z;
                for (ad = 0; ad <= ap; ad++) {
                  aj[ad] *= ab;
                }
              }
            }
            if (I.equalcolumns) {
              var O = Math.max.apply(Math, aj);
              for (ad = 0; ad <= ap; ad++) {
                aj[ad] = O;
              }
            }
          }
        }
        var S = ai,
            o,
            q,
            aU;
        X = (av[aC] ? aC : 0);
        for (ad = X; ad <= ap; ad++) {
          for (ae = 0, ac = aw.length; ae < ac; ae++) {
            if (aw[ae][ad]) {
              X = (this.data[ae].type === "mlabeledtr" ? aC : 0);
              Q = this.data[ae].data[ad - X];
              if (Q.HTMLcanStretch("Horizontal")) {
                aw[ae][ad].bbox = Q.HTMLstretchH(av[ad], aj[ad]).bbox;
              } else {
                if (Q.HTMLcanStretch("Vertical")) {
                  aE = Q.CoreMO();
                  var aN = aE.symmetric;
                  aE.symmetric = false;
                  aw[ae][ad].bbox = Q.HTMLstretchV(av[ad], aq[ae], au[ae]).bbox;
                  aw[ae][ad].HH = null;
                  if (aw[ae][ad].bbox.h > aq[ae]) {
                    aw[ae][ad].bbox.H = aw[ae][ad].bbox.h;
                    aw[ae][ad].bbox.h = aq[ae];
                  }
                  if (aw[ae][ad].bbox.d > au[ae]) {
                    aw[ae][ad].bbox.D = aw[ae][ad].bbox.d;
                    aw[ae][ad].bbox.d = au[ae];
                  }
                  aE.symmetric = aN;
                }
              }
              aU = Q.rowalign || this.data[ae].rowalign || B[ae];
              o = ({
                top: aq[ae] - aw[ae][ad].bbox.h,
                bottom: aw[ae][ad].bbox.d - au[ae],
                center: ((aq[ae] - au[ae]) - (aw[ae][ad].bbox.h - aw[ae][ad].bbox.d)) / 2,
                baseline: 0,
                axis: 0
              })[aU] || 0;
              aU = (Q.columnalign || U[ae][ad] || e[ad]);
              b.alignBox(aw[ae][ad], aU, S + o);
            }
            if (ae < aw.length - 1) {
              S -= Math.max(0, au[ae] + aq[ae + 1] + aT[ae]);
            }
          }
          S = ai;
        }
        if (aM) {
          var E = b.createBox(ay);
          E.style.left = E.style.top = 0;
          E.style.right = b.Em(ab + 2 * aL);
          E.style.display = "inline-block";
          E.style.height = "0px";
          if (b.msieRelativeWidthBug) {
            E = b.createBox(E);
            E.style.position = "relative";
            E.style.height = "1em";
            E.style.width = "100%";
            E.bbox = ay.bbox;
          }
          var aS = 0,
              a0 = aL,
              k,
              l;
          if (ag) {
            k = 100 * (1 - af) / ag, l = z / ag;
          } else {
            k = 100 * (1 - af) / (ap + 1);
            l = z / (ap + 1);
          }
          for (ad = 0; ad <= ap; ad++) {
            b.placeBox(av[ad].parentNode, 0, 0);
            av[ad].style.position = "relative";
            av[ad].style.left = b.Em(a0);
            av[ad].style.width = "100%";
            av[ad].parentNode.parentNode.removeChild(av[ad].parentNode);
            var al = b.createBox(E);
            b.addBox(al, av[ad]);
            av[ad] = al;
            var h = al.style;
            h.display = "inline-block";
            h.left = aS + "%";
            if (aP[ad].match(/%$/)) {
              var t = parseFloat(aP[ad]) * R;
              if (ag === 0) {
                h.width = (k + t) + "%";
                aS += k + t;
                al = b.createBox(al);
                b.addBox(al, av[ad].firstChild);
                al.style.left = 0;
                al.style.right = b.Em(l);
                a0 -= l;
              } else {
                h.width = t + "%";
                aS += t;
              }
            } else {
              if (aP[ad] === "fit" || ag === 0) {
                h.width = k + "%";
                al = b.createBox(al);
                b.addBox(al, av[ad].firstChild);
                al.style.left = 0;
                al.style.right = b.Em(l - aj[ad]);
                a0 += aj[ad] - l;
                aS += k;
              } else {
                h.width = b.Em(aj[ad]);
                a0 += aj[ad];
              }
            }
            if (b.msieRelativeWidthBug) {
              b.addText(al.firstChild, b.NBSP);
              al.firstChild.style.position = "relative";
            }
            a0 += aA[ad];
            if (d[ad] !== "none" && ad < ap && ad !== aC) {
              q = b.createBox(E);
              q.style.left = aS + "%";
              q = b.createRule(q, g, 0, 1.25 / b.em);
              q.style.position = "absolute";
              q.bbox = {
                h: g,
                d: 0,
                w: 0,
                rw: 1.25 / b.em,
                lw: 0
              };
              q.parentNode.bbox = ay.bbox;
              b.placeBox(q, a0 - aA[ad] / 2, aY, true);
              q.style.borderStyle = d[ad];
            }
          }
        } else {
          var T = aL;
          for (ad = 0; ad <= ap; ad++) {
            if (!av[ad].bbox.width) {
              b.setStackWidth(av[ad], aj[ad]);
            }
            if (aP[ad] !== "auto" && aP[ad] !== "fit") {
              av[ad].bbox.width = aj[ad];
              av[ad].bbox.isFixed = true;
            }
            b.placeBox(av[ad].parentNode, T, 0);
            T += aj[ad] + aA[ad];
            if (d[ad] !== "none" && ad < ap && ad !== aC) {
              q = b.createRule(ay, g, 0, 1.25 / b.em);
              b.addBox(ay, q);
              q.bbox = {
                h: g,
                d: 0,
                w: 0,
                rw: 1.25 / b.em,
                lw: 0
              };
              b.placeBox(q, T - aA[ad] / 2, aY, true);
              q.style.borderStyle = d[ad];
            }
          }
        }
        ay.bbox.d = -aY;
        ay.bbox.h = g + aY;
        b.setStackWidth(ay, ay.bbox.w + aL);
        aZ = ay.bbox.w;
        var ah;
        if (I.frame !== "none") {
          ah = b.createFrame(ay, g, 0, aZ, 1.25 / b.em, I.frame);
          b.addBox(ay, ah);
          b.placeBox(ah, 0, aY, true);
          if (aM) {
            ah.style.width = "100%";
          }
        }
        S = ai;
        for (ae = 0, ac = aw.length - 1; ae < ac; ae++) {
          o = Math.max(0, au[ae] + aq[ae + 1] + aT[ae]);
          if (w[ae] !== "none") {
            q = b.createRule(ay, 1.25 / b.em, 0, aZ);
            b.addBox(ay, q);
            q.bbox = {
              h: 1.25 / b.em,
              d: 0,
              w: aZ,
              rw: aZ,
              lw: 0
            };
            b.placeBox(q, 0, S - au[ae] - (o - au[ae] - aq[ae + 1]) / 2, true);
            if (w[ae] === "dashed") {
              q.style.borderTopStyle = "dashed";
            }
            if (aM) {
              q.style.width = "100%";
            }
          }
          S -= o;
        }
        if (aM) {
          r.bbox.width = I.width;
          ay.style.width = "100%";
        }
        if (av[aC]) {
          var ax = ay.bbox.w;
          var ar = this.getValues("indentalignfirst", "indentshiftfirst", "indentalign", "indentshift");
          if (ar.indentalignfirst !== a.INDENTALIGN.INDENTALIGN) {
            ar.indentalign = ar.indentalignfirst;
          }
          if (ar.indentalign === a.INDENTALIGN.AUTO) {
            ar.indentalign = this.displayAlign;
          }
          if (ar.indentshiftfirst !== a.INDENTSHIFT.INDENTSHIFT) {
            ar.indentshift = ar.indentshiftfirst;
          }
          if (ar.indentshift === "auto") {
            ar.indentshift = "0";
          }
          var an = b.length2em(ar.indentshift, aB, b.cwidth);
          var aD = b.length2em(I.minlabelspacing, aB, b.cwidth);
          var aX = aD + av[aC].bbox.w,
              az = 0,
              ak = ax;
          var aI = b.length2em(this.displayIndent, aB, b.cwidth);
          X = (e[aC] === a.INDENTALIGN.RIGHT ? -1 : 1);
          if (ar.indentalign === a.INDENTALIGN.CENTER) {
            ak += 2 * (aX - X * (an + aI));
            an += aI;
          } else {
            if (e[aC] === ar.indentalign) {
              if (aI < 0) {
                az = X * aI;
                aI = 0;
              }
              an += X * aI;
              if (aX > X * an) {
                an = X * aX;
              }
              an += az;
              ak += X * an;
            } else {
              ak += aX - X * an + aI;
              an -= X * aI;
            }
          }
          var aQ = b.createStack(r, false, "100%");
          b.addBox(aQ, ay);
          b.alignBox(ay, ar.indentalign, 0, an);
          av[aC].parentNode.parentNode.removeChild(av[aC].parentNode);
          b.addBox(aQ, av[aC]);
          b.alignBox(av[aC], e[aC], 0);
          if (b.msieRelativeWidthBug) {
            ay.style.top = av[aC].style.top = "";
          }
          if (aM) {
            ay.style.width = I.width;
            r.bbox.width = "100%";
          }
          av[aC].style[X === 1 ? "marginLeft" : "marginRight"] = b.Em(X * az);
          r.bbox.tw = ak;
          r.style.minWidth = r.bbox.minWidth = b.Em(ak);
          aQ.style.minWidth = aQ.bbox.minWidth = b.Em(ak / aJ);
        }
        if (!aM) {
          this.HTMLhandleSpace(r);
        }
        var u = this.HTMLhandleColor(r);
        if (u && aM) {
          if (!ah) {
            ah = b.createFrame(ay, g, 0, aZ, 0, "none");
            b.addBox(ay, ah);
            b.placeBox(ah, 0, aY, true);
            ah.style.width = "100%";
          }
          ah.style.backgroundColor = u.style.backgroundColor;
          ah.parentNode.insertBefore(ah, ah.parentNode.firstChild);
          u.parentNode.removeChild(u);
        }
        return r;
      },
      HTMLhandleSpace: function(d) {
        d.bbox.keepPadding = true;
        d.bbox.exact = true;
        if (!this.hasFrame && d.bbox.width == null) {
          d.style.paddingLeft = d.style.paddingRight = b.Em(1 / 6);
        }
        this.SUPER(arguments).HTMLhandleSpace.call(this, d);
      }
    });
    a.mtd.Augment({
      toHTML: function(e, d, g) {
        e = this.HTMLcreateSpan(e);
        if (this.data[0]) {
          var f = this.data[0].toHTML(e);
          if (g != null) {
            f = this.data[0].HTMLstretchV(e, d, g);
          } else {
            if (d != null) {
              f = this.data[0].HTMLstretchH(e, d);
            }
          }
          e.bbox = f.bbox;
        }
        this.HTMLhandleSpace(e);
        this.HTMLhandleColor(e);
        return e;
      },
      HTMLstretchH: a.mbase.HTMLstretchH,
      HTMLstretchV: a.mbase.HTMLstretchV
    });
    MathJax.Hub.Startup.signal.Post("HTML-CSS mtable Ready");
    MathJax.Ajax.loadComplete(b.autoloadDir + "/mtable.js");
  });
  (function(i, b, e, g) {
    var h;
    var j,
        a,
        d;
    var f = "'Times New Roman',Times,STIXGeneral,serif";
    var m = {
      ".MJXp-script": {"font-size": ".8em"},
      ".MJXp-right": {
        "-webkit-transform-origin": "right",
        "-moz-transform-origin": "right",
        "-ms-transform-origin": "right",
        "-o-transform-origin": "right",
        "transform-origin": "right"
      },
      ".MJXp-bold": {"font-weight": "bold"},
      ".MJXp-italic": {"font-style": "italic"},
      ".MJXp-scr": {"font-family": "MathJax_Script," + f},
      ".MJXp-frak": {"font-family": "MathJax_Fraktur," + f},
      ".MJXp-sf": {"font-family": "MathJax_SansSerif," + f},
      ".MJXp-cal": {"font-family": "MathJax_Caligraphic," + f},
      ".MJXp-mono": {"font-family": "MathJax_Typewriter," + f},
      ".MJXp-largeop": {"font-size": "150%"},
      ".MJXp-largeop.MJXp-int": {"vertical-align": "-.2em"},
      ".MJXp-math": {
        display: "inline-block",
        "line-height": "1.2",
        "text-indent": "0",
        "font-family": f,
        "white-space": "nowrap",
        "border-collapse": "collapse"
      },
      ".MJXp-display": {
        display: "block",
        "text-align": "center",
        margin: "1em 0"
      },
      ".MJXp-math span": {display: "inline-block"},
      ".MJXp-box": {
        display: "block!important",
        "text-align": "center"
      },
      ".MJXp-box:after": {content: '" "'},
      ".MJXp-rule": {
        display: "block!important",
        "margin-top": ".1em"
      },
      ".MJXp-char": {display: "block!important"},
      ".MJXp-mo": {margin: "0 .15em"},
      ".MJXp-mfrac": {
        margin: "0 .125em",
        "vertical-align": ".25em"
      },
      ".MJXp-denom": {
        display: "inline-table!important",
        width: "100%"
      },
      ".MJXp-denom > *": {display: "table-row!important"},
      ".MJXp-surd": {"vertical-align": "top"},
      ".MJXp-surd > *": {display: "block!important"},
      ".MJXp-script-box > * ": {
        display: "table!important",
        height: "50%"
      },
      ".MJXp-script-box > * > *": {
        display: "table-cell!important",
        "vertical-align": "top"
      },
      ".MJXp-script-box > *:last-child > *": {"vertical-align": "bottom"},
      ".MJXp-script-box > * > * > *": {display: "block!important"},
      ".MJXp-mphantom": {visibility: "hidden"},
      ".MJXp-munderover": {display: "inline-table!important"},
      ".MJXp-over": {
        display: "inline-block!important",
        "text-align": "center"
      },
      ".MJXp-over > *": {display: "block!important"},
      ".MJXp-munderover > *": {display: "table-row!important"},
      ".MJXp-mtable": {
        "vertical-align": ".25em",
        margin: "0 .125em"
      },
      ".MJXp-mtable > *": {
        display: "inline-table!important",
        "vertical-align": "middle"
      },
      ".MJXp-mtr": {display: "table-row!important"},
      ".MJXp-mtd": {
        display: "table-cell!important",
        "text-align": "center",
        padding: ".5em 0 0 .5em"
      },
      ".MJXp-mtr > .MJXp-mtd:first-child": {"padding-left": 0},
      ".MJXp-mtr:first-child > .MJXp-mtd": {"padding-top": 0},
      ".MJXp-mlabeledtr": {display: "table-row!important"},
      ".MJXp-mlabeledtr > .MJXp-mtd:first-child": {"padding-left": 0},
      ".MJXp-mlabeledtr:first-child > .MJXp-mtd": {"padding-top": 0},
      ".MJXp-merror": {
        "background-color": "#FFFF88",
        color: "#CC0000",
        border: "1px solid #CC0000",
        padding: "1px 3px",
        "font-style": "normal",
        "font-size": "90%"
      }
    };
    (function() {
      for (var n = 0; n < 10; n++) {
        var o = "scaleX(." + n + ")";
        m[".MJXp-scale" + n] = {
          "-webkit-transform": o,
          "-moz-transform": o,
          "-ms-transform": o,
          "-o-transform": o,
          transform: o
        };
      }
    })();
    var k = 1000000;
    var c = "V",
        l = "H";
    g.Augment({
      settings: b.config.menuSettings,
      config: {styles: m},
      hideProcessedMath: false,
      maxStretchyParts: 1000,
      Config: function() {
        if (!this.require) {
          this.require = [];
        }
        this.SUPER(arguments).Config.call(this);
        var n = this.settings;
        if (n.scale) {
          this.config.scale = n.scale;
        }
        this.require.push(MathJax.OutputJax.extensionDir + "/MathEvents.js");
      },
      Startup: function() {
        j = MathJax.Extension.MathEvents.Event;
        a = MathJax.Extension.MathEvents.Touch;
        d = MathJax.Extension.MathEvents.Hover;
        this.ContextMenu = j.ContextMenu;
        this.Mousedown = j.AltContextMenu;
        this.Mouseover = d.Mouseover;
        this.Mouseout = d.Mouseout;
        this.Mousemove = d.Mousemove;
        var n = e.addElement(document.body, "div", {style: {width: "5in"}});
        this.pxPerInch = n.offsetWidth / 5;
        n.parentNode.removeChild(n);
        return i.Styles(this.config.styles, ["InitializePHTML", this]);
      },
      InitializePHTML: function() {},
      preTranslate: function(p) {
        var s = p.jax[this.id],
            t,
            q = s.length,
            u,
            r,
            v,
            o,
            n;
        for (t = 0; t < q; t++) {
          u = s[t];
          if (!u.parentNode) {
            continue;
          }
          r = u.previousSibling;
          if (r && String(r.className).match(/^MathJax_PHTML(_Display)?( MathJax_Processing)?$/)) {
            r.parentNode.removeChild(r);
          }
          n = u.MathJax.elementJax;
          if (!n) {
            continue;
          }
          n.PHTML = {display: (n.root.Get("display") === "block")};
          v = o = e.Element("span", {
            className: "MathJax_PHTML",
            id: n.inputID + "-Frame",
            isMathJax: true,
            jaxID: this.id,
            oncontextmenu: j.Menu,
            onmousedown: j.Mousedown,
            onmouseover: j.Mouseover,
            onmouseout: j.Mouseout,
            onmousemove: j.Mousemove,
            onclick: j.Click,
            ondblclick: j.DblClick,
            onkeydown: j.Keydown,
            tabIndex: b.getTabOrder(n)
          });
          if (b.Browser.noContextMenu) {
            v.ontouchstart = a.start;
            v.ontouchend = a.end;
          }
          if (n.PHTML.display) {
            o = e.Element("div", {className: "MathJax_PHTML_Display"});
            o.appendChild(v);
          }
          o.className += " MathJax_Processing";
          u.parentNode.insertBefore(o, u);
        }
      },
      Translate: function(o, s) {
        if (!o.parentNode) {
          return;
        }
        var n = o.MathJax.elementJax,
            r = n.root,
            p = document.getElementById(n.inputID + "-Frame"),
            t = (n.PHTML.display ? p.parentNode : p);
        this.initPHTML(r, p);
        try {
          r.toPreviewHTML(p);
        } catch (q) {
          if (q.restart) {
            while (p.firstChild) {
              p.removeChild(p.firstChild);
            }
          }
          throw q;
        }
        t.className = t.className.split(/ /)[0];
        if (this.hideProcessedMath) {
          t.className += " MathJax_Processed";
          if (o.MathJax.preview) {
            n.PHTML.preview = o.MathJax.preview;
            delete o.MathJax.preview;
          }
        }
      },
      postTranslate: function(s) {
        var o = s.jax[this.id];
        if (!this.hideProcessedMath) {
          return;
        }
        for (var q = 0,
            n = o.length; q < n; q++) {
          var p = o[q];
          if (p && p.MathJax.elementJax) {
            p.previousSibling.className = p.previousSibling.className.split(/ /)[0];
            var r = p.MathJax.elementJax.PHTML;
            if (r.preview) {
              r.preview.innerHTML = "";
              p.MathJax.preview = r.preview;
              delete r.preview;
            }
          }
        }
      },
      getJaxFromMath: function(n) {
        if (n.parentNode.className === "MathJax_PHTML_Display") {
          n = n.parentNode;
        }
        do {
          n = n.nextSibling;
        } while (n && n.nodeName.toLowerCase() !== "script");
        return b.getJaxFor(n);
      },
      getHoverSpan: function(n, o) {
        return n.root.PHTMLspanElement();
      },
      getHoverBBox: function(n, q, r) {
        var s = n.root.PHTML,
            p = n.PHTML.outerEm;
        var o = {
          w: s.w * p,
          h: s.h * p,
          d: s.d * p
        };
        if (s.width) {
          o.width = s.width;
        }
        return o;
      },
      Zoom: function(o, u, s, n, r) {
        u.className = "MathJax";
        this.idPostfix = "-zoom";
        o.root.toPHTML(u, u);
        this.idPostfix = "";
        u.style.position = "absolute";
        if (!width) {
          s.style.position = "absolute";
        }
        var t = u.offsetWidth,
            q = u.offsetHeight,
            v = s.offsetHeight,
            p = s.offsetWidth;
        if (p === 0) {
          p = s.parentNode.offsetWidth;
        }
        u.style.position = s.style.position = "";
        return {
          Y: -j.getBBox(u).h,
          mW: p,
          mH: v,
          zW: t,
          zH: q
        };
      },
      initPHTML: function(o, n) {},
      Remove: function(n) {
        var o = document.getElementById(n.inputID + "-Frame");
        if (o) {
          if (n.PHTML.display) {
            o = o.parentNode;
          }
          o.parentNode.removeChild(o);
        }
        delete n.PHTML;
      },
      ID: 0,
      idPostfix: "",
      GetID: function() {
        this.ID++;
        return this.ID;
      },
      VARIANT: {
        bold: "MJXp-bold",
        italic: "MJXp-italic",
        "bold-italic": "MJXp-bold MJXp-italic",
        script: "MJXp-scr",
        "bold-script": "MJXp-scr MJXp-bold",
        fraktur: "MJXp-frak",
        "bold-fraktur": "MJXp-frak MJXp-bold",
        monospace: "MJXp-mono",
        "sans-serif": "MJXp-sf",
        "-tex-caligraphic": "MJXp-cal"
      },
      MATHSPACE: {
        veryverythinmathspace: 1 / 18,
        verythinmathspace: 2 / 18,
        thinmathspace: 3 / 18,
        mediummathspace: 4 / 18,
        thickmathspace: 5 / 18,
        verythickmathspace: 6 / 18,
        veryverythickmathspace: 7 / 18,
        negativeveryverythinmathspace: -1 / 18,
        negativeverythinmathspace: -2 / 18,
        negativethinmathspace: -3 / 18,
        negativemediummathspace: -4 / 18,
        negativethickmathspace: -5 / 18,
        negativeverythickmathspace: -6 / 18,
        negativeveryverythickmathspace: -7 / 18,
        thin: 0.08,
        medium: 0.1,
        thick: 0.15,
        infinity: k
      },
      TeX: {x_height: 0.430554},
      pxPerInch: 72,
      em: 16,
      DELIMITERS: {
        "(": {dir: c},
        "{": {
          dir: c,
          w: 0.58
        },
        "[": {dir: c},
        "|": {
          dir: c,
          w: 0.275
        },
        ")": {dir: c},
        "}": {
          dir: c,
          w: 0.58
        },
        "]": {dir: c},
        "/": {dir: c},
        "\\": {dir: c},
        "\u2223": {
          dir: c,
          w: 0.275
        },
        "\u2225": {
          dir: c,
          w: 0.55
        },
        "\u230A": {
          dir: c,
          w: 0.5
        },
        "\u230B": {
          dir: c,
          w: 0.5
        },
        "\u2308": {
          dir: c,
          w: 0.5
        },
        "\u2309": {
          dir: c,
          w: 0.5
        },
        "\u27E8": {
          dir: c,
          w: 0.5
        },
        "\u27E9": {
          dir: c,
          w: 0.5
        },
        "\u2191": {
          dir: c,
          w: 0.65
        },
        "\u2193": {
          dir: c,
          w: 0.65
        },
        "\u21D1": {
          dir: c,
          w: 0.75
        },
        "\u21D3": {
          dir: c,
          w: 0.75
        },
        "\u2195": {
          dir: c,
          w: 0.65
        },
        "\u21D5": {
          dir: c,
          w: 0.75
        },
        "\u27EE": {
          dir: c,
          w: 0.275
        },
        "\u27EF": {
          dir: c,
          w: 0.275
        },
        "\u23B0": {
          dir: c,
          w: 0.6
        },
        "\u23B1": {
          dir: c,
          w: 0.6
        }
      },
      REMAPACCENT: {
        "\u20D7": "\u2192",
        "'": "\u02CB",
        "`": "\u02CA",
        ".": "\u02D9",
        "^": "\u02C6",
        "-": "\u02C9",
        "~": "\u02DC",
        "\u00AF": "\u02C9",
        "\u00B0": "\u02DA",
        "\u00B4": "\u02CA",
        "\u0300": "\u02CB",
        "\u0301": "\u02CA",
        "\u0302": "\u02C6",
        "\u0303": "\u02DC",
        "\u0304": "\u02C9",
        "\u0305": "\u02C9",
        "\u0306": "\u02D8",
        "\u0307": "\u02D9",
        "\u0308": "\u00A8",
        "\u030C": "\u02C7"
      },
      REMAPACCENTUNDER: {},
      length2em: function(r, p) {
        if (typeof(r) !== "string") {
          r = r.toString();
        }
        if (r === "") {
          return "";
        }
        if (r === h.SIZE.NORMAL) {
          return 1;
        }
        if (r === h.SIZE.BIG) {
          return 2;
        }
        if (r === h.SIZE.SMALL) {
          return 0.71;
        }
        if (this.MATHSPACE[r]) {
          return this.MATHSPACE[r];
        }
        var o = r.match(/^\s*([-+]?(?:\.\d+|\d+(?:\.\d*)?))?(pt|em|ex|mu|px|pc|in|mm|cm|%)?/);
        var n = parseFloat(o[1] || "1"),
            q = o[2];
        if (p == null) {
          p = 1;
        }
        if (q === "em") {
          return n;
        }
        if (q === "ex") {
          return n * this.TeX.x_height;
        }
        if (q === "%") {
          return n / 100 * p;
        }
        if (q === "px") {
          return n / this.em;
        }
        if (q === "pt") {
          return n / 10;
        }
        if (q === "pc") {
          return n * 1.2;
        }
        if (q === "in") {
          return n * this.pxPerInch / this.em;
        }
        if (q === "cm") {
          return n * this.pxPerInch / this.em / 2.54;
        }
        if (q === "mm") {
          return n * this.pxPerInch / this.em / 25.4;
        }
        if (q === "mu") {
          return n / 18;
        }
        return n * p;
      },
      Em: function(n) {
        if (Math.abs(n) < 0.001) {
          return "0em";
        }
        return (n.toFixed(3).replace(/\.?0+$/, "")) + "em";
      },
      arrayEntry: function(n, o) {
        return n[Math.max(0, Math.min(o, n.length - 1))];
      }
    });
    MathJax.Hub.Register.StartupHook("mml Jax Ready", function() {
      h = MathJax.ElementJax.mml;
      h.mbase.Augment({
        toPreviewHTML: function(o, n) {
          return this.PHTMLdefaultSpan(o, n);
        },
        PHTMLdefaultSpan: function(q, o) {
          if (!o) {
            o = {};
          }
          q = this.PHTMLcreateSpan(q);
          this.PHTMLhandleStyle(q);
          this.PHTMLhandleColor(q);
          if (this.isToken) {
            this.PHTMLhandleToken(q);
          }
          for (var p = 0,
              n = this.data.length; p < n; p++) {
            this.PHTMLaddChild(q, p, o);
          }
          return q;
        },
        PHTMLaddChild: function(p, o, n) {
          var q = this.data[o];
          if (q) {
            if (n.childSpans) {
              p = e.addElement(p, "span", {className: n.className});
            }
            q.toPreviewHTML(p);
            if (!n.noBBox) {
              this.PHTML.w += q.PHTML.w + q.PHTML.l + q.PHTML.r;
              if (q.PHTML.h > this.PHTML.h) {
                this.PHTML.h = q.PHTML.h;
              }
              if (q.PHTML.d > this.PHTML.d) {
                this.PHTML.d = q.PHTML.d;
              }
              if (q.PHTML.t > this.PHTML.t) {
                this.PHTML.t = q.PHTML.t;
              }
              if (q.PHTML.b > this.PHTML.b) {
                this.PHTML.b = q.PHTML.b;
              }
            }
          } else {
            if (n.forceChild) {
              e.addElement(p, "span");
            }
          }
        },
        PHTMLstretchChild: function(q, p, s) {
          var r = this.data[q];
          if (r && r.PHTMLcanStretch("Vertical", p, s)) {
            var t = this.PHTML,
                o = r.PHTML,
                n = o.w;
            r.PHTMLstretchV(p, s);
            t.w += o.w - n;
            if (o.h > t.h) {
              t.h = o.h;
            }
            if (o.d > t.d) {
              t.d = o.d;
            }
          }
        },
        PHTMLcreateSpan: function(n) {
          if (!this.PHTML) {
            this.PHTML = {};
          }
          this.PHTML = {
            w: 0,
            h: 0,
            d: 0,
            l: 0,
            r: 0,
            t: 0,
            b: 0
          };
          if (this.inferred) {
            return n;
          }
          if (this.type === "mo" && this.data.join("") === "\u222B") {
            g.lastIsInt = true;
          } else {
            if (this.type !== "mspace" || this.width !== "negativethinmathspace") {
              g.lastIsInt = false;
            }
          }
          if (!this.PHTMLspanID) {
            this.PHTMLspanID = g.GetID();
          }
          var o = (this.id || "MJXp-Span-" + this.PHTMLspanID);
          return e.addElement(n, "span", {
            className: "MJXp-" + this.type,
            id: o
          });
        },
        PHTMLspanElement: function() {
          if (!this.PHTMLspanID) {
            return null;
          }
          return document.getElementById(this.id || "MJXp-Span-" + this.PHTMLspanID);
        },
        PHTMLhandleToken: function(o) {
          var n = this.getValues("mathvariant");
          if (n.mathvariant !== h.VARIANT.NORMAL) {
            o.className += " " + g.VARIANT[n.mathvariant];
          }
        },
        PHTMLhandleStyle: function(n) {
          if (this.style) {
            n.style.cssText = this.style;
          }
        },
        PHTMLhandleColor: function(n) {
          if (this.mathcolor) {
            n.style.color = this.mathcolor;
          }
          if (this.mathbackground) {
            n.style.backgroundColor = this.mathbackground;
          }
        },
        PHTMLhandleScriptlevel: function(n) {
          var o = this.Get("scriptlevel");
          if (o) {
            n.className += " MJXp-script";
          }
        },
        PHTMLhandleText: function(y, A) {
          var v,
              p;
          var z = 0,
              o = 0,
              q = 0;
          for (var s = 0,
              r = A.length; s < r; s++) {
            p = A.charCodeAt(s);
            v = A.charAt(s);
            if (p >= 55296 && p < 56319) {
              s++;
              p = (((p - 55296) << 10) + (A.charCodeAt(s) - 56320)) + 65536;
            }
            var t = 0.7,
                u = 0.22,
                x = 0.5;
            if (p < 127) {
              if (v.match(/[A-Za-ehik-or-xz0-9]/)) {
                u = 0;
              }
              if (v.match(/[A-HK-Z]/)) {
                x = 0.67;
              } else {
                if (v.match(/[IJ]/)) {
                  x = 0.36;
                }
              }
              if (v.match(/[acegm-su-z]/)) {
                t = 0.45;
              } else {
                if (v.match(/[ij]/)) {
                  t = 0.75;
                }
              }
              if (v.match(/[ijlt]/)) {
                x = 0.28;
              }
            }
            if (g.DELIMITERS[v]) {
              x = g.DELIMITERS[v].w || 0.4;
            }
            if (t > z) {
              z = t;
            }
            if (u > o) {
              o = u;
            }
            q += x;
          }
          if (!this.CHML) {
            this.PHTML = {};
          }
          this.PHTML = {
            h: 0.9,
            d: 0.3,
            w: q,
            l: 0,
            r: 0,
            t: z,
            b: o
          };
          e.addText(y, A);
        },
        PHTMLbboxFor: function(o) {
          if (this.data[o] && this.data[o].PHTML) {
            return this.data[o].PHTML;
          }
          return {
            w: 0,
            h: 0,
            d: 0,
            l: 0,
            r: 0,
            t: 0,
            b: 0
          };
        },
        PHTMLcanStretch: function(q, o, p) {
          if (this.isEmbellished()) {
            var n = this.Core();
            if (n && n !== this) {
              return n.PHTMLcanStretch(q, o, p);
            }
          }
          return false;
        },
        PHTMLstretchV: function(n, o) {},
        PHTMLstretchH: function(n) {},
        CoreParent: function() {
          var n = this;
          while (n && n.isEmbellished() && n.CoreMO() === this && !n.isa(h.math)) {
            n = n.Parent();
          }
          return n;
        },
        CoreText: function(n) {
          if (!n) {
            return "";
          }
          if (n.isEmbellished()) {
            return n.CoreMO().data.join("");
          }
          while ((n.isa(h.mrow) || n.isa(h.TeXAtom) || n.isa(h.mstyle) || n.isa(h.mphantom)) && n.data.length === 1 && n.data[0]) {
            n = n.data[0];
          }
          if (!n.isToken) {
            return "";
          } else {
            return n.data.join("");
          }
        }
      });
      h.chars.Augment({toPreviewHTML: function(n) {
          var o = this.toString().replace(/[\u2061-\u2064]/g, "");
          this.PHTMLhandleText(n, o);
        }});
      h.entity.Augment({toPreviewHTML: function(n) {
          var o = this.toString().replace(/[\u2061-\u2064]/g, "");
          this.PHTMLhandleText(n, o);
        }});
      h.math.Augment({toPreviewHTML: function(n) {
          n = this.PHTMLdefaultSpan(n);
          if (this.Get("display") === "block") {
            n.className += " MJXp-display";
          }
          return n;
        }});
      h.mo.Augment({
        toPreviewHTML: function(o) {
          o = this.PHTMLdefaultSpan(o);
          this.PHTMLadjustAccent(o);
          var n = this.getValues("lspace", "rspace", "scriptlevel", "displaystyle", "largeop");
          if (n.scriptlevel === 0) {
            this.PHTML.l = g.length2em(n.lspace);
            this.PHTML.r = g.length2em(n.rspace);
            o.style.marginLeft = g.Em(this.PHTML.l);
            o.style.marginRight = g.Em(this.PHTML.r);
          } else {
            this.PHTML.l = 0.15;
            this.PHTML.r = 0.1;
          }
          if (n.displaystyle && n.largeop) {
            var p = e.Element("span", {className: "MJXp-largeop"});
            p.appendChild(o.firstChild);
            o.appendChild(p);
            this.PHTML.h *= 1.2;
            this.PHTML.d *= 1.2;
            if (this.data.join("") === "\u222B") {
              p.className += " MJXp-int";
            }
          }
          return o;
        },
        PHTMLadjustAccent: function(p) {
          var o = this.CoreParent();
          if (o && o.isa(h.munderover) && this.CoreText(o.data[o.base]).length === 1) {
            var q = o.data[o.over],
                n = o.data[o.under];
            var s = this.data.join(""),
                r;
            if (q && this === q.CoreMO() && o.Get("accent")) {
              r = g.REMAPACCENT[s];
            } else {
              if (n && this === n.CoreMO() && o.Get("accentunder")) {
                r = g.REMAPACCENTUNDER[s];
              }
            }
            if (r) {
              s = p.innerHTML = r;
            }
            if (s.match(/[\u02C6-\u02DC\u00A8]/)) {
              this.PHTML.acc = -0.52;
            } else {
              if (s === "\u2192") {
                this.PHTML.acc = -0.15;
                this.PHTML.vec = true;
              }
            }
          }
        },
        PHTMLcanStretch: function(q, o, p) {
          if (!this.Get("stretchy")) {
            return false;
          }
          var r = this.data.join("");
          if (r.length > 1) {
            return false;
          }
          r = g.DELIMITERS[r];
          var n = (r && r.dir === q.substr(0, 1));
          if (n) {
            n = (this.PHTML.h !== o || this.PHTML.d !== p || (this.Get("minsize", true) || this.Get("maxsize", true)));
          }
          return n;
        },
        PHTMLstretchV: function(p, u) {
          var o = this.PHTMLspanElement(),
              t = this.PHTML;
          var n = this.getValues("symmetric", "maxsize", "minsize");
          if (n.symmetric) {
            l = 2 * Math.max(p - 0.25, u + 0.25);
          } else {
            l = p + u;
          }
          n.maxsize = g.length2em(n.maxsize, t.h + t.d);
          n.minsize = g.length2em(n.minsize, t.h + t.d);
          l = Math.max(n.minsize, Math.min(n.maxsize, l));
          var s = l / (t.h + t.d - 0.3);
          var q = e.Element("span", {style: {"font-size": g.Em(s)}});
          if (s > 1.25) {
            var r = Math.ceil(1.25 / s * 10);
            q.className = "MJXp-right MJXp-scale" + r;
            q.style.marginLeft = g.Em(t.w * (r / 10 - 1) + 0.07);
            t.w *= s * r / 10;
          }
          q.appendChild(o.firstChild);
          o.appendChild(q);
          if (n.symmetric) {
            o.style.verticalAlign = g.Em(0.25 * (1 - s));
          }
        }
      });
      h.mspace.Augment({toPreviewHTML: function(q) {
          q = this.PHTMLdefaultSpan(q);
          var o = this.getValues("height", "depth", "width");
          var n = g.length2em(o.width),
              p = g.length2em(o.height),
              s = g.length2em(o.depth);
          var r = this.PHTML;
          r.w = n;
          r.h = p;
          r.d = s;
          if (n < 0) {
            if (!g.lastIsInt) {
              q.style.marginLeft = g.Em(n);
            }
            n = 0;
          }
          q.style.width = g.Em(n);
          q.style.height = g.Em(p + s);
          if (s) {
            q.style.verticalAlign = g.Em(-s);
          }
          return q;
        }});
      h.mpadded.Augment({
        toPreviewHTML: function(u) {
          u = this.PHTMLdefaultSpan(u, {
            childSpans: true,
            className: "MJXp-box",
            forceChild: true
          });
          var o = u.firstChild;
          var v = this.getValues("width", "height", "depth", "lspace", "voffset");
          var s = this.PHTMLdimen(v.lspace);
          var q = 0,
              n = 0,
              t = s.len,
              r = -s.len,
              p = 0;
          if (v.width !== "") {
            s = this.PHTMLdimen(v.width, "w", 0);
            if (s.pm) {
              r += s.len;
            } else {
              u.style.width = g.Em(s.len);
            }
          }
          if (v.height !== "") {
            s = this.PHTMLdimen(v.height, "h", 0);
            if (!s.pm) {
              q += -this.PHTMLbboxFor(0).h;
            }
            q += s.len;
          }
          if (v.depth !== "") {
            s = this.PHTMLdimen(v.depth, "d", 0);
            if (!s.pm) {
              n += -this.PHTMLbboxFor(0).d;
              p += -s.len;
            }
            n += s.len;
          }
          if (v.voffset !== "") {
            s = this.PHTMLdimen(v.voffset);
            q -= s.len;
            n += s.len;
            p += s.len;
          }
          if (q) {
            o.style.marginTop = g.Em(q);
          }
          if (n) {
            o.style.marginBottom = g.Em(n);
          }
          if (t) {
            o.style.marginLeft = g.Em(t);
          }
          if (r) {
            o.style.marginRight = g.Em(r);
          }
          if (p) {
            u.style.verticalAlign = g.Em(p);
          }
          return u;
        },
        PHTMLdimen: function(q, r, n) {
          if (n == null) {
            n = -k;
          }
          q = String(q);
          var o = q.match(/width|height|depth/);
          var p = (o ? this.PHTML[o[0].charAt(0)] : (r ? this.PHTML[r] : 0));
          return {
            len: g.length2em(q, p) || 0,
            pm: !!q.match(/^[-+]/)
          };
        }
      });
      h.munderover.Augment({toPreviewHTML: function(r) {
          var t = this.getValues("displaystyle", "accent", "accentunder", "align");
          var n = this.data[this.base];
          if (!t.displaystyle && n != null && (n.movablelimits || n.CoreMO().Get("movablelimits"))) {
            r = h.msubsup.prototype.toPreviewHTML.call(this, r);
            r.className = r.className.replace(/munderover/, "msubsup");
            return r;
          }
          r = this.PHTMLdefaultSpan(r, {
            childSpans: true,
            className: "",
            noBBox: true
          });
          var p = this.PHTMLbboxFor(this.over),
              v = this.PHTMLbboxFor(this.under),
              u = this.PHTMLbboxFor(this.base),
              s = this.PHTML,
              o = p.acc;
          if (this.data[this.over]) {
            r.lastChild.firstChild.style.marginLeft = p.l = r.lastChild.firstChild.style.marginRight = p.r = 0;
            var q = e.Element("span", {}, [["span", {className: "MJXp-over"}]]);
            q.firstChild.appendChild(r.lastChild);
            if (r.childNodes.length > (this.data[this.under] ? 1 : 0)) {
              q.firstChild.appendChild(r.firstChild);
            }
            this.data[this.over].PHTMLhandleScriptlevel(q.firstChild.firstChild);
            if (o != null) {
              if (p.vec) {
                q.firstChild.firstChild.firstChild.style.fontSize = "60%";
                p.h *= 0.6;
                p.d *= 0.6;
                p.w *= 0.6;
              }
              o = o - p.d + 0.1;
              if (u.t != null) {
                o += u.t - u.h;
              }
              q.firstChild.firstChild.style.marginBottom = g.Em(o);
            }
            if (r.firstChild) {
              r.insertBefore(q, r.firstChild);
            } else {
              r.appendChild(q);
            }
          }
          if (this.data[this.under]) {
            r.lastChild.firstChild.style.marginLeft = v.l = r.lastChild.firstChild.marginRight = v.r = 0;
            this.data[this.under].PHTMLhandleScriptlevel(r.lastChild);
          }
          s.w = Math.max(0.8 * p.w, 0.8 * v.w, u.w);
          s.h = 0.8 * (p.h + p.d + (o || 0)) + u.h;
          s.d = u.d + 0.8 * (v.h + v.d);
          return r;
        }});
      h.msubsup.Augment({toPreviewHTML: function(q) {
          q = this.PHTMLdefaultSpan(q, {noBBox: true});
          if (!this.data[this.base]) {
            if (q.firstChild) {
              q.insertBefore(e.Element("span"), q.firstChild);
            } else {
              q.appendChild(e.Element("span"));
            }
          }
          var s = this.data[this.base],
              p = this.data[this.sub],
              n = this.data[this.sup];
          if (!s) {
            s = {bbox: {
                h: 0.8,
                d: 0.2
              }};
          }
          q.firstChild.style.marginRight = ".05em";
          var o = Math.max(0.4, s.PHTML.h - 0.4),
              u = Math.max(0.2, s.PHTML.d + 0.1);
          var t = this.PHTML;
          if (n && p) {
            var r = e.Element("span", {
              className: "MJXp-script-box",
              style: {
                height: g.Em(o + n.PHTML.h * 0.8 + u + p.PHTML.d * 0.8),
                "vertical-align": g.Em(-u - p.PHTML.d * 0.8)
              }
            }, [["span", {}, [["span", {}, [["span", {style: {"margin-bottom": g.Em(-(n.PHTML.d - 0.05))}}]]]]], ["span", {}, [["span", {}, [["span", {style: {"margin-top": g.Em(-(n.PHTML.h - 0.05))}}]]]]]]);
            p.PHTMLhandleScriptlevel(r.firstChild);
            n.PHTMLhandleScriptlevel(r.lastChild);
            r.firstChild.firstChild.firstChild.appendChild(q.lastChild);
            r.lastChild.firstChild.firstChild.appendChild(q.lastChild);
            q.appendChild(r);
            t.h = Math.max(s.PHTML.h, n.PHTML.h * 0.8 + o);
            t.d = Math.max(s.PHTML.d, p.PHTML.d * 0.8 + u);
            t.w = s.PHTML.w + Math.max(n.PHTML.w, p.PHTML.w) + 0.07;
          } else {
            if (n) {
              q.lastChild.style.verticalAlign = g.Em(o);
              n.PHTMLhandleScriptlevel(q.lastChild);
              t.h = Math.max(s.PHTML.h, n.PHTML.h * 0.8 + o);
              t.d = Math.max(s.PHTML.d, n.PHTML.d * 0.8 - o);
              t.w = s.PHTML.w + n.PHTML.w + 0.07;
            } else {
              if (p) {
                q.lastChild.style.verticalAlign = g.Em(-u);
                p.PHTMLhandleScriptlevel(q.lastChild);
                t.h = Math.max(s.PHTML.h, p.PHTML.h * 0.8 - u);
                t.d = Math.max(s.PHTML.d, p.PHTML.d * 0.8 + u);
                t.w = s.PHTML.w + p.PHTML.w + 0.07;
              }
            }
          }
          return q;
        }});
      h.mfrac.Augment({toPreviewHTML: function(r) {
          r = this.PHTMLdefaultSpan(r, {
            childSpans: true,
            className: "MJXp-box",
            forceChild: true,
            noBBox: true
          });
          var o = this.getValues("linethickness", "displaystyle");
          if (!o.displaystyle) {
            if (this.data[0]) {
              this.data[0].PHTMLhandleScriptlevel(r.firstChild);
            }
            if (this.data[1]) {
              this.data[1].PHTMLhandleScriptlevel(r.lastChild);
            }
          }
          var n = e.Element("span", {className: "MJXp-box"}, [["span", {className: "MJXp-denom"}, [["span", {}, [["span", {
            className: "MJXp-rule",
            style: {height: "1em"}
          }]]], ["span"]]]]);
          n.firstChild.lastChild.appendChild(r.lastChild);
          r.appendChild(n);
          var s = this.PHTMLbboxFor(0),
              p = this.PHTMLbboxFor(1),
              v = this.PHTML;
          v.w = Math.max(s.w, p.w) * 0.8;
          v.h = s.h + s.d + 0.1 + 0.25;
          v.d = p.h + p.d - 0.25;
          v.l = v.r = 0.125;
          o.linethickness = Math.max(0, g.length2em(o.linethickness || "0", 0));
          if (o.linethickness) {
            var u = n.firstChild.firstChild.firstChild;
            var q = g.Em(o.linethickness);
            u.style.borderTop = "none";
            u.style.borderBottom = (o.linethickness < 0.15 ? "1px" : q) + " solid";
            u.style.margin = q + " 0";
            q = o.linethickness;
            n.style.marginTop = g.Em(3 * q - 1.2);
            r.style.verticalAlign = g.Em(1.5 * q + 0.1);
            v.h += 1.5 * q - 0.1;
            v.d += 1.5 * q;
          } else {
            n.style.marginTop = "-.7em";
          }
          return r;
        }});
      h.msqrt.Augment({
        toPreviewHTML: function(n) {
          n = this.PHTMLdefaultSpan(n, {
            childSpans: true,
            className: "MJXp-box",
            forceChild: true,
            noBBox: true
          });
          this.PHTMLlayoutRoot(n, n.firstChild);
          return n;
        },
        PHTMLlayoutRoot: function(u, n) {
          var v = this.PHTMLbboxFor(0);
          var q = Math.ceil((v.h + v.d + 0.14) * 100),
              w = g.Em(14 / q);
          var r = e.Element("span", {className: "MJXp-surd"}, [["span", {style: {
              "font-size": q + "%",
              "margin-top": w
            }}, ["\u221A"]]]);
          var s = e.Element("span", {className: "MJXp-root"}, [["span", {
            className: "MJXp-rule",
            style: {"border-top": ".08em solid"}
          }]]);
          var p = (1.2 / 2.2) * q / 100;
          if (q > 150) {
            var o = Math.ceil(150 / q * 10);
            r.firstChild.className = "MJXp-right MJXp-scale" + o;
            r.firstChild.style.marginLeft = g.Em(p * (o / 10 - 1) / q * 100);
            p = p * o / 10;
            s.firstChild.style.borderTopWidth = g.Em(0.08 / Math.sqrt(o / 10));
          }
          s.appendChild(n);
          u.appendChild(r);
          u.appendChild(s);
          this.PHTML.h = v.h + 0.18;
          this.PHTML.d = v.d;
          this.PHTML.w = v.w + p;
          return u;
        }
      });
      h.mroot.Augment({
        toPreviewHTML: function(q) {
          q = this.PHTMLdefaultSpan(q, {
            childSpans: true,
            className: "MJXp-box",
            forceChild: true,
            noBBox: true
          });
          var p = this.PHTMLbboxFor(1),
              n = q.removeChild(q.lastChild);
          var t = this.PHTMLlayoutRoot(e.Element("span"), q.firstChild);
          n.className = "MJXp-script";
          var u = parseInt(t.firstChild.firstChild.style.fontSize);
          var o = 0.55 * (u / 120) + p.d * 0.8,
              s = -0.6 * (u / 120);
          if (u > 150) {
            s *= 0.95 * Math.ceil(150 / u * 10) / 10;
          }
          n.style.marginRight = g.Em(s);
          n.style.verticalAlign = g.Em(o);
          if (-s > p.w * 0.8) {
            n.style.marginLeft = g.Em(-s - p.w * 0.8);
          }
          q.appendChild(n);
          q.appendChild(t);
          this.PHTML.w += Math.max(0, p.w * 0.8 + s);
          this.PHTML.h = Math.max(this.PHTML.h, p.h * 0.8 + o);
          return q;
        },
        PHTMLlayoutRoot: h.msqrt.prototype.PHTMLlayoutRoot
      });
      h.mfenced.Augment({toPreviewHTML: function(q) {
          q = this.PHTMLcreateSpan(q);
          this.PHTMLhandleStyle(q);
          this.PHTMLhandleColor(q);
          this.addFakeNodes();
          this.PHTMLaddChild(q, "open", {});
          for (var p = 0,
              n = this.data.length; p < n; p++) {
            this.PHTMLaddChild(q, "sep" + p, {});
            this.PHTMLaddChild(q, p, {});
          }
          this.PHTMLaddChild(q, "close", {});
          var o = this.PHTML.h,
              r = this.PHTML.d;
          this.PHTMLstretchChild("open", o, r);
          for (p = 0, n = this.data.length; p < n; p++) {
            this.PHTMLstretchChild("sep" + p, o, r);
            this.PHTMLstretchChild(p, o, r);
          }
          this.PHTMLstretchChild("close", o, r);
          return q;
        }});
      h.mrow.Augment({toPreviewHTML: function(q) {
          q = this.PHTMLdefaultSpan(q);
          var p = this.PHTML.h,
              r = this.PHTML.d;
          for (var o = 0,
              n = this.data.length; o < n; o++) {
            this.PHTMLstretchChild(o, p, r);
          }
          return q;
        }});
      h.mstyle.Augment({toPreviewHTML: function(n) {
          n = this.PHTMLdefaultSpan(n);
          this.PHTMLhandleScriptlevel(n);
          return n;
        }});
      h.TeXAtom.Augment({toPreviewHTML: function(n) {
          n = this.PHTMLdefaultSpan(n);
          n.className = "MJXp-mrow";
          return n;
        }});
      h.mtable.Augment({toPreviewHTML: function(E) {
          E = this.PHTMLdefaultSpan(E, {noBBox: true});
          var r = this.getValues("columnalign", "rowalign", "columnspacing", "rowspacing", "columnwidth", "equalcolumns", "equalrows", "columnlines", "rowlines", "frame", "framespacing", "align", "width");
          var u = MathJax.Hub.SplitList,
              F,
              A,
              D,
              z;
          var N = u(r.columnspacing),
              w = u(r.rowspacing),
              L = u(r.columnalign),
              t = u(r.rowalign);
          for (F = 0, A = N.length; F < A; F++) {
            N[F] = g.length2em(N[F]);
          }
          for (F = 0, A = w.length; F < A; F++) {
            w[F] = g.length2em(w[F]);
          }
          var K = e.Element("span");
          while (E.firstChild) {
            K.appendChild(E.firstChild);
          }
          E.appendChild(K);
          var y = 0,
              s = 0;
          for (F = 0, A = this.data.length; F < A; F++) {
            var v = this.data[F];
            if (v) {
              var J = g.arrayEntry(w, F - 1),
                  C = g.arrayEntry(t, F);
              var x = v.PHTML,
                  q = v.PHTMLspanElement();
              q.style.verticalAlign = C;
              var B = (v.type === "mlabeledtr" ? 1 : 0);
              for (D = 0, z = v.data.length; D < z - B; D++) {
                var p = v.data[D + B];
                if (p) {
                  var M = g.arrayEntry(N, D - 1),
                      G = g.arrayEntry(L, D);
                  var I = p.PHTMLspanElement();
                  if (D) {
                    x.w += M;
                    I.style.paddingLeft = g.Em(M);
                  }
                  if (F) {
                    I.style.paddingTop = g.Em(J);
                  }
                  I.style.textAlign = G;
                }
              }
              y += x.h + x.d;
              if (F) {
                y += J;
              }
              if (x.w > s) {
                s = x.w;
              }
            }
          }
          var o = this.PHTML;
          o.w = s;
          o.h = y / 2 + 0.25;
          o.d = y / 2 - 0.25;
          o.l = o.r = 0.125;
          return E;
        }});
      h.mlabeledtr.Augment({PHTMLdefaultSpan: function(q, o) {
          if (!o) {
            o = {};
          }
          q = this.PHTMLcreateSpan(q);
          this.PHTMLhandleStyle(q);
          this.PHTMLhandleColor(q);
          if (this.isToken) {
            this.PHTMLhandleToken(q);
          }
          for (var p = 1,
              n = this.data.length; p < n; p++) {
            this.PHTMLaddChild(q, p, o);
          }
          return q;
        }});
      h.semantics.Augment({toPreviewHTML: function(n) {
          n = this.PHTMLcreateSpan(n);
          if (this.data[0]) {
            this.data[0].toPreviewHTML(n);
            MathJax.Hub.Insert(this.data[0].PHTML || {}, this.PHTML);
          }
          return n;
        }});
      h.annotation.Augment({toPreviewHTML: function(n) {}});
      h["annotation-xml"].Augment({toPreviewHTML: function(n) {}});
      MathJax.Hub.Register.StartupHook("onLoad", function() {
        setTimeout(MathJax.Callback(["loadComplete", g, "jax.js"]), 0);
      });
    });
    MathJax.Hub.Register.StartupHook("End Cookie", function() {
      if (b.config.menuSettings.zoom !== "None") {
        i.Require("[MathJax]/extensions/MathZoom.js");
      }
    });
  })(MathJax.Ajax, MathJax.Hub, MathJax.HTML, MathJax.OutputJax.PreviewHTML);
  (function(b, g, f) {
    var c = b.config.menuSettings;
    var e = MathJax.OutputJax;
    var a = f.isMSIE && (document.documentMode || 0) < 8;
    var d = MathJax.Extension["fast-preview"] = {
      version: "2.6.0",
      enabled: true,
      config: b.CombineConfig("fast-preview", {
        Chunks: {
          EqnChunk: 10000,
          EqnChunkFactor: 1,
          EqnChunkDelay: 0
        },
        color: "inherit!important",
        updateTime: 30,
        updateDelay: 6,
        messageStyle: "none",
        disabled: f.isMSIE && !f.versionAtLeast("8.0")
      }),
      Config: function() {
        if (b.config["CHTML-preview"]) {
          MathJax.Hub.Config({"fast-preview": b.config["CHTML-preview"]});
        }
        var m,
            j,
            k,
            h,
            l;
        var i = this.config;
        if (!i.disabled && c.FastPreview == null) {
          b.Config({menuSettings: {FastPreview: true}});
        }
        if (c.FastPreview) {
          MathJax.Ajax.Styles({".MathJax_Preview .MJXf-math": {color: i.color}});
          b.Config({
            "HTML-CSS": i.Chunks,
            CommonHTML: i.Chunks,
            SVG: i.Chunks
          });
        }
        b.Register.MessageHook("Begin Math Output", function() {
          if (!h && d.Active()) {
            m = b.processUpdateTime;
            j = b.processUpdateDelay;
            k = b.config.messageStyle;
            b.processUpdateTime = i.updateTime;
            b.processUpdateDelay = i.updateDelay;
            b.Config({messageStyle: i.messageStyle});
            MathJax.Message.Clear(0, 0);
            l = true;
          }
        });
        b.Register.MessageHook("End Math Output", function() {
          if (!h && l) {
            b.processUpdateTime = m;
            b.processUpdateDelay = j;
            b.Config({messageStyle: k});
            h = true;
          }
        });
      },
      Disable: function() {
        this.enabled = false;
      },
      Enable: function() {
        this.enabled = true;
      },
      Active: function() {
        return c.FastPreview && this.enabled && !(e[c.renderer] || {}).noFastPreview;
      },
      Preview: function(h) {
        if (!this.Active()) {
          return;
        }
        var i = h.script.MathJax.preview || h.script.previousSibling;
        if (!i || i.className !== MathJax.Hub.config.preRemoveClass) {
          i = g.Element("span", {className: MathJax.Hub.config.preRemoveClass});
          h.script.parentNode.insertBefore(i, h.script);
          h.script.MathJax.preview = i;
        }
        i.innerHTML = "";
        i.style.color = (a ? "black" : "inherit");
        return this.postFilter(i, h);
      },
      postFilter: function(j, i) {
        if (!i.math.root.toPreviewHTML) {
          var h = MathJax.Callback.Queue();
          h.Push(["Require", MathJax.Ajax, "[MathJax]/jax/output/PreviewHTML/config.js"], ["Require", MathJax.Ajax, "[MathJax]/jax/output/PreviewHTML/jax.js"]);
          b.RestartAfter(h.Push({}));
        }
        i.math.root.toPreviewHTML(j);
      },
      Register: function(h) {
        b.Register.StartupHook(h + " Jax Require", function() {
          var i = MathJax.InputJax[h];
          i.postfilterHooks.Add(["Preview", MathJax.Extension["fast-preview"]], 50);
        });
      }
    };
    d.Register("TeX");
    d.Register("MathML");
    d.Register("AsciiMath");
    b.Register.StartupHook("End Config", ["Config", d]);
    b.Startup.signal.Post("fast-preview Ready");
  })(MathJax.Hub, MathJax.HTML, MathJax.Hub.Browser);
  MathJax.Ajax.loadComplete("[MathJax]/extensions/fast-preview.js");
  (function(a, e, b, f) {
    var c = b.config.menuSettings;
    var d = MathJax.Extension.AssistiveMML = {
      version: "2.6.1",
      config: b.CombineConfig("AssistiveMML", {
        disabled: false,
        styles: {
          ".MJX_Assistive_MathML": {
            position: "absolute!important",
            top: 0,
            left: 0,
            clip: (b.Browser.isMSIE && (document.documentMode || 0) < 8 ? "rect(1px 1px 1px 1px)" : "rect(1px, 1px, 1px, 1px)"),
            padding: "1px 0 0 0!important",
            border: "0!important",
            height: "1px!important",
            width: "1px!important",
            overflow: "hidden!important",
            display: "block!important",
            "-webkit-touch-callout": "none",
            "-webkit-user-select": "none",
            "-khtml-user-select": "none",
            "-moz-user-select": "none",
            "-ms-user-select": "none",
            "user-select": "none"
          },
          ".MJX_Assistive_MathML.MJX_Assistive_MathML_Block": {width: "100%!important"}
        }
      }),
      Config: function() {
        if (!this.config.disabled && c.assistiveMML == null) {
          b.Config({menuSettings: {assistiveMML: true}});
        }
        a.Styles(this.config.styles);
        b.Register.MessageHook("End Math", function(g) {
          if (c.assistiveMML) {
            return d.AddAssistiveMathML(g[1]);
          }
        });
      },
      AddAssistiveMathML: function(g) {
        var h = {
          jax: b.getAllJax(g),
          i: 0,
          callback: MathJax.Callback({})
        };
        this.HandleMML(h);
        return h.callback;
      },
      RemoveAssistiveMathML: function(k) {
        var h = b.getAllJax(k),
            l;
        for (var j = 0,
            g = h.length; j < g; j++) {
          l = document.getElementById(h[j].inputID + "-Frame");
          if (l && l.getAttribute("data-mathml")) {
            l.removeAttribute("data-mathml");
            if (l.lastChild && l.lastChild.className.match(/MJX_Assistive_MathML/)) {
              l.removeChild(l.lastChild);
            }
          }
        }
      },
      HandleMML: function(l) {
        var g = l.jax.length,
            h,
            i,
            n,
            j;
        while (l.i < g) {
          h = l.jax[l.i];
          n = document.getElementById(h.inputID + "-Frame");
          if (h.outputJax !== "NativeMML" && n && !n.getAttribute("data-mathml")) {
            try {
              i = h.root.toMathML("").replace(/\n */g, "").replace(/<!--.*?-->/g, "");
            } catch (k) {
              if (!k.restart) {
                throw k;
              }
              return MathJax.Callback.After(["HandleMML", this, l], k.restart);
            }
            n.setAttribute("data-mathml", i);
            j = f.addElement(n, "span", {
              isMathJax: true,
              unselectable: "on",
              className: "MJX_Assistive_MathML" + (h.root.Get("display") === "block" ? " MJX_Assistive_MathML_Block" : "")
            });
            j.innerHTML = i;
            n.style.position = "relative";
            n.setAttribute("role", "presentation");
            n.firstChild.setAttribute("aria-hidden", "true");
            j.setAttribute("role", "presentation");
          }
          l.i++;
        }
        l.callback();
      }
    };
    b.Startup.signal.Post("AssistiveMML Ready");
  })(MathJax.Ajax, MathJax.Callback, MathJax.Hub, MathJax.HTML);
  MathJax.Callback.Queue(["Require", MathJax.Ajax, "[MathJax]/extensions/toMathML.js"], ["loadComplete", MathJax.Ajax, "[MathJax]/extensions/AssistiveMML.js"], function() {
    MathJax.Hub.Register.StartupHook("End Config", ["Config", MathJax.Extension.AssistiveMML]);
  });
  MathJax.Ajax.loadComplete("[MathJax]/config/MML_HTMLorMML-full.js");
})(require('process'));