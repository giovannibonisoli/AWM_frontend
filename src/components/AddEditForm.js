import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

class AddEditForm extends React.Component {
  state = {
  }

  onChange = e => {
    this.setState({[e.target.name]: e.target.value});
  }

  submitFormAdd = e => {
    e.preventDefault();
    this.props.addItemToState(this.state);
    this.props.toggle();

  }

  submitFormEdit = e => {
    e.preventDefault()
    this.props.updateState(this.state);
    this.props.toggle();
    

    /*fetch(`${this.props.url}${this.props.item.id}/`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify(this.state)
    })
      .then(response => response.json())
      .then(item => {
        this.props.updateState(item);
        this.props.toggle();

      })
      .catch(err => console.log(err))*/
  }

  componentDidMount(){
    if(this.props.item){
      this.props.fields.map(field => {
        return this.setState({[field.field]: this.props.item[field.field]});
      });
    }
  }

  render() {
    return (
      <Form onSubmit={this.props.item ? this.submitFormEdit : this.submitFormAdd}>

          {this.props.fields.map(field => {
            return(
              <Form.Group key={field.field}>
                <Form.Label><h5>{field.name}</h5></Form.Label>
                <Form.Control name={field.field}
                              value={this.state[field.field]}
                              type={field.type}
                              onChange={this.onChange}
                              placeholder={field.name} />
              </Form.Group>
            )
          })}
        <div>
          <Button variant="dark" onClick={this.props.toggle}>Annulla</Button>
          {' '}
          <Button type="submit">Aggiungi</Button>
        </div>
      </Form>
    );
  }
}

export default AddEditForm;
