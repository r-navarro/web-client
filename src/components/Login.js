import React from 'react';
import { connect } from 'react-redux';
import { login, loginError, logout, fetchHeader } from '../actions';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import AccountCircle from '@material-ui/icons/AccountCircle';
import history from '../History'

class Login extends React.Component {

    constructor(props) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onSubmit = event => {
        const { credentials, doLogin, doLoginError, doFetchHeader } = this.props;
        event.preventDefault();
        doFetchHeader('login', 'POST', credentials).then(result => {
            if (result.status === 200) {
                localStorage.setItem('logged', true);
                doLogin();
                history.push('/');
            } else {
                doLoginError();
            }
        })

    }

    handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            this.onSubmit(event);
        }
    }

    render() {
        const { credentials, loginError } = this.props;
        return (
            <div className="loginForm" onKeyPress={this.handleKeyPress}>
                <div className="loginHeader">
                    <AccountCircle className="loginCircle" />
                    <div> Login </div>
                </div>
                <div className="loginFieldsWrapper">
                    <span className="loginFields">
                        <TextField type="text" name="name" label="Login" fullWidth
                            onChange={event => { credentials.userName = event.target.value }}
                        />
                    </span>
                    <span className="loginFields">
                        <TextField type="Password" name="password" label="Password" fullWidth
                            onChange={event => { credentials.password = event.target.value }}
                        />
                    </span>

                    {loginError &&
                        <span className="badLogin">{'Bad login !'}</span>
                    }
                    <span className="loginFields">
                        <Button raised="true" color="primary" onClick={this.onSubmit}>
                            Login
						</Button>
                    </span>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    state.loginState.isLoading = state.fetchReducer.isLoading;
    state = state.loginState;
    return state
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        doLogin: () => dispatch(login()),
        doLogout: () => dispatch(logout()),
        doLoginError: () => dispatch(loginError()),
        doFetchHeader: (url, method, body) => dispatch(fetchHeader(url, method, body)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)