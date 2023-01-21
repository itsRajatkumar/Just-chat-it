import React, { useState } from 'react'
import { InsertEmoticon, Mic } from '@mui/icons-material'
const ChatFooter = () => {
    const [input, setInput] = useState('')
  return (
    <div className="chat__footer">
            <InsertEmoticon/>
            <form >
                <input
                    value={input}
                    onChange = {(e) => setInput(e.target.value)}
                    placeholder= "Type your message"
                    type='text'
                />
                <button 
                type='submit'>
                    Send
                </button>
            </form>
            <Mic/>
        </div>
  )
}

export default ChatFooter