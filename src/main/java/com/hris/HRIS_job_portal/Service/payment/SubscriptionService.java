package com.hris.HRIS_job_portal.Service.payment;

import com.hris.HRIS_job_portal.Model.payment.SubscriptionsModel;
import com.hris.HRIS_job_portal.Repository.payment.SubscriptionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class SubscriptionService {

    @Autowired
    private SubscriptionRepository subscriptionRepository;

    public SubscriptionsModel getSubscription(String companyId) {
        return subscriptionRepository.findByCompanyId(companyId);
    }

    public SubscriptionsModel updateSubscription(String companyId, SubscriptionsModel subscription) {
        SubscriptionsModel existingSubscription = subscriptionRepository.findByCompanyId(companyId);
        if (existingSubscription != null) {
            existingSubscription.setPlan_name(subscription.getPlan_name());
            existingSubscription.setCost(subscription.getCost());
            existingSubscription.setBilling_cycle(subscription.getBilling_cycle());
            existingSubscription.setStart_date(subscription.getStart_date());
            existingSubscription.setEnd_date(subscription.getEnd_date());
            existingSubscription.set_active(subscription.is_active());
            return subscriptionRepository.save(existingSubscription);
        }
        return null;
    }
}

