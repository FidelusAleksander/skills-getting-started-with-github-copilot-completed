"""
Tests for the FastAPI application endpoints.
"""

import pytest
from fastapi import status


class TestRootEndpoint:
    """Tests for the root endpoint."""
    
    def test_root_redirects_to_static_index(self, client):
        """Test that root endpoint redirects to static index.html."""
        response = client.get("/", follow_redirects=False)
        assert response.status_code == status.HTTP_307_TEMPORARY_REDIRECT
        assert response.headers["location"] == "/static/index.html"


class TestActivitiesEndpoint:
    """Tests for the activities endpoint."""
    
    def test_get_activities_returns_all_activities(self, client, reset_activities):
        """Test that GET /activities returns all activities."""
        response = client.get("/activities")
        assert response.status_code == status.HTTP_200_OK
        
        activities = response.json()
        assert isinstance(activities, dict)
        assert len(activities) == 9
        
        # Check specific activities exist
        assert "Chess Club" in activities
        assert "Programming Class" in activities
        assert "Basketball Team" in activities
        
    def test_activities_have_required_fields(self, client, reset_activities):
        """Test that activities have all required fields."""
        response = client.get("/activities")
        activities = response.json()
        
        for activity_name, activity_data in activities.items():
            assert "description" in activity_data
            assert "schedule" in activity_data
            assert "max_participants" in activity_data
            assert "participants" in activity_data
            assert isinstance(activity_data["participants"], list)
            assert isinstance(activity_data["max_participants"], int)
            
    def test_activities_data_integrity(self, client, reset_activities):
        """Test specific activity data integrity."""
        response = client.get("/activities")
        activities = response.json()
        
        chess_club = activities["Chess Club"]
        assert chess_club["description"] == "Learn strategies and compete in chess tournaments"
        assert chess_club["schedule"] == "Fridays, 3:30 PM - 5:00 PM"
        assert chess_club["max_participants"] == 12
        assert "michael@mergington.edu" in chess_club["participants"]
        assert "daniel@mergington.edu" in chess_club["participants"]


class TestSignupEndpoint:
    """Tests for the activity signup endpoint."""
    
    def test_successful_signup(self, client, reset_activities):
        """Test successful signup for an activity."""
        email = "newstudent@mergington.edu"
        activity = "Chess Club"
        
        response = client.post(f"/activities/{activity}/signup?email={email}")
        assert response.status_code == status.HTTP_200_OK
        
        result = response.json()
        assert "message" in result
        assert email in result["message"]
        assert activity in result["message"]
        
        # Verify the participant was actually added
        activities_response = client.get("/activities")
        activities = activities_response.json()
        assert email in activities[activity]["participants"]
        
    def test_signup_for_nonexistent_activity(self, client, reset_activities):
        """Test signup for an activity that doesn't exist."""
        email = "student@mergington.edu"
        activity = "Nonexistent Club"
        
        response = client.post(f"/activities/{activity}/signup?email={email}")
        assert response.status_code == status.HTTP_404_NOT_FOUND
        
        result = response.json()
        assert result["detail"] == "Activity not found"
        
    def test_duplicate_signup(self, client, reset_activities):
        """Test that duplicate signups are prevented."""
        email = "michael@mergington.edu"  # Already in Chess Club
        activity = "Chess Club"
        
        response = client.post(f"/activities/{activity}/signup?email={email}")
        assert response.status_code == status.HTTP_400_BAD_REQUEST
        
        result = response.json()
        assert result["detail"] == "Student already signed up for this activity"
        
    def test_signup_with_url_encoded_activity_name(self, client, reset_activities):
        """Test signup with URL encoded activity name."""
        email = "newstudent@mergington.edu"
        activity = "Track and Field"
        encoded_activity = "Track%20and%20Field"
        
        response = client.post(f"/activities/{encoded_activity}/signup?email={email}")
        assert response.status_code == status.HTTP_200_OK
        
        # Verify the participant was actually added
        activities_response = client.get("/activities")
        activities = activities_response.json()
        assert email in activities[activity]["participants"]
        
    def test_signup_with_url_encoded_email(self, client, reset_activities):
        """Test signup with URL encoded email."""
        email = "new+student@mergington.edu"
        encoded_email = "new%2Bstudent%40mergington.edu"
        activity = "Chess Club"
        
        response = client.post(f"/activities/{activity}/signup?email={encoded_email}")
        assert response.status_code == status.HTTP_200_OK
        
        # Verify the participant was actually added
        activities_response = client.get("/activities")
        activities = activities_response.json()
        assert email in activities[activity]["participants"]


