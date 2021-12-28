import {AppBar, Toolbar, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/styles";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        marginTop: 100
    }
}));

function MainContainer({children}) {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            {children}
        </div>
    );
}

export default MainContainer;
