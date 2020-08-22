import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button  from 'react-bootstrap/Button';


class EliminationForm extends React.Component {
  state = {
    modal: false
  }

  toggle = () => {
    this.setState(prevState => ({
      modal: !prevState.modal
    }))
  }

  deleteItem = () => {
    this.props.deleteAction(this.props.item.id);
    this.toggle();
  }

  render() {
    return (
      <div>
        <Button variant="danger"
                onClick={this.toggle}
                style={{float: "left", marginLeft: "10px",marginRight:"10px"}}>Elimina
        </Button>
        <Modal show={this.state.modal} onHide={this.toggle}>
          <Modal.Header>
            <Modal.Title>
              {`Elimina ${this.props.objectName}`}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Sicuro di voler procedere?
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.toggle}>Annulla</Button>
            <Button variant="primary" onClick={this.deleteItem}>Elimina</Button>
          </Modal.Footer>
        </Modal>
      </div>
    )
  }
}

export default EliminationForm;
