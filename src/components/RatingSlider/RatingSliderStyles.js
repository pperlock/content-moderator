import {withStyles} from '@material-ui/core/styles';

import {Slider} from '@material-ui/core';

const CustomRatingSlider = withStyles({
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

export default CustomRatingSlider