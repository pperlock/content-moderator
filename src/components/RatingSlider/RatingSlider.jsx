import React from 'react'

import CustomRatingSlider from './RatingSliderStyles'

function RatingSlider({value}) {
    return (
        <CustomRatingSlider
            value={Number(value)}
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
