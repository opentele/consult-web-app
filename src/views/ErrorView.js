import React from 'react';
import {withStyles} from '@mui/styles';
import ConsultAppBar from "../components/ConsultAppBar";
import {Box, Container, Typography} from "@mui/material";
import * as PropTypes from "prop-types";
import {i18n} from "consult-app-common";

const styles = theme => ({
    evRoot: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
});

class ArrowBackIcon extends React.Component {
    render() {
        return null;
    }
}

ArrowBackIcon.propTypes = {fontSize: PropTypes.string};

class NextLink extends React.Component {
    render() {
        return null;
    }
}

NextLink.propTypes = {
    href: PropTypes.string,
    passHref: PropTypes.bool,
    children: PropTypes.node
};

class ErrorView extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    static propTypes = {};

    render() {
        const {classes} = this.props;
        return <Box className={classes.evRoot}>
            <ConsultAppBar/>

            <Box component="main"
                 sx={{
                     alignItems: 'center',
                     display: 'flex',
                     flexGrow: 1,
                     minHeight: '100%'
                 }}>
                <Container maxWidth="md">
                    <Box sx={{
                            alignItems: 'center',
                            display: 'flex',
                            flexDirection: 'column',
                            marginTop: 10}}>
                        <Typography align="center" color="textPrimary" variant="h4">
                            {i18n.t("unknown-error")}
                        </Typography>
                    </Box>
                </Container>
            </Box>
        </Box>;
    }
}

export default withStyles(styles)(ErrorView);
