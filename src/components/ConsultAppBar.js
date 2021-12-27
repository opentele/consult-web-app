import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import {AppBar, Avatar, Box, Button, Container, IconButton, Menu, MenuItem, Toolbar, Tooltip, Typography} from "@material-ui/core";

const styles = theme => ({
    menuItem: {
        color: "#ffffff"
    }
});

const settings = ['Profile', 'Logout'];
const pages = ['My Clients'];

class ConsultAppBar extends React.Component {
    static propTypes = {
        classes: PropTypes.object.isRequired,
        user: PropTypes.object.isRequired
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
        return  <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        {pages.map((page) => (
                            <Button key={page} onClick={this.handleCloseNavMenu()} color="inherit">
                                {page}
                            </Button>
                        ))}
                    </Box>

                    <Box sx={{ flexGrow: 0 }}>
                        <Tooltip title="Open settings">
                            <IconButton onClick={this.handleOpenUserMenu()} sx={{ p: 0 }}>
                                <Avatar alt={user.name} />
                            </IconButton>
                        </Tooltip>
                        <Menu
                            sx={{ mt: '45px' }}
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
