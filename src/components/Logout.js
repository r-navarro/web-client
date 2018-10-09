import React from 'react';
import { connect } from 'react-redux';
import { logout, fetchHeader } from '../actions';
import history from '../History'

class Logout extends React.Component {

    constructor(props) {
        super(props);
        const { doLogout, doFetchHeader } = this.props;
        doFetchHeader('logout', 'GET').then(() => {
            localStorage.removeItem('logged');
            doLogout();
            history.push('/login');
        });
    }

    render() {
        return (
            <div></div>
        )
    }

}

function mapStateToProps(state) {
    state = state.loginState;
    return state
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        doLogout: () => dispatch(logout()),
        doFetchHeader: (url, method) => dispatch(fetchHeader(url, method)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Logout)