import {makeStyles} from '@material-ui/core/styles';

const usePostStyles = makeStyles((theme)=> ({
    imageUpload:{
        boxSizing:"border-box",
        display:'flex',
        flexDirection:'column',
        alignItems:'flex-start',
        justifyContent:'flex-end',
    },
    postContainer:{
        backgroundColor:'white',
        padding:'2%'
    },
    category:{
        display:"flex",
        alignItems:"center"
    },
}));

export default usePostStyles;