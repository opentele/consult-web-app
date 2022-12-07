import _ from "lodash";
import CommonCSS from "./CommonCSS";

const tableHeaderL = {
    "& th": {
        color: "rgba(0, 0, 255)",
        ...CommonCSS.tableHeader
    }
};

const tableRowL = {
    "&:nth-of-type(odd)": {
        backgroundColor: "#F8F8FC"
    }
}

class CSS {
    static get th() {
        return tableHeaderL;
    }

    static get tr() {
        return tableRowL;
    }
}

export default CSS;
