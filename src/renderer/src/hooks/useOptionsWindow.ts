export const useOptionsWindow = (): { ipcHandleQuit: () => void; ipcHandleHide: () => void } => {
  const ipcHandleQuit = (): void => window.electron.ipcRenderer.send('quit')
  const ipcHandleHide = (): void => window.electron.ipcRenderer.send('hide')

  return {
    ipcHandleHide,
    ipcHandleQuit
  }
}
