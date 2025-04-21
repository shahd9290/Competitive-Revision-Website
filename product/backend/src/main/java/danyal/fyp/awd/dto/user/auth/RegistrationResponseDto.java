package danyal.fyp.awd.dto.user.auth;

import danyal.fyp.awd.model.user.Role;

/**
 * A DTO representing a user registration response.
 * Used to return basic user information after successful registration.
 *
 * @param username the username of the registered user
 * @param email the email address of the registered user
 * @param qualification the qualification ID associated with the registered user
 * @author Danyal Shah
 */
public record RegistrationResponseDto(String username, String email, Role qualification) {
}
