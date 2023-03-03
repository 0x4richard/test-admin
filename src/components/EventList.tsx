import { Datagrid, DateField, List, TextField, TextInput } from "react-admin";

const filters = [
  <TextInput label="Aggregate ID" source="aggregate_id" />,
]

export const EventList: React.FunctionComponent = () => (
  <List filters={filters}>
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
