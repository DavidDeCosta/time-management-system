package com.daviddecosta.time_management.service;

import com.daviddecosta.time_management.model.Note;
import com.daviddecosta.time_management.repository.NoteRepo;
//import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import jakarta.persistence.EntityNotFoundException;

@Service
public class NoteServiceImpl implements NoteService {
    private final NoteRepo noteRepo;

    //@Autowired
    public NoteServiceImpl(NoteRepo noteRepo) {
        this.noteRepo = noteRepo;
    }

    @Override
    public List<Note> getAllNotes() {
        return noteRepo.findAll();
    }

    @Override
    public Note getNoteById(Long id) {
        return noteRepo.findById(id).orElseThrow(() -> new EntityNotFoundException("Note not found"));
    }

    @Override
    public Note saveNote(Note note) {
        return noteRepo.save(note);
    }

    @Override
    public Note updateNote(Long id, Note noteDetails) {
        Note existingNote = noteRepo.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Note not found with id " + id));

        // Update the properties of the existing note
        existingNote.setContent(noteDetails.getContent());

        // Save the updated note back to the database
        return noteRepo.save(existingNote);
    }

    @Override
    public void deleteNote(Long id) {
        noteRepo.deleteById(id);
    }
}
