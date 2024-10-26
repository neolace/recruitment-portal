package com.hris.HRIS_job_portal.Controller;

import com.hris.HRIS_job_portal.Model.InterviewQuestionModel;
import com.hris.HRIS_job_portal.Service.InterviewQuestionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v2/interview-questions")
public class InterviewQuestionController {

    private final InterviewQuestionService service;

    @Autowired
    public InterviewQuestionController(InterviewQuestionService service) {
        this.service = service;
    }

    @PostMapping("/add")
    public InterviewQuestionModel addQuestion(@RequestBody InterviewQuestionModel question) {
        return service.saveQuestion(question);
    }

    @GetMapping("/get")
    public List<InterviewQuestionModel> getQuestion() {
        return service.getAllQuestions();
    }
}
