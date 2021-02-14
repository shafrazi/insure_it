import React from "react";
import { useState, useEffect } from "react";
import Link from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { Paper, TableContainer } from "@material-ui/core";
import Title from "./Title";

function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
}));

export default function Customers() {
  const classes = useStyles();
  const [customers, setCustomers] = useState([]);
  const [isDataLoaded, setIsDataLoaded] = useState(false);

  useEffect(() => {
    fetch("/api/customers")
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        setCustomers(response.data);
        setIsDataLoaded(true);
      });
  }, []);

  return (
    <React.Fragment>
      <Title>All customers</Title>
      {isDataLoaded ? (
        <TableContainer component={Paper}>
          <Table stickyHeader size="small">
            <TableHead>
              <TableRow>
                <TableCell>UID</TableCell>
                <TableCell>First Name</TableCell>
                <TableCell>Last Name</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {customers.map((customer) => (
                <TableRow key={customer.id}>
                  <TableCell>{customer.attributes.uid}</TableCell>
                  <TableCell>{customer.attributes.first_name}</TableCell>
                  <TableCell>{customer.attributes.last_name}</TableCell>
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
