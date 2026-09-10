import { useEffect, useState } from 'react'
import './main-gif.css'


function App(): React.JSX.Element {

  const [gif, setGif] = useState<string | null>(null)

  useEffect(() => {
    async function loadGif(): Promise<void> {
      const savedGif = await window.api.loadGif('study')

      if (savedGif) {
        setGif(savedGif.preview)
      }
    }

    loadGif()

    window.api.onGifUpdated((modeKey) => {
    if (modeKey === 'study') {
      loadGif()
    }
    })
  }, [])

  return (
    <>
      <div>
        {gif && (
            <img
            src={gif}
            alt="GIF"
            className="main-gif"
            />
        )}
      </div>
    </>
  )
}

export default App
