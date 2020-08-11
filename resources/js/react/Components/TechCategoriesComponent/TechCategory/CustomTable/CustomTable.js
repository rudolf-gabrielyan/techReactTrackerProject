import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TablePagination from '@material-ui/core/TablePagination';

import modifyStringForUrl from '../../../../helpers/modifyStringForUrl';

const useStylesForPaper = makeStyles(theme => ({
    root: {
        margin: '0 5px',
        marginTop: '30px',
        marginBottom: '30px',
        overflowX: 'auto',
        boxShadow: 'inherit',
        '@media(max-width: 800px)': {
            padding: '0 20px',
        },
    },
}));

const useStylesForTable = makeStyles(() => ({
    root: {
        minWidth: '650px',
        '@media(max-width: 1000px)': {
            minWidth: '500px',
        },
        '@media(max-width: 800px)': {
            minWidth: '400px',
        },
        '@media(max-width: 600px)': {
            minWidth: '300px',
        },
        '@media(max-width: 400px)': {
            minWidth: '250px',
        },
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
        fontSize: '0.8rem',
        color: '#000000',
        borderBottom: '1px solid #8D8D8D',
    },
}));

const useStylesForCellsWithImage = makeStyles(() => ({
    body: {
        borderBottom: '1px solid #8D8D8D',
        padding: '13px 0 13px 40px',
        '& > img': {
            width: '22px',
            marginRight: '18px',
            verticalAlign: 'middle',
            '@media(max-width: 700px)': {
                width: '15px',
                marginRight: '10px',
            },
        },
        '& > a': {
            fontWeight: '500',
            fontSize: '0.8rem',
            color: '#000000',
            textDecoration: 'none',
            '&:hover': {
                textDecoration: 'underline',
            },
            '&:visited': {
                color: '#000000',
            },
        },
        '@media(max-width: 700px)': {
            padding: '5px 0 5px 40px',
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

const CustomTable = ({ category, technologies, startRank }) => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
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
                        <TableCell classes={classesForCells} align='center'>Rank</TableCell>
                        <TableCell classes={classesForCells} style={{paddingLeft: '40px'}} align='left'>Technology Name</TableCell>
                        <TableCell classes={classesForCells} align='left'>Customers</TableCell>
                        <TableCell classes={classesForCells} align='center'>Market Share</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        technologies.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((technology, index) => (
                            <TableRow key={technology.id}>
                                <TableCell classes={classesForCells} align='center'>{startRank + index + page * rowsPerPage}</TableCell>
                                <TableCell classes={classesForCellsWithImage} align='left'>
                                    <img src={technology.logo_url} /><Link to={`/${modifyStringForUrl(category)}/${technology.technology_key}`}>{technology.name}</Link>
                                </TableCell>
                                <TableCell classes={classesForCells} align='left'>{technology.total_installs.toLocaleString()}</TableCell>
                                <TableCell classes={classesForCells} align='center'>{technology.percent}%</TableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>
            </Table>
            <TablePagination
                classes={classesForTablePagination}
                rowsPerPageOptions={[10, 25, 50, 100]}
                component="div"
                count={technologies.length}
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

export default CustomTable