package backend.service;

import backend.dto.WishlistItemResponse;
import backend.model.Product;
import backend.model.User;
import backend.model.WishlistItem;
import backend.repository.ProductRepository;
import backend.repository.UserRepository;
import backend.repository.WishlistItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class WishlistService {

    @Autowired private WishlistItemRepository wishlistItemRepository;
    @Autowired private UserRepository userRepository;
    @Autowired private ProductRepository productRepository;

    public List<WishlistItemResponse> getWishlist(String email) {
        User user = userRepository.findByEmail(email).orElseThrow(() -> new RuntimeException("User not found"));
        return wishlistItemRepository.findByUser(user).stream()
                .map(WishlistItemResponse::fromEntity)
                .collect(Collectors.toList());
    }

    public void addToWishlist(String email, Long productId) {
        User user = userRepository.findByEmail(email).orElseThrow(() -> new RuntimeException("User not found"));
        Product product = productRepository.findById(productId).orElseThrow(() -> new RuntimeException("Product not found"));

        if (wishlistItemRepository.findByUserAndProductId(user, productId).isPresent()) {
            return; // already in wishlist, don't duplicate
        }

        WishlistItem item = new WishlistItem();
        item.setUser(user);
        item.setProduct(product);
        wishlistItemRepository.save(item);
    }

    public void removeFromWishlist(String email, Long productId) {
        User user = userRepository.findByEmail(email).orElseThrow(() -> new RuntimeException("User not found"));
        WishlistItem item = wishlistItemRepository.findByUserAndProductId(user, productId)
                .orElseThrow(() -> new RuntimeException("Item not in wishlist"));
        wishlistItemRepository.delete(item);
    }
}