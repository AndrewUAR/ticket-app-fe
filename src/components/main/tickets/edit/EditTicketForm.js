import React, {useState, useEffect} from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import socketIOClient from 'socket.io-client';
import FormInput from '../../../reusable/FormInput';
import Button from '../../../reusable/Button';
import DropDown from '../../../reusable/dropDown.js/DropDown';
import { departmentsArray, prioritiesArray } from '../../../../helpers/Helpers';
import { editTicket } from '../../../../services/ticket.service';
import { editModal } from '../../../../redux/action/modal';

const API_ENDPOINT = 'http://localhost:5000';

const EditTicketForm = props => {
  const socket = socketIOClient(API_ENDPOINT);

  const { editModal, selectedTicket } = props;
  let departments = departmentsArray();
  let priorities = prioritiesArray();

  const [department, setDepartment] = useState('Select Department');
  const [priority, setPriority] = useState('Select Priority');
  const [ticket, setTicket] = useState({
    fullName: '',
    email: '',
    subject: '',
    description: '',
    department: '',
    priority: ''
  });

  const { fullName, email, subject, description } = ticket;

  useEffect(() => {
    if (selectedTicket) {
      setTicket({
        fullName: selectedTicket.fullName,
        email: selectedTicket.email,
        subject: selectedTicket.subject,
        description: selectedTicket.description,
        department: selectedTicket.department,
        priority: selectedTicket.priority
      });
      setDepartment(selectedTicket.department);
      setPriority(selectedTicket.priority)
    }
  }, [selectedTicket])

  const getDropDownValue = item => {
    if (item.key === 'departments') {
      setDepartment(item.title);
    } else {
      setPriority(item.title);
    }
  }

  const onChange = e => {
    const { name, value } = e.target;
    setTicket(prevState => ({
      ...prevState,
      [name]: value
    }))
  }

  const onEditTicket =  async e => {
    e.preventDefault();
    ticket.priority = priority;
    ticket.department = department;
    await editTicket(selectedTicket._id, ticket);
    socket.emit('refresh', {});
  }


  return (
    <>
      <form onSubmit={onEditTicket}>
        <div className="form-group">
          <FormInput 
            type="text"
            name="fullName"
            label="Full name"
            className="form-control"
            placeholder="Full name"
            value={ticket.fullName}
            error=""
            onChange={onChange}
          />
        </div>
        <div className="form-group">
          <FormInput 
            type="text"
            name="email"
            label="Email"
            className="form-control"
            placeholder="Email"
            value={ticket.email}
            error=""
            onChange={onChange}
          />
        </div>
        <div className="form-group">
          <DropDown
            title={department}
            label="Department"
            list={departments}
            getDropDownValue={getDropDownValue}
          />
        </div>
        <div className="form-group">
          <DropDown
            title={priority}
            label="Priority"
            list={priorities}
            getDropDownValue={getDropDownValue}
          />
        </div>
        <div className="form-group">
          <FormInput 
            type="text"
            name="subject"
            label="Subject"
            className="form-control"
            placeholder="Subject"
            value={ticket.subject}
            error=""
            onChange={onChange}
          />
        </div>
        <div className="form-group">
          <label>Description</label>
          <textarea
            className="form-control"
            name="description"
            row="5"
            col="40"
            value={ticket.description}
            onChange={onChange}
          ></textarea>
        </div>
        <Button 
          className="btn btn-primary"
          label="Edit"
          disabled={
            !fullName || !email || !subject || !description || !department || !priority
          }
        />
        &nbsp;&nbsp;&nbsp;
        <Button 
          className="btn btn-danger"
          label="Cancel"
          handleClick={() => editModal(false)}
        />
      </form>
    </>
  )
}

EditTicketForm.propTypes = {
  selectedTicket: PropTypes.object
}

const mapStateToProps = state => ({
  selectedTicket: state.tickets.selectedTicket
})

export default connect(mapStateToProps, { editModal })(EditTicketForm);
