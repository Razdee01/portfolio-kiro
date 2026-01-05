import { describe, it, expect } from 'vitest';
import * as fc from 'fast-check';
import { existsSync, readFileSync } from 'fs';

/**
 * Property-Based Test for Project Initialization
 * Feature: portfolio-react-conversion, Property 1: Project Structure Validation
 * Validates: Requirements 1.1, 1.4, 1.5
 */

describe('Project Initialization Property Tests', () => {
  it('Property 1: Project Structure Validation - For any valid React project initialization, the project should have Vite configuration, TypeScript support, and code quality tools', () => {
    // **Feature: portfolio-react-conversion, Property 1: Project Structure Validation**
    // **Validates: Requirements 1.1, 1.4, 1.5**
    
    fc.assert(
      fc.property(
        fc.record({
          projectName: fc.string({ minLength: 1, maxLength: 50 }).filter(s => /^[a-zA-Z0-9-_]+$/.test(s)),
          hasViteConfig: fc.constant(true),
          hasTypeScript: fc.constant(true),
          hasESLint: fc.constant(true),
          hasPrettier: fc.constant(true),
        }),
        (_projectConfig) => {
          // Test that the current project structure meets all requirements
          
          // Requirement 1.1: Project created using Vite with React template
          const viteConfigExists = existsSync('vite.config.ts');
          expect(viteConfigExists).toBe(true);
          
          if (viteConfigExists) {
            const viteConfig = readFileSync('vite.config.ts', 'utf-8');
            expect(viteConfig).toContain('@vitejs/plugin-react');
            expect(viteConfig).toContain('defineConfig');
          }
          
          // Verify package.json has Vite and React dependencies
          const packageJsonExists = existsSync('package.json');
          expect(packageJsonExists).toBe(true);
          
          if (packageJsonExists) {
            const packageJson = JSON.parse(readFileSync('package.json', 'utf-8'));
            expect(packageJson.dependencies).toHaveProperty('react');
            expect(packageJson.dependencies).toHaveProperty('react-dom');
            expect(packageJson.devDependencies).toHaveProperty('vite');
            expect(packageJson.devDependencies).toHaveProperty('@vitejs/plugin-react');
          }
          
          // Requirement 1.4: TypeScript support for type safety
          const tsConfigExists = existsSync('tsconfig.json');
          expect(tsConfigExists).toBe(true);
          
          if (tsConfigExists) {
            const tsConfig = JSON.parse(readFileSync('tsconfig.json', 'utf-8'));
            expect(tsConfig.compilerOptions).toHaveProperty('strict');
            expect(tsConfig.compilerOptions.strict).toBe(true);
            expect(tsConfig.compilerOptions).toHaveProperty('jsx');
            expect(tsConfig.compilerOptions.jsx).toBe('react-jsx');
          }
          
          // Verify TypeScript files exist
          const mainTsxExists = existsSync('src/main.tsx');
          const appTsxExists = existsSync('src/App.tsx');
          expect(mainTsxExists).toBe(true);
          expect(appTsxExists).toBe(true);
          
          // Requirement 1.5: ESLint and Prettier for code quality
          const eslintConfigExists = existsSync('.eslintrc.cjs');
          const prettierConfigExists = existsSync('.prettierrc');
          
          expect(eslintConfigExists).toBe(true);
          expect(prettierConfigExists).toBe(true);
          
          if (eslintConfigExists) {
            const eslintConfig = readFileSync('.eslintrc.cjs', 'utf-8');
            expect(eslintConfig).toContain('@typescript-eslint/recommended');
            expect(eslintConfig).toContain('eslint-plugin-react-hooks/recommended');
          }
          
          if (prettierConfigExists) {
            const prettierConfig = JSON.parse(readFileSync('.prettierrc', 'utf-8'));
            expect(prettierConfig).toHaveProperty('semi');
            expect(prettierConfig).toHaveProperty('singleQuote');
          }
          
          // Verify required directory structure exists
          const requiredDirectories = [
            'src/components',
            'src/hooks', 
            'src/types',
            'src/data'
          ];
          
          requiredDirectories.forEach(dir => {
            expect(existsSync(dir)).toBe(true);
          });
          
          // Verify package.json scripts include required commands
          if (packageJsonExists) {
            const packageJson = JSON.parse(readFileSync('package.json', 'utf-8'));
            expect(packageJson.scripts).toHaveProperty('dev');
            expect(packageJson.scripts).toHaveProperty('build');
            expect(packageJson.scripts).toHaveProperty('lint');
            expect(packageJson.scripts.dev).toContain('vite');
            expect(packageJson.scripts.build).toContain('tsc');
            expect(packageJson.scripts.lint).toContain('eslint');
          }
          
          return true;
        }
      ),
      { numRuns: 100 }
    );
  });
  
  it('Property 1.1: Vite Configuration Validation - For any Vite React project, the configuration should enable React plugin and proper build settings', () => {
    fc.assert(
      fc.property(
        fc.record({
          reactPluginEnabled: fc.constant(true),
          buildConfigured: fc.constant(true),
        }),
        (_config) => {
          const viteConfigPath = 'vite.config.ts';
          expect(existsSync(viteConfigPath)).toBe(true);
          
          const viteConfigContent = readFileSync(viteConfigPath, 'utf-8');
          
          // Should import React plugin
          expect(viteConfigContent).toContain("import react from '@vitejs/plugin-react'");
          
          // Should use React plugin in configuration
          expect(viteConfigContent).toContain('plugins: [react()]');
          
          // Should export proper Vite configuration
          expect(viteConfigContent).toContain('defineConfig');
          
          return true;
        }
      ),
      { numRuns: 100 }
    );
  });
  
  it('Property 1.2: TypeScript Configuration Validation - For any TypeScript React project, the configuration should enable strict mode and proper JSX handling', () => {
    fc.assert(
      fc.property(
        fc.record({
          strictMode: fc.constant(true),
          jsxSupport: fc.constant(true),
        }),
        (_config) => {
          const tsConfigPath = 'tsconfig.json';
          expect(existsSync(tsConfigPath)).toBe(true);
          
          const tsConfig = JSON.parse(readFileSync(tsConfigPath, 'utf-8'));
          
          // Should have strict TypeScript settings
          expect(tsConfig.compilerOptions.strict).toBe(true);
          expect(tsConfig.compilerOptions.noUnusedLocals).toBe(true);
          expect(tsConfig.compilerOptions.noUnusedParameters).toBe(true);
          
          // Should support React JSX
          expect(tsConfig.compilerOptions.jsx).toBe('react-jsx');
          
          // Should include src directory
          expect(tsConfig.include).toContain('src');
          
          return true;
        }
      ),
      { numRuns: 100 }
    );
  });
  
  it('Property 1.3: Code Quality Tools Validation - For any project with code quality requirements, ESLint and Prettier should be properly configured', () => {
    fc.assert(
      fc.property(
        fc.record({
          eslintEnabled: fc.constant(true),
          prettierEnabled: fc.constant(true),
        }),
        (_config) => {
          // ESLint configuration validation
          const eslintConfigPath = '.eslintrc.cjs';
          expect(existsSync(eslintConfigPath)).toBe(true);
          
          const eslintConfig = readFileSync(eslintConfigPath, 'utf-8');
          expect(eslintConfig).toContain('eslint:recommended');
          expect(eslintConfig).toContain('@typescript-eslint/recommended');
          expect(eslintConfig).toContain('eslint-plugin-react-hooks/recommended');
          
          // Prettier configuration validation
          const prettierConfigPath = '.prettierrc';
          expect(existsSync(prettierConfigPath)).toBe(true);
          
          const prettierConfig = JSON.parse(readFileSync(prettierConfigPath, 'utf-8'));
          expect(typeof prettierConfig.semi).toBe('boolean');
          expect(typeof prettierConfig.singleQuote).toBe('boolean');
          expect(typeof prettierConfig.printWidth).toBe('number');
          expect(typeof prettierConfig.tabWidth).toBe('number');
          
          return true;
        }
      ),
      { numRuns: 100 }
    );
  });
});