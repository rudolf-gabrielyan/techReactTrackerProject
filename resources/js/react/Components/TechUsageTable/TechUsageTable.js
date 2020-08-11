import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './TechUsageTable.scss';

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TablePagination from '@material-ui/core/TablePagination';

import Image from '../Image/Image';

const useStylesForPaper = makeStyles(theme => ({
    root: {
        marginTop: '26px',
        marginBottom: '5px',
        overflowX: 'auto',
        boxShadow: 'inherit',
    },
}));

const useStylesForTable = makeStyles(() => ({
    root: {
        minWidth: '500px',
    },
}));

const useStylesForCells = makeStyles(() => ({
    head: {
        paddingBottom: '18px',
        '&:last-child': {
            padding: '0 0 18px 0',
        },
        fontSize: '0.7rem',
        color: '#808080',
        borderBottom: '1px solid #8D8D8D',
        '@media(max-width: 500px)': {
            paddingBottom: '5px',
            '&:last-child': {
                padding: '0 0 5px 0',
            },
        },
    },
    body: {
        fontWeight: '500',
        fontSize: '0.7rem',
        color: '#000000',
        borderBottom: '1px solid #8D8D8D',
        '& > a': {
            fontWeight: '500',
            fontSize: '0.7rem',
            color: '#000000',
            textDecoration: 'none',
            '&:visited': {
                color: '#000000',
            },
            '&:hover': {
                textDecoration: 'underline',
            },
        },
    },
}));

const useStylesForCellsWithImage = makeStyles(() => ({
    body: {       
        borderBottom: '1px solid #8D8D8D',
        padding: '13px 0 13px 20px',
        '& > img': {
            width: '22px',
            marginRight: '18px',
            verticalAlign: 'middle',
            '@media(max-width: 700px)': {
                width: '15px',
                marginRight: '10px',
            }
        },
        '& > a': {
            fontWeight: '500',
            fontSize: '0.7rem',
            color: '#000000',
            textDecoration: 'none',
            '&:visited': {
                color: '#000000',
            },
            '&:hover': {
                textDecoration: 'underline',
            },
        },
        '@media(max-width: 700px)': {
            padding: '5px 0',
        },
    },
}));

const useStylesForTablePagination = makeStyles(() => ({
    root: {
        fontSize: '0.7rem',        
    },
    caption: {
        fontSize: '0.7rem',
    },
    selectIcon: {
        width: '25px',
    },
    menuItem: {
        fontSize: '0.7rem',
        padding: '5px'
    },
    actions: {
        '& .MuiSvgIcon-root': {
            width: '25px',
        },
    },
}));

const TechUsageTable = ({ technology }) => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const classesForPaper = useStylesForPaper();
    const classesForTable = useStylesForTable();
    const classesForCells = useStylesForCells();
    const classesForCellsWithImage = useStylesForCellsWithImage();
    const classesForTablePagination = useStylesForTablePagination();

    const handleChangePage = (event, newPage) => setPage(newPage);

    const handleChangeRowsPerPage = event => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    return(
        <Paper classes={classesForPaper} square={true}>
            <Table aria-label="a dense table" padding='none' classes={classesForTable}>
                <TableHead>
                    <TableRow>
                        <TableCell classes={classesForCells} align='left' style={{paddingLeft: '20px'}}>COMPANY NAME</TableCell>
                        <TableCell classes={classesForCells} align='left'>WEBSITE</TableCell>
                        <TableCell classes={classesForCells} align='left'>HQ ADDRESS</TableCell>
                        <TableCell classes={classesForCells} align='left'>CITY</TableCell>
                        <TableCell classes={classesForCells} align='left'>STATE</TableCell>
                        <TableCell classes={classesForCells} align='left'>COUNTRY</TableCell>
                        <TableCell classes={classesForCells} align='left'>INDUSTRY</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        technology.companies_list.list.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((company, index) => (
                            <TableRow key={index}>
                                <TableCell classes={classesForCellsWithImage} align='left'>
                                    <Image src={company.image} /><Link to={`/${company.domain}`}>{company.name}</Link>
                                </TableCell>
                                <TableCell classes={classesForCells} align='left'><a target='blank' href={company.website}>{company.website}</a></TableCell>
                                <TableCell classes={classesForCells} align='left'>{company.locations[0] && company.locations[0].street}</TableCell>
                                <TableCell classes={classesForCells} align='left'>{company.locations[0] && company.locations[0].city}</TableCell>
                                <TableCell classes={classesForCells} align='left'>{company.locations[0] && company.locations[0].state}</TableCell>
                                <TableCell classes={classesForCells} align='left'>{company.locations[0] && company.locations[0].country}</TableCell>
                                <TableCell classes={classesForCells} align='left'>{company.industry}</TableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>
            </Table>
            <TablePagination
                classes={classesForTablePagination}
                rowsPerPageOptions={[5, 10, 25, 50, 100]}
                component="div"
                count={technology.companies_list.list.length}
                rowsPerPage={rowsPerPage}
                page={page}
                backIconButtonProps={{
                'aria-label': 'previous page',
                }}
                nextIconButtonProps={{
                'aria-label': 'next page',
                }}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
            />
        </Paper>
    )
}

export default TechUsageTable