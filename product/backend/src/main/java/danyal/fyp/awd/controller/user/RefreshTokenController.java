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

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/refresh/")
public class RefreshTokenController {

    private final RefreshTokenService refreshTokenService;
    private final CookieService cookieService;

    @PostMapping("/refresh-token")
    public ResponseEntity<RefreshResponseDto> refreshToken(@CookieValue(name="token") String accessToken) {
        AuthenticationResponseDto response = refreshTokenService.refreshToken(accessToken);
        ResponseCookie cookieExpire = cookieService.createTimerCookie();
        return ResponseEntity.ok(new RefreshResponseDto(response.accessToken(), cookieExpire.getValue()));
    }

}
