import React, { useState } from 'react';
import { fetchLogin } from '../assets/files/functions/fetchLogin';
import parse from 'html-react-parser';
import { htmlParserOptions } from '../assets/files/options';

const Account = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [htmlContent, setHtmlContent] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault(); // Empêche le rechargement de la page
    setLoading(true);
    setError('');
    setHtmlContent('');

    try {
      const res = await fetchLogin('custom-ad/v1/login', {
        body: {
          username,
          password
        }
      });
      console.log(res)
      if (typeof res === 'string') {
        const doc = new DOMParser().parseFromString(res, 'text/html');
        const loginTabsWrapper = doc.querySelector('.login-tabs-wrapper');
        const bodyContent = loginTabsWrapper ? loginTabsWrapper.innerHTML : '';
        setHtmlContent(bodyContent);
      } else {
        // Si c'est un objet JSON, peut-être une réponse utilisateur
        console.log('Réponse JSON :', res);
        // Tu peux afficher un message ou rediriger ici si besoin
      }

    } catch (err) {
      console.error('Erreur lors de la récupération des données:', err);
      setError('Erreur de connexion ou de récupération du contenu.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <p>Bienvenue sur l’application <strong>Intranet Mobile</strong> conçue pour vous offrir une navigation fluide parmi les articles et les différentes catégories d’actualités de la ville de Charleroi.</p>
      <p>Grâce à cette application, vous recevrez également des notifications importantes directement sur votre appareil.</p>
      <p>Pour accéder à l’ensemble de ces fonctionnalités, veuillez vous connecter avec votre compte d’agent de la Ville de Charleroi</p>

      <form
        name="loginform"
        id="loginform"
        method="post"
        onSubmit={handleSubmit}
        >
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
          <label>
            <input
             id="rememberme"
              type="checkbox"
              value="forever"
              name="rememberme"
              defaultChecked
              />
            Se souvenir de moi
          </label>
        </p>
        <p className="login-submit">
          <input
            id="wp-submit"
            className="button button-primary"
            type="submit"
            value={loading ? "Connexion..." : "Se connecter"}
            name="wp-submit"
            disabled={loading}
            />
          <input
            type="hidden"
            name="redirect_to"
            value="https://intradev.acc-vdc.be"
          />
        </p>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {htmlContent && (
        <div>
          {parse(htmlContent, htmlParserOptions)}
        </div>
      )}
    </div>
  );
};

export default Account;
