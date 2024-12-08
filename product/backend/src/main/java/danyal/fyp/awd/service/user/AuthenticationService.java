package danyal.fyp.awd.service.user;

import danyal.fyp.awd.dto.user.AuthenticationRequestDto;
import danyal.fyp.awd.dto.user.AuthenticationResponseDto;
import danyal.fyp.awd.repository.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthenticationService {

    private final AuthenticationManager authenticationManager;

    private final JwtService jwtService;

    private final UserRepository userRepository;

    private final RefreshTokenService refreshTokenService;

    public AuthenticationResponseDto authenticate(final AuthenticationRequestDto request) {
        final var authToken = UsernamePasswordAuthenticationToken.unauthenticated(request.username(), request.password());
        final var authentication = authenticationManager.authenticate(authToken);

        final var accessToken = jwtService.generateToken(request.username());

        final var user = userRepository.findByUsername(request.username()).orElse(null);
        // Check if valid refresh token is in database.
        // If not (expired or non-existent) then create one
        // Otherwise ignore and continue
        if (refreshTokenService.hasInvalidRefreshToken(user)) {
             refreshTokenService.createToken(user);
        }

        return new AuthenticationResponseDto(accessToken);
    }

}
