import './index.css'
import {Component} from 'react'
import {FaSearch} from 'react-icons/fa'

class SearchContainer extends Component {
  state = {
    searchInput: '',
  }

  onChangeSearchInputs = event => {
    this.setState({searchInput: event.target.value})
  }

  onSubmitSearchInput = event => {
    event.preventDefault()
    const {searchInput} = this.state
    const {onChangeSearchInput} = this.props
    onChangeSearchInput(searchInput)
  }

  render() {
    const {searchInput} = this.state
    return (
      <div className="search-container">
        <form
          onSubmit={this.onSubmitSearchInput}
          className="form-searchInput-container"
        >
          <input
            value={searchInput}
            placeholder="Search"
            type="search"
            onChange={this.onChangeSearchInputs}
            className="search-input"
          />
          <button
            className="search-button"
            type="submit"
            data-testid="searchButton"
          >
            <FaSearch />
          </button>
        </form>
      </div>
    )
  }
}

export default SearchContainer
