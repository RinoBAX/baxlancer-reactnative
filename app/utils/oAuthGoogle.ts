import { API_URL } from "./constants";

export async function GET_OAUTH_URL(roles: string) {
  const backendOauthUrl = `${API_URL}/auth/google?roles=${roles}`;
  return backendOauthUrl;
}
