package haflow.module.util;

import haflow.module.ModuleConfiguration;

import java.util.Comparator;

public class ModuleConfigurationComparator implements
		Comparator<ModuleConfiguration> {

	public int compare(ModuleConfiguration o1, ModuleConfiguration o2) {
		return o1.order() - o2.order();
	}

}
