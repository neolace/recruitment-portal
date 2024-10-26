package com.hris.HRIS_job_portal.Controller;

import com.hris.HRIS_job_portal.DTO.ApiResponse;
import com.hris.HRIS_job_portal.Model.InterviewQuestionModel;
import com.hris.HRIS_job_portal.Service.InterviewQuestionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
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
    public List<InterviewQuestionModel> getAllQuestions() {
        return service.getAllQuestions();
    }

    @PutMapping("/increment-question-view/{id}")
    public ResponseEntity<ApiResponse> incrementQuestionViewCount(@PathVariable String id) {
        service.incrementQuestionViewCount(id);
        return ResponseEntity.ok(new ApiResponse("Question view count incremented"));
    }

    @PutMapping("/increment-answer-view/{id}")
    public ResponseEntity<ApiResponse> incrementAnswerViewCount(@PathVariable String id) {
        service.incrementAnswerViewCount(id);
        return ResponseEntity.ok(new ApiResponse("Answer view count incremented"));
    }
}
