package danyal.fyp.awd.controller.user;

import danyal.fyp.awd.dto.user.AuthenticationResponseDto;
import danyal.fyp.awd.dto.user.RefreshResponseDto;
import danyal.fyp.awd.dto.user.RefreshTokenDto;
import danyal.fyp.awd.service.user.CookieService;
import danyal.fyp.awd.service.user.RefreshTokenService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

/**
 * Handles REST API endpoints for refreshing authentication tokens.
 *
 * @author Danyal Shah
 */
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/refresh/")
public class RefreshTokenController {

    private final RefreshTokenService refreshTokenService;
    private final CookieService cookieService;

    /**
     * Refreshes the access token using the provided cookie.
     *
     * @param accessToken the current access token from the cookie.
     * @return a new access token and session timer value.
     */
    @PostMapping("/refresh-token")
    public ResponseEntity<RefreshResponseDto> refreshToken(@CookieValue(name="token") String accessToken) {
        AuthenticationResponseDto response = refreshTokenService.refreshToken(accessToken);
        ResponseCookie cookieExpire = cookieService.createTimerCookie();
        return ResponseEntity.ok(new RefreshResponseDto(response.accessToken(), cookieExpire.getValue()));
    }

}
