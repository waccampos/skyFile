import { FileLinks } from '@renderer/types'
import { supabaseClient } from '../lib/supabaseClient'

export async function fetchFiles(): Promise<FileLinks[]> {
  const response = await supabaseClient
    .from('uploads')
    .select('*')
    .order('created_at', { ascending: false })

  if (response.data === null) {
    throw new Error('Failed to fetch files')
  }

  const data: FileLinks[] = response.data

  return data
}

export async function uploadFile(files: File[]): Promise<void> {
  for (const file of files) {
    if (file.size > 1024 * 1024 * 50) {
      window.electron.ipcRenderer.send('notification', {
        title: 'Arquivo muito grande para ser enviado',
        body: 'Por favor envie uma arquivo de até 50mb.'
      })
      continue
    }

    const fileName = file.name.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    try {
      await supabaseClient.storage.from('uploads').upload(fileName, file)

      await supabaseClient.from('uploads').upsert({
        name: fileName,
        link: supabaseClient.storage.from('uploads').getPublicUrl(fileName).data.publicUrl
      })
    } catch (error) {
      window.electron.ipcRenderer.send('notification', {
        title: 'Erro ao enviar o arquivo',
        body: 'Por favor tente novamente mais tarde.'
      })
    }
  }
}

export async function deleteFile(name: string): Promise<void> {
  try {
    await supabaseClient.storage.from('uploads').remove([name])

    await supabaseClient.from('uploads').delete().eq('name', name)

    window.electron.ipcRenderer.send('notification', {
      title: 'Arquivo deletado',
      body: 'Arquivo deletado com sucesso!'
    })
  } catch (error) {
    window.electron.ipcRenderer.send('notification', {
      title: 'Erro ao deletar o arquivo',
      body: 'Por favor tente novamente mais tarde.'
    })
  }
}
