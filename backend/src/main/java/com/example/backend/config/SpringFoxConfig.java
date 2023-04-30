package com.example.backend.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.servers.Server;

@Configuration
public class SpringFoxConfig {

    @Value("${swaggerBaseUrl}")
    private String baseUrl;

    @Bean
    public OpenAPI productApi() {
        final Info info = new Info()
            .title("Porjeto MC426")
            .description("REST API for Backend")
            .version("0.0.1-SNAPSHOT");

        return new OpenAPI()
            .info(info)
            .addServersItem(new Server().url(baseUrl));
    }

//    @Bean
//    public OpenApiCustomiser globalCustomiser() {
//        return openApi -> openApi
//            .getPaths()
//            .values()
//            .forEach(pathItem -> pathItem
//                .readOperations()
//                .forEach(operation -> {
//                    // parameters
//                    if (operation.getParameters() == null) {
//                        operation.setParameters(new ArrayList<>());
//                    }
//
//                    final Parameter authorization = new HeaderParameter()
//                        .name(ApiConstants.AUTHORIZATION)
//                        .description(authorizationDescription)
//                        .schema(new StringSchema())
//                        .required(true);
//                    operation
//                        .getParameters()
//                        .add(0, authorization);
//
//                    // responses
//                    if (operation.getResponses() == null) {
//                        operation.setResponses(new ApiResponses());
//                    }
//
//                    final ApiResponse forbiddenResponse = new ApiResponse().description("Access denied");
//                    operation
//                        .getResponses()
//                        .addApiResponse(String.valueOf(HttpStatus.FORBIDDEN.value()), forbiddenResponse);
//                }));
//    }

}
