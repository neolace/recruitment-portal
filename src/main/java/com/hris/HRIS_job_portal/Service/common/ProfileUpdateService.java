package com.hris.HRIS_job_portal.Service.common;

import com.hris.HRIS_job_portal.Model.EmpFollowersModel;
import com.hris.HRIS_job_portal.Model.EmpFollowingModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.BulkOperations;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Service;

import static org.springframework.data.mongodb.core.query.Criteria.where;

@Service
public class ProfileUpdateService {

    @Autowired
    private MongoTemplate mongoTemplate;

    public void bulkUpdateFollowingsAndFollowers(String userId, String fullName, String occupation, String profileImage) {
        // Step 1: Update Followings
        BulkOperations followingsBulkOps = mongoTemplate.bulkOps(BulkOperations.BulkMode.UNORDERED, EmpFollowingModel.class);

        followingsBulkOps.updateMulti(
                Query.query(where("followings.id").is(userId)),
                new Update()
                        .set("followings.$[elem].followingName", fullName)
                        .set("followings.$[elem].followingOccupation", occupation)
                        .set("followings.$[elem].followingImage", profileImage)
                        .filterArray(where("elem.id").is(userId))
        );

        followingsBulkOps.execute();

        // Step 2: Update Followers
        BulkOperations followersBulkOps = mongoTemplate.bulkOps(BulkOperations.BulkMode.UNORDERED, EmpFollowersModel.class);

        followersBulkOps.updateMulti(
                Query.query(where("followers.id").is(userId)),
                new Update()
                        .set("followers.$[elem].followerName", fullName)
                        .set("followers.$[elem].followerOccupation", occupation)
                        .set("followers.$[elem].followerImage", profileImage)
                        .filterArray(where("elem.id").is(userId))
        );

        followersBulkOps.execute();

        System.out.println("Bulk update for followings and followers completed successfully.");
    }
}

