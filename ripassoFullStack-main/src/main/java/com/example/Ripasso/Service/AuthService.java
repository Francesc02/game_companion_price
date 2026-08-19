package com.example.Ripasso.Service;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.Ripasso.DTO.AuthRequest;
import com.example.Ripasso.DTO.AuthResponse;
import com.example.Ripasso.Model.UserEntity;
import com.example.Ripasso.Repository.UserRepository;
import com.example.Ripasso.Security.JwtService;

@Service
public class AuthService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    public AuthService(
            UserRepository userRepository,
            PasswordEncoder passwordEncoder,
            JwtService jwtService) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
    }

    public AuthResponse register(AuthRequest request) {
        validateRequest(request);

        String username = request.username().trim();
        if (userRepository.existsByUsername(username)) {
            throw new IllegalArgumentException("Username già registrato");
        }

        UserEntity user = new UserEntity();
        user.setUsername(username);
        user.setPassword(passwordEncoder.encode(request.password()));
        userRepository.save(user);

        return createResponse(user);
    }

    public AuthResponse login(AuthRequest request) {
        validateRequest(request);

        String username = request.username().trim();
        UserEntity user = userRepository.findByUsername(username)
                .orElseThrow(() -> new IllegalArgumentException("Credenziali non valide"));

        if (!passwordEncoder.matches(request.password(), user.getPassword())) {
            throw new IllegalArgumentException("Credenziali non valide");
        }

        return createResponse(user);
    }

    private AuthResponse createResponse(UserEntity user) {
        String token = jwtService.generateToken(user.getId(), user.getUsername());
        return new AuthResponse(token, user.getId(), user.getUsername());
    }

    private void validateRequest(AuthRequest request) {
        if (request == null
                || request.username() == null
                || request.username().isBlank()
                || request.password() == null
                || request.password().length() < 8) {
            throw new IllegalArgumentException("Username obbligatorio e password di almeno 8 caratteri");
        }
    }
}
