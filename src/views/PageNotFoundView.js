import React from 'react';
import {withStyles} from '@mui/styles';
import ConsultAppBar from "../components/ConsultAppBar";
import {Box, Container, Typography} from "@mui/material";
import * as PropTypes from "prop-types";
import Button from "@mui/material/Button";

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
                    <Box
                        sx={{
                            alignItems: 'center',
                            display: 'flex',
                            flexDirection: 'column'
                        }}>
                        <Typography
                            align="center"
                            color="textPrimary"
                            variant="h1"
                        >
                            404: The page you are looking for isn’t here
                        </Typography>
                        <Typography
                            align="center"
                            color="textPrimary"
                            variant="subtitle2"
                        >
                            You either tried some shady route or you came here by mistake.
                            Whichever it is, try using the navigation
                        </Typography>
                        <Box sx={{textAlign: 'center'}}>
                            <img
                                alt="Under development"
                                src="/static/images/undraw_page_not_found_su7k.svg"
                                style={{
                                    marginTop: 50,
                                    display: 'inline-block',
                                    maxWidth: '100%',
                                    width: 560
                                }}
                            />
                        </Box>
                        <NextLink
                            href="/"
                            passHref
                        >
                            <Button
                                component="a"
                                startIcon={(<ArrowBackIcon fontSize="small"/>)}
                                sx={{mt: 3}}
                                variant="contained">
                                Go back to dashboard
                            </Button>
                        </NextLink>
                    </Box>
                </Container>
            </Box>
        </Box>;
    }
}

export default withStyles(styles)(ErrorView);
