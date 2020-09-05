import React from 'react';

import DataTable from '../components/DataTable';

import AuthService from '../services/auth.service';
import { serializeFields, deserializeFields } from '../helpers/variableObjects';
import { get, post, put, del } from '../helpers/requests';

class OperationView extends React.Component {
  state = {
    fields: [],
    items: []
  }

  fixedfields = [
                  {
                    field: 'id',
                    name: `Codice Operazione`,
                    type: 'auto',
                    notModifiable: true
                  },
                  {
                    field: 'date',
                    name: 'Data',
                    type: 'date',
                  },
                  {
                    field: 'barrel',
                    name: 'Barile',
                    type: 'barrel',
                  }
                ]

  objectName = "";

  addItem = (item) => {
    AuthService.getToken().then(token => {
      if(token){
        let serializedItem = serializeFields(item, this.state.fields, this.fixedfields);
        serializedItem.type = this.props.match.params.name;
        post(`operation/${this.props.match.params.name}/`, serializedItem, token)
        .then(newItem => {
          this.setState(prevState => ({
            items: [...prevState.items, deserializeFields(newItem, "values")]
          }));
        })
      }
    })
  }

  updateItem = (item) => {
    AuthService.getToken().then(token => {
      if(token){
        let serializedItem = serializeFields(item, this.state.fields, this.fixedfields);
        serializedItem.type = this.props.match.params.name;
        put (`operation/${this.props.match.params.name}/${item.id}/`, serializedItem, token).then(updatedItem => {

        const itemIndex = this.state.items.findIndex(data => data.id === updatedItem.id);
        const newArray = [
          ...this.state.items.slice(0, itemIndex),
          deserializeFields(updatedItem, "values"),
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
        del (`operation/${this.props.match.params.name}/${id}/`, token);
        const updatedItems = this.state.items.filter(item => item.id !== id);
        this.setState({ items: updatedItems });
      }
    })
  }

  componentDidMount(){
    AuthService.getToken().then(token => {
      if(token){
        get(`operation_type/${this.props.match.params.name}/`, token).then(type => {
          this.objectName = type.name;
          this.setState({fields: [...this.fixedfields, ...type.schema]});

          get(`operation/${this.props.match.params.name}/`, token).then(items => {
            items = items.map(item => deserializeFields(item, "values"));
            this.setState({items: items});
          })
        })
      }
    })
  }

  render() {
    return (
      <div style={{width: '97%', paddingLeft: '3%'}}>
        <h1 style={{margin: "20px 0"}}>{this.objectName}</h1>
        <hr />
        <DataTable objectName={this.objectName}
                    fields={this.state.fields}
                    items={this.state.items}
                    addAction={this.addItem}
                    updateAction={this.updateItem}
                    deleteAction={this.deleteItem}/>
      </div>
    )
  }
}

export default OperationView;
