const loginPage = document.getElementById("login-page")
const login = document.getElementById("login-button")

const usernameInput = document.getElementById("username")
const passwordInput = document.getElementById("password")

function loginUser() {
    login.addEventListener("click", () => {
        if (usernameInput.value !== "admin" || passwordInput.value !== "admin123") {
            alert("Invalid username or password. Please try again.")
            return
        }

        loginPage.classList.add("hidden")
        mainPage.classList.remove("hidden")
    })
}
loginUser()

const logout = document.getElementById("logout-button")
const mainPage = document.getElementById("main-page")

function logoutUser() {
    logout.addEventListener("click", (event) => {
        event.preventDefault()

        loginPage.classList.remove("hidden")
        mainPage.classList.add("hidden")
        logout.classList.add("hidden")
    })
}
logoutUser()

const allBtn = document.getElementById("all-btn")
const openBtn = document.getElementById("open-btn")
const closedBtn = document.getElementById("closed-btn")

function filterIssues(tab) {
    currentTab = tab 

    allBtn.classList.remove("btn-primary")
    openBtn.classList.remove("btn-primary")
    closedBtn.classList.remove("btn-primary")

    allBtn.classList.add("btn-soft")
    openBtn.classList.add("btn-soft")
    closedBtn.classList.add("btn-soft")

    if (tab === "all") allBtn.classList.add("btn-primary")
    if (tab === "open") openBtn.classList.add("btn-primary")
    if (tab === "closed") closedBtn.classList.add("btn-primary")

    renderFilteredIssues()
}

let allIssues = []
let currentTab = "all"

function renderFilteredIssues() {
    let filtered = allIssues

    if (currentTab === "open") {
        filtered = allIssues.filter(issue => issue.status === "open")
    } else if (currentTab === "closed") {
        filtered = allIssues.filter(issue => issue.status === "closed")
    }

    showIssues(filtered)
}

allBtn.addEventListener("click", () =>  filterIssues("all"))
openBtn.addEventListener("click", () => filterIssues("open"))
closedBtn.addEventListener("click", () => filterIssues("closed"))


const loadIssues = () => {
    fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
        .then(response => response.json())
        .then(data => {
            allIssues = data.data 
            renderFilteredIssues() 
        })
}
loadIssues()

const getContainerTopColor = (status) => {
    if (status === "open") return "border-green-600"
    if (status === "closed") return "border-purple-500"
}

const getLabelIcon = (label) => {
    if (label === "bug") return "fa-solid fa-bug"
    if (label === "help wanted") return "fa-regular fa-life-ring"
    if (label === "enhancement") return "fa-solid fa-wand-magic-sparkles"
    if (label === "good first issue") return "fa-solid fa-star"
    return "fa-solid fa-tag"
}

const getPriorityIcon = (priority) => {
    if (priority === "high") return "fa-solid fa-triangle-exclamation w-10 h-10 flex items-center justify-center text-red-500 mt-3"
    if (priority === "medium") return "fa-solid fa-triangle-exclamation w-10 h-10 flex items-center justify-center text-yellow-500 mt-3"
    return "fa-solid fa-check w-10 h-10 flex items-center justify-center text-green-500 mt-3"
}

const getPriorityColor = (priority) => {
    if (priority === "high") return "bg-red-100 text-red-500"
    if (priority === "medium") return "bg-yellow-100 text-yellow-600"
    return "bg-[#EEEFF2] text-gray-400 font-bold"
}

const openModal = (issue) => {
    const modal = document.getElementById("my_modal_1")

    document.getElementById("modal-title").innerText = issue.title
    document.getElementById("modal-author").innerText = `Opened by ${issue.author || "unknown"}`
    document.getElementById("modal-date").innerText = new Date(issue.createdAt).toLocaleDateString()
    document.getElementById("modal-description").innerText = issue.description || "No description found"
    document.getElementById("modal-assignee").innerText = issue.assignee || "unassigned"

    const modalPriority = document.getElementById("modal-priority")
    modalPriority.innerText = issue.priority.toUpperCase()
    modalPriority.className = `px-4 py-1 text-sm font-semibold rounded-full ${getPriorityColor(issue.priority)}`

    modal.showModal()
}

const showIssues = (issues) => {
    const issuesContainer = document.getElementById("issues-container")
    issuesContainer.innerHTML = ""

    issues.forEach(issue => {
        const issueDiv = document.createElement("div")

        issueDiv.innerHTML = `
        <div class="w-full bg-white rounded-xl shadow-md overflow-hidden border-t-4 ${getContainerTopColor(issue.status)}">
            <div class="p-5 space-y-4">
                <div class="flex justify-between items-center">
                    <i class="${getPriorityIcon(issue.priority)}"></i>
                    <button>
                        <span class="px-4 py-1 text-sm font-semibold rounded-full ${getPriorityColor(issue.priority)}">
                            ${issue.priority.toUpperCase()}
                        </span>
                    </button>
                </div>
                <h2 class="text-xl font-bold text-gray-800 leading-snug">${issue.title}</h2>
                <p class="text-gray-500 text-sm">${issue.description}</p>
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
        `

        issuesContainer.appendChild(issueDiv)

        issueDiv.addEventListener("click", () => {
            openModal(issue)
        })
    })
}

const searchInput = document.getElementById("search-input")
searchInput.addEventListener("input", () => {

    const searchValue = searchInput.value.trim().toLowerCase()
    fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
        .then(response => response.json())
        .then(data => {
            const allIssues = data.data
            const filteredIssues = allIssues.filter(issue => 
                issue.title.toLowerCase().includes(searchValue) || issue.description.toLowerCase().includes(searchValue)
            )
            showIssues(filteredIssues)
        })
})