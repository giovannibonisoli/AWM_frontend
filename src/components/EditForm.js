import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';

import BarrelSelect from './BarrelSelect';

class EditForm extends React.Component {
  state = {}

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleShareholderNameChange = idx => e => {
    const newSchema= this.state.schema.map((field, sidx) => {
      if (idx !== sidx) {return field}
      else {
        if(this.props.item){
          return { ...field, name: e.target.value};
        }
        return { ...field, name: e.target.value, field: e.target.value.toLowerCase().replace(/\s+/g, '')};
      }
    });

    this.setState({ schema: newSchema });
  };

  handleShareholderTypeChange = idx => e => {
    const newSchema = this.state.schema.map((field, sidx) => {
      if (idx !== sidx) return field;
      return { ...field, type: e.target.value };
    });

    this.setState({ schema: newSchema });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.action(Object.assign({}, this.state));
    this.props.toggle();
  };

  handleAddShareholder = () => {
    this.setState({
      schema: this.state.schema.concat([{field:"", name: "", type: ""}])
    });
  };

  handleRemoveShareholder = idx => () => {

    this.setState({
      schema: this.state.schema.filter((s, sidx) => idx !== sidx)
    });
  };

  componentDidMount(){
    if(this.props.item){
      this.setState(Object.assign({}, this.props.item))
    }
    else{
      this.setState({
        schema: [{field:"", name: "", type: ""}]
      });
    }
  }

  render() {
    const variable = (this.props.variable === true) && (this.state.schema !== undefined)
    return (
      <Form onSubmit={this.handleSubmit}>
      {this.props.fields.map((field, i) => {
        if (this.props.item !== undefined & field.notModifiable){
          return(
            <Form.Group key={i}>
              <Form.Label><h5>{field.name}</h5></Form.Label>
              <br />
              {this.state[field.field]}
            </Form.Group>
          )
        }
        else{
          if(field.type === "barrel"){
            return(
              <Form.Group key={i}>
                <Form.Label><h5>{field.name}</h5></Form.Label>
                <BarrelSelect name={field.field}
                              value={this.state[field.field]}
                              onChange={this.onChange}/>
              </Form.Group>
            )
          }
          else{
            return(
              <Form.Group key={i}>
                <Form.Label><h5>{field.name}</h5></Form.Label>
                <Form.Control name={field.field}
                              min={field.min}
                              max={field.max}
                              value={this.state[field.field]}
                              type={field.type}
                              onChange={this.onChange}
                              placeholder={field.name}
                              required/>
              </Form.Group>
            )
          }
        }
      })}

        {variable && (
          <div>
        {this.state.schema.length !== 0 && (
          <div>
            <Form.Label><h5>Nome e tipo di dato</h5></Form.Label>
          </div>
        )}
        {this.state.schema.map((field, idx) => (
            <Form.Group key={idx}>
              <Form.Row>
                <Col>
                  <Form.Control
                    type="text"
                    placeholder={`Nome #${idx + 1}`}
                    value={field.name}
                    onChange={this.handleShareholderNameChange(idx)}
                    required
                  />
                </Col>
                <Col>
                  <Form.Control as="select"
                    value={field.type}
                    onChange={this.handleShareholderTypeChange(idx)}>
                    <option value="text">testo</option>
                    <option value="number">numero</option>
                    <option value="barrel">barile</option>
                  </Form.Control>
                </Col>
                <Col xs="auto" className="my-1">
                  <Button
                    type="button"
                    onClick={this.handleRemoveShareholder(idx)}>
                    -
                  </Button>
                </Col>
              </Form.Row>
            </Form.Group>

        ))}
      <Form.Group>
        <Button
          type="button"
          onClick={this.handleAddShareholder}
          className="small">
          +
        </Button>
      </Form.Group>
      </div>)}

      <hr />
      <div class="float-xl-right">
        <Button variant="secondary" onClick={this.props.toggle}>Annulla</Button>
        {' '}
        <Button type="submit">Ok</Button>
      </div>
    </Form>
    );
  }
}


export default EditForm;
