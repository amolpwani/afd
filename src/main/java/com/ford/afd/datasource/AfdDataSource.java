package com.ford.afd.datasource;

import javax.sql.DataSource;
import java.sql.SQLException;

public interface AfdDataSource {
    DataSource create() throws SQLException;
}
