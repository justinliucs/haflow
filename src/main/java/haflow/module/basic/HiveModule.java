package haflow.module.basic;

import haflow.module.AbstractHiveModule;
import haflow.module.DataType;
import haflow.module.Module;
import haflow.module.ModuleConfiguration;
import haflow.module.ModuleEndpoint;
import haflow.module.ModuleType;

import java.util.Map;

@Module(id = "ada600a8-aa63-tttt-ca46-9999a0e0bd2f", name = "Hive", category = "Basic", type = ModuleType.HIVE,
	configurations = {
		@ModuleConfiguration(key = "sql", displayName = "Sql Command"),
		@ModuleConfiguration(key = "output_dir", displayName = "Output Directory"),}, 
	static_configurations={},
	inputs = { @ModuleEndpoint(name = "from", minNumber = 1, maxNumber = 1, dataType = DataType.PlainText) }, 
	outputs = { @ModuleEndpoint(name = "ok", minNumber = 1, maxNumber = 1, dataType = DataType.PlainText),
		@ModuleEndpoint(name = "error", minNumber = 1, maxNumber = 1, dataType = DataType.PlainText) })
public class HiveModule extends AbstractHiveModule {
	@Override
	public boolean validate(Map<String, String> configurations,
			Map<String, String> inputs, Map<String, String> outputs) {
		// TODO Auto-generated method stub
		return false;
	}

	public static void main(String[] args) {
		System.out.println("Demo Java Main");

		System.out.println("# Arguments: " + args.length);
		for (int i = 0; i < args.length; i++) {
			System.out.println("Argument[" + i + "]: " + args[i]);
		}
	}

	@Override
	public String getSQL() {
		// TODO Auto-generated method stub
		return null;
	}

}
