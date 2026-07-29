import * as React from 'react';
import HelloComponent from './components/Hello';
import NameEditComponent from './components/NameEditComponent2';
const App2: React.FC = () => {
  const [username, setUserName] = React.useState("initialName");
  // const setUsernameState = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setUserName(event.target.value)
  // }
  return (
    <div>
      <HelloComponent userName={username} />
      {/* <NameEditComponent
        username={username}
        onChange={setUsernameState}
      /> */}
      <NameEditComponent
        initialUserName={username}
        onNameUpdated={setUserName}
      />
    </div>
  )
}

export default App2