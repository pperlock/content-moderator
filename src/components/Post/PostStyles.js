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
    fileButton:{
        backgroundColor:"black",
        color:'white'
    },
    fileUpload:{
        display:"flex",
        alignItems:"center", 
    },
    dropFileText:{
        marginLeft:10,
        paddingLeft:10,
        borderLeft: '1px solid black'
    },
    uploadedText:{
        fontWeight:'bold',
        paddingTop:30,
        marginLeft:'2%'
    },
    uploadedFileName:{
        fontWeight:'normal'
    }
}));

export default usePostStyles;