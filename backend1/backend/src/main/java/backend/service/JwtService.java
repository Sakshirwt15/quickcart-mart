package backend.service;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.util.Date;

@Service
public class JwtService {

  private final SecretKey key = Keys.hmacShaKeyFor(
      "this-is-a-very-long-secret-key-for-jwt-signing-min-256-bits".getBytes());

  public String generateToken(String email, String role) {
    return Jwts.builder()
        .subject(email)
        .claim("role", role)
        .issuedAt(new Date())
        .expiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60 * 24))
        .signWith(key)
        .compact();
  }

  public String extractEmail(String token) {
    return Jwts.parser().verifyWith(key).build()
        .parseSignedClaims(token).getPayload().getSubject();
  }

  public String extractRole(String token) {
    return Jwts.parser().verifyWith(key).build()
        .parseSignedClaims(token).getPayload().get("role", String.class);
  }
}