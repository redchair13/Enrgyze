import { useParams } from 'react-router-dom';

function SearchResults() {
  const { search } = useParams();  // Get the search parameter from the URL

  return (
    <div className="SearchResults">
      <h1>Search Results</h1>
      <p>Showing results for: {decodeURIComponent(search)}</p>  // Display the searched text
    </div>
  );
}

export default SearchResults;
