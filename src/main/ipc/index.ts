import { BrowserWindow, app, ipcMain, clipboard } from 'electron'
import { INotification, notification } from '../Notification'
import { CreateNameFile, getFileNamePath, getMimeType, isFile, isImageinClipboard } from '../util'
import { readFile } from 'fs'

export interface Iclipboard {
  clipboard: string
  Notification?: INotification
}

export function initializeIpcListeners(window: BrowserWindow): void {
  ipcMain.on('hide', () => window.hide())

  ipcMain.on('quit', () => app.quit())

  ipcMain.on('read-file-clipboard', (event) => {
    const clip = clipboard.readText('clipboard')
    const image = clipboard.readImage()

    console.log(clip)

    if (isFile(clip)) {
      readFile(clip, (err, data) => {
        if (err)
          notification({
            title: 'Error',
            body: err.message
          })
        const s = new File([data], getFileNamePath(clip))
        console.log(s.type)
        event.sender.send('read-file-clipboard-response', {
          name: getFileNamePath(clip),
          type: getMimeType(clip),
          data
        })
      })
      return
    }

    if (isImageinClipboard(image)) {
      event.sender.send('read-file-clipboard-response', {
        name: CreateNameFile(),
        type: 'image/png',
        data: image.toPNG()
      })
      return
    }

    if (!isFile(clip) && !isImageinClipboard(image)) {
      notification({
        title: 'Erro ao ler o arquivo',
        body: 'Por favor tente novamente mais tarde.'
      })
    }
  })

  ipcMain.on('clipboard', (_event, parametro: Iclipboard) => {
    clipboard.writeText(parametro.clipboard)
    if (parametro.Notification)
      notification({ title: parametro.Notification.title, body: parametro.Notification.body })
  })

  ipcMain.on('notification', (_event, { title, body }: INotification) => {
    notification({
      title,
      body
    })
  })
}
