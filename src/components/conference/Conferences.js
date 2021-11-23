import React, {Component} from "react";
import {withStyles} from '@material-ui/core/styles';
import {Button, Card, CardActions, CardContent, CardHeader, Typography} from "@material-ui/core";

const styles = theme => ({});

class Conferences extends Component {
    constructor(props) {
        super(props);
        this.setState = this.setState.bind(this);
        this.state = {};
    }

    static propTypes = {}

    render() {
        const {
            classes
        } = this.props;

        return <Card sx={{ maxWidth: 345 }}>
            <CardHeader
                title="Shrimp and Chorizo Paella"
                subheader="September 14, 2016"
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    Lizard
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Lizards are a widespread group of squamate reptiles, with over 6,000
                    species, ranging across all continents except Antarctica
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small">Share</Button>
                <Button size="small">Learn More</Button>
            </CardActions>
        </Card>;
    }
}

export default withStyles(styles)(Conferences);
