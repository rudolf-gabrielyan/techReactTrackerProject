import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStylesForBackdrop = makeStyles({
    root: {
        zIndex: '10',
        backgroundColor: 'rgba(10,41,69,0.5)',
        position: 'absolute',
    },
});

const useStylesForCircularProgress = makeStyles({
    colorPrimary: {
        color: '#FFFFFF',
    },
});

const LoadingIndicator = ({ state, style }) => {
    const classesForBackdrop = useStylesForBackdrop();
    const classesForCircularProgress = useStylesForCircularProgress();

    return(
        <Backdrop classes={classesForBackdrop} open={state} style={style} >
            <CircularProgress classes={classesForCircularProgress} />
        </Backdrop>
    ) 
}

export default LoadingIndicator