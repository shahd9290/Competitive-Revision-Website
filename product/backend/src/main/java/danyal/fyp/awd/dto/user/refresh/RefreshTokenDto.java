package danyal.fyp.awd.dto.user.refresh;

import java.util.UUID;

/**
 * A DTO representing a refresh token.
 * Used for securely sending refresh token data when requesting new access tokens.
 *
 * @param refreshToken the UUID of the refresh token used for renewing access tokens
 * @author Danyal Shah
 */
public record RefreshTokenDto(UUID refreshToken) {
}
