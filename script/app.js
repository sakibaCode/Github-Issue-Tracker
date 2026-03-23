
const loginPage = document.getElementById("login-page");
const login = document.getElementById("login-button");

const usernameInput = document.getElementById("username");
const passwordInput = document.getElementById("password");

function loginUser() {

    login.addEventListener("click", ()=>{

        if(usernameInput.value !== "admin" || passwordInput.value !== "admin123"){
            alert("Invalid username or password. Please try again.");
            return;
        }

        loginPage.classList.add("hidden");
        mainPage.classList.remove("hidden");
    })
}
loginUser();

const logout = document.getElementById("logout-button");
const mainPage = document.getElementById("main-page");

function logoutUser() {
    logout.addEventListener("click", (event) => {
        event.preventDefault();

        loginPage.classList.remove("hidden");
        mainPage.classList.add("hidden");
        logout.classList.add("hidden");
    });
}

logoutUser();
