package com.ford.afd;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
//@EnableAutoConfiguration(exclude = { DataSourceAutoConfiguration.class,WebMvcAutoConfiguration.class })
public class AfdApplication {

	public static void main(String[] args) {
		SpringApplication.run(AfdApplication.class, args);
	}
}
