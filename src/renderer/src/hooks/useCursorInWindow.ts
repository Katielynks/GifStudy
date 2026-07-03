import { useEffect, useState } from 'react'

export default function useCursorInWindow(): boolean {
  const [inside, setInside] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return

    const windowIPC = window as any
    if (windowIPC.electron === undefined || windowIPC.electron.ipcRenderer === undefined) return

    const handler = (_: unknown, isInside: boolean) => setInside(Boolean(isInside))
    windowIPC.electron.ipcRenderer.on('cursor-inside', handler)

    // Listen once for the next 'cursor-inside' event so the UI can get an
    // immediate snapshot. The regular listener will receive future updates.
    const onceHandler = (_: unknown, isInside: boolean) => setInside(Boolean(isInside))
    windowIPC.electron.ipcRenderer.once('cursor-inside', onceHandler)

    return () => {
      windowIPC.electron.ipcRenderer.removeListener('cursor-inside', handler)
      windowIPC.electron.ipcRenderer.removeListener('cursor-inside', onceHandler)
    }
  }, [])

  return inside
}
