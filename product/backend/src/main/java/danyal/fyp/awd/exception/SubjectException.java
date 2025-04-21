package danyal.fyp.awd.exception;

/**
 * A custom exception representing subject-related errors.
 * This exception is used for operations that fail when managing subjects,
 * such as creation, update, or deletion due to validation or integrity issues.
 *
 * @author Danyal Shah
 */
public class SubjectException extends Exception {

    /**
     * Constructs a new {@code SubjectException} with the specified error message.
     *
     * @param message the detailed error message for this exception.
     */
    public SubjectException(String message) {
        super(message);
    }
}
