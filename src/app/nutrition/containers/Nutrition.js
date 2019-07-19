import React from 'react';
import {connect} from 'react-redux';
import NutriSearchForm from '../components/NutriSearchForm';
import NutriResult from '../components/NutriResult';
import NutriModal from './NutriModal';
import SearchLoading from '../../misc/components/SearchLoading';
import {getNutrition, getMoreNutri} from '../actions/nutrition-search-actions';
import '../styling/nutrition.css';

export class Nutrition extends React.Component{
  state = {
    modal: false,
    modalData: ''
  };

  handleSearch = term => {
    this.props.dispatch(getNutrition(term));
  }

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
          loading ?  <SearchLoading /> :
          !results ? null :
          results.length === 0 ? 
            <p className='nutri-search-message'>No results found</p> : null
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