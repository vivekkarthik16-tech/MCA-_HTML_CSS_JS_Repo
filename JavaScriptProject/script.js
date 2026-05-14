// Saving the registration details from the sing up page
let signupForm = document.getElementById("singupForm");

if (signupForm) {

    signupForm.addEventListener("submit", function (event) {
        event.preventDefault();
        //reading the data from the input boxes
        let name = document.getElementById("name").value;
        let email = document.getElementById("email").value;
        let password = document.getElementById("password").value;

        //form validation
        let pattern = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[@#$%&!])(?=.*\d).{8,}$/

        if (name == "" || email == "" || password == "") {
            alert("all fields requiered ");
            return false;
        }
        if (!pattern.test(password)) {
            alert("PAssword must contain atleast 1 CAP letter, 1 SMALL letter,1 special character , 1 digit and minimum 8 length");
            return false;
        }

        //javascript object creation
        let user = { name: name, email: email, password: password };

        localStorage.setItem("user", JSON.stringify(user));

        alert("Singedup Successfuly ");
        window.location.href = "login.html";
    });
}

let loginForm = document.getElementById("loginForm")

if (loginForm) {
    loginForm.addEventListener("submit", function (event) {
        event.preventDefault();//this will prevent the page form reloading
        let email = document.getElementById("email").value;
        let password = document.getElementById("password").value;

        //reading the  data from the local storage
        let user = JSON.parse(localStorage.getItem("user"));

        //comparing the data from local storage
        if (email == user.email && password == user.password) {
            alert("Login Successfull");
            localStorage.setItem("isLoggedIn", "true");
            //redirect the apge to home 
            window.location.href = "index.html";
        } else {
            alert("Details correct agii kodduuu guru")
        }

    });
}

//javascript for changing the heading after login
let heading = document.getElementById("welcomeMessage");

if (heading) {
    //firstt get theuser details
    let user = JSON.parse(localStorage.getItem("user"));
    let isLoggedIn = JSON.parse(localStorage.getItem("isLoggedIn"));

    //if the user exists then change the welcome message
    if (user && isLoggedIn) {
        heading.innerHTML = "Welcome " + user.name + "!...";
    }
}

//protecting the TASk.html from opening without log in 
let currentPage = window.location.pathname;

if (currentPage.includes("task.html")) {
    let loginStatus = JSON.parse(localStorage.getItem("isLoggedIn"));

    if (!loginStatus) {
        alert("please log in first");
        window.location.href = "login.html";
    }
}

//Logout btn logic

let LogoutButton = document.getElementById("logoutBtn");

if (LogoutButton) {
    LogoutButton.addEventListener("click", function () {
        localStorage.removeItem("isLoggedIn");
        alert("Logged out successful!..");
        window.location.href = "index.html"
    });

}

//Dynamic NavBar Logic

let signupLink = document.getElementById("signuplink");
let loginLink = document.getElementById("loginlink");
let logoutBtn = document.getElementById("logoutBtn");

// checking if the login is true or false!

let loginStatus = localStorage.getItem("isLoggedIn");

if(loginStatus == "true"){
    if(signupLink){
        signupLink.style.display = "none";
    }
    if(loginLink){
        loginLink.style.display = "none";
    }
}else{
    if(logoutBtn){
        logoutBtn.style.display = "none";
    }
}

// Dynamycally adding Tasks in the task.html 
let addButton = document.getElementById("addTaskBtn");

if(addButton) {
    showTasks();
    addButton.addEventListener("click", function(){
        let task = document.getElementById("taskInput").value;
        if (task == ""){
            alert("Enter the task first!..");
            return;
        };
        // 
        let taskArray = JSON.parse(localStorage.getItem("task")) || [];
        taskArray.push(task)
        localStorage.setItem("task",JSON.stringify(taskArray));
        taskInput.value="";
        showTasks();
    });
}

function showTasks(){
    let taskList = document.getElementById("taskList");
    if(!taskList){
        return ;
    }

    taskList.innerHTML = "";
    let taskArray = JSON.parse(localStorage.getItem("task")) || [];

    for(let i=0; i<taskArray.length; i++){
        taskList.innerHTML += `
        <tr>
            <td>${taskArray[i]}</td>
            <td>
                <button onClick="deleteTask(${i})">Delete</Button>
            </td>
        </tr>
        `;
    }
}
function deleteTask(index){

    let taskArray = JSON.parse(localStorage.getItem("task")) || [];

    taskArray.splice(index, 1);

    localStorage.setItem("task", JSON.stringify(taskArray));

    showTasks();
}