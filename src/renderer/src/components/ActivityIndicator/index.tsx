import { ReactElement } from 'react'
import { ImSpinner2 } from 'react-icons/im'

export function ActivityIndicator(): ReactElement {
  return <ImSpinner2 className="w-6 h-6 animate-spin text-white" />
}
