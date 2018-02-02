package com.ford.afd.datasource;

import liquibase.integration.spring.SpringLiquibase;
import org.apache.log4j.Logger;
import org.springframework.cloud.Cloud;
import org.springframework.cloud.CloudException;
import org.springframework.cloud.CloudFactory;
import org.springframework.stereotype.Component;

import javax.sql.DataSource;
import java.sql.SQLException;

@Component
public class MySqlDataSource implements AfdDataSource {
    private static final Logger LOGGER = Logger.getLogger(MySqlDataSource.class);

    @Override
    public DataSource create() throws SQLException {
        DataSource dataSource = null;
        try {
            dataSource = fetchCloudFromFactory().getSingletonServiceConnector(DataSource.class, null);
            executeLiquibaseScript(dataSource);
        } catch (CloudException ce) {
            LOGGER.error("CloudException : " + ce.getMessage());
        }
        return dataSource;
    }

    protected Cloud fetchCloudFromFactory() {
        return new CloudFactory().getCloud();
    }

    private void executeLiquibaseScript(DataSource dataSource) throws SQLException {
        new SpringLiquibase().setDataSource(dataSource);
    }


}
