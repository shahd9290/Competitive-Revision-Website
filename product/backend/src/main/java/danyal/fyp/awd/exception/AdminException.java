package danyal.fyp.awd.exception;

/**
 * Custom exception class for handling admin-related errors.
 * This exception is used when an admin operation fails due to business rules,
 * missing data, or internal service logic errors.
 *
 * @author Danyal Shah
 */
public class AdminException extends Exception {

    /**
     * Constructs a new {@code AdminException} with the specified detail message.
     *
     * @param message the detail message explaining the reason for the exception
     */
    public AdminException(String message) {
        super(message);
    }
}
