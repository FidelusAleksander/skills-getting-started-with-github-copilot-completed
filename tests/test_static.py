"""
Tests for frontend integration with API endpoints.
"""

import pytest
from fastapi import status


class TestFrontendIntegration:
    """Tests for frontend-backend integration."""
    
    def test_frontend_can_load_activities(self, client, reset_activities):
        """Test that the frontend can successfully load activities data."""
        # This simulates what the frontend JavaScript does
        response = client.get("/activities")
        assert response.status_code == status.HTTP_200_OK
        
        activities = response.json()
        
        # Verify the data structure matches what the frontend expects
        for activity_name, activity_data in activities.items():
            assert isinstance(activity_name, str)
            assert "description" in activity_data
            assert "schedule" in activity_data
            assert "max_participants" in activity_data
            assert "participants" in activity_data
            assert isinstance(activity_data["participants"], list)
            
    def test_frontend_signup_flow(self, client, reset_activities):
        """Test the complete signup flow as the frontend would use it."""
        email = "frontend.test@mergington.edu"
        activity = "Chess Club"
        
        # Simulate frontend form submission
        response = client.post(f"/activities/{activity}/signup?email={email}")
        assert response.status_code == status.HTTP_200_OK
        
        result = response.json()
        assert "message" in result
        
        # Simulate frontend refreshing activities list
        activities_response = client.get("/activities")
        assert activities_response.status_code == status.HTTP_200_OK
        
        activities = activities_response.json()
        assert email in activities[activity]["participants"]
        
    def test_frontend_delete_flow(self, client, reset_activities):
        """Test the complete delete flow as the frontend would use it."""
        email = "michael@mergington.edu"  # Existing participant
        activity = "Chess Club"
        
        # Simulate frontend delete request
        response = client.delete(f"/activities/{activity}/participants/{email}")
        assert response.status_code == status.HTTP_200_OK
        
        result = response.json()
        assert "message" in result
        
        # Simulate frontend refreshing activities list
        activities_response = client.get("/activities")
        assert activities_response.status_code == status.HTTP_200_OK
        
        activities = activities_response.json()
        assert email not in activities[activity]["participants"]