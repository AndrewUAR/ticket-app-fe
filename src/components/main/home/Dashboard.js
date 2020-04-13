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

const API_ENDPOINT = 'http://localhost:5000';

const Dashboard = props => {
  const socket = socketIOClient(API_ENDPOINT);

  const { allTickets } = props;
  const { token } = props;

  useEffect(() => {
    const dashboardMethods = () => {
      AuthToken(token);
      allTickets();
    }
    dashboardMethods();

    socket.on('refreshPage', () => {
      dashboardMethods();
    })
  }, [token, allTickets, socket]);

  return (
    <>
      <div className="row">
        <div className="col-12">
          <div className="card-box">
            <Card />
            <TableElements />
            <AddTicket />
          </div>
        </div>
      </div>
    </>
  )
}

Dashboard.propTypes = {
  token: PropTypes.string,
  allTickets: PropTypes.func.isRequired
}

const mapStateToProps = state => ({ token: state.auth.token});

export default connect(mapStateToProps, { allTickets })(Dashboard);

