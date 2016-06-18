/* */ 
(function(process) {
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
})(require('process'));
