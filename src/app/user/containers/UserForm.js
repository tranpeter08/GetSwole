import React from 'react';
import {connect} from 'react-redux';
import {reduxForm, formValueSelector} from 'redux-form';
import UserInputs from '../components/UserInputs';
import SuccessStatus from '../../misc/components/SuccessStatus';
import ErrorMessage from '../../misc/components/ErrorMessage';
import {updateProfile} from '../user-actions';
import '../style/userForm.css';

export class UserForm extends React.Component{
  state={
    success: false
  };

  onSubmit = data => {
    this.props.dispatch(updateProfile(data))
      .then(isSuccessful => 
        isSuccessful ? this.setState({success: true}) : null
      );
  };

  render() {
    const {
      heightUnitValue, 
      toggleForm, 
      handleSubmit,
      submitting,
      user: {error}
    } = this.props;

    return (
      <div className='modal-backdrop'>
        <form onSubmit={handleSubmit(this.onSubmit)} id='profile-form'>
          {
            this.state.success ? 
              <SuccessStatus toggleForm={toggleForm} /> 
              :
              <React.Fragment>
                <fieldset>
                  <legend>Editing Profile</legend>
                  <div className='user-inputs-wrapper'>
                      <UserInputs heightUnitValue={heightUnitValue} />
                  </div>
                </fieldset>
                <div className='userForm-button-container'>
                  <button disabled={submitting} type='submit'>Submit</button>
                  <button 
                    disabled={submitting} 
                    type='button' 
                    onClick={toggleForm}
                  >
                    Close
                  </button>
                </div>
              </React.Fragment>
          }
          {error && <ErrorMessage message={error.message} />}
        </form>
      </div>
    )
  }
}

export const mapStateToProps = (state) => {
  const selector = formValueSelector('UserForm');

  return {
    heightUnitValue: selector(state, 'heightUnit'),
    user: state.user
  };
};

const DecoratedUserForm = reduxForm({
    form: 'UserForm'
})(UserForm);

export default connect(mapStateToProps)(DecoratedUserForm);