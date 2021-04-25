import {makeStyles} from '@material-ui/core/styles';

const useEvaluationStyles = makeStyles((theme)=> ({
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
}));

export default useEvaluationStyles;