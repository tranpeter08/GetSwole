import React from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import Navigation from './navigation/containers/Navigation';
import RefreshModal from './RefreshModal';
import {logOut, refreshToken} from './auth/auth-actions';
import {Footer} from './footer/Footer';
import NotFound from './misc/components/NotFound';
import Routes from './routes/Routes';
import {config} from './routes/config';

class App extends React.Component{
  state = {
    modal: false,
    interval: 50,   // minutes
    timeout: 1      // minutes
  };

  componentDidMount() {
    if (this.props.hasToken){
      this.props.dispatch(refreshToken());
    };
  }

  componentDidUpdate(prevProps) {
    if (!prevProps.loggedIn && this.props.loggedIn) {
      this.startRefreshInterval();
    }

    if (prevProps.loggedIn && !this.props.loggedIn) {
      this.clearRefreshInterval();
      this.clearTimer();
    }
  };

  componentWillUnmount() {
    this.clearRefreshInterval();
    this.clearTimer();
  };

  startRefreshInterval = () => {
    this.refreshInterval = setInterval(
      () => {this.openModal()}, 
      this.state.interval * 60 * 1000
    );
  };

  clearRefreshInterval = () => {
    if (!this.refreshInterval) {
      return;
    };
    clearInterval(this.refreshInterval);
  };

  startTimer = () => {
    this.endSessionTimer = setTimeout(
      this.endSession,
      this.state.timeout * 60 * 1000
    );
  };

  clearTimer = () => {
    if (!this.endSessionTimer) {
      return;
    };
    clearTimeout(this.endSessionTimer);
  }

  endSession = () => {
    this.setState(
      {modal: false},
      () => {
        this.clearTimer();
        this.props.dispatch(logOut());
      }
    );
  };

  openModal = () => {
    this.setState(
      {modal: true},
      () => {
        this.clearRefreshInterval();
        this.startTimer();
      }
    );
  };

  closeModalRenew = () => {
    this.setState(
      {modal: false},
      () => {
        this.clearTimer();
        this.startRefreshInterval();
        this.props.dispatch(refreshToken());
      }
    );
  };

  renderModal = () => {
    if (this.state.modal) {
      return <RefreshModal 
        closeModal={this.closeModalRenew}
        endSession={this.endSession}
      />
    }
  };

  render() {
    const {pathname} = this.props.location;
    const paths = config.map(route => route.path.split('/')[1]);
    
    if (!paths.includes(pathname.split('/')[1])) {
      return <NotFound />
    }

    return (
      <React.Fragment>
        {this.renderModal()}
        <header>
          <Navigation />
        </header>
        <Routes />
        <Footer />
      </React.Fragment>
    );
  }
};

const mapStateToProps = ({auth, user}, props) => ({
  loggedIn: user.profile !== '',
  hasToken: auth.token !== '',
  error: auth.error
});

export default withRouter(connect(mapStateToProps)(App));