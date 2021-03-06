import React from 'react';
import {connect} from 'react-redux';
import {Redirect, Link} from 'react-router-dom';

const requiresLogin = Component => {
  class RequiresLogin extends React.Component {

    render() {
      const {hasToken, loading, error, ...otherProps} = this.props.auth;

      if (loading) {
        return <main className='authenticating'><h2>Authenticating...</h2></main>;
      };

      if (error) {
        console.error('Req Login Error:', error);
        return <main className='reqLogin-error'>
          <p>An error has occured, try logging back <Link to='/login'>in</Link></p>
        </main>
      }

      if (hasToken) {
        return <Component {...otherProps} />;
      };

      return <Redirect to='/' />;
    };
  };

  const displayName = Component.displayName || Component.name || 'Component';
  RequiresLogin.displayName = `RequiresLogin(${displayName})`;

  const mapStateToProps = ({auth}) => ({
    auth: {
      hasToken: auth.token ? true : false,
      loading: auth.loading,
      error: auth.error
    }
  });

  return connect(mapStateToProps)(RequiresLogin);
};

export default requiresLogin;