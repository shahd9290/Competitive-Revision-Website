package danyal.fyp.awd.controller.user;

import danyal.fyp.awd.dto.user.MarksDto;
import danyal.fyp.awd.dto.user.UserAttemptDto;
import danyal.fyp.awd.dto.user.UserProfileDto;
import danyal.fyp.awd.model.subject.Qualification;
import danyal.fyp.awd.model.user.User;
import danyal.fyp.awd.model.user.UserAttempts;
import danyal.fyp.awd.service.user.UserAttemptsService;
import danyal.fyp.awd.service.user.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Handles REST API endpoints for user profile management.
 *
 * @author Danyal Shah
 */
@RestController
@RequestMapping("/api/user")
@RequiredArgsConstructor
public class UserProfileController {

    private final UserService userService;
    private final UserAttemptsService userAttemptsService;

    /**
     * Retrieves the profile information of the authenticated user.
     *
     * @param authentication the authentication object containing user details.
     * @return the user's profile information.
     */
    @GetMapping("/profile")
    public ResponseEntity<UserProfileDto> getUserProfile(final Authentication authentication) {
        User user = userService.getUserByUsername(authentication.getName());
        List<UserAttemptDto> attempts = userAttemptsService.getLatestAttempts(user);
        return ResponseEntity.ok(new UserProfileDto(user.getUsername(), user.getMarks(), attempts));
    }

    /**
     * Retrieves the qualification of the authenticated user.
     *
     * @param authentication the authentication object containing user details.
     * @return the user's qualification.
     */
    @GetMapping("/get-qualification")
    public ResponseEntity<Qualification> getQualification(final Authentication authentication) {
        Qualification qualification = userService.getUserQualification(authentication.getName());
        return ResponseEntity.ok(qualification);
    }

    @PostMapping("/save-marks")
    public ResponseEntity<Integer> saveMarks(@CookieValue(name = "token") String accessToken, @RequestBody MarksDto marksDto) {
        int marks = userService.updateMarks(accessToken, marksDto.marks());
        userAttemptsService.addAttempt(accessToken, marksDto.topicId(), marksDto.proportion());
        return ResponseEntity.ok(marks);
    }

}
