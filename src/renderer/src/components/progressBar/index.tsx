export function ProgressBar({ progress }: Readonly<{ progress: number }>): JSX.Element {
  return (
    <div
      role="progressbar"
      aria-valuenow={progress}
      aria-valuemax={100}
      className="w-52 h-5 rounded-lg bg-zinc-600 border border-zinc-400"
    >
      <div className="w-full h-full bg-blue-900 rounded-lg" style={{ width: `${progress}%` }}></div>
    </div>
  )
}
