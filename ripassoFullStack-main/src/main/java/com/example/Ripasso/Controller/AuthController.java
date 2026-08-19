package com.example.Ripasso.Controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.Ripasso.DTO.AuthRequest;
import com.example.Ripasso.DTO.AuthResponse;
import com.example.Ripasso.Service.AuthService;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(
    origins = {
        "https://gamecompanionprice-production.up.railway.app",
        "http://localhost:4200"
    },
    methods = { "GET", "POST", "PUT", "DELETE", "OPTIONS" },
    allowedHeaders = { "Authorization", "Content-Type", "Accept", "Origin" }
)
public class AuthController {
    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/register")
    public ResponseEntity<AuthResponse> register(@RequestBody AuthRequest request) {
        return ResponseEntity.ok(authService.register(request));
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody AuthRequest request) {
        return ResponseEntity.ok(authService.login(request));
    }
}
