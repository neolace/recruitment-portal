package com.hris.HRIS_job_portal.Service.mail;

import com.hris.HRIS_job_portal.Config.ConfigUtility;
import com.hris.HRIS_job_portal.DTO.mail.ContactUsDTO;
import jakarta.mail.Message;
import jakarta.mail.MessagingException;
import jakarta.mail.Session;
import jakarta.mail.Transport;
import jakarta.mail.internet.InternetAddress;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {
    private final JavaMailSender javaMailSender;

    @Autowired
    ConfigUtility configUtil;

    @Autowired
    public EmailService(JavaMailSender javaMailSender) {
        this.javaMailSender = javaMailSender;
    }

    public void sendSimpleEmail(String to, String subject, String text) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(to);
        message.setSubject(subject);
        message.setText(text);
        javaMailSender.send(message);
    }

    private void sendEmail(Session session, String toEmail, String subject, String body) throws MessagingException {
        MimeMessage message = new MimeMessage(session);
        //message.setFrom(new InternetAddress(FROM_EMAIL));
        message.addRecipient(Message.RecipientType.TO, new InternetAddress(toEmail));
        message.setSubject(subject);
        message.setText(body);

        Transport.send(message);
    }

    public void sendPasswordResetEmail(String toEmail, String resetToken) {
        String subject = "Password Reset Request";
        String resetUrl = configUtil.getProperty("PASSWORD_REST_URL") + resetToken;
        String body = "Dear User,\n\nYou requested to reset your password. Please click the following link to reset it:\n"
                + resetUrl + "\n\nThis link will expire in 30 minutes.\n\nIf you did not request this, please ignore this email.";

        sendSimpleEmail(toEmail, subject, body);
    }

    public void contactMe(String email) {
        String to = configUtil.getProperty("CONTACT_ME_EMAIL");
        String subject = "Request For Information";
        String body = "Hi, I would like to know more about your services. I'm, \n\n" + email + "\n\n Thank you.";

        sendSimpleEmail(to, subject, body);
    }

    public void contactUs(ContactUsDTO contactUsDTO) {
        String to = configUtil.getProperty("CONTACT_ME_EMAIL");
        String mailSubject = contactUsDTO.getSubject() + " - " + contactUsDTO.getName();
        String body = "Name: " + contactUsDTO.getName() + "\nEmail: " + contactUsDTO.getEmail() + "\n\n" + contactUsDTO.getMessage();

        sendSimpleEmail(to, mailSubject, body);
    }

    public void sendRejectionNotification(String to, String candidateName) {
        String subject = "Application Status";
        String body = "Dear " + candidateName + ",\n\nWe appreciate your interest in using Talent Boozt. Unfortunately, you applied company has decided to move forward with other candidates at this time. \nBut don't stop now. You can apply unlimited jobs free of charge from Talent Boozt. We wish you the best of luck in your future endeavors.\n\nBest regards,\nTeam Talent Boozt.";
        sendSimpleEmail(to, subject, body);
    }

    public void sendSelectionNotification(String to, String candidateName) {
        String subject = "Application Status";
        String body = "Dear " + candidateName + ",\n\nWe are happy to inform your application was selected in first round. Applied company will contact you shortly.\n\nBest regards,\nTeam Talent Boozt.";
        sendSimpleEmail(to, subject, body);
    }

    public void subscribedNewsLatter(String to) {
        String subject = "Talent Boozt Newsletter";
        String body = "Dear valuable user,\n\nWe are happy to inform you that you have subscribed to our newsletter. We promise not to spam your inbox :) \n\nBest regards,\nTeam Talent Boozt.";
        sendSimpleEmail(to, subject, body);
    }
}
