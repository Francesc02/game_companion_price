package com.example.Ripasso.Repository;

import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import com.example.Ripasso.Model.UserEntity;
import com.example.Ripasso.Model.WishlistItem;

public interface WishlistRepository extends JpaRepository<WishlistItem, Long> {
    List<WishlistItem> findByUserOrderByIdDesc(UserEntity user);
    Optional<WishlistItem> findByUserAndGameId(UserEntity user, String gameId);
}
