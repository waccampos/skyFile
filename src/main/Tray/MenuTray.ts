import { Menu } from 'electron'

interface IMenuTray {
  app: Electron.App
  BrowserWindow: Electron.BrowserWindow
}
export const createMenuTray = ({ app, BrowserWindow }: IMenuTray): Electron.Menu => {
  const menu = Menu.buildFromTemplate([
    {
      label: 'Show',
      click: (): void => {
        BrowserWindow.show()
      }
    },
    {
      label: 'Hide',
      click: (): void => {
        BrowserWindow.hide()
      }
    },
    {
      label: 'Quit',
      click: (): void => {
        app.quit()
      }
    }
  ])

  return menu
}
