package danyal.fyp.awd.controller.admin;

import danyal.fyp.awd.dto.admin.user.UserDeleteDto;
import danyal.fyp.awd.dto.admin.user.UserEditDto;
import danyal.fyp.awd.service.user.UserAttemptsService;
import danyal.fyp.awd.service.user.UserRegistrationService;
import danyal.fyp.awd.service.user.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

/**
 * Controller for managing user-related operations in the admin panel.
 * Provides endpoints to retrieve, delete, and edit users.
 *
 * @author Danyal Shah
 */
@RestController
@RequestMapping("/api/admin/users")
@RequiredArgsConstructor
public class AdminUserController {

    private final UserService userService;
    private final UserRegistrationService userRegistrationService;
    private final UserAttemptsService userAttemptsService;

    /**
     * Retrieves a list of all users.
     *
     * @return a ResponseEntity containing the list of users.
     */
    @GetMapping("/get")
    public ResponseEntity<Object> getUsers() {
        return ResponseEntity.ok(userService.getAllUsers());
    }

    /**
     * Deletes a user and their associated attempt records.
     *
     * @param token the authentication token from the cookie.
     * @param deleteDto the DTO containing the ID of the user to delete.
     * @return a ResponseEntity with a success message.
     */
    @DeleteMapping("/delete")
    public ResponseEntity<Object> deleteUser(@CookieValue("token") String token, @RequestBody final UserDeleteDto deleteDto) {
        userAttemptsService.deleteAttempts(deleteDto.id());
        userRegistrationService.deleteUser(deleteDto.id(), token);
        return ResponseEntity.ok("User Deleted Successfully");
    }

    /**
     * Edits the details of an existing user.
     *
     * @param token the authentication token from the cookie.
     * @param userEditDto the updated user data.
     * @return a ResponseEntity with a success or error message.
     */
    @PostMapping("/edit")
    public ResponseEntity<String> editUser(@CookieValue("token") String token, @RequestBody final UserEditDto userEditDto) {
        try {
            userRegistrationService.editUser(userEditDto, token);
            return ResponseEntity.ok("User Edited Successfully");
        }
        catch (Exception e) {
            return  ResponseEntity.badRequest().body("Failed To Edit User");
        }
    }

}
