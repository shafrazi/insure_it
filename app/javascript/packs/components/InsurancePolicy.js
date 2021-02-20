import {
  Card,
  CardContent,
  TextField,
  makeStyles,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import InsurancePolicyForm from "./InsurancePolicyForm";

const useStyles = makeStyles((theme) => {
  return {
    root: {
      "& .MuiTextField-root": {
        margin: theme.spacing(1),
      },
    },
  };
});

function InsurancePolicy() {
  const { id } = useParams();
  const [insurancePolicy, setInsurancePolicy] = useState(null);
  const classes = useStyles();

  useEffect(() => {
    fetch(`/api/insurance_policies/${id}`)
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        setInsurancePolicy(response.data);
      });
  }, []);

  const deleteRenewal = (renewal) => {
    fetch(`/api/renewals/${renewal.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        return response;
      })
      .then(() => {
        const updatedRenewalsArr = insurancePolicy.attributes.renewals.filter(
          (record) => {
            return record.id !== renewal.id;
          }
        );
        setInsurancePolicy((prevInsurancePolicy) => {
          return {
            ...prevInsurancePolicy,
            attributes: {
              ...prevInsurancePolicy.attributes,
              renewals: updatedRenewalsArr,
            },
          };
        });
      });
  };

  return (
    <div>
      {insurancePolicy ? (
        <Card>
          <CardContent>
            <InsurancePolicyForm
              insurancePolicy={insurancePolicy}
              isReadOnly={true}
            />
            {insurancePolicy.attributes.renewals.length > 0 ? (
              <div>
                <h3>Renewals</h3>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell>Policy No</TableCell>
                      <TableCell>Insurer</TableCell>
                      <TableCell>Start date</TableCell>
                      <TableCell>Expiry date</TableCell>
                      <TableCell></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {insurancePolicy.attributes.renewals.map((renewal) => (
                      <TableRow key={renewal.id}>
                        <TableCell>{renewal.policy_no}</TableCell>
                        <TableCell>{renewal.insurer}</TableCell>
                        <TableCell>{renewal.start_date}</TableCell>
                        <TableCell>{renewal.expiry_date}</TableCell>
                        <TableCell>
                          <Button
                            variant="contained"
                            color="secondary"
                            size="small"
                            onClick={() => {
                              deleteRenewal(renewal);
                            }}
                          >
                            Delete
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            ) : null}
          </CardContent>
        </Card>
      ) : null}
    </div>
  );
}

export default InsurancePolicy;
