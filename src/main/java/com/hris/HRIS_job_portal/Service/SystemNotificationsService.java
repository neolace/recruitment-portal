package com.hris.HRIS_job_portal.Service;

import com.hris.HRIS_job_portal.Model.SystemNotificationsModel;
import com.hris.HRIS_job_portal.Repository.SystemNotificationsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SystemNotificationsService {
    @Autowired
    private SystemNotificationsRepository notificationRepository;

    public List<SystemNotificationsModel> getActiveNotifications() {
        return notificationRepository.findByActive(true);
    }

    public SystemNotificationsModel createNotification(SystemNotificationsModel notification) {
        return notificationRepository.save(notification);
    }

    public SystemNotificationsModel updateNotification(SystemNotificationsModel notification) {
        return notificationRepository.save(notification);
    }

    public void deleteNotification(String id) {
        notificationRepository.deleteById(id);
    }
}
