package Utils;

import Persistence.User;
import io.jsonwebtoken.*;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import javax.naming.AuthenticationException;
import java.util.Date;
import java.util.concurrent.TimeUnit;

@Service
public class JwtUtils {
    private final String secretKey = System.getenv("WEATHER_APP_JWT_SECRET_KEY");
    private final JwtParser jwtParser = Jwts.parser().setSigningKey(secretKey);

    private Claims generateClaims(User user) {
        return Jwts.claims().setSubject(user.getUsername());
    }

    public String createToken(User user) {
        Claims claims = generateClaims(user);
        Date tokenCreateTime = new Date();
        long accessTokenValidity = 60 * 60 * 1000;
        Date tokenValidity = new Date(tokenCreateTime.getTime() + TimeUnit.MINUTES.toMillis(accessTokenValidity));
        return Jwts.builder()
                .setClaims(claims)
                .setExpiration(tokenValidity)
                .signWith(SignatureAlgorithm.HS256, secretKey)
                .compact();
    }

    @Bean
    private BCryptPasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    public Claims resolveClaims(String token) {
        if (token != null) {
            return jwtParser.parseClaimsJws(token).getBody();
        }
        return null;
    }

    public String resolveToken(HttpServletRequest request) {
        String TOKEN_HEADER = "Authorization";
        String bearerToken = request.getHeader(TOKEN_HEADER);
        String TOKEN_PREFIX = "Bearer ";
        if (bearerToken != null && bearerToken.startsWith(TOKEN_PREFIX)) {
            return bearerToken.substring(TOKEN_PREFIX.length());
        }
        return null;
    }

    public boolean validateClaims(Claims claims) throws AuthenticationException {
        return claims.getExpiration().after(new Date());
    }
}