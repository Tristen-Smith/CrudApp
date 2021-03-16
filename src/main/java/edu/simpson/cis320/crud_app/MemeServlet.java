package edu.simpson.cis320.crud_app;

import javax.imageio.ImageIO;
import javax.json.bind.Jsonb;
import javax.json.bind.JsonbBuilder;
import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.awt.*;
import java.awt.image.BufferedImage;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.io.PrintWriter;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;


@WebServlet(name = "memeServlet", value = "/meme")
public class MemeServlet extends HttpServlet {
    private final static Logger log = Logger.getLogger(MemeServlet.class.getName());

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

        log.log(Level.INFO, "Meme servlet");

        ServletContext context = getServletContext();
        InputStream imageStream = context.getResourceAsStream("WEB-INF/classes/meme_image.jpg");
        BufferedImage image = ImageIO.read(imageStream);

        // Get Graphics
        Graphics g = image.getGraphics();

        // Set font
        String fontName = "Impact";
        int fontSize = 100;
        int fontStyle = Font.BOLD;
        Font font = new Font(fontName, fontStyle, fontSize);
        g.setFont(font);

        Color myColor = new Color(255,255,255);
        g.setColor(myColor);

        String message = request.getParameter("message");
        if (message == null){
            message = "Was this mine?";
        }

        g.drawString(message, 100,100);

        g.dispose();

        //Write out the Image
        response.setContentType("image/jpg");
        OutputStream out = response.getOutputStream();
        ImageIO.write(image, "JPG", out);
    }
}
