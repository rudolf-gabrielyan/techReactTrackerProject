import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Invoices.scss';

import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import getDateFromString from '../../helpers/getDateFromString';
import addOneMonthToDate from '../../helpers/addOneMonthToDate';

import LoadingIndicator from '../LoadingIndicator/LoadingIndicator';

const useStylesForPaper = makeStyles({
    root: {
        padding: '0 10px',
        boxShadow: 'none',
    }
});

const useStylesForTable = makeStyles({
    root: {
        minWidth: '550px',
        boxShadow: '0px 0px 16px 0px rgba(168,163,168,1)'
    },
});

const useStylesForTableHead = makeStyles({
    root: {
        backgroundColor: '#d8d8de',
    }
});

const useStylesForCells = makeStyles({
    root: {
        '& > p': {
            margin: '0 0 5px 0',
            '&:last-of-type': {
                margin: 0
            },
            '& > span': {
                fontWeight: 'bold'
            }
        },
        '& > a': {
            fontSize: '0.8rem',
            color: '#000000',
            padding: '5px',
            backgroundColor: '#dbdbe1',
            textDecoration: 'none',
            cursor: 'pointer',
            '&:hover': {
                textDecoration: 'underline',
                backgroundColor: '#dbdbdb'
            },
            '$:visited': {
                color: '#000000',
            }
        },
        '@media(max-width: 900px)': {
            padding: '3px 12px 3px 8px'
        }
    },
    head: {
        fontSize: '0.9rem'
    },
    body: {
        fontSize: '0.8rem'
    }
});

const Invoices = ({ user }) => {
    const classesForPaper = useStylesForPaper();
    const classesForTable = useStylesForTable();
    const classesForTableHead = useStylesForTableHead();
    const classesForCells = useStylesForCells();
    const [invoices, setInvoices] = useState([]);
    const [pageIsLoading, setPageIsLoading] = useState(false);

    useEffect(() => {
        if(user.data.paddleInfo) {
            setPageIsLoading(true);
            axios.post('/api/getInvoices', { paddleUserId: user.data.paddleInfo.paddle_user_id})
            .then(response => {
                setInvoices(response.data.response);
                setPageIsLoading(false);
            });
        }
    }, []);

    if(pageIsLoading) return <div style={{width: '100%', position: 'relative'}}><LoadingIndicator state={pageIsLoading} /></div>

    return(
        <TableContainer component={Paper} classes={classesForPaper}>
            <Table classes={classesForTable} size='small' aria-label="simple table">
                <TableHead classes={classesForTableHead}>
                    <TableRow>
                        <TableCell classes={classesForCells}>Billed On</TableCell>
                        <TableCell classes={classesForCells} align="left">Description</TableCell>
                        <TableCell classes={classesForCells} align="left">Billing Period</TableCell>
                        <TableCell classes={classesForCells} align="left">Total</TableCell>
                        <TableCell classes={classesForCells} align="left"></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        invoices.map(invoice => (
                            <TableRow key={invoice.order_id}>
                                <TableCell classes={classesForCells} component="th" scope="row">{getDateFromString(invoice.created_at)}</TableCell>
                                <TableCell classes={classesForCells} align="left">
                                    <p>Plan - <span>{invoice.product_name}</span></p>
                                    <p>Billing Type - <span>{invoice.billing_type}</span></p>
                                    <p>Status - <span>{invoice.subscription.status}</span></p>
                                </TableCell>
                                <TableCell classes={classesForCells} align="left">{getDateFromString(invoice.created_at)} - {addOneMonthToDate(invoice.created_at)}</TableCell>
                                <TableCell classes={classesForCells} align="left">{invoice.amount} {invoice.currency}</TableCell>
                                <TableCell classes={classesForCells} align="left"><a href={invoice.receipt_url} target='_blank'>See Invoice</a></TableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default Invoices