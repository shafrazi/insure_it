import React from "react";
import { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Title from "./Title";
import { Button, Paper, TableContainer } from "@material-ui/core";
import { Link } from "react-router-dom";

function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
}));

export default function InsurancePolicies(props) {
  const classes = useStyles();
  const [insurancePolicies, setInsurancePolicies] = useState([]);
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const filterType = props.filterType;
  const today = new Date();

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
              </TableRow>
            </TableHead>
            <TableBody>
              {insurancePolicies.map((policy) => {
                if (filterType === "all") {
                  return (
                    <TableRow key={policy.id}>
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
                        >
                          Edit
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                } else {
                  if (new Date(policy.attributes.current_expiry) < today) {
                    return (
                      <TableRow key={policy.id}>
                        <TableCell>{policy.attributes.customer_name}</TableCell>
                        <TableCell>
                          <Link to={`/insurance_policies/${policy.id}`}>
                            {policy.attributes.policy_no}
                          </Link>
                        </TableCell>
                        <TableCell>{policy.attributes.insurer}</TableCell>
                        <TableCell>{policy.attributes.value}</TableCell>
                        <TableCell>
                          {policy.attributes.insurance_type}
                        </TableCell>
                        <TableCell>
                          {policy.attributes.current_expiry}
                        </TableCell>
                        <TableCell>{policy.attributes.asset}</TableCell>
                        <TableCell>
                          <Button
                            variant="contained"
                            color="primary"
                            size="small"
                          >
                            Edit
                          </Button>
                        </TableCell>
                      </TableRow>
                    );
                  }
                }
              })}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        "Loading...."
      )}
    </React.Fragment>
  );
}
