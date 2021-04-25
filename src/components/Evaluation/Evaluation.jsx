import React from 'react'

//Material UI imports
import {Zoom} from '@material-ui/core';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import NotInterestedIcon from '@material-ui/icons/NotInterested';

//Styling imports
import useEvaluationStyles, {WarningTooltip, ApprovedTooltip} from './EvaluationStyles';

/**
 * Component: Evaluation
 * returns the appropriate icon and tooltip based on the condition passed in
 * @param {Boolean} condition
 * @param {String} trueText
 * @param {String} falseText
 * @param {String} toolTipPlacement 
 */

function Evaluation({condition, trueText, falseText, toolTipPlacement}) {

    const classes = useEvaluationStyles();

    return (
        <>
            {condition ?
            <div className={classes.category}>
                <WarningTooltip placement={toolTipPlacement} title={trueText} transitioncomponent={Zoom} arrow>
                    <NotInterestedIcon className={classes.deniedIcon}/> 
                </WarningTooltip>
            </div>
            : 
            <div className={classes.category}>
                <ApprovedTooltip placement={toolTipPlacement} title={falseText} transitioncomponent={Zoom} arrow>
                    <CheckCircleIcon className={classes.approvedIcon}/>
                </ApprovedTooltip>
            </div>
            }
        </>
    )
}

export default Evaluation
