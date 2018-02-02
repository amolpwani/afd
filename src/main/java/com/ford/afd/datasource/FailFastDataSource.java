package com.ford.swt.datasource;

import org.springframework.stereotype.Component;

import javax.sql.DataSource;
import java.sql.SQLException;

@Component
public class FailFastDataSource implements AfdDataSource {
    @Override
    public DataSource create() throws SQLException {
        throw new SQLException("No Datasource Configured!");
    }
}
