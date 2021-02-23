import React, { useContext } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import InsurancePolicyForm from "./InsurancePolicyForm";
import { InsurancePoliciesContext } from "../InsurancePoliciesContext";

export default function EditInsurancePolicy(props) {
  const {
    openEditModal,
    handleCloseEditModal,
    modalInsurancePolicy,
  } = useContext(InsurancePoliciesContext);
  return (
    <Dialog
      open={openEditModal}
      onClose={handleCloseEditModal}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">Edit insurance policy</DialogTitle>
      <DialogContent>
        <InsurancePolicyForm
          insurancePolicy={modalInsurancePolicy}
          isReadOnly={false}
        />
      </DialogContent>
    </Dialog>
  );
}
