import React, { useState, useEffect } from 'react';
import ActivityList from './components/ActivityList';
import SignupForm from './components/SignupForm';
import MessageDisplay from './components/MessageDisplay';
import { fetchActivities, signupForActivity, removeParticipant } from './services/api';

function App() {
  // State management
  const [activities, setActivities] = useState({});
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('info');
  const [messageVisible, setMessageVisible] = useState(false);

  // Load activities on component mount
  useEffect(() => {
    loadActivities();
  }, [loadActivities]);

  // Auto-hide messages after 5 seconds
  useEffect(() => {
    if (messageVisible) {
      const timer = setTimeout(() => {
        setMessageVisible(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [messageVisible]);

  /**
   * Load activities from the API
   */
  const loadActivities = async () => {
    try {
      setLoading(true);
      const activitiesData = await fetchActivities();
      setActivities(activitiesData);
    } catch (error) {
      showMessage('Failed to load activities. Please try again later.', 'error');
    } finally {
      setLoading(false);
    }
  };

  /**
   * Show a message to the user
   * @param {string} text - Message text
   * @param {string} type - Message type: 'success', 'error', or 'info'
   */
  const showMessage = (text, type = 'info') => {
    setMessage(text);
    setMessageType(type);
    setMessageVisible(true);
  };

  /**
   * Handle activity signup
   * @param {string} activityName - Name of the activity
   * @param {string} email - Student's email address
   */
  const handleSignup = async (activityName, email) => {
    try {
      setIsSubmitting(true);
      await signupForActivity(activityName, email);
      showMessage(`Successfully signed up ${email} for ${activityName}!`, 'success');
      // Refresh activities to show updated participant list
      await loadActivities();
    } catch (error) {
      showMessage(error.message, 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  /**
   * Handle participant removal
   * @param {string} activityName - Name of the activity
   * @param {string} email - Student's email address to remove
   */
  const handleRemoveParticipant = async (activityName, email) => {
    try {
      await removeParticipant(activityName, email);
      showMessage(`Successfully removed ${email} from ${activityName}!`, 'success');
      // Refresh activities to show updated participant list
      await loadActivities();
    } catch (error) {
      showMessage(error.message, 'error');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-primary-900 text-white shadow-lg">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold">Mergington High School</h1>
          <p className="text-primary-200 mt-1">Extracurricular Activities Portal</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Message Display */}
        <MessageDisplay
          message={message}
          type={messageType}
          isVisible={messageVisible}
        />

        {/* Activities List */}
        <ActivityList
          activities={activities}
          loading={loading}
          onRemoveParticipant={handleRemoveParticipant}
        />

        {/* Signup Form */}
        <SignupForm
          activities={activities}
          onSignup={handleSignup}
          isSubmitting={isSubmitting}
        />
      </main>

      {/* Footer */}
      <footer className="bg-primary-800 text-white mt-12">
        <div className="container mx-auto px-4 py-6 text-center">
          <p className="text-primary-200">
            &copy; 2025 Mergington High School Activities Portal
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
