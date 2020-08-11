import React from 'react';
import './AlertDetails.scss';

import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStylesForPaper = makeStyles(theme => ({
    root: {
        width: '100%',
        overflowX: 'auto',
        boxShadow: 'inherit',
    },
}));

const useStylesForTable = makeStyles(() => ({
    root: {
        minWidth: '650px',
    },
}));

const useStylesForTableHead = makeStyles(() => ({
    root: {
        backgroundColor: '#575757',
        border: '1px solid #5C5C5C',
        boxSizing: 'border-box',
    },
}));

const useStylesForCells = makeStyles(() => ({
    head: {
        fontSize: '1rem',
        fontWeight: '500',
        color: '#FFFFFF',
        '& > span': {
            fontSize: '0.6rem',
            display: 'block',
        },
    },
    body: {
        fontWeight: '500',
        fontSize: '1rem',
        color: '#000000',
        borderBottom: '1px solid #8D8D8D',
        '& > i': {
            color: '#3898DE',
            marginRight: '5px',
            verticalAlign: 'middle'
        },
    },
}));

function createData(change, companyName, industry, techBudget, exp) {
    return { change, companyName, industry, techBudget, exp }
};

const AlertDetails = ({ selectedAlert }) => {
    const classesForPaper = useStylesForPaper();
    const classesForTable = useStylesForTable();
    const classesForTableHead = useStylesForTableHead();
    const classesForCells = useStylesForCells();

    const rows = [
        createData('Added','Twitter', 'Information...', '$40,000', '+'),
        createData('Removed','Twitter', 'Information...', '$40,000', '+'),
        createData('Removed','Twitter', 'Information...', '$40,000', '+'),
    ];

    return(
        <div className='alertDetails'>
            <p><img src={selectedAlert.selected_technology.logo_url} />{selectedAlert.selected_technology.name}</p>
            <Paper classes={classesForPaper} square={true}>
                <Table classes={classesForTable} aria-label="a dense table">
                    <TableHead classes={classesForTableHead}>
                        <TableRow>
                            <TableCell classes={classesForCells}>Change</TableCell>
                            <TableCell classes={classesForCells}>Company Name</TableCell>
                            <TableCell classes={classesForCells}>Industry</TableCell>
                            <TableCell classes={classesForCells} style={{textAlign:'center', lineHeight: 'inherit'}}>Tech Budgets<span>(Month)</span></TableCell>
                            <TableCell classes={classesForCells} style={{textAlign:'center'}}>Export</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            rows.map((row, index) => (
                                <TableRow key={index}>
                                    <TableCell classes={classesForCells} component="th" scope="row" style={row.change === 'Removed' ? {color: '#BA2020'} : {color: '#42C960'}}>{row.change}</TableCell>
                                    <TableCell classes={classesForCells}><i className="fab fa-twitter" />{row.companyName}</TableCell>
                                    <TableCell classes={classesForCells}>{row.industry}</TableCell>
                                    <TableCell classes={classesForCells} style={{textAlign:'center'}}>{row.techBudget}</TableCell>
                                    <TableCell classes={classesForCells} style={{textAlign:'center'}}>{row.exp}</TableCell>
                                </TableRow>
                            ))
                        }
                    </TableBody>
                </Table>
            </Paper>
        </div>
    )
}

export default AlertDetails