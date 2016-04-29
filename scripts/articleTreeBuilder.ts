/**
 * Created by GregRos on 02/04/2016.
 */
///<reference path="jquery.d.ts"/>
///<reference path="C:/Users/lifeg_000/.WebStorm2016.1/config/javascript/extLibs/http_github.com_DefinitelyTyped_DefinitelyTyped_raw_master_yamljs_yamljs.d.ts"/>

class ArticleTreeEntry {
    text : string;
    link : string;
    children : Array<ArticleTreeEntry>
}

function makeList<T>(arr : Array<JQuery>) {
    if(arr && arr.length) {
        return $("<ul/>").append(arr.map(jQuery => $("<li/>").append(jQuery)));
    } else {
        return $();
    }
}

function createListElement(nesting : number,entry : ArticleTreeEntry) : JQuery {

    var actualText = entry.link ? $("<a/>").attr("href", entry.link) : $("<span/>");
    actualText.text(entry.text);
    var heading =
        $("<div/>")
            .addClass("imms-nav-item-heading")
            .addClass(`imms-nav-item-heading-depth-${nesting}`)
            .append(actualText);
    var container = $("<li />")
        .addClass(`imms-nav-item-container-depth-${nesting}`)
        .addClass("imms-nav-item-container")
        .append(heading);
    
    
    
    if (entry.children && entry.children.length) {
        $("<ul/>").append(entry.children.map(child => createListElement(nesting + 1, child))).appendTo(container);
        container.addClass("imms-nav-item-w-children");
    }
    return container;
}

function makeNavTree(element : JQuery) {

    let req = $.get("/data/contentIndex.yml", yamlText => {
        let data = YAML.parse(yamlText).root;
        let listElem = $("<ul/>").append(data.map(x => createListElement(0, x)));
        element.append(listElem);
    });
}


