import React from 'react';
import ActivityCard from './ActivityCard';

/**
 * ActivityList component for displaying all activities in a responsive grid
 * @param {Object} props
 * @param {Object} props.activities - Activities data object with activity names as keys
 * @param {boolean} props.loading - Whether activities are currently being loaded
 * @param {Function} props.onRemoveParticipant - Callback function to remove a participant
 */
function ActivityList({ activities, loading, onRemoveParticipant }) {
  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
        <span className="ml-3 text-primary-700 font-medium">Loading activities...</span>
      </div>
    );
  }

  if (!activities || Object.keys(activities).length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-500 text-lg">No activities available</div>
        <p className="text-gray-400 text-sm mt-2">Check back later for new activities</p>
      </div>
    );
  }

  return (
    <section className="mb-8">
      <h2 className="text-2xl font-bold text-primary-900 mb-6">Available Activities</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Object.entries(activities).map(([name, activity]) => (
          <ActivityCard
            key={name}
            name={name}
            activity={activity}
            onRemoveParticipant={onRemoveParticipant}
          />
        ))}
      </div>
    </section>
  );
}

export default ActivityList;