/* */ 
(function(process) {
  MathJax.Extension.mml2jax = {
    version: "2.6.0",
    config: {preview: "mathml"},
    MMLnamespace: "http://www.w3.org/1998/Math/MathML",
    PreProcess: function(element) {
      if (!this.configured) {
        this.config = MathJax.Hub.CombineConfig("mml2jax", this.config);
        if (this.config.Augment) {
          MathJax.Hub.Insert(this, this.config.Augment);
        }
        this.InitBrowser();
        this.configured = true;
      }
      if (typeof(element) === "string") {
        element = document.getElementById(element);
      }
      if (!element) {
        element = document.body;
      }
      var mathArray = [];
      this.PushMathElements(mathArray, element, "math");
      this.PushMathElements(mathArray, element, "math", this.MMLnamespace);
      var i,
          m;
      if (typeof(document.namespaces) !== "undefined") {
        try {
          for (i = 0, m = document.namespaces.length; i < m; i++) {
            var ns = document.namespaces[i];
            if (ns.urn === this.MMLnamespace) {
              this.PushMathElements(mathArray, element, ns.name + ":math");
            }
          }
        } catch (err) {}
      } else {
        var html = document.getElementsByTagName("html")[0];
        if (html) {
          for (i = 0, m = html.attributes.length; i < m; i++) {
            var attr = html.attributes[i];
            if (attr.nodeName.substr(0, 6) === "xmlns:" && attr.nodeValue === this.MMLnamespace) {
              this.PushMathElements(mathArray, element, attr.nodeName.substr(6) + ":math");
            }
          }
        }
      }
      this.ProcessMathArray(mathArray);
    },
    PushMathElements: function(array, element, name, namespace) {
      var math,
          preview = MathJax.Hub.config.preRemoveClass;
      if (namespace) {
        if (!element.getElementsByTagNameNS)
          return;
        math = element.getElementsByTagNameNS(namespace, name);
      } else {
        math = element.getElementsByTagName(name);
      }
      for (var i = 0,
          m = math.length; i < m; i++) {
        var parent = math[i].parentNode;
        if (parent && parent.className !== preview && !parent.isMathJax && !math[i].prefix === !namespace)
          array.push(math[i]);
      }
    },
    ProcessMathArray: function(math) {
      var i,
          m = math.length;
      if (m) {
        if (this.MathTagBug) {
          for (i = 0; i < m; i++) {
            if (math[i].nodeName === "MATH") {
              this.ProcessMathFlattened(math[i]);
            } else {
              this.ProcessMath(math[i]);
            }
          }
        } else {
          for (i = 0; i < m; i++) {
            this.ProcessMath(math[i]);
          }
        }
      }
    },
    ProcessMath: function(math) {
      var parent = math.parentNode;
      if (!parent || parent.className === MathJax.Hub.config.preRemoveClass)
        return;
      var script = document.createElement("script");
      script.type = "math/mml";
      parent.insertBefore(script, math);
      if (this.AttributeBug) {
        var html = this.OuterHTML(math);
        if (this.CleanupHTML) {
          html = html.replace(/<\?import .*?>/i, "").replace(/<\?xml:namespace .*?\/>/i, "");
          html = html.replace(/&nbsp;/g, "&#xA0;");
        }
        MathJax.HTML.setScript(script, html);
        parent.removeChild(math);
      } else {
        var span = MathJax.HTML.Element("span");
        span.appendChild(math);
        MathJax.HTML.setScript(script, span.innerHTML);
      }
      if (this.config.preview !== "none") {
        this.createPreview(math, script);
      }
    },
    ProcessMathFlattened: function(math) {
      var parent = math.parentNode;
      if (!parent || parent.className === MathJax.Hub.config.preRemoveClass)
        return;
      var script = document.createElement("script");
      script.type = "math/mml";
      parent.insertBefore(script, math);
      var mml = "",
          node,
          MATH = math;
      while (math && math.nodeName !== "/MATH") {
        node = math;
        math = math.nextSibling;
        mml += this.NodeHTML(node);
        node.parentNode.removeChild(node);
      }
      if (math && math.nodeName === "/MATH") {
        math.parentNode.removeChild(math);
      }
      script.text = mml + "</math>";
      if (this.config.preview !== "none") {
        this.createPreview(MATH, script);
      }
    },
    NodeHTML: function(node) {
      var html,
          i,
          m;
      if (node.nodeName === "#text") {
        html = this.quoteHTML(node.nodeValue);
      } else if (node.nodeName === "#comment") {
        html = "<!--" + node.nodeValue + "-->";
      } else {
        html = "<" + node.nodeName.toLowerCase();
        for (i = 0, m = node.attributes.length; i < m; i++) {
          var attribute = node.attributes[i];
          if (attribute.specified && attribute.nodeName.substr(0, 10) !== "_moz-math-") {
            html += " " + attribute.nodeName.toLowerCase().replace(/xmlns:xmlns/, "xmlns") + "=";
            var value = attribute.nodeValue;
            if (value == null && attribute.nodeName === "style" && node.style) {
              value = node.style.cssText;
            }
            html += '"' + this.quoteHTML(value) + '"';
          }
        }
        html += ">";
        if (node.outerHTML != null && node.outerHTML.match(/(.<\/[A-Z]+>|\/>)$/)) {
          for (i = 0, m = node.childNodes.length; i < m; i++) {
            html += this.OuterHTML(node.childNodes[i]);
          }
          html += "</" + node.nodeName.toLowerCase() + ">";
        }
      }
      return html;
    },
    OuterHTML: function(node) {
      if (node.nodeName.charAt(0) === "#") {
        return this.NodeHTML(node);
      }
      if (!this.AttributeBug) {
        return node.outerHTML;
      }
      var html = this.NodeHTML(node);
      for (var i = 0,
          m = node.childNodes.length; i < m; i++) {
        html += this.OuterHTML(node.childNodes[i]);
      }
      html += "</" + node.nodeName.toLowerCase() + ">";
      return html;
    },
    quoteHTML: function(string) {
      if (string == null) {
        string = "";
      }
      return string.replace(/&/g, "&#x26;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/\"/g, "&quot;");
    },
    createPreview: function(math, script) {
      var preview = this.config.preview;
      if (preview === "none")
        return;
      var isNodePreview = false;
      if (preview === "mathml") {
        isNodePreview = true;
        if (this.MathTagBug) {
          preview = "alttext";
        } else {
          preview = math.cloneNode(true);
        }
      }
      if (preview === "alttext" || preview === "altimg") {
        isNodePreview = true;
        var alttext = this.filterPreview(math.getAttribute("alttext"));
        if (preview === "alttext") {
          if (alttext != null) {
            preview = MathJax.HTML.TextNode(alttext);
          } else {
            preview = null;
          }
        } else {
          var src = math.getAttribute("altimg");
          if (src != null) {
            var style = {
              width: math.getAttribute("altimg-width"),
              height: math.getAttribute("altimg-height")
            };
            preview = MathJax.HTML.Element("img", {
              src: src,
              alt: alttext,
              style: style
            });
          } else {
            preview = null;
          }
        }
      }
      if (preview) {
        var span;
        if (isNodePreview) {
          span = MathJax.HTML.Element("span", {className: MathJax.Hub.config.preRemoveClass});
          span.appendChild(preview);
        } else {
          span = MathJax.HTML.Element("span", {className: MathJax.Hub.config.preRemoveClass}, preview);
        }
        script.parentNode.insertBefore(span, script);
      }
    },
    filterPreview: function(text) {
      return text;
    },
    InitBrowser: function() {
      var test = MathJax.HTML.Element("span", {
        id: "<",
        className: "mathjax",
        innerHTML: "<math><mi>x</mi><mspace /></math>"
      });
      var html = test.outerHTML || "";
      this.AttributeBug = html !== "" && !(html.match(/id="&lt;"/) && html.match(/class="mathjax"/) && html.match(/<\/math>/));
      this.MathTagBug = test.childNodes.length > 1;
      this.CleanupHTML = MathJax.Hub.Browser.isMSIE;
    }
  };
  MathJax.Hub.Register.PreProcessor(["PreProcess", MathJax.Extension.mml2jax], 5);
  MathJax.Ajax.loadComplete("[MathJax]/extensions/mml2jax.js");
})(require('process'));
