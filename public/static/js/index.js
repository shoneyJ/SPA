
import Dashboard from "./views/Dashboard.js";
import Settings from "./views/Settings.js";
const pathToRegex = path => new RegExp("^" + path.replace(/\//g, "\\/").replace(/:\w+/g, "(.+)") + "$");

const navigateTo = url => {
    history.pushState(null, null, url);
    router();
};
const router = async () => {
    const routes = [
        { path: "/", view:Dashboard },

        { path: "/settings" ,view:Settings  }
    ];
    const potentialMatches = routes.map(route => {
        return {
            route,
            result: location.pathname.match(pathToRegex(route.path))
        };
    });
    let match = potentialMatches.find(potentialMatch => potentialMatch.result !== null);

/* Route not found - return first route OR a specific "not-found" route */
if (!match) {
    match = {
        route: routes[0],
        result: [location.pathname]
    };
}
const getParams = match => {
    const values = match.result.slice(1);
    const keys = Array.from(match.route.path.matchAll(/:(\w+)/g)).map(result => result[1]);

    return Object.fromEntries(keys.map((key, i) => {
        return [key, values[i]];
    }));
};
 const view = new match.route.view(getParams(match));

console.log(potentialMatches);
}



window.addEventListener("popstate", router);
document.addEventListener("DOMContentLoaded", () => {
    document.body.addEventListener("click", e => {
        if (e.target.matches("[data-link]")) {
            e.preventDefault();
            navigateTo(e.target.href);
        }
    });

    /* Document has loaded -  run the router! */
    router();

});

