import React from 'react';

import DataTable from '../components/DataTable';

import AuthService from '../services/auth.service';
import { get, post, put, del } from '../helpers/requests';

class BarrelSetView extends React.Component {
  state = {
    items: []
  }

  fields = [
            {
              field: 'id',
              name: 'Numero Batteria',
              type: 'number',
              notModifiable: true
            },
            {
              field: 'year',
              name: 'Anno',
              type: 'number',
              min: 1984
            }
          ]

  addItem = async (item) => {
    const token = await AuthService.getToken();
    if(token){
      let newItem = await post ("barrel_set/", item, token);
      this.setState(prevState => ({
        items: [...prevState.items, newItem]
      }));
    }
  }

  updateItem = async (item) => {
    const token = await AuthService.getToken();
    if(token){
      let updatedItem = await put (`barrel_set/${item.id}/`, item, token);

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
  }

  deleteItem = async (id) => {
    const token = await AuthService.getToken();
    if(token){
      await del (`barrel_set/${id}/`, token);
      const updatedItems = this.state.items.filter(item => item.id !== id);
      this.setState({ items: updatedItems });
    }
  }

  async componentDidMount(){
    const token = await AuthService.getToken();
    if(token){
      console.log(await get ("barrel_set/", token))
      this.setState({items: await get ("barrel_set/", token)});
    }
  }

  render() {
    return (
      <div style={{width: '97%', paddingLeft: '3%'}}>
        <h1 style={{margin: "20px 0"}}>Batterie</h1>
        <hr />
        <DataTable objectName="Batteria"
                    detailed={["/barrel", "Visualizza Barili"]}
                    fields={this.fields}
                    items={this.state.items}
                    addAction={this.addItem}
                    updateAction={this.updateItem}
                    deleteAction={this.deleteItem} />
      </div>
    )
  }
}

export default BarrelSetView;
