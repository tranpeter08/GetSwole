import React from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import UserForm from './UserForm';
import {getProfile} from '../user-actions';
import ErrorMessage from '../../misc/components/ErrorMessage';
import '../style/userInfo.css';

export class UserInfo extends React.Component {
  state = {
    edit: false
  }

  componentDidMount() {
    this.props.dispatch(getProfile());
  }

  toggleForm = () => {
    this.setState((state) => ({edit: !state.edit}));
  }

  renderForm(profile) {
    return this.state.edit ? 
      <UserForm 
        initialValues={profile} 
        toggleForm={this.toggleForm} /> 
      : 
      null
  }

  normalizeHeight({height, heightUnit, inches}) {
    
    if (height && heightUnit === 'ft' && inches) {
      return `${height}' ${inches}"`
    }

    if (height && heightUnit === 'ft' && !inches) {
      return `${height}'`
    };

    if (!height && inches) {
      return `${inches}"`
    };
    
    if (!height) {
      return '';
    }

    return `${height} ${heightUnit}`;
  }

  normalizeWeight({weight, weightUnit}) {
    if (weight && weightUnit) {
      return `${weight} ${weightUnit}`
    };

    return ''; 
  };

  renderUserInfo(profile) {
    if (profile) {
      const {
        bodyFat, 
        firstName, 
        lastName
      } = profile;

      const name = `${firstName || ''} ${lastName || ''}`;
    
      return (
        <div className='userInfo-detail-container'>
          <h2>Name: {name.trim()}</h2>
          <p>
            Height:{' '}
            <span className='full-height'>{this.normalizeHeight(profile)}</span>
          </p>
          <p>
            Weight:{' '}
            <span className='full-weight'>{this.normalizeWeight(profile)}</span>
          </p>
          <p>Body Fat: <span className='bodyFat'>{bodyFat}</span>%</p>
          <div className='profile-button-container'>
            <button 
              type='button'
              onClick={this.toggleForm}
              aria-label='Edit Profile'
            >
              <i className="edit-profile-icon far fa-edit"></i>
            </button>
          </div>
        </div>
      );
    }
  }

  render() {
  
    const {
      profile,
      loading,
      error
    } = this.props.user;

    if (error && error.code === 401) {
      return <Redirect to='/unauthorized' />
    }

    return (
      <section className='userInfo-section'>
        {this.renderForm(profile)}
        <div className='profile-container'>
          {this.renderUserInfo(profile)}
          {error && <ErrorMessage message={error.message} />}
        </div>
      </section>
    )
  }
}

export const mapStateToProps = ({user}) => {
  return {user}
};

export default connect(mapStateToProps)(UserInfo);