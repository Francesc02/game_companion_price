package com.example.Ripasso.DTO;

import com.example.Ripasso.Model.WishlistItem;

public record WishlistResponse(Long id, String gameId, String title, String image) {
    public static WishlistResponse from(WishlistItem item) {
        return new WishlistResponse(item.getId(), item.getGameId(), item.getTitle(), item.getImage());
    }
}
