import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Highlight, connectAutoComplete, InstantSearch, Index, Configure } from 'react-instantsearch-dom';
import AutoSuggest from 'react-autosuggest';
import algoliasearch from 'algoliasearch/lite';

class AutoComplete extends Component {
  static propTypes = {
    hits: PropTypes.arrayOf(PropTypes.object).isRequired,
    currentRefinement: PropTypes.string.isRequired,
    refine: PropTypes.func.isRequired,
    onSuggestionSelected: PropTypes.func.isRequired,
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

  getSuggestionValue(hit) {
    return hit.name;
  }

  renderSuggestion(hit) {
    return <Highlight attribute="name" hit={hit} tagName="mark" />;
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
  onSuggestionSelected
}) => {
  const searchClient = algoliasearch(algoliaId, algoliaKey);
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
