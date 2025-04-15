// src/assets/files/functions/htmlParserOptions.js
import { domToReact } from 'html-react-parser';

export const htmlParserOptions = {
  replace: (domNode) => {
    if (!domNode.name) return;

    // IMG
    if (domNode.name === 'img' && domNode.attribs) {
      const { src, alt } = domNode.attribs;
      return (
        <img
          src={src}
          alt={alt || 'Image'}
          loading="lazy"
          style={{ maxWidth: '100%', height: 'auto', display: 'block', margin: '1rem auto' }}
        />
      );
    }

    // VIDEO
    if (domNode.name === 'video' && domNode.attribs) {
      const { src, controls } = domNode.attribs;
      return (
        <video
          src={src}
          controls={controls !== 'false'}
          style={{ maxWidth: '100%', display: 'block', margin: '1rem auto' }}
        >
          Votre navigateur ne prend pas en charge la lecture vidéo.
        </video>
      );
    }

    // LIENS
    if (domNode.name === 'a' && domNode.attribs?.href) {
      const href = domNode.attribs.href;

      // PDF
      if (href.endsWith('.pdf')) {
        return (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: '#007bff', textDecoration: 'underline' }}
          >
            📄 Voir le PDF
          </a>
        );
      }

      const isExternal = /^https?:\/\//i.test(href);

      return (
        <a
          href={href}
          {...(isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
          style={{
            color: '#007bff',
            textDecoration: 'underline',
            fontWeight: isExternal ? 'bold' : 'normal',
          }}
        >
          {domToReact(domNode.children)}
        </a>
      );
    }
  },
};
