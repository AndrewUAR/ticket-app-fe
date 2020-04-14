import React, { useState, useEffect} from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import moment from 'moment';
import { selectedTicket } from '../../../../redux/action/tickets';
import { editModal } from '../../../../redux/action/modal';
import { deleteTicket, closeTicket } from '../../../../services/ticket.service';
import './Table.css';

const TABLE_HEAD = [
  'ID',
  'FullName',
  'Subject',
  'Priority',
  'Status',
  'Created',
  'Completed',
  'Action'
]

const Table = props => {
  const { tickets, entries, selectedTicket, editModal, user } = props;
  const [tableTickets, setTableTickets] = useState(tickets);

  useEffect(() => {
    const tableEntries = tickets.slice(0, parseInt(entries, 10));
    setTableTickets(tableEntries);
  }, [setTableTickets, tickets, entries]);

  const openEditModal = ticket => {
    editModal(true);
    selectedTicket(ticket);
  }

  const deleteUserTicket = id => {
    deleteTicket(id);
  }

  const markUserTicket = id => {
    closeTicket(id);
  }

  return (
    <div className="col-sm-12 table-responsive">
      <table className="table table-centered mb-0" id="ticketTable">
        <thead className="font-14 bg-light">
          <tr>
            {
              TABLE_HEAD.map((tableHead, i) => 
                <th key={i} className="font-weight-medium">
                  {tableHead} &nbsp;&nbsp;
                  <i className="fas fa-angle-up icon"></i>
                </th>
              )
            }
          </tr>
        </thead>
        <tbody className="font-14">

          {
            tableTickets.map(ticket => 
              <tr key={ticket._id}>
                <td>#{ticket.ticketId}</td>
                <td>{ticket.fullName}</td>
                <td>{ticket.subject}</td>
                <td>
                  {
                    ticket.priority === 'High' ?
                    <span className="badge badge-danger">
                      {ticket.priority}
                    </span> : ticket.priority === 'Medium' ?
                    <span className="badge badge-warning">
                      {ticket.priority}
                    </span> : 
                    <span className="badge badge-secondary">
                      {ticket.priority}
                    </span>
                  }
                </td>
                <td>
                  {
                    ticket.status === 'Open' ?
                      <span className="badge badge-success">{ticket.status}</span>
                      : <span className="badge badge-danger">{ticket.status}</span>
                  }
                </td>
                <td>{moment(ticket.created).format('MM/DD/YYYY')}</td>
                <td>{moment(ticket.dueDate).format('MM/DD/YYYY')}</td>
                <td className={
                  user._id === ticket.user ? 'actions actions-bg' : 'actions'
              }>
                  {
                      user._id === ticket.user ?
                      <>
                          <a href='#!' className="btn text-white btn-sm"
                              onClick={() => deleteUserTicket(ticket._id)}
                          >
                              <i className="fas fa-trash"></i>
                          </a>
                          <a href='#!' 
                          className={
                              ticket.status === 'Closed' ? 'btn text-white btn-sm disabled' : 'btn text-white btn-sm'
                          }
                              onClick={() => markUserTicket(ticket._id)}
                          >
                              <i className="fas fa-check"></i>
                          </a>
                          <a href='#!' 
                          className={
                              ticket.status === 'Closed' ? 'btn text-white btn-sm disabled' : 'btn text-white btn-sm'
                          }
                              onClick={() => openEditModal(ticket)}
                          >
                              <i className="fas fa-pencil-alt"></i>
                          </a>
                      </>
                      : user.role === 'Admin' ?
                      <>
                          <a href='#!' className="btn text-white btn-sm"
                              onClick={() => deleteUserTicket(ticket._id)}
                          >
                              <i className="fas fa-trash"></i>
                          </a>
                          <a href='#!' 
                          className={
                              ticket.status === 'Closed' ? 'btn text-white btn-sm disabled' : 'btn text-white btn-sm'
                          }
                              onClick={() => markUserTicket(ticket._id)}
                          >
                              <i className="fas fa-check"></i>
                          </a>
                      </>
                      :
                      <>
                          <a href='#!' className="btn btn-sm disabled">
                              <i className="fas fa-trash"></i>
                          </a>
                          <a href='#!' className="btn btn-sm disabled">
                              <i className="fas fa-check"></i>
                          </a>
                          <a href='#!' className="btn btn-sm disabled">
                              <i className="fas fa-pencil-alt"></i>
                          </a>
                      </>

                  }
                  
              </td>
              </tr>
            )
          }
          
        </tbody>
      </table>
    </div>
  )
}

Table.propTypes = {
  tickets: PropTypes.array.isRequired,
  entries: PropTypes.any,
  selectedTicket: PropTypes.func.isRequired,
  editModal: PropTypes.func.isRequired,
  user: PropTypes.object
}

const mapStateToProps = state => ({
  tickets: state.tickets.tickets,
  entries: state.tickets.entries, 
  user: state.user
})

const actions = ({
  selectedTicket,
  editModal
})

export default connect(mapStateToProps, actions)(Table);
