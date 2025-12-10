export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2025-12-03'

export const dataset = assertValue(
  process.env.NEXT_PUBLIC_SANITY_DATASET,
  'Missing environment variable: NEXT_PUBLIC_SANITY_DATASET'
)

export const projectId = assertValue(
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  'Missing environment variable: NEXT_PUBLIC_SANITY_PROJECT_ID'
)
export const token = assertValue(
  "skHkafdR8A4rkEyHcWO1voui7726lhX8oa3CXkf6pGnUO7LkdPfjecxyDodwXcU0BHE7LPTLTbVFdw7SCS3sNWL1vslA6pZQCiYQbE45tyDw1VsA7KWKsgI582VMDjZdasbOKSj8QzaXmKsLyAtXyQjrIcP4FIlOdoaQxQ7YGXwTTTMg9wnS",
  'Missing environment variable: SANITY_API_TOKEN'
)

function assertValue<T>(v: T | undefined, errorMessage: string): T {
  if (v === undefined) {
    throw new Error(errorMessage)
  }

  return v
}
