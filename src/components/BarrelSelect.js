import React from 'react';
import Form from 'react-bootstrap/Form';

class BarrelSelect extends React.Component {
  state = {
    barrels: []
  }

  componentDidMount(){
    fetch(`http://localhost:8000/api/barrel/`)
      .then(response => response.json())
      .then(items => {
        this.setState({ barrels: items});
        this.props.onChange({target: {name: this.props.name, value: this.state.barrels[0].id}})
      })
      .catch(err => console.log(err))
  }

  render() {
    return (
      <Form.Control as="select"
        name={this.props.name}
        value={this.props.value}
        onChange={e => this.props.onChange(e)}>
          {this.state.barrels.map(barrel => {
            return (<option value={barrel.id}>{barrel.id}</option>)
          })}
      </Form.Control>
    )
  }
}

export default BarrelSelect;
