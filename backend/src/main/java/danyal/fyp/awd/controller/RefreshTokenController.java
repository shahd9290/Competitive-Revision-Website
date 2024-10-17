package danyal.fyp.awd.controller;

import danyal.fyp.awd.dto.AuthenticationResponseDto;
import danyal.fyp.awd.dto.RefreshTokenDto;
import danyal.fyp.awd.service.CookieService;
import danyal.fyp.awd.service.RefreshTokenService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/refresh/")
public class RefreshTokenController {

    private final RefreshTokenService refreshTokenService;
    private final CookieService cookieService;

    @PostMapping("/refresh-token")
    public ResponseEntity<String> refreshToken(@CookieValue(name="token") String accessToken) {
        AuthenticationResponseDto response = refreshTokenService.refreshToken(accessToken);
        String cookie = cookieService.createTokenCookie(response.accessToken());
        return ResponseEntity.ok().header(HttpHeaders.SET_COOKIE, cookie).body("Token Updated Successfully");
    }

    @PostMapping("/logout")
    public ResponseEntity<Void> revokeToken(@RequestBody RefreshTokenDto rT) {
        refreshTokenService.revokeRefreshToken(rT.refreshToken());
        return ResponseEntity.noContent().build();
    }
}
