import React from 'react';
import Form from 'react-bootstrap/Form';

import { request } from '../helpers/requests';

class BarrelSelect extends React.Component {
  state = {
    barrels: []
  }

  async componentDidMount(){
    this.setState({ barrels: await request("barrel/", 'GET')});
  }

  render() {
    return (
      <Form.Control as="select"
        name={this.props.name}
        value={this.props.value}
        onChange={e => this.props.onChange(e)}>
          {this.state.barrels.map(barrel => {
            return (<option key={barrel.id} value={barrel.id}>{barrel.id}</option>)
          })}
      </Form.Control>
    )
  }
}

export default BarrelSelect;
