import {makeStyles} from '@material-ui/core/styles';

const usePostStyles = makeStyles((theme)=> ({
    icon:{
        marginRight: '20px'
    },
    card:{
        margin:'20px 0',
        padding:'40px'
    },
    slider:{
        height:'20px'
    },
    imageUpload:{
        boxSizing:"border-box",
        display:'flex',
        flexDirection:'column',
        alignItems:'flex-start',
        justifyContent:'flex-end',
        height:'100%',
    },
    form:{
        boxSizing:"border-box",
        width:'100%'
    },
    postContainer:{
        backgroundColor:'white',
        width:'100vw',
        display:"flex",
        justifyContent:"center",
        padding:50
    },
    rightPost:{
        display:"flex",
        flexDirection:"column",
        justifyContent:"center",
        height:'100%',
        paddingBottom:10
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
    }
}));

export default usePostStyles;