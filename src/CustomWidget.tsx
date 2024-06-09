import React, { createContext, useContext, useState, ReactNode } from 'react';

interface WidgetMap {
  [key: string]: React.ComponentType<any>;
}

const CustomWidgetContext = createContext<{
  widgets: WidgetMap;
  registerWidget: (type: string, component: React.ComponentType<any>) => void;
}>({
  widgets: {},
  registerWidget: () => null,
});

interface CustomWidgetProviderProps {
  children: ReactNode;
}

export const CustomWidgetProvider: React.FC<CustomWidgetProviderProps> = ({ children }) => {
  const [widgets, setWidgets] = useState<WidgetMap>({});

  const registerWidget = (type: string, component: React.ComponentType<any>) => {
    setWidgets((prevWidgets) => ({ ...prevWidgets, [type]: component }));
  };

  return (
    <CustomWidgetContext.Provider value={{ widgets, registerWidget }}>
      {children}
    </CustomWidgetContext.Provider>
  );
};

export const useCustomWidget = () => useContext(CustomWidgetContext);
