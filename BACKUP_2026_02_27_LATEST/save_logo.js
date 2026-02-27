const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

(async () => {
    try {
        const browser = await puppeteer.launch({ headless: true });
        const page = await browser.newPage();

        // Setup proper resolution
        await page.setViewport({ width: 800, height: 600, deviceScaleFactor: 4 });

        // We load the html directly with the necessary css
        const html = `
        <!DOCTYPE html>
        <html>
        <head>
            <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400..900;1,400..900&family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
            <style>
                body {
                    margin: 0;
                    padding: 40px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    background: transparent;
                }
                .spm-brand-box {
                    display: flex;
                    flex-direction: column;
                    text-decoration: none;
                    min-width: 180px;
                    align-self: flex-start;
                    filter: drop-shadow(0 4px 10px rgba(0,0,0,0.2));
                }
                .spm-logo-top {
                    background: #0d3b8e;
                    padding: 0 15px;
                    height: 76px;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    border-left: 1px solid rgba(255,255,255,0.1);
                    border-right: 1px solid rgba(255,255,255,0.1);
                }
                .spm-logo-main-text {
                    color: #FFD700;
                    font-family: 'Playfair Display', serif;
                    font-size: 3rem;
                    font-weight: 800;
                    line-height: 0.75;
                    letter-spacing: 1.5px;
                    text-transform: lowercase;
                    margin: 0;
                    margin-right: -1.5px;
                    padding: 0;
                }
                .spm-logo-sub-text {
                    color: white;
                    font-family: 'Inter', sans-serif;
                    font-size: 0.55rem;
                    font-weight: 800;
                    letter-spacing: 6.5px;
                    margin-top: 18px;
                    margin-right: -6.5px;
                    margin-bottom: 0;
                    line-height: 1;
                    text-transform: uppercase;
                }
                .spm-logo-bottom {
                    background: white;
                    padding: 4px 10px;
                    text-align: center;
                    border-bottom-left-radius: 4px;
                    border-bottom-right-radius: 4px;
                }
                .spm-tagline-text {
                    color: #0d3b8e;
                    font-size: 0.8rem;
                    font-weight: 800;
                    letter-spacing: 0.5px;
                    font-family: 'Inter', sans-serif;
                }
            </style>
        </head>
        <body>
            <div id="logo-container" style="display: inline-block;">
                <div class="spm-brand-box">
                    <div class="spm-logo-top">
                        <div class="spm-logo-main-text">spm</div>
                        <div class="spm-logo-sub-text">PUBLICATION</div>
                    </div>
                    <div class="spm-logo-bottom">
                        <div class="spm-tagline-text">हर सपने की शुरुआत</div>
                    </div>
                </div>
            </div>
        </body>
        </html>
        `;

        await page.setContent(html, { waitUntil: 'networkidle0' });

        // Optional: wait a bit for fonts to render perfectly
        await new Promise(resolve => setTimeout(resolve, 500));

        const element = await page.$('#logo-container');

        const desktopPath = path.join(require('os').homedir(), 'Desktop', 'spm_logo.png');
        await element.screenshot({ path: desktopPath, omitBackground: true });

        console.log('Successfully saved to:', desktopPath);

        await browser.close();
    } catch (e) {
        console.error('Failed to generate PNG', e);
    }
})();
