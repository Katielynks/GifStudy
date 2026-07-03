import { app, Tray, Menu, nativeImage, BrowserWindow } from 'electron'

export function createTray(mainWindow: BrowserWindow, iconAsset: string) {
  try {
    const trayImage = nativeImage.createFromPath(iconAsset)
    const tray = new Tray(trayImage)

    const contextMenu = Menu.buildFromTemplate([
      {
        label: 'Show/Hide',
        click: () => {
          if (mainWindow.isVisible()) mainWindow.hide()
          else {
            mainWindow.show()
            mainWindow.focus()
          }
        }
      },

      {
        label: 'Quit',
        click: () => {
          app.quit()
        }
      }
    ])

    tray.setToolTip('GifStudy')
    tray.setContextMenu(contextMenu)

    tray.on('click', () => {
      if (mainWindow.isVisible()) mainWindow.hide()
      else {
        mainWindow.show()
        mainWindow.focus()
      }
    })

    return tray
  } catch (err) {
    console.error('Could not create tray', err)
    return null
  }
}

export default createTray
