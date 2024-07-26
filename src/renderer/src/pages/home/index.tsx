import { AreaDrop, ButtonCustom, Header, Separator } from '../../components'
import { useNavigate } from 'react-router-dom'
import { useRef } from 'react'
import { LuFileInput, LuClipboardCopy, LuArchiveRestore, LuExternalLink } from 'react-icons/lu'
import { BiHide } from 'react-icons/bi'
import Hotkeys from 'react-hot-keys'
import { useHandlersRenderer } from '@renderer/hooks/useOptionsWindow'
type AreaDropRef = {
  open(): unknown
}
export function Home(): JSX.Element {
  const { ipcHandleQuit, ipcHandleHide, ctrlvAreaDrop } = useHandlersRenderer()
  const navigate = useNavigate()
  const areaDropRef = useRef<AreaDropRef>(null)

  return (
    <div className="w-screen h-screen flex-col bg-zinc-900 bg-opacity-95 rounded-lg align-middle items-center self-center ">
      <Hotkeys keyName="ctrl+q" onKeyDown={ipcHandleQuit} />
      <Hotkeys keyName="ctrl+s" onKeyDown={ipcHandleHide} />
      <Hotkeys keyName="ctrl+v" onKeyDown={ctrlvAreaDrop} />
      <Hotkeys
        keyName="ctrl+u"
        onKeyDown={() => {
          navigate('/uploads')
        }}
      />
      <Header title="Sky Files" />
      <div className=" self-center select-none flex mt-1 justify-center items-center flex-col ">
        <AreaDrop ref={areaDropRef} />

        <Separator />

        <ButtonCustom
          name="Select document"
          comand="CRTL + D"
          onClick={() => {
            if (areaDropRef.current) {
              areaDropRef.current.open()
            }
          }}
          icon={<LuFileInput size={20} />}
        />
        <ButtonCustom
          name="Upload from clipboard"
          comand="CRTL + V"
          onClick={ctrlvAreaDrop}
          icon={<LuClipboardCopy size={20} />}
        />

        <ButtonCustom
          name="Recent Uploads"
          comand="CRTL + U"
          onClick={() => {
            navigate('/uploads')
          }}
          icon={<LuArchiveRestore size={20} />}
        />

        <Separator />

        <ButtonCustom
          name="Hide"
          comand="CRTL + S"
          onClick={() => ipcHandleHide()}
          icon={<BiHide size={20} />}
        />
        <ButtonCustom
          name="Quit"
          comand="CRTL + Q"
          onClick={() => {
            ipcHandleQuit()
          }}
          icon={<LuExternalLink size={20} />}
        />
      </div>
    </div>
  )
}
