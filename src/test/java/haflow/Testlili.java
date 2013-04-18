package haflow;

import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

public class Testlili {

	/**
	 * @param args
	 */
	public static void main(String[] args) {
		// TODO Auto-generated method stub
		ApplicationContext context = new ClassPathXmlApplicationContext(
		"applicationContext.xml");
		HelloWorld hl=(HelloWorld)context.getBean("bean1");
	    hl.sayhello();
	}

}
