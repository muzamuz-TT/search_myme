// Berjalan jika pencarian tidak mengandung prefix pin (murni 404)
window.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const query = urlParams.get('q');

    const subtitleEl = document.getElementById('errorDescription');
    if (query) {
        subtitleEl.innerHTML = `Halaman tidak ditemukan untuk pencarian: <span style="color:#fff;">"${query}"</span>`;
    }
});