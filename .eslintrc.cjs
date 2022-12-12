module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'plugin:vue/vue3-essential',
    'standard',
  ],
  overrides: [
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: [
    'vue',
  ],
  rules: {
    'vue/multi-word-component-names': 'off', // 关闭名称校验
    'comma-dangle': ['error', 'always-multiline'],
    '@typescript-eslint/no-explicit-any': ['off'],
  },
  globals: {
    useMessage: 'readonly',
    useDialog: 'readonly',
  },
}
