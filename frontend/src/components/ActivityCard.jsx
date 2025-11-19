import ParticipantsList from './ParticipantsList'

function ActivityCard({ name, details, onRemoveParticipant }) {
  const spotsLeft = details.max_participants - details.participants.length

  return (
    <div className="activity-card">
      <h4>{name}</h4>
      <p>{details.description}</p>
      <p><strong>Schedule:</strong> {details.schedule}</p>
      <p><strong>Availability:</strong> {spotsLeft} spots left</p>
      <ParticipantsList
        activityName={name}
        participants={details.participants}
        onRemoveParticipant={onRemoveParticipant}
      />
    </div>
  )
}

export default ActivityCard
