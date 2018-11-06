import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import green from '@material-ui/core/colors/green';
import red from '@material-ui/core/colors/red';
import Button from '@material-ui/core/Button';
import CheckIcon from '@material-ui/icons/Check';
import ErrorIcon from '@material-ui/icons/Error';
import SaveIcon from '@material-ui/icons/Save';

const styles = theme => ({
    root: {
        display: 'flex',
        alignItems: 'center',
    },
    wrapper: {
        margin: theme.spacing.unit,
        position: 'relative',
    },
    buttonSuccess: {
        backgroundColor: green[500],
        '&:hover': {
            backgroundColor: green[700],
        },
    }, buttonError: {
        backgroundColor: red[500],
        '&:hover': {
            backgroundColor: red[700],
        },
    },
    fabProgress: {
        color: green[500],
        position: 'absolute',
        top: -6,
        left: -6,
        zIndex: 1,
    },
    buttonProgress: {
        color: green[500],
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginTop: -12,
        marginLeft: -12,
    },
});

class CircularIntegration extends React.Component {
    state = {
        clicked: false,
    };

    componentWillUnmount() {
        clearTimeout(this.timer);
    }

    handleButtonClick = () => {
        const { onClick } = this.props;
        this.setState({
            clicked: true,
        })
        onClick();
    };

    render() {
        const { classes, loading, hasError } = this.props;
        const { clicked } = this.state;
        let buttonClassname;
        if (clicked && !loading) {
            buttonClassname = classNames({
                [classes.buttonSuccess]: !hasError,
                [classes.buttonError]: hasError,
            });
        }

        return (
            <div className={classes.root}>
                <div className={classes.wrapper}>
                    <Button
                        variant="fab"
                        color="primary"
                        className={buttonClassname}
                        onClick={this.handleButtonClick}
                    >
                        {!clicked || loading ? <SaveIcon /> : (hasError ? <ErrorIcon /> : <CheckIcon />)}
                    </Button>
                    {loading && <CircularProgress size={68} className={classes.fabProgress} />}
                </div>
            </div>
        );
    }
}

CircularIntegration.propTypes = {
    classes: PropTypes.object.isRequired,
};



export default withStyles(styles)(CircularIntegration);