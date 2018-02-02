package com.ford.afd.datasource;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.apache.log4j.Logger;
import org.springframework.jdbc.datasource.SimpleDriverDataSource;
import org.springframework.stereotype.Component;

import javax.sql.DataSource;
import java.io.IOException;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.util.List;
import java.util.Map;
import java.util.Objects;

import static java.util.Objects.isNull;

@Component
public class SqlServerDataSource implements AfdDataSource {
    private static final Logger LOGGER = Logger.getLogger(SqlServerDataSource.class);

    @Override
    public DataSource create() throws SQLException {
        Map<String, Object> dataSourcePropertiesFromCups = null;
        try {
            dataSourcePropertiesFromCups = getCupsGroup();
        } catch (IOException e) {
            LOGGER.error("Error while getting SQL server properties : "+e.getMessage());
        }
        String dbUrl = retrieveStringValue(dataSourcePropertiesFromCups.get("url"));
        String dbUser = retrieveStringValue(dataSourcePropertiesFromCups.get("username"));
        String dbPassword = retrieveStringValue(dataSourcePropertiesFromCups.get("password"));
        return createDataSource(dbUrl, dbUser, dbPassword);
    }

    private DataSource createDataSource(final String dataSourceUrl, final String dataSourceUser, final String dataSourcePassword) throws SQLException {
        return new SimpleDriverDataSource(DriverManager.getDriver(dataSourceUrl), dataSourceUrl, dataSourceUser, dataSourcePassword);
    }

    @SuppressWarnings("unchecked")
    private Map<String, Object> getCupsGroup() throws IOException {
        String cupsJsonAsString = getEnvVariable("VCAP_SERVICES");
        LOGGER.info("cupsJsonAsString:" + cupsJsonAsString);
        ObjectMapper mapper = new ObjectMapper();
        Map<String, Object> vcapMap = mapper.readValue(cupsJsonAsString, Map.class);
        return vcapMap.entrySet().stream()
                .filter(vcapItem -> vcapItem.getKey().equals("user-provided"))
                .map(vcapEntry -> (List<Map<String, Object>>) vcapEntry.getValue())
                .map(listElement -> listElement.stream()
                        .map(asMap -> (Map<String, Object>) asMap.get("credentials"))
                        .map(credentialItem -> (Map<String, Object>) credentialItem.get("dataSource"))
                        .filter(Objects::nonNull)
                        .findFirst()
                        .orElse(null))
                .filter(Objects::nonNull)
                .findFirst().orElse(null);
    }

    String getEnvVariable(String parameterName) {
        return System.getenv(parameterName);
    }

    private String retrieveStringValue(Object value) {
        return isNull(value) ? null : String.valueOf(value);
    }

}
