import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'

// Custom APIs for renderer
const api = {
  saveGif: (
    modeKey: string,
    data: ArrayBuffer,
    mimeType: string,
    fileName: string
  ) => {
    return ipcRenderer.invoke(
      'gif:save',
      modeKey,
      data,
      mimeType,
      fileName
    )
  },

  loadGif: (modeKey: string) => {
    return ipcRenderer.invoke('gif:load', modeKey)
  },

  
  onGifUpdated: (callback: (modeKey: string) => void) => {
    ipcRenderer.on('gif:updated', (_event, modeKey) => {
        callback(modeKey)
    })
  }
}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
  } catch (error) {
    console.error(error)
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI
  // @ts-ignore (define in dts)
  window.api = api
}
