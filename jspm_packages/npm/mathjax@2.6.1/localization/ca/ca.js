/* */ 
(function(process) {
  MathJax.Localization.addTranslation("ca", null, {
    menuTitle: "catal\u00E0",
    version: "2.6.0",
    isLoaded: true,
    domains: {
      _: {
        version: "2.6.0",
        isLoaded: true,
        strings: {
          CookieConfig: "MathJax ha trobat una galeta de configuraci\u00F3 d'usuari que inclou codi que s'ha d'executar. Voleu executar-lo?",
          MathProcessingError: "Error en processament d'expressi\u00F3 matem\u00E0tica",
          MathError: "Error d'expressi\u00F3 matem\u00E0tica",
          LoadFile: "Carregant %1",
          Loading: "Carregant",
          LoadFailed: "No s'ha pogut carregar el fitxer: %1",
          ProcessMath: "Processant expressi\u00F3: %1%%",
          Processing: "Processant",
          TypesetMath: "Formatejant expressi\u00F3: %1%%",
          Typesetting: "Formatejant",
          MathJaxNotSupported: "El vostre navegador no suporta MathJax"
        }
      },
      FontWarnings: {},
      "HTML-CSS": {},
      HelpDialog: {},
      MathML: {},
      MathMenu: {},
      TeX: {}
    },
    plural: function(a) {
      if (a === 1) {
        return 1;
      }
      return 2;
    },
    number: function(a) {
      return String(a).replace(".", ",");
    }
  });
  MathJax.Ajax.loadComplete("[MathJax]/localization/ca/ca.js");
})(require('process'));
