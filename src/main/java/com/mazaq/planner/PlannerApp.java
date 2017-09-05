package com.mazaq.planner;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Import;

import com.mazaq.planner.configuration.JpaConfiguration;


@Import(JpaConfiguration.class)
@SpringBootApplication(scanBasePackages={"com.mazaq.planner"})// same as @Configuration @EnableAutoConfiguration @ComponentScan
public class PlannerApp {

	public static void main(String[] args) {
		SpringApplication.run(PlannerApp.class, args);
	}
}

