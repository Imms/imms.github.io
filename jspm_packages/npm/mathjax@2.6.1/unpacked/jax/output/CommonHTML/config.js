/* */ 
(function(process) {
  MathJax.OutputJax.CommonHTML = MathJax.OutputJax({
    id: "CommonHTML",
    version: "2.6.1",
    directory: MathJax.OutputJax.directory + "/CommonHTML",
    extensionDir: MathJax.OutputJax.extensionDir + "/CommonHTML",
    autoloadDir: MathJax.OutputJax.directory + "/CommonHTML/autoload",
    fontDir: MathJax.OutputJax.directory + "/CommonHTML/fonts",
    webfontDir: MathJax.OutputJax.fontDir + "/HTML-CSS",
    config: {
      matchFontHeight: true,
      scale: 100,
      minScaleAdjust: 50,
      mtextFontInherit: false,
      undefinedFamily: "STIXGeneral,'Cambria Math','Arial Unicode MS',serif",
      EqnChunk: (MathJax.Hub.Browser.isMobile ? 20 : 100),
      EqnChunkFactor: 1.5,
      EqnChunkDelay: 100,
      linebreaks: {
        automatic: false,
        width: "container"
      }
    }
  });
  if (!MathJax.Hub.config.delayJaxRegistration) {
    MathJax.OutputJax.CommonHTML.Register("jax/mml");
  }
  MathJax.OutputJax.CommonHTML.loadComplete("config.js");
})(require('process'));
