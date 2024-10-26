package com.hris.HRIS_job_portal.Service;

import com.hris.HRIS_job_portal.Model.InterviewQuestionModel;
import com.hris.HRIS_job_portal.Repository.InterviewQuestionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class InterviewQuestionService {
    private final InterviewQuestionRepository repository;

    @Autowired
    public InterviewQuestionService(InterviewQuestionRepository repository) {
        this.repository = repository;
    }

    public InterviewQuestionModel saveQuestion(InterviewQuestionModel question) {
        return repository.save(question);
    }

    public List<InterviewQuestionModel> getAllQuestions() {
        return repository.findAll();
    }
}
