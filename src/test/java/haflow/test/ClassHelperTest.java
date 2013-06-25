package haflow.test;

import java.util.List;

import haflow.util.ClassHelper;

import org.junit.Assert;
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
	public void testGetClassNamesFromFileSystem() {
		List<String> classNames = this.getClassHelper().getClassNames(
				this.getClass().getPackage().getName(), false);
		Assert.assertTrue(classNames.contains(this.getClass().getName()));
	}

	@Test
	public void testGetClassNamesFromJar() {
		List<String> classNames = this.getClassHelper().getClassNames(
				Autowired.class.getPackage().getName(), false);
		Assert.assertTrue(classNames.contains(Autowired.class.getName()));
	}

	@Test
	public void testGetClassNamesFromBothFileSystemAndJar() {
		// TODO
	}
}
