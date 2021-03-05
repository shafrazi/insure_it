import React from "react";
import { useState, useEffect } from "react";

const InsurancePoliciesContext = React.createContext(null);

function InsurancePoliciesContextProvider(props) {
  const [insurancePolicies, setInsurancePolicies] = useState([]);
  const [renewal, setRenewal] = useState(null);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openRenewalModal, setOpenRenewalModal] = useState(false);
  const [modalInsurancePolicy, setModalInsurancePolicy] = useState(null);
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [testAttribute, setTestAttribute] = useState(null);

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

  const handleClickOpenEditModal = (insurancePolicy) => {
    setModalInsurancePolicy(insurancePolicy);
    setOpenEditModal(true);
  };

  const handleCloseEditModal = () => {
    setModalInsurancePolicy(null);
    setOpenEditModal(false);
  };

  const handleClickOpenRenewalModal = (insurancePolicy) => {
    setModalInsurancePolicy(insurancePolicy);
    setOpenRenewalModal(true);
    setRenewal({
      insurance_policy_id: insurancePolicy.id,
      policy_no: insurancePolicy.attributes.policy_no,
      insurer: insurancePolicy.attributes.insurer,
      start_date: insurancePolicy.attributes.current_expiry,
      expiry_date: "",
    });
  };

  const handleCloseRenewalModal = () => {
    setModalInsurancePolicy(null);
    setOpenRenewalModal(false);
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

  const handleChangeRenewalForm = (event) => {
    setRenewal((prevRenewal) => {
      return {
        ...prevRenewal,
        [event.target.name]: event.target.value,
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
        setModalInsurancePolicy(response.data);

        const updatedPolicies = insurancePolicies.filter((policy) => {
          return policy.id !== modalInsurancePolicy.id;
        });

        setInsurancePolicies((prevInsurancePolicies) => {
          return [modalInsurancePolicy, ...updatedPolicies];
        });
      });
  };

  const handleSubmitRenewal = (event) => {
    const csrfToken = document.getElementsByName("csrf-token")[0].content;
    event.preventDefault();

    fetch("/api/renewals", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        "X-csrf-token": csrfToken,
      },
      body: JSON.stringify(renewal),
      credentials: "same-origin",
    })
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        setModalInsurancePolicy((prevModalInsurancePolicy) => {
          return {
            ...prevModalInsurancePolicy,
            attributes: {
              ...prevModalInsurancePolicy.attributes,
              insurer: renewal.insurer,
              policy_no: renewal.policy_no,
              current_expiry: renewal.expiry_date,
            },
          };
        });

        const updatedPolicies = insurancePolicies.filter((policy) => {
          return policy.id !== modalInsurancePolicy.id;
        });

        setInsurancePolicies([...updatedPolicies, modalInsurancePolicy]);
      });
  };

  return (
    <InsurancePoliciesContext.Provider
      value={{
        insurancePolicies: insurancePolicies,
        isDataLoaded: isDataLoaded,
        handleChange: handleChange,
        handleClickOpenEditModal: handleClickOpenEditModal,
        handleCloseEditModal: handleCloseEditModal,
        openEditModal: openEditModal,
        modalInsurancePolicy: modalInsurancePolicy,
        handleSubmit: handleSubmit,
        openRenewalModal: openRenewalModal,
        handleClickOpenRenewalModal: handleClickOpenRenewalModal,
        handleCloseRenewalModal: handleCloseRenewalModal,
        handleChangeRenewalForm: handleChangeRenewalForm,
        handleSubmitRenewal: handleSubmitRenewal,
      }}
    >
      {props.children}
    </InsurancePoliciesContext.Provider>
  );
}

export { InsurancePoliciesContext, InsurancePoliciesContextProvider };
