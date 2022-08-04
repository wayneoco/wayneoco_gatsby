import { useEffect } from 'react';

const utterances = () => {
  useEffect(() => {
    const script = document.createElement('script');
    const url = 'https://utteranc.es/client.js';

    script.src = url;
    script.repo = 'wayneoco_gatsby';
    script.issueTerm = 'pathname';
    script.theme = 'github-light';
    script.crossorigin = 'anonymous';
    script.async = true;

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    }
  }, [url]);
};

export default utterances;
