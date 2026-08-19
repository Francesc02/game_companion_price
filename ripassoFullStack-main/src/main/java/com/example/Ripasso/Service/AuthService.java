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

    public AuthService(UserRepository userRepository, PasswordEncoder passwordEncoder, JwtService jwtService) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
    }

    public AuthResponse register(AuthRequest request) {
        if (request.username() == null || request.username().isBlank() || request.password() == null || request.password().length() < 8) {
            throw new IllegalArgumentException("Username obbligatorio e password di almeno 8 caratteri");
        }
        if (userRepository.existsByUsername(request.username())) {
            throw new IllegalArgumentException("Username già registrato");
        }
        UserEntity user = new UserEntity();
        user.setUsername(request.username().trim());
        user.setPassword(passwordEncoder.encode(request.password()));
        userRepository.save(user);
        return new AuthResponse(jwtService.generateToken(user.getId(), user.getUsername()), user.getId(), user.getUsername());
    }

    public AuthResponse login(AuthRequest request) {
        UserEntity user = userRepository.findByUsername(request.username())
                .orElseThrow(() -> new IllegalArgumentException("Credenziali non valide"));
        if (!passwordEncoder.matches(request.password(), user.getPassword())) {
            throw new IllegalArgumentException("Credenziali non valide");
        }
        return new AuthResponse(jwtService.generateToken(user.getId(), user.getUsername()), user.getId(), user.getUsername());
    }
}
