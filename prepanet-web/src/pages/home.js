import React from 'react';

class Home extends React.Component {
    render() {
        return <div>
            <link rel="stylesheet" href="StyleSheet1.css" />
            <div className="rectangle">
                <div className="logo">
                    <h3>prep@NET</h3>
                </div>
            </div>
            <div className="login">
                <div className="login-header">
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <h1>Log In</h1>
                </div>
                <div className="login-form">
                    <h3>
                        <i className="fas fa-cloud" /> E-mail:
                    </h3>
                    <input type="text" placeholder="E-mail" />
                    <br />
                    <h3>
                        <i className="fas fa-bars" /> Password:
                    </h3>
                    <input type="password" placeholder="Password" />
                    <br />
                    <br />
                    <input
                        type="button"
                        onclick="location.href='Pagina1.html';"
                        defaultValue="Log In"
                        className="login-button"
                        href="Pagina1.html"
                    />
                    <br />
                </div>
            </div>
        </div>;

    }
}

export default Home;