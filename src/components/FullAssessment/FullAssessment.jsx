import React from 'react'
import { Container, Grid, Typography, Card} from '@material-ui/core';

import RatingSlider from '../RatingSlider/RatingSlider';
import Evaluation from '../Evaluation/Evaluation';
import Category from '../Category/Category';

import useAssessmentStyles from './FullAssessmentStyles';

function FullAssessment({textEvaluation, imageEvaluation, textRequestTime, imageRequestTime}) {

    const classes = useAssessmentStyles();

    const {ReviewRecommended, Category1, Category2, Category3} = textEvaluation.Classification;

    console.log(textEvaluation);

    return (
        <Grid container spacing={2}>
            
            {/* --------- Text Review  -----------------*/}
            <Grid item xs={12} sm={6}>
                <Card className={classes.card}>
                    <div className={classes.titleWrapper}> 
                        <Typography variant='h5'> 
                            Text Review 
                        </Typography>
                        <Evaluation condition={ReviewRecommended} trueText = "Review Needed" falseText = "No Review Needed"/>
                    </div>

                    {textRequestTime && <Typography variant='subtitle1'>Response Time: {textRequestTime}</Typography>}

                    <Category categoryNum="1" score={Category1.Score} tooltip="refers to potential presence of language that may be considered sexually explicit or adult in certain situations"/>
                    <Category categoryNum="2" score={Category2.Score} tooltip="refers to potential presence of language that may be considered sexually suggestive or mature in certain situations."/>
                    <Category categoryNum="3" score={Category3.Score} tooltip="refers to potential presence of language that may be considered offensive in certain situations."/>

                    <Grid className={classes.flaggedInfo} container spacing={10}>
                        <Grid item xs={12} sm={6}>
                            <Evaluation condition={textEvaluation.Terms} trueText="Flagged Language" falseText="No Flagged Language"/>
                            {textEvaluation.Terms && textEvaluation.Terms.map(term=> <p key={term.Index}> {term.Term} </p>)}
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <div>
                                <Evaluation condition={textEvaluation.PII} trueText="Personal Information" falseText="No Personal Information"/>
                                {textEvaluation.PII && 
                                    Object.entries(textEvaluation.PII).map(entry=>
                                        <div>
                                            <div className={classes.category}>
                                                <p>{entry[0]}</p>
                                                <p>{entry[1].length}</p>
                                            </div>
                                            {entry[1].map(value=> <p>{value.Text}</p>)}
                                        </div>
                                    )
                                }
                            </div>
                        </Grid>
                    </Grid>
                </Card>
            </Grid>

            {/* --------- Image Review  -----------------*/}
            <Grid item xs={12} sm={6}>
                <Card className={classes.card}>
                    <div className={classes.titleWrapper}> 
                        <Typography variant="h5"> Image Review </Typography>
                        <Evaluation condition={imageEvaluation.IsImageAdultClassified || imageEvaluation.IsImageRacyClassified} trueText="Review Needed" falseText="No Review Needed"/>
                    </div>
                    
                    {imageRequestTime && <Typography variant='subtitle1'>Response Time: {imageRequestTime}</Typography>}
                    
                    <Evaluation condition={imageEvaluation.IsImageAdultClassified} trueText="Adult Content" falseText="No Adult Content"/>
                    <RatingSlider value={imageEvaluation.AdultClassificationScore.toFixed(2)} />

                    <Evaluation condition={imageEvaluation.IsImageRacyClassified} trueText="Racy Content" falseText="No Racy Content"/>
                    <RatingSlider value={imageEvaluation.RacyClassificationScore.toFixed(2)} />
                </Card>
            </Grid>
        </Grid>
    )
}

export default FullAssessment
