(function () {
    var svg = document.getElementById("peta-svg"), box = document.getElementById("peta-info");
    if (!svg || !box) return;
    function show(el) {
        svg.querySelectorAll(".pin.on").forEach(function (p) { p.classList.remove("on"); });
        if (el.classList.contains("pin")) el.classList.add("on");
        var d = el.dataset;
        box.style.setProperty("--c", d.c);
        box.innerHTML = '<span class="who"></span><h3></h3><small></small><p></p>';
        box.querySelector(".who").textContent = d.n;
        box.querySelector("h3").textContent = (d.num ? d.num + ". " : "") + d.t;
        box.querySelector("small").textContent = d.p;
        box.querySelector("p").textContent = d.d;
    }
    svg.addEventListener("click", function (e) { var t = e.target.closest(".pin,.ship"); if (t) show(t); });
    svg.addEventListener("keydown", function (e) {
        if (e.key === "Enter" || e.key === " ") { var t = e.target.closest(".pin,.ship"); if (t) { e.preventDefault(); show(t); } }
    });
    var btns = document.querySelectorAll("[data-filter]");
    btns.forEach(function (b) {
        b.addEventListener("click", function () {
            btns.forEach(function (x) { x.classList.toggle("on", x === b); });
            var f = b.dataset.filter;
            svg.querySelectorAll("[data-s]").forEach(function (el) { el.classList.toggle("dim", f !== "all" && el.dataset.s !== f); });
        });
    });
    var tilt = document.getElementById("peta-tilt"), stage = document.querySelector(".map-stage");
    if (tilt && stage) tilt.addEventListener("input", function () { stage.style.setProperty("--tilt", tilt.value + "deg"); });
})();
