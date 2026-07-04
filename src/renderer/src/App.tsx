import Versions from './components/Versions'
import electronLogo from './assets/electron.svg'

function App(): React.JSX.Element {

  return (
    <>
      <img alt="logo" className="logo" src={electronLogo} />
      <div className="text">
        Build an Electron app with <span className="react">React</span>
        &nbsp;and <span className="ts">TypeScript</span>
      </div>
      <Versions></Versions>
    </>
  )
}

export default App
