(function () {
    var TIME = 20;
    // a = indeks jawaban benar (pada array o)
    var Q = [
        { c: "Nama", q: "Siapa nama lengkap Syekh Nawawi Al-Bantani?", o: ["Abu Abdul Mu'thi Muhammad Nawawi bin Umar bin Arabi", "Muhammad Yusuf bin Abdullah Abu al-Mahasin", "Ahmad Khatib bin Abdul Latif bin Abdullah", "Abdus Samad Al-Jawi Al-Palimbani"], a: 0 },
        { c: "Nama", q: "Ulama manakah yang bernama lengkap Muhammad Yusuf bin Abdullah Abu al-Mahasin al-Taj al-Khalwati al-Makassari?", o: ["Syekh Nawawi Al-Bantani", "Syekh Yusuf Al-Makassari", "Syekh Abdus Samad Al-Palimbani", "Syekh Ahmad Khatib Al-Minangkabawi"], a: 1 },
        { c: "Nama", q: "Ulama asal Palembang ini dikenal dengan nama...", o: ["Ahmad Khatib Al-Minangkabawi", "Nawawi At-Tanari Al-Bantani", "Abdus Samad Al-Jawi Al-Palimbani", "Yusuf Al-Khalwati Al-Makassari"], a: 2 },
        { c: "Nama", q: "Siapa nama ayah Syekh Ahmad Khatib Al-Minangkabawi?", o: ["Syekh Abdul Jalil", "KH. Umar bin Arabi", "Gallarang Moncongloe", "Syekh Abdul Latif"], a: 3 },
        { c: "Biografi", q: "Di mana Syekh Nawawi Al-Bantani dilahirkan?", o: ["Tanara, Serang, Banten", "Gowa, Sulawesi Selatan", "Palembang, Sumatera Selatan", "Koto Gadang, Agam"], a: 0 },
        { c: "Biografi", q: "Setelah Banten mengalami kekalahan dari VOC, Syekh Yusuf ditangkap dan diasingkan lebih dulu ke...", o: ["Cape Town", "Ceylon (Sri Lanka)", "Makkah", "Yaman"], a: 1 },
        { c: "Biografi", q: "Kapan Syekh Ahmad Khatib Al-Minangkabawi lahir?", o: ["13 Maret 1916", "1897 M", "26 Juni 1860", "1628 M"], a: 2 },
        { c: "Biografi", q: "Siapa yang pada tahun 1994 menetapkan Syekh Yusuf sebagai salah satu pahlawan perjuangan melawan penindasan?", o: ["Sultan Ageng Tirtayasa", "Presiden Soekarno", "Raja Gowa", "Presiden Nelson Mandela"], a: 3 },
        { c: "Karya", q: "Kitab Tafsir Marah Labid (Tafsir al-Munir) adalah karya...", o: ["Syekh Nawawi Al-Bantani", "Syekh Yusuf Al-Makassari", "Syekh Abdus Samad Al-Palimbani", "Syekh Ahmad Khatib Al-Minangkabawi"], a: 0 },
        { c: "Karya", q: "Zubdat al-Asrar dan Taj al-Asrar adalah karya yang membahas tasawuf dari...", o: ["Syekh Nawawi Al-Bantani", "Syekh Yusuf Al-Makassari", "Syekh Abdus Samad Al-Palimbani", "Syekh Ahmad Khatib Al-Minangkabawi"], a: 1 },
        { c: "Karya", q: "Kitab Al-Da'i al-Masmu' karya Syekh Ahmad Khatib membahas persoalan...", o: ["Tafsir Al-Qur'an", "Perjalanan spiritual", "Hukum waris", "Sejarah Kesultanan Banten"], a: 2 },
        { c: "Karya", q: "Hidayatus Salikin, Siyarus Salikin, dan Nasihat al-Muslimin adalah karya...", o: ["Syekh Nawawi Al-Bantani", "Syekh Yusuf Al-Makassari", "Syekh Ahmad Khatib Al-Minangkabawi", "Syekh Abdus Samad Al-Palimbani"], a: 3 },
        { c: "Peta Perjalanan", q: "Pada peta perjalanan, rute pelayaran Syekh Yusuf berakhir di kota...", o: ["Cape Town, Afrika Selatan", "Makkah", "Banten", "Colombo, Sri Lanka"], a: 0 },
        { c: "Peta Perjalanan", q: "Sebelum melanjutkan ke Makkah dan Madinah, Syekh Abdus Samad memperdalam ilmu di wilayah...", o: ["Cikoang dan Bontoala", "Kedah dan Patani", "Yaman dan Ceylon", "Bukittinggi dan Agam"], a: 1 },
        { c: "Peta Perjalanan", q: "Sekitar usia 11 tahun, Syekh Ahmad Khatib berlayar ke Makkah bersama...", o: ["Gurunya, Sayyid Bakri Syatha", "Ayahnya", "Sultan Ageng Tirtayasa", "Kiai Sahal"], a: 1 }
    ];
    var $ = function (id) { return document.getElementById(id); };
    var order, i, ok, skip, left, tick, locked;

    function show(id) {
        ["quiz-intro", "quiz-play", "quiz-result"].forEach(function (s) { $(s).hidden = s !== id; });
        window.scrollTo(0, 0);
    }
    function shuffle(a) {
        for (var k = a.length - 1; k > 0; k--) { var j = Math.floor(Math.random() * (k + 1)), t = a[k]; a[k] = a[j]; a[j] = t; }
        return a;
    }
    function range(n) { var r = []; for (var k = 0; k < n; k++) r.push(k); return r; }

    function start() {
        order = shuffle(range(Q.length)); i = 0; ok = 0; skip = 0;
        show("quiz-play"); ask();
    }
    function ask() {
        var q = Q[order[i]];
        locked = false; left = TIME;
        $("q-count").textContent = "Soal " + (i + 1) + " / " + Q.length;
        $("q-cat").textContent = q.c;
        $("q-text").textContent = q.q;
        $("q-feedback").textContent = ""; $("q-feedback").className = "quiz-feedback";
        $("btn-next").hidden = true;
        var box = $("q-options"); box.innerHTML = "";
        shuffle(range(q.o.length)).forEach(function (idx) {
            var b = document.createElement("button");
            b.type = "button"; b.className = "q-opt"; b.textContent = q.o[idx];
            b.dataset.right = idx === q.a ? "1" : "";
            b.addEventListener("click", function () { pick(b); });
            box.appendChild(b);
        });
        paint();
        clearInterval(tick);
        tick = setInterval(function () {
            left -= 0.1; paint();
            if (left <= 0) timeout();
        }, 100);
    }
    function paint() {
        var s = Math.max(0, Math.ceil(left - 0.001));
        $("q-time").textContent = s;
        $("q-time").classList.toggle("low", s <= 5);
        $("q-bar").style.width = Math.max(0, left / TIME * 100) + "%";
        $("q-bar").classList.toggle("low", s <= 5);
    }
    function lock() {
        locked = true; clearInterval(tick);
        document.querySelectorAll(".q-opt").forEach(function (b) {
            b.disabled = true;
            if (b.dataset.right) b.classList.add("right");
        });
    }
    function pick(b) {
        if (locked) return;
        lock();
        var fb = $("q-feedback");
        if (b.dataset.right) { ok++; fb.textContent = "Benar!"; fb.classList.add("ok"); }
        else { b.classList.add("wrong"); fb.textContent = "Kurang tepat. Jawaban yang benar ditandai hijau."; fb.classList.add("no"); }
        $("btn-next").textContent = i === Q.length - 1 ? "Lihat Hasil \u2192" : "Lanjut \u2192";
        $("btn-next").hidden = false;
    }
    function timeout() {
        if (locked) return;
        lock(); skip++; left = 0; paint();
        var fb = $("q-feedback");
        fb.textContent = "Waktu habis! Soal dilewati."; fb.classList.add("no");
        setTimeout(next, 1800);
    }
    function next() {
        i++;
        if (i >= Q.length) finish(); else ask();
    }
    function finish() {
        clearInterval(tick);
        var n = Q.length, bad = n - ok, score = Math.round(ok / n * 100), t, m;
        if (score >= 80) { t = "Selamat! Luar Biasa!"; m = "Pemahamanmu tentang para syekh sangat baik. Terus jaga semangat belajarmu."; }
        else if (score >= 60) { t = "Selamat! Kerja Bagus!"; m = "Kamu sudah mengenal para syekh dengan cukup baik. Sedikit lagi menuju nilai sempurna."; }
        else { t = "Selamat Telah Menyelesaikan Kuis!"; m = "Jangan menyerah. Pelajari lagi biografi, karya, dan peta perjalanan para syekh, lalu coba kembali."; }
        $("r-title").textContent = t; $("r-msg").textContent = m;
        $("r-score").textContent = score; $("r-ok").textContent = ok; $("r-bad").textContent = bad;
        $("r-skip").textContent = skip ? "Termasuk " + skip + " soal yang terlewat karena waktu habis." : "Semua soal terjawab tepat waktu.";
        show("quiz-result");
        confetti(score >= 60 ? 60 : 24);
    }
    function confetti(n) {
        var c = $("confetti"), cols = ["#D5B477", "#174B3A", "#5aa9ff", "#e59a5b", "#b58bff"];
        c.innerHTML = "";
        for (var k = 0; k < n; k++) {
            var e = document.createElement("i");
            e.style.left = Math.random() * 100 + "%";
            e.style.background = cols[k % cols.length];
            e.style.animationDuration = 2.2 + Math.random() * 2.2 + "s";
            e.style.animationDelay = Math.random() * 1.2 + "s";
            c.appendChild(e);
        }
    }
    $("btn-start").addEventListener("click", start);
    $("btn-next").addEventListener("click", next);
    $("btn-again").addEventListener("click", function () { show("quiz-intro"); });
})();
