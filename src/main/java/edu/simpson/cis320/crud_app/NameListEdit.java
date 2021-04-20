package edu.simpson.cis320.crud_app;

        import javax.json.bind.Jsonb;
        import javax.json.bind.JsonbBuilder;
        import javax.servlet.*;
        import javax.servlet.http.*;
        import javax.servlet.annotation.*;
        import java.io.IOException;
        import java.io.PrintWriter;
        import java.util.logging.Level;
        import java.util.logging.Logger;
        import java.util.regex.Matcher;
        import java.util.regex.Pattern;

@WebServlet(name = "NameListEditServlet", value = "/api/name_list_edit")
public class NameListEdit extends HttpServlet {

    private Pattern namePattern;
    private Pattern emailPattern;
    private Pattern phonePattern;
    private Pattern birthdayPattern;

    public NameListEdit(){
        namePattern = Pattern.compile("^[A-Za-z]{1,10}$");
        emailPattern = Pattern.compile("^[A-Za-z]{1,15}[@][A-Za-z]{1,15}[.][A-Za-z]{1,15}$");
        phonePattern = Pattern.compile("^[0-9]{3}[0-9]{3}[0-9]{4}$");
        birthdayPattern = Pattern.compile("^[0-9]{4}-[0-9]{2}-[0-9]{2}$");
    }

    private final static Logger log = Logger.getLogger(NameListEdit.class.getName());

    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

        log.log(Level.INFO, "Hello World");

        // You can output in any format, text/JSON, text/HTML, etc. We'll keep it simple
        response.setContentType("application/json");
        PrintWriter out = response.getWriter();

        // Open the request for reading. Read in each line, put it into a string.
        // Yes, I think there should be an easier way.
        java.io.BufferedReader in = request.getReader();
        String requestString = new String();
        for (String line; (line = in.readLine()) != null; requestString += line);

        // Log the string we got as a request, just as a check
        log.log(Level.INFO, requestString);

        // Great! Now we want to parse the object, and pop it into our business object. Field
        // names have to match. That's the magic.
        Jsonb jsonb = JsonbBuilder.create();
        Person person = jsonb.fromJson(requestString, Person.class);

        // Log info as a check
        log.log(Level.INFO, "Object test: "+ person.getFirst() + ", "  + person.getLast() + ", " + person.getEmail() + ", " + person.getPhone() + ", " + person.getBirthday());

        // Send something back to the client. Really, we should send a JSON, but
        // we'll keep things simple.
        out.println("Object test: "+ person.getFirst() + ", "  + person.getLast() + ", " + person.getEmail() + ", " + person.getPhone() + ", " + person.getBirthday());

        Matcher firstNameM = namePattern.matcher(person.getFirst());
        if (!firstNameM.find( )) {
            out.println("{\"error\" : \"Error validating first name.\"}");
            return;
        }

        Matcher lastNameM = namePattern.matcher(person.getLast());
        if (!lastNameM.find( )) {
            out.println("{\"error\" : \"Error validating last name.\"}");
            return;
        }

        Matcher emailM = emailPattern.matcher(person.getEmail());
        if (!emailM.find( )) {
            out.println("{\"error\" : \"Error validating email.\"}");
            return;
        }

        Matcher phoneM = phonePattern.matcher(person.getPhone());
        if (!phoneM.find( )) {
            out.println("{\"error\" : \"Error validating phone number.\"}");
            return;
        }

        Matcher birthdayM = birthdayPattern.matcher(person.getBirthday());
        if (!birthdayM.find( )) {
            out.println("{\"error\" : \"Error validating birthday.\"}");
            return;
        }
        out.println("{\"success\": \"Successful insert.\"}");

        if(person.getId() == 0){
            PersonDAO.addPerson(person);
        }
        else{
            PersonDAO.updatePerson(person);
        }
    }

}