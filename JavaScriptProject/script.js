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
        window.location.href="login.html";
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

if(heading){
    //firstt get theuser details
    let user = JSON.parse(localStorage.getItem("user"));
    
    //if the user exists then change the welcome message
    if(user){
        heading.innerHTML = "Welcome " + user.name + "!...";
    }
}
