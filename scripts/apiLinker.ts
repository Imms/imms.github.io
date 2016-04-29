/**
 * Created by GregRos on 26/03/2016.
 */

/// <reference path="jquery.d.ts" />

var apiRefClass = "imms-api-ref";

var data = "";
function resolveUrl(url : string) {
	return "/API/html/" + url + ".htm";
}

function getAnchors() {
	return $("a").filter((i,x) => x.getAttribute("href").match(/^\w:/));
}


function fixUrls(fixer : (i : number, s : string) => string) {

}
var indexRequest =
	$.getJSON("/API/index.json", data => {
		getAnchors().each((i, e) => {
			var oldHref = e.getAttribute("href");
			e.classList.add(apiRefClass);
			if (data.hasOwnProperty(oldHref)) {
				e.setAttribute("href", resolveUrl(data[oldHref]));
			} else {
				//e.setAttribute("href", "javascript:void(0);");

				e.addEventListener("click", () => {
					alert("Could not find {" + oldHref + "} in index");
				})
			}
		})
	});

indexRequest.fail(() => {
	getAnchors().each((i, e) => {
		e.addEventListener("click", () => {
			alert("Could not load index!")
		})
        e.classList.add(apiRefClass);
	})
});
