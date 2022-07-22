import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@mui/styles';
import FormLabel from "../FormLabel";
import {MenuItem, Select} from "@mui/material";
import {Box, Chip, OutlinedInput} from "@mui/material";
import {ServerCall} from "react-app-common";
import WaitView from "../WaitView";
import EntityCollection from "../../domain/EntityCollection";
import {i18n, UserService} from "consult-app-common";
import BaseView from "../../views/framework/BaseView";
import Provider from "../../domain/Provider";
import _ from 'lodash';

const styles = theme => ({
    epContainer: {
        flexDirection: "column",
        display: "flex",
        alignItems: "flex-start"
    }
});

class EditProviders extends BaseView {
    constructor(props, context) {
        super(props, context);
        this.state = {
            getProvidersCall: ServerCall.createInitial([]),
        }
    }

    static propTypes = {
        containerClassName: PropTypes.string,
        providers: PropTypes.array.isRequired,
        onUpdate: PropTypes.func.isRequired
    };

    componentDidMount() {
        this.makeServerCall(UserService.getUsers(), "getProvidersCall");
    }

    onProvidersChanged(e) {
        const providerIds = e.target.value;
        const allProviders = ServerCall.getData(this.state.getProvidersCall);
        this.props.onUpdate(EntityCollection.getEntities(allProviders, providerIds));
    }

    render() {
        const {getProvidersCall} = this.state;
        const {classes, containerClassName, providers} = this.props;
        if (ServerCall.noCallOrWait(getProvidersCall))
            return <WaitView/>;

        const allProviders = ServerCall.getData(getProvidersCall);
        const providerIds = EntityCollection.getIds(providers);

        return (<Box className={[containerClassName, classes.epContainer]}>
            <FormLabel textKey="providers"/>
            <Select multiple value={_.isEmpty(providerIds) ? [-1] : providerIds}
                    onChange={(e) => this.onProvidersChanged(e)}
                    input={<OutlinedInput id="select-multiple-chip" label="Chip"/>}
                    renderValue={(providerIds) => (
                        <Box sx={{display: 'flex', flexWrap: 'wrap', gap: 0.5}}>
                            {
                                providerIds.map((providerId) => {
                                    return <Chip key={providerId}
                                                 label={providerId === -1 ? i18n.t("select-provider") : EntityCollection.getEntity(providers, providerId).name}/>
                                })
                            }
                        </Box>
                    )}>
                {allProviders.map((provider) => (
                    <MenuItem key={provider.id} value={provider.id}>
                        {provider.name}
                    </MenuItem>
                ))}
            </Select>
        </Box>);
    }
}

export default withStyles(styles)(EditProviders);
