import Pusher from "pusher-js";


const pusher = new Pusher(process.env.REACT_APP_PUSHER_KEY, {
  cluster: process.env.REACT_APP_PUSHER_CLUSTER,
});

export default pusher;
// import React from 'react'

// const pusherComp = () => {
//   return (
//     <div>pusherComp</div>
//   )
// }

// export default pusherComp