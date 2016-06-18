/**
 * Created by GregRos on 26/03/2016.
 */
var apiRefClass = "imms-api-ref";
var data = "";
function resolveUrl(url) {
    return "/API/html/" + url + ".htm";
}
function getAnchors() {
    return $("a").filter((i, x) => {
        let href = x.getAttribute("href");
        return href && href.match(/^\w:/);
    });
}
var indexRequest = $.getJSON("/API/index.json", data => {
    getAnchors().each((i, e) => {
        var oldHref = e.getAttribute("href");
        e.classList.add(apiRefClass);
        if (data.hasOwnProperty(oldHref)) {
            e.setAttribute("href", resolveUrl(data[oldHref]));
        }
        else {
            //e.setAttribute("href", "javascript:void(0);");
            e.addEventListener("click", () => {
                alert("Could not find {" + oldHref + "} in index");
            });
        }
    });
}).fail(() => {
    getAnchors().each((i, e) => {
        e.addEventListener("click", () => {
            alert("Could not load index!");
        });
        e.classList.add(apiRefClass);
    });
});
//# sourceMappingURL=apiLinker.js.map