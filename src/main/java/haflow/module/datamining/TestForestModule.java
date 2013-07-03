package haflow.module.datamining;

import haflow.module.AbstractJavaModule;
import haflow.module.DataType;
import haflow.module.Module;
import haflow.module.ModuleConfiguration;
import haflow.module.ModuleConfigurationType;
import haflow.module.ModuleEndpoint;
import haflow.module.ModuleType;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Module(id = "ada600a8-aa63-968a-ca46-4356a0e0bdad", name = "TestForest", category = "datamining", type = ModuleType.JAVA, 
	configurations = {
		@ModuleConfiguration(key = "input", displayName = "input : Path to job input directory.", pattern = "^(.*)$", type=ModuleConfigurationType.PLAIN_TEXT),
		@ModuleConfiguration(key = "dataset", displayName = "dataset : Dataset path",pattern = "^(.*)$", type=ModuleConfigurationType.PLAIN_TEXT),
		@ModuleConfiguration(key = "model", displayName = "model: Path to the Decision Forest", pattern = "^(.*)$",type=ModuleConfigurationType.PLAIN_TEXT),
		@ModuleConfiguration(key = "output", displayName = "output: The directory pathname for output.", pattern = "^(.*)$",type=ModuleConfigurationType.PLAIN_TEXT), 
		@ModuleConfiguration(key = "analyze", displayName = "analyze: ", pattern = "^(.*)$", type=ModuleConfigurationType.BOOLEAN),
		@ModuleConfiguration(key = "mapreduce", displayName = "mapreduce: ", pattern = "^(.*)$", type=ModuleConfigurationType.BOOLEAN)},
	inputs = { @ModuleEndpoint(name = "from", minNumber = 1, maxNumber = 1, dataType = DataType.PlainText) }, outputs = {
		@ModuleEndpoint(name = "ok", minNumber = 1, maxNumber = 1, dataType = DataType.PlainText),
		@ModuleEndpoint(name = "error", minNumber = 1, maxNumber = 1, dataType = DataType.PlainText) })
public class TestForestModule extends AbstractJavaModule {

	@Override
	public boolean validate(Map<String, String> configurations,
			Map<String, String> inputs, Map<String, String> outputs) {
		// TODO Auto-generated method stub
		return false;
	}

	@Override
	public String getMainClass() {
		return "org.apache.mahout.classifier.df.mapreduce.TestForest";
	}

	@Override
	public List<String> getArguments(Map<String, String> configurations) {
		Module module= this.getClass().getAnnotation(Module.class);
		ModuleConfiguration[] confs = module.configurations();
		
		List<String> result = new ArrayList<String>();
		for (String key : configurations.keySet()) {
			ModuleConfigurationType confType = getConfigurationType(key, confs);
			switch(confType){
			case BOOLEAN:
				String boolValue = configurations.get(key);
				if( boolValue.equals("true")){
					result.add("--" + key );
				}
				break;
			case PLAIN_TEXT:
				String textValue = configurations.get(key).trim();
				if( textValue.length() > 0){
					result.add("--" + key);
					result.add(configurations.get(key));
				}
				break;
			case OTHER:				
			default:
				System.out.println("Invalid Parameters!");
				break;
			}
		}
		return result;
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
