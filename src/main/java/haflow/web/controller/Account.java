package haflow.web.controller;

import java.math.BigDecimal;
import java.util.Date;
import java.util.concurrent.atomic.AtomicLong;

import org.springframework.core.style.ToStringCreator;

public class Account {

	private Long id;

	private String name;

	private BigDecimal balance = new BigDecimal("1000");

	private BigDecimal equityAllocation = new BigDecimal(".60");

	private Date renewalDate = new Date(new Date().getTime() + 31536000000L);

	public Long getId() {
		return id;
	}

	void setId(Long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public BigDecimal getBalance() {
		return balance;
	}

	public void setBalance(BigDecimal balance) {
		this.balance = balance;
	}

	public BigDecimal getEquityAllocation() {
		return equityAllocation;
	}

	public void setEquityAllocation(BigDecimal equityAllocation) {
		this.equityAllocation = equityAllocation;
	}

	public Date getRenewalDate() {
		return renewalDate;
	}

	public void setRenewalDate(Date renewalDate) {
		this.renewalDate = renewalDate;
	}

	Long assignId() {
		this.id = idSequence.incrementAndGet();
		return id;
	}

	private static final AtomicLong idSequence = new AtomicLong();

	public String toString() {
		return new ToStringCreator(this).append("id", id).append("name", name)
				.append("balance", balance).append("equityAllocation",
						equityAllocation).append("renewalDate", renewalDate)
				.toString();
	}

}