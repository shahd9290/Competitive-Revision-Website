package danyal.fyp.awd.filter;

import danyal.fyp.awd.wrapper.HttpRequestWrapper;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

/**
 * A filter that extracts a JWT from cookies and adds it to the Authorization header.
 *
 * @author Danyal Shah
 */
public class TokenFilter extends OncePerRequestFilter {

    /**
     * Filters the incoming request to add an Authorization header if a JWT is found in cookies.
     *
     * @param request     the incoming HTTP request.
     * @param response    the HTTP response.
     * @param filterChain the filter chain to pass the request/response to the next filter.
     * @throws ServletException if an error occurs during the filtering process.
     * @throws IOException      if an input or output error is detected when handling the request.
     */
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        String token = getJwtFromCookies(request);
        if (request.getRequestURI().contains("/api/auth") || token == null) {
            filterChain.doFilter(request, response);
            return;
        }
        HttpRequestWrapper requestWrapper = new HttpRequestWrapper(request);
        requestWrapper.addHeader("Authorization", "Bearer " + token);

        filterChain.doFilter(requestWrapper, response);
    }

    /**
     * Extracts the JWT from cookies in the incoming request.
     *
     * @param request the HTTP request containing cookies.
     * @return the JWT token if found; {@code null} otherwise.
     */
    private String getJwtFromCookies(HttpServletRequest request) {
        if (request.getCookies() != null) {
            for (Cookie cookie : request.getCookies()) {
                if ("token".equals(cookie.getName())) {
                    return cookie.getValue();
                }
            }
        }
        return null;
    }
}
