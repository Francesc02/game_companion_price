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

    public List<WishlistItem> getWishlist(String username) {
        UserEntity user = getUser(username);
        return wishlistRepository.findByUserOrderByIdDesc(user);
    }

    public WishlistItem add(String username, WishlistRequest request) {
        UserEntity user = getUser(username);
        return wishlistRepository.findByUserAndGameId(user, request.gameId()).orElseGet(() -> {
            WishlistItem item = new WishlistItem();
            item.setUser(user);
            item.setGameId(request.gameId());
            item.setTitle(request.title());
            item.setImage(request.image());
            return wishlistRepository.save(item);
        });
    }

    @Transactional
    public void remove(String username, String gameId) {
        UserEntity user = getUser(username);
        wishlistRepository.findByUserAndGameId(user, gameId).ifPresent(wishlistRepository::delete);
    }

    private UserEntity getUser(String username) {
        return userRepository.findByUsername(username)
                .orElseThrow(() -> new IllegalArgumentException("Utente non trovato"));
    }
}
