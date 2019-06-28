import React, {Component} from 'react';
import {connect} from 'react-redux';
import {deleteWorkout} from '../../workouts/workout-actions';
import {deleteExercise} from '../../exercises/exercise-actions';
import '../styling/delete.css';

export class Delete extends Component {
  componentDidMount() {
    document.addEventListener('click', this.handleClick, false);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handleClick, false);
  }

  node = React.createRef();

  handleClick = (e) => {
    if (this.node.current.contains(e.target)) {
      return;
    }
    this.props.setDelete(false);
  }

  onYesDelete({
    type, 
    dispatch, 
    workoutId, 
    itemId
  }) {
    
    if (type === 'workout') {
      return dispatch(deleteWorkout(itemId));
    };

    if (type === 'exercise') {
      return dispatch(deleteExercise(workoutId, itemId));
    }
  };

  render() {
    const {
      type, 
      title, 
      setDelete, 
      exercise,
      workout
    } = this.props;

    const loading = type === 'workout' ? workout.loading : exercise.loading;
    const error = type === 'workout' ? workout.error : exercise.error;
    
    return (
      <div className='' ref={this.node}>
        <h3 className='delete-header'>Delete {type} "{title}" ?</h3>
        <div className='delete-button-container'>
          <button type='button' onClick={() => this.onYesDelete(this.props)}>
            Yes
          </button>
          <button type='button' onClick={() => setDelete(false)}>
            No
          </button>
        </div>
        <div className='delete-status'>
          {
            loading ? <span>Deleting...</span> :
            error ? <span className='error'>{error.message}</span> : null
          }
        </div>
      </div>
    )
  }
}

export const mapStateToProps = ({workout, exercise}) => ({workout, exercise});

export default connect(mapStateToProps)(Delete);