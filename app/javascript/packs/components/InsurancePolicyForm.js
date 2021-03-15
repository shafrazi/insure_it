import {
  TextField,
  makeStyles,
  Button,
  DialogActions,
} from "@material-ui/core";
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
  const { handleChange, handleSubmit, convertToDecimal } = useContext(
    InsurancePoliciesContext
  );
  const classes = useStyles();

  return (
    <form className={classes.root}>
      <h3>Insurance policy details</h3>
      <div>
        <TextField
          name="customer_name"
          label="Policyholder"
          value={insurancePolicy.attributes.customer_name}
          InputProps={{
            readOnly: true,
          }}
          variant="outlined"
        />
        <TextField
          name="policy_no"
          label="Policy No."
          value={insurancePolicy.attributes.policy_no}
          InputProps={{
            readOnly: isReadOnly,
          }}
          variant="outlined"
          onChange={handleChange}
        />
        <TextField
          name="insurer"
          label="Insurer"
          value={insurancePolicy.attributes.insurer}
          InputProps={{
            readOnly: isReadOnly,
          }}
          variant="outlined"
          onChange={handleChange}
        />
      </div>
      <div>
        <TextField
          name="value"
          label="Policy value"
          defaultValue={convertToDecimal(insurancePolicy.attributes.value)}
          InputProps={{
            readOnly: isReadOnly,
          }}
          variant="outlined"
          onChange={handleChange}
        />
        <TextField
          name="insurance_type"
          label="Insurance type"
          value={insurancePolicy.attributes.insurance_type}
          InputProps={{
            readOnly: isReadOnly,
          }}
          variant="outlined"
          onChange={handleChange}
        />
      </div>
      <div>
        <TextField
          name="asset"
          label="Asset"
          value={insurancePolicy.attributes.asset || ""}
          InputProps={{
            readOnly: isReadOnly,
          }}
          variant="outlined"
          onChange={handleChange}
        />
        <TextField
          name="current_expiry"
          label="Current expiry"
          value={insurancePolicy.attributes.current_expiry}
          InputProps={{
            readOnly: isReadOnly,
          }}
          variant="outlined"
          onChange={handleChange}
        />
      </div>
      {!isReadOnly && (
        <DialogActions>
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={handleSubmit}
          >
            Submit
          </Button>
        </DialogActions>
      )}
    </form>
  );
}

export default InsurancePolicyForm;
