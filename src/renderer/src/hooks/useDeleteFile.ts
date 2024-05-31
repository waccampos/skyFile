import { UseMutationResult, useMutation } from '@tanstack/react-query'
import { deleteFile } from '@renderer/services'
import { queryClient } from '@renderer/lib/queryClient'

export function useDeleteFile(): UseMutationResult<void, Error, string> {
  const query = useMutation({
    mutationKey: ['deleteFile'],
    mutationFn: deleteFile,
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ['fetchFiles'] })
    }
  })
  return query
}
