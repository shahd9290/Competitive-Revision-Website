package danyal.fyp.awd.service.user;

import danyal.fyp.awd.dto.admin.user.UserDataDto;
import danyal.fyp.awd.exception.QualificationException;
import danyal.fyp.awd.model.subject.Qualification;
import danyal.fyp.awd.model.user.User;
import danyal.fyp.awd.repository.user.UserAttemptsRepository;
import danyal.fyp.awd.repository.user.UserRepository;
import danyal.fyp.awd.service.subject.QualificationService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.UUID;

import static org.springframework.http.HttpStatus.GONE;

/**
 * Service class for managing user-related operations.
 * Provides methods for retrieving user details, updating user marks, and managing user qualifications.
 *
 * @author Danyal Shah
 */
@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final QualificationService qualificationService;
    private final JwtService jwtService;

    /**
     * Retrieves a user by their username.
     * Throws an exception if the user account is deleted or deactivated.
     *
     * @param username the username of the user to retrieve.
     * @return the {@link User} entity.
     * @throws ResponseStatusException if the user account had been deleted or deactivated.
     */
    public User getUserByUsername(final String username) {
        return userRepository.findByUsername(username)
                .orElseThrow(() -> new ResponseStatusException(GONE, "The user account had been deleted or deactivated"));
    }

    /**
     * Retrieves the qualification associated with a user by their username.
     * If the qualification is not found, returns null.
     *
     * @param name the username of the user.
     * @return the {@link Qualification} entity, or {@code null} if no qualification is found.
     */
    public Qualification getUserQualification(String name) {
        try {
            int qualID = userRepository.findQualificationIdByUsername(name);
            return qualificationService.getQualification(qualID);
        } catch (QualificationException ignored) {
            // This should not occur, as the user is required to select a valid qualification upon account creation.
            // This may only be an issue if a qualification were deleted, however this won't be the case if users exist under that qualification.
            return null;
        }
    }

    /**
     * Updates the marks of a user based on the provided token and mark value.
     * The token is used to identify the user, and the marks are added to the existing marks.
     *
     * @param token the authentication token of the user.
     * @param marks the number of marks to add to the user's total.
     * @return the updated total marks of the user.
     */
    public int updateMarks(String token, int marks) {
        String name = jwtService.getUserNameFromJwtToken(token);
        User user = getUserByUsername(name);
        user.setMarks(user.getMarks() + marks);
        userRepository.save(user);
        return user.getMarks();
    }

    /**
     * Retrieves data for all users, formatted for admin purposes.
     *
     * @return a list of {@link UserDataDto} containing user details for all users.
     */
    public List<UserDataDto> getAllUsers() {
        return userRepository.getUserData();
    }

    /**
     * Retrieves a user by their unique identifier (UUID).
     *
     * @param userId the unique identifier (UUID) of the user.
     * @return the {@link User} entity associated with the given UUID.
     */
    public User getUserById(UUID userId) {
        return userRepository.findById(userId).get();
    }

    /**
     * Counts the total number of users in the system.
     *
     * @return the total number of users.
     */
    public int countUsers() {
        return (int) userRepository.count();
    }
}
