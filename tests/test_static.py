"""
Tests for static file serving and frontend integration.
"""

import pytest
from fastapi import status


class TestStaticFiles:
    """Tests for static file serving."""
    
    def test_static_index_html_accessible(self, client):
        """Test that the static index.html file is accessible."""
        response = client.get("/static/index.html")
        assert response.status_code == status.HTTP_200_OK
        assert "text/html" in response.headers["content-type"]
        
        # Check for key elements in the HTML
        content = response.text
        assert "<title>Mergington High School Activities</title>" in content
        assert "Extracurricular Activities" in content
        assert "Sign Up for an Activity" in content
        
    def test_static_css_accessible(self, client):
        """Test that the CSS file is accessible."""
        response = client.get("/static/styles.css")
        assert response.status_code == status.HTTP_200_OK
        assert "text/css" in response.headers["content-type"]
        
        # Check for key CSS classes
        content = response.text
        assert ".activity-card" in content
        assert ".participants-list" in content
        assert ".delete-btn" in content
        
    def test_static_js_accessible(self, client):
        """Test that the JavaScript file is accessible."""
        response = client.get("/static/app.js")
        assert response.status_code == status.HTTP_200_OK
        assert "application/javascript" in response.headers["content-type"] or "text/javascript" in response.headers["content-type"]
        
        # Check for key JavaScript functions
        content = response.text
        assert "fetchActivities" in content
        assert "removeParticipant" in content
        assert "DOMContentLoaded" in content
        
    def test_static_nonexistent_file(self, client):
        """Test that accessing a non-existent static file returns 404."""
        response = client.get("/static/nonexistent.html")
        assert response.status_code == status.HTTP_404_NOT_FOUND


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