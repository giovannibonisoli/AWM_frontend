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
                    type: 'number',
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

  addItem = async (item) => {
    const token = await AuthService.getToken();
    if(token){
      let serializedItem = serializeFields(item, this.state.fields, this.fixedfields);
      serializedItem.type = this.props.match.params.name;
      let newItem = await post(`operation/${this.props.match.params.name}/`, serializedItem, token);
      this.setState(prevState => ({
        items: [...prevState.items, deserializeFields(newItem, "values")]
      }))
    }

  }

  updateItem = async (item) => {
    const token = await AuthService.getToken();
    if(token){
      let serializedItem = serializeFields(item, this.state.schema);
      serializedItem.type = this.props.match.params.name;
      let updatedItem = await put (`operation/${this.props.match.params.name}/${item.id}/`, serializedItem, token);

      const itemIndex = this.state.items.findIndex(data => data.id === updatedItem.id);
      const newArray = [
        // destructure all items from beginning to the indexed item
        ...this.state.items.slice(0, itemIndex),
        // add the updated item to the array
        deserializeFields(updatedItem, "values"),
        // add the rest of the items to the array from the index after the replaced item
        ...this.state.items.slice(itemIndex + 1)
        ]
        this.setState({ items: newArray });
    }
  }

  deleteItem = async (id) => {
    const token = await AuthService.getToken();
    if(token){
      await del (`operation/${this.props.match.params.name}/${id}/`, token);
      const updatedItems = this.state.items.filter(item => item.id !== id);
      this.setState({ items: updatedItems });
    }
  }

  async componentDidMount(){
    const token = await AuthService.getToken();
    if(token){
      let type = await get(`operation_type/${this.props.match.params.name}/`, token);
      this.objectName = type.name;
      this.setState({fields: [...this.fixedfields, ...type.schema]});

      let items = await get(`operation/${this.props.match.params.name}/`, token);
      items = items.map(item => deserializeFields(item, "values"));
      this.setState({items: items});
    }
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
