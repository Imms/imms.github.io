"use strict";
/**
 * Created by GregRos on 30/07/2016.
 */
var data_1 = require('./data');
var Links;
(function (Links) {
    Links.home = "/";
    Links.getImms = "/content/GetImms.html";
    Links.whyImmutable = "/content/WhyImmutable";
    Links.whyImms = "/content/WhyImms";
    Links.general = "/content/General";
    function article(name) {
        return "content/" + name;
    }
    Links.article = article;
    function api(relative) {
        return "API/" + relative;
    }
    Links.api = api;
    var External;
    (function (External) {
        External.sources = "https://github.com/Imms/Imms";
        External.nuget = "https://www.nuget.org/packages/Imms/";
        External.siteSources = "https://github.com/Imms/imms.github.io";
        External.sass = "http://sass-lang.com/";
        External.bootstrap = "http://getbootstrap.com/";
        External.typescript = "https://www.typescriptlang.org/";
        External.webstorm = "https://www.jetbrains.com/webstorm/specials/webstorm/webstorm.html";
        External.gregrosProfile = "https://github.com/GregRos";
        External.react = "https://facebook.github.io/react/";
        External.binaries = "https://github.com/Imms/Imms/releases/tag/v" + data_1.Data.version;
    })(External = Links.External || (Links.External = {}));
})(Links = exports.Links || (exports.Links = {}));
//# sourceMappingURL=links.js.map