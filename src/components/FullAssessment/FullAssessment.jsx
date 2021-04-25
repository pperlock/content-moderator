import React from 'react'
import { Grid, Typography, Card} from '@material-ui/core';

import RatingSlider from '../RatingSlider/RatingSlider';
import Evaluation from '../Evaluation/Evaluation';
import Category from '../Category/Category';

import useAssessmentStyles from './FullAssessmentStyles';

function FullAssessment({textEvaluation, imageEvaluation, textRequestTime, imageRequestTime, isTextEvaluated, isImageEvaluated}) {

    const classes = useAssessmentStyles();

    const {ReviewRecommended, Category1, Category2, Category3} = textEvaluation.Classification;

    return (
        <Grid container spacing={2}>
            
            {/* --------- Text Review  -----------------*/}
            <Grid item xs={12} sm={6}>
                <Card className={classes.card}>
                    <div className={classes.titleWrapper}> 
                        <Typography variant='h5'> 
                            Text Review 
                        </Typography>
                        {isTextEvaluated && <Evaluation condition={ReviewRecommended} trueText = "Review Needed" falseText = "No Review Needed"/>}
                    </div>

                    {(isTextEvaluated || textEvaluation) ?
                    <>
                        {textRequestTime && <Typography variant='body1' className={classes.responseTime}>Response Time: {textRequestTime}</Typography>}

                        <Typography variant="subtitle1" className={classes.sectionDivider}>CLASSIFICATION</Typography>

                        <Category categoryNum="1" score={Category1.Score} tooltip="refers to potential presence of language that may be considered sexually explicit or adult in certain situations"/>
                        <Category categoryNum="2" score={Category2.Score} tooltip="refers to potential presence of language that may be considered sexually suggestive or mature in certain situations."/>
                        <Category categoryNum="3" score={Category3.Score} tooltip="refers to potential presence of language that may be considered offensive in certain situations."/>
                        
                        <Typography variant="subtitle1" className={classes.sectionDivider}>PERSONAL INFORMATION</Typography>

                        {isTextEvaluated && <Evaluation condition={textEvaluation.PII} trueText="Personal Information Exposed" falseText="No Personal Information Exposed"/>}
                        
                        {textEvaluation.PII && 
                            <Grid container spacing={6} >
                                {Object.entries(textEvaluation.PII).map(entry=>
                                    entry[1].length !==0 && 
                                    <Grid key={entry} item xs={12} md={3}>
                                        <Typography className={classes.piiCategory}>{`${entry[0]}:`}</Typography>
                                        {entry[1].map(value=> <p>{value.Text}</p>)}
                                    </Grid>
                                )}
                            </Grid>
                        }
            
                        <Typography variant="subtitle1" className={classes.sectionDivider}>LANGUAGE</Typography>

                        {isTextEvaluated && <Evaluation condition={textEvaluation.Terms} trueText="Flagged Language Used" falseText="No Flagged Language Detected"/>}
                        {textEvaluation.Terms && textEvaluation.Terms.map(term=> <p key={term.Index}> {term.Term} </p>)}
                    </>
                    :
                    <p>No Text Entered </p>
                    }
                 </Card>
            </Grid>


            {/* --------- Image Review  -----------------*/}

             
            <Grid item xs={12} sm={6}>
                <Card className={classes.card}>
                    <div className={classes.titleWrapper}> 
                        <Typography variant="h5"> Image Review </Typography>
                        {(isImageEvaluated && imageEvaluation) && <Evaluation condition={imageEvaluation.IsImageAdultClassified || imageEvaluation.IsImageRacyClassified} trueText="Review Needed" falseText="No Review Needed"/>}
                    </div>
                    
                    {isImageEvaluated ?
                    <>
                        {imageRequestTime && <Typography variant='body1' className={classes.responseTime} >Response Time: {imageRequestTime}</Typography>}
                        
                        <Evaluation condition={imageEvaluation.IsImageAdultClassified} trueText="Adult Content" falseText="No Adult Content"/>
                        <RatingSlider value={imageEvaluation.AdultClassificationScore.toFixed(2)} />

                        <Evaluation condition={imageEvaluation.IsImageRacyClassified} trueText="Racy Content" falseText="No Racy Content"/>
                        <RatingSlider value={imageEvaluation.RacyClassificationScore.toFixed(2)} />
                    </>
                    :
                    <p> No Image Uploaded </p>
                    }
                </Card>
            </Grid>
        </Grid>
    )
}

export default FullAssessment
