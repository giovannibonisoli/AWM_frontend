import React from 'react';
import { Row, Col } from 'react-bootstrap';
import ModalForm from '../components/ModalForm';
import DataTable from '../components/DataTable';

class BarrelView extends React.Component {
  state = {
    items: []
  }

  addItemToState = (newitem) => {
    newitem.barrel_set = this.props.match.params.setID;
    fetch('http://localhost:8000/api/barrel/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify(newitem)
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

  updateState = (updateditem) => {

    fetch(`http://localhost:8000/api/barrel/${updateditem.id}/`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify(updateditem)
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
    fetch(`http://localhost:8000/api/barrel/${id}/`, {
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
    fetch('http://localhost:8000/api/barrel/')
      .then(response => response.json())
      .then(items => this.setState({items}))
      .catch(err => console.log(err))
  }

  render() {
    return (
      <div>
      <Row>
        <Col>
          <h1 style={{margin: "20px 0"}}>Batteria {this.props.match.params.setID}</h1>
        </Col>
      </Row>
      <Row>
        <Col>
          <DataTable title = "barile"
                     items={this.state.items}
                      fields={[
                                {
                                  field: 'id',
                                  name: 'Codice Barile',
                                  type: ''
                                },
                                {
                                  field: 'wood_type',
                                  name: 'Legno',
                                  type: ''
                                },
                                {
                                  field: 'capability',
                                  name: 'Capacità',
                                  type: 'number'
                                }
                              ]}
                      updateState={this.updateState}
                      deleteItemFromState={this.deleteItemFromState}
                       />
        </Col>
      </Row>
      <Row>
        <Col>
          <ModalForm buttonLabel="Nuovo Barile"
                      title = "barile"
                      addItemToState={this.addItemToState}
                      fields={[
                                {
                                  field: 'id',
                                  name: 'Codice Barile',
                                  type: ''
                                },
                                {
                                  field: 'wood_type',
                                  name: 'Legno',
                                  type: ''
                                },
                                {
                                  field: 'capability',
                                  name: 'Capacità',
                                  type: 'number'
                                }
                              ]} />
        </Col>
      </Row>
      </div>
    )
  }
}

export default BarrelView;
