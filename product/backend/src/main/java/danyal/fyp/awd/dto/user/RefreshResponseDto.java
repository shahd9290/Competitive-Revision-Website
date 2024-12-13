package danyal.fyp.awd.dto.user;

/**
 * A DTO representing a refresh token response.
 *
 * @param token       the refreshed access token.
 * @param tokenExpiry the expiry time of the refreshed token in string format.
 * @author Danyal Shah
 */
public record RefreshResponseDto(String token, String tokenExpiry) {
}
