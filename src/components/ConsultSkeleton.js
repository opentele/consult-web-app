import {Box, LinearProgress, Skeleton} from "@mui/material";
import React from "react";

function MultipleSkeletons({height, margin}) {
    return <Box style={{padding: 50, width: "100%"}}>
        <Skeleton style={{width: "100%"}} variant="rectangular" height={height}/>
        <Skeleton style={{width: "100%", marginTop: margin}} variant="rectangular" height={height}/>
        <Skeleton style={{width: "100%", marginTop: margin}} variant="rectangular" height={height}/>
    </Box>
}

export function TableSkeleton() {
    return <MultipleSkeletons height={40} margin={20}/>;
}

export function CardsSkeleton() {
    return <MultipleSkeletons height={60} margin={40}/>;
}

export function ContainerSkeleton() {
    return <Box style={{width: "500px"}}>
        <CardsSkeleton/>
    </Box>
}

export function SkeletonView() {
    return <Box style={{width: "100%", padding: 50}}>
        <Skeleton style={{width: "100%"}} variant="rectangular" height={10}/>
        <Skeleton style={{width: "100%", marginTop: 20}} variant="rectangular" height={10}/>
        <Skeleton style={{width: "100%", marginTop: 100}} variant="rectangular" height={40}/>
        <Skeleton style={{width: "100%", marginTop: 40}} variant="rectangular" height={40}/>
        <Skeleton style={{width: "100%", marginTop: 40}} variant="rectangular" height={40}/>
    </Box>;
}
