package com.ford.afd.datasource;

import java.io.IOException;
import java.sql.SQLException;

import javax.sql.DataSource;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import org.springframework.data.domain.AuditorAware;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

import com.ford.afd.model.AuditorAwareImpl;

@Configuration
@EnableJpaAuditing(auditorAwareRef = "auditorAware")
public class DatabaseConfiguration {
    private static final Logger LOGGER = Logger.getLogger(DatabaseConfiguration.class);

    @Autowired
    DatasourceProvider datasourceProvider;

    String getEnvVariable(String parameterName) {
        String environment = System.getenv(parameterName);
        return (!org.springframework.util.StringUtils.isEmpty(environment) ? environment : "local");
    }

    @Bean
    @Primary
    public DataSource dataSource() throws SQLException, IOException {
        String envVariable = getEnvVariable("spring.profiles.active");
        LOGGER.info("Env value - spring.profiles.active : " + envVariable);
        return datasourceProvider.retrieve(envVariable);
    }
    
    @Bean
    public AuditorAware<String> auditorAware() {
        return new AuditorAwareImpl();
    }
}
