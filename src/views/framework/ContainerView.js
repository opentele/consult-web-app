import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import BaseView from "./BaseView";
import ConsultAppBar from "../../components/ConsultAppBar";
import {BottomNavigation, BottomNavigationAction, Box} from "@material-ui/core";
import SecurityIcon from '@mui/icons-material/Security';
import PeopleIcon from '@mui/icons-material/People';
import HomeIcon from '@mui/icons-material/Home';
import {Paper} from "@mui/material";
import {i18n} from "consult-app-common";
import {Link} from 'react-router-dom'

const styles = theme => ({});

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
        activeTab: PropTypes.oneOf(['home','client', 'users']),
    }

    render() {
        const {classes, children, activeTab} = this.props;
        return <Box>
            <ConsultAppBar/>
            {children}
            <Paper sx={{position: 'fixed', bottom: 0, left: 0, right: 0}} elevation={3}>
                <BottomNavigation
                    showLabels
                    value={tabIndexes[activeTab]}
                    onChange={(event, newValue) => {}}>
                    <BottomNavigationAction component={Link} to="/" label="Home" icon={<HomeIcon/>}/>
                    <BottomNavigationAction component={Link} to="/clients" label={i18n.t('client-navigation-icon')} icon={<PeopleIcon/>}/>
                    <BottomNavigationAction component={Link} to="/users" label={i18n.t('manage-users-menu-item')} icon={<SecurityIcon/>}/>
                </BottomNavigation>
            </Paper>
        </Box>;
    }
}

export default withStyles(styles)(ContainerView);
