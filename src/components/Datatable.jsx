import React from 'react'
import { DataTable } from "primereact/datatable";
import { Column } from 'primereact/column';
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";

const Datatable = () => {

    const data = [
        {
            id: 1,
            name: "John",
            age: 25,
            city: "New Y",
        },
        {
            id: 2,
            name: "Jane",
            age: 25,
            city: "London",
        },
    ];

  return (
    <div>
        <DataTable value={data}>
            <Column field="id" header="ID" />
            <Column field="name" header="Name" />
            <Column field="age" header="Age" />
            <Column field="city" header="City" />
        </DataTable>
    </div>
  )
}

export default Datatable