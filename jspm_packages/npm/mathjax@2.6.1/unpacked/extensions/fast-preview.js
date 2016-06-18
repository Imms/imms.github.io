/* */ 
(function(process) {
  (function(HUB, HTML, BROWSER) {
    var SETTINGS = HUB.config.menuSettings;
    var JAX = MathJax.OutputJax;
    var msieColorBug = BROWSER.isMSIE && (document.documentMode || 0) < 8;
    var FastPreview = MathJax.Extension["fast-preview"] = {
      version: "2.6.0",
      enabled: true,
      config: HUB.CombineConfig("fast-preview", {
        Chunks: {
          EqnChunk: 10000,
          EqnChunkFactor: 1,
          EqnChunkDelay: 0
        },
        color: "inherit!important",
        updateTime: 30,
        updateDelay: 6,
        messageStyle: "none",
        disabled: BROWSER.isMSIE && !BROWSER.versionAtLeast("8.0")
      }),
      Config: function() {
        if (HUB.config["CHTML-preview"])
          MathJax.Hub.Config({"fast-preview": HUB.config["CHTML-preview"]});
        var update,
            delay,
            style,
            done,
            saved;
        var config = this.config;
        if (!config.disabled && SETTINGS.FastPreview == null)
          HUB.Config({menuSettings: {FastPreview: true}});
        if (SETTINGS.FastPreview) {
          MathJax.Ajax.Styles({".MathJax_Preview .MJXf-math": {color: config.color}});
          HUB.Config({
            "HTML-CSS": config.Chunks,
            CommonHTML: config.Chunks,
            SVG: config.Chunks
          });
        }
        HUB.Register.MessageHook("Begin Math Output", function() {
          if (!done && FastPreview.Active()) {
            update = HUB.processUpdateTime;
            delay = HUB.processUpdateDelay;
            style = HUB.config.messageStyle;
            HUB.processUpdateTime = config.updateTime;
            HUB.processUpdateDelay = config.updateDelay;
            HUB.Config({messageStyle: config.messageStyle});
            MathJax.Message.Clear(0, 0);
            saved = true;
          }
        });
        HUB.Register.MessageHook("End Math Output", function() {
          if (!done && saved) {
            HUB.processUpdateTime = update;
            HUB.processUpdateDelay = delay;
            HUB.Config({messageStyle: style});
            done = true;
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
        return SETTINGS.FastPreview && this.enabled && !(JAX[SETTINGS.renderer] || {}).noFastPreview;
      },
      Preview: function(data) {
        if (!this.Active())
          return;
        var preview = data.script.MathJax.preview || data.script.previousSibling;
        if (!preview || preview.className !== MathJax.Hub.config.preRemoveClass) {
          preview = HTML.Element("span", {className: MathJax.Hub.config.preRemoveClass});
          data.script.parentNode.insertBefore(preview, data.script);
          data.script.MathJax.preview = preview;
        }
        preview.innerHTML = "";
        preview.style.color = (msieColorBug ? "black" : "inherit");
        return this.postFilter(preview, data);
      },
      postFilter: function(preview, data) {
        if (!data.math.root.toPreviewHTML) {
          var queue = MathJax.Callback.Queue();
          queue.Push(["Require", MathJax.Ajax, "[MathJax]/jax/output/PreviewHTML/config.js"], ["Require", MathJax.Ajax, "[MathJax]/jax/output/PreviewHTML/jax.js"]);
          HUB.RestartAfter(queue.Push({}));
        }
        data.math.root.toPreviewHTML(preview);
      },
      Register: function(name) {
        HUB.Register.StartupHook(name + " Jax Require", function() {
          var jax = MathJax.InputJax[name];
          jax.postfilterHooks.Add(["Preview", MathJax.Extension["fast-preview"]], 50);
        });
      }
    };
    FastPreview.Register("TeX");
    FastPreview.Register("MathML");
    FastPreview.Register("AsciiMath");
    HUB.Register.StartupHook("End Config", ["Config", FastPreview]);
    HUB.Startup.signal.Post("fast-preview Ready");
  })(MathJax.Hub, MathJax.HTML, MathJax.Hub.Browser);
  MathJax.Ajax.loadComplete("[MathJax]/extensions/fast-preview.js");
})(require('process'));
