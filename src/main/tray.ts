import { app, Tray, Menu, nativeImage, BrowserWindow } from 'electron'
import { join } from 'path'
import { is } from '@electron-toolkit/utils'

export function createTray(mainWindow: BrowserWindow, iconAsset: string) {
  try {
    const trayImage = nativeImage.createFromPath(iconAsset)
    const tray = new Tray(trayImage)

    let settingsWindow: BrowserWindow | null = null

    function createSettingsWindow() {
      if (settingsWindow && !settingsWindow.isDestroyed()) {
        settingsWindow.focus()
        return
      }

      settingsWindow = new BrowserWindow({
        width: 480,
        height: 360,
        title: 'Settings',
        autoHideMenuBar: true,
        webPreferences: {
          preload: join(__dirname, '../preload/index.js'),
          sandbox: false
        }
      })

      if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
        settingsWindow.loadURL(new URL('settings.html', process.env['ELECTRON_RENDERER_URL']).toString())
      } else {
        settingsWindow.loadFile(join(__dirname, '../renderer/settings.html'))
      }
      settingsWindow.on('closed', () => {
        settingsWindow = null
      })
    }

    const contextMenu = Menu.buildFromTemplate([
      {
        label: 'Settings',
        click: () => {
          createSettingsWindow()
        }
      },
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
