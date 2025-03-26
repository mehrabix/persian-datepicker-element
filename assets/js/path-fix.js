/**
 * GitHub Pages Path Helper v2
 * This script ensures all links work correctly in GitHub Pages by dynamically
 * fixing paths based on the current location
 */
(function() {
  // Check if we're on GitHub Pages
  if (window.location.hostname === 'mehrabix.github.io' || window.location.hostname.endsWith('github.io')) {
    // The repository name that needs to be in the path
    const repoName = 'calander'; // UPDATED to your actual repo name
    const baseUrl = '/' + repoName;
    
    document.addEventListener('DOMContentLoaded', function() {
      // Fix all links in the document
      const links = document.querySelectorAll('a[href]');
      
      links.forEach(link => {
        const href = link.getAttribute('href');
        
        // Only process internal links (not external URLs with http/https)
        if (!href.match(/^(https?:)?\/\//) && !href.startsWith('#')) {
          // Fix absolute paths that don't include the repo name
          if (href.startsWith('/') && !href.startsWith(baseUrl)) {
            link.setAttribute('href', baseUrl + href);
          } 
          // Fix relative paths if needed
          else if (href.startsWith('./') || href.startsWith('../') || !href.startsWith('/')) {
            // We'll keep relative paths as they are - they should work if the HTML structure is consistent
            // But we'll log them for debugging
            console.log('Keeping relative path:', href);
          }
        }
      });
      
      // Fix any redirects in meta tags
      const metaRefresh = document.querySelector('meta[http-equiv="refresh"]');
      if (metaRefresh) {
        const content = metaRefresh.getAttribute('content');
        const urlMatch = content.match(/url=([^;]*)/i);
        
        if (urlMatch && urlMatch[1]) {
          const redirectUrl = urlMatch[1];
          // Only fix absolute paths without the repo name
          if (redirectUrl.startsWith('/') && !redirectUrl.startsWith(baseUrl)) {
            metaRefresh.setAttribute('content', content.replace(redirectUrl, baseUrl + redirectUrl));
          }
        }
      }
      
      // Add base tag to head if not exists
      if (!document.querySelector('base')) {
        const base = document.createElement('base');
        base.href = window.location.origin + baseUrl + '/';
        document.head.appendChild(base);
      }
      
      // Log that the path fixing is complete (for debugging)
      console.log('GitHub Pages path fixing complete with baseUrl:', baseUrl);
    });
  } else {
    console.log('Not on GitHub Pages, skipping path fixes');
  }
})(); 