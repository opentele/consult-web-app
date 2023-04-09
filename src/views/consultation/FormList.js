import BaseView from "../framework/BaseView";
import {Box, Chip, Skeleton} from "@mui/material";
import {ServerCall} from "react-app-common";
import React from "react";
import PropTypes from "prop-types";
import FormService from "../../service/FormService";
import FormMetaData from "../../domain/FormMetaData";

class FormList extends BaseView {
    constructor(props) {
        super(props);
        this.state = {
            getAllFormsCall: ServerCall.createInitial([]),
        };
    }

    static propTypes = {
        onFormOpen: PropTypes.func.isRequired
    };

    componentDidMount() {
        this.makeServerCall(FormService.getAllForms(), "getAllFormsCall");
    }

    render() {
        const {getAllFormsCall} = this.state;
        const {onFormOpen} = this.props;
        const formListLoading = ServerCall.noCallOrWait(getAllFormsCall);
        const formMetaDataList = ServerCall.getData(getAllFormsCall).map((x) => new FormMetaData(x));

        return formListLoading ? <Skeleton style={{width: "100%"}} variant="rectangular" height={40}/> :
            <Box style={{display: "flex", flexDirection: "row-reverse", paddingRight: 20}}>
                {formMetaDataList.map((x: FormMetaData, index) => <Chip key={index} label={x.getTitle().toUpperCase()} clickable
                                                                       onClick={() => onFormOpen(x)}/>)}
            </Box>;
    }
}

export default FormList;
