async function initSearchSystem() {
    let defaultPins = {};
    
    try {
        const response = await fetch('search-engines.json');
        if (response.ok) {
            defaultPins = await response.json();
        }
    } catch (error) {
        console.warn("Gagal memuat search-engines.json:", error);
    }

    const customPins = JSON.parse(localStorage.getItem('customSearchPins')) || {};
    const allPins = { ...defaultPins, ...customPins };

    const urlParams = new URLSearchParams(window.location.search);
    const query = urlParams.get('q');

    if (!query) return false;

    let cleanQuery = query.trim();

    // PERBAIKAN: Jika user ngetik "gl aaa" (tanpa @), otomatis tambahkan @ di depannya
    if (!cleanQuery.startsWith('@')) {
        // Cek apakah kata pertamanya ada di daftar pin (misal: "gl", "yt")
        const firstWord = cleanQuery.split(' ')[0];
        if (allPins['@' + firstWord]) {
            cleanQuery = '@' + cleanQuery;
        }
    }

    // Periksa apakah query cocok dengan prefix PIN
    for (const [prefix, baseUrl] of Object.entries(allPins)) {
        if (cleanQuery.startsWith(prefix)) {
            const actualSearchText = cleanQuery.slice(prefix.length).trim();
            if (actualSearchText.length > 0) {
                window.location.href = baseUrl + encodeURIComponent(actualSearchText);
                return true;
            }
        }
    }

    return false;
}

function openModal() {
    document.getElementById('pinModal').style.display = 'block';
}

function closeModal() {
    document.getElementById('pinModal').style.display = 'none';
}

function saveNewPin() {
    let prefix = document.getElementById('prefixInput').value.trim();
    let domain = document.getElementById('domainInput').value.trim();

    if (!prefix || !domain) {
        showCustomAlert("Semua kolom harus diisi!");
        return;
    }

    if (!prefix.startsWith('@')) {
        prefix = '@' + prefix;
    }

    domain = domain.replace(/^(https?:\/\/)?(www\.)?/, '');
    const searchUrl = `https://${domain}/search?q=`;

    const customPins = JSON.parse(localStorage.getItem('customSearchPins')) || {};
    customPins[prefix] = searchUrl;
    localStorage.setItem('customSearchPins', JSON.stringify(customPins));

    showCustomAlert(`Berhasil menambah pin ${prefix}!`);
    
    document.getElementById('prefixInput').value = '';
    document.getElementById('domainInput').value = '';
    closeModal();
}

function showCustomAlert(message) {
    let alertBox = document.getElementById('customAlert');
    if (!alertBox) {
        alertBox = document.createElement('div');
        alertBox.id = 'customAlert';
        alertBox.style.cssText = "position:fixed; top:20px; background:#333; color:#fff; padding:10px 20px; border-radius:5px; z-index:1000; font-family:monospace;";
        document.body.appendChild(alertBox);
    }
    alertBox.innerText = message;
    setTimeout(() => { alertBox.remove(); }, 3000);
}

window.addEventListener('DOMContentLoaded', async () => {
    await initSearchSystem();
});
