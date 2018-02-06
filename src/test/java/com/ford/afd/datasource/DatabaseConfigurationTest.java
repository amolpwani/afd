package com.ford.afd.datasource;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.runners.MockitoJUnitRunner;

import javax.sql.DataSource;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;
import static org.junit.Assert.assertNotNull;
import static org.mockito.Matchers.any;
import static org.mockito.Mockito.when;

@RunWith(MockitoJUnitRunner.class)
public class DatabaseConfigurationTest {

    @Mock
    private DataSource expectedDataSource;

    @Mock
    private DatasourceProvider datasourceProvider;

    @InjectMocks
    private DatabaseConfiguration databaseConfiguration;

    @Test
    public void retrieveDataSourceFromCloudTile() throws Exception {
        when(datasourceProvider.retrieve(any())).thenReturn(expectedDataSource);

        DataSource actualDataSource = databaseConfiguration.dataSource();

        assertNotNull(actualDataSource);
        assertThat(actualDataSource).isEqualTo(expectedDataSource);
    }
}
