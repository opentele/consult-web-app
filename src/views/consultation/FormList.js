import BaseView from "../framework/BaseView";
import {Box, Chip, Skeleton} from "@mui/material";
import {ServerCall} from "react-app-common";
import React from "react";
import PropTypes from "prop-types";
import FormService from "../../service/FormService";
import FormMetaData from "../../domain/form/FormMetaData";
import EditIcon from '@mui/icons-material/Edit';
import _ from 'lodash';

class FormList extends BaseView {
    constructor(props) {
        super(props);
        this.state = {
            getAllFormsCall: ServerCall.createInitial([]),
            formMetaDataList: []
        };
    }

    static propTypes = {
        onFormOpen: PropTypes.func.isRequired,
        editedFormIds: PropTypes.array,
        openedForm: PropTypes.object,
        onFormListLoaded: PropTypes.func
    };

    static defaultProps = {
        editedFormIds: [],
        onFormListLoaded: _.noop
    };

    componentDidMount() {
        this.makeServerCall(FormService.getAllForms(), "getAllFormsCall");
    }

    updateServerResponseState(newState, serverCallName) {
        newState.formMetaDataList = ServerCall.getData(newState[serverCallName]).map((x) => new FormMetaData(x));
        this.setState(newState);
    }

    onSuccessfulServerCall(serverCallName, newState) {
        this.props.onFormListLoaded(newState.formMetaDataList);
    }

    render() {
        const {getAllFormsCall, formMetaDataList} = this.state;
        const {onFormOpen, editedFormIds, openedForm} = this.props;
        const formListLoading = ServerCall.noCallOrWait(getAllFormsCall);

        return formListLoading ? <Skeleton style={{width: "100%"}} variant="rectangular" height={40}/> :
            <Box style={{display: "flex", flexDirection: "row-reverse", paddingRight: 20}}>
                {formMetaDataList.map((x: FormMetaData, index) => {
                    const color = x.getId() === openedForm.getId() ? "primary" : "default";
                    const showEditIcon = _.some(editedFormIds, (editedFormId) => editedFormId === x.getId());
                    return <Chip key={index} label={x.getTitle().toUpperCase()} clickable color={color}
                                 icon={showEditIcon && <EditIcon/>}
                                 onClick={() => onFormOpen(x)}/>;
                })}
            </Box>;
    }
}

export default FormList;
