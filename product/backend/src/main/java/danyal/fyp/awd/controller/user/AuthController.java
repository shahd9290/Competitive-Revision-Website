package danyal.fyp.awd.controller.user;

import danyal.fyp.awd.dto.user.auth.AuthenticationRequestDto;
import danyal.fyp.awd.dto.user.auth.AuthenticationResponseDto;
import danyal.fyp.awd.exception.AdminException;
import danyal.fyp.awd.service.user.AuthenticationService;
import danyal.fyp.awd.service.user.CookieService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * Handles authentication-related REST API endpoints.
 *
 * @author Danyal Shah
 */
@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthenticationService authenticationService;
    private final CookieService cookieService;

    /**
     * Authenticates a user and sets cookies for the access token and session timer.
     *
     * @param authenticationRequestDto the user's login credentials.
     * @return a success message with cookies or an error message for invalid credentials.
     */
    @PostMapping("/login")
    public ResponseEntity<String> authenticate(@RequestBody final AuthenticationRequestDto authenticationRequestDto) {
        try {
            AuthenticationResponseDto response = authenticationService.authenticate(authenticationRequestDto);
            ResponseCookie cookie = cookieService.createTokenCookie(response.accessToken());
            ResponseCookie cookieExpire = cookieService.createTimerCookie();
            return ResponseEntity.ok().header(HttpHeaders.SET_COOKIE, cookie.toString(), cookieExpire.toString()).body("User logged in successfully.");
        }
        catch (AdminException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
        catch (Exception e) {
            return ResponseEntity.badRequest().body("Username or password is incorrect.");
        }
    }
}
