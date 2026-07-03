import { screen, BrowserWindow, ipcMain } from 'electron'

let intervalId: NodeJS.Timeout | null = null
const cursorState = new Map<number, boolean>()

export function isCursorInsideWindow(win: BrowserWindow, cursor?: { x: number; y: number }): boolean {
  const bounds = win.getBounds()
  const pt = cursor ?? screen.getCursorScreenPoint()
  return (
    pt.x >= bounds.x &&
    pt.x < bounds.x + bounds.width &&
    pt.y >= bounds.y &&
    pt.y < bounds.y + bounds.height
  )
}

export function startCursorMonitor(pollMs = 250): void {
  // Prevent multiple starts
  if (intervalId) return

  // IPC handler for on-demand snapshots from renderers
  ipcMain.handle('cursor-in-window', (event) => {
    const win = BrowserWindow.fromWebContents(event.sender)
    if (!win) return false
    try {
      return isCursorInsideWindow(win)
    } catch {
      return false
    }
  })

  intervalId = setInterval(() => {
    const windows = BrowserWindow.getAllWindows()
    if (windows.length === 0) return

    const cursor = screen.getCursorScreenPoint()

    for (const win of windows) {
      try {
        const inside = isCursorInsideWindow(win, cursor)
        const prev = cursorState.get(win.id)
        if (prev !== inside) {
          cursorState.set(win.id, inside)
          win.webContents.send('cursor-inside', inside)
        }
      } catch {
        // ignore windows that may have been destroyed concurrently
      }
    }
  }, pollMs)
}

export function stopCursorMonitor(): void {
  if (intervalId) {
    clearInterval(intervalId)
    intervalId = null
  }
  cursorState.clear()
  ipcMain.removeHandler('cursor-in-window')
}
