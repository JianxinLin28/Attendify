var navigatorTabIndex: number = 0;

export const resetNavigatorTabIndex = () => {
    navigatorTabIndex = 0;
}

export const setNavigatorTabIndex = (newIndex: number) => {
    navigatorTabIndex = newIndex;
}

export const getNavigatorTabIndex = () => navigatorTabIndex;
