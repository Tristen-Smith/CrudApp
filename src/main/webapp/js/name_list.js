// Main Javascript File

function htmlSafe(data) {
    return data.replace(/&/g, "&amp;").replace(/>/g, "&gt;").replace(/</g, "&lt;");
}

function formatPhoneNumber(phoneNumberString) {
    // Strip all non-digits
    // Use a regular expression. Match all non-digits \D
    // and replace with an empty string.
    let cleaned = phoneNumberString.replace(/\D/g, '');

    // Are we left with 10 digits? This will return them in
    // three groups. This: (\d{3}) grabs the first three digits \d
    // The 'match' variable is an array. First is the entire match
    // the next locations are each group, which are surrounded by
    // () in the parenthesis.
    let match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
    if (match) {
        return '(' + match[1] + ') ' + match[2] + '-' + match[3];
    }
    return phoneNumberString;
}

function getJSDateFromSQLDate(sqlDate) {
    // Strip non-digits
    let cleaned = sqlDate.replace(/\D/g, '');
    // Match and group
    let match = cleaned.match(/^(\d{4})(\d{2})(\d{2})$/);
    // Create a new Date object
    let resultDate = new Date(match[1], match[2], match[3]);
    return resultDate;
}



function updateTable() {
    // Here's where your code is going to go.
    console.log("updateTable called");

    let url = "api/name_list_get";

    $.getJSON(url, null, function(json_result) {
            // json_result is an object. You can set a breakpoint, or print
            // it to see the fields. Specifically, it is an array of objects.
            // Here we loop the array and print the first name.
            $('#datatable tbody tr').remove();
            for (let i = 0; i < json_result.length; i++) {
                // Print the first name
                console.log(json_result[i].first, json_result[i].last);

                bday = getJSDateFromSQLDate(json_result[i].birthday);
                bdayString = bday.toLocaleDateString();
                console.log(bday);

                $('#datatable tbody').append('<tr><td>'
                    +htmlSafe(json_result[i].first)
                    +'</td><td>'
                    +htmlSafe(json_result[i].last)
                    +'</td><td>'
                    +htmlSafe(json_result[i].email)
                    +'</td><td>'
                    +formatPhoneNumber(htmlSafe(json_result[i].phone))
                    +'</td><td>'
                    +htmlSafe(bdayString)
                    +'</td></tr>');

                console.log(json_result[i].email);

            }
            console.log("Done");
        }
    );

}-



// Call your code.
updateTable();

function showDialogAdd(){
    console.log("ADD ITEM");

    // Show the hidden dialog
    $('#myModal').modal('show');

    $('#id').val("");
    $('#firstName').val("");
    $('#lastName').val("");
    $('#email').val("");
    $('#phone').val("");
    $('#birthday').val("");

    $('#firstName').removeClass("is-invalid");
    $('#firstName').removeClass("is-valid");

    $('#lastName').removeClass("is-invalid");
    $('#lastName').removeClass("is-valid");

    $('#email').removeClass("is-invalid");
    $('#email').removeClass("is-valid");

    $('#phone').removeClass("is-invalid");
    $('#phone').removeClass("is-valid");

    $('#birthday').removeClass("is-invalid");
    $('#birthday').removeClass("is-valid");

    $('#id').removeClass("is-invalid");
    $('#id').removeClass("is-valid");
}

// There's a button in the form with the ID "addItem"
// Associate the function showDialogAdd with it.
let addItemButton = $('#addItem');
addItemButton.on("click", showDialogAdd);

function saveChanges(){
    console.log("Save Changes");
    let firstName = $('#firstName').val();
    let lastName = $('#lastName').val();
    let email = $('#email').val();
    let phone = $('#phone').val();
    let birthday = $('#birthday').val();
    console.log("First name: " + firstName);
    console.log("Last name: " + lastName);
    console.log(" Email: " + email);
    console.log("Phone Number: " + phone);
    console.log("Birthday: " + birthday);

    let reg = /^[A-Za-z]{1,10}$/;
    let reg1 = /^[A-Za-z]{1,15}[@][A-Za-z]{1,15}[.][A-Za-z]{1,15}$/;
    let reg2 = /^[1-9]{3}[0-9]{3}[0-9]{4}$/;
    let reg3 = /^[0-9]{4}[-][0-9]{2}[-][0-9]{2}$/;
    let reg4 = /^[0-9]{1,10}$/;

    // Test the regular expression to see if there is a match
    if (reg4.test(id)) {
        $('#id').removeClass("is-invalid");
        $('#id').addClass("is-valid");
    } else {
        $('#id').removeClass("is-valid");
        $('#id').addClass("is-invalid");
    }
    if (reg.test(firstName)) {
        $('#firstName').removeClass("is-invalid");
        $('#firstName').addClass("is-valid");
    } else {
        $('#firstName').removeClass("is-valid");
        $('#firstName').addClass("is-invalid");
    }
    if (reg.test(lastName)) {
        $('#lastName').removeClass("is-invalid");
        $('#lastName').addClass("is-valid");
    } else {
        $('#lastName').removeClass("is-valid");
        $('#lastName').addClass("is-invalid");
    }
    if (reg1.test(email)) {
        $('#email').removeClass("is-invalid");
        $('#email').addClass("is-valid");
    } else {
        $('#email').removeClass("is-valid");
        $('#email').addClass("is-invalid");
    }
    if (reg2.test(phone)) {
        $('#phone').removeClass("is-invalid");
        $('#phone').addClass("is-valid");
    } else {
        $('#phone').removeClass("is-valid");
        $('#phone').addClass("is-invalid");
    }
    if (reg3.test(birthday)) {
        $('#birthday').removeClass("is-invalid");
        $('#birthday').addClass("is-valid");
    } else {
        $('#birthday').removeClass("is-valid");
        $('#birthday').addClass("is-invalid");
    }
}

let saveChangesButton = $('#saveChanges');
saveChangesButton.on("click", saveChanges);