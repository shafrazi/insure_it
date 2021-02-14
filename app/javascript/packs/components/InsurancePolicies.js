import React from "react";
import { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Title from "./Title";
import { Paper, TableContainer } from "@material-ui/core";

function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
}));

export default function InsurancePolicies() {
  const classes = useStyles();
  const [insurancePolicies, setInsurancePolicies] = useState([]);
  const [isDataLoaded, setIsDataLoaded] = useState(false);

  useEffect(() => {
    fetch("/api/insurance_policies")
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        setInsurancePolicies(response.data);
        setIsDataLoaded(true);
      });
  }, []);

  return (
    <React.Fragment>
      <Title>All insurance policies</Title>
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
              </TableRow>
            </TableHead>
            <TableBody>
              {insurancePolicies.map((policy) => (
                <TableRow key={policy.id}>
                  <TableCell>{policy.attributes.customer_name}</TableCell>
                  <TableCell>{policy.attributes.policy_no}</TableCell>
                  <TableCell>{policy.attributes.insurer}</TableCell>
                  <TableCell>{policy.attributes.value}</TableCell>
                  <TableCell>{policy.attributes.insurance_type}</TableCell>
                  <TableCell>{policy.attributes.current_expiry}</TableCell>
                  <TableCell>{policy.attributes.asset}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        "Loading...."
      )}
    </React.Fragment>
  );
}