class TestRemoveParticipantEndpoint:
    """Tests for the remove participant endpoint."""
    
    def test_successful_participant_removal(self, client, reset_activities):
        """Test successful removal of a participant."""
        email = "michael@mergington.edu"
        activity = "Chess Club"
        
        # Verify participant is initially there
        activities_response = client.get("/activities")
        activities = activities_response.json()
        assert email in activities[activity]["participants"]
        
        # Remove participant
        response = client.delete(f"/activities/{activity}/participants/{email}")
        assert response.status_code == status.HTTP_200_OK
        
        result = response.json()
        assert "message" in result
        assert email in result["message"]
        assert activity in result["message"]
        
        # Verify participant was actually removed
        activities_response = client.get("/activities")
        activities = activities_response.json()
        assert email not in activities[activity]["participants"]
        
    def test_remove_participant_from_nonexistent_activity(self, client, reset_activities):
        """Test removing participant from activity that doesn't exist."""
        email = "student@mergington.edu"
        activity = "Nonexistent Club"
        
        response = client.delete(f"/activities/{activity}/participants/{email}")
        assert response.status_code == status.HTTP_404_NOT_FOUND
        
        result = response.json()
        assert result["detail"] == "Activity not found"
        
    def test_remove_nonexistent_participant(self, client, reset_activities):
        """Test removing a participant that isn't in the activity."""
        email = "nonexistent@mergington.edu"
        activity = "Chess Club"
        
        response = client.delete(f"/activities/{activity}/participants/{email}")
        assert response.status_code == status.HTTP_404_NOT_FOUND
        
        result = response.json()
        assert result["detail"] == "Participant not found in this activity"
        
    def test_remove_participant_with_url_encoding(self, client, reset_activities):
        """Test removing participant with URL encoded names."""
        email = "ava@mergington.edu"
        activity = "Science Olympiad"
        encoded_activity = "Science%20Olympiad"
        encoded_email = "ava%40mergington.edu"
        
        # Verify participant is initially there
        activities_response = client.get("/activities")
        activities = activities_response.json()
        assert email in activities[activity]["participants"]
        
        # Remove participant
        response = client.delete(f"/activities/{encoded_activity}/participants/{encoded_email}")
        assert response.status_code == status.HTTP_200_OK
        
        # Verify participant was actually removed
        activities_response = client.get("/activities")
        activities = activities_response.json()
        assert email not in activities[activity]["participants"]


class TestIntegrationScenarios:
    """Integration tests for complex scenarios."""
    
    def test_signup_and_remove_workflow(self, client, reset_activities):
        """Test complete workflow of signing up and then removing a participant."""
        email = "workflow@mergington.edu"
        activity = "Programming Class"
        
        # Initial state check
        activities_response = client.get("/activities")
        activities = activities_response.json()
        initial_count = len(activities[activity]["participants"])
        assert email not in activities[activity]["participants"]
        
        # Signup
        signup_response = client.post(f"/activities/{activity}/signup?email={email}")
        assert signup_response.status_code == status.HTTP_200_OK
        
        # Verify signup
        activities_response = client.get("/activities")
        activities = activities_response.json()
        assert email in activities[activity]["participants"]
        assert len(activities[activity]["participants"]) == initial_count + 1
        
        # Remove participant
        remove_response = client.delete(f"/activities/{activity}/participants/{email}")
        assert remove_response.status_code == status.HTTP_200_OK
        
        # Verify removal
        activities_response = client.get("/activities")
        activities = activities_response.json()
        assert email not in activities[activity]["participants"]
        assert len(activities[activity]["participants"]) == initial_count
        
    def test_multiple_signups_different_activities(self, client, reset_activities):
        """Test signing up the same student for multiple activities."""
        email = "multisport@mergington.edu"
        activities_to_join = ["Chess Club", "Art Club", "Debate Team"]
        
        for activity in activities_to_join:
            response = client.post(f"/activities/{activity}/signup?email={email}")
            assert response.status_code == status.HTTP_200_OK
            
        # Verify all signups
        activities_response = client.get("/activities")
        all_activities = activities_response.json()
        
        for activity in activities_to_join:
            assert email in all_activities[activity]["participants"]
            
    def test_activity_capacity_tracking(self, client, reset_activities):
        """Test that participant counts are accurately tracked."""
        activities_response = client.get("/activities")
        activities = activities_response.json()
        
        for activity_name, activity_data in activities.items():
            participants_count = len(activity_data["participants"])
            max_participants = activity_data["max_participants"]
            
            # Ensure no activity is over capacity
            assert participants_count <= max_participants
            
            # Ensure all participant emails are valid strings
            for participant in activity_data["participants"]:
                assert isinstance(participant, str)
                assert "@" in participant
                assert participant.endswith("@mergington.edu")