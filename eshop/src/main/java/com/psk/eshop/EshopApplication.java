package com.psk.eshop;

import com.psk.eshop.interceptors.LoggingInterceptor;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@SpringBootApplication
public class EshopApplication {

	public static void main(String[] args) {
		SpringApplication.run(EshopApplication.class, args);
	}

	@Configuration
	public static class InterceptorConfig implements WebMvcConfigurer {
		@Override
		public void addInterceptors(InterceptorRegistry registry) {
			registry.addInterceptor(new LoggingInterceptor())
					.addPathPatterns("/e-shop/**");
		}
	}

}
