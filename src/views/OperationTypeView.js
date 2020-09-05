import React from 'react';

import DataTable from '../components/DataTable';

import AuthService from '../services/auth.service';
import { get, post, put, del } from '../helpers/requests';

class OperationTypeView extends React.Component {
  state = {
    items: []
  }

  fields = [
            {
              field: 'name',
              name: 'Nome',
              type: 'text'
            },
            {
              field: 'description',
              name: 'Descrizione',
              type: 'textarea'
            }
          ]

  addItem = (item) => {
    AuthService.getToken().then(token => {
      if(token){
        item.id = item.name.toLowerCase().replace(/\s/g, '');
        post("operation_type/", item, token).then(newItem => {
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
        put(`operation_type/${item.id}/`, item, token).then(updatedItem => {
          const itemIndex = this.state.items.findIndex(data => data.id === updatedItem.id);
          const newArray = [
            ...this.state.items.slice(0, itemIndex),
            updatedItem,
            ...this.state.items.slice(itemIndex + 1)
          ]
          this.setState({ items: newArray });
        })
      }
    })
  }

  deleteItem = (id) => {
    AuthService.getToken().then(token => {
      if(token){
        del(`operation_type/${id}/`, token);
        const updatedItems = this.state.items.filter(item => item.id !== id);
        this.setState({ items: updatedItems });
      }
    })
  }

  componentDidMount(){
    AuthService.getToken().then(token => {
      if(token){
        get("operation_type/", token).then(items => {
          this.setState({items: items});
        })
      }
    })
  }

  render() {
    return (
      <div style={{width: '97%', paddingLeft: '3%'}}>
        <h1 style={{margin: "20px 0"}}>Tipi di operazione</h1>
        <hr />
        <DataTable objectName="Tipo di Operazione"
                    detailed={["/operation", "Vedi tutti"]}
                    fields={this.fields}
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
