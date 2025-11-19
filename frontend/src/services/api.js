/**
 * API service layer for Mergington High School Activities API
 * Handles all communication with the FastAPI backend
 */

const API_BASE_URL = 'http://localhost:8000';

/**
 * Handle API response and extract JSON data
 * @param {Response} response - Fetch response object
 * @returns {Promise<any>} - Parsed JSON data
 * @throws {Error} - If response is not ok
 */
async function handleResponse(response) {
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.detail || `HTTP error! status: ${response.status}`);
  }
  return response.json();
}

/**
 * Fetch all activities from the API
 * @returns {Promise<Object>} - Activities data with activity names as keys
 */
export async function fetchActivities() {
  try {
    const response = await fetch(`${API_BASE_URL}/activities`);
    return await handleResponse(response);
  } catch (error) {
    console.error('Error fetching activities:', error);
    throw error;
  }
}

/**
 * Sign up a student for an activity
 * @param {string} activityName - Name of the activity to sign up for
 * @param {string} email - Student's email address
 * @returns {Promise<Object>} - Success message from API
 */
export async function signupForActivity(activityName, email) {
  try {
    const encodedActivityName = encodeURIComponent(activityName);
    const encodedEmail = encodeURIComponent(email);
    
    const response = await fetch(
      `${API_BASE_URL}/activities/${encodedActivityName}/signup?email=${encodedEmail}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    
    return await handleResponse(response);
  } catch (error) {
    console.error('Error signing up for activity:', error);
    throw error;
  }
}

/**
 * Remove a participant from an activity
 * @param {string} activityName - Name of the activity
 * @param {string} email - Student's email address to remove
 * @returns {Promise<Object>} - Success message from API
 */
export async function removeParticipant(activityName, email) {
  try {
    const encodedActivityName = encodeURIComponent(activityName);
    const encodedEmail = encodeURIComponent(email);
    
    const response = await fetch(
      `${API_BASE_URL}/activities/${encodedActivityName}/participants/${encodedEmail}`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    
    return await handleResponse(response);
  } catch (error) {
    console.error('Error removing participant:', error);
    throw error;
  }
}