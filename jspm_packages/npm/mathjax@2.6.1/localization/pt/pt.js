/* */ 
(function(process) {
  MathJax.Localization.addTranslation("pt", null, {
    menuTitle: "portugus\u00EA",
    version: "2.6.0",
    isLoaded: true,
    domains: {
      _: {
        version: "2.6.0",
        isLoaded: true,
        strings: {
          MathProcessingError: "Erro no processamento das f\u00F3rmulas",
          MathError: "Erro de matem\u00E1tica",
          LoadFile: "A carregar %1",
          Loading: "A carregar",
          LoadFailed: "O ficheiro n\u00E3o pode ser carregado: %1",
          ProcessMath: "Processando f\u00F3rmula: %1%%",
          Processing: "Processando",
          TypesetMath: "Formatando f\u00F3rmulas: %1%%",
          Typesetting: "Formatando",
          MathJaxNotSupported: "O seu navegador n\u00E3o suporta MathJax"
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
  MathJax.Ajax.loadComplete("[MathJax]/localization/pt/pt.js");
})(require('process'));
