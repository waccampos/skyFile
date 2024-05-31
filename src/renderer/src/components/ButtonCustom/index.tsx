interface ButtonCustonProps {
  name: string
  comand?: string
  onClick: () => void
  icon?: JSX.Element
}
export function ButtonCustom(props: Readonly<ButtonCustonProps>): JSX.Element {
  return (
    <button
      type="button"
      name={props.name + props.icon}
      className="text-white w-72 h-8 p-3 hover:bg-blue-800 rounded-lg
        gap-2 cursor-default flex items-center justify-between self-center"
      onClick={props.onClick}
    >
      <div className="flex gap-3">
        <p>{props.icon}</p>
        <p>{props.name}</p>
      </div>
      <p className="text-zinc-400 text-sm font-normal justify-self-end align-middle ">
        {props.comand}
      </p>
    </button>
  )
}
