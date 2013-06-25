package haflow.module.util;

import haflow.module.ModuleEndpoint;

import java.util.Comparator;

public class ModuleEndpointComparator implements Comparator<ModuleEndpoint> {

	public int compare(ModuleEndpoint o1, ModuleEndpoint o2) {
		return o1.order() - o2.order();
	}

}
