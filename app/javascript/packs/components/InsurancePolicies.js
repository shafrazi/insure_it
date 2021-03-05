import React from "react";
import { useState, useEffect, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Title from "./Title";
import { Paper, TableContainer } from "@material-ui/core";
import EditInsurancePolicy from "./EditInsurancePolicy";
import RenewalFormModal from "./RenewalFormModal";
import PolicyTableData from "./PolicyTableData";
import { InsurancePoliciesContext } from "../InsurancePoliciesContext";

const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
}));

export default function InsurancePolicies(props) {
  const classes = useStyles();
  const {
    insurancePolicies,
    isDataLoaded,
    modalInsurancePolicy,
    handleClickOpenEditModal,
    handleClickOpenRenewalModal,
  } = useContext(InsurancePoliciesContext);

  const filterType = props.filterType;
  const today = new Date();

  console.log(modalInsurancePolicy);

  return (
    <React.Fragment>
      <Title>
        {filterType === "all" ? "All insurance policies" : "Expired policies"}
      </Title>
      {isDataLoaded ? (
        <TableContainer component={Paper}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Customer name</TableCell>
                <TableCell>Policy No</TableCell>
                <TableCell>Insurer</TableCell>
                <TableCell>Policy value</TableCell>
                <TableCell>Type</TableCell>
                <TableCell>Current expiry</TableCell>
                <TableCell>Asset</TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {insurancePolicies.map((policy) => {
                if (filterType === "all") {
                  return (
                    <PolicyTableData
                      key={policy.id}
                      policy={policy}
                      handleClickOpenEditModal={handleClickOpenEditModal}
                      handleClickOpenRenewalModal={handleClickOpenRenewalModal}
                    />
                  );
                } else {
                  if (new Date(policy.attributes.current_expiry) < today) {
                    return (
                      <PolicyTableData
                        key={policy.id}
                        policy={policy}
                        handleClickOpenEditModal={handleClickOpenEditModal}
                        handleClickOpenRenewalModal={
                          handleClickOpenRenewalModal
                        }
                      />
                    );
                  }
                }
              })}
            </TableBody>
            {modalInsurancePolicy && <EditInsurancePolicy />}
            {modalInsurancePolicy && <RenewalFormModal />}
          </Table>
        </TableContainer>
      ) : (
        "Loading...."
      )}
    </React.Fragment>
  );
}
