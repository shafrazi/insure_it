import { TextField, makeStyles, Button } from "@material-ui/core";
import React, { useContext } from "react";
import { InsurancePoliciesContext } from "../InsurancePoliciesContext";

const useStyles = makeStyles((theme) => {
  return {
    root: {
      "& .MuiTextField-root": {
        margin: theme.spacing(1),
      },
    },
  };
});

function InsurancePolicyForm(props) {
  const { insurancePolicy, isReadOnly } = props;
  const { handleChange, handleSubmit } = useContext(InsurancePoliciesContext);
  const classes = useStyles();

  return (
    <form className={classes.root}>
      <h3>Insurance policy details</h3>
      <div>
        <TextField
          name="customer_name"
          label="Policyholder"
          defaultValue={insurancePolicy.attributes.customer_name}
          InputProps={{
            readOnly: true,
          }}
          variant="outlined"
        />
        <TextField
          name="policy_no"
          label="Policy No."
          defaultValue={insurancePolicy.attributes.policy_no}
          InputProps={{
            readOnly: isReadOnly,
          }}
          variant="outlined"
          onChange={handleChange}
        />
        <TextField
          name="insurer"
          label="Insurer"
          defaultValue={insurancePolicy.attributes.insurer}
          InputProps={{
            readOnly: isReadOnly,
          }}
          variant="outlined"
          onChange={handleChange}
        />
      </div>
      <div>
        <TextField
          name="policy_value"
          label="Policy value"
          defaultValue={insurancePolicy.attributes.value}
          InputProps={{
            readOnly: isReadOnly,
          }}
          variant="outlined"
          onChange={handleChange}
        />
        <TextField
          name="insurance_type"
          label="Insurance type"
          defaultValue={insurancePolicy.attributes.insurance_type}
          InputProps={{
            readOnly: isReadOnly,
          }}
          variant="outlined"
          onChange={handleChange}
        />
      </div>
      <div>
        <TextField
          name="current_expiry"
          label="Current expiry"
          defaultValue={insurancePolicy.attributes.current_expiry}
          InputProps={{
            readOnly: isReadOnly,
          }}
          variant="outlined"
          onChange={handleChange}
        />
      </div>
      {!isReadOnly && (
        <div>
          <Button
            variant="contained"
            color="primary"
            size="small"
            onClick={handleSubmit}
          >
            Submit
          </Button>
        </div>
      )}
    </form>
  );
}

export default InsurancePolicyForm;
