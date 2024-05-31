import { Header } from '../../components/Header'
import { useNavigate } from 'react-router-dom'
import Hotkeys from 'react-hot-keys'
import { FileLink } from '@renderer/components/FileUploaded'
import { LiaSpinnerSolid } from 'react-icons/lia'
import { ReactElement } from 'react'
import { useFetchFiles } from '@renderer/hooks/useFetchData'
import { BiError } from 'react-icons/bi'
import { TbArrowBack } from 'react-icons/tb'

export function RecentUploads(): ReactElement {
  const navigate = useNavigate()
  const goBack = (): void => navigate(-1)

  const { data, isLoading, isError } = useFetchFiles()

  return (
    <div className="w-screen h-screen flex flex-col bg-zinc-900 bg-opacity-95 rounded-lg align-middle items-center self-center">
      <Hotkeys keyName="ctrl+b" onKeyDown={goBack}></Hotkeys>
      <Header title="Recent Uploads" />
      <button
        className="cursor-pointer  text-white absolute top-0 left-0 text-md -z-500 no-drag p-2"
        onClick={goBack}
      >
        <TbArrowBack />
      </button>
      <div className=" flex flex-col flex-grow overflow-y-auto scroll-container ">
        <div
          className={`flex flex-col ${data?.length ?? 0 >= 1 ? '' : 'items-center justify-center'} gap-1 flex-grow mt-1 pb-1.5`}
        >
          {isLoading && (
            <LiaSpinnerSolid
              className="text-white animate-spin text-xl text-center self-center"
              size={50}
            />
          )}

          {isError && <BiError className="text-white text-xl" size={50} />}

          {!isLoading && !isError && data?.length === 0 && (
            <p className="text-white text-xl">Empty</p>
          )}

          {data?.map((link) => (
            <FileLink key={link.id} name={link.name} link={link.link} id={link.id} />
          ))}
        </div>
      </div>
    </div>
  )
}
