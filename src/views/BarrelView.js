import React from 'react';

import DataTable from '../components/DataTable';
import { request } from '../helpers/requests';

class BarrelView extends React.Component {
  state = {
    items: []
  }

  addItem = async (item) => {
    item.barrel_set = this.props.match.params.setID;
    let newItem = await request("barrel/", 'POST', item);
    this.setState(prevState => ({
      items: [...prevState.items, newItem]
    }));
  }

  updateItem = async (item) => {
    console.log(item);
    let updatedItem = await request (`barrel/${item.id}/`, 'PUT', item);

    const itemIndex = this.state.items.findIndex(data => data.id === updatedItem.id);
    const newArray = [
      // destructure all items from beginning to the indexed item
      ...this.state.items.slice(0, itemIndex),
      // add the updated item to the array
      item,
      // add the rest of the items to the array from the index after the replaced item
      ...this.state.items.slice(itemIndex + 1)
    ]
    this.setState({ items: newArray });
  }

  deleteItem = (id) => {
    fetch(`http://localhost:8000/api/barrel/${id}/`, {
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
    this.setState({items: await request(`barrel/set/${this.props.match.params.setID}/`, 'GET')});
  }

  render() {
    return (
      <div>
        <h1 style={{margin: "20px 0"}}>{`Batteria ${this.props.match.params.setID}`}</h1>
        <DataTable objectName="Barile"
                    fields={[
                              {
                                field: 'id',
                                name: 'Codice Barile',
                                type: '',
                                modifiable: false
                              },
                              {
                                field: 'wood_type',
                                name: 'Legno',
                                type: '',
                                modifiable: true
                              },
                              {
                                field: 'capability',
                                name: 'Capacità (litri)',
                                type: 'number',
                                modifiable: true
                              }
                            ]}
                    items={this.state.items}
                    addAction={this.addItem}
                    updateAction={this.updateItem}
                    deleteAction={this.deleteItem} />
      </div>
    )
  }
}

export default BarrelView;
