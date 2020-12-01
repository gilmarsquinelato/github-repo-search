const LOCAL_STORAGE_KEY = 'github-token';
const ENV_TOKEN = process.env.REACT_APP_TOKEN;

const verifyGithubToken = (): void => {
  if (getGithubToken()) return;

  const result = prompt('A Github token was not found, please provide one:');
  if (!result) {
    throw Error('A Github token was not provided');
  }
  setGithubToken(result);
};

export default verifyGithubToken;

export const getGithubToken = (): string | null => {
  return ENV_TOKEN || sessionStorage.getItem(LOCAL_STORAGE_KEY);
};

const setGithubToken = (token: string): void => {
  sessionStorage.setItem(LOCAL_STORAGE_KEY, token);
};
