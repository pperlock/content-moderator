import {makeStyles} from '@material-ui/core/styles';

const useAssessmentStyles = makeStyles((theme)=> ({
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
        justifyContent:"space-between"
    },
    category:{
        display:"flex",
        alignItems:"center"
    }
}));

export default useAssessmentStyles;
