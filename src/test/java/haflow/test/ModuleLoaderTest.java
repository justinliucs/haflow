package haflow.test;

import java.util.Map;
import java.util.UUID;

import haflow.module.Module;
import haflow.module.ModuleMetadata;
import haflow.utility.ModuleLoader;

import org.junit.Assert;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.AbstractJUnit4SpringContextTests;

@ContextConfiguration(locations = "classpath:servlet-context.xml")
public class ModuleLoaderTest extends AbstractJUnit4SpringContextTests {
	private ModuleLoader moduleLoader;

	private ModuleLoader getModuleLoader() {
		return moduleLoader;
	}

	@Autowired
	private void setModuleLoader(ModuleLoader moduleLoader) {
		this.moduleLoader = moduleLoader;
	}

	@Test
	public void testSearchForModule() {
		Map<Module, ModuleMetadata> map = this.getModuleLoader()
				.searchForModules();
		Assert.assertNotNull(map);
		Assert.assertTrue(map.keySet().size() > 0);
	}

	@Test
	public void testSearchForModuleClasses() {
		Map<UUID, Class<?>> map = this.getModuleLoader()
				.searchForModuleClasses();
		Assert.assertNotNull(map);
		Assert.assertTrue(map.keySet().size() > 0);
	}

	@Test
	public void testSearchForModuleInAnotherPackage() {
		Map<Module, ModuleMetadata> map = this.getModuleLoader()
				.searchForModules("haflow.test");
		Assert.assertNotNull(map);
		Assert.assertTrue(map.keySet().size() > 0);
		boolean contains = false;
		ModuleMetadata metadata = null;
		for (Module module : map.keySet()) {
			if (module.name().equals("TestModule")) {
				contains = true;
				metadata = map.get(module);
				break;
			}
		}
		Assert.assertTrue(contains);
		Assert.assertNotNull(metadata);
		Assert.assertEquals("Test", metadata.generate(null, null, null));
	}

	@Test
	public void testSearchForModuleClassesInAnotherPackage() {
		Map<UUID, Class<?>> map = this.getModuleLoader()
				.searchForModuleClasses("haflow.test");
		Assert.assertNotNull(map);
		Assert.assertTrue(map.keySet().size() > 0);
		Assert.assertTrue(map.containsKey(UUID
				.fromString("92c5e828-0d02-bc7f-8825-7bbb6f48f2f1")));
	}
}