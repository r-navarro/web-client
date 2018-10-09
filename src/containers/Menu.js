import React from 'react';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import history from '../History'
import { logout } from '../actions';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import MenuIcon from '@material-ui/icons/Menu';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';


const styles = {
    root: {
        flexGrow: 1,
    },
    grow: {
        flexGrow: 1,
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
    },
};

class Menu extends React.Component {

    constructor(props) {
        super(props);
        this.onLogout = this.onLogout.bind(this);
        this.toggleClass = this.toggleClass.bind(this);
        this.state = {
            active: false,
        };
    }

    onLogout() {
        history.push('/logout');
    }

    toggleClass() {
        const currentState = this.state.active;
        this.setState({ active: !currentState });
    };

    render() {

        const { classes } = this.props;

        return (
            <div className='menu'>
                <div >
                    <div className={classes.root}>
                        <Collapse in={this.state.active}>
                            <div className={classes.root}>
                                <AppBar position="static">
                                    <Toolbar>
                                        <Button color="inherit" >Meals</Button>
                                        <Button color="inherit" onClick={this.onLogout}>Logout</Button>
                                        <span className={classes.grow}></span>
                                        <IconButton className={classes.menuButton} color="inherit" aria-label="Menu" onClick={this.toggleClass}>
                                            <MenuIcon />
                                        </IconButton>
                                    </Toolbar>
                                </AppBar>
                            </div>
                        </Collapse>
                    </div>
                </div>
                <div>
                    <Collapse in={!this.state.active}>
                        <MenuIcon onClick={this.toggleClass} className={!this.state.active ? '' : 'invisible'} />
                    </Collapse>
                </div>
            </div>

        )
    }
}

function mapStateToProps(state) {
    state = state.loginState;
    return state
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        doLogout: () => dispatch(logout())
    }
}

export default compose(
    withStyles(styles, {
        name: 'Menu',
    }),
    connect(mapStateToProps, mapDispatchToProps),
)(Menu);