/* */ 
(function(process) {
  (function(AJAX, HUB, HTML, PlainSource) {
    var EVENT,
        TOUCH,
        HOVER;
    PlainSource.Augment({
      settings: HUB.config.menuSettings,
      Config: function() {
        if (!this.require)
          this.require = [];
        this.SUPER(arguments).Config.call(this);
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
        return AJAX.Styles(this.config.styles);
      },
      preTranslate: function(state) {
        var scripts = state.jax[this.id],
            i,
            m = scripts.length,
            script,
            prev,
            span,
            div,
            jax;
        for (i = 0; i < m; i++) {
          script = scripts[i];
          if (!script.parentNode)
            continue;
          prev = script.previousSibling;
          if (prev && String(prev.className).match(/^MathJax_PlainSource(_Display)?( MathJax_Processing)?$/)) {
            prev.parentNode.removeChild(prev);
          }
          jax = script.MathJax.elementJax;
          if (!jax)
            continue;
          jax.PlainSource = {display: (jax.root.Get("display") === "block")};
          span = div = HTML.Element("span", {
            className: "MathJax_PlainSource",
            id: jax.inputID + "-Frame",
            isMathJax: true,
            jaxID: this.id,
            oncontextmenu: EVENT.Menu,
            onmousedown: EVENT.Mousedown,
            onmouseover: EVENT.Mouseover,
            onmouseout: EVENT.Mouseout,
            onmousemove: EVENT.Mousemove,
            onclick: EVENT.Click,
            ondblclick: EVENT.DblClick,
            onkeydown: EVENT.Keydown,
            tabIndex: HUB.getTabOrder(jax)
          }, [["span"]]);
          if (HUB.Browser.noContextMenu) {
            span.ontouchstart = TOUCH.start;
            span.ontouchend = TOUCH.end;
          }
          if (jax.PlainSource.display) {
            div = HTML.Element("div", {className: "MathJax_PlainSource_Display"});
            div.appendChild(span);
          }
          script.parentNode.insertBefore(div, script);
        }
      },
      Translate: function(script, state) {
        if (!script.parentNode)
          return;
        var jax = script.MathJax.elementJax,
            math = jax.root,
            span = document.getElementById(jax.inputID + "-Frame");
        this.initPlainSource(math, span);
        var source = jax.originalText;
        if (jax.inputJax === "MathML") {
          if ((jax.root.data[0].data.length > 0) && (jax.root.data[0].data[0].type === "semantics")) {
            var annotations = jax.root.data[0].data[0].data;
            for (var a = 0; a < annotations.length; a++) {
              if (annotations[a].attr.encoding === "application/x-tex") {
                source = jax.root.data[0].data[0].data[a].data[0].data[0];
                break;
              }
              if (annotations[a].attr.encoding === "text/x-asciimath") {
                source = jax.root.data[0].data[0].data[a].data[0].data[0];
              }
            }
          }
        }
        jax.PlainSource.source = source;
        HTML.addText(span.firstChild, source);
      },
      postTranslate: function(state) {},
      getJaxFromMath: function(math) {
        if (math.parentNode.className === "MathJax_PlainSource_Display")
          math = math.parentNode;
        do {
          math = math.nextSibling;
        } while (math && math.nodeName.toLowerCase() !== "script");
        return HUB.getJaxFor(math);
      },
      Zoom: function(jax, span, math, Mw, Mh) {
        var pad = Math.round(span.parentNode.offsetWidth / 2);
        span.style.whiteSpace = "pre";
        HTML.addText(span, jax.PlainSource.source);
        var mW = math.offsetWidth,
            mH = math.offsetHeight,
            zW = span.offsetWidth,
            zH = span.offsetHeight;
        var Y = -Math.round((zH + mH) / 2) - (jax.PlainSource.display ? 0 : pad);
        return {
          mW: mW,
          mH: mH,
          zW: zW,
          zH: zH,
          Y: Y
        };
      },
      initPlainSource: function(math, span) {},
      Remove: function(jax) {
        var span = document.getElementById(jax.inputID + "-Frame");
        if (span) {
          if (jax.PlainSource.display)
            span = span.parentNode;
          span.parentNode.removeChild(span);
        }
        delete jax.PlainSource;
      }
    });
    MathJax.Hub.Register.StartupHook("mml Jax Ready", function() {
      MathJax.Hub.Register.StartupHook("onLoad", function() {
        setTimeout(MathJax.Callback(["loadComplete", PlainSource, "jax.js"]), 0);
      });
    });
    MathJax.Hub.Register.StartupHook("End Cookie", function() {
      if (HUB.config.menuSettings.zoom !== "None") {
        AJAX.Require("[MathJax]/extensions/MathZoom.js");
      }
    });
  })(MathJax.Ajax, MathJax.Hub, MathJax.HTML, MathJax.OutputJax.PlainSource);
})(require('process'));
