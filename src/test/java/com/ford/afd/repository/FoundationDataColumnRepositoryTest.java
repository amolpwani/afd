package com.ford.afd.repository;

import static org.assertj.core.api.Assertions.assertThat;
import static org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase.Replace.NONE;

import java.util.List;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit4.SpringRunner;

import com.ford.afd.model.FoundationDataColumn;
import com.ford.afd.repository.FoundationDataColumnRepository;


/**
 * Created by dudekula.abedin on 1/8/2018.
 */

@ActiveProfiles("test")
@RunWith(SpringRunner.class)
@DataJpaTest
@AutoConfigureTestDatabase(replace = NONE)
public class FoundationDataColumnRepositoryTest {
	@Autowired
	private TestEntityManager entityManager;
	@Autowired
	private FoundationDataColumnRepository foundationDataColumnRepository;
	@Test
	public void directFoundationDataColumn() {
		String column1Name = "Column" + System.nanoTime();
		FoundationDataColumn foundationDataColumn1 = new FoundationDataColumn();
		foundationDataColumn1.setUiColumnName(column1Name);
		foundationDataColumn1.setHoverHelp("Column1 Help");
		foundationDataColumn1.getUniqueColumn('Y');
		foundationDataColumn1.setValue("List");
		foundationDataColumn1.setMandatory('Y');
		foundationDataColumn1.setSortOrder(1);
		foundationDataColumn1.setEditable('N');
		foundationDataColumn1.setLength(50);
		foundationDataColumn1.setInputType("List");
		entityManager.persist(foundationDataColumn1);
		entityManager.flush();
		
		column1Name = "Column" + System.nanoTime();
		FoundationDataColumn foundationDataColumn2 = new FoundationDataColumn();
		foundationDataColumn2.setUiColumnName(column1Name);
		foundationDataColumn2.setHoverHelp("Column2 Help");
		foundationDataColumn2.getUniqueColumn('N');
		foundationDataColumn2.setValue("List");
		foundationDataColumn2.setMandatory('N');
		foundationDataColumn2.setSortOrder(1);
		foundationDataColumn2.setEditable('Y');
		foundationDataColumn2.setLength(50);
		foundationDataColumn2.setInputType("List");
		entityManager.persist(foundationDataColumn2);
		entityManager.flush();
		
		//given
		List<FoundationDataColumn> foundationDataColumns = foundationDataColumnRepository.findAll();
		for (FoundationDataColumn foundationDataColumn : foundationDataColumns) {
			if (foundationDataColumn.getUiColumnName().equals(foundationDataColumn1.getUiColumnName())) {
				//then
				FoundationDataColumn foundationDataColumnTemp = foundationDataColumnRepository.findOne(foundationDataColumn.getId());
				assertThat(foundationDataColumnTemp.getUiColumnName()).isEqualTo(foundationDataColumn1.getUiColumnName());
			} else if (foundationDataColumn.getUiColumnName().equals(foundationDataColumn2.getUiColumnName())) {
				//then
				FoundationDataColumn foundationDataColumnTemp = foundationDataColumnRepository.findOne(foundationDataColumn.getId());
				assertThat(foundationDataColumnTemp.getUiColumnName()).isEqualTo(foundationDataColumn2.getUiColumnName());
			}
		}
	}

	@Test
	public void foundationDataColumnById() {
		String column1Name = "Column" + System.nanoTime();
		FoundationDataColumn foundationDataColumn1 = new FoundationDataColumn();
		foundationDataColumn1.setUiColumnName(column1Name);
		foundationDataColumn1.setHoverHelp("Column1 Help");
		foundationDataColumn1.getUniqueColumn('Y');
		foundationDataColumn1.setValue("List");
		foundationDataColumn1.setMandatory('Y');
		foundationDataColumn1.setSortOrder(1);
		foundationDataColumn1.setEditable('N');
		foundationDataColumn1.setLength(50);
		foundationDataColumn1.setInputType("List");
		entityManager.persist(foundationDataColumn1);
		entityManager.flush();
		
		List<FoundationDataColumn> foundationDataColumns = foundationDataColumnRepository.findAll();
		for (FoundationDataColumn foundationDataColumn : foundationDataColumns) {
			if (foundationDataColumn.getUiColumnName().equals(foundationDataColumn1.getUiColumnName())) {
				//then
				FoundationDataColumn foundationDataColumnTemp = foundationDataColumnRepository.findOne(foundationDataColumn.getId());
				assertThat(foundationDataColumnTemp.getUiColumnName()).isEqualTo(foundationDataColumn1.getUiColumnName());
			}
		}
	}
	
