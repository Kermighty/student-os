/** True when the deployment has Google OAuth credentials configured. */
export function isGoogleProviderEnabled() {
  return Boolean(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET);
}
