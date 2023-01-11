import {Box, Skeleton} from "@mui/material";
import React from "react";

export default function () {
    return <Box style={{padding: 50}}>
        <Skeleton style={{width: "100%"}} variant="rectangular" height={40} animation="wave"/>
        <Skeleton style={{width: "100%", marginTop: 10}} variant="rectangular" height={40} animation="wave"/>
        <Skeleton style={{width: "100%", marginTop: 10}} variant="rectangular" height={40} animation="wave"/>
    </Box>
}
