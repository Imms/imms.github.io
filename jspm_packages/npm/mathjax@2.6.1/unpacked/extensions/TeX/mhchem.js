/* */ 
(function(process) {
  MathJax.Extension["TeX/mhchem"] = {version: "2.6.0"};
  MathJax.Hub.Register.StartupHook("TeX Jax Ready", function() {
    var TEX = MathJax.InputJax.TeX;
    var CE = MathJax.Object.Subclass({
      string: "",
      i: 0,
      tex: "",
      TEX: "",
      atom: false,
      sup: "",
      sub: "",
      presup: "",
      presub: "",
      Init: function(string) {
        this.string = string;
      },
      ParseTable: {
        '-': "Minus",
        '+': "Plus",
        '(': "Open",
        ')': "Close",
        '[': "Open",
        ']': "Close",
        '<': "Less",
        '^': "Superscript",
        '_': "Subscript",
        '*': "Dot",
        '.': "Dot",
        '=': "Equal",
        '#': "Pound",
        '$': "Math",
        '\\': "Macro",
        ' ': "Space"
      },
      Arrows: {
        '->': "rightarrow",
        '<-': "leftarrow",
        '<->': "leftrightarrow",
        '<=>': "rightleftharpoons",
        '<=>>': "Rightleftharpoons",
        '<<=>': "Leftrightharpoons",
        '^': "uparrow",
        'v': "downarrow"
      },
      Bonds: {
        '-': "-",
        '=': "=",
        '#': "\\equiv",
        '~': "\\tripledash",
        '~-': "\\begin{CEstack}{}\\tripledash\\\\-\\end{CEstack}",
        '~=': "\\raise2mu{\\begin{CEstack}{}\\tripledash\\\\-\\\\-\\end{CEstack}}",
        '~--': "\\raise2mu{\\begin{CEstack}{}\\tripledash\\\\-\\\\-\\end{CEstack}}",
        '-~-': "\\raise2mu{\\begin{CEstack}{}-\\\\\\tripledash\\\\-\\end{CEstack}}",
        '...': "{\\cdot}{\\cdot}{\\cdot}",
        '....': "{\\cdot}{\\cdot}{\\cdot}{\\cdot}",
        '->': "\\rightarrow",
        '<-': "\\leftarrow",
        '??': "\\text{??}"
      },
      Parse: function() {
        this.tex = "";
        this.atom = false;
        while (this.i < this.string.length) {
          var c = this.string.charAt(this.i);
          if (c.match(/[a-z]/i)) {
            this.ParseLetter();
          } else if (c.match(/[0-9]/)) {
            this.ParseNumber();
          } else {
            this["Parse" + (this.ParseTable[c] || "Other")](c);
          }
        }
        this.FinishAtom(true);
        return this.TEX;
      },
      ParseLetter: function() {
        this.FinishAtom();
        if (this.Match(/^v( |$)/)) {
          this.tex += "{\\" + this.Arrows["v"] + "}";
        } else {
          this.tex += "\\text{" + this.Match(/^[a-z]+/i) + "}";
          this.atom = true;
        }
      },
      ParseNumber: function() {
        var n = this.Match(/^\d+/);
        if (this.atom && !this.sub) {
          this.sub = n;
        } else {
          this.FinishAtom();
          var match = this.Match(/^\/\d+/);
          if (match) {
            var frac = "\\frac{" + n + "}{" + match.substr(1) + "}";
            this.tex += "\\mathchoice{\\textstyle" + frac + "}{" + frac + "}{" + frac + "}{" + frac + "}";
          } else {
            this.tex += n;
            if (this.i < this.string.length) {
              this.tex += "\\,";
            }
          }
        }
      },
      ParseMinus: function(c) {
        if (this.atom && (this.i === this.string.length - 1 || this.string.charAt(this.i + 1) === " ")) {
          this.sup += c;
        } else {
          this.FinishAtom();
          if (this.string.substr(this.i, 2) === "->") {
            this.i += 2;
            this.AddArrow("->");
            return;
          } else {
            this.tex += "{-}";
          }
        }
        this.i++;
      },
      ParsePlus: function(c) {
        if (this.atom) {
          this.sup += c;
        } else {
          this.FinishAtom();
          this.tex += c;
        }
        this.i++;
      },
      ParseDot: function(c) {
        this.FinishAtom();
        this.tex += "\\cdot ";
        this.i++;
      },
      ParseEqual: function(c) {
        this.FinishAtom();
        this.tex += "{=}";
        this.i++;
      },
      ParsePound: function(c) {
        this.FinishAtom();
        this.tex += "{\\equiv}";
        this.i++;
      },
      ParseOpen: function(c) {
        this.FinishAtom();
        var match = this.Match(/^\([v^]\)/);
        if (match) {
          this.tex += "{\\" + this.Arrows[match.charAt(1)] + "}";
        } else {
          this.tex += "{" + c;
          this.i++;
        }
      },
      ParseClose: function(c) {
        this.FinishAtom();
        this.atom = true;
        this.tex += c + "}";
        this.i++;
      },
      ParseLess: function(c) {
        this.FinishAtom();
        var arrow = this.Match(/^(<->?|<=>>?|<<=>)/);
        if (!arrow) {
          this.tex += c;
          this.i++;
        } else {
          this.AddArrow(arrow);
        }
      },
      ParseSuperscript: function(c) {
        c = this.string.charAt(++this.i);
        if (c === "{") {
          this.i++;
          var m = this.Find("}");
          if (m === "-.") {
            this.sup += "{-}{\\cdot}";
          } else if (m) {
            this.sup += CE(m).Parse().replace(/^\{-\}/, "-");
          }
        } else if (c === " " || c === "") {
          this.tex += "{\\" + this.Arrows["^"] + "}";
          this.i++;
        } else {
          var n = this.Match(/^(\d+|-\.)/);
          if (n) {
            this.sup += n;
          }
        }
      },
      ParseSubscript: function(c) {
        if (this.string.charAt(++this.i) == "{") {
          this.i++;
          this.sub += CE(this.Find("}")).Parse().replace(/^\{-\}/, "-");
        } else {
          var n = this.Match(/^\d+/);
          if (n) {
            this.sub += n;
          }
        }
      },
      ParseMath: function(c) {
        this.FinishAtom();
        this.i++;
        this.tex += this.Find(c);
      },
      ParseMacro: function(c) {
        this.FinishAtom();
        this.i++;
        var match = this.Match(/^([a-z]+|.)/i) || " ";
        if (match === "sbond") {
          this.tex += "{-}";
        } else if (match === "dbond") {
          this.tex += "{=}";
        } else if (match === "tbond") {
          this.tex += "{\\equiv}";
        } else if (match === "bond") {
          var bond = (this.Match(/^\{.*?\}/) || "");
          bond = bond.substr(1, bond.length - 2);
          this.tex += "{" + (this.Bonds[bond] || "\\text{??}") + "}";
        } else if (match === "{") {
          this.tex += "{\\{";
        } else if (match === "}") {
          this.tex += "\\}}";
          this.atom = true;
        } else {
          this.tex += c + match;
        }
      },
      ParseSpace: function(c) {
        this.FinishAtom();
        this.i++;
      },
      ParseOther: function(c) {
        this.FinishAtom();
        this.tex += c;
        this.i++;
      },
      AddArrow: function(arrow) {
        var c = this.Match(/^[CT]\[/);
        if (c) {
          this.i--;
          c = c.charAt(0);
        }
        var above = this.GetBracket(c),
            below = this.GetBracket(c);
        arrow = this.Arrows[arrow];
        if (above || below) {
          if (below) {
            arrow += "[" + below + "]";
          }
          arrow += "{" + above + "}";
          arrow = "\\mathrel{\\x" + arrow + "}";
        } else {
          arrow = "\\long" + arrow + " ";
        }
        this.tex += arrow;
      },
      FinishAtom: function(force) {
        if (this.sup || this.sub || this.presup || this.presub) {
          if (!force && !this.atom) {
            if (this.tex === "" && !this.sup && !this.sub)
              return;
            if (!this.presup && !this.presub && (this.tex === "" || this.tex === "{" || (this.tex === "}" && this.TEX.substr(-1) === "{"))) {
              this.presup = this.sup, this.presub = this.sub;
              this.sub = this.sup = "";
              this.TEX += this.tex;
              this.tex = "";
              return;
            }
          }
          if (this.sub && !this.sup) {
            this.sup = "\\Space{0pt}{0pt}{.2em}";
          }
          if ((this.presup || this.presub) && this.tex !== "{") {
            if (!this.presup && !this.sup) {
              this.presup = "\\Space{0pt}{0pt}{.2em}";
            }
            this.tex = "\\CEprescripts{" + (this.presub || "\\CEnone") + "}{" + (this.presup || "\\CEnone") + "}" + "{" + (this.tex !== "}" ? this.tex : "") + "}" + "{" + (this.sub || "\\CEnone") + "}{" + (this.sup || "\\CEnone") + "}" + (this.tex === "}" ? "}" : "");
            this.presub = this.presup = "";
          } else {
            if (this.sup)
              this.tex += "^{" + this.sup + "}";
            if (this.sub)
              this.tex += "_{" + this.sub + "}";
          }
          this.sup = this.sub = "";
        }
        this.TEX += this.tex;
        this.tex = "";
        this.atom = false;
      },
      GetBracket: function(c) {
        if (this.string.charAt(this.i) !== "[") {
          return "";
        }
        this.i++;
        var bracket = this.Find("]");
        if (c === "C") {
          bracket = "\\ce{" + bracket + "}";
        } else if (c === "T") {
          if (!bracket.match(/^\{.*\}$/)) {
            bracket = "{" + bracket + "}";
          }
          bracket = "\\text" + bracket;
        }
        ;
        return bracket;
      },
      Match: function(regex) {
        var match = regex.exec(this.string.substr(this.i));
        if (match) {
          match = match[0];
          this.i += match.length;
        }
        return match;
      },
      Find: function(c) {
        var m = this.string.length,
            i = this.i,
            braces = 0;
        while (this.i < m) {
          var C = this.string.charAt(this.i++);
          if (C === c && braces === 0) {
            return this.string.substr(i, this.i - i - 1);
          }
          if (C === "{") {
            braces++;
          } else if (C === "}") {
            if (braces) {
              braces--;
            } else {
              TEX.Error(["ExtraCloseMissingOpen", "Extra close brace or missing open brace"]);
            }
          }
        }
        if (braces) {
          TEX.Error(["MissingCloseBrace", "Missing close brace"]);
        }
        TEX.Error(["NoClosingChar", "Can't find closing %1", c]);
      }
    });
    MathJax.Extension["TeX/mhchem"].CE = CE;
    TEX.Definitions.Add({
      macros: {
        ce: 'CE',
        cf: 'CE',
        cee: 'CE',
        xleftrightarrow: ['Extension', 'AMSmath'],
        xrightleftharpoons: ['Extension', 'AMSmath'],
        xRightleftharpoons: ['Extension', 'AMSmath'],
        xLeftrightharpoons: ['Extension', 'AMSmath'],
        longrightleftharpoons: ["Macro", "\\stackrel{\\textstyle{{-}\\!\\!{\\rightharpoonup}}}{\\smash{{\\leftharpoondown}\\!\\!{-}}}"],
        longRightleftharpoons: ["Macro", "\\stackrel{\\textstyle{-}\\!\\!{\\rightharpoonup}}{\\small\\smash\\leftharpoondown}"],
        longLeftrightharpoons: ["Macro", "\\stackrel{\\rightharpoonup}{{{\\leftharpoondown}\\!\\!\\textstyle{-}}}"],
        hyphen: ["Macro", "\\text{-}"],
        CEprescripts: "CEprescripts",
        CEnone: "CEnone",
        tripledash: ["Macro", "\\raise3mu{\\tiny\\text{-}\\kern2mu\\text{-}\\kern2mu\\text{-}}"]
      },
      environment: {CEstack: ['Array', null, null, null, 'r', null, "0.001em", 'T', 1]}
    }, null, true);
    if (!MathJax.Extension["TeX/AMSmath"]) {
      TEX.Definitions.Add({macros: {
          xrightarrow: ['Extension', 'AMSmath'],
          xleftarrow: ['Extension', 'AMSmath']
        }}, null, true);
    }
    MathJax.Hub.Register.StartupHook("TeX AMSmath Ready", function() {
      TEX.Definitions.Add({macros: {
          xleftrightarrow: ['xArrow', 0x2194, 6, 6],
          xrightleftharpoons: ['xArrow', 0x21CC, 5, 7],
          xRightleftharpoons: ['xArrow', 0x21CC, 5, 7],
          xLeftrightharpoons: ['xArrow', 0x21CC, 5, 7]
        }}, null, true);
    });
    TEX.Parse.Augment({
      CE: function(name) {
        var arg = this.GetArgument(name);
        var tex = CE(arg).Parse();
        this.string = tex + this.string.substr(this.i);
        this.i = 0;
      },
      CEprescripts: function(name) {
        var presub = this.ParseArg(name),
            presup = this.ParseArg(name),
            base = this.ParseArg(name),
            sub = this.ParseArg(name),
            sup = this.ParseArg(name);
        var MML = MathJax.ElementJax.mml;
        this.Push(MML.mmultiscripts(base, sub, sup, MML.mprescripts(), presub, presup));
      },
      CEnone: function(name) {
        this.Push(MathJax.ElementJax.mml.none());
      }
    });
    MathJax.Hub.Startup.signal.Post("TeX mhchem Ready");
  });
  MathJax.Ajax.loadComplete("[MathJax]/extensions/TeX/mhchem.js");
})(require('process'));