	@Test
	public void updateFoundationDataColumn() {

		String column1Name = "Column" + System.nanoTime();
		FoundationDataColumn foundationDataColumn1 = new FoundationDataColumn();
		foundationDataColumn1.setUiColumnName(column1Name);
		foundationDataColumn1.setHoverHelp("Column1 Help");
		foundationDataColumn1.getUniqueColumn('Y');
		foundationDataColumn1.setValue("List");
		foundationDataColumn1.setMandatory('Y');
		foundationDataColumn1.setSortOrder(1);
		foundationDataColumn1.setEditable('N');
		foundationDataColumn1.setLength(50);
		foundationDataColumn1.setInputType("List");
		entityManager.persist(foundationDataColumn1);
		entityManager.flush();

		List<FoundationDataColumn> foundationDataColumns = foundationDataColumnRepository.findAll();
		for (FoundationDataColumn foundationDataColumn : foundationDataColumns) {
			
			if (foundationDataColumn.getUiColumnName().equals(foundationDataColumn1.getUiColumnName())) {
				//then
				FoundationDataColumn foundationDataColumnTemp = foundationDataColumnRepository.findOne(foundationDataColumn.getId());

				FoundationDataColumn foundationDataColumn2 = new FoundationDataColumn();
				foundationDataColumn2.setUiColumnName("Column1");
				foundationDataColumn2.setHoverHelp("Column1 Help");
				foundationDataColumn2.getUniqueColumn('Y');
				foundationDataColumn2.setValue("List");
				foundationDataColumn2.setMandatory('Y');
				foundationDataColumn2.setSortOrder(1);
				foundationDataColumn2.setEditable('N');
				foundationDataColumn2.setLength(50);
				foundationDataColumn2.setInputType("List");
				
				BeanUtils.copyProperties(foundationDataColumn2, foundationDataColumn);
				assertThat(foundationDataColumnTemp.getUiColumnName()).isEqualTo(foundationDataColumn1.getUiColumnName());
			}
		}
	}
	
	@Test
	public void deleteListDataById() {
		
		String column1Name = "Column" + System.nanoTime();
		FoundationDataColumn foundationDataColumn1 = new FoundationDataColumn();
		foundationDataColumn1.setUiColumnName(column1Name);
		foundationDataColumn1.setHoverHelp("Column1 Help");
		foundationDataColumn1.getUniqueColumn('Y');
		foundationDataColumn1.setValue("List");
		foundationDataColumn1.setMandatory('Y');
		foundationDataColumn1.setSortOrder(1);
		foundationDataColumn1.setEditable('N');
		foundationDataColumn1.setLength(50);
		foundationDataColumn1.setInputType("List");
		entityManager.persist(foundationDataColumn1);
		entityManager.flush();

		List<FoundationDataColumn> foundationDataColumns = foundationDataColumnRepository.findAll();
		for (FoundationDataColumn foundationDataColumn : foundationDataColumns) {
			
			if (foundationDataColumn.getUiColumnName().equals(foundationDataColumn1.getUiColumnName())) {
				//then
				FoundationDataColumn foundationDataColumnTemp = foundationDataColumnRepository.findOne(foundationDataColumn.getId());
				foundationDataColumnRepository.delete(foundationDataColumnTemp);
				assertThat(foundationDataColumnTemp.getUiColumnName()).isEqualTo(foundationDataColumn1.getUiColumnName());
			}
		}
	}
	
	@Test
	public void createFoundationDataColumn() {
		String column1Name = "Column" + System.nanoTime();
		FoundationDataColumn foundationDataColumn1 = new FoundationDataColumn();
		foundationDataColumn1.setUiColumnName(column1Name);
		foundationDataColumn1.setHoverHelp("Column1 Help");
		foundationDataColumn1.getUniqueColumn('Y');
		foundationDataColumn1.setValue("List");
		foundationDataColumn1.setMandatory('Y');
		foundationDataColumn1.setSortOrder(1);
		foundationDataColumn1.setEditable('N');
		foundationDataColumn1.setLength(50);
		foundationDataColumn1.setInputType("List");
		foundationDataColumnRepository.save(foundationDataColumn1);

		List<FoundationDataColumn> foundationDataColumns = foundationDataColumnRepository.findAll();
		for (FoundationDataColumn foundationDataColumn : foundationDataColumns) {
			
			if (foundationDataColumn.getUiColumnName().equals(foundationDataColumn1.getUiColumnName())) {
				//then
				FoundationDataColumn foundationDataColumnTemp = foundationDataColumnRepository.findOne(foundationDataColumn.getId());
				assertThat(foundationDataColumnTemp.getUiColumnName()).isEqualTo(foundationDataColumn1.getUiColumnName());
			}
		}
	}
}
