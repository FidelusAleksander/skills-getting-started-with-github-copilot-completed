import React from 'react';
import ParticipantList from './ParticipantList';

/**
 * ActivityCard component for displaying individual activity information
 * @param {Object} props
 * @param {string} props.name - Activity name
 * @param {Object} props.activity - Activity data object
 * @param {Function} props.onRemoveParticipant - Callback function to remove a participant
 */
function ActivityCard({ name, activity, onRemoveParticipant }) {
  const { description, schedule, max_participants, participants } = activity;
  const availableSpots = max_participants - participants.length;

  return (
    <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200 hover:shadow-lg transition-shadow duration-200">
      {/* Activity Header */}
      <div className="mb-4">
        <h3 className="text-xl font-bold text-primary-900 mb-2">{name}</h3>
        <p className="text-gray-600 text-sm mb-2">{description}</p>
        <p className="text-primary-700 text-sm font-medium">{schedule}</p>
      </div>

      {/* Capacity Information */}
      <div className="mb-4 p-3 bg-gray-50 rounded-md">
        <div className="flex justify-between items-center text-sm">
          <span className="text-gray-600">
            Available spots: <span className="font-semibold text-primary-700">{availableSpots}</span>
          </span>
          <span className="text-gray-600">
            Max: <span className="font-semibold">{max_participants}</span>
          </span>
        </div>
        
        {/* Progress Bar */}
        <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-primary-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${(participants.length / max_participants) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* Participants List */}
      <ParticipantList 
        participants={participants}
        activityName={name}
        onRemoveParticipant={onRemoveParticipant}
      />
    </div>
  );
}

export default ActivityCard;