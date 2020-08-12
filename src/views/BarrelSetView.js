import React from 'react';
import DataTable from '../components/DataTable';

class BarrelSetView extends React.Component {

  render() {
    return (
      <DataTable titles = {["Batterie", "Batteria", "Nuova"]}
                  baseUrl = "http://localhost:8000/api/barrel_set"
                  readPath = ""
                  detailed={["/barrel_set", "Visualizza Barili"]}
                  fields={[
                            {
                              field: 'id',
                              name: 'Numero di Batteria',
                              type: 'number',
                              min: 0,
                              modifiable: false
                            },
                            {
                              field: 'year',
                              name: 'Anno',
                              type: 'number',
                              min: 1984,
                              modifiable: true
                            }
                          ]} />
    )
  }
}

export default BarrelSetView;
