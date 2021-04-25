import {makeStyles, withStyles} from '@material-ui/core/styles';
import { Tooltip } from '@material-ui/core';

const useCategoryStyles = makeStyles(()=> ({
    infoIcon:{
        color:'#d3d3d3',
        height:20,
        marginLeft:10
    },
    category:{
        display:"flex",
        alignItems:"center"
    },
    categoryTitle:{
        fontWeight:'bold'
    },
    categoryScore:{
        fontWeight:'normal'
    },
    categoryDescription:{
        fontSize:12,
        color:'#3a3b3c'
    }
}));

const InfoTooltip = withStyles({
    tooltip: {
      color: "black",
      backgroundColor: "transparent",
      fontSize:12
    }
})(Tooltip);


export {useCategoryStyles as default, InfoTooltip};