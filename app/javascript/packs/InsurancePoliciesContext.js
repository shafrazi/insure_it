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

  const handleSubmit = (event) => {
    const csrfToken = document.getElementsByName("csrf-token")[0].content;
    event.preventDefault();

    fetch(`/api/insurance_policies/${modalInsurancePolicy.id}`, {
      method: "PATCH",
      headers: {
        "Content-type": "application/json",
        "X-csrf-token": csrfToken,
      },
      body: JSON.stringify(modalInsurancePolicy.attributes),
      credentials: "same-origin",
    })
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        const updatedPolicies = insurancePolicies.filter((policy) => {
          return policy.id !== modalInsurancePolicy.id;
        });

        setInsurancePolicies((prevInsurancePolicies) => {
          return [...updatedPolicies, modalInsurancePolicy];
        });
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
        handleSubmit: handleSubmit,
      }}
    >
      {props.children}
    </InsurancePoliciesContext.Provider>
  );
}

export { InsurancePoliciesContext, InsurancePoliciesContextProvider };
