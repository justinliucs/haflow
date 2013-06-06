package haflow.test;

import haflow.utility.ClassHelper;

import org.junit.Test;

import java.util.List;

public class ClassHelperTest {
	@Test
	public void test() {
		ClassHelper classHelper = new ClassHelper();
		List<String> classes = classHelper.getClassNames("haflow.module", true);
		if (classes != null) {
			for (String c : classes) {
				System.out.println(c);
			}
		}
	}
}
