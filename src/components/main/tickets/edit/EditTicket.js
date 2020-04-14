import React, {useState, useEffect} from 'react';
import { connect } from 'react-redux';
import Modal from '../../../reusable/modal/Modal';
import EditTicketForm from './EditTicketForm';
import { editModal } from '../../../../redux/action/modal';

const EditTicket = props => {
  const { edit, editModal } = props;
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(edit);
  }, [setVisible, edit])

  const editTicketModal = () => {
    editModal(false);
  }

  return (
    <>
      <Modal 
        header="Update Ticket"
        visible={visible}
        dismiss={editTicketModal}
        children={<EditTicketForm editModal={editModal} />}
      />
    </>
  )
}
const mapStateToProps = state => ({
  edit: state.modal.edit
})

export default connect(mapStateToProps, { editModal })(EditTicket);
