import React from "react";
import { useContext } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { InsurancePoliciesContext } from "../InsurancePoliciesContext";
import { TextField, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => {
  return {
    root: {
      "& .MuiTextField-root": {
        margin: theme.spacing(1),
      },
    },
  };
});

function RenewalFormModal() {
  const classes = useStyles();
  const {
    modalInsurancePolicy,
    openRenewalModal,
    handleCloseRenewalModal,
    handleChangeRenewalForm,
    handleSubmitRenewal,
  } = useContext(InsurancePoliciesContext);
  return (
    <Dialog
      open={openRenewalModal}
      onClose={handleCloseRenewalModal}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">Add insurance policy</DialogTitle>
      <DialogContent>
        <h3>{modalInsurancePolicy.attributes.customer_name}</h3>
        <form className={classes.root} onSubmit={handleSubmitRenewal}>
          <div>
            <TextField
              name="policy_no"
              label="Policy No."
              defaultValue={modalInsurancePolicy.attributes.policy_no}
              variant="outlined"
              onChange={handleChangeRenewalForm}
            />
            <TextField
              name="insurer"
              label="Insurer"
              defaultValue={modalInsurancePolicy.attributes.insurer}
              variant="outlined"
              onChange={handleChangeRenewalForm}
            />
          </div>
          <div>
            <TextField
              name="start_date"
              label="Start date"
              defaultValue={modalInsurancePolicy.attributes.current_expiry}
              variant="outlined"
              onChange={handleChangeRenewalForm}
            />
            <TextField
              name="expiry_date"
              label="Expiry date"
              variant="outlined"
              onChange={handleChangeRenewalForm}
            />
          </div>
          <DialogActions>
            <Button
              variant="contained"
              color="primary"
              size="large"
              type="submit"
            >
              Submit
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default RenewalFormModal;
