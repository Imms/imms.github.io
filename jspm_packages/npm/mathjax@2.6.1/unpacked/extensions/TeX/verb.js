/* */ 
(function(process) {
  MathJax.Extension["TeX/verb"] = {version: "2.6.0"};
  MathJax.Hub.Register.StartupHook("TeX Jax Ready", function() {
    var MML = MathJax.ElementJax.mml;
    var TEX = MathJax.InputJax.TeX;
    var TEXDEF = TEX.Definitions;
    TEXDEF.Add({macros: {verb: 'Verb'}}, null, true);
    TEX.Parse.Augment({Verb: function(name) {
        var c = this.GetNext();
        var start = ++this.i;
        if (c == "") {
          TEX.Error(["MissingArgFor", "Missing argument for %1", name]);
        }
        while (this.i < this.string.length && this.string.charAt(this.i) != c) {
          this.i++;
        }
        if (this.i == this.string.length) {
          TEX.Error(["NoClosingDelim", "Can't find closing delimiter for %1", name]);
        }
        var text = this.string.slice(start, this.i).replace(/ /g, "\u00A0");
        this.i++;
        this.Push(MML.mtext(text).With({mathvariant: MML.VARIANT.MONOSPACE}));
      }});
    MathJax.Hub.Startup.signal.Post("TeX verb Ready");
  });
  MathJax.Ajax.loadComplete("[MathJax]/extensions/TeX/verb.js");
})(require('process'));
