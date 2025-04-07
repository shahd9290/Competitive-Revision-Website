package danyal.fyp.awd.service.user;

import danyal.fyp.awd.dto.user.auth.AuthenticationRequestDto;
import danyal.fyp.awd.dto.user.auth.AuthenticationResponseDto;
import danyal.fyp.awd.exception.AdminException;
import danyal.fyp.awd.model.user.User;
import danyal.fyp.awd.repository.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

/**
 * Service class for handling user authentication.
 *
 * @author Danyal Shah
 */
@Service
@RequiredArgsConstructor
public class AuthenticationService {

    private final AuthenticationManager authenticationManager;

    private final JwtService jwtService;

    private final UserRepository userRepository;

    private final RefreshTokenService refreshTokenService;

    private Authentication authentication;

    private User user;

    /**
     * Authenticates a user and generates an access token.
     *
     * <p>If the user does not have a valid refresh token, a new one is created.</p>
     *
     * @param request the {@link AuthenticationRequestDto} containing the user's credentials.
     * @return an {@link AuthenticationResponseDto} containing the generated access token.
     * @throws UsernameNotFoundException if the user does not exist.
     */
    public AuthenticationResponseDto authenticate(final AuthenticationRequestDto request) throws AdminException {
        final var authToken = UsernamePasswordAuthenticationToken.unauthenticated(request.username(), request.password());
        final var authentication = authenticationManager.authenticate(authToken);

        final var accessToken = jwtService.generateToken((JpaUserDetails) authentication.getPrincipal());

        final var user = userRepository.findByUsername(request.username()).orElse(null);

        if (!user.getRoles().stream().findFirst().get().getName().equals(request.role()))
            throw new AdminException("User is not authorised to view this page.");
        // Check if valid refresh token is in database.
        // If not (expired or non-existent) then create one
        // Otherwise ignore and continue
        if (refreshTokenService.hasInvalidRefreshToken(user)) {
             refreshTokenService.createToken(user);
        }

        return new AuthenticationResponseDto(accessToken);
    }

}
