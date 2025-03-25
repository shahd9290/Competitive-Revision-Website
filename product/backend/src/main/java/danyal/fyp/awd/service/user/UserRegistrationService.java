package danyal.fyp.awd.service.user;

import danyal.fyp.awd.dto.user.auth.RegistrationRequestDto;
import danyal.fyp.awd.exception.QualificationException;
import danyal.fyp.awd.model.user.User;
import danyal.fyp.awd.repository.user.UserRepository;
import danyal.fyp.awd.service.subject.QualificationService;
import jakarta.transaction.Transactional;
import jakarta.validation.ValidationException;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

/**
 * Service class for handling user registration.
 *
 * @author Danyal Shah
 */
@Service
@RequiredArgsConstructor
public class UserRegistrationService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final QualificationService qualificationService;
    private final RoleService roleService;

    /**
     * Registers a new user in the system.
     *
     * @param request the {@link RegistrationRequestDto} containing user registration details.
     * @return the registered {@link User}.
     * @throws QualificationException if the specified qualification does not exist.
     * @throws ValidationException if the username or email already exists.
     */
    @Transactional
    public User registerUser(RegistrationRequestDto request) throws QualificationException {
        if (userRepository.existsByUsername(request.username()) || userRepository.existsByEmail(request.email())) {
            throw new ValidationException("Username or Email already exists");
        }

        User user = new User();
        user.setUsername(request.username());
        user.setEmail(request.email());
        user.setPassword(passwordEncoder.encode(request.password()));
        user.setMarks(0);
        if (request.role().equals("ROLE_USER"))
            user.setQualificationId(qualificationService.getIdByName(request.qualification()));
        user.setRole(roleService.getRole(request.role()));
        return userRepository.save(user);
    }
}
