package com.example.Ripasso.Controller;

import java.util.List;
import java.util.stream.Collectors;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import com.example.Ripasso.DTO.WishlistRequest;
import com.example.Ripasso.DTO.WishlistResponse;
import com.example.Ripasso.Service.WishlistService;

@RestController
@RequestMapping("/api/wishlist")
public class WishlistController {
    private final WishlistService wishlistService;

    public WishlistController(WishlistService wishlistService) {
        this.wishlistService = wishlistService;
    }

    @GetMapping
    public List<WishlistResponse> getWishlist(Authentication authentication) {
        return wishlistService.getWishlist(authentication.getName()).stream()
                .map(WishlistResponse::from)
                .collect(Collectors.toList());
    }

    @PostMapping
    public ResponseEntity<WishlistResponse> add(Authentication authentication, @RequestBody WishlistRequest request) {
        return ResponseEntity.ok(WishlistResponse.from(wishlistService.add(authentication.getName(), request)));
    }

    @DeleteMapping("/{gameId}")
    public ResponseEntity<Void> remove(Authentication authentication, @PathVariable String gameId) {
        wishlistService.remove(authentication.getName(), gameId);
        return ResponseEntity.noContent().build();
    }
}
