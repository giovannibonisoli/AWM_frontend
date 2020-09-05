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
              type: 'auto',
              notModifiable: true
            },
            {
              field: 'wood_type',
              name: 'Legno',
              type: 'text',
            },
            {
              field: 'capability',
              name: 'Capacità (millilitri)',
              type: 'number',
            }
          ]

  addItem = async (item) => {
    AuthService.getToken().then(token => {
      if(token){
        item.barrel_set = this.props.match.params.setID;
        post("barrel/", item, token).then(newItem => {
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
        put(`barrel/${item.id}/`, item, token).then(updatedItem => {
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

  deleteItem = (id) => {
    AuthService.getToken().then(token => {
      if(token){
        del (`barrel/${id}/`, token);
        const updatedItems = this.state.items.filter(item => item.id !== id);
        this.setState({ items: updatedItems });
      }
    })
  }

  componentDidMount(){
    AuthService.getToken().then(token => {
      if(token){
        get(`barrel/set/${this.props.match.params.setID}/`, token)
        .then(items => {
            this.setState({items: items});
        })
      }
    })
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
