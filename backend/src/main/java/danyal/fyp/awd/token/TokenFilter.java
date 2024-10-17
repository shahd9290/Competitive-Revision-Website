package danyal.fyp.awd.token;

import com.auth0.jwt.JWT;
import com.auth0.jwt.interfaces.DecodedJWT;
import danyal.fyp.awd.service.JwtService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.token.TokenService;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

public class TokenFilter extends OncePerRequestFilter {

    HttpRequestWrapper requestWrapper;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        String token = request.getHeader("Cookie");
        if (request.getRequestURI().contains("/api/auth") || token != null) {
            filterChain.doFilter(request, response);
        }
        assert token != null;
        token = token.substring(6); // Token cookie less "token=" prefix.
        requestWrapper = new HttpRequestWrapper(request);
        requestWrapper.addHeader("Authorization", "Bearer " + token);

        filterChain.doFilter(requestWrapper, response);
    }
}
