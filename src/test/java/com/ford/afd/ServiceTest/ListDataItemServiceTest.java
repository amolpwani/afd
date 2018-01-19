package com.ford.afd.ServiceTest;

import com.ford.afd.model.ListDataItem;
import com.ford.afd.repository.ListDataItemRepository;
import com.ford.afd.service.ListDataItemService;
import org.assertj.core.util.Lists;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.ArgumentCaptor;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.runners.MockitoJUnitRunner;
import java.util.ArrayList;
import java.util.List;
import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.when;

@RunWith(MockitoJUnitRunner.class)
public class ListDataItemServiceTest {

	@InjectMocks
	private ListDataItemService listDataItemService;

	@Mock
	private ListDataItemRepository listDataItemRepositoryMock;

	@Test
	public void allListData_shouldReturnEmptyWhenNoListDataFound() {
		//Arrange
		when(listDataItemRepositoryMock.findAll()).thenReturn(Lists.emptyList());
		//Act
		List<ListDataItem> actualResult = listDataItemService.allListDataItems();
		//Assert
		assertThat(actualResult).hasSize(0);
	}

	@Test
	public void allListData_shouldReturnValuesWhenListDataFound() {
		//Arrange
		List<ListDataItem> listDataItem = new ArrayList<>(1);
		listDataItem.add(buildListDataItem());
		when(listDataItemRepositoryMock.findAll()).thenReturn(listDataItem);
		//Act
		List<ListDataItem> actualResult = listDataItemService.allListDataItems();
		//Assert
		assertThat(actualResult).isEqualTo(listDataItem);
	}

	@Test
	public void saveListData_shouldSaveAListData() {
		//Arrange
		ArgumentCaptor<ListDataItem> listDataCaptor = ArgumentCaptor.forClass(ListDataItem.class);
		when(listDataItemRepositoryMock.save(listDataCaptor.capture()))
		.thenReturn(buildListDataItem());
		//Act
		listDataItemService.saveListDataItem(buildListDataItem());

		ListDataItem expectedEntity = buildListDataItem();
		expectedEntity.setId(1);
		//Assert
		assertThat(listDataCaptor.getValue()).isEqualToComparingFieldByField(expectedEntity);
	}

	@Test
	public void deleteListDataById_shouldInvokeDeleteOnRepository() {
		//Arrange
		ArgumentCaptor<ListDataItem> listDataCaptor = ArgumentCaptor.forClass(ListDataItem.class);
		doNothing().when(listDataItemRepositoryMock).delete(listDataCaptor.capture());
		//Act
		listDataItemService.deleteListDataItem(buildListDataItem());
		//Assert
		assertThat(listDataCaptor.equals(listDataCaptor));
	}

	@Test
	public void allListData_shouldRetrieveAllListData() {
		//Arrange
		List<ListDataItem> listDataItems = new ArrayList<>(1);
		listDataItems.add(buildListDataItem());
		when(listDataItemRepositoryMock.findAll()).thenReturn(listDataItems);
		//Act
		List<ListDataItem> actualListItemsData = listDataItemService.allListDataItems();
		//Assert
		assertThat(actualListItemsData).isNotNull();
		assertThat(actualListItemsData).hasSize(1);
		assertThat(actualListItemsData.get(0).getDescription()).isEqualTo("TestingBusiness");
	}

	private ListDataItem buildListDataItem() {
		ListDataItem entity = new ListDataItem("BU1", "TestingBusiness", true, 1 );
		entity.setId(1);
		return entity;
	}
}