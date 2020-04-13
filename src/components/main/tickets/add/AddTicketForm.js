import React, {useState} from 'react';
import { connect } from 'react-redux';
import socketIOClient from 'socket.io-client';
import FormInput from '../../../reusable/FormInput';
import Button from '../../../reusable/Button';
import DropDown from '../../../reusable/dropDown.js/DropDown';
import { departmentsArray, prioritiesArray } from '../../../../helpers/Helpers';
import { addNewTicket } from '../../../../services/ticket.service';
import { addModal } from '../../../../redux/action/modal';

const API_ENDPOINT = 'http://localhost:5000';

const AddTicketForm = props => {
  const socket = socketIOClient(API_ENDPOINT);

  const { addModal } = props;
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

  const onAddTicket =  async e => {
    e.preventDefault();
    ticket.priority = priority;
    ticket.department = department;
    await addNewTicket(ticket);
    socket.emit('refresh', {});
    resetForm();
  }

  const resetForm = () => {
    setTicket({
      fullName: '',
      email: '',
      subject: '',
      description: '',
      department: '',
      priority: ''
    });
    setDepartment('Select Department');
    setPriority('Select Priority')
  }

  return (
    <>
      <form onSubmit={onAddTicket}>
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
          label="Add"
          disabled={
            !fullName || !email || !subject || !description || !department || !priority
          }
        />
        &nbsp;&nbsp;&nbsp;
        <Button 
          className="btn btn-danger"
          label="Cancel"
          handleClick={() => addModal(false)}
        />
      </form>
    </>
  )
}


export default connect(null, { addModal })(AddTicketForm);
