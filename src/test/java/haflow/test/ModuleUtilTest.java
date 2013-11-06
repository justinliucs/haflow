package haflow.test;

import java.util.Map;
import java.util.UUID;

import haflow.module.Module;
import haflow.module.AbstractModule;
import haflow.module.util.ModuleUtil;

import org.junit.Assert;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.AbstractJUnit4SpringContextTests;

@ContextConfiguration(locations = "classpath:servlet-context.xml")
public class ModuleUtilTest extends AbstractJUnit4SpringContextTests {
	private ModuleUtil moduleUtil;

	private ModuleUtil getModuleUtil() {
		return moduleUtil;
	}

	@Autowired
	private void setModuleUtil(ModuleUtil moduleUtil) {
		this.moduleUtil = moduleUtil;
	}

	@Test
	public void testSearchForModule() {
		Map<Module, AbstractModule> map = this.getModuleUtil()
				.searchForModules();
		Assert.assertNotNull(map);
		Assert.assertTrue(map.keySet().size() > 0);
	}

	@Test
	public void testSearchForModuleClasses() {
		Map<UUID, Class<?>> map = this.getModuleUtil().searchForModuleClasses();
		
		for(Map.Entry<UUID,Class<?>> m:map.entrySet()){
			System.out.println(m.getKey());
			System.out.println(m.getValue());
		}
		Assert.assertNotNull(map);
		Assert.assertTrue(map.keySet().size() > 0);
	}

	@Test
	public void testSearchForModuleInAnotherPackage() {
		Map<Module, AbstractModule> map = this.getModuleUtil()
				.searchForModules("haflow.test");
		Assert.assertNotNull(map);
		Assert.assertTrue(map.keySet().size() > 0);
		boolean contains = false;
		AbstractModule metadata = null;
		for (Module module : map.keySet()) {
			if (module.name().equals("TestModule")) {
				contains = true;
				metadata = map.get(module);
				break;
			}
		}
		Assert.assertTrue(contains);
		Assert.assertNotNull(metadata);
	}

	@Test
	public void testSearchForModuleClassesInAnotherPackage() {
		Map<UUID, Class<?>> map = this.getModuleUtil().searchForModuleClasses(
				"haflow.test");
		Assert.assertNotNull(map);
		Assert.assertTrue(map.keySet().size() > 0);
		Assert.assertTrue(map.containsKey(UUID
				.fromString("92c5e828-0d02-bc7f-8825-7bbb6f48f2f1")));
	}
}
