import { createSelector } from 'reselect';

import * as routeModels from '../models/routes'

export const getRoutes = state => Object.values(state.routes);

export const getValidRoutes = createSelector(
    getRoutes,
    routeModels.getValidRoutes
);

export const getInvalidRoutes = createSelector(
    getRoutes,
    routeModels.getInvalidRoutes
);

export const getValidRoutesUIData = createSelector(
    getValidRoutes,
    routeModels.getRoutesUIData
);