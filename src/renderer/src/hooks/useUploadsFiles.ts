import { Dispatch, SetStateAction, useEffect } from 'react'
import { usePostFile } from './usePostFile'

export function useUploadsFiles(
  files: File[],
  setFiles: Dispatch<SetStateAction<File[]>>
): boolean {
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

  return isPending
}
