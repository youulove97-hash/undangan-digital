/* =========================================
   SCRIPT.JS UNTUK LOGIKA UNDANGAN
   ========================================= */

document.getElementById('open-invitation').addEventListener('click', function() {
    // 1. Memutar Musik saat Tombol di Klik
    var music = document.getElementById('background-music');
    music.play().catch(function(error) {
        console.log("Browser block playback: ", error);
    });

    // 2. Mengubah Halaman Visibility
    document.getElementById('cover-page').classList.add('hidden-page');
    
    var mainInv = document.getElementById('main-invitation');
    mainInv.classList.remove('hidden-page');
    mainInv.classList.add('visible-invitation');
    
    // 3. Trigger Animasi Continuous (Kupu dan Vinyl)
    setTimeout(function() {
        var butterfly = document.querySelector('#main-invitation .butterfly-img');
        if (butterfly) butterfly.classList.add('kupu-flap');
        
        var vinyl = document.querySelector('#main-invitation .vinyl-img');
        if (vinyl) vinyl.classList.add('vinyl-spin');
    }, 2000); 

    // =========================================
    // 4. SENSOR SCROLL (Intersection Observer)
    // =========================================
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('tampil-scroll'); 
                entry.target.classList.remove('hidden-on-scroll');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 }); 

    setTimeout(function() {
        const scrollSections = document.querySelectorAll('.hidden-on-scroll');
        scrollSections.forEach(section => {
            observer.observe(section);
        });
    }, 1000); 
});

// =========================================
// LOGIKA HITUNG MUNDUR (COUNTDOWN REAL-TIME)
// =========================================
function startCountdown() {
    // Target Tanggal: 06 September 2026 jam 08:30 WIB
    const targetDate = new Date("September 6, 2026 08:30:00").getTime();

    setInterval(function() {
        const now = new Date().getTime();
        const difference = targetDate - now;

        if (difference > 0) {
            const days = Math.floor(difference / (1000 * 60 * 60 * 24));
            const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((difference % (1000 * 60)) / 1000);

            // Format menjadi dua digit (misal: 09:05:01:00)
            const d = days < 10 ? "0" + days : days;
            const h = hours < 10 ? "0" + hours : hours;
            const m = minutes < 10 ? "0" + minutes : minutes;
            const s = seconds < 10 ? "0" + seconds : seconds;

            const timerElement = document.getElementById("timer-display");
            if (timerElement) {
                timerElement.innerHTML = `${d}:${h}:${m}:${s}`;
            }
        } else {
            // Jika waktu sudah lewat / hari H
            const timerElement = document.getElementById("timer-display");
            if (timerElement) {
                timerElement.innerHTML = "00:00:00:00";
            }
        }
    }, 1000);
}

// Jalankan countdown
startCountdown();