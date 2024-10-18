package danyal.fyp.awd.filter;

import danyal.fyp.awd.wrapper.HttpRequestWrapper;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

public class TokenFilter extends OncePerRequestFilter {

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
