import React, { useContext } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import InsurancePolicyForm from "./InsurancePolicyForm";
import { InsurancePoliciesContext } from "../InsurancePoliciesContext";

export default function EditInsurancePolicy(props) {
  const { open, handleClose, modalInsurancePolicy } = useContext(
    InsurancePoliciesContext
  );
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">Edit insurance policy</DialogTitle>
      <DialogContent>
        <InsurancePolicyForm
          insurancePolicy={modalInsurancePolicy}
          isReadOnly={false}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleClose} color="primary">
          Subscribe
        </Button>
      </DialogActions>
    </Dialog>
  );
}
