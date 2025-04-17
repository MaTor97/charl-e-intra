import React, { useState, useEffect } from 'react';
import { fetchLogin } from '../assets/files/functions/fetchLogin';
import parse from 'html-react-parser';
import { htmlParserOptions } from '../assets/files/options';

const Account = () => {
  const [htmlContent, setHtmlContent] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchAccountPage = async () => {
      try {
        const res = await fetchLogin('custom-ad/v1/login', {
          body: {
            username: "Tortma473",
            password: "StageMat-2025$"
          }
        });

        if (typeof res === 'string') {
          // Utiliser DOMParser pour extraire uniquement le body
          const doc = new DOMParser().parseFromString(res, 'text/html');
const loginTabsWrapper = doc.querySelector('.login-tabs-wrapper'); // Sélectionner l'élément avec la classe login-tabs-wrapper

// Vérifier si l'élément existe, puis récupérer son contenu HTML
const bodyContent = loginTabsWrapper ? loginTabsWrapper.innerHTML : ''; // Si l'élément existe, récupère son contenu


          setHtmlContent(bodyContent); // Mettre à jour l'état avec le contenu du body
        }
      } catch (err) {
        console.error('Erreur lors de la récupération des données:', err);
        setError('Erreur de connexion ou de récupération du contenu.');
      }
    };

    fetchAccountPage();
  }, []);

  return (
    <div>
      {/* Si il y a une erreur, on l'affiche */}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <p>Bienvenue sur l’application <strong>Intranet Mobile</strong> conçue pour vous offrir une navigation fluide parmi les articles et les différentes catégories d’actualités de la ville de Charleroi.</p>
      <p>Grâce à cette application, vous recevrez également des notifications importantes directement sur votre appareil.</p>
      <p>Pour accéder à l’ensemble de ces fonctionnalités, veuillez vous connecter avec votre compte d’agent de la Ville de Charleroi</p>

      {/* Si du contenu HTML est récupéré, on l'affiche en utilisant html-react-parser */}
      {htmlContent && (
        <div>
          {parse(htmlContent, htmlParserOptions)}
        </div>
      )}
    </div>
  );
};

export default Account;
