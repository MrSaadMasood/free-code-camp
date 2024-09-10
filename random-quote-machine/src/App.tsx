import { useState, useEffect, useCallback } from 'react'

function App() {
  const [quote, setQuote] = useState({ quote: "", author: "" })

  const generateQuote = useCallback(async () => {
    try {
      const response = await fetch("https://dummyjson.com/quotes/random", {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      })
      const data = await response.json()
      setQuote({ quote: data.quote, author: data.author })
    } catch (error) {
      console.log("The error is ", error)
    }
  }, [])


  useEffect(() => {
    generateQuote()
  }, [generateQuote])

  return (
    <div className="w-screen h-screen bg-black text-white flex justify-center items-center " >
      <div className='h-auto p-3 w-[50rem] bg-white text-black flex flex-col justify-center items-center gap-3'
        id="quote-box" >
        {quote.quote && (
          <div id="text" className=''>{quote.quote}</div>
        )}
        {quote.author && (
          <div id="author" className=''>{quote.author}</div>
        )}
        <button id="new-quote" className='bg-black text-white' onClick={generateQuote}> new Quote </button>
        <a id="tweet-quote" href="https://www.twitter.com/intent/tweet" target='_blank'>Tweet Quote</a>
      </div>
    </div>
  )
}

export default App
