import { FileLinks } from '@renderer/types'
import { UseQueryResult, useQuery } from '@tanstack/react-query'
import { fetchFiles } from '@renderer/services'

export function useFetchFiles(): UseQueryResult<FileLinks[], Error> {
  const query = useQuery({ queryKey: ['fetchFiles'], queryFn: fetchFiles })
  return query
}
