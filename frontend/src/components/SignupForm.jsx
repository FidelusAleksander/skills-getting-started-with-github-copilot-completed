import { useState } from 'react'

function SignupForm({ activities, onSignup }) {
  const [email, setEmail] = useState('')
  const [activity, setActivity] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    const success = await onSignup(email, activity)
    if (success) {
      setEmail('')
      setActivity('')
    }
  }

  return (
    <section id="signup-container">
      <h3>Sign Up for an Activity</h3>
      <form id="signup-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Student Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="your-email@mergington.edu"
          />
        </div>
        <div className="form-group">
          <label htmlFor="activity">Select Activity:</label>
          <select
            id="activity"
            value={activity}
            onChange={(e) => setActivity(e.target.value)}
            required
          >
            <option value="">-- Select an activity --</option>
            {Object.keys(activities).map((name) => (
              <option key={name} value={name}>
                {name}
              </option>
            ))}
          </select>
        </div>
        <button type="submit">Sign Up</button>
      </form>
    </section>
  )
}

export default SignupForm
