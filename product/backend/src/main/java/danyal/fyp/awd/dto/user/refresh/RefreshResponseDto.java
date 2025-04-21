package danyal.fyp.awd.dto.user.refresh;

/**
 * A DTO representing a refresh token response.
 * Used to return a new access token and its expiry after a successful refresh operation.
 *
 * @param token the refreshed access token
 * @param tokenExpiry the expiry time of the refreshed token in string format
 * @author Danyal Shah
 */
public record RefreshResponseDto(String token, String tokenExpiry) {
}
