const emailInput = document.querySelector("#email");
const radioButtons = document.querySelectorAll("input[name='gender']");
const robotCheck = document.querySelector("#robotCheck");
const robotLabel = document.querySelector("#robotLabel");
const sendBtn = document.querySelector("#sendBtn");

function checkEmail() {
    return emailInput.value.trim() !== "";
}

function getGender() {
    let gender = "";

    radioButtons.forEach(radio => {
        if (radio.checked) {
            gender = radio.value;
        }
    });

    return gender;
}

function updateCheckboxStyle() {

    if (robotCheck.checked) {

        const gender = getGender();

        switch (gender) {
            case "Mężczyzna":
                robotLabel.style.backgroundColor = "steelblue";
                break;

            case "Kobieta":
                robotLabel.style.backgroundColor = "hotpink";
                break;

            default:
                robotLabel.style.backgroundColor = "indigo";
        }

        if (checkEmail()) {
            sendBtn.disabled = false;
        }

    } else {

        robotLabel.style.backgroundColor = "black";
        robotLabel.style.color = "indianred";

        sendBtn.disabled = true;
    }
}

function sendNewsletter(event) {

    event.preventDefault();

    const email = emailInput.value;
    const gender = getGender();

    Email.send({
        SecureToken: "TUTAJ_WKLEJ_TOKEN_Z_ELASTICEMAIL",
        To: email,
        From: "twojemail@twojadomena.pl",
        Subject: "Newsletter UFO Anomalies",
        Body:
            "Dziękujemy za zapisanie się do newslettera!<br><br>" +
            "Wybrana płeć: " + gender
    })
    .then(() => {
        alert("Newsletter został wysłany!");
    });
}


robotCheck.addEventListener("change", updateCheckboxStyle);

radioButtons.forEach(radio => {
    radio.addEventListener("change", updateCheckboxStyle);
});

document.querySelector("form")
    .addEventListener("submit", sendNewsletter);
