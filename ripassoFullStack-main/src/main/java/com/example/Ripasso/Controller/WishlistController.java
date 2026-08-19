package com.example.Ripasso.Controller;

import java.util.List;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import com.example.Ripasso.DTO.WishlistRequest;
import com.example.Ripasso.Model.WishlistItem;
import com.example.Ripasso.Service.WishlistService;

@RestController
@RequestMapping("/api/wishlist")
public class WishlistController {
    private final WishlistService wishlistService;

    public WishlistController(WishlistService wishlistService) {
        this.wishlistService = wishlistService;
    }

    @GetMapping
    public List<WishlistItem> getWishlist(Authentication authentication) {
        return wishlistService.getWishlist(authentication.getName());
    }

    @PostMapping
    public ResponseEntity<WishlistItem> add(Authentication authentication, @RequestBody WishlistRequest request) {
        return ResponseEntity.ok(wishlistService.add(authentication.getName(), request));
    }

    @DeleteMapping("/{gameId}")
    public ResponseEntity<Void> remove(Authentication authentication, @PathVariable String gameId) {
        wishlistService.remove(authentication.getName(), gameId);
        return ResponseEntity.noContent().build();
    }
}
