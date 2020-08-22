import React from 'react';

import DataTable from '../components/DataTable';
import { serializeFields, deserializeFields } from '../helpers/variableObjects';
import { request } from '../helpers/requests';

class OperationView extends React.Component {
  state = {
    schema: [
              {
                field: 'id',
                name: `Codice Operazione`,
                type: 'number',
                fixed: true,
                modifiable: false
              },
              {
                field: 'date',
                name: 'Data',
                type: 'date',
                fixed: true,
                modifiable: true
              },
              {
                field: 'barrel',
                name: 'Barile',
                type: 'barrel',
                fixed: true,
                modifiable: true
              }
            ],
    items: []
  }

  objectName = "";

  addItem = async (item) => {
    let serializedItem = serializeFields(item, this.state.schema);
    serializedItem.type = this.props.match.params.name;
    let newItem = await request(`operation/${this.props.match.params.name}/`, 'POST', serializedItem);
    this.setState(prevState => ({
      items: [...prevState.items, deserializeFields(newItem, "values")]
    }))

  }

  updateItem = async (item) => {
    let serializedItem = serializeFields(item, this.state.schema);
    serializedItem.type = this.props.match.params.name;
    let updatedItem = await request (`operation/${this.props.match.params.name}/${item.id}/`, 'PUT', serializedItem);

    const itemIndex = this.state.items.findIndex(data => data.id === updatedItem.id);
    const newArray = [
      // destructure all items from beginning to the indexed item
      ...this.state.items.slice(0, itemIndex),
      // add the updated item to the array
      deserializeFields(updatedItem, "values"),
      // add the rest of the items to the array from the index after the replaced item
      ...this.state.items.slice(itemIndex + 1)
      ]
      this.setState({ items: newArray });
  }

  deleteItem = async (id) => {
    await request (`operation/${this.props.match.params.name}/${id}/`, 'DELETE');
    const updatedItems = this.state.items.filter(item => item.id !== id);
    this.setState({ items: updatedItems });
  }

  async componentDidMount(){
    let type = await request(`operation_type/${this.props.match.params.name}/`, 'GET');
    this.objectName = type.name;
    let schema = JSON.parse(type.schema);
    schema.forEach((item, i) => {
      item.modifiable = true;
    })
    this.setState({schema: [...this.state.schema, ...schema]});

    let items = await request(`operation/${this.props.match.params.name}/`, 'GET');
    items = items.map(item => deserializeFields(item, "values"));
    this.setState({items: items});
  }

  render() {
    return (
      <div style={{width: '97%', paddingLeft: '3%'}}>
        <h1 style={{margin: "20px 0"}}>{this.objectName}</h1>
        <hr />
        <DataTable objectName={this.objectName}
                    fields={this.state.schema}
                    items={this.state.items}
                    addAction={this.addItem}
                    updateAction={this.updateItem}
                    deleteAction={this.deleteItem}/>
      </div>
    )
  }
}

export default OperationView;
