/* */ 
(function(process) {
  MathJax.Extension["TeX/newcommand"] = {version: "2.6.0"};
  MathJax.Hub.Register.StartupHook("TeX Jax Ready", function() {
    var TEX = MathJax.InputJax.TeX;
    var TEXDEF = TEX.Definitions;
    TEXDEF.Add({macros: {
        newcommand: 'NewCommand',
        renewcommand: 'NewCommand',
        newenvironment: 'NewEnvironment',
        renewenvironment: 'NewEnvironment',
        def: 'MacroDef',
        let: 'Let'
      }}, null, true);
    TEX.Parse.Augment({
      NewCommand: function(name) {
        var cs = this.trimSpaces(this.GetArgument(name)),
            n = this.GetBrackets(name),
            opt = this.GetBrackets(name),
            def = this.GetArgument(name);
        if (cs.charAt(0) === "\\") {
          cs = cs.substr(1);
        }
        if (!cs.match(/^(.|[a-z]+)$/i)) {
          TEX.Error(["IllegalControlSequenceName", "Illegal control sequence name for %1", name]);
        }
        if (n) {
          n = this.trimSpaces(n);
          if (!n.match(/^[0-9]+$/)) {
            TEX.Error(["IllegalParamNumber", "Illegal number of parameters specified in %1", name]);
          }
        }
        this.setDef(cs, ['Macro', def, n, opt]);
      },
      NewEnvironment: function(name) {
        var env = this.trimSpaces(this.GetArgument(name)),
            n = this.GetBrackets(name),
            opt = this.GetBrackets(name),
            bdef = this.GetArgument(name),
            edef = this.GetArgument(name);
        if (n) {
          n = this.trimSpaces(n);
          if (!n.match(/^[0-9]+$/)) {
            TEX.Error(["IllegalParamNumber", "Illegal number of parameters specified in %1", name]);
          }
        }
        this.setEnv(env, ['BeginEnv', [null, 'EndEnv'], bdef, edef, n, opt]);
      },
      MacroDef: function(name) {
        var cs = this.GetCSname(name),
            params = this.GetTemplate(name, "\\" + cs),
            def = this.GetArgument(name);
        if (!(params instanceof Array)) {
          this.setDef(cs, ['Macro', def, params]);
        } else {
          this.setDef(cs, ['MacroWithTemplate', def].concat(params));
        }
      },
      Let: function(name) {
        var cs = this.GetCSname(name),
            macro;
        var c = this.GetNext();
        if (c === "=") {
          this.i++;
          c = this.GetNext();
        }
        if (c === "\\") {
          name = this.GetCSname(name);
          macro = this.csFindMacro(name);
          if (!macro) {
            if (TEXDEF.mathchar0mi[name]) {
              macro = ["csMathchar0mi", TEXDEF.mathchar0mi[name]];
            } else if (TEXDEF.mathchar0mo[name]) {
              macro = ["csMathchar0mo", TEXDEF.mathchar0mo[name]];
            } else if (TEXDEF.mathchar7[name]) {
              macro = ["csMathchar7", TEXDEF.mathchar7[name]];
            } else if (TEXDEF.delimiter["\\" + name] != null) {
              macro = ["csDelimiter", TEXDEF.delimiter["\\" + name]];
            }
          }
        } else {
          macro = ["Macro", c];
          this.i++;
        }
        this.setDef(cs, macro);
      },
      setDef: function(name, value) {
        value.isUser = true;
        TEXDEF.macros[name] = value;
      },
      setEnv: function(name, value) {
        value.isUser = true;
        TEXDEF.environment[name] = value;
      },
      GetCSname: function(cmd) {
        var c = this.GetNext();
        if (c !== "\\") {
          TEX.Error(["MissingCS", "%1 must be followed by a control sequence", cmd]);
        }
        var cs = this.trimSpaces(this.GetArgument(cmd));
        return cs.substr(1);
      },
      GetTemplate: function(cmd, cs) {
        var c,
            params = [],
            n = 0;
        c = this.GetNext();
        var i = this.i;
        while (this.i < this.string.length) {
          c = this.GetNext();
          if (c === '#') {
            if (i !== this.i) {
              params[n] = this.string.substr(i, this.i - i);
            }
            c = this.string.charAt(++this.i);
            if (!c.match(/^[1-9]$/)) {
              TEX.Error(["CantUseHash2", "Illegal use of # in template for %1", cs]);
            }
            if (parseInt(c) != ++n) {
              TEX.Error(["SequentialParam", "Parameters for %1 must be numbered sequentially", cs]);
            }
            i = this.i + 1;
          } else if (c === '{') {
            if (i !== this.i) {
              params[n] = this.string.substr(i, this.i - i);
            }
            if (params.length > 0) {
              return [n, params];
            } else {
              return n;
            }
          }
          this.i++;
        }
        TEX.Error(["MissingReplacementString", "Missing replacement string for definition of %1", cmd]);
      },
      MacroWithTemplate: function(name, text, n, params) {
        if (n) {
          var args = [];
          this.GetNext();
          if (params[0] && !this.MatchParam(params[0])) {
            TEX.Error(["MismatchUseDef", "Use of %1 doesn't match its definition", name]);
          }
          for (var i = 0; i < n; i++) {
            args.push(this.GetParameter(name, params[i + 1]));
          }
          text = this.SubstituteArgs(args, text);
        }
        this.string = this.AddArgs(text, this.string.slice(this.i));
        this.i = 0;
        if (++this.macroCount > TEX.config.MAXMACROS) {
          TEX.Error(["MaxMacroSub1", "MathJax maximum macro substitution count exceeded; " + "is there a recursive macro call?"]);
        }
      },
      BeginEnv: function(begin, bdef, edef, n, def) {
        if (n) {
          var args = [];
          if (def != null) {
            var optional = this.GetBrackets("\\begin{" + name + "}");
            args.push(optional == null ? def : optional);
          }
          for (var i = args.length; i < n; i++) {
            args.push(this.GetArgument("\\begin{" + name + "}"));
          }
          bdef = this.SubstituteArgs(args, bdef);
          edef = this.SubstituteArgs([], edef);
        }
        this.string = this.AddArgs(bdef, this.string.slice(this.i));
        this.i = 0;
        return begin;
      },
      EndEnv: function(begin, bdef, edef, n) {
        var end = "\\end{\\end\\" + begin.name + "}";
        this.string = this.AddArgs(edef, end + this.string.slice(this.i));
        this.i = 0;
        return null;
      },
      GetParameter: function(name, param) {
        if (param == null) {
          return this.GetArgument(name);
        }
        var i = this.i,
            j = 0,
            hasBraces = 0;
        while (this.i < this.string.length) {
          if (this.string.charAt(this.i) === '{') {
            if (this.i === i) {
              hasBraces = 1;
            }
            this.GetArgument(name);
            j = this.i - i;
          } else if (this.MatchParam(param)) {
            if (hasBraces) {
              i++;
              j -= 2;
            }
            return this.string.substr(i, j);
          } else {
            this.i++;
            j++;
            hasBraces = 0;
          }
        }
        TEX.Error(["RunawayArgument", "Runaway argument for %1?", name]);
      },
      MatchParam: function(param) {
        if (this.string.substr(this.i, param.length) !== param) {
          return 0;
        }
        this.i += param.length;
        return 1;
      }
    });
    TEX.Environment = function(name) {
      TEXDEF.environment[name] = ['BeginEnv', 'EndEnv'].concat([].slice.call(arguments, 1));
      TEXDEF.environment[name].isUser = true;
    };
    MathJax.Hub.Startup.signal.Post("TeX newcommand Ready");
  });
  MathJax.Ajax.loadComplete("[MathJax]/extensions/TeX/newcommand.js");
})(require('process'));
