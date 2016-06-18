/* */ 
(function(process) {
  (function(HUB, AJAX) {
    var VERSION = "2.6.0";
    var CONFIG = MathJax.Hub.CombineConfig("Safe", {
      allow: {
        URLs: "safe",
        classes: "safe",
        cssIDs: "safe",
        styles: "safe",
        fontsize: "all",
        require: "safe"
      },
      sizeMin: .7,
      sizeMax: 1.44,
      safeProtocols: {
        http: true,
        https: true,
        file: true,
        javascript: false
      },
      safeStyles: {
        color: true,
        backgroundColor: true,
        border: true,
        cursor: true,
        margin: true,
        padding: true,
        textShadow: true,
        fontFamily: true,
        fontSize: true,
        fontStyle: true,
        fontWeight: true,
        opacity: true,
        outline: true
      },
      safeRequire: {
        action: true,
        amscd: true,
        amsmath: true,
        amssymbols: true,
        autobold: false,
        "autoload-all": false,
        bbox: true,
        begingroup: true,
        boldsymbol: true,
        cancel: true,
        color: true,
        enclose: true,
        extpfeil: true,
        HTML: true,
        mathchoice: true,
        mhchem: true,
        newcommand: true,
        noErrors: false,
        noUndefined: false,
        unicode: true,
        verb: true
      }
    });
    var ALLOW = CONFIG.allow;
    if (ALLOW.fontsize !== "all") {
      CONFIG.safeStyles.fontSize = false;
    }
    var SAFE = MathJax.Extension.Safe = {
      version: VERSION,
      config: CONFIG,
      div1: document.createElement("div"),
      div2: document.createElement("div"),
      filter: {
        href: "filterURL",
        src: "filterURL",
        altimg: "filterURL",
        "class": "filterClass",
        style: "filterStyles",
        id: "filterID",
        fontsize: "filterFontSize",
        mathsize: "filterFontSize",
        scriptminsize: "filterFontSize",
        scriptsizemultiplier: "filterSizeMultiplier",
        scriptlevel: "filterScriptLevel"
      },
      filterURL: function(url) {
        var protocol = (url.match(/^\s*([a-z]+):/i) || [null, ""])[1].toLowerCase();
        if (ALLOW.URLs === "none" || (ALLOW.URLs !== "all" && !CONFIG.safeProtocols[protocol])) {
          url = null;
        }
        return url;
      },
      filterClass: function(CLASS) {
        if (ALLOW.classes === "none" || (ALLOW.classes !== "all" && !CLASS.match(/^MJX-[-a-zA-Z0-9_.]+$/))) {
          CLASS = null;
        }
        return CLASS;
      },
      filterID: function(id) {
        if (ALLOW.cssIDs === "none" || (ALLOW.cssIDs !== "all" && !id.match(/^MJX-[-a-zA-Z0-9_.]+$/))) {
          id = null;
        }
        return id;
      },
      filterStyles: function(styles) {
        if (ALLOW.styles === "all") {
          return styles;
        }
        if (ALLOW.styles === "none") {
          return null;
        }
        try {
          var STYLE1 = this.div1.style,
              STYLE2 = this.div2.style;
          STYLE1.cssText = styles;
          STYLE2.cssText = "";
          for (var name in CONFIG.safeStyles) {
            if (CONFIG.safeStyles.hasOwnProperty(name)) {
              var value = this.filterStyle(name, STYLE1[name]);
              if (value != null) {
                STYLE2[name] = value;
              }
            }
          }
          styles = STYLE2.cssText;
        } catch (e) {
          styles = null;
        }
        return styles;
      },
      filterStyle: function(name, value) {
        if (typeof value !== "string") {
          return null;
        }
        if (value.match(/^\s*expression/)) {
          return null;
        }
        if (value.match(/javascript:/)) {
          return null;
        }
        return (CONFIG.safeStyles[name] ? value : null);
      },
      filterSize: function(size) {
        if (ALLOW.fontsize === "none") {
          return null;
        }
        if (ALLOW.fontsize !== "all") {
          size = Math.min(Math.max(size, CONFIG.sizeMin), CONFIG.sizeMax);
        }
        return size;
      },
      filterFontSize: function(size) {
        return (ALLOW.fontsize === "all" ? size : null);
      },
      filterSizeMultiplier: function(size) {
        if (ALLOW.fontsize === "none") {
          size = null;
        } else if (ALLOW.fontsize !== "all") {
          size = Math.min(1, Math.max(.6, size)).toString();
        }
        return size;
      },
      filterScriptLevel: function(level) {
        if (ALLOW.fontsize === "none") {
          level = null;
        } else if (ALLOW.fontsize !== "all") {
          level = Math.max(0, level).toString();
        }
        return level;
      },
      filterRequire: function(name) {
        if (ALLOW.require === "none" || (ALLOW.require !== "all" && !CONFIG.safeRequire[name.toLowerCase()])) {
          name = null;
        }
        return name;
      }
    };
    HUB.Register.StartupHook("TeX HTML Ready", function() {
      var TEX = MathJax.InputJax.TeX;
      TEX.Parse.Augment({
        HREF_attribute: function(name) {
          var url = SAFE.filterURL(this.GetArgument(name)),
              arg = this.GetArgumentMML(name);
          if (url) {
            arg.With({href: url});
          }
          this.Push(arg);
        },
        CLASS_attribute: function(name) {
          var CLASS = SAFE.filterClass(this.GetArgument(name)),
              arg = this.GetArgumentMML(name);
          if (CLASS) {
            if (arg["class"] != null) {
              CLASS = arg["class"] + " " + CLASS;
            }
            arg.With({"class": CLASS});
          }
          this.Push(arg);
        },
        STYLE_attribute: function(name) {
          var style = SAFE.filterStyles(this.GetArgument(name)),
              arg = this.GetArgumentMML(name);
          if (style) {
            if (arg.style != null) {
              if (style.charAt(style.length - 1) !== ";") {
                style += ";";
              }
              style = arg.style + " " + style;
            }
            arg.With({style: style});
          }
          this.Push(arg);
        },
        ID_attribute: function(name) {
          var ID = SAFE.filterID(this.GetArgument(name)),
              arg = this.GetArgumentMML(name);
          if (ID) {
            arg.With({id: ID});
          }
          this.Push(arg);
        }
      });
    });
    HUB.Register.StartupHook("TeX Jax Ready", function() {
      var TEX = MathJax.InputJax.TeX,
          PARSE = TEX.Parse,
          METHOD = SAFE.filter;
      PARSE.Augment({
        Require: function(name) {
          var file = this.GetArgument(name).replace(/.*\//, "").replace(/[^a-z0-9_.-]/ig, "");
          file = SAFE.filterRequire(file);
          if (file) {
            this.Extension(null, file);
          }
        },
        MmlFilterAttribute: function(name, value) {
          if (METHOD[name]) {
            value = SAFE[METHOD[name]](value);
          }
          return value;
        },
        SetSize: function(name, size) {
          size = SAFE.filterSize(size);
          if (size) {
            this.stack.env.size = size;
            this.Push(TEX.Stack.Item.style().With({styles: {mathsize: size + "em"}}));
          }
        }
      });
    });
    HUB.Register.StartupHook("TeX bbox Ready", function() {
      var TEX = MathJax.InputJax.TeX;
      TEX.Parse.Augment({BBoxStyle: function(styles) {
          return SAFE.filterStyles(styles);
        }});
    });
    HUB.Register.StartupHook("MathML Jax Ready", function() {
      var PARSE = MathJax.InputJax.MathML.Parse,
          METHOD = SAFE.filter;
      PARSE.Augment({filterAttribute: function(name, value) {
          if (METHOD[name]) {
            value = SAFE[METHOD[name]](value);
          }
          return value;
        }});
    });
    HUB.Startup.signal.Post("Safe Extension Ready");
    AJAX.loadComplete("[MathJax]/extensions/Safe.js");
  })(MathJax.Hub, MathJax.Ajax);
})(require('process'));
