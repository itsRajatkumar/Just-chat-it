import React from 'react'

const ChatBody = () => {
    const d = new Date()
    const time = d.toLocaleTimeString()
  return (
    <div className="chat__body">
            <p className='chat__message'>
                <span className='chat__name'>Rajat</span>
                This is a message
                <span className="chat__timestamp">
                    {time}
                </span>
            </p>
            <p className='chat__message chat__receiver'>
                <span className='chat__name'>Rajat</span>
                This is a message Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi, illo fugiat! Quod, adipisci! Error tenetur nisi optio? Incidunt ea, necessitatibus minima iste esse obcaecati voluptas, est voluptate beatae sint dolor!
                <span className="chat__timestamp">
                    {time}
                </span>
            </p>
            <p className='chat__message'>
                <span className='chat__name'>Rajat</span>
                This is a message
                <span className="chat__timestamp">
                    {time}
                </span>
            </p>
        </div>
  )
}

export default ChatBody