import type { APIRoute } from 'astro';

export const ALL: APIRoute = async ({ request }) => {
  const url = new URL(request.url);
  
  // Decap CMS va chercher à joindre /api/v1/... au lieu de l'API GitHub brute
  let githubPath = url.pathname.replace('/api/cmsproxy', '');
  if (githubPath.startsWith('/api/v1')) {
    githubPath = githubPath.replace('/api/v1', '');
  }
  
  // Reconstitution de l'adresse GitHub réelle
  const githubUrl = `https://api.github.com/repos/evrancamus/cats-eyes-website${githubPath}${url.search}`;

  // Relais de la requête avec ton Token secret (sécurisé côté serveur)
  const response = await fetch(githubUrl, {
    method: request.method,
    headers: {
      'Authorization': 'token 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',
      'Accept': 'application/vnd.github.v3+json',
      'Content-Type': request.headers.get('Content-Type') || 'application/json',
    },
    body: request.method !== 'GET' && request.method !== 'HEAD' ? await request.text() : undefined
  });

  // On renvoie la réponse de GitHub à Decap CMS
  const data = await response.text();
  return new Response(data, {
    status: response.status,
    headers: { 
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*' // Autorise l'accès multi-appareils
    }
  });
};