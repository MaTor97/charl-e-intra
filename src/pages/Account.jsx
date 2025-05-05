import React, { useState } from 'react';


const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [userInfo, setUserInfo] = useState(null);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault(); // ⛔ Important ! Sinon le formulaire recharge la page

    try {
      const response = await fetch('https://intradev.acc-vdc.be/wp-json/simple-jwt-login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username,
          password,
        })
      });

      console.log(response)

      if (!response.ok) {
        throw new Error('Échec de l\'authentification');
      }

      const data = await response.json();
      console.log('Réponse du serveur :', data);

      // Stocker le token s'il est renvoyé
      if (data.token) {
        localStorage.setItem('token', data.token);
      }

      setUserInfo(data.user || data); // selon le format de ta réponse
      setError('');
    } catch (err) {
      setError(err.message);
      setUserInfo(null);
    }
  };

  return (
    <main>
      <p>Bienvenue sur l’application <strong>Intranet Mobile</strong> conçue pour vous offrir une navigation fluide parmi les articles et les différentes catégories d’actualités de la ville de Charleroi.</p>
      <p>Grâce à cette application, vous recevrez également des notifications importantes directement sur votre appareil.</p>
      <p>Pour accéder à l’ensemble de ces fonctionnalités, veuillez vous connecter avec votre compte d’agent de la Ville de Charleroi</p>
      <form onSubmit={handleSubmit}>
        <p className="login-username">
          <label htmlFor="user">Identifiant ou adresse e-mail</label>
          <input
            id="user"
            autoComplete="username"
            className="input"
            size="20"
            type="text"
            name="log"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </p>
        <p className="login-password">
          <label htmlFor="pass">Mot de passe</label>
          <input
            id="pass"
            autoComplete="current-password"
            spellCheck="false"
            className="input"
            size="20"
            type="password"
            name="pwd"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </p>
        <p className="login-remember">
          J'ai oublié mon mot de passe
        </p>
        <button type="submit">ME CONNECTER</button>
      </form>

      {error && <p style={{ color: 'red' }}>{error}</p>}
      {userInfo && (
        <div>
          <h3>Bienvenue, {userInfo.name || userInfo.login}</h3>
          <p>Email : {userInfo.email}</p>
        </div>
      )}
    </main>
  );
};

export default LoginForm;
