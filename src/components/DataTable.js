import React, { Component } from 'react'
import Table  from 'react-bootstrap/Table';
import Button  from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';

import ModalForm from './ModalForm';
import EliminationModal from './EliminationModal';

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
                    <EliminationModal title = {this.props.title}
                                        item={item}
                                        deleteItemFromState={this.props.deleteItemFromState}/>
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
    )
  }
}

export default DataTable;
