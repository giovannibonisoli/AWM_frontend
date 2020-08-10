import React from 'react';
import { Row, Col } from 'react-bootstrap';
import ModalForm from '../components/ModalForm';
import DataTable from '../components/DataTable';

class BarrelSetView extends React.Component {
  state = {
    items: []
  }

  addItemToState = (item) => {
    this.setState(prevState => ({
      items: [...prevState.items, item]
    }))
  }

  updateState = (item) => {
    const itemIndex = this.state.items.findIndex(data => data.id === item.id)
    const newArray = [
    // destructure all items from beginning to the indexed item
      ...this.state.items.slice(0, itemIndex),
    // add the updated item to the array
      item,
    // add the rest of the items to the array from the index after the replaced item
      ...this.state.items.slice(itemIndex + 1)
    ]
    this.setState({ items: newArray })
  }

  deleteItemFromState = (id) => {
    const updatedItems = this.state.items.filter(item => item.id !== id)
    this.setState({ items: updatedItems })
  }

  componentDidMount(){
    fetch('http://localhost:8000/api/barrel_sets/')
      .then(response => response.json())
      .then(items => this.setState({items}))
      .catch(err => console.log(err))
  }

  render() {
    return (
      <div>
        <Row>
          <Col>
            <h1 style={{margin: "20px 0"}}>Batterie</h1>
          </Col>
        </Row>
        <Row>
          <Col>
            <DataTable url={'http://localhost:8000/api/barrel_sets/'}
                        fields={[
                                  {
                                    field: 'id',
                                    name: 'Numero di Batteria',
                                    type: 'number'
                                  },
                                  {
                                    field: 'year',
                                    name: 'Anno',
                                    type: 'number'
                                  }
                                ]}
                        items={this.state.items}
                        updateState={this.updateState}
                        deleteItemFromState={this.deleteItemFromState}
                        detailLink="/barrels" />
          </Col>
        </Row>
        <Row>
          <Col>
            <ModalForm buttonLabel="Nuova Batteria"
                        url={'http://localhost:8000/api/barrel_sets/'}
                        fields={[
                                  {
                                    field: 'id',
                                    name: 'Numero di Batteria',
                                    type: 'number'
                                  },
                                  {
                                    field: 'year',
                                    name: 'Anno',
                                    type: 'number'
                                  }
                                ]}
                        addItemToState={this.addItemToState}/>
          </Col>
        </Row>
      </div>
    )
  }
}

export default BarrelSetView;
