// 🔥 USERNAME
let name = localStorage.getItem("username");
if(name){
    let el = document.getElementById("username");
    if(el){
        el.innerText = "Welcome, " + name + " 💪";
    }
}

// 🔥 AUTO-FILL (SAFE FOR ALL PAGES)
window.onload = function () {

    // height auto fill
    let heightField = document.getElementById("height");
    if(heightField){
        let savedHeight = localStorage.getItem("height");
        if(savedHeight){
            heightField.value = savedHeight;
        }
    }

    // weight display (calorie page)
    let weight = localStorage.getItem("weight");
    let info = document.getElementById("info");

    if(info && weight){
        info.innerText = "Your weight: " + weight + " kg";
    }
};

// 🔥 BMI FUNCTION
function calculateBMI() {

    let weight = document.getElementById("weight").value;
    let heightInput = document.getElementById("height").value;

    if(!weight || !heightInput){
        alert("Enter weight & height ⚠️");
        return;
    }

    let height = heightInput / 100;

    // save data
    localStorage.setItem("weight", weight);
    localStorage.setItem("height", heightInput);

    let bmi = weight / (height * height);

    let resultText = document.getElementById("result");
    let suggestion = document.getElementById("suggestion");
    let diet = document.getElementById("diet");
    let workout = document.getElementById("workout");

    resultText.innerText = "Your BMI: " + bmi.toFixed(2);

    if(bmi < 18.5) {
        resultText.style.color = "orange";
        suggestion.innerText = "You should BULK 💪";
        diet.innerText = "Diet: High calorie + protein 🍗🥚";
        workout.innerText = "Workout: Heavy lifting 💪";
    } 
    else if(bmi < 25) {
        resultText.style.color = "green";
        suggestion.innerText = "You should MAINTAIN ⚖️";
        diet.innerText = "Diet: Balanced ⚖️";
        workout.innerText = "Workout: Balanced training 🏋️";
    } 
    else {
        resultText.style.color = "red";
        suggestion.innerText = "You should CUT 🔥";
        diet.innerText = "Diet: Calorie deficit 🥗";
        workout.innerText = "Workout: Cardio + HIIT 🔥";
    }

    let btn = document.getElementById("calBtn");
    if(btn){
        btn.style.display = "inline-block";
    }
}

// 🔥 CALORIE FUNCTION
function calculateCalories() {

    let weight = localStorage.getItem("weight");
    let height = document.getElementById("height").value;
    let age = document.getElementById("age").value;
    let gender = document.getElementById("gender").value;
    let goal = document.getElementById("goal").value;

    if(!weight || !height || !age){
        alert("Fill all details ⚠️");
        return;
    }

    // save goal
    localStorage.setItem("goal", goal);

    let bmr = (gender === "male")
        ? (10 * weight) + (6.25 * height) - (5 * age) + 5
        : (10 * weight) + (6.25 * height) - (5 * age) - 161;

    let maintenance = bmr * 1.55;

    let finalCalories = 0;
    let message = "";

    if(goal === "bulk") {
        finalCalories = maintenance + 300;
        message = "Calorie Surplus: +300 kcal 💪";
    }
    else if(goal === "maintain") {
        finalCalories = maintenance;
        message = "Maintain Calories ⚖️";
    }
    else {
        finalCalories = maintenance - 300;
        message = "Calorie Deficit: -300 kcal 🔥";
    }

    finalCalories = Math.round(finalCalories);

    document.getElementById("result").innerText =
        "Daily Calories: " + finalCalories + " kcal 🔥";

    document.getElementById("extra").innerText = message;

    // save calories
    localStorage.setItem("calories", finalCalories);

    // show next button
    let nextBtn = document.getElementById("nextBtn");
    if(nextBtn){
        nextBtn.style.display = "inline-block";
    }
}

// 🔥 NAVIGATION
function goToCalories() {
    window.location.href = "calorie.html";
}

function goToMacros() {
    window.location.href = "macros.html";
}