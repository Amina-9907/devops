export function getHubUrl(): string {
  const env = process.env.NEXT_PUBLIC_ENV;

  if (env === "staging") {
    return "https://staging-hub.heritage.africa";
  }

  return "https://hub.heritage.africa";
}
