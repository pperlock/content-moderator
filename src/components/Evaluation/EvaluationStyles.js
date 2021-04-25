import {makeStyles, withStyles} from '@material-ui/core/styles';

import {Tooltip} from '@material-ui/core';

const useEvaluationStyles = makeStyles(()=> ({
    approved:{
        color:"green",
    },
    denied:{
        color:"red",
    },
    approvedIcon:{
        color:"green",
        marginRight:10
    },
    deniedIcon:{
        color:"red",
        marginRight:10
    },
    category:{
        display:"flex",
        alignItems:"center"
    },
    tooltipWarning:{
        backgroundColor:"red",
        color:'white'
    }
}));

const WarningTooltip = withStyles({
    tooltip: {
      color: "white",
      backgroundColor: "red"
    }
})(Tooltip);

const ApprovedTooltip = withStyles({
    tooltip: {
      color: "white",
      backgroundColor: "green"
    }
})(Tooltip);

export {useEvaluationStyles as default, WarningTooltip, ApprovedTooltip};