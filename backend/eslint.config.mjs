import pluginJs from '@eslint/js';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import globals from 'globals';

export default [
	// Base recommended configuration from ESLint
	pluginJs.configs.recommended,

	// TypeScript configuration
	{
		files: ['**/*.ts', '**/*.tsx'],
		languageOptions: {
			parser: tsParser,	// Use the TypeScript parser
			sourceType: 'module',
			globals: {...globals.browser, ...globals.node},	// Add browser globals to the list of known globals so that ESLint doesn't complain about them
		},
		plugins: {
			'@typescript-eslint': tsPlugin, // Use the TypeScript ESLint plugin
		},
		rules: {
			quotes: ['error', 'single'], // Use single quotes for strings
			indent: ['error', 'tab'],	// Use tabs for indentation
			'no-console': ['warn', {allow: ['warn', 'error']}], // Allow 'warn' and 'error' console messages
			'@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }], // Ignore unused variables that start with an underscore
			'no-use-before-define': 'warn', // Warn when using a variable before it is declared
			'no-const-assign': 'error', 	// Disallow reassigning a constant
			'no-dupe-args': 'error', 		// Disallow duplicate arguments in function definitions
			'object-curly-spacing': ['error', 'always']	// Space around curly braces
		},
		settings: {
			'import/resolver': {
				typescript: true, // This setting is required to resolve TypeScript files
			},
		},
	},
];
