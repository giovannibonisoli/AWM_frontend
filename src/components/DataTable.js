import React, { Component } from 'react'
import Table  from 'react-bootstrap/Table';
import Button  from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import { Link } from 'react-router-dom';

import ModalForm from './ModalForm';
import EliminationModal from './EliminationModal';

class DataTable extends Component {
  state = {
    page: 0
  }

  activeButton = (index) => {
    return this.state.page === index;
  }

  back = () => {
    const page = this.state.page;
    if (page !== 0)
      this.setState({page: page - 1});
  }

  forward = () => {
    const page = this.state.page;
    if (page !== (Math.ceil(this.props.items.length/5)-1))
      this.setState({page: page + 1});
  }

  changePage = (index) => {
    this.setState({page: index});
  }

  render() {
    const page = this.state.page;
    const itemsLength = this.props.items.length;
    const groupLength = Math.ceil((itemsLength/5))
    const maxsize = 3;
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
              {this.props.fields.map((field, i) => <th key={i}>{field.name}</th>)}
              <th width="25%"></th>
            </tr>
          </thead>
          <tbody>
            {this.props.items.slice(page*5, (page+1)*5).map(item => {
              return (
                <tr key={item.id}>
                  {this.props.fields.map((field, i) => <td key={i}>{item[field.field]}</td>)}
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

        { groupLength > 1 ? (
          <ButtonGroup>
            <Button variant="outline-primary" onClick={this.back}>&laquo;</Button>
              { groupLength <= maxsize ? (
                  Array(groupLength).fill().map((_, i) => {
                    return (<Button key={i}
                                    variant="outline-primary"
                                    onClick={() => {this.changePage(i)}}
                                    active={this.activeButton(i)}>
                                    {i + 1}
                            </Button>);
                  })
                ) : (
                  Array(maxsize).fill().map((_, i) => {
                    let index = i;
                    if(page >= maxsize){
                      index = page - maxsize + 1 + i;
                    }
                    return (<Button variant="outline-primary"
                                    onClick={() => {this.changePage(index)}}
                                    active={this.activeButton(index)}>
                                    {index + 1}
                            </Button>);
                  })
                )
              }
              <Button variant="outline-primary" onClick={this.forward}>&raquo;</Button>
            </ButtonGroup>
          ): (<div></div>)
        }
      </div>
    )
  }
}

export default DataTable;
