import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field} from 'redux-form';
import WorkoutInput from '../components/WorkoutInput';
import Spinner from '../../misc/components/Spinner';
import {notEmpty} from '../../user/validators';
import {addWorkout, editWorkout, clearErrors} from '../workout-actions';
import '../styling/workoutForm.css'

export class WorkoutForm extends Component {
  constructor(props) {
    super(props);
    this.node = React.createRef();
  };

  componentDidMount() {
    document.addEventListener('click', this.handleClick, false);
  };

  componentWillUnmount() {
    document.removeEventListener('click', this.handleClick, false);
  };

  handleClick = e => {
    if(this.node.current.contains(e.target)){
      return;
    };

    this.props.setEditing(false);
    this.props.dispatch(clearErrors());
  };

  onSubmit = data => {
    if (data.workoutName) {
      const {action, form, dispatch} = this.props;
      if (action === 'Adding') {
        return dispatch(addWorkout(data))
        .then(this.handleResErr);
      };

      if (action === 'Editing') {
        return dispatch(editWorkout(data, form))
          .then(this.handleResErr);
      };
    };
  };

  handleResErr = isError =>  isError ? null : this.props.setEditing(false);

  onCancel() {
    this.props.setEditing(false);
    this.props.dispatch(clearErrors());
  }

  onChange() {
    if(this.props.workout.error){
      this.props.dispatch(clearErrors());
    }
  }

  render() {
    const {
      handleSubmit,
      workout: {error, loading},
      anyTouched,
      submitting
      } = this.props;

    return (
      <form 
        className='workout-form'
        onSubmit={handleSubmit(values => this.onSubmit(values))}
        ref={this.node}
      >
        <Field
          name='workoutName'
          label='Workout Name'
          component={WorkoutInput}
          validate={[notEmpty]}
          onChange={() => this.onChange()}/>
        <div className='workout-button-container'>
          <button className='workoutForm-button-submit'
            type='submit' 
            disabled={submitting}
          >
            {loading ? <Spinner width='55px' height='21px' /> : 'Submit'}
          </button>
          <button 
            type='button' 
            onClick={() => this.onCancel()}
          >
            Cancel
          </button>
        </div>
        <div className='workout-form-status'>
          { 
            anyTouched && error ? 
              <span className='error'>{error.message}</span> 
              : 
              null
          }
        </div>
      </form>
    );
  };
};

export const mapStateToProps = ({workout}, props) => ({workout});

export default connect(mapStateToProps)(reduxForm({
  form: 'WorkoutForm'
})(WorkoutForm));