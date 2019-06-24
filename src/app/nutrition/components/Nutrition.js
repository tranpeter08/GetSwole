import React from 'react';
import {connect} from 'react-redux';
import NutriSearchForm from './NutriSearchForm';
import NutriResult from './NutriResult';
import NutriModal from './NutriModal';
import {getNutrition, getMoreNutri} from '../actions/nutrition-search-actions';
import '../styling/nutrition.css';

export class Nutrition extends React.Component{
  state = {
    // text: '',
    // loading: false,
    // results: '',
    // error: '',
    modal: false,
    modalData: '',
    // hasNext: false
  };

  handleSearch = term => {
    this.props.dispatch(getNutrition(term));
  }

  // getResults = term => {
  //   fetch(
  //     `${API_BASE_URL}/nutrition?ingr=${term}`,
  //     {
  //       method: 'GET',
  //       headers: {'Content-Type': 'application/json'}
  //     }
  //   )
  //   .then(res => normalizeRes(res))
  //   .then(this.onSuccess)
  //   .catch(this.onError);
  // }

  // onSuccess = ({hints, text, hasNext}) => {
  //   this.setState((state, props) => ({
  //       loading: false,
  //       results: hints,
  //       text,
  //       hasNext
  //     })
  //   );
  // }

  // onError = err => {
  //   console.error(err);
  //   this.setState({
  //     loading: false,
  //     error: err
  //   });
  // }

  renderResults = results => {
    return results.map((item, index) =>
        <NutriResult
          key={index}
          showModal={this.showModal} 
          {...item} />
    )
  }

  getMoreResults = () => {
    this.props.dispatch(getMoreNutri());
  }

  showModal = modalData => {
    this.setState({modal: true, modalData});
  }

  closeModal = () => {
    this.setState({modal: false, modalData: ''});
  }
  
  render() {
    const {modal, modalData} = this.state;
    const {loading, text, results, hasNext, error} = this.props.nutrition;

    return <section className='nutrition-section'>
      {
        modal ? 
          <NutriModal {...modalData} closeModal={this.closeModal}/>
          : 
          null
      }

      <h2 className='nutri-h2' id='nutri-h2' >Nutrition</h2>

      <NutriSearchForm 
        handleSearch={this.handleSearch} 
        placeholder={'Search for a food'}
        loading={loading}/>
      
      <section className='nutri-search-results'>
        {results ? <h3>Search Results For "{text}"</h3> : null}
        <ul aria-live='polite'>
          {
            error ? <p className='error'>{error.message}</p> :
            !results ? null : 
              this.renderResults(results)
          }
        </ul>
        {
          loading ? <p className='nutri-search-message'>Searching...</p> :
          !results ? null :
          results.length === 0 ? <p className='nutri-search-message'>No results found</p> : null
        }
        {
          !results ? null :
          hasNext ? 
            <div>
              <button 
                id='nutri-searchMore-button' 
                onClick={this.getMoreResults}
                disabled={loading}
              >
                More Results
              </button><br/>
              <a className='to-top-anchor' href='#nutri-h2'>Back to top</a>
            </div>
            :
            null
        }
      </section>
    </section>
  }
}

const mapStateToProps = ({nutrition}) => ({nutrition});

export default connect(mapStateToProps)(Nutrition);