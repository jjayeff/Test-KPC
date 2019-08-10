import React, { Component } from 'react';
import { Modal, Button } from 'semantic-ui-react';

export class ModalModalExample extends Component {
  render() {
    return (
      <Modal open={this.props.test} trigger={this.props.trigger}>
        <Modal.Header>{this.props.title}</Modal.Header>
        <Modal.Content>{this.props.content}</Modal.Content>
        <Modal.Actions>
          <Button onClick={() => this.props.close(false)} negative>
            Close
          </Button>
        </Modal.Actions>
      </Modal>
    );
  }
}

export default ModalModalExample;
