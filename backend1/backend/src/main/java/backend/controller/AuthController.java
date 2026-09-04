package backend.controller;

import backend.dto.AuthMeResponse;
import backend.model.User;
import backend.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired private AuthService authService;

    @PostMapping("/register")
    public User register(@RequestBody Map<String, String> body) {
        return authService.register(body.get("name"), body.get("email"), body.get("password"));
    }

    @PostMapping("/login")
    public Map<String, String> login(@RequestBody Map<String, String> body) {
        String token = authService.login(body.get("email"), body.get("password"));
        return Map.of("token", token);
    }

    @GetMapping("/me")
    public AuthMeResponse me(Authentication authentication) {
        return authService.getCurrentUser(authentication.getName());
    }
}