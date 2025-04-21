package danyal.fyp.awd.exception;

/**
 * A custom exception representing qualification-related errors.
 * This exception is thrown during operations such as adding,
 * editing, or deleting a qualification when an error occurs.
 *
 * @author Danyal Shah
 */
public class QualificationException extends Exception {

    /**
     * Constructs a new {@code QualificationException} with the specified error message.
     *
     * @param message the detailed error message for this exception.
     */
    public QualificationException(String message) {
        super(message);
    }
}
