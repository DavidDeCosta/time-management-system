package com.daviddecosta.time_management.service;

import java.util.List;

//import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.daviddecosta.time_management.model.Goal;
import com.daviddecosta.time_management.repository.GoalRepo;

import jakarta.persistence.EntityNotFoundException;

@Service
public class GoalServiceImpl implements GoalService {

    private final GoalRepo goalRepo;

    //@Autowired
    public GoalServiceImpl(GoalRepo goalRepo){
        this.goalRepo = goalRepo;
    }

    @Override
    public List<Goal> getAllGoals() {
        return goalRepo.findAll();
    }

    @Override
    public Goal getGoalbyID(Long id) {
        return goalRepo.findById(id).orElseThrow(()-> new EntityNotFoundException("Goal not found"));
    }

    @Override
    public Goal saveGoal(Goal goal) {
        return goalRepo.save(goal);
    }

    @Override
    public Goal updateGoal(Long id, Goal goalDetails) {
        Goal existingGoal = goalRepo.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Goal not found with id " + id));

        // Update the properties of the existing goal with the details from the provided goal object
        existingGoal.setTitle(goalDetails.getTitle());
        existingGoal.setDescription(goalDetails.getDescription());

        // Save the updated goal back to the database
        return goalRepo.save(existingGoal);
    }

    @Override
    public void deleteGoal(Long id) {
        goalRepo.deleteById(id);
    }
    
}
