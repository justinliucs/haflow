package haflow.service;

import haflow.service.FlowExecuteService;

import java.util.UUID;

import org.junit.Test;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

public class FlowExecuteServiceTest {

	private ApplicationContext context;

	@Test
	public void test() {
		context = new ClassPathXmlApplicationContext(new String[] {"servlet-context.xml"}); 
		FlowExecuteService fes = context.getBean(FlowExecuteService.class);
		fes.runFlow(UUID.fromString("67f1811e-c2b3-4a32-b70a-32f486a0a947"));
	}
	
	public static void main(String[] args) {
		ApplicationContext context = new ClassPathXmlApplicationContext(new String[] {"servlet-context.xml"}); 
		FlowExecuteService fes = context.getBean(FlowExecuteService.class);
		fes.runFlow(UUID.fromString("67f1811e-c2b3-4a32-b70a-32f486a0a947"));
	}
}
