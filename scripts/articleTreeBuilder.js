/**
 * Created by GregRos on 02/04/2016.
 */
///<reference path="jquery.d.ts"/>
///<reference path="C:/Users/lifeg_000/.WebStorm2016.1/config/javascript/extLibs/http_github.com_DefinitelyTyped_DefinitelyTyped_raw_master_yamljs_yamljs.d.ts"/>
var ArticleTreeEntry = (function () {
    function ArticleTreeEntry() {
    }
    return ArticleTreeEntry;
}());
function makeList(arr) {
    if (arr && arr.length) {
        return $("<ul/>").append(arr.map(function (jQuery) { return $("<li/>").append(jQuery); }));
    }
    else {
        return $();
    }
}
function createListElement(nesting, entry) {
    var actualText = entry.link ? $("<a/>").attr("href", entry.link) : $("<span/>");
    actualText.text(entry.text);
    var heading = $("<div/>")
        .addClass("imms-nav-item-heading")
        .addClass("imms-nav-item-heading-depth-" + nesting)
        .append(actualText);
    var container = $("<li />")
        .addClass("imms-nav-item-container-depth-" + nesting)
        .addClass("imms-nav-item-container")
        .append(heading);
    if (entry.children && entry.children.length) {
        $("<ul/>").append(entry.children.map(function (child) { return createListElement(nesting + 1, child); })).appendTo(container);
        container.addClass("imms-nav-item-w-children");
    }
    return container;
}
function makeNavTree(element) {
    var req = $.get("/data/contentIndex.yml", function (yamlText) {
        var data = YAML.parse(yamlText).root;
        var listElem = $("<ul/>").append(data.map(function (x) { return createListElement(0, x); }));
        element.append(listElem);
    });
}
//# sourceMappingURL=articleTreeBuilder.js.map