import React from 'react'

//Material UI imports
import { Grid, Typography, Card, Accordion, AccordionSummary, AccordionDetails} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

//Child component imporst
import RatingSlider from '../RatingSlider/RatingSlider';
import Evaluation from '../Evaluation/Evaluation';
import Category from '../Category/Category';

//Styling imports
import useAssessmentStyles from './FullAssessmentStyles';

/**
 * 
 * @param {Object} textEvaluation
 * @param {Object} imageEvaluation
 * @param {String} textRequestTime
 * @param {String} imageRequestTime
 * @param {Boolean} isTextEvaluated
 * @param {Boolean} isImageEvaluated 
 */

function FullAssessment({textEvaluation, imageEvaluation, textRequestTime, imageRequestTime, isTextEvaluated, isImageEvaluated}) {

    const classes = useAssessmentStyles();

    const {ReviewRecommended, Category1, Category2, Category3} = textEvaluation.Classification;
    
    //if there is offensive language then combine all the terms into a string for rendering
    const termsString = textEvaluation.Terms && textEvaluation.Terms.reduce((termString, term) => termString + term.Term + ", ", "").slice(0,-2);

    return (
        <Grid container spacing={2}>
            
            {/* --------- Text Review  -----------------*/}
            <Grid item xs={12} sm={6}>
                <Card className={classes.card}>
                    <div className={classes.titleWrapper}> 
                        <Typography variant='h5'> 
                            Text Review 
                        </Typography>
                        {isTextEvaluated ?
                            isTextEvaluated && <Evaluation condition={ReviewRecommended} toolTipPlacement="left" trueText = "Review Needed" falseText = "No Review Needed"/>
                            :
                            <p className={classes.noEvaluation}>No Text Entered </p>
                        }
                    </div>

                        {textRequestTime && <Typography variant='body1' className={classes.responseTime}>Response Time: {textRequestTime}</Typography>}

                        <Accordion defaultExpanded>
                            <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1bh-content">
                                {isTextEvaluated && 
                                    <Evaluation 
                                        condition={ReviewRecommended} 
                                        toolTipPlacement="top-start" 
                                        trueText = "Review Needed" 
                                        falseText = "No Review Needed"
                                    />}
                                <Typography variant="subtitle1">CLASSIFICATION</Typography>
                            </AccordionSummary>

                            <AccordionDetails className={classes.accordionDetails}>
                                <Category 
                                    categoryNum="1" 
                                    score={Category1.Score} 
                                    categoryDescription="sexually explicit"
                                    tooltip="language that may potentially be considered sexually explicit or adult in certain situations"/>
                                <Category 
                                    categoryNum="2" 
                                    score={Category2.Score} 
                                    categoryDescription="sexually suggestive"
                                    tooltip="language that may potentially be considered sexually suggestive or mature in certain situations."/>
                                <Category 
                                    categoryNum="3" 
                                    score={Category3.Score} 
                                    categoryDescription="offensive language"
                                    tooltip="language that may potentially be considered offensive in certain situations."/>
                            </AccordionDetails>
                        </Accordion>
                        
                        <Accordion>
                            <AccordionSummary expandIcon={textEvaluation.PII ? <ExpandMoreIcon /> : null} aria-controls="panel1bh-content">
                                {isTextEvaluated && 
                                    <Evaluation 
                                        condition={textEvaluation.PII} 
                                        toolTipPlacement="top-start" 
                                        trueText="Personal Information Exposed" 
                                        falseText="No Personal Information Exposed"
                                    />}
                                <Typography variant="subtitle1">PERSONAL INFORMATION</Typography>
                            </AccordionSummary>

                            <AccordionDetails>
                                {textEvaluation.PII && 
                                    <Grid container spacing={6} >
                                        {Object.entries(textEvaluation.PII).map(entry=>
                                            entry[1].length !==0 && 
                                            <Grid key={entry} item xs={12} md={3}>
                                                <Typography className={classes.piiCategory}>{`${entry[0]}:`}</Typography>
                                                {entry[1].map(value=> <p key={value.Index}>{value.Text}</p>)}
                                            </Grid>
                                        )}
                                    </Grid>
                                }
                            </AccordionDetails>
                        </Accordion>
            
                        <Accordion>
                            <AccordionSummary expandIcon={textEvaluation.Terms ? <ExpandMoreIcon /> : null} aria-controls="panel1bh-content">
                                {isTextEvaluated && 
                                    <Evaluation 
                                        condition={textEvaluation.Terms} 
                                        toolTipPlacement="top-start" 
                                        trueText="Flagged Language Used" 
                                        falseText="No Flagged Language Detected"
                                    />}
                                <Typography variant="subtitle1">LANGUAGE</Typography>
                            </AccordionSummary>
                            
                            <AccordionDetails>
                                {/* {textEvaluation.Terms && textEvaluation.Terms.map(term=> <p key={term.Index}> {term.Term} </p>)} */}
                                <p>{termsString}</p>
                            </AccordionDetails>
                        </Accordion>
                 </Card>
            </Grid>


            {/* --------- Image Review  -----------------*/}

             
            <Grid item xs={12} sm={6}>
                <Card className={classes.card}>
                    <div className={classes.titleWrapper}> 
                        <Typography variant="h5"> Image Review </Typography>
                        {isImageEvaluated ?
                            (isImageEvaluated && imageEvaluation) && 
                                <Evaluation 
                                    condition={imageEvaluation.IsImageAdultClassified || imageEvaluation.IsImageRacyClassified}
                                    toolTipPlacement="left" 
                                    trueText="Review Needed" 
                                    falseText="No Review Needed"
                                />
                                :
                                <p className={classes.noEvaluation}> No Image Uploaded </p>
                        }
                    </div>
                    {imageRequestTime && <Typography variant='body1' className={classes.responseTime} >Response Time: {imageRequestTime}</Typography>}
                    
                    <div className={classes.category}>
                        {isImageEvaluated && <Evaluation condition={imageEvaluation.IsImageAdultClassified} toolTipPlacement="top-start" trueText="Adult Content" falseText="No Adult Content"/>}
                        <Typography variant="subtitle1">ADULT CONTENT</Typography>
                    </div>
                    <RatingSlider value={imageEvaluation.AdultClassificationScore.toFixed(2)} />
                    
                    <div className={classes.category}>
                        {isImageEvaluated && <Evaluation condition={imageEvaluation.IsImageRacyClassified} toolTipPlacement="top-start" trueText="Racy Content" falseText="No Racy Content"/>}
                        <Typography variant="subtitle1">RACY CONTENT</Typography>
                    </div>
                    <RatingSlider value={imageEvaluation.RacyClassificationScore.toFixed(2)} />
                 </Card>
            </Grid>
        </Grid>
    )
}

export default FullAssessment
