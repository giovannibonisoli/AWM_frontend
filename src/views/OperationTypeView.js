import React from 'react';
import DataTable from '../components/DataTable';

class OperationTypeView extends React.Component {
  state = {
    items: []
  }

  addItem = (item) => {
    item.barrel_set = this.props.match.params.setID;
    fetch("http://localhost:8000/api/operation_type/", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify(item)
    })
      .then(response => {
        return response.statusText === 'Created' ? response.json() : null
      })
      .then(item => {
        this.setState(prevState => ({
          items: [...prevState.items, item]
        }))
      })
      .catch(err => console.log(err));
  }

  updateItem = (updatedItem) => {
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

  componentDidMount(){
    fetch(`http://localhost:8000/api/operation_type/`)
      .then(response => response.json())
      .then(items => this.setState({items}))
      .catch(err => console.log(err))
  }

  render() {
    return (
      <div>
        <h1 style={{margin: "20px 0"}}>Tipologie di operazioni</h1>
        {/*<VariableEditForm fields={this.state.fields}/>*/}
        <DataTable objectName="Operazione"
                            fields={[{
                                          field: 'id',
                                          name: 'Nome',
                                          type: '',
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
