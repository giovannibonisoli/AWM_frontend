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

    if(this.props.type === 'update'){
      button = <Button
                  variant="primary"
                  onClick={this.toggle}
                  style={{float: "left", marginRight:"10px"}}>
                    Modifica
                </Button>
      title = `Modifica ${this.props.objectName}`
    } else {
      button = <Button
                  variant="success"
                  onClick={this.toggle}
                  style={{float: "left", marginRight:"10px"}}>
                    {`Aggiungi ${this.props.objectName}`}
               </Button>
      title = `Nuova ${this.props.objectName}`
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
              type={this.props.type}
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
