import { Admin, fetchUtils, ListGuesser, Resource } from "react-admin"
import jsonServerProvider from "ra-data-json-server"
import { EventList } from "./components/EventList";

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

const dataProvider = jsonServerProvider("http://localhost:3000/api/v1", httpClient)

const App: React.FunctionComponent = () => {
  return (
    <Admin dataProvider={dataProvider} title="Admin Example - 0x" >
      <Resource name="users" list={ListGuesser} />
      <Resource name="events" list={EventList} />
    </Admin>
  )
}

export default App
