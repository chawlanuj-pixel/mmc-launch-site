REDIRECTS ARE PARKED HERE ON PURPOSE. NONE OF THEM IS DEPLOYED.

Files:
  .htaccess   Hostinger/Apache rules (old WordPress URLs, legacy .html URLs, AI by MMC old paths,
              retired draft pages, trailing slash, and force https + www).
  _redirects  The same legacy map in Netlify/Cloudflare format (not read by Hostinger).

Why they are parked: the last two rules in .htaccess force every request to
https://www.mondaymarketing.company/... . On a temporary server (any other hostname) that sends every
visitor to the live domain instead of showing this build.

To deploy them at launch (when the site is on mondaymarketing.company):
  mv redirects-hold/.htaccess public/.htaccess
  mv redirects-hold/_redirects public/_redirects     # only if hosting on Netlify/Cloudflare
  npm run build
Then upload dist/ (the .htaccess is copied to dist/.htaccess).
Before launch, decide www vs non-www: the live site currently redirects www -> non-www,
but this build's canonicals and the force-www rule use https://www.mondaymarketing.company.
