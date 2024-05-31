import { Tray } from 'electron'
import { join } from 'path'

// interface ITray {
//   pos?: { x: number; y: number }
//   Menu: Electron.Menu
// }

export function createTray(): Tray {
  const icon = join(__dirname, '../../resources/up.png')
  const tray = new Tray(icon)

  tray.setToolTip('SkyFile')

  return tray
}
