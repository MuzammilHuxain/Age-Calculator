
let day = document.getElementById("day");
let month = document.getElementById("month");
let year = document.getElementById("year");
let submitButton = document.getElementById("btn");

const today = new Date();

// let day = document.getElementById("day");
// let month = document.getElementById("month");
// let year = document.getElementById("year");




function activeInputBorder(input) {

    resetAge();
    input.style.border = "1px solid hsl(249, 99%, 64%)";

    clearErrorMessage(input);

}


function calculateAge() {
    let dayVal = day.value.trim();
    let monthVal = month.value.trim();
    let yearVal = year.value.trim();


    let count = 0;
    // Validate the input to ensure all fields are not blank
    if (dayVal === "") {
        errorMessage(day, "*This input is required");
        wholeFormError();
        count++;
    }

    if (monthVal === "") {
        errorMessage(month, "*This input is required");
        wholeFormError();
        count++;

    }

    if (yearVal === "") {
        errorMessage(year, "*This input is required");
        wholeFormError();
        count++;

    }


    if (count > 0) {
        return
    }
    // Validate month value (should be between 1 and 12)
    if (monthVal < 1 || monthVal > 12) {
        errorMessage(month, "Must be a valid month");
        wholeFormError();
        return;
    }

    if (yearVal.length != 4) {
        errorMessage(year, "Must be a valid year");
        wholeFormError();
        return;
    }

    if (yearVal > today.getFullYear()) {
        errorMessage(year, "Must be in the past");
        wholeFormError();
        return;
    }


    // Validate day value based on the month
    const daysInMonth = new Date(yearVal, monthVal, 0).getDate();
    if (dayVal < 1 || dayVal > daysInMonth) {
        errorMessage(day, "Must be a valid day");
        wholeFormError();
        return;
    }

    // Clear any previous error messages
    clearErrorMessage(day);
    clearErrorMessage(month);
    clearWholeFormError();

    // Calculate the age

    const birthDate = new Date(yearVal, monthVal - 1, dayVal); // Subtract 1 from monthVal because months are 0-indexed in Date object
    const ageInMilliseconds = today - birthDate;
    const ageDate = new Date(ageInMilliseconds); // This creates a new Date object representing the time difference
    const years = ageDate.getUTCFullYear() - 1970; // Subtract 1970 to get the actual years
    const months = ageDate.getUTCMonth();
    const days = ageDate.getUTCDate() - 1; // Subtract 1 to handle the difference in the day count

    // Display the age separately (you can use these values as per your requirement)
    document.querySelector("#calc-day").textContent = days;
    document.querySelector("#calc-month").textContent = months;
    document.querySelector("#calc-year").textContent = years;


}


function errorMessage(id, message) {
   
    id.style.borderColor = "hsl(0, 100%, 66%)";
    let parent = id.parentElement;
    parent.style.color = "hsl(0, 100%, 66%)";
    parent.querySelector(".error").textContent = message;
    let errorElement = parent.querySelector(".error");
    errorElement.style.visibility = "visible";
}


function wholeFormError() {
    let allInputs = [day, month, year];

    for (let i = 0; i < allInputs.length; i++) {

        allInputs[i].style.borderColor = "hsl(0, 100%, 66%)";
        let parent = allInputs[i].parentElement;
        parent.style.color = "hsl(0, 100%, 66%)";

    }
}


function clearWholeFormError() {
    let allInputs = [day, month, year];

    for (let i = 0; i < allInputs.length; i++) {

        allInputs[i].style.borderColor = "grey";
        let parent = allInputs[i].parentElement;
       
    }
}

function clearErrorMessage(id) {
    let parent = id.parentElement;
    parent.style.color = "black";
    parent.querySelector(".error").textContent = "";
}

function resetAge(){
    document.querySelector("#calc-day").textContent = "--";
    document.querySelector("#calc-month").textContent = "--";
    document.querySelector("#calc-year").textContent = "--";
}


function changeBorder(id) {
    id.style.borderColor = "grey";
}


// Adding Event Listeners when user click on input field


day.addEventListener("input", function () {
    activeInputBorder(day);
});


month.addEventListener("input", function () {
    activeInputBorder(month);
});
year.addEventListener("input", function () {
    activeInputBorder(year);
});



// Adding Event Listeners when input field loses focus


day.addEventListener("change", function () {
    changeBorder(day);
});

month.addEventListener("change", function () {
    changeBorder(month);
});
year.addEventListener("change", function () {
    changeBorder(year);
});



submitButton.addEventListener("click", function () {
    calculateAge()
});





















