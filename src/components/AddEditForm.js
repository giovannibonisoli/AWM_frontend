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
    console.log(this.props.url);

    fetch(this.props.url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
          Accept: 'application/json'
      },
      body: JSON.stringify(this.state)
    })
      .then(response => {
        return response.statusText === 'Created' ? response.json() : null
      })
      .then(item => {
          this.props.addItemToState(item);
          this.props.toggle();
      })
      .catch(err => console.log(err))
  }

  submitFormEdit = e => {
    e.preventDefault()
    console.log(this.state);
    /*fetch('http://localhost:3000/crud', {
      method: 'put',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id: this.state.id,
        first: this.state.first,
        last: this.state.last,
        email: this.state.email,
        phone: this.state.phone,
        location: this.state.location,
        hobby: this.state.hobby
      })
    })
      .then(response => response.json())
      .then(item => {
        if(Array.isArray(item)) {
          // console.log(item[0])
          this.props.updateState(item[0])
          this.props.toggle()
        } else {
          console.log('failure')
        }
      })
      .catch(err => console.log(err))*/
  }

  render() {
    return (
      <Form onSubmit={this.props.item ? this.submitFormEdit : this.submitFormAdd}>

          {this.props.fields.map(field => {
            return(
              <Form.Group key={field.field}>
                <Form.Label><h5>{field.name}</h5></Form.Label>
                <Form.Control name={field.field} type={field.type} onChange={this.onChange} placeholder={field.name} />
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
