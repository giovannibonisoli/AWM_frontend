import React, { Component } from 'react'
import Table  from 'react-bootstrap/Table';
import Button  from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';

import ModalForm from './ModalForm';

class DataTable extends Component {

  deleteItem = id => {
    let confirmDelete = window.confirm('Delete item forever?')
    if(confirmDelete){
      fetch(`${this.props.url}${id}/`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
  		      Accept: 'application/json'
	      }
      })
      .then(response => response.statusText === 'No Content' ? null : response.json())
      .then(item => {
        this.props.deleteItemFromState(id);
      })
      .catch(err => console.log(err))
    }
  }

  render() {
    let detailButton;
    if (this.props.detailed){
      detailButton = (<Link to={this.props.detailed[0]} style={{margin: "0 10px"}}>
                        <Button variant="info">{this.props.detailed[1]}</Button>
                      </Link>);
    }
    return (
      <Table responsive bordered hover>
        <thead>
          <tr>
            {this.props.fields.map(field => <th key={field.field}>{field.name}</th>)}
            <th></th>
          </tr>
        </thead>
        <tbody>
          {this.props.items.map(item => {
            return (
              <tr key={item.id}>
                {this.props.fields.map(field => <td key={field.field}>{item[field.field]}</td>)}
                <td>
                  <div>
                    <ModalForm buttonLabel="Modifica"
                                title = {this.props.title}
                                url={this.props.url}
                                item={item}
                                updateState={this.props.updateState}
                                fields={this.props.fields} />
                    <Button variant="danger"
                            onClick={() => this.deleteItem(item.id)}>Elimina</Button>
                    {detailButton}
                  </div>
                </td>
              </tr>
            )
          })}
        </tbody>
      </Table>
    )
  }
}

export default DataTable;
