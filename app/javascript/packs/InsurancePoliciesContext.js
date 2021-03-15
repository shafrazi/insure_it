import React from "react";
import { useState, useEffect } from "react";

const InsurancePoliciesContext = React.createContext(null);

function InsurancePoliciesContextProvider(props) {
  const [insurancePolicies, setInsurancePolicies] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [queryResults, setQueryResults] = useState([]);
  const [renewal, setRenewal] = useState(null);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openRenewalModal, setOpenRenewalModal] = useState(false);
  const [modalInsurancePolicy, setModalInsurancePolicy] = useState(null);
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [isChanged, setIsChanged] = useState(false);

  useEffect(() => {
    fetch("/api/insurance_policies")
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        setInsurancePolicies(response.data);
        setQueryResults(response.data);
        setIsDataLoaded(true);
      });
  }, []);

  useEffect(() => {
    setInsurancePolicies((prevInsurancePolicies) => {
      const updatedPolicies = prevInsurancePolicies.filter((policy) => {
        return policy.id !== modalInsurancePolicy.id;
      });

      return [modalInsurancePolicy, ...updatedPolicies];
    });

    setQueryResults((prevQueryResults) => {
      const updatedPolicies = prevQueryResults.filter((policy) => {
        return policy.id !== modalInsurancePolicy.id;
      });

      return [modalInsurancePolicy, ...updatedPolicies];
    });

    setIsChanged(false);
  }, [isChanged]);

  const handleChangeSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const search = (query, array) => {
    const newArray = array.filter((policy) => {
      return (
        policy.attributes.customer_name.toLowerCase().match(query) ||
        policy.attributes.insurer.toLowerCase().match(query) ||
        policy.attributes.policy_no.match(query)
      );
    });
    return newArray;
  };

  const handleClickSearch = () => {
    const result = search(searchQuery, insurancePolicies);
    setQueryResults(result);
  };

  const handleClickRefresh = () => {
    setQueryResults(insurancePolicies);
    setSearchQuery("");
  };

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

        setIsChanged(true);
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
        setRenewal(response);
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

        setIsChanged(true);
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
        queryResults: queryResults,
        handleChangeSearch: handleChangeSearch,
        handleClickSearch: handleClickSearch,
        searchQuery: searchQuery,
        handleClickRefresh: handleClickRefresh,
      }}
    >
      {props.children}
    </InsurancePoliciesContext.Provider>
  );
}

export { InsurancePoliciesContext, InsurancePoliciesContextProvider };
