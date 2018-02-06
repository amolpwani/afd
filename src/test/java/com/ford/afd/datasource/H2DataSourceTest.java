package com.ford.afd.datasource;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.beans.factory.config.PropertyPlaceholderConfigurer;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.ClassPathResource;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import javax.sql.DataSource;
import java.sql.Connection;
import java.sql.SQLException;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;
import static org.junit.Assert.assertNotNull;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration
public class H2DataSourceTest {

    @Value("${spring.datasource.url}")
    String url;

    @Value("${spring.datasource.username}")
    String username;

    @Value("${spring.datasource.password}")
    String password;

    @Configuration
    @ComponentScan("com.ford.afd.datasource")
    static class TestConfig {
        @Bean
        PropertyPlaceholderConfigurer propertyConfig() {
            PropertyPlaceholderConfigurer ppc = new PropertyPlaceholderConfigurer();
            ppc.setLocation(new ClassPathResource("application.properties"));
            return ppc;
        }
    }

    @Test
    public void retrieveDataSourceFromPropertyFile() throws Exception {
        AfdDataSource h2DataSource = new H2DataSource(url, username, password);
        DataSource dataSource = h2DataSource.create();
        validateConnection(dataSource);
    }

    private void validateConnection(DataSource dataSource) throws SQLException {
        assertNotNull(dataSource);
        try (Connection connection = dataSource.getConnection()) {
            assertNotNull(connection);
            assertThat(connection.getMetaData().getURL()).isEqualTo("jdbc:h2:file:~/Local_DB1");
            assertThat(connection.getMetaData().getUserName()).isEqualToIgnoringCase("sa");
        }
    }
}
