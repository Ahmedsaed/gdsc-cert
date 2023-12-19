export default {
	async fetch(request, env, ctx) {
	  // Define your password
	  const correctPassword = 'gdsc23-AhmedSaed'; // to prevent web crawlers from triggering the workflow, we will use a password to protect the endpoint.

	  const corsHeaders = {
		'Access-Control-Allow-Headers': '*', // What headers are allowed. * is wildcard. Instead of using '*', you can specify a list of specific headers that are allowed, such as: Access-Control-Allow-Headers: X-Requested-With, Content-Type, Accept, Authorization.
		'Access-Control-Allow-Methods': 'GET, POST', // Allowed methods. Others could be GET, PUT, DELETE etc.
		'Access-Control-Allow-Origin': '*', // This is URLs that are allowed to access the server. * is the wildcard character meaning any URL can.
	  }

	  if (request.method === 'OPTIONS') {
		// Respond to preflight requests
		return new Response(null, {
		  status: 204,
		  headers: corsHeaders,
		});
	  }

	  // Check if the request contains the correct password
	  const requestPassword = request.headers.get('Authorization');

	  if (requestPassword !== `Bearer ${correctPassword}`) {
		// If the password is incorrect, return a 401 Unauthorized response
		return new Response('Unauthorized', {
		  status: 401,
		  headers: corsHeaders,
		});
	  }

	  // If the password is correct, proceed with the workflow
	  const username = 'Ahmedsaed';
	  const repo = 'gdsc-cert';
	  const token = 'INSERT YOU GITHUB TOKEN HERE';

	  // GitHub API endpoint for repository dispatch
	  const githubApiEndpoint = `https://api.github.com/repos/${username}/${repo}/dispatches`;

	  // Payload for the POST request
	  const payload = {
		event_type: 'start-build-workflow',
	  };

	  // Make the POST request to GitHub API
	  const response = await fetch(githubApiEndpoint, {
		method: 'POST',
		headers: {
		  'Authorization': `token ${token}`,
		  'Content-Type': 'application/json',
		  'User-Agent': 'Cloudflare Worker',
		},
		body: JSON.stringify(payload),
	  });

	  // Return a response to the client
	  return new Response('Done!', {
		headers: corsHeaders,
	  });
	}
  };
