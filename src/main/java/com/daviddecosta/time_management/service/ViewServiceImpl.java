package com.daviddecosta.time_management.service;

import com.daviddecosta.time_management.model.View;
import com.daviddecosta.time_management.repository.ViewRepo;
//import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import jakarta.persistence.EntityNotFoundException;

@Service
public class ViewServiceImpl implements ViewService {
    private final ViewRepo viewRepo;

    //@Autowired
    public ViewServiceImpl(ViewRepo viewRepo) {
        this.viewRepo = viewRepo;
    }

    @Override
    public List<View> getAllViews() {
        return viewRepo.findAll();
    }

    @Override
    public View getViewById(Long id) {
        return viewRepo.findById(id).orElseThrow(() -> new EntityNotFoundException("View not found"));
    }

    @Override
    public View updateView(Long id, View viewDetails) {
        View existingView = viewRepo.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("View not found with id " + id));

        // Update the properties of the existing view
        existingView.setViewType(viewDetails.getViewType());
        existingView.setSettings(viewDetails.getSettings());

        // Save the updated view back to the database
        return viewRepo.save(existingView);
    }

    @Override
    public View saveView(View view) {
        return viewRepo.save(view);
    }

    @Override
    public void deleteView(Long id) {
        viewRepo.deleteById(id);
    }
}
