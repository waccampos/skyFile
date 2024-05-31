import { useDropzone } from 'react-dropzone'
import { LuArchiveRestore } from 'react-icons/lu'
import { Dots } from '../dots'
import { forwardRef, useState, useImperativeHandle, useEffect } from 'react'
import Hotkeys from 'react-hot-keys'
import { usePostFile } from '../../hooks/usePostFile'

export const AreaDrop = forwardRef((_props, ref) => {
  const [files, setFiles] = useState<File[]>([])
  useEffect(() => {
    const handleReadFileClipboardResponse = async (_event, data: string): Promise<void> => {
      if (!data) return

      const response = await fetch(`data:image/png;base64,${data}`)
      const blob = await response.blob()

      const timeStampString = new Date().toISOString().replace(/:/g, '-')
      const file = new File([blob], `${timeStampString}.png`, { type: 'image/png' })
      setFiles((prevFiles) => [...prevFiles, file])
    }

    window.electron.ipcRenderer.on('read-file-clipboard-response', handleReadFileClipboardResponse)

    return (): void => {
      window.electron.ipcRenderer.removeAllListeners('read-file-clipboard-response')
    }
  }, [])

  const { mutate, isPending } = usePostFile()

  useEffect(() => {
    if (files.length > 0) {
      mutate(files, {
        onSuccess: () => {
          setFiles([])
        }
      })
    }
  }, [files])

  const { getInputProps, getRootProps, isDragActive, open } = useDropzone({
    noClick: true,
    multiple: true,
    noKeyboard: true,
    onDrop: (acceptedFiles) => {
      setFiles([...files, ...acceptedFiles])
    }
  })
  useImperativeHandle(ref, () => ({
    open
  }))

  return (
    <div
      {...getRootProps()}
      className="w-72 h-32 border border-dashed flex items-center justify-center gap-2 rounded-sm"
    >
      <Hotkeys
        keyName="ctrl+d"
        onKeyDown={() => {
          open()
        }}
      />
      {isPending && (
        <div className="flex gap-2 items-center">
          <p className="text-white  font-normal align-middle">
            Uploading {files.length} arquives
            <Dots />
          </p>
        </div>
      )}
      {isDragActive && !isPending && (
        <div className="flex items-center justify-center gap-2 ">
          <p className="text-white  font-normal align-middle ">drop for starting upload...</p>
        </div>
      )}
      {!isDragActive && !isPending && (
        <div className="flex items-center justify-center gap-2">
          <p className="text-white  font-normal align-middle ">drop your arquive here </p>
          <LuArchiveRestore className="text-white" />
        </div>
      )}

      <input {...getInputProps()} />
    </div>
  )
})
AreaDrop.displayName = 'AreaDrop'
