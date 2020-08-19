import React from 'react';

import DataTable from '../components/DataTable';
import { get, post } from '../helpers/requests';

class OperationTypeView extends React.Component {
  state = {
    items: []
  }

  addItem = async (item) => {
    item.id = item.name.toLowerCase().replace(/\s/g, '');
    item.schema = JSON.stringify(item.schema);
    let newItem = await post("operation_type/", item);
    this.setState(prevState => ({
      items: [...prevState.items, newItem]
    }));
  }

  updateItem = (updatedItem) => {
    updatedItem.schema = JSON.stringify(updatedItem.schema);
    fetch(`http://localhost:8000/api/operation_type/${updatedItem.id}/`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify(updatedItem)
    })
      .then(response => response.json())
      .then(item => {
        const itemIndex = this.state.items.findIndex(data => data.id === item.id);
        const newArray = [
        // destructure all items from beginning to the indexed item
          ...this.state.items.slice(0, itemIndex),
        // add the updated item to the array
          item,
        // add the rest of the items to the array from the index after the replaced item
          ...this.state.items.slice(itemIndex + 1)
        ]
        this.setState({ items: newArray });
      })
      .catch(err => console.log(err));
  }

  deleteItem = (id) => {
    fetch(`http://localhost:8000/api/operation_type/${id}/`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
          Accept: 'application/json'
      }
    })
    .then(response => response.statusText === 'No Content' ? null : response.json())
    .then(item => {
      const updatedItems = this.state.items.filter(item => item.id !== id);
      this.setState({ items: updatedItems });
    })
    .catch(err => console.log(err));
  }

  async componentDidMount(){
    this.setState({items: await get("operation_type/")});
  }

  render() {
    return (
      <div>
        <h1 style={{margin: "20px 0"}}>Tipi di operazione</h1>
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
