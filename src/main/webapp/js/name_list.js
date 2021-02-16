// Main Javascript File

function updateTable() {
    // Here's where your code is going to go.
    console.log("updateTable called");
}

let url = "api/name_list_get";

$.getJSON(url, null, function(json_result) {
        // json_result is an object. You can set a breakpoint, or print
        // it to see the fields. Specifically, it is an array of objects.
        // Here we loop the array and print the first name.
        for (let i = 0; i < json_result.length; i++) {
            // Print the first name
            console.log(json_result[i].first, json_result[i].last);
        }
        console.log("Done");
    }
);

// Call your code.
updateTable();