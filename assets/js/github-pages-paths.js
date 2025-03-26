/**
 * GitHub Pages Path Helper
 * This script fixes relative paths for GitHub Pages deployment
 */
document.addEventListener('DOMContentLoaded', function() {
  // The repository name
  const repoName = 'calander';
  
  // Only run this script if we're on GitHub Pages
  if (window.location.hostname === 'mehrabix.github.io' || window.location.hostname.endsWith('github.io')) {
    console.log('GitHub Pages path helper running for repo:', repoName);
    
    // Find all links
    const links = document.querySelectorAll('a[href]');
    
    links.forEach(link => {
      const href = link.getAttribute('href');
      
      // Skip anchors and external links
      if (href.startsWith('#') || href.match(/^(https?:)?\/\//)) {
        return;
      }
      
      // Fix absolute links that don't include the repo name
      if (href.startsWith('/') && !href.startsWith('/' + repoName)) {
        link.setAttribute('href', '/' + repoName + href);
        console.log('Fixed link from', href, 'to', '/' + repoName + href);
      }
      
      // Don't modify links that already have the repo name, external links, or relative links
    });
    
    // Add base tag to head if not exists (helps with relative paths)
    if (!document.querySelector('base')) {
      const base = document.createElement('base');
      base.href = window.location.origin + '/' + repoName + '/';
      document.head.appendChild(base);
    }
  }
}); 