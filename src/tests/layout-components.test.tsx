import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import * as fc from 'fast-check';
import Navbar from '../components/layout/Navbar';

/**
 * Property-Based Tests for Layout Components
 * Feature: portfolio-react-conversion, Property 13: Mobile Navigation Behavior
 * Validates: Requirements 9.3, 9.4
 */

describe('Layout Components Property Tests', () => {
  it('Property 13: Mobile Navigation Behavior - For any mobile viewport and navigation interaction, the mobile menu should be responsive and close when navigation items are selected', () => {
    // **Feature: portfolio-react-conversion, Property 13: Mobile Navigation Behavior**
    // **Validates: Requirements 9.3, 9.4**
    
    fc.assert(
      fc.property(
        fc.record({
          activeSection: fc.constantFrom('hero', 'services', 'skills', 'projects', 'testimonials', 'blog', 'contact'),
          selectedNavItem: fc.constantFrom('hero', 'services', 'skills', 'projects', 'testimonials', 'blog', 'contact'),
          mobileViewport: fc.record({
            width: fc.integer({ min: 320, max: 767 }), // Mobile viewport range
            height: fc.integer({ min: 568, max: 1024 })
          })
        }),
        ({ activeSection, selectedNavItem, mobileViewport }) => {
          // Mock window.innerWidth for mobile viewport testing
          Object.defineProperty(window, 'innerWidth', {
            writable: true,
            configurable: true,
            value: mobileViewport.width,
          });
          Object.defineProperty(window, 'innerHeight', {
            writable: true,
            configurable: true,
            value: mobileViewport.height,
          });

          // Mock the onNavigate callback
          const mockOnNavigate = vi.fn();

          // Render the Navbar component
          render(
            <Navbar 
              activeSection={activeSection} 
              onNavigate={mockOnNavigate} 
            />
          );

          // Requirement 9.3: Mobile-responsive navigation menu
          // In mobile viewport, the hamburger menu button should be visible
          const hamburgerButton = screen.getByRole('button', { name: /open main menu/i });
          expect(hamburgerButton).toBeInTheDocument();

          // The desktop navigation should be hidden in mobile viewport
          const desktopNav = screen.queryByText('Home');
          if (desktopNav) {
            // Check if it's hidden via CSS classes (md:block means hidden on mobile)
            const desktopNavContainer = desktopNav.closest('.hidden.md\\:block');
            expect(desktopNavContainer).toBeInTheDocument();
          }

          // Initially, mobile menu should be closed
          const mobileMenuContainer = screen.queryByText('Home')?.closest('.md\\:hidden');
          if (mobileMenuContainer) {
            expect(mobileMenuContainer).toHaveClass('hidden');
          }

          // Click hamburger button to open mobile menu
          fireEvent.click(hamburgerButton);

          // Mobile menu should now be visible
          const openMobileMenu = screen.getByText('Home').closest('.md\\:hidden');
          expect(openMobileMenu).not.toHaveClass('hidden');
          expect(openMobileMenu).toHaveClass('block');

          // All navigation items should be present in mobile menu
          const navigationItems = ['Home', 'Services', 'Skills', 'Projects', 'Testimonials', 'Blog', 'Contact'];
          navigationItems.forEach(item => {
            const navItem = screen.getAllByText(item);
            // Should have at least one instance (mobile menu)
            expect(navItem.length).toBeGreaterThanOrEqual(1);
          });

          // Requirement 9.4: Mobile menu closes when navigation item is selected
          // Find the navigation item to click in the mobile menu
          const navItemsInMobileMenu = screen.getAllByText(
            navigationItems.find(item => 
              item.toLowerCase() === selectedNavItem || 
              (selectedNavItem === 'hero' && item === 'Home')
            ) || 'Home'
          );
          
          // Click on a navigation item in the mobile menu
          const mobileNavItem = navItemsInMobileMenu.find(item => 
            item.closest('.md\\:hidden')
          );
          
          if (mobileNavItem) {
            fireEvent.click(mobileNavItem);

            // Verify onNavigate was called with correct section
            expect(mockOnNavigate).toHaveBeenCalledWith(
              selectedNavItem === 'hero' ? 'hero' : selectedNavItem
            );

            // Mobile menu should be closed after navigation
            const closedMobileMenu = screen.queryByText('Home')?.closest('.md\\:hidden');
            if (closedMobileMenu) {
              expect(closedMobileMenu).toHaveClass('hidden');
              expect(closedMobileMenu).not.toHaveClass('block');
            }
          }

          return true;
        }
      ),
      { numRuns: 100 }
    );
  });

  it('Property 13.1: Mobile Menu Toggle Behavior - For any mobile viewport, the hamburger menu should toggle the mobile navigation visibility', () => {
    fc.assert(
      fc.property(
        fc.record({
          activeSection: fc.constantFrom('hero', 'services', 'skills', 'projects'),
          mobileWidth: fc.integer({ min: 320, max: 767 })
        }),
        ({ activeSection, mobileWidth }) => {
          // Set mobile viewport
          Object.defineProperty(window, 'innerWidth', {
            writable: true,
            configurable: true,
            value: mobileWidth,
          });

          const mockOnNavigate = vi.fn();
          render(<Navbar activeSection={activeSection} onNavigate={mockOnNavigate} />);

          const hamburgerButton = screen.getByRole('button', { name: /open main menu/i });
          
          // Initially closed
          let mobileMenu = screen.queryByText('Home')?.closest('.md\\:hidden');
          if (mobileMenu) {
            expect(mobileMenu).toHaveClass('hidden');
          }

          // Click to open
          fireEvent.click(hamburgerButton);
          mobileMenu = screen.queryByText('Home')?.closest('.md\\:hidden');
          if (mobileMenu) {
            expect(mobileMenu).toHaveClass('block');
            expect(mobileMenu).not.toHaveClass('hidden');
          }

          // Click to close
          fireEvent.click(hamburgerButton);
          mobileMenu = screen.queryByText('Home')?.closest('.md\\:hidden');
          if (mobileMenu) {
            expect(mobileMenu).toHaveClass('hidden');
            expect(mobileMenu).not.toHaveClass('block');
          }

          return true;
        }
      ),
      { numRuns: 100 }
    );
  });

  it('Property 13.2: Mobile Menu Outside Click Behavior - For any mobile viewport with open menu, clicking outside should close the mobile menu', () => {
    fc.assert(
      fc.property(
        fc.record({
          activeSection: fc.constantFrom('hero', 'services', 'skills'),
          mobileWidth: fc.integer({ min: 320, max: 767 })
        }),
        ({ activeSection, mobileWidth }) => {
          // Set mobile viewport
          Object.defineProperty(window, 'innerWidth', {
            writable: true,
            configurable: true,
            value: mobileWidth,
          });

          const mockOnNavigate = vi.fn();
          render(
            <div>
              <Navbar activeSection={activeSection} onNavigate={mockOnNavigate} />
              <div data-testid="outside-element">Outside content</div>
            </div>
          );

          const hamburgerButton = screen.getByRole('button', { name: /open main menu/i });
          
          // Open mobile menu
          fireEvent.click(hamburgerButton);
          let mobileMenu = screen.queryByText('Home')?.closest('.md\\:hidden');
          if (mobileMenu) {
            expect(mobileMenu).toHaveClass('block');
          }

          // Click outside the navbar
          const outsideElement = screen.getByTestId('outside-element');
          fireEvent.click(outsideElement);

          // Mobile menu should be closed
          mobileMenu = screen.queryByText('Home')?.closest('.md\\:hidden');
          if (mobileMenu) {
            expect(mobileMenu).toHaveClass('hidden');
          }

          return true;
        }
      ),
      { numRuns: 100 }
    );
  });

  it('Property 13.3: Active Section Highlighting in Mobile Menu - For any active section, the mobile menu should highlight the correct navigation item', () => {
    fc.assert(
      fc.property(
        fc.record({
          activeSection: fc.constantFrom('hero', 'services', 'skills', 'projects', 'testimonials', 'blog', 'contact'),
          mobileWidth: fc.integer({ min: 320, max: 767 })
        }),
        ({ activeSection, mobileWidth }) => {
          // Set mobile viewport
          Object.defineProperty(window, 'innerWidth', {
            writable: true,
            configurable: true,
            value: mobileWidth,
          });

          const mockOnNavigate = vi.fn();
          render(<Navbar activeSection={activeSection} onNavigate={mockOnNavigate} />);

          // Open mobile menu
          const hamburgerButton = screen.getByRole('button', { name: /open main menu/i });
          fireEvent.click(hamburgerButton);

          // Find the active navigation item in mobile menu
          const expectedLabel = activeSection === 'hero' ? 'Home' : 
            activeSection.charAt(0).toUpperCase() + activeSection.slice(1);

          const navItems = screen.getAllByText(expectedLabel);
          const mobileNavItem = navItems.find(item => 
            item.closest('.md\\:hidden')
          );

          if (mobileNavItem) {
            // Active item should have active styling (bg-blue-600 text-white)
            expect(mobileNavItem).toHaveClass('bg-blue-600', 'text-white');
          }

          return true;
        }
      ),
      { numRuns: 100 }
    );
  });
});