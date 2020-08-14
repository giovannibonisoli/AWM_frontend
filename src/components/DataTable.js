import React, { Component } from 'react'
import Table  from 'react-bootstrap/Table';
import Button  from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';

import ModalForm from './ModalForm';
import EliminationModal from './EliminationModal';

class DataTable extends Component {

  render() {
    return (
      <div>
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
                      <ModalForm title = {`Modifica ${this.props.objectName}`}
                                  buttonInfo={["Modifica", "primary"]}
                                  item = {item}
                                  action = {(updatedFields) => {
                                              let newItem = Object.assign({}, item);
                                              Object.keys(updatedFields).forEach(key => {
                                                  newItem[key] = updatedFields[key]
                                              });

                                              this.props.updateAction(newItem);
                                            }}
                                  fields = {this.props.fields.filter(el => {
                                    return el.modifiable === true;
                                  })} />
                      <EliminationModal objectName = {this.props.objectName}
                                        item = {item}
                                        deleteAction = {this.props.deleteAction}/>
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
        <ModalForm title = {`Aggiungi ${this.props.objectName}`}
                    buttonInfo = {[`Aggiungi ${this.props.objectName}`, "success"]}
                    action = {this.props.addAction}
                    fields = {this.props.fields} />
      </div>
    )
  }
}

export default DataTable;
