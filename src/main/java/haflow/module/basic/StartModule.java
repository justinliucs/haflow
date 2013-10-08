package haflow.module.basic;

import haflow.module.AbstractModule;
import haflow.module.DataType;
import haflow.module.Module;
import haflow.module.ModuleEndpoint;
import haflow.module.ModuleType;

import java.util.Map;

@Module(id = "a208d7d2-a8ff-2493-64c2-36f50bc95752", name = "Start", category = "Basic", type = ModuleType.START, configurations = {}, inputs = {}, outputs = { @ModuleEndpoint(name = "to", maxNumber = 1, minNumber = 1, dataType = DataType.PlainText) })
public final class StartModule extends AbstractModule {

	@Override
	public boolean validate(Map<String, String> configurations,
			Map<String, String> inputs, Map<String, String> outputs) {
		// TODO Auto-generated method stub
		return false;
	}

}
