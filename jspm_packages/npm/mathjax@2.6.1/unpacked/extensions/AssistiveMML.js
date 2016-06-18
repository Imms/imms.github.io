/* */ 
(function(process) {
  (function(AJAX, CALLBACK, HUB, HTML) {
    var SETTINGS = HUB.config.menuSettings;
    var AssistiveMML = MathJax.Extension["AssistiveMML"] = {
      version: "2.6.1",
      config: HUB.CombineConfig("AssistiveMML", {
        disabled: false,
        styles: {
          ".MJX_Assistive_MathML": {
            position: "absolute!important",
            top: 0,
            left: 0,
            clip: (HUB.Browser.isMSIE && (document.documentMode || 0) < 8 ? "rect(1px 1px 1px 1px)" : "rect(1px, 1px, 1px, 1px)"),
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
        if (!this.config.disabled && SETTINGS.assistiveMML == null)
          HUB.Config({menuSettings: {assistiveMML: true}});
        AJAX.Styles(this.config.styles);
        HUB.Register.MessageHook("End Math", function(msg) {
          if (SETTINGS.assistiveMML)
            return AssistiveMML.AddAssistiveMathML(msg[1]);
        });
      },
      AddAssistiveMathML: function(node) {
        var state = {
          jax: HUB.getAllJax(node),
          i: 0,
          callback: MathJax.Callback({})
        };
        this.HandleMML(state);
        return state.callback;
      },
      RemoveAssistiveMathML: function(node) {
        var jax = HUB.getAllJax(node),
            frame;
        for (var i = 0,
            m = jax.length; i < m; i++) {
          frame = document.getElementById(jax[i].inputID + "-Frame");
          if (frame && frame.getAttribute("data-mathml")) {
            frame.removeAttribute("data-mathml");
            if (frame.lastChild && frame.lastChild.className.match(/MJX_Assistive_MathML/))
              frame.removeChild(frame.lastChild);
          }
        }
      },
      HandleMML: function(state) {
        var m = state.jax.length,
            jax,
            mml,
            frame,
            span;
        while (state.i < m) {
          jax = state.jax[state.i];
          frame = document.getElementById(jax.inputID + "-Frame");
          if (jax.outputJax !== "NativeMML" && frame && !frame.getAttribute("data-mathml")) {
            try {
              mml = jax.root.toMathML("").replace(/\n */g, "").replace(/<!--.*?-->/g, "");
            } catch (err) {
              if (!err.restart)
                throw err;
              return MathJax.Callback.After(["HandleMML", this, state], err.restart);
            }
            frame.setAttribute("data-mathml", mml);
            span = HTML.addElement(frame, "span", {
              isMathJax: true,
              unselectable: "on",
              className: "MJX_Assistive_MathML" + (jax.root.Get("display") === "block" ? " MJX_Assistive_MathML_Block" : "")
            });
            span.innerHTML = mml;
            frame.style.position = "relative";
            frame.setAttribute("role", "presentation");
            frame.firstChild.setAttribute("aria-hidden", "true");
            span.setAttribute("role", "presentation");
          }
          state.i++;
        }
        state.callback();
      }
    };
    HUB.Startup.signal.Post("AssistiveMML Ready");
  })(MathJax.Ajax, MathJax.Callback, MathJax.Hub, MathJax.HTML);
  MathJax.Callback.Queue(["Require", MathJax.Ajax, "[MathJax]/extensions/toMathML.js"], ["loadComplete", MathJax.Ajax, "[MathJax]/extensions/AssistiveMML.js"], function() {
    MathJax.Hub.Register.StartupHook("End Config", ["Config", MathJax.Extension.AssistiveMML]);
  });
})(require('process'));
