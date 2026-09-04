package backend.dto;

import backend.model.User;

public class AuthMeResponse {
    private String name;
    private String email;
    private String role;

    public static AuthMeResponse fromEntity(User user) {
        AuthMeResponse dto = new AuthMeResponse();
        dto.name = user.getName();
        dto.email = user.getEmail();
        dto.role = user.getRole();
        return dto;
    }

    public String getName() { return name; }
    public String getEmail() { return email; }
    public String getRole() { return role; }
}