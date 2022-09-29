import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@mui/styles';
import BaseView from "./BaseView";
import ConsultAppBar from "../../components/ConsultAppBar";
import {BottomNavigation, BottomNavigationAction, Box, Button} from "@mui/material";
import SecurityIcon from '@mui/icons-material/Security';
import PeopleIcon from '@mui/icons-material/People';
import HomeIcon from '@mui/icons-material/Home';
import {Paper} from "@mui/material";
import {i18n} from "consult-app-common";
import {Link, withRouter} from 'react-router-dom';
import BackIcon from "@mui/icons-material/ArrowBack";
import GlobalContext from "../../framework/GlobalContext";

const styles = theme => ({
    cvContainer: {
        display: "flex",
        flexDirection: "column"
    },
    cvBackButton: {
        alignSelf: 'flex-start',
        marginTop: 10,
        marginBottom: 10,
        marginLeft: 5
    }
});

const tabIndexes = {
    "home": 0,
    "client": 1,
    "users": 2,
};

class ContainerView extends BaseView {
    constructor(props, context) {
        super(props, context);
    }

    static propTypes = {
        activeTab: PropTypes.oneOf(['home', 'client', 'users']),
        showBackButton: PropTypes.bool,
        containerClassName: PropTypes.string,
        onRefresh: PropTypes.func
    }

    render() {
        const {classes, children, activeTab, onRefresh, showBackButton, containerClassName} = this.props;
        return <Box className={[classes.cvContainer, containerClassName]}>
            <ConsultAppBar onRefresh={onRefresh}/>
            {showBackButton && <Button onClick={this.props.history.goBack} variant="text" color="secondary" startIcon={<BackIcon/>} className={classes.cvBackButton}>
                {i18n.t('back-button')}
            </Button>}
            {children}
            <Paper sx={{position: 'fixed', bottom: 0, left: 0, right: 0}} elevation={5}>
                <BottomNavigation
                    showLabels
                    value={tabIndexes[activeTab]}
                    onChange={(event, newValue) => {
                    }}>
                    <BottomNavigationAction component={Link} to="/" label={i18n.t("home")} icon={<HomeIcon/>}/>
                    <BottomNavigationAction component={Link} to="/clients" label={i18n.t('client-navigation-icon')} icon={<PeopleIcon/>}/>
                    {GlobalContext.getUser().canManageUsers() &&
                        <BottomNavigationAction component={Link} to="/users" label={i18n.t('manage-users-menu-item')} icon={<SecurityIcon/>}/>}
                </BottomNavigation>
            </Paper>
        </Box>;
    }
}

ContainerView.defaultProps = {
    showBackButton: false
}

export default withStyles(styles)(withRouter(ContainerView));
