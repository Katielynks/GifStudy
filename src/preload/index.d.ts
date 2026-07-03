import { ElectronAPI } from '@electron-toolkit/preload'

interface PreloadApi {
  isCursorInWindow: () => Promise<boolean>
}

declare global {
  interface Window {
    electron: ElectronAPI
    api: Api
  }
}
