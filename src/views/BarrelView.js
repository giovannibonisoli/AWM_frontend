import React from 'react';
import DataTable from '../components/DataTable';

class BarrelView extends React.Component {

  render() {
    return (
          <DataTable titles = {[`Batteria ${this.props.match.params.setID}`, "Barile", "Nuovo"]}
                      baseUrl = {`http://localhost:8000/api/barrel`}
                      readPath = {`set/${this.props.match.params.setID}/`}
                      fields={[
                                {
                                  field: 'id',
                                  name: 'Codice Barile',
                                  type: '',
                                  modifiable: false
                                },
                                {
                                  field: 'barrel_set',
                                  fixed: this.props.match.params.setID
                                },
                                {
                                  field: 'wood_type',
                                  name: 'Legno',
                                  type: '',
                                  modifiable: true
                                },
                                {
                                  field: 'capability',
                                  name: 'Capacità',
                                  type: 'number',
                                  min: 0,
                                  modifiable: true
                                }
                              ]} />
    )
  }
}

export default BarrelView;
