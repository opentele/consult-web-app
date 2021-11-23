import * as React from 'react';
import {Backdrop, CircularProgress} from "@material-ui/core";

export default function WaitBackdrop() {
    return (
        <div>
            <Backdrop sx={{color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1}} open={true}>
                <CircularProgress color="inherit"/>
            </Backdrop>
        </div>
    );
}
