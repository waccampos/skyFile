import { useMutation, UseMutationResult } from '@tanstack/react-query'
import { uploadFile } from '@renderer/services'
import { queryClient } from '@renderer/lib/queryClient'

export const usePostFile = (): UseMutationResult<void, Error, File[]> => {
  const query = useMutation({
    mutationKey: ['postFiles'],
    mutationFn: uploadFile,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['fetchFiles'] })
    }
  })

  return query
}
