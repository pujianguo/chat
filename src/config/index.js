
export default {
  env: import.meta.env.MODE,
  apiEnv: import.meta.env.MODE === 'production' ? 'prod' : 'test',
  apiUrl: 'http://api.ckeyer.com',
  urlPrefix: '/apis/p/',
  // apiUrl: import.meta.env.VITE_API_URL,
}
