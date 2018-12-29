import queryString from "query-string";
import { get, groupBy, flatten, chain, sumBy } from "lodash";

export const parseRoute = route => {
    const { query } = queryString.parseUrl(route.url);
    return { ...query, url: route.url, data: route.data };
};

export const parseRoutes = routes => routes.map(parseRoute);

export const isRouteValid = route => {
    return Object.keys(route).includes('from', 'to', 'date', 'time')
        && new Date(route.date) >=  (new Date()).setHours(0,0,0,0);
};

export const getValidRoutes = routes => parseRoutes(routes).filter(isRouteValid);

export const getInvalidRoutes = routes => parseRoutes(routes).filter(route => !isRouteValid(route));

export const getRoutesUIData = routes => routes.filter(route => route.data).map(getRouteUIData)

export const getRouteUIData = route => {
    const from = get(route, "data.list[0].from.station");
    const to = get(route, "data.list[0].to.station");
    const trains = route.data.list.length;
    const tickets = chain(route.data.list)
        .map(train => train.types)
        .flatten()
        .groupBy("id")
        .reduce((acc, val, key) => { 
            acc.push({ type: key, places: sumBy(val, "places")});
            return acc;
         }, [])
        .value();

    return { from, to, trains, tickets };
};