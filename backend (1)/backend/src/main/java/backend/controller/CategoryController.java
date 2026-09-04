package backend.controller;

import backend.model.Category;
import backend.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/categories")
public class CategoryController {
  @Autowired
  private CategoryService categoryService;

  @GetMapping
  public List<Category> getAllCategories() {
    return categoryService.getAllCategories();
  }

  @PostMapping
  public Category createCategory(@RequestBody Category category) { // This method handles the creation of a new
                                                                   // category. It takes a Category object from the
                                                                   // request body and passes it to the service layer
                                                                   // for saving. The saved category is then returned as
                                                                   // the response.
    return categoryService.createCategory(category);
  }

}
