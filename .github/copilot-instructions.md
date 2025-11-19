# Copilot Instructions - Mergington High School Activities API

## Project Overview
This is a FastAPI-based web application for managing extracurricular activities at Mergington High School. Students can view activities and sign up through both API endpoints and a web interface.

## Architecture
- **Backend**: FastAPI application (`src/app.py`) with in-memory data storage
- **Frontend**: Vanilla HTML/CSS/JS (`src/static/`) served as static files
- **Testing**: pytest with FastAPI test client, organized by feature in test classes
- **Data Model**: Activities use name as identifier, students use email, all data resets on restart

## Key Development Patterns

## Development Workflow

### Running the Application
```bash
# Development server with auto-reload
uvicorn src.app:app --reload
```

### Testing
```bash
# Run all tests
python -m pytest

# Run specific test class
python -m pytest tests/test_api.py::TestSignupEndpoint -v
```

### Project Structure Conventions
- All application code in `src/` directory
- Tests mirror source structure with `test_` prefix
- Static files served from `src/static/` via FastAPI StaticFiles mount

## Code Style Guidelines
- Use descriptive activity/student identifiers (names/emails) not numeric IDs
- HTTP exception handling with specific status codes (404 for not found, 400 for business logic errors)
- Docstrings for all API endpoints explaining parameters and behavior
- Test methods with descriptive names explaining the scenario being tested
