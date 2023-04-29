package com.example.backend.config;

import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurationSupport;

public class WebMvcConfig extends WebMvcConfigurationSupport {

    @Override
    protected void addResourceHandlers(final ResourceHandlerRegistry registry) {
      registry
          .addResourceHandler("swagger-ui.html")
          .addResourceLocations("classpath:/META-INF/resources/");
      registry
          .addResourceHandler("/webjars/**")
          .addResourceLocations("classpath:/META-INF/resources/webjars/");
    }
}
