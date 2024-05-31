import { ReactElement } from 'react'

export function Header({ title }: Readonly<{ title: string }>): ReactElement {
  return (
    <div className="w-screen h-7 relative rounded-t-lg flex items-center justify-center drag">
      <p className="text-white text-md">{title}</p>
    </div>
  )
}
