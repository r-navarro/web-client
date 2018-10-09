import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Star from '@material-ui/icons/Star';
import StarBorder from '@material-ui/icons/StarBorder';


class Rating extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            hoverValue: props.value || 0,
            maxValue: props.maxValue || 5,
            value: props.value,
        };
    }


    handleOnClick = index => {
        const { onChange } = this.props;
        this.setState({
            hoverValue: index,
            value: index,
        }, () => onChange(this.state.value));
    }

    handleEnter = index => {
        const newValue = index || 0;
        this.setState({
            hoverValue: newValue
        });
    }

    handleLeave = () => {
        this.setState({
            hoverValue: this.state.value
        });
    }


    render() {
        const { classes } = this.props;

        const rating = [];
        for (let i = 1; i <= this.state.maxValue; i += 1) {
            if (i <= this.state.hoverValue) {
                rating.push(<Star key={i + 1} onClick={() => this.handleOnClick(i)}
                    onMouseLeave={() => this.handleLeave()} />)
            } else {
                rating.push(<StarBorder key={i + 1} onClick={() => this.handleOnClick(i)}
                    onMouseEnter={() => this.handleEnter(i)}
                />)
            }
        }

        return (
            <div className={classes.root}>
                {rating}
            </div>
        );
    }
}

Rating.propTypes = {
    classes: PropTypes.object.isRequired,
};


const styles = theme => ({
    root: {
        flexGrow: 1,
        marginLeft: '8px',
        marginRight: '8px',
        marginBottom: '8px',
        marginTop: '16px',
        maxWidth: '75%',
        color: 'orange',
    },
});

export default withStyles(styles)(Rating);