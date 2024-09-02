package com.daviddecosta.time_management.service;

import com.daviddecosta.time_management.model.Note;
import java.util.List;

public interface NoteService {
    List<Note> getAllNotes();
    Note getNoteById(Long id);
    Note saveNote(Note note);
    Note updateNote(Long id, Note noteDetails);
    void deleteNote(Long id);
}
