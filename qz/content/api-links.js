const shortNamesIndex = await fetch("/api-docs/index.json").then(r => r.json());
let savedTheme = document.documentElement.getAttribute("saved-theme");
setInterval(async () => {
    if (window.location.href.includes("/api-docs/html/")) {
        document.documentElement.setAttribute("saved-theme", "")
    } else {
        document.documentElement.setAttribute("saved-theme", savedTheme)
    }
    function capitalizeFirstLetter(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    function fixBrokenLink(linkText) {
        const link = capitalizeFirstLetter(decodeURIComponent(linkText));
        return link.replaceAll("’", "'");
    }

    for (const a of document.querySelectorAll("a[href^='M:'], a[href^='T:']")) {
        const fixed = fixBrokenLink(a.href);
        const longName = shortNamesIndex[fixed];
        a.href = `/api-docs/html/${longName}.htm` || a.href;
    }

}, 1000);
