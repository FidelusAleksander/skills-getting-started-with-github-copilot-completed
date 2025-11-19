import React from 'react';

/**
 * ParticipantList component for displaying and managing activity participants
 * @param {Object} props
 * @param {Array<string>} props.participants - Array of participant email addresses
 * @param {string} props.activityName - Name of the activity
 * @param {Function} props.onRemoveParticipant - Callback function to remove a participant
 */
function ParticipantList({ participants, activityName, onRemoveParticipant }) {
  const handleRemoveClick = (email) => {
    if (window.confirm(`Are you sure you want to remove ${email} from ${activityName}?`)) {
      onRemoveParticipant(activityName, email);
    }
  };

  if (!participants || participants.length === 0) {
    return (
      <div className="text-gray-500 text-sm italic">
        No participants yet
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <h4 className="text-sm font-semibold text-gray-700 mb-2">
        Participants ({participants.length}):
      </h4>
      <ul className="space-y-1">
        {participants.map((email) => (
          <li 
            key={email}
            className="flex items-center justify-between bg-gray-50 px-3 py-2 rounded text-sm"
          >
            <span className="text-gray-700">{email}</span>
            <button
              onClick={() => handleRemoveClick(email)}
              className="ml-2 bg-red-500 hover:bg-red-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold transition-colors duration-200"
              title={`Remove ${email} from ${activityName}`}
              aria-label={`Remove ${email} from ${activityName}`}
            >
              ×
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ParticipantList;