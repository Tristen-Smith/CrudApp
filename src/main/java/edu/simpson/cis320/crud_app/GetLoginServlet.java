package edu.simpson.cis320.crud_app;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.Enumeration;

@WebServlet(name = "GetLoginServlet", value ="/api/get_login_servlet")
public class GetLoginServlet extends HttpServlet {
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setContentType("text/plain");
        PrintWriter out = response.getWriter();

        // --- Sessions ---

        // - This example uses a session to keep count of client requests.
        HttpSession session = request.getSession();

        // At this point, you could grab something out of the session like:
        // String loginId = (String)session.getAttribute("loginId");

        // -- Example  1 --
        // Use a session attribute called "Count" which we'll increase
        // by one each time the user requests it.
        String loginId = (String)session.getAttribute("loginId");
        out.print(loginId);

    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

    }
}
