package backend.service;

import backend.model.User;
import backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import backend.dto.AuthMeResponse;

@Service
public class AuthService {

  @Autowired
  private UserRepository userRepository;
  @Autowired
  private PasswordEncoder passwordEncoder;
  @Autowired
  private JwtService jwtService;

  public User register(String name, String email, String rawPassword) {
    User user = new User();
    user.setName(name);
    user.setEmail(email);
    user.setPassword(passwordEncoder.encode(rawPassword));
    return userRepository.save(user);
  }

  public String login(String email, String rawPassword) {
    User user = userRepository.findByEmail(email)
        .orElseThrow(() -> new RuntimeException("User not found"));
    if (!passwordEncoder.matches(rawPassword, user.getPassword())) {
      throw new RuntimeException("Invalid password");
    }
    return jwtService.generateToken(user.getEmail(), user.getRole());
  }

  public AuthMeResponse getCurrentUser(String email) {
    User user = userRepository.findByEmail(email)
            .orElseThrow(() -> new RuntimeException("User not found"));
    return AuthMeResponse.fromEntity(user);
}
}