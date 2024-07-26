import { useDropzone } from 'react-dropzone'
import { LuArchiveRestore } from 'react-icons/lu'
import { Dots } from '../dots'
import { forwardRef, useState, useImperativeHandle } from 'react'
import Hotkeys from 'react-hot-keys'

import { useReadFileClipboardResponse } from '@renderer/hooks/useReadFileClipboardResponse'
import { useUploadsFiles } from '@renderer/hooks/useUploadsFiles'

export const AreaDrop = forwardRef((_props, ref) => {
  const [files, setFiles] = useState<File[]>([])

  useReadFileClipboardResponse(setFiles)

  const isPending = useUploadsFiles(files, setFiles)

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

  const dots = Dots()

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
            Uploading {files.length} arquives {dots}
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
