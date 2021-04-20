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
                    + '<td>'
                    + '<button type=\'button\' name=\'edit\' class=\'editButton btn btn-primary\' value=\''+ json_result[i].id +'\'>'
                    + 'Edit'
                    + '</button>'
                    + '<button type=\'button\' name=\'delete\' class=\'deleteButton btn btn-danger\' value=\''+json_result[i].id+'\'>'
                    + 'Delete'
                    + '</button>'
                    + '</td>'
                    +'</td></tr>');
            }
            $(".editButton").on("click", editItem);
            $(".deleteButton").on("click", deleteItem);

            console.log("Done");
        }
    );

}



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

function saveChanges() {
    let isValid = true;
    console.log("Save Changes");
    let id = $('#id').val();
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
    let reg2 = /^[0-9]{3}-[0-9]{3}-[0-9]{4}$/;
    let reg3 = /^[0-9]{4}-[0-9]{2}-[0-9]{2}$/;

    // Test the regular expression to see if there is a match
    if (reg.test(firstName)) {
        $('#firstName').removeClass("is-invalid");
        $('#firstName').addClass("is-valid");
    } else {
        $('#firstName').removeClass("is-valid");
        $('#firstName').addClass("is-invalid");
        isValid = false;
    }
    if (reg.test(lastName)) {
        $('#lastName').removeClass("is-invalid");
        $('#lastName').addClass("is-valid");
    } else {
        $('#lastName').removeClass("is-valid");
        $('#lastName').addClass("is-invalid");
        isValid = false;
    }
    if (reg1.test(email)) {
        $('#email').removeClass("is-invalid");
        $('#email').addClass("is-valid");
    } else {
        $('#email').removeClass("is-valid");
        $('#email').addClass("is-invalid");
        isValid = false;
    }
    if (reg2.test(phone)) {
        $('#phone').removeClass("is-invalid");
        $('#phone').addClass("is-valid");
    } else {
        $('#phone').removeClass("is-valid");
        $('#phone').addClass("is-invalid");
        isValid = false;
    }
    if (reg3.test(birthday)) {
        $('#birthday').removeClass("is-invalid");
        $('#birthday').addClass("is-valid");
    } else {
        $('#birthday').removeClass("is-valid");
        $('#birthday').addClass("is-invalid");
        isValid = false;
    }
    if (isValid) {
        console.log("Valid form");
        // Code to submit your form will go here.
        let my_data;
        if(id === ""){
            my_data = {
                first: firstName,
                last: lastName,
                email: email,
                phone: phone.replace(/\D/g, ''),
                birthday: birthday
            };
            console.log("test");
        }
        else{
            my_data = {
                id: id,
                first: firstName,
                last: lastName,
                email: email,
                phone: phone.replace(/\D/g, ''),
                birthday: birthday
            };
            console.log("else");
        }

        let url = "api/name_list_edit";

        $.ajax({
            type: 'POST',
            url: url,
            data: JSON.stringify(my_data),
            success: function (dataFromServer) {
                console.log(dataFromServer);
                updateTable();
                $('#myModal').modal('hide');
            },
            contentType: "application/json",
            dataType: 'text' // Could be JSON or whatever too
        });
        console.log(my_data);
        }
        console.log(isValid);
    }


let saveChangesButton = $('#saveChanges');
saveChangesButton.on("click", saveChanges);

function deleteItem(e) {
    console.log("Delete");
    console.log(e.target.value);

    let url = "api/name_list_delete";
    let dataToServer = { id: e.target.value };

    $.ajax({
        type: 'POST',
        url: url,
        data: JSON.stringify(dataToServer),
        success: function(dataFromServer) {
            updateTable();
            console.log(dataFromServer);
        },
        contentType: "application/json",
        dataType: 'text'
    });
}

function editItem(e) {
    console.debug("Edit");
    console.debug("Edit: " + e.target.value);

    // Grab the id from the event
    let id = e.target.value;

// This next line is fun.
// "e" is the event of the mouse click
// "e.target" is what the user clicked on. The button in this case.
// "e.target.parentNode" is the node that holds the button. In this case, the table cell.
// "e.target.parentNode.parentNode" is the parent of the table cell. In this case, the table row.
// "e.target.parentNode.parentNode.querySelectorAll("td")" gets an array of all matching table cells in the row
// "e.target.parentNode.parentNode.querySelectorAll("td")[0]" is the first cell. (You can grab cells 0, 1, 2, etc.)
// "e.target.parentNode.parentNode.querySelectorAll("td")[0].innerHTML" is content of that cell. Like "Sam" for example.
// How did I find this long chain? Just by setting a breakpoint and using the interactive shell in my browser.
    let first = e.target.parentNode.parentNode.querySelectorAll("td")[0].innerHTML;
    let last = e.target.parentNode.parentNode.querySelectorAll("td")[1].innerHTML;
    let email = e.target.parentNode.parentNode.querySelectorAll("td")[2].innerHTML;
    let phone = e.target.parentNode.parentNode.querySelectorAll("td")[3].innerHTML;
    let birthday = e.target.parentNode.parentNode.querySelectorAll("td")[4].innerHTML;
// repeat line above for all the fields we need

    $('#id').val(id); // Yes, now we set and use the hidden ID field
    $('#firstName').val(first);
    $('#lastName').val(last);
    $('#email').val(email);

// Etc

// Show the window
    $('#myModal').modal('show');

// Regular expression to match phone number pattern:
// (515) 555-1212
    let regexp = /\((\d{3})\) (\d{3})-(\d{4})/;
    let match = phone.match(regexp);
// Log what we matched
    console.log("Matches:");
    console.log(match);
// We how have a list, 1-3, where each one is part of the phone number.
// Reformat into 515-555-1212
    let phoneString = match[1] + '-' + match[2] + '-' + match[3];
        $('#phone').val(phoneString);

// Parse date to current time in milliseconds
    let timestamp = Date.parse(birthday);
// Made date object out of that time
    let dateObject = new Date(timestamp);
// Convert to a full ISO formatted string
    let fullDateString = dateObject.toISOString();
// Trim off the time part
    let shortDateString = fullDateString.split('T')[0];
    $('#birthday').val(shortDateString);
}
