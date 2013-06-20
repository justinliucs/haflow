package haflow.utility;

import haflow.module.Module;
import haflow.module.AbstractModule;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class ModuleLoader {
	private ClassHelper classHelper;

	private ClassHelper getClassHelper() {
		return classHelper;
	}

	@Autowired
	private void setClassHelper(ClassHelper classHelper) {
		this.classHelper = classHelper;
	}

	public Map<Module, AbstractModule> searchForModules(String packageName) {
		try {
			Map<Module, AbstractModule> modules = new HashMap<Module, AbstractModule>();
			List<String> classNames = this.getClassHelper().getClassNames(
					packageName, true);
			for (String className : classNames) {
				Class<?> moduleClass = Class.forName(className);
				if (moduleClass.isAnnotationPresent(Module.class)) {
					Object obj = moduleClass.newInstance();
					if (obj instanceof AbstractModule) {
						AbstractModule metadata = (AbstractModule) obj;
						Module module = moduleClass.getAnnotation(Module.class);
						modules.put(module, metadata);
					}
				}
			}
			return modules;
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}

	public Map<UUID, Class<?>> searchForModuleClasses(String packageName) {
		try {
			Map<UUID, Class<?>> moduleClasses = new HashMap<UUID, Class<?>>();
			List<String> classNames = this.getClassHelper().getClassNames(
					packageName, true);
			for (String className : classNames) {
				Class<?> moduleClass = Class.forName(className);
				if (moduleClass.isAnnotationPresent(Module.class)) {
					Object obj = moduleClass.newInstance();
					if (obj instanceof AbstractModule) {
						moduleClasses.put(
								UUID.fromString(moduleClass.getAnnotation(
										Module.class).id()), moduleClass);

					}
				}
			}
			return moduleClasses;
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}

	public Map<Module, AbstractModule> searchForModules() {
		return this.searchForModules("haflow.module");
	}

	public Map<UUID, Class<?>> searchForModuleClasses() {
		return this.searchForModuleClasses("haflow.module");
	}
}
