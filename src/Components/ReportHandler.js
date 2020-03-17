import React, { Fragment } from 'react';
import { Container } from 'reactstrap';
import ReportTableI from "./ReportTableI";
import Reports from "../Pages/Reports"
import TableOfCustomers from "./TableOfCustomers";
import TableOfData from "./TableOfData";
export default function ReportHandler() {
    //Global State
    //const IsAuthenticated = useStoreState(UserStore, s => s.IsAuthenticated);
   // const tableCall = tableType;


    const global = (
        <Container>
            <TableOfCustomers></TableOfCustomers>
        </Container>
    );
    const individual = (
        <Container>
            <ReportTableI></ReportTableI>
        </Container>
    );
    const blanks = (
        <Container>
            <TableOfData></TableOfData>
        </Container>
    );

/*
    if ( Reports(tableCode) == "A"){
        return <Fragment>{individual}</Fragment>;
    }
    else if ( tableCode== "B"){
        return <Fragment>{global}</Fragment>;
    }
    else if ( tableCode == "C"){
        return <Fragment>{blanks}</Fragment>;
    }else{
        return 0
    }
*/

}
//auth links for when signed in