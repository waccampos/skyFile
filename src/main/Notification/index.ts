import { Notification } from 'electron'
import { join } from 'path'

export interface INotification {
  title: string
  body: string
}
export function notification({ title, body }: INotification): void {
  new Notification({
    icon: join(__dirname, '../../resources/up.png'),
    title,
    body
  }).show()
}
