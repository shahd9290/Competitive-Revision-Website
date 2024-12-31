package danyal.fyp.awd.controller.user;

import danyal.fyp.awd.dto.user.MarksDto;
import danyal.fyp.awd.dto.user.UserProfileDto;
import danyal.fyp.awd.model.subject.Qualification;
import danyal.fyp.awd.service.user.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

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

    /**
     * Retrieves the profile information of the authenticated user.
     *
     * @param authentication the authentication object containing user details.
     * @return the user's profile information.
     */
    @GetMapping("/profile")
    public ResponseEntity<UserProfileDto> getUserProfile(final Authentication authentication) {
        final var user = userService.getUserByUsername(authentication.getName());

        return ResponseEntity.ok(new UserProfileDto(user.getEmail(), user.getUsername(), user.getMarks()));
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
    public ResponseEntity<String> saveMarks(@CookieValue(name="token") String accessToken, @RequestBody MarksDto marksDto) {
        userService.updateMarks(accessToken, marksDto.marks());
        return ResponseEntity.ok("Updated Successfully");
    }

}
