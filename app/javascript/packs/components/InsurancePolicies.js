import React from "react";
import { useState, useEffect, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Title from "./Title";
import { Button, Paper, TableContainer, TextField } from "@material-ui/core";
import EditInsurancePolicy from "./EditInsurancePolicy";
import RenewalFormModal from "./RenewalFormModal";
import PolicyTableData from "./PolicyTableData";
import { InsurancePoliciesContext } from "../InsurancePoliciesContext";

const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
    },
    "& > *": {
      margin: theme.spacing(1),
    },
  },
}));

export default function InsurancePolicies(props) {
  const classes = useStyles();

  const {
    queryResults,
    isDataLoaded,
    modalInsurancePolicy,
    handleClickOpenEditModal,
    handleClickOpenRenewalModal,
    handleChangeSearch,
    handleClickSearch,
    searchQuery,
    handleClickRefresh,
  } = useContext(InsurancePoliciesContext);

  const filterType = props.filterType;
  const today = new Date();

  return (
    <React.Fragment>
      <Title>
        {filterType === "all" ? "All insurance policies" : "Expired policies"}
      </Title>

      <div className={classes.root}>
        <TextField
          name="query"
          label="Enter search criteria"
          variant="outlined"
          value={searchQuery}
          onChange={handleChangeSearch}
          size="small"
        />
        <Button variant="contained" color="primary" onClick={handleClickSearch}>
          Search
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={handleClickRefresh}
        >
          Refresh
        </Button>
      </div>

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
              {queryResults.map((policy) => {
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
