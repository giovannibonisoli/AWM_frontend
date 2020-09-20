import React, { Component } from 'react'
import Table  from 'react-bootstrap/Table';
import Button  from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Highlighter from "react-highlight-words";
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import InputGroup from 'react-bootstrap/InputGroup';
import { Link } from 'react-router-dom';
import { Search } from 'react-bootstrap-icons';

import ModalForm from './ModalForm';
import EliminationModal from './EliminationModal';

class DataTable extends Component {
  state = {
    page: 0,
    search: ''
  }

  setSearch = e => {
    this.setState({ search: e.target.value });
  };


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
    const filteredItems = this.props.items.filter(item => {
      if(this.state.search !== ""){

        for(let field of this.props.fields) {
          if(item[field.field] !== undefined){
            let thing = item[field.field];
            if (typeof thing === "number"){
              thing = thing.toString();
            }
            const isin = thing.toLowerCase().includes(this.state.search.toLowerCase());
            if (isin !== false){
              return true;
            }
          }
        }
        return false;
      }
      return true;
    });
    return (
      <div>
        <Form.Row>
          <Col sm="2">
            <InputGroup className="mb-2">
              <InputGroup.Prepend>
                <InputGroup.Text id="basic-addon1"><Search size={14}/></InputGroup.Text>
              </InputGroup.Prepend>
              <Form.Control
                placeholder="Cerca..."
                onChange={this.setSearch}
                aria-describedby="basic-addon1"
              />
            </InputGroup>
          </Col>
          <Col>
            <ModalForm title = {`Aggiungi "${this.props.objectName}"`}
                            buttonInfo = {[`+ Aggiungi`, "success", "float-xl-right"]}
                            action = {this.props.addAction}
                            fields = {this.props.fields}
                            variable={this.props.variable} />
          </Col>
        </Form.Row>
        <Table style={{marginTop: 20}} responsive bordered hover>
          <thead>
            <tr>
              {this.props.fields.map((field, i) => <th key={i}>{field.name}</th>)}
              <th width="25%"></th>
            </tr>
          </thead>
          <tbody>
            {filteredItems.slice(page*5, (page+1)*5).map(item => (
              <tr key={item.id}>
                {this.props.fields.map((field, i) => {
                  let thing = item[field.field];
                  if (typeof thing === "number"){
                    thing = thing.toString();
                  }
                  return (<td key={i}>
                    <Highlighter
                        highlightClassName="YourHighlightClass"
                        searchWords={[this.state.search]}
                        autoEscape={true}
                        textToHighlight={thing}
                      />
                  </td>)
                })}
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
                    {this.props.detailed &&
                      <Link to={`${this.props.detailed[0]}/${item.id}`}>
                            <Button variant="info">{this.props.detailed[1]}</Button>
                      </Link>}
                  </div>
                </td>
              </tr>
            )
          )}
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
