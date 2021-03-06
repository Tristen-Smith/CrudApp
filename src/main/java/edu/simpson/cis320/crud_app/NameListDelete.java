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

@WebServlet(name = "NameListDeleteServlet", value = "/api/name_list_delete")
public class NameListDelete extends HttpServlet {

    private final static Logger log = Logger.getLogger(NameListDelete.class.getName());

    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

        log.log(Level.INFO, "Hello World");

        // You can output in any format, text/JSON, text/HTML, etc. We'll keep it simple
        response.setContentType("application/json");
        PrintWriter out = response.getWriter();

        // Open the request for reading. Read in each line, put it into a string.
        // Yes, I think there should be an easier way.
        java.io.BufferedReader in = request.getReader();
        String requestString = new String();
        for (String line; (line = in.readLine()) != null; requestString += line) ;

        // Log the string we got as a request, just as a check
        log.log(Level.INFO, requestString);

        // Great! Now we want to parse the object, and pop it into our business object. Field
        // names have to match. That's the magic.
        Jsonb jsonb = JsonbBuilder.create();
        Person person = jsonb.fromJson(requestString, Person.class);

        // Log info as a check
        log.log(Level.INFO, "Object test: " + person.getFirst() + ", " + person.getLast() + ", " + person.getEmail() + ", " + person.getPhone() + ", " + person.getBirthday());

        // Send something back to the client. Really, we should send a JSON, but
        // we'll keep things simple.
        out.println("Object test: " + person.getFirst() + ", " + person.getLast() + ", " + person.getEmail() + ", " + person.getPhone() + ", " + person.getBirthday());

        PersonDAO.deletePerson(person);

    }
}