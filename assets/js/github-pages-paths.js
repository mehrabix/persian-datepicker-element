/**
 * GitHub Pages Path Helper
 * This script fixes relative paths for GitHub Pages deployment
 */
document.addEventListener('DOMContentLoaded', function() {
  // The repository name
  const repoName = 'persian-datepicker-element';
  
  // Only run this script if we're on GitHub Pages
  if (window.location.hostname === 'mehrabix.github.io') {
    // Find all links
    const links = document.querySelectorAll('a[href]');
    
    links.forEach(link => {
      const href = link.getAttribute('href');
      
      // Fix absolute links that don't include the repo name
      if (href.startsWith('/') && !href.startsWith('/' + repoName)) {
        link.setAttribute('href', '/' + repoName + href);
      }
      
      // Don't modify links that already have the repo name, external links, or relative links
    });
  }
}); 