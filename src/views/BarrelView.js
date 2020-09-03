import React from 'react';

import DataTable from '../components/DataTable';

import AuthService from '../services/auth.service';
import { get, post, put, del } from '../helpers/requests';

class BarrelView extends React.Component {
  state = {
    items: []
  }

  fields = [
            {
              field: 'id',
              name: 'Codice Barile',
              type: '',
              notModifiable: true
            },
            {
              field: 'wood_type',
              name: 'Legno',
              type: '',
            },
            {
              field: 'capability',
              name: 'Capacità (millilitri)',
              type: 'number',
            }
          ]

  addItem = async (item) => {
    const token = await AuthService.getToken();
    if(token){
      item.barrel_set = this.props.match.params.setID;
      let newItem = await post("barrel/", item, token);
      this.setState(prevState => ({
        items: [...prevState.items, newItem]
      }));
    }
  }

  updateItem = async (item) => {
    const token = await AuthService.getToken();
    if(token){
      let updatedItem = await put (`barrel/${item.id}/`, item, token);

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
      await del (`barrel/${id}/`, token);
      const updatedItems = this.state.items.filter(item => item.id !== id);
      this.setState({ items: updatedItems });
    }
  }

  async componentDidMount(){
    const token = await AuthService.getToken();
    if(token){
      this.setState({items: await get(`barrel/set/${this.props.match.params.setID}/`, token)});
    }
  }

  render() {
    return (
      <div style={{width: '97%', paddingLeft: '3%'}}>
        <h1 style={{margin: "20px 0"}}>{`Batteria ${this.props.match.params.setID}`}</h1>
        <hr />
        <DataTable objectName="Barile"
                    fields={this.fields}
                    items={this.state.items}
                    addAction={this.addItem}
                    updateAction={this.updateItem}
                    deleteAction={this.deleteItem} />
      </div>
    )
  }
}

export default BarrelView;
