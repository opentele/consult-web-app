import _ from "lodash";
import CommonCSS from "./CommonCSS";
import GlobalContext from "../framework/GlobalContext";
import {DarkColors} from "./DarkTheme";

const tableHeaderD = {
    "& th": {
        color: "#6B7CFF",
        ...CommonCSS.tableHeader
    }
};

const tableHeaderL = {
    "& th": {
        color: "#645DF9",
        ...CommonCSS.tableHeader
    }
};

const tableRowL = {
    "&:nth-of-type(odd)": {
        backgroundColor: "#F8F8FC"
    }
}

const tableRowD = {
    "&:nth-of-type(odd)": {
        backgroundColor: DarkColors.DefaultBackground
    }
}

const primaryButtonD = {
    backgroundColor: DarkColors.DefaultBackground,
    ...CommonCSS.primaryButton
}

const primaryButtonL = {
    backgroundColor: "white",
    ...CommonCSS.primaryButton
}

class CSS {
    static get th() {
        return GlobalContext.isDarkTheme() ? tableHeaderD : tableHeaderL;
    }

    static get tr() {
        return GlobalContext.isDarkTheme() ? tableRowD : tableRowL;
    }

    static get PrimaryButton() {
        return GlobalContext.isDarkTheme() ? primaryButtonD : primaryButtonL;
    }
}

export default CSS;
