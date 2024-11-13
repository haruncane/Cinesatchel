import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"
import { AuthContextProvider } from "./context/authContext/AuthContext"
import { VideoContextProvider } from "./context/videoContext/VideoContext"

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
  <>
    <AuthContextProvider>
      <VideoContextProvider>
        <App />
      </VideoContextProvider>
    </AuthContextProvider>
  </>
)