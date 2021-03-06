import React, { Component } from 'react';
import {connect} from 'react-redux';
import { Link } from 'react-router-dom';
import WorkoutForm from './WorkoutForm';
import Delete from './Delete';
import '../styling/workout.css';

export class Workout extends Component {
  state= {
    editing: false,
    deleting: false
  };

  setEditing(editing) {
    this.setState({editing});
  };

  setDelete(deleting) {
    this.setState({deleting});
  };

  render() {
    const {workoutName, _id, username} = this.props;
    const {editing, deleting} = this.state;
    const exercisesPath = `/user/${username}/workouts/${workoutName}/exercises`;
    const location = {
      pathname: exercisesPath,
      state: {workoutId: _id}
    };

    if (editing) {

      return (
        <WorkoutForm
          form={_id}
          initialValues={{workoutName, _id}}
          setEditing={(bool) => this.setEditing(bool)}
          action='Editing'
          workoutName={workoutName}
        />
      )
    };
    
    if (deleting) {

      return (
        <Delete
          itemId = {_id}
          type='workout'
          title={workoutName}
          setDelete={(bool) => this.setDelete(bool)}
        />
      )
    };

    return (
      <React.Fragment>
        <h3><Link to={location}>{workoutName}</Link></h3>
        <div className='workout-button-container'>
          <button
            className='workout-edit-button'
            type='button' 
            onClick={() => this.setEditing(true)}>
            Edit
          </button>
          <button 
            className='workout-delete-button'
            type='button' 
            onClick={() => this.setDelete(true)}
          >
            Delete
          </button>
        </div>
        </React.Fragment>
    );
  };
};

export const mapStateToProps = ({auth: {username}}) => ({username});
export default connect(mapStateToProps)(Workout);