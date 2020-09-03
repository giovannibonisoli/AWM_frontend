import React from 'react';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';

import AuthService from '../services/auth.service';
import { get } from '../helpers/requests';

class BarrelSelect extends React.Component {
  state = {
    sets: [],
    barrels: [],
    selectedSet: null
  }

  onSelectedSet = e => {
    this.setState({selectedSet: Number(e.target.value)});
  }

  async componentDidMount (){
    const token = await AuthService.getToken();
    if(token){
      this.setState({
        sets: await get("barrel_set/", token),
        barrels: await get("barrel/", token)
      });
    }
  }

  componentDidUpdate(prevProps) {

    if (this.state.selectedSet === null &&
        this.state.barrels.length !== 0 &&
        this.props.value !== undefined) {
          console.log(this.props.value);
          const item = this.state.barrels.filter(barrel => barrel.id === this.props.value)[0]
          console.log(item);
          this.setState({selectedSet: item.barrel_set});
    }
  }

  render() {
    return (
      <Form.Row>
        <Col>
          <Form.Label><h6>Numero Batteria</h6></Form.Label>
          <Form.Control as="select"
                        value = {this.state.selected_set}
                        defaultValue=""
                        onChange = {this.onSelectedSet}
                        required>
                        { !this.props.value ?
                          (<option disabled value=""> seleziona una batteria</option>)
                          : (null)
                        }
                        {this.state.sets.map((set, i) => {
                            if(set.id === this.state.selectedSet)
                              return (<option key={i} selected value={set.id}>{set.id}</option>)
                            return (<option key={i} value={set.id}>{set.id}</option>)
                        })}
          </Form.Control>
        </Col>
        <Col>
          <Form.Label><h6>Codice Barile</h6></Form.Label>
          <Form.Control as="select"
                        name={this.props.name}
                        value={this.props.value}
                        defaultValue=""
                        onChange={this.props.onChange}
                        disabled = {this.state.selectedSet === null}
                        required >
                          { !this.props.value ?
                            (<option disabled value=""> seleziona un barile</option>)
                            : (null)
                          }
                          {
                            this.state.barrels.filter(barrel => {
                              return barrel.barrel_set === this.state.selectedSet;
                            }).map((barrel, i) => {
                              return (<option key={i} value={barrel.id}>{barrel.id}</option>)
                            })
                          }
          </Form.Control>
        </Col>
      </Form.Row>
    )
  }
}

export default BarrelSelect;
