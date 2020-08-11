import React from 'react';
import { Link } from 'react-router-dom';
import './CustomTable.scss';

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';

import formatDate from '../../../helpers/formatDate';

import modifyStringForUrl from '../../../helpers/modifyStringForUrl';

const useStylesForPaper = makeStyles(theme => ({
    root: {
        alignSelf: 'stretch',
        padding: '0 75px',
        marginTop: '30px',
        overflowX: 'auto',
        boxShadow: 'inherit',
        '@media(max-width: 800px)': {
            padding: '0 20px',
        },
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
        fontSize: '0.8rem',
        color: '#000000',
        borderBottom: '1px solid #8D8D8D',
    },
}));

const useStylesForCellsWithImage = makeStyles(() => ({
    body: {
        borderBottom: '1px solid #8D8D8D',
        padding: '13px 0',
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
            fontSize: '0.8rem',
            color: '#3898DE',
            textDecoration: 'underline',
            fontWeight: '500',
            '&:hover': {
                textDecoration: 'none',
            },
            '&:visited': {
                color: '#3898DE',
            },
        },
        '@media(max-width: 700px)': {
            padding: '5px 0',
        },
    },
}));

const CustomTable = ({ recentTechnologies }) => {
    const classesForPaper = useStylesForPaper();
    const classesForTable = useStylesForTable();
    const classesForCells = useStylesForCells();
    const classesForCellsWithImage = useStylesForCellsWithImage();

    return(
        <Paper classes={classesForPaper} square={true}>
            <Table aria-label="a dense table" padding='none' classes={classesForTable}>
                <TableHead>
                    <TableRow>
                        <TableCell classes={classesForCells}>TECHNOLOGY</TableCell>
                        <TableCell classes={classesForCells}>CATEGORY</TableCell>
                        <TableCell classes={classesForCells}>SUB CATEGORY</TableCell>
                        <TableCell classes={classesForCells}>Results Found</TableCell>
                        <TableCell classes={classesForCells} align='center'>Date Added</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        recentTechnologies.map(recentTechnology => (
                            <TableRow key={recentTechnology.id}>
                                <TableCell classes={classesForCellsWithImage}>
                                    <img src={recentTechnology.logo_url} /><Link to={`/${modifyStringForUrl(recentTechnology.category.name)}/${recentTechnology.technology_key}`}>{recentTechnology.name}</Link>
                                </TableCell>
                                <TableCell classes={classesForCells} className='customTableLink'>{recentTechnology.category.name}</TableCell>
                                <TableCell classes={classesForCells} className='customTableLink'>{recentTechnology.subcategory.name}</TableCell>
                                <TableCell classes={classesForCells}>{recentTechnology.result_found}</TableCell>
                                <TableCell classes={classesForCells} align='center'>{formatDate(recentTechnology.created_at)}</TableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>
            </Table>
        </Paper>
    )
}

export default CustomTable