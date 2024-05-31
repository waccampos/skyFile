import { app, BrowserWindow, ipcMain } from 'electron'
import { electronApp, optimizer } from '@electron-toolkit/utils'
import { createWindow } from './Window/window'
import { createTray } from './Tray/tray'
import { createMenuTray } from './Tray/MenuTray'
import { ipcCopied, ipcNotification, ipcHide, ipcQuit, ipcClipboardPaste } from './ipc'

app.whenReady().then(() => {
  electronApp.setAppUserModelId('com.electron')

  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  const win = createWindow()
  const menu = createMenuTray({ app, BrowserWindow: win })
  const tray = createTray()
  tray.setContextMenu(menu)

  ipcMain.on('ping', () => console.log('pong'))

  ipcQuit()
  ipcHide({ windows: win })
  ipcCopied()
  ipcNotification()
  ipcClipboardPaste()
  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
