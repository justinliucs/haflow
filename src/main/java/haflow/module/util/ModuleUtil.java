package haflow.module.util;

import haflow.module.AbstractModule;
import haflow.module.Module;
import haflow.util.ClassHelper;

import java.io.File;
import java.net.URL;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class ModuleUtil {
	private ClassHelper classHelper;

	private ClassHelper getClassHelper() {
		return classHelper;
	}

	@Autowired
	private void setClassHelper(ClassHelper classHelper) {
		this.classHelper = classHelper;
	}

	public boolean removeModule(UUID moduleId) {
		Map<Module, AbstractModule> modules = this.searchForModules();
		Module module = null;
		AbstractModule abstractModule = null;
		for (Module m : modules.keySet()) {
			if (UUID.fromString(m.id()).equals(moduleId)) {
				module = m;
				abstractModule = modules.get(module);
				break;
			}
		}
		if (module == null || abstractModule == null) {
			return false;
		}
		URL classFile = Thread
				.currentThread()
				.getContextClassLoader()
				.getResource(
						abstractModule.getClass().getCanonicalName()
								.replace(".", "/")
								+ ".class");
		String classFileName;
		if (classFile.getProtocol().equals("jar")) {
			classFileName = classFile.getFile().substring("file:".length(),
					classFile.getFile().indexOf("!"));
		} else {
			classFileName = classFile.getFile();
		}
		File file = new File(classFileName);
		return file.delete();
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

	public Map<UUID, Module> searchForModuleProtypes(String packageName) {
		try {
			Map<UUID, Module> modules = new HashMap<UUID, Module>();
			List<String> classNames = this.getClassHelper().getClassNames(
					packageName, true);
			for (String className : classNames) {
				Class<?> moduleClass = Class.forName(className);
				if (moduleClass.isAnnotationPresent(Module.class)) {
					if (memberOf(moduleClass.getClasses(), moduleClass)) {
						Module module = moduleClass.getAnnotation(Module.class);
						modules.put(UUID.fromString(module.id()), module);
					}
				}
			}
			return modules;
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}

	private boolean memberOf(Class<?>[] superClasses, Class<?> klass) {
		for (Class<?> kls : superClasses) {
			if (kls.equals(klass))
				return true;
		}
		return false;
	}

	public Map<Module, AbstractModule> searchForModules() {
		return this.searchForModules("haflow.module");
	}

	public Map<UUID, Class<?>> searchForModuleClasses() {
		return this.searchForModuleClasses("haflow.module");
	}

	public Map<UUID, Module> searchForModuleProtypes() {
		return this.searchForModuleProtypes("haflow.module");
	}
}
