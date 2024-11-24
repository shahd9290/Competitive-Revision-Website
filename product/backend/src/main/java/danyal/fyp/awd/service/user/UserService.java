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

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final QualificationService qualificationService;

    public User getUserByUsername(final String username) {
        return userRepository.findByUsername(username)
                .orElseThrow(() -> new ResponseStatusException(GONE, "The user account had been deleted or deactivated"));
    }

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
}
