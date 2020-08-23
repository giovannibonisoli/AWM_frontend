import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';

class VariableEditForm extends React.Component {
  state = {
    schema: [{ field:"", name: "", type: ""}]
  }

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
    this.props.action({
      id : this.state.id,
      name: this.state.name,
      description: this.state.description,
      schema: this.state.schema
    });
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
      this.setState({
        id : this.props.item.id,
        name: this.props.item.name,
        description: this.props.item.description,
        schema: JSON.parse(this.props.item.schema)
      });
    }
  }

  render() {
    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Group>
          <Form.Label><h5>Nome Operazione</h5></Form.Label>
          {
            !this.props.item ? (
                <Form.Control name="name"
                              type="text"
                              placeholder="Operation name"
                              value={this.state.name}
                              onChange={this.onChange}
                              required />
              ) : (<div>{this.state.name}<br/></div>)
          }
        </Form.Group>
        <Form.Group>
          <Form.Label><h5>Descrizione</h5></Form.Label>
          <Form.Control name="description"
                        value={this.state.description}
                        onChange={this.onChange}
                        as="textarea"
                        rows="3"
                        required/>
        </Form.Group>
        {
          this.state.schema.length !== 0 ? (
            <div>
              <Form.Label><h5>Nome e tipo di dato</h5></Form.Label>
            </div>
          ) : (
            <div></div>
          )
        }
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


export default VariableEditForm;
