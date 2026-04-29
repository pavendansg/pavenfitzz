// ============================================
// 🔥 EVOLVEFIT — script.js
// ============================================

// USERNAME DISPLAY
const name = localStorage.getItem("username");
const el = document.getElementById("username");
if (name && el) el.innerText = "Welcome, " + name + " 💪";

// AUTO-FILL ON LOAD
window.onload = function () {
  const heightField = document.getElementById("height");
  if (heightField && localStorage.getItem("height")) {
    heightField.value = localStorage.getItem("height");
  }

  const weight = localStorage.getItem("weight");
  const info = document.getElementById("info");
  if (info && weight) {
    info.innerText = "Current Weight: " + weight + " kg 💪";
  }
};

// ============================================
// 🔥 CALORIE CALCULATOR
// ============================================
function calculateCalories() {
  const weight = Number(localStorage.getItem("weight"));
  const height = Number(document.getElementById("height").value);
  const age    = Number(document.getElementById("age").value);
  const gender = document.getElementById("gender").value;
  const goal   = document.getElementById("goal").value;

  if (!weight || !height || !age) {
    showToast("Fill all details ⚠️");
    return;
  }

  localStorage.setItem("goal", goal);
  localStorage.setItem("height", height);

  const bmr = gender === "male"
    ? (10 * weight) + (6.25 * height) - (5 * age) + 5
    : (10 * weight) + (6.25 * height) - (5 * age) - 161;

  const maintenance = bmr * 1.55;

  let finalCalories, message, badge;

  if (goal === "bulk") {
    finalCalories = Math.round(maintenance + 300);
    message = "Calorie Surplus for muscle gain";
    badge = "+300 kcal 💪";
  } else if (goal === "maintain") {
    finalCalories = Math.round(maintenance);
    message = "Perfect balance to maintain your physique";
    badge = "Maintenance ⚖️";
  } else {
    finalCalories = Math.round(maintenance - 300);
    message = "Calorie Deficit for fat loss";
    badge = "-300 kcal 🔥";
  }

  localStorage.setItem("calories", finalCalories);

  document.getElementById("result").innerHTML =
    `<span class="gold" style="font-size:28px;font-weight:900;">${finalCalories} kcal</span>`;

  document.getElementById("extra").innerHTML =
    `<span class="pill">${badge}</span><br>
     <span style="opacity:.7;font-size:13px;">${message}</span>`;

  const nextBtn = document.getElementById("nextBtn");
  if (nextBtn) nextBtn.style.display = "block";
}

// ============================================
// 🔥 NAVIGATION
// ============================================
function goToCalories() { location.href = "calorie.html"; }
function goToMacros()   { location.href = "macros.html"; }
function goBack()       { history.back(); }

// ============================================
// 🔥 TOAST NOTIFICATION
// ============================================
function showToast(msg) {
  let toast = document.getElementById("toast");
  if (!toast) {
    toast = document.createElement("div");
    toast.id = "toast";
    document.body.appendChild(toast);
  }
  toast.innerText = msg;
  toast.className = "toast show";
  setTimeout(() => toast.className = "toast", 2500);
}
