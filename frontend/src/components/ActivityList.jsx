import ActivityCard from './ActivityCard'

function ActivityList({ activities, onRemoveParticipant }) {
  const activityEntries = Object.entries(activities)

  return (
    <section id="activities-container">
      <h3>Available Activities</h3>
      <div id="activities-list">
        {activityEntries.length === 0 ? (
          <p>Loading activities...</p>
        ) : (
          activityEntries.map(([name, details]) => (
            <ActivityCard
              key={name}
              name={name}
              details={details}
              onRemoveParticipant={onRemoveParticipant}
            />
          ))
        )}
      </div>
    </section>
  )
}

export default ActivityList
