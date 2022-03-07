import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import {AppBar, Avatar, Box, Button, Container, IconButton, Menu, MenuItem, Toolbar, Tooltip, Typography} from "@material-ui/core";
import {Home} from "@mui/icons-material";
import {Link} from "react-router-dom";
import {BeanContainer, ServerCall} from 'react-app-common';
import {UserService} from "consult-app-common";
import BaseView from "../views/framework/BaseView";
import GlobalContext from '../framework/GlobalContext';

const styles = theme => ({
    toolbar: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between"
    },
    leftSet: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center"
    },
    brandLabel: {
        marginLeft: 20
    },
    menuItem: {
        color: "#ffffff"
    }
});

const pages = [];

class ConsultAppBar extends BaseView {
    static propTypes = {
        classes: PropTypes.object.isRequired
    };

    constructor(props, context) {
        super(props, context);
        this.setState = this.setState.bind(this);
        this.state = {
            anchorElNav: null,
            anchorElUser: null,
            serverCall: ServerCall.createInitial()
        };
    }

    logoutHandler() {
        return () => {
            BeanContainer.get(UserService).logout().then((response) => {
                this.serverResponseReceived({anchorElNav: null}, response);
                GlobalContext.setUser(null);
            });
            this.serverCallMade();
        }
    }

    handleOpenUserMenu() {
        return (event) => this.setState({anchorElUser: event.currentTarget});
    }

    handleCloseNavMenu() {
        return (event) => this.setState({anchorElNav: null});
    }

    handleCloseUserMenu() {
        return (event) => this.setState({...this.state, anchorElUser: null});
    }

    render() {
        const {classes} = this.props;
        return <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters className={classes.toolbar}>
                    <Box className={classes.leftSet}>
                        <IconButton component={Link} to="/">
                            <div>
                                <Home fontSize="large" style={{color: "#fff"}}/>
                            </div>
                        </IconButton>
                        <Typography variant="h6" className={classes.brandLabel}>OpenTele Consult App</Typography>
                    </Box>
                    <Box>
                        {pages.map((page) => (
                            <Button key={page} onClick={this.handleCloseNavMenu()} color="inherit">
                                {page}
                            </Button>
                        ))}
                    </Box>

                    <Box sx={{flexGrow: 0}}>
                        {GlobalContext.getUser() && <Tooltip title="Open settings">
                            <IconButton onClick={this.handleOpenUserMenu()} sx={{p: 0}}>
                                <Avatar alt={GlobalContext.getUser().name}/>
                            </IconButton>
                        </Tooltip>}
                        <Menu sx={{mt: '45px'}} id="menu-appbar" anchorEl={this.state.anchorElUser}
                              anchorOrigin={{
                                  vertical: 'top',
                                  horizontal: 'right',
                              }}
                              keepMounted
                              transformOrigin={{
                                  vertical: 'top',
                                  horizontal: 'right',
                              }}
                              open={Boolean(this.state.anchorElUser)}
                              onClose={this.handleCloseUserMenu()}>
                            <MenuItem key='profile' onClick={this.handleCloseNavMenu()}>
                                <Typography textAlign="center">Profile</Typography>
                            </MenuItem>
                            <MenuItem key='logout' onClick={this.logoutHandler()}>
                                <Typography textAlign="center">Logout</Typography>
                            </MenuItem>
                        </Menu>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>;
    }
}

export default withStyles(styles)(ConsultAppBar);
