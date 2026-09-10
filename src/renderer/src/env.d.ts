/// <reference types="vite/client" />

interface GifData {
  preview: string
  fileName: string
}

interface Window {
  api: {
    saveGif: (
      modeKey: string,
      data: ArrayBuffer,
      mimeType: string,
      fileName: string
    ) => Promise<void>

    loadGif: (modeKey: string) => Promise<GifData | null>
        onGifUpdated: (
        callback: (modeKey: string) => void
        ) => void
    }
}