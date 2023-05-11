const channel = new BroadcastChannel("theme-channel");

// Listen for messages on the broadcast channel
channel.addEventListener('message', (event) => {
  if (event.data.type === "theme") {
    const theme = event.data.theme;

    localStorage.setItem("theme", theme);

    document.documentElement.setAttribute("data-theme", theme);
  }
});


// The actual stuff

const countryDropdown = document.getElementById("country-select");
const selectedSelect = document.querySelector(".country-select select");

const checkboxName = document.getElementById("checkbox_01") as HTMLInputElement;
const checkboxAddress = document.getElementById("checkbox_02") as HTMLInputElement;
const checkboxPhone = document.getElementById("checkbox_03") as HTMLInputElement;
const checkboxVIN = document.getElementById("checkbox_04") as HTMLInputElement;
const checkboxBusiness = document.getElementById("checkbox_05") as HTMLInputElement;
const checkboxIP = document.getElementById("checkbox_06") as HTMLInputElement;
const checkboxUsername = document.getElementById("checkbox_07") as HTMLInputElement;
const checkboxDomain = document.getElementById("checkbox_08") as HTMLInputElement;

const list_elements = document.querySelectorAll(".link-list-holder li");


function resetAll() {
  for (let i = 0; i < list_elements.length; i++) {
    const element = list_elements[i] as HTMLElement;
    element.style.display = "flex";
  }
}

function checkChecboxValue(checkboxType: string): boolean {
  if (checkboxType == "name") {
    return checkboxName.checked;
  } else if (checkboxType == "address") {
    return checkboxAddress.checked;
  } else if (checkboxType == "phone") {
    return checkboxPhone.checked;
  } else if (checkboxType == "vin") {
    return checkboxVIN.checked;
  } else if (checkboxType == "business") {
    return checkboxBusiness.checked;
  } else if (checkboxType == "ip") {
    return checkboxIP.checked;
  } else if (checkboxType == "username") {
    return checkboxUsername.checked;
  } else if (checkboxType == "domain") {
    return checkboxDomain.checked;
  } else {
    return false;
  }
}

function checkCountry(): "all" | "ww" | "us" | "ca" | "uk" | undefined {
  if (document) {
    const selectedCountry = document.querySelector(".select-selected");

    if (selectedCountry) {
      const countries: { [key: string]: "all" | "ww" | "us" | "ca" | "uk" } = {};

      countries["Select country:"] = "all";
      countries["WorldWide"] = "ww";
      countries["United States of America"] = "us";
      countries["Canada"] = "ca";
      countries["United Kingdom"] = "uk";

      return countries[selectedCountry.innerHTML]; // Error here
    }
  }
}

function listHandler() {
  type checkboxResultType = string | boolean;

  let listOfClasses: checkboxResultType[] = ["country", "name", "address", "phone", "vin", "business", "ip", "username", "domain"];

  resetAll();

  const selectedCountry = checkCountry();

  // Replace the first element with the country code
  if (selectedCountry != undefined) {
    listOfClasses[0] = selectedCountry;
  }

  if (checkChecboxValue("name") == false) {
    listOfClasses[1] = false;
  }
  if (checkChecboxValue("address") == false) {
    listOfClasses[2] = false;
  }
  if (checkChecboxValue("phone") == false) {
    listOfClasses[3] = false;
  }
  if (checkChecboxValue("vin") == false) {
    listOfClasses[4] = false;
  }
  if (checkChecboxValue("business") == false) {
    listOfClasses[5] = false;
  }
  if (checkChecboxValue("ip") == false) {
    listOfClasses[6] = false;
  }
  if (checkChecboxValue("username") == false) {
    listOfClasses[7] = false;
  }
  if (checkChecboxValue("domain") == false) {
    listOfClasses[8] = false;
  }

  if (listOfClasses[1] == false && listOfClasses[2] == false && listOfClasses[3] == false && listOfClasses[4] == false && listOfClasses[5] == false && listOfClasses[6] == false && listOfClasses[7] == false && listOfClasses[8] == false) {
    for (let i = 0; i < list_elements.length; i++) {
      const element = list_elements[i] as HTMLElement;
  
      if (listOfClasses[0] == "all") {
        element.style.display = "flex";
      } else if (!element.classList.contains(listOfClasses[0].toString())) {
        element.style.display = "none";
      }
    }
  } else {
    for (let i = 0; i < list_elements.length; i++) {
      const element = list_elements[i] as HTMLElement;
      
      if (!element.classList.contains(listOfClasses[0].toString()) && listOfClasses[0] != "all") {
        element.style.display = "none";
      } else {
        let hasBeenChanged = false;

        for (let i = 1; i < listOfClasses.length; i++) {
          if (element.classList.contains(listOfClasses[i].toString())) {
            element.style.display = "flex";
            hasBeenChanged = true;
          }

          if (i == 8 && hasBeenChanged == false) {
            element.style.display = "none";
          }
        }
      }
    }
  }
}

function preListHandler() {
  const selectedCountry = document.querySelector(".select-selected");

  if (selectedCountry && selectedCountry.innerHTML != "") {
    listHandler();
  }
}

document.querySelector(".select-selected")!.addEventListener("DOMSubtreeModified", preListHandler);

checkboxName.addEventListener('change', preListHandler);

checkboxAddress.addEventListener('change', preListHandler);

checkboxPhone.addEventListener('change', preListHandler);

checkboxVIN.addEventListener('change', preListHandler);

checkboxBusiness.addEventListener('change', preListHandler);

checkboxIP.addEventListener('change', preListHandler);

checkboxUsername.addEventListener('change', preListHandler);

checkboxDomain.addEventListener('change', preListHandler);

export {};