import {makeStyles} from '@material-ui/core/styles';

const useCategoryStyles = makeStyles((theme)=> ({
    infoIcon:{
        color:'rgba(50,50,50,0.5)',
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
    }
}));

export default useCategoryStyles;