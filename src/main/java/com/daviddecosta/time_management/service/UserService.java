package com.daviddecosta.time_management.service;

import com.daviddecosta.time_management.model.User;
import java.util.List;

public interface UserService {
    List<User> getAllUsers();
    User getUserById(Long id);
    User saveUser(User user);
    User updateUser(Long id, User userDetails);
    void deleteUser(Long id);
}
