// Konfigurasi API OpenWeatherMap (Ganti dengan API Key Anda)
const API_KEY = 'f68e274fcf3ee1c28feca55ba8d2de8f';
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

// Seleksi Elemen DOM menggunakan ES6 const
const form = document.querySelector('#searchForm');
const input = document.querySelector('#cityInput');
const loading = document.querySelector('#loading');
const errorDiv = document.querySelector('#error');
const result = document.querySelector('#weatherResult');
const historySection = document.querySelector('#historySection');
const historyList = document.querySelector('#historyList');
const clearHistoryBtn = document.querySelector('#clearHistory');

// State untuk riwayat pencarian
let searchHistory = JSON.parse(localStorage.getItem('weatherHistory')) || [];

// Fungsi Utama untuk Fetch Data dengan async/await
const getWeather = async (city) => {
    try {
        showLoading();
        clearError();

        const url = `${BASE_URL}?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric&lang=id`;
        const res = await fetch(url);

        // Error handling: Kota tidak ditemukan (404)
        if (res.status === 404) {
            throw new Error(`Kota "${city}" tidak ditemukan.`);
        }

        // Error handling: Server error umum
        if (!res.ok) {
            throw new Error('Terjadi kesalahan pada server. Coba lagi nanti.');
        }

        const data = await res.json();
        displayWeather(data);
        saveToHistory(data.name);

    } catch (err) {
        // Error handling: Network error atau error lemparan manual
        if (err.name === 'TypeError') {
            showError('Network error. Periksa koneksi internet Anda.');
        } else {
            showError(err.message);
        }
        hideResult();
    } finally {
        hideLoading();
    }
};

// Menampilkan Data Cuaca ke UI menggunakan Template Literals
const displayWeather = (data) => {
    document.querySelector('#cityName').textContent = data.name;
    document.querySelector('#temperature').textContent = `${Math.round(data.main.temp)}°C`;
    document.querySelector('#description').textContent = data.weather[0].description;
    document.querySelector('#humidity').textContent = `Kelembaban: ${data.main.humidity}%`;
    document.querySelector('#weatherIcon').src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    
    result.classList.remove('hidden');
};

// Menyimpan ke riwayat dan memastikan tidak ada duplikat
const saveToHistory = (cityName) => {
    if (!searchHistory.includes(cityName)) {
        searchHistory.unshift(cityName); // Tambah di awal array
        if (searchHistory.length > 5) searchHistory.pop(); // Batasi maksimal 5 riwayat
        localStorage.setItem('weatherHistory', JSON.stringify(searchHistory));
    }
    renderHistory();
};

// Render Riwayat menggunakan Array Method (map)
const renderHistory = () => {
    if (searchHistory.length === 0) {
        historySection.classList.add('hidden');
        return;
    }

    historySection.classList.remove('hidden');
    
    // Menggunakan Array Method .map() untuk membuat elemen list riwayat[cite: 1]
    historyList.innerHTML = searchHistory
        .map(city => `<li>${city}</li>`)
        .join('');

    // Tambahkan event listener ke setiap item riwayat
    document.querySelectorAll('#historyList li').forEach(li => {
        li.addEventListener('click', (e) => {
            const cityName = e.target.textContent;
            input.value = cityName;
            getWeather(cityName);
        });
    });
};

// Utility UI States
const showLoading = () => {
    loading.classList.remove('hidden');
    errorDiv.classList.add('hidden');
};

const hideLoading = () => {
    loading.classList.add('hidden');
};

const showError = (message) => {
    errorDiv.textContent = message;
    errorDiv.classList.remove('hidden');
};

const clearError = () => {
    errorDiv.textContent = '';
    errorDiv.classList.add('hidden');
};

const hideResult = () => {
    result.classList.add('hidden');
};

// Event Listener untuk Form Submit menggunakan Arrow Function[cite: 1]
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const city = input.value.trim();
    if (city !== '') {
        getWeather(city);
    }
});

// Event Listener untuk Tombol Hapus Riwayat menggunakan Array Method / Filter / Reset
clearHistoryBtn.addEventListener('click', () => {
    searchHistory = [];
    localStorage.removeItem('weatherHistory');
    renderHistory();
});

// Load riwayat saat halaman pertama kali dibuka
renderHistory();