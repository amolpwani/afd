package com.ford.afd.ServiceTest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.when;

import java.util.ArrayList;
import java.util.List;

import org.assertj.core.util.Lists;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.ArgumentCaptor;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.runners.MockitoJUnitRunner;

import com.ford.afd.model.FoundationDataColumn;
import com.ford.afd.repository.FoundationDataColumnRepository;
import com.ford.afd.service.FoundationDataColumnService;

@RunWith(MockitoJUnitRunner.class)
public class FoundationDataColumnServiceTest {

	@InjectMocks
	private FoundationDataColumnService foundationDataColumnService;

	@Mock
	private FoundationDataColumnRepository foundationDataColumnRepositoryMock;

	@Test
	public void allFoundationDataColumn_shouldReturnEmptyWhenNoFoundationDataColumnFound() {
		//Arrange
		when(foundationDataColumnRepositoryMock.findAll()).thenReturn(Lists.emptyList());
		//Act
		List<FoundationDataColumn> actualResult = foundationDataColumnService.allFoundationDataColumn();
		//Assert
		assertThat(actualResult).hasSize(0);
	}

	@Test
	public void allFoundationDataColumn_shouldReturnValuesWhenFoundationDataColumnFound() {
		//Arrange
		List<FoundationDataColumn> foundationDataColumn = new ArrayList<>(1);
		foundationDataColumn.add(buildFoundationDataColumn());
		when(foundationDataColumnRepositoryMock.findAll()).thenReturn(foundationDataColumn);
		//Act
		List<FoundationDataColumn> actualResult = foundationDataColumnService.allFoundationDataColumn();
		//Assert
		assertThat(actualResult).isEqualTo(foundationDataColumn);
	}

	@Test
	public void saveFoundationDataColumn_shouldSaveAFoundationDataColumn() {
		//Arrange
		ArgumentCaptor<FoundationDataColumn> foundationDataColumnCaptor = ArgumentCaptor.forClass(FoundationDataColumn.class);

		when(foundationDataColumnRepositoryMock.save(foundationDataColumnCaptor.capture()))
		.thenReturn(buildFoundationDataColumn());

		//Act
		foundationDataColumnService.saveFoundationDataColumn(buildFoundationDataColumn());

		FoundationDataColumn expectedEntity = buildFoundationDataColumn();
		expectedEntity.setId(1);

		//Assert
		assertThat(foundationDataColumnCaptor.getValue()).isEqualToComparingFieldByField(expectedEntity);
	}

	@Test
	public void deleteFoundationDataColumnById_shouldInvokeDeleteOnRepository() {
		//Arrange
		ArgumentCaptor<FoundationDataColumn> foundationDataColumnCaptor = ArgumentCaptor.forClass(FoundationDataColumn.class);
		doNothing().when(foundationDataColumnRepositoryMock).delete(foundationDataColumnCaptor.capture());
		//Act
		foundationDataColumnService.deleteFoundationDataColumn(buildFoundationDataColumn());
		//Assert
		assertThat(foundationDataColumnCaptor.equals(foundationDataColumnCaptor));
	}

	@Test
	public void allFoundationDataColumn_shouldRetrieveAllFoundationDataColumn() {
		//Arrange
		List<FoundationDataColumn> foundationDataColumn = new ArrayList<>(1);
		foundationDataColumn.add(buildFoundationDataColumn());
		when(foundationDataColumnRepositoryMock.findAll()).thenReturn(foundationDataColumn);
		//Act
		List<FoundationDataColumn> actualFoundationDataColumn = foundationDataColumnService.allFoundationDataColumn();
		//Assert
		assertThat(actualFoundationDataColumn).isNotNull();
		assertThat(actualFoundationDataColumn).hasSize(1);
		assertThat(actualFoundationDataColumn.get(0).getUiColumnName()).isEqualTo("Column1");
		assertThat(actualFoundationDataColumn.get(0).getHoverHelp()).isEqualTo("Column1 Help");
	}

	private FoundationDataColumn buildFoundationDataColumn() {
		FoundationDataColumn entity = new FoundationDataColumn("Column1", "Column1 Help", true, "List", "BU", true, 1, false, 10);
		entity.setId(1);
		return entity;
	}
}