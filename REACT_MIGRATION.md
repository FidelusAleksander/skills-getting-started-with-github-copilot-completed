# React Migration - Development Guide

This guide explains how to run the migrated React frontend with the FastAPI backend.

## Architecture

- **Frontend**: React app (Vite) running on `http://localhost:5173`
- **Backend**: FastAPI server running on `http://localhost:8000`
- **Communication**: Vite proxy forwards `/activities` requests to FastAPI backend

## Prerequisites

- Python 3.7+ with virtual environment
- Node.js 18+ and npm

## Setup

### 1. Install Backend Dependencies

```bash
# Create and activate virtual environment (if not already done)
python -m venv .venv
source .venv/bin/activate  # On Windows: .venv\Scripts\activate

# Install Python packages
pip install -r requirements.txt
```

### 2. Install Frontend Dependencies

```bash
cd frontend
npm install
```

## Running the Application

You need to run both servers simultaneously in separate terminals.

### Terminal 1: Start FastAPI Backend

```bash
# From project root
uvicorn src.app:app --reload
```

The API will be available at `http://localhost:8000`

### Terminal 2: Start React Frontend

```bash
# From project root
cd frontend
npm run dev
```

The React app will be available at `http://localhost:5173`

## How It Works

1. The React frontend runs on port 5173 (Vite default)
2. Vite is configured to proxy `/activities` requests to `http://localhost:8000`
3. The FastAPI backend has CORS enabled to accept requests from `http://localhost:5173`
4. All API endpoints remain unchanged from the original implementation

## Testing

Run backend tests:

```bash
python -m pytest tests/ -v
```

## Project Structure

```
.
├── frontend/               # React frontend
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── App.jsx        # Main app component
│   │   └── App.css        # Styles (migrated from original)
│   ├── vite.config.js     # Vite configuration with proxy
│   └── package.json
├── src/
│   ├── app.py            # FastAPI backend (CORS enabled, no static serving)
│   └── static/           # Legacy frontend (kept for reference)
├── tests/
│   └── test_static.py    # API integration tests
└── requirements.txt       # Python dependencies
```

## Key Changes from Original

1. **Frontend**: Migrated from vanilla HTML/JS to React with Vite
2. **Backend**: Removed static file serving, added CORS middleware
3. **Development**: Now requires running two separate servers
4. **Styling**: Same CSS, now in `frontend/src/App.css`
5. **Functionality**: Identical behavior, just React-based implementation

## API Endpoints

All endpoints remain unchanged:

- `GET /activities` - Get all activities
- `POST /activities/{activity}/signup?email={email}` - Sign up for activity
- `DELETE /activities/{activity}/participants/{email}` - Remove participant
