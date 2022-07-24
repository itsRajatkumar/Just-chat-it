import Chat from "./Chat/Chat";
import Sidebar from "./Sidebar/Sidebar";
import './App.css'

function App() {
  return (
    <div className="app">
      
    <div className="app__body">
     {/* sidebar */}
     <Sidebar/>
     {/* chat */}
     <Chat/>

    </div>
    </div>
  );
}

export default App;
