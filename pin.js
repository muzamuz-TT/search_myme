// Fungsi utama untuk memuat data search engine dan memproses pencarian
async function initSearchSystem() {
    let defaultPins = {};
    
    try {
        // Ambil data default dari file JSON
        const response = await fetch('search-engines.json');
        if (response.ok) {
            defaultPins = await response.json();
        }
    } catch (error) {
        console.warn("Gagal memuat search-engines.json, menggunakan konfigurasi dasar:", error);
    }

    // Gabungkan dengan pin kustom dari localStorage
    const customPins = JSON.parse(localStorage.getItem('customSearchPins')) || {};
    const allPins = { ...defaultPins, ...customPins };

    // Cek parameter URL 'q'
    const urlParams = new URLSearchParams(window.location.search);
    const query = urlParams.get('q');

    if (!query) return false; // Bukan pencarian, biarkan halaman 404 tampil

    const cleanQuery = query.trim();

    // Periksa apakah query cocok dengan salah satu prefix PIN
    for (const [prefix, baseUrl] of Object.entries(allPins)) {
        if (cleanQuery.startsWith(prefix)) {
            const actualSearchText = cleanQuery.slice(prefix.length).trim();
            if (actualSearchText.length > 0) {
                // Redirect otomatis ke search engine tujuan
                window.location.href = baseUrl + encodeURIComponent(actualSearchText);
                return true;
            }
        }
    }

    return false; // Tidak ada pin yang cocok, tampilkan 404
}

// Fungsi Modal Popup (Buka / Tutup)
function openModal() {
    document.getElementById('pinModal').style.display = 'block';
}

function closeModal() {
    document.getElementById('pinModal').style.display = 'none';
}

// Fungsi Menyimpan Pin Baru ke LocalStorage
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

    // Format domain menjadi URL pencarian
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

// Notifikasi kustom tanpa menggunakan alert() bawaan browser
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

// Jalankan sistem saat halaman dimuat
window.addEventListener('DOMContentLoaded', async () => {
    const isRedirected = await initSearchSystem();
    // Jika tidak diredirect, file 404.js akan menangani sisanya
});// Fungsi utama untuk memuat data search engine dan memproses pencarian
async function initSearchSystem() {
    let defaultPins = {};
    
    try {
        // Ambil data default dari file JSON
        const response = await fetch('search-engines.json');
        if (response.ok) {
            defaultPins = await response.json();
        }
    } catch (error) {
        console.warn("Gagal memuat search-engines.json, menggunakan konfigurasi dasar:", error);
    }

    // Gabungkan dengan pin kustom dari localStorage
    const customPins = JSON.parse(localStorage.getItem('customSearchPins')) || {};
    const allPins = { ...defaultPins, ...customPins };

    // Cek parameter URL 'q'
    const urlParams = new URLSearchParams(window.location.search);
    const query = urlParams.get('q');

    if (!query) return false; // Bukan pencarian, biarkan halaman 404 tampil

    const cleanQuery = query.trim();

    // Periksa apakah query cocok dengan salah satu prefix PIN
    for (const [prefix, baseUrl] of Object.entries(allPins)) {
        if (cleanQuery.startsWith(prefix)) {
            const actualSearchText = cleanQuery.slice(prefix.length).trim();
            if (actualSearchText.length > 0) {
                // Redirect otomatis ke search engine tujuan
                window.location.href = baseUrl + encodeURIComponent(actualSearchText);
                return true;
            }
        }
    }

    return false; // Tidak ada pin yang cocok, tampilkan 404
}

// Fungsi Modal Popup (Buka / Tutup)
function openModal() {
    document.getElementById('pinModal').style.display = 'block';
}

function closeModal() {
    document.getElementById('pinModal').style.display = 'none';
}

// Fungsi Menyimpan Pin Baru ke LocalStorage
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

    // Format domain menjadi URL pencarian
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

// Notifikasi kustom tanpa menggunakan alert() bawaan browser
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

// Jalankan sistem saat halaman dimuat
window.addEventListener('DOMContentLoaded', async () => {
    const isRedirected = await initSearchSystem();
    // Jika tidak diredirect, file 404.js akan menangani sisanya
});