import { writeFileSync, mkdirSync } from 'node:fs';

const ACCOUNT_ORDER = ['newlocalmedia', 'dknauss'];
const API_BASE = 'https://api.github.com';
const OUTFILE = new URL('../data/repos.json', import.meta.url);

const headers = {
  Accept: 'application/vnd.github+json',
  'User-Agent': 'newlocalmedia-github-pages-data-builder',
};

const token = process.env.GITHUB_TOKEN || process.env.GH_TOKEN || '';
if (token) {
  headers.Authorization = `Bearer ${token}`;
}

function isEligibleRepo(user, repo) {
  return !repo.fork && !repo.archived && repo.name !== '.github' && repo.name !== `${user}.github.io`;
}

function simplifyRepo(repo) {
  return {
    id: repo.id,
    name: repo.name,
    full_name: repo.full_name,
    html_url: repo.html_url,
    description: repo.description,
    homepage: repo.homepage,
    stargazers_count: repo.stargazers_count,
    language: repo.language,
    updated_at: repo.updated_at,
    fork: repo.fork,
    archived: repo.archived,
    owner: {
      login: repo.owner?.login ?? '',
      avatar_url: repo.owner?.avatar_url ?? '',
      html_url: repo.owner?.html_url ?? '',
    },
  };
}

async function fetchJson(url) {
  const response = await fetch(url, { headers });
  if (!response.ok) {
    const body = await response.text();
    throw new Error(`GitHub API ${response.status} for ${url}\n${body}`);
  }
  return response.json();
}

async function fetchAccount(user) {
  const repos = await fetchJson(`${API_BASE}/users/${user}/repos?per_page=100&sort=updated`);
  const filtered = repos.filter((repo) => isEligibleRepo(user, repo)).map(simplifyRepo);
  const totalStars = filtered.reduce((sum, repo) => sum + repo.stargazers_count, 0);
  return {
    user,
    profile_url: `https://github.com/${user}`,
    repos: filtered,
    total_repos: filtered.length,
    total_stars: totalStars,
    latest_repo: filtered.slice().sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at))[0] ?? null,
  };
}

const accounts = [];
for (const user of ACCOUNT_ORDER) {
  accounts.push(await fetchAccount(user));
}

const payload = {
  generated_at: new Date().toISOString(),
  accounts,
};

mkdirSync(new URL('../data/', import.meta.url), { recursive: true });
writeFileSync(OUTFILE, JSON.stringify(payload, null, 2) + '\n');
console.log(`Wrote ${OUTFILE.pathname}`);
