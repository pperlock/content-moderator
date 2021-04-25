import {makeStyles} from '@material-ui/core/styles';

const useAssessmentStyles = makeStyles(()=> ({
    card:{
        margin:'20px 0',
        padding:'40px'
    },
    flaggedInfo:{
        marginTop:20,
        borderTop:'1px solid grey'
    },
    titleWrapper:{
        padding:10,
        borderTopRightRadius:20,
        borderBottomRightRadius:20,
        backgroundColor:'black',
        color:'white',
        marginBottom:"10px",
        display:"flex",
        justifyContent:"space-between",
        alignItems:"center"
    },
    category:{
        display:"flex",
        alignItems:"center",
    },
    sectionDivider:{
        borderBottom:"1px solid grey",
        margin:'20px 0'
    },
    piiCategory:{
        fontWeight:'bold',
        fontSize:14,
        padding:'15px 0 0 0',
    },
    responseTime:{
        textAlign:"right",
        width:'100%',
        marginBottom:10
    },
    accordionDetails:{
        display:"block"
    },
    noEvaluation:{
        color:"red"
    }
}));

export default useAssessmentStyles;
