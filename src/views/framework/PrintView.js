import React, {Component} from "react";
import ReactToPrint from "react-to-print";
import PropTypes from "prop-types";
import ConsultationRecordPrintView from "../consultation/ConsultationRecordPrintView";
import BaseView from "./BaseView";
import ModalContainerView from "./ModalContainerView";
import {Fab} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import PrintIcon from "@mui/icons-material/Print";
import {Box} from "@material-ui/core";

class PrintView extends BaseView {
    componentRef = null;

    constructor(props) {
        super(props);

        this.state = {
            isLoading: false,
            text: "old boring text"
        };
    }

    static propTypes = {
        consultationSessionRecordId: PropTypes.number,
        client: PropTypes.object.isRequired,
        messageClose: PropTypes.func.isRequired
    };

    handleAfterPrint = () => {
        console.log("`onAfterPrint` called");
    };

    handleBeforePrint = () => {
        console.log("`onBeforePrint` called");
    };

    handleOnBeforeGetContent = () => {
        console.log("`onBeforeGetContent` called");
        this.setState({ text: "Loading new text...", isLoading: true });

        return new Promise((resolve) => {
            setTimeout(() => {
                this.setState(
                    { text: "New, Updated Text!", isLoading: false },
                    resolve
                );
            }, 2000);
        });
    };

    setComponentRef = (ref) => {
        this.componentRef = ref;
    };

    reactToPrintContent = () => {
        return this.componentRef;
    };

    reactToPrintTrigger = () => {
        // NOTE: could just as easily return <SomeComponent />. Do NOT pass an `onClick` prop
        // to the root node of the returned component as it will be overwritten.

        // Bad: the `onClick` here will be overwritten by `react-to-print`
        // return <button onClick={() => alert('This will not work')}>Print this out!</button>;

        // Good
        return <Fab color="secondary" size="small">
            <PrintIcon/>
        </Fab>;
    };

    render() {
        const {consultationRecordId, client, messageClose} = this.props;

        return (
            <ModalContainerView>
                <ReactToPrint
                    content={this.reactToPrintContent}
                    documentTitle="AwesomeFileName"
                    onAfterPrint={this.handleAfterPrint}
                    onBeforeGetContent={this.handleOnBeforeGetContent}
                    onBeforePrint={this.handleBeforePrint}
                    removeAfterPrint
                    trigger={this.reactToPrintTrigger}
                />
                {this.state.isLoading && (
                    <p className="indicator">onBeforeGetContent: Loading...</p>
                )}
                <Box style={{width: "100%", flexDirection: 'row-reverse', display: "flex", marginTop: -43, paddingRight: 20}}>
                    <Fab color="secondary" size="small" onClick={() => messageClose(false)}>
                        <CloseIcon/>
                    </Fab>
                </Box>
                <ConsultationRecordPrintView consultationSessionRecordId={consultationRecordId} client={client}
                                             messageClose={this.getModalCloseHandler("printModalStatus")} ref={this.setComponentRef}/>
            </ModalContainerView>
        );
    }
}

export default PrintView;
