// Low-data mode toggle for slow connections in Liberia
let lowDataMode = localStorage.getItem('lowDataMode') === 'true';

function applyLowDataMode(enable) {
    lowDataMode = enable;
    localStorage.setItem('lowDataMode', enable);
    
    // Hide all images except essential ones (e.g., hero photo – can be toggled)
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        if (enable) {
            // Store original src if not already stored
            if (!img.getAttribute('data-original-src')) {
                img.setAttribute('data-original-src', img.src);
            }
            img.style.display = 'none';
        } else {
            if (img.getAttribute('data-original-src')) {
                img.src = img.getAttribute('data-original-src');
            }
            img.style.display = '';
        }
    });
    
    // Optionally hide background images, but skip for simplicity
    
    const modeIndicator = document.getElementById('lowDataIndicator');
    if (modeIndicator) {
        modeIndicator.textContent = enable ? '⚡ Low-data mode ON' : '🌐 Normal mode';
    }
    
    // Show a notification
    const notice = document.createElement('div');
    notice.style.position = 'fixed';
    notice.style.bottom = '10px';
    notice.style.right = '10px';
    notice.style.backgroundColor = enable ? '#f39c12' : '#27ae60';
    notice.style.color = 'white';
    notice.style.padding = '6px 12px';
    notice.style.borderRadius = '20px';
    notice.style.fontSize = '12px';
    notice.style.zIndex = '9999';
    notice.innerText = enable ? 'Low-data mode: images off' : 'Normal mode: images on';
    document.body.appendChild(notice);
    setTimeout(() => notice.remove(), 2000);
}

// Add toggle button if not exists
function addLowDataToggle() {
    const toggleDiv = document.createElement('div');
    toggleDiv.style.position = 'fixed';
    toggleDiv.style.bottom = '10px';
    toggleDiv.style.left = '10px';
    toggleDiv.style.zIndex = '9999';
    toggleDiv.innerHTML = `
        <button id="lowDataToggle" style="background:#2c3e2f; color:white; border:none; padding:6px 12px; border-radius:20px; cursor:pointer; font-size:12px;">
            ${lowDataMode ? '⚡ Low-data mode ON' : '🌐 Normal mode'}
        </button>
    `;
    document.body.appendChild(toggleDiv);
    
    const btn = document.getElementById('lowDataToggle');
    btn.addEventListener('click', () => {
        applyLowDataMode(!lowDataMode);
        btn.textContent = lowDataMode ? '⚡ Low-data mode ON' : '🌐 Normal mode';
    });
}

// Auto-detect slow connection (if navigator.connection available)
if ('connection' in navigator) {
    const conn = navigator.connection;
    if (conn.saveData || (conn.effectiveType && (conn.effectiveType === 'slow-2g' || conn.effectiveType === '2g'))) {
        if (!localStorage.getItem('lowDataMode')) { // not set yet
            applyLowDataMode(true);
        }
    }
}

// Apply stored preference on page load
if (lowDataMode) {
    applyLowDataMode(true);
}

// Add toggle button after DOM ready
document.addEventListener('DOMContentLoaded', addLowDataToggle);
