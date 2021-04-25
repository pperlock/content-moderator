import React from 'react'

//Material UI imports
import { Typography, Zoom } from '@material-ui/core';
import InfoIcon from '@material-ui/icons/Info';

//Import Child components
import RatingSlider from '../../components/RatingSlider/RatingSlider';

//Styling imports
import useCategoryStyles, {InfoTooltip} from './CategoryStyles';

/**
 * 
 * @param {String} categoryNum
 * @param {Number} score
 * @param {String} categoryDescription 
 * @param {String} tooltip
 */

function Category({categoryNum, score, categoryDescription, tooltip}) {

    const classes = useCategoryStyles();
    
    return (
        <>
            <div className={classes.category}>
            <Typography variant="subtitle1" className={classes.categoryTitle}> Category {categoryNum}: <span className={classes.categoryDescription}>({categoryDescription})</span> </Typography>
                <InfoTooltip placement="right" title={tooltip} transitioncomponent={Zoom} arrow>
                    <InfoIcon className={classes.infoIcon}/>
                </InfoTooltip>
            </div>
            <RatingSlider value={score.toFixed(2)}/>
        </>
    )
}

export default Category
