package com.ford.afd.datasource;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import javax.sql.DataSource;
import java.sql.SQLException;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;

@RunWith(SpringJUnit4ClassRunner.class)
public class DatasourceProviderTest {

    @Configuration
    @ComponentScan("com.ford.swt.datasource")
    static class TestConfig {}

    private DatasourceProvider datasourceProvider;

    @Autowired
    private ApplicationContext applicationContext;

    @Before
    public void setUp() {
        datasourceProvider = new DatasourceProvider(applicationContext);
    }

    @Test
    public void createsH2DatasourceForLocal() throws SQLException {
        DatasourceProvider datasourceProvider = new DatasourceProvider(applicationContext) {
            @Override
            AfdDataSource retrieveBean(Class<? extends AfdDataSource> dataSourceClass) {
                assertThat(dataSourceClass).isEqualTo(H2DataSource.class);
                return new EmptyDataSourceForTesting();
            }
        };
        datasourceProvider.retrieve("local");
    }

    class EmptyDataSourceForTesting implements AfdDataSource {
        @Override
        public DataSource create() throws SQLException {
            return null;
        }
    }

}
