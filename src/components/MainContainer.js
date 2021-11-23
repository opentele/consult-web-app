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
            <AppBar>
                <Toolbar>
                    <Typography variant="h6" className={classes.title}>OPEN TELE - CONSULTATION</Typography>
                </Toolbar>
            </AppBar>
            {children}
        </div>
    );
}

export default MainContainer;
