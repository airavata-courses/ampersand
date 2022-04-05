import React, {useContext, useState} from 'react';

export const TabsContext = React.createContext();

export const withTabs = (Component) => ({ children, ...props }) => {
    const [currentTab, setCurrentTab] = useState();

    return (
        <TabsContext.Provider value={{currentTab, setCurrentTab}}>
            <Component {...props}>
                {children}
            </Component>
        </TabsContext.Provider>
    );
};

export const useTabs = () => {
    const {currentTab, setCurrentTab} = useContext(TabsContext);

    if(!TabsContext) {
        throw new Error('useTabs should be used inside TabsProvider')
    }

    return {
        currentTab, setCurrentTab
    }
}