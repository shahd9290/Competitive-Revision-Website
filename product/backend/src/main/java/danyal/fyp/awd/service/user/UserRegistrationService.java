package danyal.fyp.awd.service.user;

import danyal.fyp.awd.dto.admin.user.UserEditDto;
import danyal.fyp.awd.dto.user.auth.RegistrationRequestDto;
import danyal.fyp.awd.exception.QualificationException;
import danyal.fyp.awd.model.user.User;
import danyal.fyp.awd.repository.user.UserRepository;
import danyal.fyp.awd.service.admin.LogService;
import danyal.fyp.awd.service.subject.QualificationService;
import jakarta.transaction.Transactional;
import jakarta.validation.ValidationException;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.UUID;

/**
 * Service class for handling user registration, editing, and deletion.
 * This service provides methods for registering new users, editing existing users' details,
 * and deleting users from the system.
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
    private final LogService logService;

    private final String ADD_USER = "Created New %s: Username: %s, Email: %s";
    private final String EDIT_USER = "Edited User %s: Username: %s, Email: %s, Role: %s, Qualification: %s";
    private final String DELETE_USER = "Delete User: %s";

    /**
     * Registers a new user in the system.
     * This method checks if the username or email already exists before creating a new user.
     * If the user role is "ROLE_USER", a qualification is associated with the user.
     *
     * @param request the {@link RegistrationRequestDto} containing user registration details.
     * @throws QualificationException if the specified qualification does not exist.
     * @throws ValidationException if the username or email already exists.
     */
    @Transactional
    public void registerUser(RegistrationRequestDto request) throws Exception {

        if (userRepository.existsByUsername(request.username()) || userRepository.existsByEmail(request.email())) {
            throw new ValidationException("Username or Email already exists");
        }

        if (!request.role().equals("ROLE_USER")) {
            throw new Exception("Invalid");
        }

        User user = new User();
        user.setUsername(request.username());
        user.setEmail(request.email());
        user.setPassword(passwordEncoder.encode(request.password()));
        user.setMarks(0);
        user.setQualificationId(qualificationService.getIdByName(request.qualification()));
        user.setRole(roleService.getRole(request.role()));
        userRepository.save(user);
        String roleName = request.role();
        logService.addLog(user, ADD_USER.formatted(
                roleName.equals("ROLE_ADMIN") ? "Admin" : "User",
                user.getUsername(),
                user.getEmail()
        ));
    }

    /**
     * Edits an existing user's details, including username, email, password, role, and qualification.
     * Logs the changes made to the user's information.
     *
     * @param userEditDto the {@link UserEditDto} containing the new user details.
     * @param token the authentication token of the user making the edits.
     * @throws QualificationException if the specified qualification does not exist.
     */
    public void editUser(UserEditDto userEditDto, String token) throws QualificationException {
        User user = userRepository.findById(userEditDto.id()).get();

        String oldUsername = user.getUsername();
        String oldEmail = user.getEmail();
        String oldRole = user.getRole().getName();
        String oldQual = qualificationService.getQualification(user.getQualificationId()).getName();

        user.setUsername(userEditDto.username());
        user.setEmail(userEditDto.email());
        if (!userEditDto.password().equals(""))
            user.setPassword(passwordEncoder.encode(userEditDto.password()));
        user.setRole(roleService.getRole(userEditDto.role()));
        if (!userEditDto.qualification().equals(""))
            user.setQualificationId(qualificationService.getIdByName(userEditDto.qualification()));
        userRepository.save(user);
        logService.addLog(token, EDIT_USER.formatted(oldUsername,
                "%s -> %s".format(oldUsername, user.getUsername()),
                "%s -> %s".format(oldEmail, user.getEmail()),
                "%s -> %s".format(oldRole, user.getRole().getName()),
                user.getRole().getName().equals("ROLE_USER") ? "%s -> %s".format(oldQual, userEditDto.qualification()) : "Admin"
        ));
    }

    /**
     * Deletes a user from the system by their ID.
     * The user's logs are also deleted before removing the user from the database.
     *
     * @param id the UUID of the user to be deleted.
     * @param token the authentication token of the user performing the deletion.
     */
    public void deleteUser(UUID id, String token) {
        User user = userRepository.findById(id).get();
        logService.deleteUserLogs(user);
        userRepository.deleteById(id);
        logService.addLog(token, DELETE_USER.formatted(user.getUsername()));
    }
}
