import React, { Component } from 'react'
import Table  from 'react-bootstrap/Table';
import Button  from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';

import ModalForm from './ModalForm';

class DataTable extends Component {

  deleteItem = id => {
    let confirmDelete = window.confirm('Delete item forever?')
    if(confirmDelete){
      this.props.deleteItemFromState(id);
    }
  }

  render() {
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
                                item={item}
                                updateState={this.props.updateState}
                                fields={this.props.fields} />
                    <Button variant="danger"
                            onClick={() => this.deleteItem(item.id)}>Elimina</Button>
                    {
                      this.props.detailed ?
                      <Link to={`${this.props.detailed[0]}/${item.id}`}
                            style={{margin: "0 10px"}}>
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
    )
  }
}

export default DataTable;
