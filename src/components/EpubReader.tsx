import { useEffect, useRef, useState } from 'react'
import { ReactReader } from 'react-reader'
import { EpubProps } from "../types";
import type { Contents, Rendition } from 'epubjs'
import useLocalStorageState from 'use-local-storage-state';
type SearchResult = { cfi: string; excerpt: string } //type for search result

const EpubReader = (props : EpubProps) => {
  const [largeText, setLargeText] = useState(false);
  const [fontSizeState, setFontSizeState] = useState("100%");
  const [location, setLocation] = useLocalStorageState<string | number>(
    'persist-location',
    {
      defaultValue: 0,
    }
  )
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]) //Array that stores the search results from ReactReader
  const [currentResultIndex, setCurrentResultIndex] = useState(0) //Storing the current index for switching to next result
  const rendition = useRef<Rendition | undefined>(undefined)
  const [prevResults, setPrevResults] = useState<SearchResult[]>([])

  useEffect(() => {
    rendition.current?.themes.fontSize(fontSizeState)
  }, [fontSizeState])

  //switching to the next occurence of the search term on click
  const goToNextResult = () => {
    if (!searchResults.length) return
    const nextIndex = (currentResultIndex + 1) % searchResults.length
    setCurrentResultIndex(nextIndex)
    setLocation(searchResults[nextIndex].cfi)
  }

  useEffect(() => {
    if (searchResults.length) setLocation(searchResults[0].cfi) //once search result is returned with data, go to the corresponding page with occurence of search term
    clearHighlights()
    highlightSearchResults(searchResults)
    setCurrentResultIndex(0)
    setPrevResults(searchResults)
    // console.log(searchResults);
  }, [searchResults])

  const highlightSearchResults = (
    results: { cfi: string; excerpt: string }[]
  ) => {
    if (!rendition.current) return
    results.forEach((result) => {
      rendition.current?.annotations.add('highlight', result.cfi)
    })
  }

  const clearHighlights = () => {
    if (!rendition.current) return
    prevResults.forEach((result) => {
      rendition.current?.annotations.remove(result.cfi, 'highlight')
    })
  }

  return (
    <div style={{ height: '100vh' }}>
      <div className="container-comp">
        <input
          type="text"
          placeholder="Search word..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)} //initiating the search whenever the search term changes, can be moved to work on click.
          className="searchInput"
        />

        <button
          onClick={goToNextResult}
          disabled={!searchResults.length}
          className="nextResultBtn"
        >
          Next Result ({searchResults.length > 0 ? currentResultIndex + 1 : 0}
          /{searchResults.length})
        </button>
      </div>
      {/* <div className="container-comp">
        <button onClick={() => {
          const currentFont = fontSizeState.split("%");
          const parseIntFont = parseInt(currentFont[0]);
          const addedFont = parseIntFont + 10;
          const toStrFont = addedFont + "%";
          setFontSizeState(toStrFont);
        }} className="btn">
          Toggle Font Size
        </button>
        <button onClick={() => setFontSizeState("100%")} className="btn">
          Reset Font Size
        </button>
      </div> */}
      <ReactReader
        url={props.src}
        location={location}
        locationChanged={(epubcfi: string) => setLocation(epubcfi)}
        getRendition={(_rendition: Rendition) => {
          rendition.current = _rendition
          rendition.current.themes.fontSize(fontSizeState)
        }}
        searchQuery={searchQuery} //Passing the search term
        onSearchResults={setSearchResults} //Reciever for the search result array
        contextLength={2} //Passing the number of characters for context, By default 30 characters
      />
    </div>
  )
}

export default EpubReader