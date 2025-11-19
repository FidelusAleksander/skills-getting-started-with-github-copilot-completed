function MessageBanner({ message }) {
  if (!message.text) {
    return null
  }

  return (
    <div id="message" className={message.type}>
      {message.text}
    </div>
  )
}

export default MessageBanner
