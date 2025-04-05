package danyal.fyp.awd.controller.admin;

import danyal.fyp.awd.dto.admin.user.UserDeleteDto;
import danyal.fyp.awd.dto.admin.user.UserEditDto;
import danyal.fyp.awd.service.user.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin/users")
@RequiredArgsConstructor
public class AdminUserController {

    private final UserService userService;

    @GetMapping("/get")
    public ResponseEntity<Object> getUsers() {
        try {
            return ResponseEntity.ok(userService.getAllUsers());
        }
        catch (Exception e){
            return ResponseEntity.badRequest().body("An error occurred when fetching data");
        }
    }

    @DeleteMapping("/delete")
    public ResponseEntity<Object> deleteTopic(@RequestBody final UserDeleteDto deleteDto) {
        try {
            userService.deleteUser(deleteDto.id());
            return ResponseEntity.ok("User Deleted Successfully");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Failed To Delete User");
        }
    }

    @PostMapping("/edit")
    public ResponseEntity<String> editQualification(@RequestBody final UserEditDto userEditDto) {
        try {
            userService.editUser(userEditDto.id(), userEditDto.username(), userEditDto.email(), userEditDto.password(), userEditDto.role(), userEditDto.qualification());
            return ResponseEntity.ok("Qualification Edited Successfully");
        }
        catch (Exception e) {
            return  ResponseEntity.badRequest().body(e.getMessage());
        }
    }

}
