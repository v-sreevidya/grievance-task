package com.example.grievance;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.transaction.annotation.EnableTransactionManagement;

@SpringBootApplication
@EnableTransactionManagement
public class GrievanceManagementApplication {

	public static void main(String[] args) {
		SpringApplication.run(GrievanceManagementApplication.class, args);
	}

}
