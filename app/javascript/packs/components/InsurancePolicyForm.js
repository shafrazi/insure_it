import { TextField, makeStyles } from "@material-ui/core";
import React from "react";

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
  const { insurancePolicy } = props;
  const classes = useStyles();

  return (
    <form className={classes.root}>
      <h3>Insurance policy details</h3>
      <div>
        <TextField
          label="Policyholder"
          defaultValue={insurancePolicy.attributes.customer_name}
          InputProps={{
            readOnly: true,
          }}
          variant="outlined"
        />
        <TextField
          label="Policy No."
          defaultValue={insurancePolicy.attributes.policy_no}
          InputProps={{
            readOnly: true,
          }}
          variant="outlined"
        />
        <TextField
          label="Insurer"
          defaultValue={insurancePolicy.attributes.insurer}
          InputProps={{
            readOnly: true,
          }}
          variant="outlined"
        />
      </div>
      <div>
        <TextField
          label="Policy value"
          defaultValue={insurancePolicy.attributes.value}
          InputProps={{
            readOnly: true,
          }}
          variant="outlined"
        />
        <TextField
          label="Insurance type"
          defaultValue={insurancePolicy.attributes.insurance_type}
          InputProps={{
            readOnly: true,
          }}
          variant="outlined"
        />
      </div>
      <div>
        <TextField
          label="Current expiry"
          defaultValue={insurancePolicy.attributes.current_expiry}
          InputProps={{
            readOnly: true,
          }}
          variant="outlined"
        />
      </div>
    </form>
  );
}

export default InsurancePolicyForm;
