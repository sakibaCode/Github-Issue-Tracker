
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

const loadIssues = () =>{

    fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
    .then(response => response.json())
    .then(issues => {
        console.log(issues.data);
        showIssues(issues.data);
    })
}
loadIssues();

const getContainerTopColor =(priority) =>{
    if(priority === "high") return "border-red-600";
    if(priority === "medium") return "border-yellow-500";
    return "border-green-500";
}

const getLabelIcon = (label) => {
    if (label === "bug") return "fa-solid fa-bug";
    if (label === "help wanted") return "fa-regular fa-life-ring";
    if (label === "enhancement") return "fa-solid fa-wand-magic-sparkles";
    if (label === "good first issue") return "fa-solid fa-star";
    return "fa-solid fa-tag";
};

const getpriorityIcon =(priority) =>{

    if(priority === "high") return "fa-solid fa-triangle-exclamation w-10 h-10 flex items-center justify-center text-red-500 mt-3";
    if(priority === "medium") return "fa-solid fa-triangle-exclamation w-10 h-10 flex items-center justify-center text-yellow-500 mt-3";
    return "fa-solid fa-check w-10 h-10 flex items-center justify-center text-green-500 mt-3";

}

const getPriorityColor = (priority) => {
    if (priority === "high") return "bg-red-100 text-red-500";
    if (priority === "medium") return "bg-yellow-100 text-yellow-600";
    return "bg-[#EEEFF2] text-gray-400 font-bold";
};

const openModal = (issue) => {

}
const showIssues = (issues) => {
    const issuesContainer = document.getElementById("issues-container");
    issuesContainer.innerHTML = "";

    issues.forEach(issue => {

        const issueDiv = document.createElement("div");

        issueDiv.innerHTML = `
        <div class="w-full bg-white rounded-xl shadow-md overflow-hidden border-t-4 ${getContainerTopColor(issue.priority)}">

            <div class="p-5 space-y-4">

                <!-- Top Row -->
                <div class="flex justify-between items-center">
                    
                    <i class="${getpriorityIcon(issue.priority)}"></i>
                    <span class="px-4 py-1 text-sm font-semibold rounded-full ${getPriorityColor(issue.priority)}">
                        ${issue.priority.toUpperCase()}
                    </span>

                </div>

                <h2 class="text-xl font-bold text-gray-800 leading-snug">
                    ${issue.title}
                </h2>

                <p class="text-gray-500 text-sm">
                    ${issue.description}
                </p>

                <!-- Labels -->
                <div class="flex gap-3 flex-wrap">
                    ${issue.labels.map(label => `
                        <span class="flex items-center gap-2 px-3 py-1 text-sm rounded-full border">
                            <i class="${getLabelIcon(label)}"></i>
                            ${label.toUpperCase()}
                        </span>
                    `).join("")}
                </div>

            </div>

            <div class="bg-gray-100 px-5 py-4 text-sm text-gray-500">
                <p>#${issue.id} by ${issue.author || "unknown"}</p>
                <p>${new Date(issue.createdAt).toLocaleDateString()}</p>
            </div>

        </div>
        `;

        issuesContainer.appendChild(issueDiv);

        issueDiv.addEventListener("click",() =>{
            openModal(issue)
        })
    });
};