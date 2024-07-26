export const useHandlersRenderer = (): {
  ipcHandleQuit: () => void
  ipcHandleHide: () => void
  ctrlvAreaDrop: () => void
} => {
  const ipcHandleQuit = (): void => window.electron.ipcRenderer.send('quit')
  const ipcHandleHide = (): void => window.electron.ipcRenderer.send('hide')
  const ctrlvAreaDrop = (): void => window.electron.ipcRenderer.send('read-file-clipboard')

  return {
    ipcHandleHide,
    ipcHandleQuit,
    ctrlvAreaDrop
  }
}
