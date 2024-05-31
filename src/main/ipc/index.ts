import { BrowserWindow, app, ipcMain, clipboard } from 'electron'
import { notification } from '../Notification'

export function ipcQuit(): void {
  ipcMain.on('quit', () => app.quit())
}

export function ipcHide({ windows }: { windows: BrowserWindow }): void {
  ipcMain.on('hide', () => windows.hide())
}
export function ipcShow({ windows }: { windows: BrowserWindow }): void {
  ipcMain.on('show', () => windows.show())
}

export function ipcCopied(): void {
  ipcMain.on('clipboard', (_event, parametro) => {
    clipboard.writeText(parametro)
    notification({ title: 'Copiado', body: 'Link copiado para a área de transferência!' })
  })
}
export function ipcNotification(): void {
  ipcMain.on('notification', (_event, { title, body }) => {
    notification({
      title,
      body
    })
  })
}
export function ipcClipboardPaste(): void {
  ipcMain.on('read-file-clipboard', (event) => {
    const image = clipboard.readImage('clipboard')
    const buffer = image.toPNG()
    const base64String = buffer.toString('base64')
    event.sender.send('read-file-clipboard-response', base64String)
  })
}
