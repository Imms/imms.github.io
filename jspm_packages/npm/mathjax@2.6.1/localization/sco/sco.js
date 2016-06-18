/* */ 
(function(process) {
  MathJax.Localization.addTranslation("sco", null, {
    menuTitle: "scots",
    version: "2.6.0",
    isLoaded: true,
    domains: {
      _: {
        version: "2.6.0",
        isLoaded: true,
        strings: {
          MathProcessingError: "Maths processin mistak",
          MathError: "Maths mistak",
          LoadFile: "Laidin %1",
          Loading: "Laidin",
          LoadFailed: "File failed tae laid: %1",
          ProcessMath: "Processin maths: %1%%",
          Processing: "Processin",
          TypesetMath: "Typesettin maths: %1%%",
          Typesetting: "Typesettin",
          MathJaxNotSupported: "Yer brouser disna support MathJax"
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
      return a;
    }
  });
  MathJax.Ajax.loadComplete("[MathJax]/localization/sco/sco.js");
})(require('process'));
