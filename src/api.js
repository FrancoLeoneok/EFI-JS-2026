const apiUrl = (import.meta.env.VITE_API_URL?.trim() || 'https://efi-pp1-python-771ef59e.fastapicloud.dev/api/v1').replace(/\/+$/, '')

export async function api(path, options) {
  const response = await fetch(apiUrl + path, options)
  if (!response.ok) throw new Error('La API respondió con un error (' + response.status + ').')
  return response.status === 204 ? null : response.json()
}

export function items(data) {
  const list = Array.isArray(data) ? data : data?.items
  if (!Array.isArray(list)) throw new Error('La API devolvió un listado inválido.')
  return list
}
