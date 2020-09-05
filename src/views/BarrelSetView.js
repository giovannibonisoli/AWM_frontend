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

  addItem = (item) => {
    AuthService.getToken().then(token => {
      if(token){
        post ("barrel_set/", item, token).then(newItem => {
          this.setState(prevState => ({
            items: [...prevState.items, newItem]
          }));
        })
      }
    })
  }

  updateItem = (item) => {
    AuthService.getToken().then(token => {
      if(token){
        put(`barrel_set/${item.id}/`, item, token).then(updatedItem => {
          const itemIndex = this.state.items.findIndex(data => data.id === updatedItem.id);
          const newArray = [
            ...this.state.items.slice(0, itemIndex),
            updatedItem,
            ...this.state.items.slice(itemIndex + 1)
          ]
          this.setState({ items: newArray });
        });
      }
    })
  }

  deleteItem =  (id) => {
    AuthService.getToken().then(token => {
      if(token){
        del(`barrel_set/${id}/`, token);
        const updatedItems = this.state.items.filter(item => item.id !== id);
        this.setState({ items: updatedItems });
      }
    })
  }

  componentDidMount(){
    AuthService.getToken().then(token => {
      if(token){
        get ("barrel_set/", token)
        .then(items => {
          this.setState({items: items});
        })
      }
    })

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
