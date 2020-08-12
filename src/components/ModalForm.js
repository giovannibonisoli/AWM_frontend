import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button  from 'react-bootstrap/Button';

import AddEditForm from './AddEditForm';

class ModalForm extends React.Component {
  state = {
    modal: false
  }

  toggle = () => {
    this.setState(prevState => ({
      modal: !prevState.modal
    }))
  }

  render() {
    let button = ''
    let title = ''

    if(this.props.buttonLabel === 'Modifica'){
      button = <Button
                  variant="primary"
                  onClick={this.toggle}
                  style={{float: "left", marginRight:"10px"}}>
                    {this.props.buttonLabel}
                </Button>
      title = `Modifica dati ${this.props.title}`
    } else {
      button = <Button
                  variant="success"
                  onClick={this.toggle}
                  style={{float: "left", marginRight:"10px"}}>
                    {this.props.buttonLabel}
               </Button>
      title = `Inserisci dati ${this.props.title}`
    }

    return (
      <div>
        {button}
        <Modal show={this.state.modal} onHide={this.toggle}>
          <Modal.Header>
            <Modal.Title>{title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <AddEditForm addItemToState={this.props.addItemToState}
              updateState={this.props.updateState}
              toggle={this.toggle}
              item={this.props.item}
              fields={this.props.fields}/>
          </Modal.Body>
        </Modal>
      </div>
    )
  }
}

export default ModalForm;
