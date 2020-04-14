import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import _ from 'lodash';
import Box from './Box';
import './Card.css';
import Button from '../../reusable/Button';
import { addModal } from '../../../redux/action/modal';

const Card = props => {
  const { addModal, tickets } = props;

  const findByStatus = value => {
    return (_.filter(tickets, ['status', value])).length;
  }

  const findByPriority = value => {
    return (_.filter(tickets, ['priority', value])).length;
  }

  return (
    <div>
      <Button type="submit" label="Add Ticket" className="btn btn-primary btn-add" handleClick={() => addModal(true)}/>
      <div className="text-center mb-2">
        <div className="row">
          <Box 
            title="Total ticket" 
            cardValue={tickets.length}
            iconClass="fas fa-tag"
          />
          <Box 
            title="Open tickets" 
            cardValue={findByStatus('Open')}
            iconClass="fas fa-archive"
            cardValueClass="text-success"
          />
          <Box 
            title="Closed tickets" 
            cardValue={findByStatus('Closed')}
            iconClass="fas fa-shield-alt"
            cardValueClass="text-muted"
          />
          <Box 
            title="High Priority tickets" 
            cardValue={findByPriority('High')}
            iconClass="fas fa-temperature-high"
            cardValueClass="text-danger"
          />
          <Box 
            title="Medium Priority tickets" 
            cardValue={findByPriority('Medium')}
            iconClass="fas fa-folder-minus"
            cardValueClass="text-warning"
          />
          <Box 
            title="Low Priority tickets" 
            cardValue={findByPriority('Low')}
            iconClass="fas fa-battery-quarter"
            cardValueClass="text-muted"
          />
        </div>
      </div>
    </div>
  )
}

Card.propTypes = {
  tickets: PropTypes.array.isRequired,
  addModal: PropTypes.func.isRequired
}

const mapStateToProps = state => ({ tickets: state.tickets.tickets});

export default connect(mapStateToProps, { addModal })(Card);
