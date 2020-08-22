import React from 'react';

import DataTable from '../components/DataTable';
import { request } from '../helpers/requests';

class OperationTypeView extends React.Component {
  state = {
    items: []
  }

  addItem = async (item) => {
    item.id = item.name.toLowerCase().replace(/\s/g, '');
    item.schema = JSON.stringify(item.schema);
    let newItem = await request("operation_type/", 'POST', item);
    this.setState(prevState => ({
      items: [...prevState.items, newItem]
    }));
  }

  updateItem = async (item) => {
    item.schema = JSON.stringify(item.schema);
    let updatedItem = await request (`operation_type/${item.id}/`, 'PUT', item);

    const itemIndex = this.state.items.findIndex(data => data.id === updatedItem.id);
    const newArray = [
      // destructure all items from beginning to the indexed item
      ...this.state.items.slice(0, itemIndex),
      // add the updated item to the array
      updatedItem,
      // add the rest of the items to the array from the index after the replaced item
      ...this.state.items.slice(itemIndex + 1)
    ]
    this.setState({ items: newArray });
  }

  deleteItem = async (id) => {
    await request (`operation_type/${id}/`, 'DELETE');
    const updatedItems = this.state.items.filter(item => item.id !== id);
    this.setState({ items: updatedItems });
  }

  async componentDidMount(){
    this.setState({items: await request("operation_type/", 'GET')});
  }

  render() {
    return (
      <div style={{width: '97%', paddingLeft: '3%'}}>
        <h1 style={{margin: "20px 0"}}>Tipi di operazione</h1>
        <hr />
        <DataTable objectName="Tipo di Operazione"
                    detailed={["/operation", "Vedi tutti"]}
                    fields={[
                              {
                                field: 'name',
                                name: 'Nome',
                                type: 'text',
                                modifiable: false
                              },
                              {
                                field: 'description',
                                name: 'Descrizione',
                                type: 'textArea',
                                modifiable: false
                              }
                            ]}
                            items={this.state.items}
                            addAction={this.addItem}
                            updateAction={this.updateItem}
                            deleteAction={this.deleteItem}
                            variable/>
      </div>
    )
  }
}

export default OperationTypeView;
