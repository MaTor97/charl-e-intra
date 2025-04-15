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
            className="pdf"
          >
            📄 <span style={{ fontSize: '1.3em' }}>Voir le PDF</span>
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

    // TABLEAUX
    if (domNode.name === 'table') {
      return (
        <div style={{ overflowX: 'auto', margin: '1rem 0' }}>
          <table
            style={{
              width: '100%',
              borderCollapse: 'collapse',
              border: '1px solid #ccc',
            }}
          >
            {domToReact(domNode.children, htmlParserOptions)}
          </table>
        </div>
      );
    }

    if (['thead', 'tbody', 'tr', 'th', 'td'].includes(domNode.name)) {
      const styleMap = {
        th: {
          backgroundColor: '#f2f2f2',
          padding: '8px',
          border: '1px solid #ccc',
          textAlign: 'left',
        },
        td: {
          padding: '8px',
          border: '1px solid #ccc',
          textAlign: 'left',
        },
        tr: {},
        thead: {},
        tbody: {},
      };

      return React.createElement(
        domNode.name,
        { style: styleMap[domNode.name] || {} },
        domToReact(domNode.children, htmlParserOptions)
      );
    }
  },
};
