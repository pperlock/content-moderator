import React from 'react'

import { withStyles} from '@material-ui/core/styles';
import { Slider } from '@material-ui/core';

function RatingSlider({label, value}) {

    const RatingSlider = withStyles({
        root: {
            color: 'black',
            height: 8,
        },
        thumb: {
            height: 15,
            width: 10,
            backgroundColor: 'transparent',
            border: '2px solid currentColor',
            marginTop:-4,
            marginLeft:1
        },
        active: {},
        // valueLabel: {
        //     left: 'calc(-50% + 4px)',
        // },
        track: {
            height: 8,
            borderRadius: 4,
            backgroundColor:"transparent"
        },
        rail: {
            height: 8,
            borderRadius: 4,
            backgroundImage:"linear-gradient(90deg, #339900, #ffcc00, #8e1600)"
        },
    })(Slider);

    console.log(label);

    return (
        <RatingSlider
            value={value}
            label={label}
            aria-labelledby="discrete-slider-custom"
            step={0.1}
            valueLabelDisplay="auto"
            min={0}
            max={1}
            disabled={false}
        />
    )
}

export default RatingSlider
