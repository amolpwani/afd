package com.ford.afd.controller;

import static org.assertj.core.api.Assertions.assertThat;

import java.net.URL;
import java.util.ArrayList;
import java.util.List;

import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.embedded.LocalServerPort;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.test.context.junit4.SpringRunner;

import com.ford.afd.model.FoundationDataColumn;
import com.ford.afd.service.FoundationDataColumnService;

@RunWith(SpringRunner.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class FoundationDataColumnControllerTest {

	@LocalServerPort
	private int port = 8080;

	private URL base;

	@Autowired
	private TestRestTemplate template;

	@Autowired
	private FoundationDataColumnService foundationDataColumnService;

	private List<Integer> testEntitiesId = new ArrayList<>();
	
	private final String column1Name = "Column" + System.nanoTime();
	private final String column2Name = "Column" + System.nanoTime();

	@Before
	public void setUp() throws Exception {
		FoundationDataColumn foundationDataColumn1 = foundationDataColumnService.saveFoundationDataColumn(buildFoundationDataColumn(column1Name, "Column1 Help", true, "List", "BU", true, 1, false, 10));
		FoundationDataColumn foundationDataColumn2 = foundationDataColumnService.saveFoundationDataColumn(buildFoundationDataColumn(column2Name, "Column2 Help", false, "List", "BU1", false, 2, true, 10));
		testEntitiesId.add(foundationDataColumn1.getId());
		testEntitiesId.add(foundationDataColumn2.getId());
		this.base = new URL("http://localhost:" + port);
	}

	@After
	public void tearDown() {
		for (Integer foundationDataColumnId : testEntitiesId) {
			foundationDataColumnService.deleteFoundationDataColumn(foundationDataColumnService.findFoundationDataColumnById(foundationDataColumnId));
		}
	}

	private FoundationDataColumn buildFoundationDataColumn(String uiColumnName, String hoverHelp, boolean unique, String inputType, String value,
			boolean mandatory, int sortOrder, boolean editable, int length) {
		return new FoundationDataColumn(uiColumnName, hoverHelp, unique, inputType, value, mandatory, sortOrder, editable, length);
	}

	@Test
	public void shouldRetrieveOneFoundationDataColumn() throws Exception {
		//Act
		ParameterizedTypeReference<FoundationDataColumn> returnType = new ParameterizedTypeReference<FoundationDataColumn>() {
		};
		ResponseEntity<FoundationDataColumn> actualResponse =  template.exchange(
				base.toString() + "/foundationdatacolumn/getFoundationColumn/" + testEntitiesId.get(0),
				HttpMethod.GET,
				null,
				returnType);

		//Assert
		assertThat(actualResponse.getStatusCode()).isEqualTo(HttpStatus.OK);
		FoundationDataColumn expectedFoundationDataColumn = new FoundationDataColumn(column1Name, "Column1 Help", true, "List", "BU", true, 1, false, 10);

		expectedFoundationDataColumn.setId(testEntitiesId.get(0));
		assertThat(actualResponse.getBody()).isEqualToComparingFieldByField(expectedFoundationDataColumn);
	}

	@Test
	public void shouldRetrieveAllFoundationDataColumn() {
		//Act
		ParameterizedTypeReference<List<FoundationDataColumn>> returnType = new ParameterizedTypeReference<List<FoundationDataColumn>>() {
		};

		ResponseEntity<List<FoundationDataColumn>> actualResponse =  template.exchange(
				base.toString() + "/foundationdatacolumn/getFoundationColumn",
				HttpMethod.GET,
				null,
				returnType);
		//Assert
		assertThat(actualResponse.getStatusCode()).isEqualTo(HttpStatus.OK);
	}

	@Test
	public void shouldUpdateFoundationDataColumn() throws Exception {
		//Act
		ParameterizedTypeReference<FoundationDataColumn> returnType = new ParameterizedTypeReference<FoundationDataColumn>() {
		};
		
		String updatedColumn1Name = "Column" + System.nanoTime();

		FoundationDataColumn updateFoundationDataColumn = new FoundationDataColumn(updatedColumn1Name, "Updated Column1 Help", true, "List", "BU", true, 1, false, 10);
		updateFoundationDataColumn.setId(testEntitiesId.get(0));

		ResponseEntity<FoundationDataColumn> actualResponse =  template.exchange(
				base.toString() + "/foundationdatacolumn/getFoundationColumn/" + testEntitiesId.get(0),
				HttpMethod.PUT,
				new HttpEntity<FoundationDataColumn>(updateFoundationDataColumn, new HttpHeaders()),
				FoundationDataColumn.class,
				returnType);

		//Assert
		FoundationDataColumn actualBody = actualResponse.getBody();
		assertThat(actualResponse.getStatusCode()).isEqualTo(HttpStatus.OK);
		FoundationDataColumn expectedFoundationDataColumn = new FoundationDataColumn(updatedColumn1Name, "Updated Column1 Help", true, "List", "BU", true, 1, false, 10);
		expectedFoundationDataColumn.setId(testEntitiesId.get(0));
		assertThat(actualResponse.getBody()).isEqualToComparingFieldByField(expectedFoundationDataColumn);
	}

	@Test
	public void shouldDeleteFoundationDataColumnById() {
		//Act
		ParameterizedTypeReference<List<FoundationDataColumn>> returnType = new ParameterizedTypeReference<List<FoundationDataColumn>>() {
		};

		template.delete(
				base.toString() + "/foundationdatacolumn/getFoundationColumn/"+ testEntitiesId.get(0));

		testEntitiesId.remove(testEntitiesId.get(0));

		ResponseEntity<List<FoundationDataColumn>> actualResponse =  template.exchange(
				base.toString() + "/foundationdatacolumn/getFoundationColumn",
				HttpMethod.GET,
				null,
				returnType);

		//Assert
		assertThat(actualResponse.getStatusCode()).isEqualTo(HttpStatus.OK);
	}

	@Test
	public void shouldCreateFoundationDataColumn() throws Exception {
		//Act
		ParameterizedTypeReference<FoundationDataColumn> returnType = new ParameterizedTypeReference<FoundationDataColumn>() {
		};

		String column3Name = "Column" + System.nanoTime();
		FoundationDataColumn createFoundationDataColumn = new FoundationDataColumn(column3Name, "Column3 Help", true, "List", "BU", true, 1, false, 10);

		ResponseEntity<FoundationDataColumn> actualResponse =  template.exchange(
				base.toString() + "/foundationdatacolumn/getFoundationColumn/",
				HttpMethod.POST,
				new HttpEntity<FoundationDataColumn>(createFoundationDataColumn, new HttpHeaders()),
				FoundationDataColumn.class,
				returnType);

		//Assert
		FoundationDataColumn actualBody = actualResponse.getBody();
		testEntitiesId.add(actualBody.getId());
		assertThat(actualResponse.getStatusCode()).isEqualTo(HttpStatus.OK);
		FoundationDataColumn expectedFoundationDataColumn = new FoundationDataColumn(column3Name, "Column3 Help", true, "List", "BU", true, 1, false, 10);
		expectedFoundationDataColumn.setId(actualBody.getId());
		assertThat(actualBody).isEqualToComparingFieldByField(expectedFoundationDataColumn);
	}
}