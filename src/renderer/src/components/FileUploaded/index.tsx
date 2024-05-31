import { FaCopy } from 'react-icons/fa6'
import { FaTrashAlt } from 'react-icons/fa'
import { useDeleteFile } from '@renderer/hooks/useDeleteFile'

interface FileLinkProps {
  id: string
  name: string
  link: string
}

export function FileLink(props: Readonly<FileLinkProps>): JSX.Element {
  const copiadorLink = (): void => window.electron.ipcRenderer.send('clipboard', props.link)
  const { mutate } = useDeleteFile()

  return (
    <div className="w-72 h-8 p-3 rounded-lg gap-2 cursor-default flex items-center justify-between self-center hover:bg-blue-700">
      <div className="text-white w-80 text-ellipsis overflow-hidden whitespace-nowrap">
        {props.name}
      </div>

      <div className="flex gap-2">
        <button className="cursor-default" onClick={() => mutate(props.name)}>
          <FaTrashAlt
            className="text-zinc-400 hover:text-zinc-200 text-sm font-normal justify-self-end align-middle text "
            size={20}
          />
        </button>
        <button className="cursor-default" onClick={() => copiadorLink()}>
          <FaCopy
            className="text-zinc-400 hover:text-zinc-200 text-sm font-normal justify-self-end align-middle text "
            size={20}
          />
        </button>
      </div>
    </div>
  )
}
