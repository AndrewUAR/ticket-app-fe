import React, {useState, useEffect} from 'react';
import { connect } from 'react-redux';
import Modal from '../../../reusable/modal/Modal';
import AddTicketForm from './AddTicketForm';
import { addModal } from '../../../../redux/action/modal';

const AddTicket = props => {
  const { add, addModal } = props;
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(add);
  }, [setVisible, add])

  const addTicketModal = () => {
    addModal(false);
  }

  return (
    <>
      <Modal 
        header="Add New Ticket"
        visible={visible}
        dismiss={addTicketModal}
        children={<AddTicketForm addModal={addModal} />}
      />
    </>
  )
}
const mapStateToProps = state => ({
  add: state.modal.add
})

export default connect(mapStateToProps, { addModal })(AddTicket);
