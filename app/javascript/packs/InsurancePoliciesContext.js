import React from "react";
import { useState, useEffect } from "react";

const InsurancePoliciesContext = React.createContext(null);

function InsurancePoliciesContextProvider(props) {
  const [insurancePolicies, setInsurancePolicies] = useState([]);
  const [isDataLoaded, setIsDataLoaded] = useState(false);

  useEffect(() => {
    fetch("/api/insurance_policies")
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        setInsurancePolicies(response.data);
        setIsDataLoaded(true);
      });
  }, []);

  return (
    <InsurancePoliciesContext.Provider
      value={{
        insurancePolicies: insurancePolicies,
        isDataLoaded: isDataLoaded,
      }}
    >
      {props.children}
    </InsurancePoliciesContext.Provider>
  );
}

export { InsurancePoliciesContext, InsurancePoliciesContextProvider };
