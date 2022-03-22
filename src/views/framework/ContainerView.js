import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import BaseView from "./BaseView";
import ConsultAppBar from "../../components/ConsultAppBar";
import {BottomNavigation, BottomNavigationAction, Box, Button} from "@material-ui/core";
import SecurityIcon from '@mui/icons-material/Security';
import PeopleIcon from '@mui/icons-material/People';
import HomeIcon from '@mui/icons-material/Home';
import {Paper} from "@mui/material";
import {i18n} from "consult-app-common";
import {Link, withRouter} from 'react-router-dom'
import BackIcon from "@mui/icons-material/ArrowBack";

const styles = theme => ({
    backButton: {
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
        activeTab: PropTypes.oneOf(['home','client', 'users']),
        showBackButton: PropTypes.bool
    }

    render() {
        const {classes, children, activeTab, showBackButton} = this.props;
        return <Box>
            <ConsultAppBar/>
            {showBackButton && <Button onClick={this.props.history.goBack} variant="text" color="secondary" startIcon={<BackIcon/>} className={classes.backButton}>
                {i18n.t('back-button')}
            </Button>}
            {children}
            <Paper sx={{position: 'fixed', bottom: 0, left: 0, right: 0}} elevation={5}>
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

ContainerView.defaultProps = {
    showBackButton: false
}

export default withStyles(styles)(withRouter(ContainerView));