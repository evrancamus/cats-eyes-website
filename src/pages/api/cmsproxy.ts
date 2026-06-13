import type { APIRoute } from 'astro';

export const ALL: APIRoute = async ({ request }) => {
  // 1. ICI : Tu peux vérifier si l'utilisateur est bien connecté à Supabase pour bloquer les intrus
  
  const url = new URL(request.url);
  const path = url.pathname.replace('/api/cmsproxy', '');
  
  // L'URL de l'API GitHub correspondante
  const githubUrl = `https://api.github.com/repos/evrancamus/cats-eyes-website${path}`;

  // On relaie la demande à GitHub en injectant ton Token secret de manière sécurisée (côté serveur)
  const response = await fetch(githubUrl, {
    method: request.method,
    headers: {
      'Authorization': 'token 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',
      'Accept': 'application/vnd.github.v3+json',
      'Content-Type': request.headers.get('Content-Type') || 'application/json',
    },
    body: request.method !== 'GET' ? await request.text() : undefined
  });

  return new Response(await response.text(), {
    status: response.status,
    headers: { 'Content-Type': 'application/json' }
  });
};