import './assets/main.css'
import './assets/settings.css'

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

function SettingsApp(): React.JSX.Element {
  return (
    <>
      <h1>Settings</h1>
      <p>yay</p>
      {/* Todo: ipc from settings to main window*/}
    </>
  )
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <SettingsApp />
  </StrictMode>
)