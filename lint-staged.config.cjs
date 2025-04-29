module.exports = {
  '*.{.cjs,ts,tsx,vue}': [
    'eslint --fix',
  ],
  '*.{vue,scss,less,styl,html}': ['stylelint --fix'],
}
