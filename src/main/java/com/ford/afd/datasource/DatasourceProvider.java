package com.ford.afd.datasource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.stereotype.Component;

import javax.sql.DataSource;
import java.sql.SQLException;
import java.util.HashMap;
import java.util.Map;

@Component
public class DatasourceProvider {

    private ApplicationContext applicationContext;

    @Autowired
    public DatasourceProvider(ApplicationContext applicationContext) {
        this.applicationContext = applicationContext;
    }

    public DataSource retrieve(String environment) throws SQLException {
        Class<? extends AfdDataSource> dataSourceClass = dataSourceContainer().getOrDefault(environment, FailFastDataSource.class);
        AfdDataSource dataSource = retrieveBean(dataSourceClass);
        return dataSource.create();
    }

    AfdDataSource retrieveBean(Class<? extends AfdDataSource> dataSourceClass) {
        return applicationContext.getBean(dataSourceClass);
    }

    private Map<String, Class<? extends AfdDataSource>> dataSourceContainer() {
        Map<String, Class<? extends AfdDataSource>> dataSources = new HashMap<>();
        dataSources.put("local", H2DataSource.class);
        return dataSources;
    }
}
