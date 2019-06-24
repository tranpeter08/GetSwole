import React from 'react';
import {connect} from 'react-redux';
import NutriDetailLi from './NutriDetailLi'
import {getNutriData} from '../actions/nutrition-detail-actions';
import food from '../food.jpg';
import '../styling/nutriResult-details.css';

export class NutriModal extends React.Component{
  state = {
    select: '',
    // data: null,
    // error: null,
    // loading: false
  };

  componentDidMount() {
    const {food: {foodId}, measures} = this.props;

    this.setState(
      {select: measures[0].uri},
      () => this.handleRequest(foodId, this.state.select)
    );
  };

  handleRequest = (foodId, selectVal) => {
    const data = this.createReqBody(foodId, selectVal);
    this.props.dispatch(getNutriData(data));
  };

  createReqBody = (foodId, measureURI) => {
    return {
      ingredients: 
        [{quantity: 1, measureURI, foodId}],
        yield : 1
    };
  };

  // getNutriData = data => {
  //   const options = {
  //     method: 'POST',
  //     headers: {'Content-Type': 'application/json'},
  //     body: JSON.stringify(data)
  //   };

  //   fetch(
  //     'http://localhost:8080/nutrition',
  //     options
  //   )
  //   .then(res => normalizeRes(res))
  //   .then(this.onSuccess)
  //   .catch(this.onError);
  // }

  // onSuccess = res => {
  //   this.setState({
  //     data: res,
  //     loading: false
  //   });
  // }

  // onError = err => {
  //   this.setState({
  //     error: err,
  //     loading: false
  //   })
  // }

  handleChange = ({target: {value}}) => {
    const {foodId} = this.props.food;
    this.setState(
      {select: value},
      () => this.handleRequest(foodId, this.state.select)
    );
  };

  renderOptions = () => {
    return this.props.measures.map(this.mapMeasure);
  }

  mapMeasure = ({label, uri}) => {
    return <option key={uri} value={uri}>{label}</option>
  }

  renderNutri = ({totalNutrients}) => {
    let nutriData = [];
    for (const nutrient in totalNutrients) {
      nutriData.push(
        <NutriDetailLi key={nutrient} {...totalNutrients[nutrient]} />
      )
    }

    return nutriData;
  }

  render() {
    const {
      food: {label, image, brand},
      closeModal,
      nutriDetail: {loading, data, error}
    } = this.props;

    return (
      <div className='modal-backdrop'>

        <div className='nutriResult-details'>
          <img src={image || food} alt='Result' />
          <h4>{label}</h4>
          <h5>{brand ? `(${brand})` : null}</h5>

          <section className='nutriResult-details-facts'>
            <label>Show Nutrition Facts Per:
              <select
                name='measurement' 
                value={this.state.select}
                onChange={this.handleChange}
              >
                {this.renderOptions()}
              </select>
            </label>
            <hr/>
            {
              error ? <div>{error.message || 'Server Error'}</div> :
              loading ? <div>Loading...</div> :
              data ? 
                <ul id='nutrient-list'>
                  <li>
                    <strong className='nutrient-title'>Total Calories:</strong>{' '}
                    <span>{data.calories}</span>
                  </li>
                  <li>
                    <strong className='nutrient-title'>Total Weight:</strong>{' '}
                    <span>{Math.round(data.totalWeight * 100 ) / 100} g</span>
                  </li>
                  {this.renderNutri(data)}
                </ul>
                : 
                null
            }
            <hr/>
          </section>

          <button
            className='nutriResult-details-button' 
            type='button' 
            onClick={closeModal}
          >
            Close
          </button>

        </div>
      </div>
    )
  }
}

const mapStateToProps = ({nutriDetail}) => ({nutriDetail});

export default connect(mapStateToProps)(NutriModal);