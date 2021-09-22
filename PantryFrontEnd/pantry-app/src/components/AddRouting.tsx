import React from "react";
import { RouteComponentProps, StaticContext } from "react-router";
import { pageToIndex } from "./routingTable";

interface HigherOrderProps {
  routeprops: RouteComponentProps<{}, StaticContext, unknown>;
  setNavTab: React.Dispatch<React.SetStateAction<number>>;
  setNavOpen?: () => void;
  otherProps?: any[];
}

const AddRouting: (component: React.FC<any>) => React.FC<HigherOrderProps> = (
  component
) => {
  const Component = component;

  const HigherOrder: React.FC<HigherOrderProps> = ({
    routeprops,
    setNavTab,
    setNavOpen,
    otherProps,
  }) => {
    React.useEffect(() => {
      const {
        match: { url: page },
      } = routeprops;

      setNavTab(() => pageToIndex(page));
    }, []);

    return <Component setNavOpen={setNavOpen} {...otherProps}></Component>;
  };

  return HigherOrder;
};

export default AddRouting;
