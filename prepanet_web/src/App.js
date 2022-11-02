import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="login">
          <h1>Log In</h1>
          <h3>E-mail</h3>
          <input type={"text"}></input>
          <h3>Password</h3>
          <input type={"password"}></input>
      </header>
      <body>
        <div className='login'>
        </div>
      </body>
    </div>
  );
}

export default App;
