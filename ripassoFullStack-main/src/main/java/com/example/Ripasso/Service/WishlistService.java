package com.example.Ripasso.Service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.Ripasso.DTO.WishlistRequest;
import com.example.Ripasso.Model.UserEntity;
import com.example.Ripasso.Model.WishlistItem;
import com.example.Ripasso.Repository.UserRepository;
import com.example.Ripasso.Repository.WishlistRepository;

@Service
public class WishlistService {
    private final WishlistRepository wishlistRepository;
    private final UserRepository userRepository;

    public WishlistService(WishlistRepository wishlistRepository, UserRepository userRepository) {
        this.wishlistRepository = wishlistRepository;
        this.userRepository = userRepository;
    }

    @Transactional(readOnly = true)
    public List<WishlistItem> getWishlist(String username) {
        return wishlistRepository.findByUserOrderByIdDesc(getUser(username));
    }

    @Transactional
    public WishlistItem add(String username, WishlistRequest request) {
        validateRequest(request);

        UserEntity user = getUser(username);
        return wishlistRepository.findByUserAndGameId(user, request.gameId()).orElseGet(() -> {
            WishlistItem item = new WishlistItem();
            item.setUser(user);
            item.setGameId(request.gameId().trim());
            item.setTitle(request.title().trim());
            item.setImage(normalizeImage(request.image()));
            return wishlistRepository.save(item);
        });
    }

    @Transactional
    public void remove(String username, String gameId) {
        if (gameId == null || gameId.isBlank()) {
            throw new IllegalArgumentException("Game ID obbligatorio");
        }

        UserEntity user = getUser(username);
        wishlistRepository.findByUserAndGameId(user, gameId.trim())
                .ifPresent(wishlistRepository::delete);
    }

    private UserEntity getUser(String username) {
        return userRepository.findByUsername(username)
                .orElseThrow(() -> new IllegalArgumentException("Utente non trovato"));
    }

    private void validateRequest(WishlistRequest request) {
        if (request == null
                || request.gameId() == null
                || request.gameId().isBlank()
                || request.title() == null
                || request.title().isBlank()) {
            throw new IllegalArgumentException("Game ID e titolo sono obbligatori");
        }
    }

    private String normalizeImage(String image) {
        if (image == null || image.isBlank()) {
            return null;
        }
        return image.trim();
    }
}
