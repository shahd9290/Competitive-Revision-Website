package danyal.fyp.awd.exception;

/**
 * Custom exception class for handling question-related errors.
 * This exception is thrown during operations such as adding,
 * editing, or deleting a question when an error occurs.
 *
 * @author Danyal Shah
 */
public class QuestionException extends Exception {

    /**
     * Constructs a new {@code QuestionException} with the specified detail message.
     *
     * @param message the detail message explaining the reason for the exception
     */
    public QuestionException(String message) {
        super(message);
    }
}
