/* */ 
(function(process) {
  MathJax.Localization.addTranslation("qqq", "MathML", {
    version: "2.6.0",
    isLoaded: true,
    strings: {
      BadMglyph: "This error is displayed when processing a MathML mglyph element with a bad URL. Parameters:\n* %1 - the value of the src attribute",
      BadMglyphFont: "Parameters:\n* %1 - font family",
      MathPlayer: "This alert is displayed when the Native MathML output Jax fails to set up MathPlayer. The instructions are IE specific.\n\nThe new line character is used to force new lines in the alert box.",
      CantCreateXMLParser: "This alert is displayed when the MathML input Jax fails to create an XML parser. The instructions are IE specific.\n\nThe new line character is used to force new lines in the alert box.",
      UnknownNodeType: "Used as error message. Parameters:\n* %1 - node type",
      UnexpectedTextNode: 'Used as error message. Parameters:\n* %1 - text, enclosed in "\'"',
      ErrorParsingMathML: "This error is displayed when a MathML element fails to be parsed.\n\nIt can only be produced by old versions of Internet Explorer.",
      ParsingError: "This error is displayed when an XML parsing error happens.\n\nThe argument is the error returned by the XML parser.",
      MathMLSingleElement: "This error is displayed when a MathML input Jax contains more than one \u003Ccode\u003E\u003Cnowiki\u003E\u003Cmath\u003E\u003C/nowiki\u003E\u003C/code\u003E root.\n\nIt can only be produced by very old browsers.",
      MathMLRootElement: "{{doc-important|Do not translate the \u003Ccode\u003E\u003Cnowiki\u003E\u003Cmath\u003E\u003C/nowiki\u003E\u003C/code\u003E tag! It is a MathML tag.}}         \n\nThis error is displayed when a MathML input Jax contains a root other than \u003Ccode\u003E\u003Cnowiki\u003E\u003Cmath\u003E\u003C/nowiki\u003E\u003C/code\u003E.\n\nParameters:\n* %1 - the root name"
    }
  });
  MathJax.Ajax.loadComplete("[MathJax]/localization/qqq/MathML.js");
})(require('process'));
