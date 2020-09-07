/* eslint-env node, browser:false */

module.exports = {
	env: {
		browser: true,
		es6: true,
	},
	extends: [
		'eslint:recommended',
		'plugin:@typescript-eslint/eslint-recommended',
		'plugin:@typescript-eslint/recommended',
	],
	parser: '@typescript-eslint/parser',
	parserOptions: {
		project: './tsconfig.json',
	},
	plugins: [
		'import',
		'simple-import-sort',
		'@typescript-eslint',
	],
	rules: {
		'comma-dangle': [
			'error',
			'always-multiline',
		],
		'no-console': [
			'error',
			{
				'allow': [
					'info',
					'warn',
					'error',
				],
			},
		],
		'semi': [
			'error',
			'never',
		],
		'one-var': [
			'error',
			'never',
		],
		'quotes': [
			'error',
			'single',
			{
				'allowTemplateLiterals': true,
			},
		],
		'@typescript-eslint/member-delimiter-style': [
			'error',
			{
				'multiline': {
					'delimiter': 'none',
				},
			},
		],
		'@typescript-eslint/ban-ts-comment': [
			'error',
			{
				'ts-ignore': 'allow-with-description',
			},
		],
		'simple-import-sort/sort': 'error',
		'sort-imports': 'off',
		'import/order': 'off',
		'import/first': 'error',
		'import/newline-after-import': 'error',
		'import/no-duplicates': 'error',
	},
	overrides: [
		{
			files: '**/*.js',
			extends: [
				'plugin:import/errors',
				'plugin:import/warnings',
			],
			rules: {
				'simple-import-sort/sort': 'off',
				'import/order': ['error', { 'newlines-between': 'always' }],
				'@typescript-eslint/no-var-requires': 'off',
			},
		},
	],
}
