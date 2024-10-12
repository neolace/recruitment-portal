package com.hris.HRIS_job_portal.Service.mail;

import com.hris.HRIS_job_portal.Model.mail.NewsLatterModel;
import com.hris.HRIS_job_portal.Repository.mail.NewsLetterRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class NewsLatterService {

    @Autowired
    private NewsLetterRepository newsLetterRepository;

    @Autowired
    private EmailService emailService;

    public void subscribeNewsLatter(NewsLatterModel newsLatterModel) {
        Optional<NewsLatterModel> model = newsLetterRepository.findByEmail(newsLatterModel.getEmail());

        emailService.subscribedNewsLatter(newsLatterModel.getEmail());
        if (model.isEmpty()) {
            newsLetterRepository.save(newsLatterModel);
        } else {
            NewsLatterModel model1 = model.get();
            model1.setEmail(newsLatterModel.getEmail());
            newsLetterRepository.save(model1);
        }
    }
}
