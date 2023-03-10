import { DataProvider, GetListParams, GetListResult } from 'react-admin'

interface Data {
  aggregate_id: string
  parent_id: string
  event: string
  version: number
  created_at: string
  payload: any
}

interface ResponseData {
  has_more: boolean
  data: Data[]
}

const customDataProvider = {
  getList: async (resource: string, params: GetListParams) => {
    console.log('getList', resource, params)

    const query = new URLSearchParams({ test: "test", ...params.filter })
    const url = `http://localhost:3000/api/v1/${resource}?${query}`

    const response = await fetch(url, { headers: { Accept: 'application/json' } })

    if (!response.ok) {
      console.log(response)
      throw new Error(response.statusText)
    }

    const data = (await response.json()) as ResponseData

    return {
      total: 1000,
      data: data.data.map((item: Data) => ({
        id: `id-${item.aggregate_id}-${item.version}-${item.created_at}`,
        ...item,
      }))
    } as GetListResult
  }
} satisfies Partial<DataProvider>

export default customDataProvider
