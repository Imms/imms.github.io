"use strict";
/**
 * Created by GregRos on 28/05/2016.
 */
require('jquery');
require('yamljs');
const articleTreeBuilder_1 = require('./articleTreeBuilder');
require('./apiLinker');
require('./embedChart');
articleTreeBuilder_1.Articles.makeNavTree($(".js-central-nav-column"));
//# sourceMappingURL=main.js.map