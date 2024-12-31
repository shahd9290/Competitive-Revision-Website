package danyal.fyp.awd.service.user;

import danyal.fyp.awd.exception.QualificationException;
import danyal.fyp.awd.model.subject.Qualification;
import danyal.fyp.awd.model.user.User;
import danyal.fyp.awd.repository.user.UserRepository;
import danyal.fyp.awd.service.subject.QualificationService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import static org.springframework.http.HttpStatus.GONE;

/**
 * Service class for managing user-related operations.
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
     *
     * @param username the username of the user to retrieve.
     * @return the {@link User} entity.
     * @throws ResponseStatusException if the user account is deleted or deactivated.
     */
    public User getUserByUsername(final String username) {
        return userRepository.findByUsername(username)
                .orElseThrow(() -> new ResponseStatusException(GONE, "The user account had been deleted or deactivated"));
    }

    /**
     * Retrieves the qualification associated with a user by their username.
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

    public void updateMarks(String token, int marks) {
        String name = jwtService.extractUsernameFromToken(token);
        User user = getUserByUsername(name);
        user.setMarks(user.getMarks() + marks);
        userRepository.save(user);
    }
}
