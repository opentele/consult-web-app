import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import {AppBar, Avatar, Box, Button, Container, IconButton, Menu, MenuItem, Toolbar, Tooltip, Typography} from "@material-ui/core";
import {Home} from "@mui/icons-material";
import {Link} from "react-router-dom";

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

const settings = ['Profile', 'Logout'];
const pages = [];

class ConsultAppBar extends React.Component {
    static propTypes = {
        classes: PropTypes.object.isRequired,
        user: PropTypes.object
    };

    constructor(props, context) {
        super(props, context);
        this.setState = this.setState.bind(this);
        this.state = {
            anchorElNav: null,
            anchorElUser: null
        };
    }

    handleOpenUserMenu() {
        return (event) => this.setState({...this.state, anchorElUser: event.currentTarget});
    }

    handleCloseNavMenu() {
        return (event) => this.setState({...this.state, anchorElNav: null});
    }

    handleCloseUserMenu() {
        return (event) => this.setState({...this.state, anchorElUser: null});
    }

    render() {
        const {classes, user} = this.props;
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
                        {user && <Tooltip title="Open settings">
                            <IconButton onClick={this.handleOpenUserMenu()} sx={{p: 0}}>
                                <Avatar alt={user.name}/>
                            </IconButton>
                        </Tooltip>}
                        <Menu
                            sx={{mt: '45px'}}
                            id="menu-appbar"
                            anchorEl={this.state.anchorElUser}
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
                            {settings.map((setting) => (
                                <MenuItem key={setting} onClick={this.handleCloseNavMenu()}>
                                    <Typography textAlign="center">{setting}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>;
    }
}

export default withStyles(styles)(ConsultAppBar);
