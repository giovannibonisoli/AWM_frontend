import React, { Component } from 'react'
import Table  from 'react-bootstrap/Table';
import Button  from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';

import ModalForm from './ModalForm';
import EliminationModal from './EliminationModal';

class DataTable extends Component {

  render() {
    return (
      <div >
        <ModalForm title = {`Aggiungi "${this.props.objectName}"`}
                        buttonInfo = {[`+ Aggiungi`, "success", "float-xl-right"]}
                        action = {this.props.addAction}
                        fields = {this.props.fields}
                        variable={this.props.variable} />

        <Table style={{marginTop: 20}} responsive bordered hover>
          <thead>
            <tr>
              {this.props.fields.map(field => <th key={field.field}>{field.name}</th>)}
              <th width="25%"></th>
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
                                  buttonInfo={["Modifica", "primary", ""]}
                                  item = {item}
                                  action = {this.props.updateAction}
                                  fields = {this.props.fields}
                                  variable={this.props.variable}/>
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
      </div>
    )
  }
}

export default DataTable;
