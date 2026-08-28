import { useEffect, useState } from 'react'

export default function useGifPreview(modeKey: string): {
  gifPreview: string | null
  handleGifChange: (event: React.ChangeEvent<HTMLInputElement>) => Promise<void>
} {
  const [gifPreview, setGifPreview] = useState<string | null>(null)

  useEffect(() => {
    async function loadSavedGif(): Promise<void> {
      const savedGif = await window.api.loadGif(modeKey)

      if (savedGif) {
        setGifPreview(savedGif.preview)
      }
    }

    loadSavedGif()
  }, [modeKey])

  async function handleGifChange(
    event: React.ChangeEvent<HTMLInputElement>
  ): Promise<void> {
    const file = event.target.files?.[0]

    if (!file) return

    const data = await file.arrayBuffer()

    await window.api.saveGif(
        modeKey,
        data,
        file.type,
        file.name
    )

    const savedGif = await window.api.loadGif(modeKey)

    if (savedGif) {
        setGifPreview(savedGif.preview)
    }
  }

  return {
    gifPreview,
    handleGifChange
  }
}