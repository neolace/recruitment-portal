package com.hris.HRIS_job_portal;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
@EnableAsync
public class HrisJobPortalApplication {

	public static void main(String[] args) {
		SpringApplication.run(HrisJobPortalApplication.class, args);
	}

}
