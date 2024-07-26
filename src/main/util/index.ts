import fs from 'fs'
import path from 'path'
export function isURL(str): boolean {
  try {
    new URL(str)
    return true
  } catch (_) {
    return false
  }
}
export function isFile(path: string): boolean {
  try {
    const isFile = fs.statSync(path).isFile()
    return isFile
  } catch (_) {
    return false
  }
}

export function CreateNameFile(): string {
  const date = new Date()
    .toLocaleString('pt-BR', {
      year: 'numeric',
      month: 'short',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    })
    .replace('BRT', '')
    .replace('.', '')
  return date
}

export function getFileNamePath(_path: string): string {
  const name = path.basename(_path)

  return name
}

export function getMimeType(_path: string): string {
  const ext = path.extname(_path)

  const mimeTypes = {
    '.txt': 'text/plain',
    '.jpg': 'image/jpeg',
    '.png': 'image/png',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.mpg': 'video/mpeg',
    '.jpeg': 'image/jpeg',
    '.pdf': 'application/pdf',
    '.doc': 'application/msword',
    '.docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    '.xls': 'application/vnd.ms-excel',
    '.xlsx': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    '.ppt': 'application/vnd.ms-powerpoint',
    '.pptx': 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
    '.zip': 'application/zip',
    '.7z': 'application/x-7z-compressed',
    '.rar': 'application/x-rar-compressed',
    '.gz': 'application/x-gzip',
    '.tar': 'application/x-tar',
    '.mp3': 'audio/mpeg',
    '.mp4': 'video/mp4',
    '.avi': 'video/x-msvideo',
    '.webm': 'video/webm'
  }

  const name = mimeTypes[ext]

  return name
}

export function isImageinClipboard(clip: Electron.NativeImage): boolean {
  if (clip.isEmpty()) return false
  return true
}
