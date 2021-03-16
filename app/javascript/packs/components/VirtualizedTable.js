import React, { useContext } from "react";
import { Column, Table } from "react-virtualized";
import { InsurancePoliciesContext } from "../InsurancePoliciesContext";
import "react-virtualized/styles.css";
import { Button } from "@material-ui/core";

function VirtualizedTable() {
  const { insurancePolicies } = useContext(InsurancePoliciesContext);
  const data = insurancePolicies.map((policy) => {
    return {
      policyId: policy.id,
      customerName: policy.attributes.customer_name,
      policyNo: policy.attributes.policy_no,
    };
  });
  const rowGetter = ({ index }) => {
    return data[index];
  };

  return (
    <Table
      width={2000}
      height={1000}
      headerHeight={20}
      rowHeight={30}
      rowCount={data.length}
      rowGetter={rowGetter}
    >
      <Column label="Name" dataKey="customerName" width={500} />
      <Column width={500} label="Description" dataKey="policyNo" />
    </Table>
  );
}

export default VirtualizedTable;
