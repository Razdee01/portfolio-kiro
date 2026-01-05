import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import * as fc from 'fast-check';
import { ThemeProvider, useTheme } from '../contexts/ThemeContext';
import ThemeToggle from '../components/ui/ThemeToggle';
import Hero from '../components/sections/Hero';
import Services from '../components/sections/Services';
import Skills from '../components/sections/Skills';
import Projects from '../components/sections/Projects';
import Testimonials from '../components/sections/Testimonials';
import Blog from '../components/sections/Blog';
import Contact from '../components/sections/Contact';

/**
 * Property-Based Tests for Styling
 * Feature: portfolio-react-conversion, Property 2: Theme Switching Consistency
 * Validates: Requirements 3.3
 */

describe('Styling Property Tests', () => {
  // Mock localStorage
  const localStorageMock = {
    getItem: vi.fn(),
    setItem: vi.fn(),
    removeItem: vi.fn(),
    clear: vi.fn(),
  };

  beforeEach(() => {
    // Reset localStorage mock
    localStorageMock.getItem.mockReturnValue(null);
    localStorageMock.setItem.mockClear();
    Object.defineProperty(window, 'localStorage', {
      value: localStorageMock,
      writable: true,
    });

    // Mock matchMedia
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: vi.fn().mockImplementation(query => ({
        matches: query.includes('prefers-color-scheme: dark') ? false : false,
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      })),
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('Property 2: Theme Switching Consistency - For any component in the application, switching between light and dark themes should update all color-related styles consistently without visual artifacts', () => {
    // **Feature: portfolio-react-conversion, Property 2: Theme Switching Consistency**
    // **Validates: Requirements 3.3**
    
    fc.assert(
      fc.property(
        fc.record({
          component: fc.constantFrom('hero', 'services', 'skills', 'projects', 'testimonials', 'blog', 'contact'),
          initialTheme: fc.constantFrom('light', 'dark'),
          switchCount: fc.integer({ min: 1, max: 5 })
        }),
        ({ component, initialTheme, switchCount }) => {
          // Set initial theme in localStorage
          localStorageMock.getItem.mockReturnValue(initialTheme);

          // Select component to test
          let ComponentToTest: React.ComponentType;
          let expectedLightClasses: string[] = [];
          let expectedDarkClasses: string[] = [];

          switch (component) {
            case 'hero':
              ComponentToTest = Hero;
              expectedLightClasses = ['from-blue-50', 'to-indigo-100', 'bg-white', 'text-gray-900', 'text-gray-600'];
              expectedDarkClasses = ['dark:from-gray-900', 'dark:to-gray-800', 'dark:bg-gray-800', 'dark:text-white', 'dark:text-gray-300'];
              break;
            case 'services':
              ComponentToTest = Services;
              expectedLightClasses = ['bg-white', 'bg-gray-50', 'text-gray-900', 'text-gray-600'];
              expectedDarkClasses = ['dark:bg-gray-900', 'dark:bg-gray-800', 'dark:text-white', 'dark:text-gray-400'];
              break;
            case 'skills':
              ComponentToTest = Skills;
              expectedLightClasses = ['bg-gray-50', 'bg-white', 'text-gray-900', 'text-gray-600'];
              expectedDarkClasses = ['dark:bg-gray-800', 'dark:bg-gray-900', 'dark:text-white', 'dark:text-gray-400'];
              break;
            case 'projects':
              ComponentToTest = Projects;
              expectedLightClasses = ['bg-white', 'bg-gray-50', 'text-gray-900', 'text-gray-600'];
              expectedDarkClasses = ['dark:bg-gray-900', 'dark:bg-gray-800', 'dark:text-white', 'dark:text-gray-400'];
              break;
            case 'testimonials':
              ComponentToTest = Testimonials;
              expectedLightClasses = ['bg-gray-50', 'bg-white', 'text-gray-900', 'text-gray-700'];
              expectedDarkClasses = ['dark:bg-gray-800', 'dark:bg-gray-900', 'dark:text-white', 'dark:text-gray-300'];
              break;
            case 'blog':
              ComponentToTest = Blog;
              expectedLightClasses = ['bg-white', 'bg-gray-50', 'text-gray-900', 'text-gray-600'];
              expectedDarkClasses = ['dark:bg-gray-900', 'dark:bg-gray-800', 'dark:text-white', 'dark:text-gray-400'];
              break;
            case 'contact':
              ComponentToTest = Contact;
              expectedLightClasses = ['bg-gray-50', 'bg-white', 'text-gray-900', 'text-gray-600'];
              expectedDarkClasses = ['dark:bg-gray-800', 'dark:bg-gray-900', 'dark:text-white', 'dark:text-gray-400'];
              break;
            default:
              ComponentToTest = Hero;
              expectedLightClasses = ['bg-white', 'text-gray-900'];
              expectedDarkClasses = ['dark:bg-gray-800', 'dark:text-white'];
          }

          // Render component with ThemeProvider only (components may have their own ThemeToggle)
          const { container } = render(
            <ThemeProvider>
              <div>
                <ThemeToggle />
                <ComponentToTest />
              </div>
            </ThemeProvider>
          );

          // Get the theme toggle button (use getAllByRole to handle multiple buttons)
          const themeToggleButtons = screen.getAllByRole('button', { 
            name: /switch to (light|dark) mode/i 
          });
          expect(themeToggleButtons.length).toBeGreaterThan(0);
          
          // Use the first theme toggle button
          const themeToggleButton = themeToggleButtons[0];

          // Requirement 3.3: Maintain existing dark/light theme functionality
          
          // 1. Verify initial theme is applied correctly
          const documentElement = document.documentElement;
          expect(documentElement.classList.contains(initialTheme)).toBe(true);

          // 2. Check that theme-specific classes are present in the DOM
          const allElements = container.querySelectorAll('*');
          let hasLightClasses = false;
          let hasDarkClasses = false;

          allElements.forEach(element => {
            const className = element.className;
            if (typeof className === 'string') {
              expectedLightClasses.forEach(lightClass => {
                if (className.includes(lightClass)) {
                  hasLightClasses = true;
                }
              });
              expectedDarkClasses.forEach(darkClass => {
                if (className.includes(darkClass)) {
                  hasDarkClasses = true;
                }
              });
            }
          });

          // Component should have both light and dark theme classes defined
          expect(hasLightClasses).toBe(true);
          expect(hasDarkClasses).toBe(true);

          // 3. Test theme switching consistency
          let currentTheme = initialTheme;
          
          for (let i = 0; i < switchCount; i++) {
            // Click theme toggle button
            fireEvent.click(themeToggleButton);
            
            // Determine expected new theme
            const expectedNewTheme = currentTheme === 'light' ? 'dark' : 'light';
            
            // Verify theme class is updated on document element
            expect(documentElement.classList.contains(expectedNewTheme)).toBe(true);
            expect(documentElement.classList.contains(currentTheme)).toBe(false);
            
            // Verify localStorage is updated
            expect(localStorageMock.setItem).toHaveBeenCalledWith('theme', expectedNewTheme);
            
            // Verify button aria-label is updated
            const updatedButton = screen.getByRole('button', { 
              name: new RegExp(`switch to ${expectedNewTheme === 'light' ? 'dark' : 'light'} mode`, 'i')
            });
            expect(updatedButton).toBeInTheDocument();
            
            // Verify button icon changes (sun for light mode, moon for dark mode)
            const buttonSvg = updatedButton.querySelector('svg');
            expect(buttonSvg).toBeInTheDocument();
            
            if (expectedNewTheme === 'light') {
              // Should show moon icon (for switching to dark)
              const moonPath = buttonSvg?.querySelector('path[d*="20.354 15.354A9 9 0 018.646 3.646"]');
              expect(moonPath).toBeInTheDocument();
            } else {
              // Should show sun icon (for switching to light)
              const sunPath = buttonSvg?.querySelector('path[d*="M12 3v1m0 16v1m9-9h-1M4 12H3"]');
              expect(sunPath).toBeInTheDocument();
            }
            
            // 4. Verify no visual artifacts or inconsistencies
            // Check that all elements with theme classes are properly styled
            const elementsWithThemeClasses = container.querySelectorAll('[class*="dark:"], [class*="bg-"], [class*="text-"]');
            
            elementsWithThemeClasses.forEach(element => {
              const className = element.className;
              if (typeof className === 'string') {
                // Element should not have conflicting theme states
                // (e.g., both light and dark background classes active simultaneously)
                const hasLightBg = className.includes('bg-white') || className.includes('bg-gray-50');
                const hasDarkBg = className.includes('bg-gray-800') || className.includes('bg-gray-900');
                
                // If element has both light and dark classes, they should be properly conditional
                if (hasLightBg && hasDarkBg) {
                  // Should have dark: prefix for dark theme classes
                  const darkBgClasses = className.match(/dark:bg-[\w-]+/g);
                  expect(darkBgClasses).toBeTruthy();
                }
                
                // Text color consistency
                const hasLightText = className.includes('text-gray-900') || className.includes('text-black');
                const hasDarkText = className.includes('text-white') || className.includes('text-gray-100');
                
                if (hasLightText && hasDarkText) {
                  const darkTextClasses = className.match(/dark:text-[\w-]+/g);
                  expect(darkTextClasses).toBeTruthy();
                }
              }
            });
            
            // 5. Verify transition classes are present for smooth theme switching
            const elementsWithTransitions = container.querySelectorAll('[class*="transition"]');
            expect(elementsWithTransitions.length).toBeGreaterThan(0);
            
            // Elements with transitions should have proper duration
            elementsWithTransitions.forEach(element => {
              const className = element.className;
              if (typeof className === 'string' && className.includes('transition')) {
                // Should have transition duration specified
                const hasDuration = className.includes('duration-') || className.includes('transition-all');
                expect(hasDuration).toBe(true);
              }
            });
            
            currentTheme = expectedNewTheme;
          }

          // 6. Final consistency check - verify theme state is stable
          expect(documentElement.classList.contains(currentTheme)).toBe(true);
          expect(localStorageMock.setItem).toHaveBeenCalledWith('theme', currentTheme);

          return true;
        }
      ),
      { numRuns: 100 }
    );
  });

  it('Property 2.1: Theme Context Consistency - For any theme change, all components using theme context should receive the updated theme value', () => {
    fc.assert(
      fc.property(
        fc.record({
          initialTheme: fc.constantFrom('light', 'dark'),
          componentSet: fc.array(
            fc.constantFrom('hero', 'services', 'skills', 'projects'), 
            { minLength: 2, maxLength: 4 }
          )
        }),
        ({ initialTheme, componentSet }) => {
          localStorageMock.getItem.mockReturnValue(initialTheme);

          // Create a test component that uses theme context
          const ThemeConsumer = () => {
            const { theme } = useTheme();
            return <div data-testid="theme-consumer">{theme}</div>;
          };

          const components = componentSet.map(comp => {
            switch (comp) {
              case 'hero': return Hero;
              case 'services': return Services;
              case 'skills': return Skills;
              case 'projects': return Projects;
              default: return Hero;
            }
          });

          render(
            <ThemeProvider>
              <div>
                <ThemeToggle />
                <ThemeConsumer />
                {components.map((Component, index) => (
                  <Component key={index} />
                ))}
              </div>
            </ThemeProvider>
          );

          // Verify initial theme
          const themeConsumer = screen.getByTestId('theme-consumer');
          expect(themeConsumer).toHaveTextContent(initialTheme);

          // Toggle theme
          const themeToggleButtons = screen.getAllByRole('button', { 
            name: /switch to (light|dark) mode/i 
          });
          expect(themeToggleButtons.length).toBeGreaterThan(0);
          fireEvent.click(themeToggleButtons[0]);

          // Verify theme updated in context
          const expectedNewTheme = initialTheme === 'light' ? 'dark' : 'light';
          expect(themeConsumer).toHaveTextContent(expectedNewTheme);

          return true;
        }
      ),
      { numRuns: 100 }
    );
  });

  it('Property 2.2: Theme Persistence - For any theme selection, the theme should persist across component re-renders and page reloads', () => {
    fc.assert(
      fc.property(
        fc.record({
          selectedTheme: fc.constantFrom('light', 'dark'),
          reRenderCount: fc.integer({ min: 1, max: 3 })
        }),
        ({ selectedTheme, reRenderCount }) => {
          // Set initial theme
          localStorageMock.getItem.mockReturnValue('light');

          const { rerender } = render(
            <ThemeProvider>
              <ThemeToggle />
              <Hero />
            </ThemeProvider>
          );

          // Change to selected theme
          if (selectedTheme === 'dark') {
            const themeToggleButtons = screen.getAllByRole('button', { 
              name: /switch to dark mode/i 
            });
            expect(themeToggleButtons.length).toBeGreaterThan(0);
            fireEvent.click(themeToggleButtons[0]);
          }

          // Verify theme is saved to localStorage
          expect(localStorageMock.setItem).toHaveBeenCalledWith('theme', selectedTheme);

          // Simulate page reload by updating localStorage mock and re-rendering
          localStorageMock.getItem.mockReturnValue(selectedTheme);

          for (let i = 0; i < reRenderCount; i++) {
            rerender(
              <ThemeProvider>
                <ThemeToggle />
                <Hero />
              </ThemeProvider>
            );

            // Theme should persist
            expect(document.documentElement.classList.contains(selectedTheme)).toBe(true);
          }

          return true;
        }
      ),
      { numRuns: 100 }
    );
  });

  it('Property 2.3: System Theme Preference Respect - For any system theme preference, the application should respect it when no manual theme is set', () => {
    fc.assert(
      fc.property(
        fc.record({
          systemPrefersDark: fc.boolean(),
          hasManualPreference: fc.boolean()
        }),
        ({ systemPrefersDark, hasManualPreference }) => {
          // Mock system preference
          Object.defineProperty(window, 'matchMedia', {
            writable: true,
            value: vi.fn().mockImplementation(query => ({
              matches: query.includes('prefers-color-scheme: dark') ? systemPrefersDark : false,
              media: query,
              onchange: null,
              addListener: vi.fn(),
              removeListener: vi.fn(),
              addEventListener: vi.fn(),
              removeEventListener: vi.fn(),
              dispatchEvent: vi.fn(),
            })),
          });

          // Set localStorage based on manual preference
          localStorageMock.getItem.mockReturnValue(
            hasManualPreference ? (systemPrefersDark ? 'light' : 'dark') : null
          );

          render(
            <ThemeProvider>
              <ThemeToggle />
              <Hero />
            </ThemeProvider>
          );

          const expectedTheme = hasManualPreference 
            ? (systemPrefersDark ? 'light' : 'dark')  // Manual preference overrides system
            : (systemPrefersDark ? 'dark' : 'light'); // Use system preference

          expect(document.documentElement.classList.contains(expectedTheme)).toBe(true);

          return true;
        }
      ),
      { numRuns: 100 }
    );
  });
});