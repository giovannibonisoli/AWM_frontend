import React, { Component } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button  from 'react-bootstrap/Button';

import AddEditForm from './AddEditForm';

class ModalForm extends Component {
  state = {
    modal: false
  }

  toggle = () => {
    this.setState(prevState => ({
      modal: !prevState.modal
    }))
  }

  render() {
      const label = this.props.buttonLabel

      let button = ''
      let title = ''

      if(label === 'Modifica'){
        button = <Button
                  color="warning"
                  onClick={this.toggle}
                  style={{float: "left", marginRight:"10px"}}>{label}
                </Button>
        title = 'Modifica dati batteria'
      } else {
        button = <Button
                  color="success"
                  onClick={this.toggle}
                  style={{float: "left", marginRight:"10px"}}>{label}
                </Button>
        title = 'Aggiungi nuova batteria'
      }


      return (
      <div>
        {button}
        <Modal show={this.state.modal} onHide={this.toggle} className={this.props.className}>
          <Modal.Header><h3>{title}</h3></Modal.Header>
          <Modal.Body>
            <AddEditForm url={this.props.url}
              addItemToState={this.props.addItemToState}
              updateState={this.props.updateState}
              toggle={this.toggle}
              item={this.props.item}
              closeAction={this.toggle}
              fields={this.props.fields}/>

          </Modal.Body>
        </Modal>
      </div>
    )
  }
}

export default ModalForm;
