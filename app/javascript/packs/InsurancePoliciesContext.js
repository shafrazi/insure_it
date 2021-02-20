import React from "react";
import { useState, useEffect } from "react";

const InsurancePoliciesContext = React.createContext(null);

function InsurancePoliciesContextProvider(props) {
  const [insurancePolicies, setInsurancePolicies] = useState([]);
  const [open, setOpen] = useState(false);
  const [modalInsurancePolicy, setModalInsurancePolicy] = useState(null);
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

  const handleClickOpen = (insurancePolicy) => {
    setModalInsurancePolicy(insurancePolicy);
    setOpen(true);
  };

  const handleClose = () => {
    setModalInsurancePolicy(null);
    setOpen(false);
  };

  const handleChange = (event) => {
    setModalInsurancePolicy((prevInsurancePolicy) => {
      return {
        ...prevInsurancePolicy,
        attributes: {
          ...prevInsurancePolicy.attributes,
          [event.target.name]: event.target.value,
        },
      };
    });
  };

  return (
    <InsurancePoliciesContext.Provider
      value={{
        insurancePolicies: insurancePolicies,
        isDataLoaded: isDataLoaded,
        handleChange: handleChange,
        handleClickOpen: handleClickOpen,
        handleClose: handleClose,
        open: open,
        modalInsurancePolicy: modalInsurancePolicy,
      }}
    >
      {props.children}
    </InsurancePoliciesContext.Provider>
  );
}

export { InsurancePoliciesContext, InsurancePoliciesContextProvider };
