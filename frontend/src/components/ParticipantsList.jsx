function ParticipantsList({ activityName, participants, onRemoveParticipant }) {
  return (
    <div className="participants-section">
      <div className="participants-title">
        Current Participants ({participants.length}):
      </div>
      {participants && participants.length > 0 ? (
        <ul className="participants-list">
          {participants.map((email) => (
            <li key={email}>
              <span className="participant-email">{email}</span>
              <button
                className="delete-btn"
                onClick={() => onRemoveParticipant(activityName, email)}
                title="Remove participant"
              >
                ×
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <div className="no-participants">No participants yet</div>
      )}
    </div>
  )
}

export default ParticipantsList
