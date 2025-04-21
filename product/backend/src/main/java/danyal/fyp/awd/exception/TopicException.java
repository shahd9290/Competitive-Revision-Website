package danyal.fyp.awd.exception;

/**
 * A custom runtime exception representing topic-related errors.
 * This exception is typically thrown when a topic operation fails,
 * such as creation, editing, or deletion under invalid conditions.
 *
 * @author Danyal Shah
 */
public class TopicException extends RuntimeException {

    /**
     * Constructs a new {@code TopicException} with the specified error message.
     *
     * @param message the detailed error message for this exception.
     */
    public TopicException(String message) {
        super(message);
    }
}
