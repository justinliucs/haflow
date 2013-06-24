package haflow.module.zrace;

import haflow.module.AbstractJavaModule;
import haflow.module.DataType;
import haflow.module.Module;
import haflow.module.ModuleConfiguration;
import haflow.module.ModuleEndpoint;
import haflow.module.ModuleType;

import java.util.Map;

@Module(id = "ada600a8-aa63-968a-ca46-1234a0e0bd2f", name = "Preprocess", category = "zrace", type = ModuleType.JAVA,
	configurations = {
		@ModuleConfiguration(key = "input", displayName = "Input Path"),
		@ModuleConfiguration(key = "output", displayName = "Output Path"),}, 
	static_configurations={},
	inputs = { @ModuleEndpoint(name = "from", minNumber = 1, maxNumber = 1, dataType = DataType.PlainText) }, 
	outputs = { @ModuleEndpoint(name = "ok", minNumber = 1, maxNumber = 1, dataType = DataType.PlainText),
		@ModuleEndpoint(name = "error", minNumber = 1, maxNumber = 1, dataType = DataType.PlainText) })
public class PreprocessModule extends AbstractJavaModule {

	@Override
	public boolean validate(Map<String, String> configurations,
			Map<String, String> inputs, Map<String, String> outputs) {
		// TODO Auto-generated method stub
		return false;
	}
	
	@Override
	public String getMainClass(){
		return PreprocessModule.class.getName();
	}

	public static void main(String[] args) {
		System.out.println("Demo Java Main");

		System.out.println("# Arguments: " + args.length);
		for (int i = 0; i < args.length; i++) {
			System.out.println("Argument[" + i + "]: " + args[i]);
		}
	}

}
