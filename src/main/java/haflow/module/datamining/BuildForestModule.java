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

@Module(id = "ada600a8-aa63-968a-ca46-4356a0e0bdac", name = "BuildForest", category = "DataMining-Mahout", type = ModuleType.JAVA, 
	configurations = {
		@ModuleConfiguration(key = "data", displayName = "data: Data path", pattern = "^(.*)$", type=ModuleConfigurationType.PLAIN_TEXT),
		@ModuleConfiguration(key = "dataset", displayName = "dataset: Dataset path",pattern = "^(.*)$", type=ModuleConfigurationType.PLAIN_TEXT),
		@ModuleConfiguration(key = "selection", displayName = "selection: Number of variables to select randomly at each tree-node.", pattern = "^(.*)$",type=ModuleConfigurationType.PLAIN_TEXT),
		@ModuleConfiguration(key = "no-complete", displayName = "no-complete: The tree is not complemented", pattern = "^(.*)$",type=ModuleConfigurationType.BOOLEAN), 
		@ModuleConfiguration(key = "minsplit", displayName = "minsplit: Minimum Split", pattern = "^(.*)$", type=ModuleConfigurationType.PLAIN_TEXT),
		@ModuleConfiguration(key = "minprop", displayName = "minprop: Minimum Porportion", pattern = "^(.*)$", type=ModuleConfigurationType.PLAIN_TEXT),
		@ModuleConfiguration(key = "seed", displayName = "seed: Seed Value", pattern = "^(.*)$", type=ModuleConfigurationType.PLAIN_TEXT),
		@ModuleConfiguration(key = "partial", displayName = "partial: use the Partial Data Implementation", pattern = "^(.*)$", type=ModuleConfigurationType.BOOLEAN),
		@ModuleConfiguration(key = "nbtrees", displayName = "nbtrees: Number of trees to grow.", pattern = "^(.*)$", type=ModuleConfigurationType.PLAIN_TEXT),
		@ModuleConfiguration(key = "output", displayName = "output: Output path", pattern = "^(.*)$", type=ModuleConfigurationType.PLAIN_TEXT)},
	inputs = { @ModuleEndpoint(name = "from", minNumber = 1, maxNumber = 1, dataType = DataType.PlainText) }, outputs = {
		@ModuleEndpoint(name = "ok", minNumber = 1, maxNumber = 1, dataType = DataType.PlainText),
		@ModuleEndpoint(name = "error", minNumber = 1, maxNumber = 1, dataType = DataType.PlainText) })
public class BuildForestModule extends AbstractJavaModule {

	@Override
	public boolean validate(Map<String, String> configurations,
			Map<String, String> inputs, Map<String, String> outputs) {
		// TODO Auto-generated method stub
		return false;
	}

	@Override
	public String getMainClass() {
		return "org.apache.mahout.classifier.df.mapreduce.BuildForest";
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
