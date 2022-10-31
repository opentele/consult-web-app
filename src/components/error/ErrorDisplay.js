import React from 'react';
import {withStyles} from '@mui/styles';
import {Box, Button, Container, Typography} from "@mui/material";
import {i18n} from "consult-app-common";
import ConsultAppBar from "../ConsultAppBar";
import PropTypes from 'prop-types';
import {Link} from "react-router-dom";

const styles = theme => ({
    edRoot: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
});

class ErrorDisplay extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    static propTypes = {
        messageKey: PropTypes.string.isRequired
    };

    render() {
        const {classes, messageKey} = this.props;
        return <Box className={classes.edRoot}>
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
                            {i18n.t(messageKey)}
                        </Typography>
                        <br/>
                        <Button variant={"contained"} onClick={() => window.location.replace("/")}>{i18n.t("go-to-home")}</Button>
                    </Box>
                </Container>
            </Box>
        </Box>;
    }
}

export default withStyles(styles)(ErrorDisplay);
