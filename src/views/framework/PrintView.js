import React from "react";
import ReactToPrint from "react-to-print";
import PropTypes from "prop-types";
import ConsultationRecordPrintView from "../consultation/ConsultationRecordPrintView";
import BaseView from "./BaseView";
import ModalContainerView from "./ModalContainerView";
import {Fab} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import PrintIcon from "@mui/icons-material/Print";
import {Box} from "@mui/material";
import GlobalContext from "../../framework/GlobalContext";

const pageStyle = `
  @media print {
    .pagebreak {
      page-break-before: always;
    }
  }
`;

class PrintView extends BaseView {
    componentRef = null;

    constructor(props) {
        super(props);
    }

    static propTypes = {
        consultationSessionRecordId: PropTypes.number,
        client: PropTypes.object.isRequired,
        messageClose: PropTypes.func.isRequired
    };

    handleAfterPrint = () => {
    };

    handleBeforePrint = () => {
    };

    handleOnBeforeGetContent = () => {
        console.log("`onBeforeGetContent` called");
    };

    setComponentRef = (ref) => {
        this.componentRef = ref;
    };

    reactToPrintContent = () => {
        return this.componentRef;
    };

    reactToPrintTrigger = () => {
        return <Fab color="secondary" size="small">
            <PrintIcon/>
        </Fab>;
    };

    render() {
        const {consultationSessionRecordId, client, messageClose} = this.props;

        return (
            <ModalContainerView>
                <Box style={{width: "100%", flexDirection: 'row-reverse', display: "flex", marginTop: -25, paddingRight: 20, backgroundColor: "springgreen"}}>
                    <Fab color="secondary" size="small" onClick={() => messageClose(false)}>
                        <CloseIcon/>
                    </Fab>
                    <ReactToPrint
                        content={this.reactToPrintContent}
                        documentTitle={`${GlobalContext.getOrganisation()} - ${GlobalContext.getUser().name} - ${client.name}`}
                        onAfterPrint={this.handleAfterPrint}
                        onBeforeGetContent={this.handleOnBeforeGetContent}
                        onBeforePrint={this.handleBeforePrint}
                        removeAfterPrint
                        trigger={this.reactToPrintTrigger}
                        pageStyle={""}
                    />
                </Box>
                <ConsultationRecordPrintView consultationSessionRecordId={consultationSessionRecordId} client={client} ref={this.setComponentRef}/>
            </ModalContainerView>
        );
    }
}

export default PrintView;
