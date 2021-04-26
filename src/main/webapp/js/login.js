// This calls our back-end Java program that sets our session info
function login() {

    let url = "api/login_servlet";

    // Grab data from the HTML form
    let loginId = $("#loginId").val();

    // Create a JSON request based on that data
    let dataToServer = {loginId : loginId};

    // Post
    $.post(url, dataToServer, function (dataFromServer) {
        // We are done. Write a message to our console
        console.log("Finished calling servlet.");
        console.log(dataFromServer);
        // Clear the form
        $("#loginId").val("");
        getLogin();
    });
}

// This gets session info from our back-end servlet.
function getLogin() {

    let url = "api/get_login_servlet";

    $.post(url, null, function (dataFromServer) {
        console.log("Finished calling servlet.");
        console.log(dataFromServer);
        // Update the HTML with our result
        if(dataFromServer === "null"){
            $('#getSessionResult').html("You are not currently logged in.");
            $('#logout').hide();
        }
        else{
            $('#getSessionResult').html("You are logged in as " + dataFromServer + ".");
            $('#logout').show();
        }
    });
}

// This method calls the servlet that invalidates our session
function invalidateSessionButton() {

    let url = "api/logout_servlet";

    $.post(url, null, function (dataFromServer) {
        console.log("Finished calling servlet.");
        console.log(dataFromServer);
        getLogin();
    });
}

// Hook the functions above to our buttons
button = $('#getLogin');
button.on("click", getLogin);

button = $('#login');
button.on("click", login);

button = $('#invalidateSession');
button.on("click", invalidateSessionButton);

getLogin();