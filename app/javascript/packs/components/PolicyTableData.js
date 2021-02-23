import React from "react";
import { TableRow, TableCell, Button } from "@material-ui/core";
import { Link } from "react-router-dom";

function PolicyTableData(props) {
  const {
    policy,
    handleClickOpenEditModal,
    handleClickOpenRenewalModal,
  } = props;
  return (
    <TableRow>
      <TableCell>{policy.attributes.customer_name}</TableCell>
      <TableCell>
        <Link to={`/insurance_policies/${policy.id}`}>
          {policy.attributes.policy_no}
        </Link>
      </TableCell>
      <TableCell>{policy.attributes.insurer}</TableCell>
      <TableCell>{policy.attributes.value}</TableCell>
      <TableCell>{policy.attributes.insurance_type}</TableCell>
      <TableCell>{policy.attributes.current_expiry}</TableCell>
      <TableCell>{policy.attributes.asset}</TableCell>
      <TableCell>
        <Button
          variant="contained"
          color="primary"
          size="small"
          onClick={() => {
            handleClickOpenEditModal(policy);
          }}
        >
          Edit
        </Button>
      </TableCell>
      <TableCell>
        <Button
          variant="outlined"
          color="primary"
          size="small"
          onClick={() => {
            handleClickOpenRenewalModal(policy);
          }}
        >
          Renew
        </Button>
      </TableCell>
    </TableRow>
  );
}

export default PolicyTableData;
