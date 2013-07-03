package haflow.module.datamining;

import haflow.module.AbstractJavaModule;
import haflow.module.DataType;
import haflow.module.Module;
import haflow.module.ModuleConfiguration;
import haflow.module.ModuleConfigurationType;
import haflow.module.ModuleEndpoint;
import haflow.module.ModuleType;

import java.util.Map;

@Module(id = "ada600a8-aa63-968a-ca46-4356a0e0bdab", name = "Describe", category = "datamining", type = ModuleType.JAVA, 
	configurations = {
		@ModuleConfiguration(key = "path", displayName = "Data path", pattern = "^(.*)$", type=ModuleConfigurationType.PLAIN_TEXT, order = 1),
		@ModuleConfiguration(key = "descriptor", displayName = "Data descriptor",pattern = "^(.*)$", type=ModuleConfigurationType.PLAIN_TEXT,order = 2),
		@ModuleConfiguration(key = "file", displayName = "Path to generated descriptor file", pattern = "^(.*)$",type=ModuleConfigurationType.PLAIN_TEXT,order = 3),
		@ModuleConfiguration(key = "regression", displayName = "Regression Problem", pattern = "^(.*)$",type=ModuleConfigurationType.BOOLEAN,order = 4)}, 
	inputs = { @ModuleEndpoint(name = "from", minNumber = 1, maxNumber = 1, dataType = DataType.PlainText, order = 1) }, outputs = {
		@ModuleEndpoint(name = "ok", minNumber = 1, maxNumber = 1, dataType = DataType.PlainText, order = 1),
		@ModuleEndpoint(name = "error", minNumber = 1, maxNumber = 1, dataType = DataType.PlainText, order = 2) })
public class DescribeModule extends AbstractJavaModule {

	@Override
	public boolean validate(Map<String, String> configurations,
			Map<String, String> inputs, Map<String, String> outputs) {
		// TODO Auto-generated method stub
		return false;
	}

	@Override
	public String getMainClass() {
		return "org.apache.mahout.classifier.df.tools.Describe";
	}

	@Override
	public String getArguments(Map<String, String> configurations) {
		Module module= DescribeModule.class.getAnnotation(Module.class);
		ModuleConfiguration[] confs = module.configurations();
		
		StringBuilder sb = new StringBuilder();
		for (String key : configurations.keySet()) {
			ModuleConfigurationType confType = getConfigurationType(key, confs);
			switch(confType){
			case BOOLEAN:
				sb.append(configurations.get(key) + " ");
				break;
			case PLAIN_TEXT:
				sb.append("--" + key + " \"" + configurations.get(key) + "\" ");
				break;
			case OTHER:				
			default:
				System.out.println("Invalid Parameters!");
				break;
			}
		}
		return sb.toString();
	}
	
	private ModuleConfigurationType getConfigurationType(String key, ModuleConfiguration[] confs){
		for( ModuleConfiguration conf : confs){
			if( key.equals(conf.key()))
				return conf.type();
		}
		return ModuleConfigurationType.OTHER;
	}

	public static void main(String[] args) {
		System.out.println("Demo Java Main");

		System.out.println("# Arguments: " + args.length);
		for (int i = 0; i < args.length; i++) {
			System.out.println("Argument[" + i + "]: " + args[i]);
		}
	}

}
