import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Modal, Button } from '..';
import { EditEvent } from '../../components';
import modalCss from './../Modal/Modal.css'
import classNames from 'classnames';

const onManageDisableScrolling = (componentId, scrollingDisabled = true) => {
  // We are just checking the value for now
  console.log('Toggling Modal - scrollingDisabled currently:', componentId, scrollingDisabled);
};

const KEY_CODE_ESCAPE = 27;

class ModalSchedule extends PureComponent {
  constructor(props) {
    super(props);
    this.state = { isOpen: false, 
    type: null,
        datum: { title:null, resource:{ price:null, publicData:null, seats :null }}
    , };
    this.handleOpen = this.handleOpen.bind(this);
    this.onClose = this.onClose.bind(this);
    this.handleBodyKeyUp = this.handleBodyKeyUp.bind(this);
  }
  componentDidMount() {
    // const { id, isOpen, onManageDisableScrolling } = this.props;
    //    onManageDisableScrolling(id, isOpen);
    document.body.addEventListener('keyup', this.handleBodyKeyUp);
  }

  /*   componentWillReceiveProps(nextProps) {
    const { id, isOpen, onManageDisableScrolling } = this.props;
    if (nextProps.isOpen !== isOpen) {
      onManageDisableScrolling(id, nextProps.isOpen);
    }
  }*/

  componentWillUnmount() {
    // const { id, onManageDisableScrolling } = this.props;
    document.body.removeEventListener('keyup', this.handleBodyKeyUp);
    // onManageDisableScrolling(id, false);
  }

  handleOpen() {
    this.setState({ isOpen: true });
  }
  onClose() {
    this.props.handleOnClose(false);
  }
  setModalState(props) {
    const {isOpen, value:{ type, datum}}=props
    this.setState({ isOpen, type, datum });
  }
  handleBodyKeyUp(event) {
    const { isOpen } = this.props;
    if (event.keyCode === KEY_CODE_ESCAPE && isOpen) {
      this.props.handleOnClose(false);
    }
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.isOpen !== this.props.isOpen) {
      this.setModalState(this.props);
    }
  }

  onChange = type => this.props.onChange(type);

  onSubmit = e => this.props.onSubmit(e);

  render() {
    const {isOpen}=this.state
        const {datum}=this.props
        const {options}=this.props
    const {isEditable}=this.props
    const {isEditing}=this.props



    const modalClass = isOpen ? modalCss.isOpen : modalCss.isClosed;
    const classes = classNames(modalClass, classNames);

    return (
      <div className={classes}>
        <Modal
          {...this.props}
          isOpen={isOpen}
          onClose={this.onClose}
          
          onManageDisableScrolling={onManageDisableScrolling}
        >
          <div style={{ margin: '1rem' }}>
          
          <EditEvent datum={datum} options={options}
          onChange={this.onChange}
          onSubmit={this.onSubmit}
           isEditing={isEditing} isEditable={isEditable} />
          </div>
        </Modal>
        <div style={{ margin: '1rem' }}>
          <Button onClick={this.handleOpen}>Open</Button>
        </div>
      </div>
    );
  }
}
ModalSchedule.defaultProps = {
  isOpen: false,
  isEditing:false,
  isEditable:false,

};
const { bool, func, object } = PropTypes;
ModalSchedule.propTypes = {
  isOpen: bool.isRequired,
  handleOnClose: func.isRequired,
  value: object.isRequired,
  isEditing:bool.isRequired,
  isEditable:bool.isRequired
};
export default ModalSchedule;
