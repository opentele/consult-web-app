import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import {AppBar, Box, Dialog, Toolbar, Typography} from "@material-ui/core";
import {i18n} from "consult-app-common";

const styles = theme => ({
    mvcMain: {
        backgroundColor: 'white'
    }
});

class ModalContainerView extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    static propTypes = {
        titleKey: PropTypes.string.isRequired
    };

    render() {
        const {children, titleKey, classes} = this.props;
        return <Dialog open={true} maxWidth="lg">
            <Box className={classes.mvcMain}>
                <AppBar position="sticky">
                    <Toolbar>
                        <Typography variant="h6" component="div">
                            {i18n.t(titleKey)}
                        </Typography>
                    </Toolbar>
                </AppBar>
                {children}
            </Box>
        </Dialog>;
    }
}

export default withStyles(styles)(ModalContainerView);
