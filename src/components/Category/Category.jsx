import React from 'react'
import { Typography, Tooltip } from '@material-ui/core';
import InfoIcon from '@material-ui/icons/Info';

import useCategoryStyles from './CategoryStyles';
import RatingSlider from '../../components/RatingSlider/RatingSlider';

function Category({categoryNum, score, tooltip}) {

    const classes = useCategoryStyles();

    return (
        <>
            <div className={classes.category}>
            <Typography variant="subtitle1" className={classes.categoryTitle}> Category {categoryNum}</Typography>
                <Tooltip placement="right" title={tooltip}>
                    <InfoIcon className={classes.infoIcon}/>
                </Tooltip>
            </div>
            <RatingSlider value={score.toFixed(2)}/>
        </>
    )
}

export default Category
