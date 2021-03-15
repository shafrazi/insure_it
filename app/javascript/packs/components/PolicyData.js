import React, { useContext } from "react";
import { DataGrid, GridRowsProp, GridColDef } from "@material-ui/data-grid";
import { InsurancePoliciesContext } from "../InsurancePoliciesContext";
import { Button } from "@material-ui/core";

function PolicyData() {
  const { insurancePolicies, isDataLoaded } = useContext(
    InsurancePoliciesContext
  );

  const rows = insurancePolicies.map((policy) => {
    if (policy) {
      return {
        id: policy.id,
        customerName: policy.attributes.customer_name,
        policyNo: policy.attributes.policy_no,
        button: <Button>Hello</Button>,
      };
    }
  });

  return (
    <div style={{ height: 400 }}>
      {isDataLoaded && (
        <DataGrid
          columns={[
            { field: "customerName", width: 200 },
            { field: "policyNo", width: 200 },
            { field: "button" },
          ]}
          rows={rows}
        />
      )}
    </div>
  );
}

export default PolicyData;
