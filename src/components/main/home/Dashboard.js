import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import socketIOClient from 'socket.io-client';
import Card from '../card/Card';
import './Dashboard.css';
import TableElements from '../table-elements/TableElements';
import AddTicket from '../tickets/add/AddTicket';
import { AuthToken } from '../../../helpers/AuthToken';
import { allTickets } from '../../../redux/action/tickets';
import { updateTableEntries } from '../../../redux/action/tickets';
import { getUser } from '../../../redux/action/user';
import EditTicket from '../tickets/edit/EditTicket';

const API_ENDPOINT = 'http://localhost:5000';

const Dashboard = props => {
  const socket = socketIOClient(API_ENDPOINT);

  const { token, allTickets, updateTableEntries, entries, getUser} = props;

  useEffect(() => {
    const dashboardMethods = () => {
      AuthToken(token);
      allTickets();
      updateTableEntries(entries);
      getUser();
    }
    dashboardMethods();

    socket.on('refreshPage', () => {
      dashboardMethods();
    })
  }, [token, allTickets, socket, updateTableEntries, getUser, entries]);

  return (
    <>
      <div className="row">
        <div className="col-12">
          <div className="card-box">
            <Card />
            <TableElements />
            <AddTicket />
            <EditTicket />
          </div>
        </div>
      </div>
    </>
  )
}

Dashboard.propTypes = {
  token: PropTypes.string,
  allTickets: PropTypes.func.isRequired,
  updateTableEntries: PropTypes.func.isRequired,
  getUser: PropTypes.func.isRequired
}

const mapStateToProps = state => ({ 
  token: state.auth.token,
  entries: state.tickets.entries
});

const actions = ({
  allTickets,
  updateTableEntries,
  getUser
})

export default connect(mapStateToProps, actions)(Dashboard);

