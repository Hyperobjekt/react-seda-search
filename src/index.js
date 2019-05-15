import React, { Component, useMemo } from 'react';
import PropTypes from 'prop-types';
import { Highlight, connectAutoComplete, InstantSearch, Index, Configure } from 'react-instantsearch-dom';
import AutoSuggest from 'react-autosuggest';
import algoliasearch from 'algoliasearch/lite';

/** Renders the input component for search */
const renderInputComponent = (inputProps, onClear) => (
  <div className="react-autosuggest__input-wrapper">
    <input {...inputProps} />
    <button aria-label="clear search text" className="react-autosuggest__clear" onClick={onClear}>&times;</button>
  </div>
);

class AutoComplete extends Component {
  static propTypes = {
    hits: PropTypes.arrayOf(PropTypes.object).isRequired,
    currentRefinement: PropTypes.string.isRequired,
    refine: PropTypes.func.isRequired,
    onSuggestionSelected: PropTypes.func.isRequired,
    onSelectedClear: PropTypes.func.isRequired,
  };

  state = {
    value: this.props.currentRefinement,
  };

  onChange = (event, { newValue }) => {
    this.setState({
      value: newValue,
    });
  };

  onSuggestionsFetchRequested = ({ value }) => {
    this.props.refine(value);
  };

  onSuggestionsClearRequested = () => {
    this.props.refine();
  };

  handleSelectedClear = () => {
    this.setState({
      value: '',
    });
    this.props.onSelectedClear();
  }

  getSuggestionValue(hit) {
    return hit.name;
  }

  renderSuggestion(hit) {
    return <div>
      <Highlight attribute="name" hit={hit} tagName="mark" />
      { hit && hit.city  && ', '}
      { hit && hit.city && 
        <Highlight attribute="city" hit={hit} tagName="mark" />
      }
      { hit && hit.state_name  && ', '}
      <Highlight attribute="state_name" hit={hit} tagName="mark" />
    </div>;
  }

  renderSectionTitle(section) {
    return section.index;
  }

  getSectionSuggestions(section) {
    return section.hits;
  }

  render() {
    const { hits, multiSection, onSuggestionSelected } = this.props;
    const { value } = this.state;

    const inputProps = {
      ...this.props.inputProps,
      onChange: this.onChange,
      value,
    };

    return (
      <AutoSuggest
        suggestions={hits}
        multiSection={multiSection}
        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
        onSuggestionSelected={onSuggestionSelected}
        getSuggestionValue={this.getSuggestionValue}
        renderSuggestion={this.renderSuggestion}
        inputProps={inputProps}
        renderInputComponent={(inputProps) => renderInputComponent(inputProps, this.handleSelectedClear)}
        renderSectionTitle={this.renderSectionTitle}
        getSectionSuggestions={this.getSectionSuggestions}
      />
    );
  }
}


const SedaAutoComplete = connectAutoComplete(AutoComplete);

const SedaSearch = ({
  algoliaId, 
  algoliaKey, 
  indices = [], 
  inputProps,
  onSuggestionSelected,
  onSelectedClear
}) => {
  const searchClient = useMemo(() => {
    let client = false;
    try {
      const algoliaClient = algoliasearch(algoliaId, algoliaKey, {
        _useRequestCache: true,
      });
      client = {
        search(requests) {
          const shouldSearch = requests.some(({ params: { query }}) => query !== '');
          if (shouldSearch) {
            return algoliaClient.search(requests);
          }
          return Promise.resolve({
            results: [{ hits: [] }],
          });
        },
        searchForFacetValues: algoliaClient.searchForFacetValues,
      };
    } catch (e) {
      console.error(e.message)
    } finally {
      return client;
    }
  }, [algoliaId, algoliaKey])
  if (!searchClient) { return <span>Unable to create search client.</span> }
  return (
    indices.length ? 
      <InstantSearch indexName={indices[0]} searchClient={searchClient}>
        <Configure hitsPerPage={5} />
        <SedaAutoComplete 
          inputProps={inputProps}
          multiSection={indices.length > 1}
          onSuggestionSelected={
            (e, { suggestion }) => onSuggestionSelected(suggestion)
          }
          onSelectedClear={
            () => onSelectedClear('Clearing input.')
          }
        />
        {
          indices.map((index,i) =>
            <Index key={index+i} indexName={index} />
          )
        }
      </InstantSearch>

      :
      <span>No indices for search</span>
  )
};

export default SedaSearch
