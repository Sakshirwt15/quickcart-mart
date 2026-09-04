package backend.controller;

import backend.dto.WishlistItemResponse;
import backend.service.WishlistService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/wishlist")
public class WishlistController {

    @Autowired private WishlistService wishlistService;

    @GetMapping
    public List<WishlistItemResponse> getWishlist(Authentication authentication) {
        return wishlistService.getWishlist(authentication.getName());
    }

    @PostMapping("/{productId}")
    public void addToWishlist(Authentication authentication, @PathVariable Long productId) {
        wishlistService.addToWishlist(authentication.getName(), productId);
    }

    @DeleteMapping("/{productId}")
    public void removeFromWishlist(Authentication authentication, @PathVariable Long productId) {
        wishlistService.removeFromWishlist(authentication.getName(), productId);
    }
}