package com.daviddecosta.time_management.service;

import com.daviddecosta.time_management.model.View;
import java.util.List;

public interface ViewService {
    List<View> getAllViews();
    View getViewById(Long id);
    View saveView(View view);
    View updateView(Long id, View viewDetails);
    void deleteView(Long id);
}
