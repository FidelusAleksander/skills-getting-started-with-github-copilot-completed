import { useState, useEffect } from 'react'
import './App.css'
import Header from './components/Header'
import ActivityList from './components/ActivityList'
import SignupForm from './components/SignupForm'
import MessageBanner from './components/MessageBanner'
import Footer from './components/Footer'

function App() {
  const [activities, setActivities] = useState({})
  const [message, setMessage] = useState({ text: '', type: '' })

  const fetchActivities = async () => {
    try {
      const response = await fetch('/activities')
      const data = await response.json()
      setActivities(data)
    } catch (error) {
      console.error('Error fetching activities:', error)
      showMessage('Failed to load activities. Please try again later.', 'error')
    }
  }

  const showMessage = (text, type) => {
    setMessage({ text, type })
    setTimeout(() => {
      setMessage({ text: '', type: '' })
    }, 5000)
  }

  const handleSignup = async (email, activity) => {
    try {
      const response = await fetch(
        `/activities/${encodeURIComponent(activity)}/signup?email=${encodeURIComponent(email)}`,
        {
          method: 'POST',
        }
      )

      const result = await response.json()

      if (response.ok) {
        showMessage(result.message, 'success')
        fetchActivities()
        return true
      } else {
        showMessage(result.detail || 'An error occurred', 'error')
        return false
      }
    } catch (error) {
      console.error('Error signing up:', error)
      showMessage('Failed to sign up. Please try again.', 'error')
      return false
    }
  }

  const handleRemoveParticipant = async (activityName, email) => {
    if (!confirm(`Are you sure you want to remove ${email} from ${activityName}?`)) {
      return
    }

    try {
      const response = await fetch(
        `/activities/${encodeURIComponent(activityName)}/participants/${encodeURIComponent(email)}`,
        {
          method: 'DELETE',
        }
      )

      const result = await response.json()

      if (response.ok) {
        showMessage(result.message, 'success')
        fetchActivities()
      } else {
        showMessage(result.detail || 'Failed to remove participant', 'error')
      }
    } catch (error) {
      console.error('Error removing participant:', error)
      showMessage('Failed to remove participant. Please try again.', 'error')
    }
  }

  useEffect(() => {
    fetchActivities()
  }, [])

  return (
    <>
      <Header />
      <main>
        <ActivityList 
          activities={activities} 
          onRemoveParticipant={handleRemoveParticipant}
        />
        <SignupForm 
          activities={activities}
          onSignup={handleSignup}
        />
      </main>
      <MessageBanner message={message} />
      <Footer />
    </>
  )
}

export default App
