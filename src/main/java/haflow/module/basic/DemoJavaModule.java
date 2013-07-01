package haflow.module.basic;

import haflow.module.AbstractJavaModule;
import haflow.module.DataType;
import haflow.module.Module;
import haflow.module.ModuleConfiguration;
import haflow.module.ModuleEndpoint;
import haflow.module.ModuleType;

import java.util.Map;

@Module(id = "ada600a8-aa63-968a-ca46-9085a0e0bd2f", name = "DemoJava", category = "Basic", type = ModuleType.JAVA, configurations = { @ModuleConfiguration(key = "arg_test", displayName = "Arguments Test", pattern = "^(.*)$", order = 1), }, inputs = { @ModuleEndpoint(name = "from", minNumber = 1, maxNumber = 1, dataType = DataType.PlainText, order = 1) }, outputs = {
		@ModuleEndpoint(name = "ok", minNumber = 1, maxNumber = 1, dataType = DataType.PlainText, order = 1),
		@ModuleEndpoint(name = "error", minNumber = 1, maxNumber = 1, dataType = DataType.PlainText, order = 2) })
public class DemoJavaModule extends AbstractJavaModule {

	@Override
	public boolean validate(Map<String, String> configurations,
			Map<String, String> inputs, Map<String, String> outputs) {
		// TODO Auto-generated method stub
		return false;
	}

	@Override
	public String getMainClass() {
		return DemoJavaModule.class.getName();
	}

	public static void main(String[] args) {
		System.out.println("Demo Java Main");

		System.out.println("# Arguments: " + args.length);
		for (int i = 0; i < args.length; i++) {
			System.out.println("Argument[" + i + "]: " + args[i]);
		}
	}

}
