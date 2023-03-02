import { Datagrid, DateField, List, TextField } from "react-admin";

export const EventList: React.FunctionComponent = () => (
  <List>
    <>
      <Datagrid>
        <TextField source="aggregate_id" />
        <TextField source="parent_id" />
        <TextField source="version" />
        <TextField source="event" />
        <TextField source="payload" />
        <DateField source="created_at" />
      </Datagrid>
    </>
  </List>
)
