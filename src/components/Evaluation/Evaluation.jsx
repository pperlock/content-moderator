import React from 'react'

import {Typography} from '@material-ui/core';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import NotInterestedIcon from '@material-ui/icons/NotInterested';

import useEvaluationStyles from './EvaluationStyles';

function Evaluation({condition, trueText, falseText}) {

    const classes = useEvaluationStyles();

    return (
        <>
            {condition ?
            <div className={classes.category}>
                <NotInterestedIcon className={classes.deniedIcon}/> 
                <Typography variant="button" className={classes.denied}> {trueText} </Typography>
            </div>
            : 
            <div className={classes.category}>
                <CheckCircleIcon className={classes.approvedIcon}/>
                <Typography variant="button" className={classes.approved}> {falseText} </Typography>
            </div>
            }
        </>
    )
}

export default Evaluation
