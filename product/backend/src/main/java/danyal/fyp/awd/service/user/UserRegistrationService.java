package danyal.fyp.awd.service.user;

import danyal.fyp.awd.dto.user.RegistrationRequestDto;
import danyal.fyp.awd.exception.QualificationException;
import danyal.fyp.awd.model.subject.Qualification;
import danyal.fyp.awd.model.user.User;
import danyal.fyp.awd.repository.user.UserRepository;
import danyal.fyp.awd.service.subject.QualificationService;
import jakarta.transaction.Transactional;
import jakarta.validation.ValidationException;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserRegistrationService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final QualificationService qualificationService;

    @Transactional
    public User registerUser(RegistrationRequestDto request) throws QualificationException {
        if (userRepository.existsByUsername(request.username()) ||
                userRepository.existsByEmail(request.email())) {

            throw new ValidationException(
                    "Username or Email already exists");
        }

        User user = new User();
        user.setUsername(request.username());
        user.setEmail(request.email());
        user.setPassword(passwordEncoder.encode(request.password()));
        user.setQualificationId(qualificationService.getIdByName(request.qualification()));

        return userRepository.save(user);
    }

}

