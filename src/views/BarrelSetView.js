import React from 'react';

import DataTable from '../components/DataTable';
import { request } from '../helpers/requests';

class BarrelSetView extends React.Component {
  state = {
    items: []
  }

  addItem = async (item) => {
    let newItem = await request ("barrel_set/", 'POST', item);
    this.setState(prevState => ({
      items: [...prevState.items, newItem]
    }));
  }

  updateItem = async (item) => {
    let updatedItem = await request (`barrel_set/${item.id}/`, 'PUT', item);

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
    await request (`barrel_set/${id}/`, 'DELETE');
    const updatedItems = this.state.items.filter(item => item.id !== id);
    this.setState({ items: updatedItems });
  }

  async componentDidMount(){
    this.setState({items: await request ("barrel_set/", 'GET')});
  }

  render() {
    return (
      <div>
        <h1 style={{margin: "20px 0"}}>Batterie</h1>
        <DataTable objectName="Batteria"
                    detailed={["/barrel_set", "Visualizza Barili"]}
                    fields={[
                              {
                                field: 'id',
                                name: 'Numero Batteria',
                                type: 'number',
                                modifiable: false
                              },
                              {
                                field: 'year',
                                name: 'Anno',
                                type: 'number',
                                min: 1984,
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

export default BarrelSetView;
