import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios'

export default function App() {
  const [results, setResults] = useState([])
  const [query, setQuery] = useState("react hooks")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const searchInputRef = useRef()

  useEffect(() => {
        getResults()
  }, [])

  const getResults = async () => {
    setLoading(true)
    try {
      const response = await axios.get(
        `http://hn.algolia.com/api/v1/search?query=${query}`
        );
        setResults(response.data.hits);
      } catch (err) {
        setError(err)
      }
      setLoading(false)   
  };

  const handleSearch = event => {
    event.preventDefault()
    getResults()
  }

  const handleClearSearch = () => {
    setQuery("");
    searchInputRef.current.focus();
  }

  return (
    <div className="container max-w-md mx-auto p-4 m-6 bg-purple-100 shadow-lg rounded">
      <img src="https://icon.now.sh/react/c0c" alt=""></img>
      <h1 className="font-thin text-grey-darkest">Hooks News</h1>
    <form onSubmit={handleSearch} className="mb-2">
      <input 
        type="text"
        onChange={event => setQuery(event.target.value)}
        value={query}
        ref={searchInputRef}
        className="border p-1 rounded"
      />
      <button 
        type="submit" 
        className="bg-yellow-400 rounded m-1 p-1"
      >
        Search
      </button>
      <button 
        type="button" 
        className="bg-blue-200 text-white p-1 rounded" 
        onClick={handleClearSearch}
      >
        Clear
      </button>
    </form>
    {loading ? (
      <div className="font-bold text-yellow-600">Loading results...</div>
    ) : (
    <ul className="list-reset leading-normal">
      {results.map(result => (
        <li key={result.objectID}>
          <a 
            href={result.url}
            className="text-blue-500 hover:text-blue-800"
          >{result.title}</a>
        </li>
      ))}
      </ul>)}
      {error && <div className="text-red">{error.message}</div>}
    </div>
  )
}