package haflow.test;

import java.util.List;

import haflow.utility.ClassHelper;

import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.AbstractJUnit4SpringContextTests;

@ContextConfiguration(locations = "classpath:servlet-context.xml")
public class ClassHelperTest extends AbstractJUnit4SpringContextTests {
	private ClassHelper classHelper;

	private ClassHelper getClassHelper() {
		return classHelper;
	}

	@Autowired
	private void setClassHelper(ClassHelper classHelper) {
		this.classHelper = classHelper;
	}

	@Test
	public void test() {
		List<String> classes = this.getClassHelper().getClassNames("haflow",
				true);
		for (String name : classes) {
			System.out.println(name);
		}
	}

}
