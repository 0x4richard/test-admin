import { Admin, combineDataProviders, fetchUtils, ListGuesser, Resource } from "react-admin"
import jsonServerProvider from "ra-data-json-server"
import { EventList } from "./components/EventList";
import type { DataProvider } from "react-admin";
import customDataProvider from "./customDataProvider";

type FetchJsonType = ReturnType<typeof fetchUtils.fetchJson>

const httpClient = (url: string, options?: fetchUtils.Options | undefined): FetchJsonType => {
  const headers = new Headers();
  if (!options?.headers) {
    headers.set('Content-Type', 'application/json')
  }
  // add your own headers here
  headers.set('X-Custom-Header', 'richard.hao')

  return fetchUtils.fetchJson(url, options)
};

const dataProviderForUsers: DataProvider<string> = jsonServerProvider("http://localhost:3000/api/v1", httpClient)
const dataProvider: DataProvider<string> = combineDataProviders((resource: string) => {
  switch (resource) {
    case "users":
      return dataProviderForUsers
    case "events":
      return customDataProvider as DataProvider<string>
    default:
      throw new Error(`Unknown resource ${resource}`)
  }
})

const App: React.FunctionComponent = () => {
  return (
    <Admin dataProvider={dataProvider} title="Admin Example - 0x" >
      <Resource name="users" list={ListGuesser} />
      <Resource name="events" list={EventList} />
    </Admin>
  )
}

export default App
