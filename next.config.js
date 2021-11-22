/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  images: {
    domains: ['localhost'],
  },
  env: {
    BASE_API_URL: 'http://localhost:8000/api/'
  }
}
