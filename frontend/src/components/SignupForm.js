import React, { useState } from 'react';

/**
 * SignupForm component for students to sign up for activities
 * @param {Object} props
 * @param {Object} props.activities - Activities data object with activity names as keys
 * @param {Function} props.onSignup - Callback function when form is submitted
 * @param {boolean} props.isSubmitting - Whether the form is currently being submitted
 */
function SignupForm({ activities, onSignup, isSubmitting }) {
  const [email, setEmail] = useState('');
  const [selectedActivity, setSelectedActivity] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!email || !selectedActivity) {
      return;
    }

    onSignup(selectedActivity, email);
    
    // Reset form after submission
    setEmail('');
    setSelectedActivity('');
  };

  const activityOptions = activities ? Object.keys(activities) : [];

  return (
    <section className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
      <h2 className="text-2xl font-bold text-primary-900 mb-6">Sign Up for an Activity</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Email Input */}
        <div>
          <label 
            htmlFor="email" 
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Email Address
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={isSubmitting}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
            placeholder="your.email@mergington.edu"
          />
        </div>

        {/* Activity Selection */}
        <div>
          <label 
            htmlFor="activity" 
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Select Activity
          </label>
          <select
            id="activity"
            value={selectedActivity}
            onChange={(e) => setSelectedActivity(e.target.value)}
            required
            disabled={isSubmitting}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
          >
            <option value="">Choose an activity...</option>
            {activityOptions.map((activityName) => {
              const activity = activities[activityName];
              const availableSpots = activity.max_participants - activity.participants.length;
              const isFullyBooked = availableSpots <= 0;
              
              return (
                <option 
                  key={activityName} 
                  value={activityName}
                  disabled={isFullyBooked}
                >
                  {activityName} {isFullyBooked ? '(Full)' : `(${availableSpots} spots left)`}
                </option>
              );
            })}
          </select>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting || !email || !selectedActivity}
          className="w-full bg-primary-600 hover:bg-primary-700 text-white font-medium py-2 px-4 rounded-md transition-colors duration-200 disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center"
        >
          {isSubmitting ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              Signing up...
            </>
          ) : (
            'Sign Up'
          )}
        </button>
      </form>
    </section>
  );
}

export default SignupForm;