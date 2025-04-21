package danyal.fyp.awd;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * Entry point for the Advanced Web Development Backend application.
 *
 * This class contains the main method that launches the Spring Boot application.
 * It serves as the starting point for the backend service.
 *
 *
 * @author Danyal Shah
 */
@SpringBootApplication
public class AdvancedWebDevBackendApplication {

    /**
     * Main method to launch the application.
     *
     * This method serves as the entry point for the Spring Boot application. It initializes the Spring context
     * and starts the web server, making the application ready to serve requests.
     *
     *
     * @param args command-line arguments passed to the application. These arguments can be used to configure the application at runtime.
     */
    public static void main(String[] args) {
        SpringApplication.run(AdvancedWebDevBackendApplication.class, args);
    }
}
