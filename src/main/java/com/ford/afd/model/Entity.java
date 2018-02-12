package com.ford.afd.model;

import java.io.Serializable;
import java.util.Date;

public interface Entity extends Serializable {
	
	public void setCreatedDate(Date createdDate);

	public void setUpdatedDate(Date updatedDate);

	public void setUserId(long userId);
}
