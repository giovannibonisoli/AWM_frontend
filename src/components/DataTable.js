import React, { Component } from 'react'
import Table  from 'react-bootstrap/Table';
import Button  from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';

import ModalForm from './ModalForm';
import EliminationModal from './EliminationModal';

class DataTable extends Component {
  state = {
    items: []
  }

  addItemToState = (newItem) => {
    this.props.fields.map(field => {
      if (field.fixed !== undefined){
        newItem[field.field] = field.fixed;
      }
      return null;
    });
    fetch(`${this.props.baseUrl}/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify(newItem)
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

  updateState = (updatedFields, item) => {

    Object.keys(updatedFields).forEach(key => {
      item[key] = updatedFields[key]
    });

    fetch(`${this.props.baseUrl}/${item.id}/`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify(item)
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

  deleteItemFromState = (id) => {
    fetch(`${this.props.baseUrl}/${id}/`, {
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
    fetch(`${this.props.baseUrl}/${this.props.readPath}`)
      .then(response => response.json())
      .then(items => this.setState({items}))
      .catch(err => console.log(err))
  }

  render() {
    return (
      <div>
        <h1 style={{margin: "20px 0"}}>{this.props.titles[0]}</h1>
        <Table responsive bordered hover>
          <thead>
            <tr>
              {this.props.fields.map(field => {
                if(!field.fixed)
                  return <th key={field.field}>{field.name}</th>
                return null;
              })}
              <th></th>
            </tr>
          </thead>
          <tbody>
            {this.state.items.map(item => {
              return (
                <tr key={item.id}>
                  {this.props.fields.map(field => {
                    if(!field.fixed)
                      return <td key={field.field}>{item[field.field]}</td>
                    return null;
                  })}
                  <td>
                    <div>
                      <ModalForm type='update'
                                  objectName = {this.props.titles[1]}
                                  item={item}
                                  updateState={(updatedFields) => this.updateState(updatedFields, item)}
                                  fields={this.props.fields.filter(el => {
                                    return el.modifiable === true;
                                  })} />
                      <EliminationModal title = {this.title}
                                        item={item}
                                        deleteItemFromState={this.deleteItemFromState}/>
                      {
                        this.props.detailed ?
                        <Link to={`${this.props.detailed[0]}/${item.id}`}>
                              <Button variant="info">{this.props.detailed[1]}</Button>
                        </Link>
                        :
                        <div></div>
                      }
                    </div>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </Table>
        <ModalForm type='add'
                    objectName={this.props.titles[1]}
                    fields={this.props.fields.filter(el => {
                      return el.fixed === undefined ;
                    })}
                    addItemToState={this.addItemToState}/>
      </div>
    )
  }
}

export default DataTable;
