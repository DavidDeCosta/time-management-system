package com.daviddecosta.time_management.controller;

import com.daviddecosta.time_management.model.View;
import com.daviddecosta.time_management.service.ViewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/views")
public class ViewController {

    @Autowired
    private ViewService viewService;

    @GetMapping
    public List<View> getAllViews() {
        return viewService.getAllViews();
    }

    @GetMapping("/{id}")
    public ResponseEntity<View> getViewById(@PathVariable Long id) {
        return ResponseEntity.ok(viewService.getViewById(id));
    }

    @PostMapping
    public View createView(@RequestBody View view) {
        return viewService.saveView(view);
    }

    @PutMapping("/{id}")
    public View updateView(@PathVariable Long id, @RequestBody View view) {
        return viewService.updateView(id, view);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteView(@PathVariable Long id) {
        viewService.deleteView(id);
        return ResponseEntity.ok().build();
    }
}
