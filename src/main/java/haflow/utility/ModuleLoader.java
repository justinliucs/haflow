package haflow.utility;

import haflow.entity.Module;
import haflow.entity.ModuleConfiguration;
import haflow.module.ModuleMetadata;

import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.UUID;

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
			classNames.addAll(this.getClassHelper().getClassNames("hmodule", true));
			for (String className : classNames) {
				Class<?> moduleClass = Class.forName(className);
				if (moduleClass.isAnnotationPresent(haflow.module.Module.class)) {
					Object obj = moduleClass.newInstance();
					if (obj instanceof ModuleMetadata) {
						ModuleMetadata metadata = (ModuleMetadata) obj;
						Module module = new Module();
						module.setId(UUID.fromString(moduleClass.getAnnotation(
								haflow.module.Module.class).id()));
						module.setName(moduleClass.getAnnotation(
								haflow.module.Module.class).name());
						module.setCategory(moduleClass.getAnnotation(
								haflow.module.Module.class).category());
						module.setConfigurations(new HashSet<ModuleConfiguration>());
						if (moduleClass
								.isAnnotationPresent(haflow.module.ModuleConfiguration.class)) {
							haflow.module.ModuleConfiguration configuration = moduleClass
									.getAnnotation(haflow.module.ModuleConfiguration.class);
							int i;
							for (i = 0; i < configuration.configurationKeys().length; i++) {
								ModuleConfiguration moduleConfiguration = new ModuleConfiguration();
								moduleConfiguration.setKey(configuration
										.configurationKeys()[i]);
								moduleConfiguration
										.setDisplayName(configuration
												.configurationDisplayNames()[i]);
								module.getConfigurations().add(
										moduleConfiguration);
							}
						}
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
			classNames.addAll(this.getClassHelper().getClassNames("hmodule", true));
			for (String className : classNames) {
				Class<?> moduleClass = Class.forName(className);
				if (moduleClass.isAnnotationPresent(haflow.module.Module.class)) {
					Object obj = moduleClass.newInstance();
					if (obj instanceof ModuleMetadata) {
						moduleClasses.put(moduleClass.getAnnotation(
								haflow.module.Module.class).id(), moduleClass);
						
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
