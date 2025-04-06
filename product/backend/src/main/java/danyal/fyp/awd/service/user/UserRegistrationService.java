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
    private final LogService logService;

    private final String ADD_USER = "Created new %s: Username: %s, Email: %s";
    private final String EDIT_USER = "Edited User %s: Username: %s, Email: %s, Role: %s, Qualification: %s";
    private final String DELETE_USER = "Delete User %s";

    /**
     * Registers a new user in the system.
     *
     * @param request the {@link RegistrationRequestDto} containing user registration details.
     * @return the registered {@link User}.
     * @throws QualificationException if the specified qualification does not exist.
     * @throws ValidationException if the username or email already exists.
     */
    @Transactional
    public void registerUser(RegistrationRequestDto request) throws QualificationException {

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
        userRepository.save(user);
        String roleName = request.role();
        logService.addLog(user, ADD_USER.formatted(
                roleName.equals("ROLE_ADMIN") ? "Admin" : "User",
                user.getUsername(),
                user.getEmail()
        ));
    }

    public void editUser(UserEditDto userEditDto, String token) throws QualificationException {
        // NEW EDIT MESSAGE NEXT
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

    public void deleteUser(UUID id, String token) {
        User user = userRepository.findById(id).get();
        logService.deleteUserLogs(user);
        userRepository.deleteById(id);
        logService.addLog(token, DELETE_USER.formatted(user.getUsername()));
    }
}
