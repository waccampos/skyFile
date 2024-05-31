import { Notification } from 'electron'
import { join } from 'path'

export function notification({ title, body }: { title: string; body: string }): void {
  new Notification({
    icon: join(__dirname, '../../resources/up.png'),
    title,
    body
  }).show()
}
