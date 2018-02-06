package com.ford.afd.datasource;

import java.sql.DriverManager;
import java.sql.SQLException;

import javax.sql.DataSource;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.jdbc.datasource.SimpleDriverDataSource;
import org.springframework.stereotype.Component;

@Component
public class H2DataSource implements AfdDataSource {
    private static final Logger LOGGER = Logger.getLogger(H2DataSource.class);
    private String url;
    private String username;
    private String password;

    @Autowired
    public H2DataSource(@Value("${spring.datasource.url:}") String url,
                        @Value("${spring.datasource.username:}") String user,
                        @Value("${spring.datasource.password:}") String password) {
        this.url = url;
        this.username = user;
        this.password = password;
    }

    @Override
    public DataSource create() throws SQLException {
        LOGGER.info("url : "+url+" , username : "+username+ " , password : "+password);
        DataSource dataSource = new SimpleDriverDataSource(DriverManager.getDriver(url), url, username, password);
        LOGGER.info("Executing SQL liquibase scripts");
        //executeLiquibaseScript(dataSource);
        return dataSource;
    }
//
//    private void executeLiquibaseScript(DataSource dataSource) throws SQLException {
//        new SpringLiquibase().setDataSource(dataSource);
//    }
}
