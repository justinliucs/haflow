package haflow.utility;

import haflow.module.Module;
import haflow.module.ModuleMetadata;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class ModuleLoader {
	private ClassHelper classHelper;

	public ClassHelper getClassHelper() {
		return classHelper;
	}

	@Autowired
	public void setClassHelper(ClassHelper classHelper) {
		this.classHelper = classHelper;
	}

	public Map<Module, ModuleMetadata> searchForModules() {
		try {
			Map<Module, ModuleMetadata> modules = new HashMap<Module, ModuleMetadata>();
			List<String> classNames = this.getClassHelper().getClassNames(
					"haflow", true);
			for (String className : classNames) {
				Class<?> moduleClass = Class.forName(className);
				if (moduleClass.isAnnotationPresent(Module.class)) {
					Object obj = moduleClass.newInstance();
					if (obj instanceof ModuleMetadata) {
						ModuleMetadata metadata = (ModuleMetadata) obj;
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

	public Map<String, Class<?>> searchForModuleClasses() {
		try {
			Map<String, Class<?>> moduleClasses = new HashMap<String, Class<?>>();
			List<String> classNames = this.getClassHelper().getClassNames(
					"haflow", true);
			for (String className : classNames) {
				Class<?> moduleClass = Class.forName(className);
				if (moduleClass.isAnnotationPresent(haflow.module.Module.class)) {
					Object obj = moduleClass.newInstance();
					if (obj instanceof ModuleMetadata) {
						moduleClasses.put(
								moduleClass.getAnnotation(
										haflow.module.Module.class).id(),
								moduleClass);

					}
				}
			}
			return moduleClasses;
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}
}
