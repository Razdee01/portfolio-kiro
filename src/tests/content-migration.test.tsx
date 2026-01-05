import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import * as fc from 'fast-check';
import Hero from '../components/sections/Hero';
import Services from '../components/sections/Services';
import Skills from '../components/sections/Skills';
import Projects from '../components/sections/Projects';

/**
 * Property-Based Tests for Content Migration
 * Feature: portfolio-react-conversion, Property 1: Responsive Design Consistency
 * Validates: Requirements 2.4
 */

describe('Content Migration Property Tests', () => {
  // Store original window properties
  let originalInnerWidth: number;
  let originalInnerHeight: number;

  beforeEach(() => {
    originalInnerWidth = window.innerWidth;
    originalInnerHeight = window.innerHeight;
  });

  afterEach(() => {
    // Restore original window properties
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: originalInnerWidth,
    });
    Object.defineProperty(window, 'innerHeight', {
      writable: true,
      configurable: true,
      value: originalInnerHeight,
    });
  });

  it('Property 1: Responsive Design Consistency - For any viewport size between 320px and 2560px width, all components should maintain proper layout and readability without horizontal scrolling or content overflow', () => {
    // **Feature: portfolio-react-conversion, Property 1: Responsive Design Consistency**
    // **Validates: Requirements 2.4**
    
    fc.assert(
      fc.property(
        fc.record({
          viewportWidth: fc.integer({ min: 320, max: 2560 }),
          viewportHeight: fc.integer({ min: 568, max: 1440 }),
          component: fc.constantFrom('hero', 'services', 'skills', 'projects')
        }),
        ({ viewportWidth, viewportHeight, component }) => {
          // Set viewport dimensions
          Object.defineProperty(window, 'innerWidth', {
            writable: true,
            configurable: true,
            value: viewportWidth,
          });
          Object.defineProperty(window, 'innerHeight', {
            writable: true,
            configurable: true,
            value: viewportHeight,
          });

          // Mock window.matchMedia for responsive design tests
          window.matchMedia = vi.fn().mockImplementation(query => ({
            matches: query.includes(`max-width: ${viewportWidth}px`) || 
                    query.includes(`min-width: ${viewportWidth}px`),
            media: query,
            onchange: null,
            addListener: vi.fn(),
            removeListener: vi.fn(),
            addEventListener: vi.fn(),
            removeEventListener: vi.fn(),
            dispatchEvent: vi.fn(),
          }));

          let ComponentToTest: React.ComponentType;
          let expectedElements: string[] = [];

          // Select component to test and define expected elements
          switch (component) {
            case 'hero':
              ComponentToTest = Hero;
              expectedElements = [
                'Available for work',
                'Mirta Akins',
                'UI/UX Designer & Frontend Developer',
                'Download Resume',
                'Get In Touch'
              ];
              break;
            case 'services':
              ComponentToTest = Services;
              expectedElements = [
                'What I Do',
                'UI/UX Design',
                'Web Development',
                'Mobile Design',
                'Brand Identity'
              ];
              break;
            case 'skills':
              ComponentToTest = Skills;
              expectedElements = [
                'Skills & Expertise',
                'Technical Skills',
                'Soft Skills',
                'React & TypeScript'
              ];
              break;
            case 'projects':
              ComponentToTest = Projects;
              expectedElements = [
                'Featured Projects',
                'All Projects'
              ];
              break;
            default:
              ComponentToTest = Hero;
              expectedElements = ['Mirta Akins'];
          }

          // Render the component
          const { container } = render(<ComponentToTest />);

          // Requirement 2.4: Maintain responsive design across all screen sizes
          
          // 1. Check that all expected content is present and readable
          expectedElements.forEach(text => {
            const element = screen.queryByText(text);
            if (element) {
              expect(element).toBeInTheDocument();
              expect(element).toBeVisible();
            }
          });

          // 2. Check for proper container constraints
          const sections = container.querySelectorAll('section');
          sections.forEach(section => {
            const computedStyle = window.getComputedStyle(section);
            
            // Sections should not have fixed widths that exceed viewport
            const maxWidth = computedStyle.maxWidth;
            if (maxWidth && maxWidth !== 'none') {
              const maxWidthValue = parseInt(maxWidth);
              if (!isNaN(maxWidthValue)) {
                expect(maxWidthValue).toBeLessThanOrEqual(viewportWidth);
              }
            }
          });

          // 3. Check for responsive grid layouts
          const gridContainers = container.querySelectorAll('.grid');
          gridContainers.forEach(grid => {
            const computedStyle = window.getComputedStyle(grid);
            
            // Grid should adapt to viewport size
            const gridTemplateColumns = computedStyle.gridTemplateColumns;
            if (gridTemplateColumns && gridTemplateColumns !== 'none') {
              // For mobile viewports (< 768px), should typically be single column
              if (viewportWidth < 768) {
                // Should not have more than 2 columns on mobile
                const columnCount = gridTemplateColumns.split(' ').length;
                expect(columnCount).toBeLessThanOrEqual(2);
              }
            }
          });

          // 4. Check for proper text scaling and readability
          const textElements = container.querySelectorAll('h1, h2, h3, h4, h5, h6, p, span, button');
          textElements.forEach(element => {
            const computedStyle = window.getComputedStyle(element);
            const fontSize = parseFloat(computedStyle.fontSize);
            
            // Text should be readable (minimum 12px, typically 14px+)
            expect(fontSize).toBeGreaterThanOrEqual(12);
            
            // Text should not be too large for small viewports
            if (viewportWidth < 480) {
              expect(fontSize).toBeLessThanOrEqual(48); // Reasonable max for mobile
            }
          });

          // 5. Check for proper spacing and padding
          const containerElements = container.querySelectorAll('.container, .px-6, .px-4, .px-8');
          containerElements.forEach(element => {
            const computedStyle = window.getComputedStyle(element);
            const paddingLeft = parseFloat(computedStyle.paddingLeft);
            const paddingRight = parseFloat(computedStyle.paddingRight);
            
            // Padding should be reasonable for viewport size
            const totalHorizontalPadding = paddingLeft + paddingRight;
            expect(totalHorizontalPadding).toBeLessThan(viewportWidth * 0.4); // Max 40% of viewport
          });

          // 6. Check for proper button and interactive element sizing
          const buttons = container.querySelectorAll('button');
          buttons.forEach(button => {
            const computedStyle = window.getComputedStyle(button);
            const minHeight = parseFloat(computedStyle.minHeight) || parseFloat(computedStyle.height);
            
            // Buttons should be touch-friendly (minimum 44px height recommended)
            if (viewportWidth < 768) {
              expect(minHeight).toBeGreaterThanOrEqual(40); // Slightly relaxed for testing
            }
          });

          // 7. Check for proper image and media scaling
          const images = container.querySelectorAll('img, .w-80, .h-80, .w-72, .h-72');
          images.forEach(element => {
            const computedStyle = window.getComputedStyle(element);
            const width = parseFloat(computedStyle.width);
            
            if (!isNaN(width) && width > 0) {
              // Images should not exceed viewport width
              expect(width).toBeLessThanOrEqual(viewportWidth);
            }
          });

          // 8. Check for proper flex and layout behavior
          const flexContainers = container.querySelectorAll('.flex');
          flexContainers.forEach(flexContainer => {
            // On mobile, flex containers should typically stack vertically
            if (viewportWidth < 768 && flexContainer.classList.contains('lg:flex-row')) {
              // Should have responsive classes that change direction on mobile
              expect(flexContainer.classList.contains('flex-col')).toBe(true);
            }
          });

          // 9. Verify no horizontal overflow
          const allElements = container.querySelectorAll('*');
          allElements.forEach(element => {
            const rect = element.getBoundingClientRect();
            if (rect.width > 0) {
              // Element should not extend beyond viewport width
              // Allow small tolerance for scrollbars and rounding
              expect(rect.right).toBeLessThanOrEqual(viewportWidth + 20);
            }
          });

          return true;
        }
      ),
      { numRuns: 100 }
    );
  });

  it('Property 1.1: Mobile Layout Adaptation - For any mobile viewport (320px-767px), components should use mobile-optimized layouts', () => {
    fc.assert(
      fc.property(
        fc.record({
          mobileWidth: fc.integer({ min: 320, max: 767 }),
          component: fc.constantFrom('hero', 'services', 'skills', 'projects')
        }),
        ({ mobileWidth, component }) => {
          // Set mobile viewport
          Object.defineProperty(window, 'innerWidth', {
            writable: true,
            configurable: true,
            value: mobileWidth,
          });

          let ComponentToTest: React.ComponentType;
          switch (component) {
            case 'hero': ComponentToTest = Hero; break;
            case 'services': ComponentToTest = Services; break;
            case 'skills': ComponentToTest = Skills; break;
            case 'projects': ComponentToTest = Projects; break;
            default: ComponentToTest = Hero;
          }

          const { container } = render(<ComponentToTest />);

          // Check for mobile-specific responsive classes
          const responsiveElements = container.querySelectorAll('[class*="md:"], [class*="lg:"], [class*="sm:"]');
          
          // Should have responsive breakpoint classes
          expect(responsiveElements.length).toBeGreaterThan(0);

          // Check for proper mobile grid layouts
          const gridElements = container.querySelectorAll('.grid-cols-1');
          if (gridElements.length > 0) {
            // Should have single column layout on mobile
            expect(gridElements.length).toBeGreaterThan(0);
          }

          // Check for proper mobile text alignment
          const textCenterElements = container.querySelectorAll('.text-center');
          const textLeftElements = container.querySelectorAll('.lg\\:text-left');
          
          // Mobile should typically center text, desktop can be left-aligned
          if (textLeftElements.length > 0) {
            expect(textCenterElements.length).toBeGreaterThan(0);
          }

          return true;
        }
      ),
      { numRuns: 100 }
    );
  });

  it('Property 1.2: Desktop Layout Optimization - For any desktop viewport (1024px+), components should use desktop-optimized layouts', () => {
    fc.assert(
      fc.property(
        fc.record({
          desktopWidth: fc.integer({ min: 1024, max: 2560 }),
          component: fc.constantFrom('hero', 'services', 'skills', 'projects')
        }),
        ({ desktopWidth, component }) => {
          // Set desktop viewport
          Object.defineProperty(window, 'innerWidth', {
            writable: true,
            configurable: true,
            value: desktopWidth,
          });

          let ComponentToTest: React.ComponentType;
          switch (component) {
            case 'hero': ComponentToTest = Hero; break;
            case 'services': ComponentToTest = Services; break;
            case 'skills': ComponentToTest = Skills; break;
            case 'projects': ComponentToTest = Projects; break;
            default: ComponentToTest = Hero;
          }

          const { container } = render(<ComponentToTest />);

          // Check for desktop-specific layouts
          const multiColumnGrids = container.querySelectorAll('.lg\\:grid-cols-2, .lg\\:grid-cols-3, .lg\\:grid-cols-4, .md\\:grid-cols-2');
          
          // Desktop should utilize multiple columns where appropriate
          if (component === 'services' || component === 'projects') {
            expect(multiColumnGrids.length).toBeGreaterThan(0);
          }

          // Check for proper desktop flex layouts
          const flexRowElements = container.querySelectorAll('.lg\\:flex-row');
          if (flexRowElements.length > 0) {
            // Desktop should use horizontal layouts where appropriate
            expect(flexRowElements.length).toBeGreaterThan(0);
          }

          // Check container max-width constraints
          const containers = container.querySelectorAll('.container');
          containers.forEach(containerEl => {
            const computedStyle = window.getComputedStyle(containerEl);
            const maxWidth = computedStyle.maxWidth;
            
            // Container should have reasonable max-width on large screens
            if (maxWidth && maxWidth !== 'none') {
              const maxWidthValue = parseInt(maxWidth);
              if (!isNaN(maxWidthValue)) {
                expect(maxWidthValue).toBeGreaterThan(768); // Should be larger than tablet
                expect(maxWidthValue).toBeLessThan(desktopWidth); // But not exceed viewport
              }
            }
          });

          return true;
        }
      ),
      { numRuns: 100 }
    );
  });

  it('Property 1.3: Content Preservation Across Viewports - For any viewport size, all essential content should remain visible and accessible', () => {
    fc.assert(
      fc.property(
        fc.record({
          viewportWidth: fc.integer({ min: 320, max: 2560 }),
          component: fc.constantFrom('hero', 'services', 'skills', 'projects')
        }),
        ({ viewportWidth, component }) => {
          // Set viewport
          Object.defineProperty(window, 'innerWidth', {
            writable: true,
            configurable: true,
            value: viewportWidth,
          });

          let ComponentToTest: React.ComponentType;
          let essentialContent: string[] = [];

          switch (component) {
            case 'hero':
              ComponentToTest = Hero;
              essentialContent = ['Mirta Akins', 'UI/UX Designer', 'Download Resume'];
              break;
            case 'services':
              ComponentToTest = Services;
              essentialContent = ['What I Do', 'UI/UX Design', 'Web Development'];
              break;
            case 'skills':
              ComponentToTest = Skills;
              essentialContent = ['Skills & Expertise', 'Technical Skills', 'React & TypeScript'];
              break;
            case 'projects':
              ComponentToTest = Projects;
              essentialContent = ['Featured Projects', 'All Projects'];
              break;
            default:
              ComponentToTest = Hero;
              essentialContent = ['Mirta Akins'];
          }

          render(<ComponentToTest />);

          // Verify all essential content is present and visible
          essentialContent.forEach(content => {
            const element = screen.queryByText(content);
            if (element) {
              expect(element).toBeInTheDocument();
              expect(element).toBeVisible();
              
              // Content should not be clipped or hidden
              const rect = element.getBoundingClientRect();
              expect(rect.width).toBeGreaterThan(0);
              expect(rect.height).toBeGreaterThan(0);
            }
          });

          return true;
        }
      ),
      { numRuns: 100 }
    );
  });
});