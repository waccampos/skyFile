import { type Dispatch, type SetStateAction, useEffect } from 'react'

export function useReadFileClipboardResponse(setFiles: Dispatch<SetStateAction<File[]>>): void {
  useEffect(() => {
    const handleReadFileClipboardResponse = async (
      _event,
      data: { name: string; type: string; data: Buffer }
    ): Promise<void> => {
      const file = new File([data.data], data.name, { type: data.type })
      setFiles((prevFiles) => [...prevFiles, file])
    }

    window.electron.ipcRenderer.on('read-file-clipboard-response', handleReadFileClipboardResponse)

    return (): void =>
      window.electron.ipcRenderer.removeAllListeners('read-file-clipboard-response')
  }, [])
}
