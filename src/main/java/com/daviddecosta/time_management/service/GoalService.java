package com.daviddecosta.time_management.service;

import com.daviddecosta.time_management.model.Goal;
import java.util.List;

public interface GoalService {
    List<Goal> getAllGoals();
    Goal getGoalbyID(Long id);
    Goal saveGoal(Goal goal);
    Goal updateGoal(Long id, Goal goalDetails);
    void deleteGoal(Long id);
    
}
