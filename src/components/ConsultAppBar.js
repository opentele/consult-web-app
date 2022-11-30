import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@mui/styles';
import {AppBar, Avatar, Box, Button, Container, IconButton, Menu, MenuItem, Toolbar, Tooltip, Typography} from "@mui/material";
import {Translate, Home, DarkMode, LightMode, AccountCircle, Logout} from "@mui/icons-material";
import {Link} from "react-router-dom";
import {BeanContainer, ServerCall} from 'react-app-common';
import {i18n, UserService} from "consult-app-common";
import BaseView from "../views/framework/BaseView";
import GlobalContext from '../framework/GlobalContext';
import ModalStatus from "../views/framework/ModalStatus";
import EditUser from "../views/access/EditUser";
import ChangeLanguage from "../views/app/ChangeLanguage";

const styles = theme => ({
    toolbar: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between"
    },
    leftSet: {
        display: "flex",
        flexDirection: "row",
        marginLeft: -20,
        alignItems: "center"
    },
    brandLabel: {
        marginLeft: 10,
        color: "white"
    }
});

const pages = [];

const AppBarMenu = function ({onClickHandler, Icon, displayKey, fieldName}) {
    return <MenuItem key={fieldName} onClick={onClickHandler}>
        <Icon/>
        <Typography style={{marginLeft: 10}}>{i18n.t(displayKey)}</Typography>
    </MenuItem>
}

class ConsultAppBar extends BaseView {
    static propTypes = {
        onRefresh: PropTypes.func
    };

    constructor(props, context) {
        super(props, context);
        this.setState = this.setState.bind(this);
        this.state = {
            anchorElNav: null,
            anchorElUser: null,
            profileOpenStatus: ModalStatus.NOT_OPENED,
            changeLanguageStatus: ModalStatus.NOT_OPENED,
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

    getOpenLanguageModalHandler() {
        return () => this.onOpenMenuModal("changeLanguageStatus");
    }
    onOpenMenuModal(modalStatusField) {
        const newState = {};
        newState[modalStatusField] = ModalStatus.OPENED;
        newState["anchorElUser"] = null;
        this.setState(newState);
    }

    handleCloseUserMenu() {
        return (event) => this.setState({...this.state, anchorElUser: null});
    }

    refresh() {
        if (this.props.onRefresh)
            this.props.onRefresh();
    }

    switchToMode() {
        GlobalContext.toggleThemeMode();
    }

    render() {
        const {classes} = this.props;
        const {profileOpenStatus, changeLanguageStatus} = this.state;
        return <>
            <AppBar position="static">
                <Container maxWidth="xl">
                    {profileOpenStatus === ModalStatus.OPENED &&
                    <EditUser messageClose={this.getModalCloseHandler("profileOpenStatus")} userId={GlobalContext.getUser().id}/>}

                    {changeLanguageStatus === ModalStatus.OPENED && <ChangeLanguage messageClose={this.getModalCloseHandler("changeLanguageStatus")}/>}

                    <Toolbar disableGutters className={classes.toolbar}>
                        <Box className={classes.leftSet}>
                            <IconButton component={"a"} href="https://telesathi.com" target="_blank">
                                <Avatar alt="Tele Sathi" src="/ts-logo.png" />
                            </IconButton>
                            <Link variant="h6" className={classes.brandLabel} href="/">{i18n.t('tele-sathi')}</Link>
                        </Box>
                        <Box>
                            {pages.map((page) => (
                                <Button key={page} onClick={this.handleCloseNavMenu()} color="inherit">
                                    {page}
                                </Button>
                            ))}
                        </Box>

                        <Box sx={{flexGrow: 0}}>
                            <IconButton onClick={() => this.switchToMode()}>{GlobalContext.isDarkTheme() ? <LightMode/> : <DarkMode/>}</IconButton>
                            <IconButton style={{marginRight: 10}} onClick={this.getOpenLanguageModalHandler()}><Translate/></IconButton>
                            {GlobalContext.hasUser() && <Tooltip title="Open settings">
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
                                <AppBarMenu onClickHandler={() => this.onOpenMenuModal("profileOpenStatus")}
                                            displayKey="profile-menu-item" fieldName="profile" Icon={AccountCircle}/>
                                <AppBarMenu onClickHandler={this.getOpenLanguageModalHandler()}
                                            displayKey="change-language-menu-item" fieldName="changeLanguage" Icon={Translate}/>
                                <AppBarMenu onClickHandler={this.logoutHandler()}
                                            displayKey="logout-menu-item" fieldName="logout" Icon={Logout}/>
                            </Menu>
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>
        </>;
    }
}

export default withStyles(styles)(ConsultAppBar);
