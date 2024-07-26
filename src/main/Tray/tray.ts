import { app, BrowserWindow, Menu, Tray } from 'electron'
import { join } from 'path'

export function createTray(window: BrowserWindow): Tray {
  const icon = join(__dirname, '../../resources/up.png')
  const tray = new Tray(icon)

  tray.setToolTip('SkyFile')
  const menu = Menu.buildFromTemplate([
    {
      label: 'Show',
      click: (): void => {
        window.show()
      }
    },
    {
      label: 'Hide',
      click: (): void => {
        window.hide()
      }
    },
    {
      label: 'Quit',
      click: (): void => {
        app.quit()
      }
    }
  ])

  tray.setContextMenu(menu)

  return tray
}
