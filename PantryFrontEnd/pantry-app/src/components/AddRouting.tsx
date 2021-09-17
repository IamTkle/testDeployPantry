import React from "react";
import { RouteComponentProps, StaticContext } from "react-router";
import { pageToIndex } from "./routingTable";

interface HigherOrderProps {
  routeprops: RouteComponentProps<{}, StaticContext, unknown>;
  setNavTab: React.Dispatch<React.SetStateAction<number>>;
  otherProps?: any[];
}

const AddRouting: (component: React.FC<any>) => React.FC<HigherOrderProps> = (
  component
) => {
  const Component = component;

  const HigherOrder: React.FC<HigherOrderProps> = ({
    routeprops,
    setNavTab,
    otherProps,
  }) => {
    React.useEffect(() => {
      const {
        match: { url: page },
      } = routeprops;

      setNavTab(() => pageToIndex(page));
    }, [routeprops, setNavTab]);

    return <Component {...otherProps}></Component>;
  };

  return HigherOrder;
};

export default AddRouting;
