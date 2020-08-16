import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button  from 'react-bootstrap/Button';

import EditForm from './EditForm';
import VariableEditForm from './VariableEditForm';

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
    return (
      <div>
        <Button variant={this.props.buttonInfo[1]}
                onClick={this.toggle}
                style={{float: "left", marginRight:"10px"}}>
          {this.props.buttonInfo[0]}
        </Button>
        <Modal size="lg" show={this.state.modal} onHide={this.toggle}>
          <Modal.Header>
            <Modal.Title>{this.props.title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          {
            this.props.variable ?
            (<VariableEditForm
                  action={this.props.action}
                  toggle={this.toggle}
                  item={this.props.item}
                  fields={this.props.fields}/>)
            :
            (<EditForm type={this.props.type}
                        action={this.props.action}
                        toggle={this.toggle}
                        item={this.props.item}
                        fields={this.props.fields}/>)
          }
          </Modal.Body>
        </Modal>
      </div>
    )
  }
}

export default ModalForm;
