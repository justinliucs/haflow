package haflow.module.zrace;

import haflow.module.AbstractJavaModule;
import haflow.module.DataType;
import haflow.module.Module;
import haflow.module.ModuleConfiguration;
import haflow.module.ModuleEndpoint;
import haflow.module.ModuleType;

import java.util.Map;

@Module(id = "ada600a8-aa63-968a-ca56-aeaeade0bd2f", name = "NaiveBayesTrain", category = "zrace", type = ModuleType.JAVA,
	configurations = {
		@ModuleConfiguration(key = "i", displayName = "Input File Path"), 
		@ModuleConfiguration(key = "o", displayName = "Output File Path"),
		@ModuleConfiguration(key = "li", displayName = "Label Index Path"),
		@ModuleConfiguration(key = "cl", displayName = "Cluster Path"),
		@ModuleConfiguration(key = "others", displayName = "Other Parameters"),
		}, 
	static_configurations={},
	inputs = { @ModuleEndpoint(name = "from", minNumber = 1, maxNumber = 1, dataType = DataType.PlainText) }, 
	outputs = { @ModuleEndpoint(name = "ok", minNumber = 1, maxNumber = 1, dataType = DataType.PlainText),
		@ModuleEndpoint(name = "error", minNumber = 1, maxNumber = 1, dataType = DataType.PlainText) })
public class NaiveBayesTrainModule extends AbstractJavaModule {

	@Override
	public boolean validate(Map<String, String> configurations,
			Map<String, String> inputs, Map<String, String> outputs) {
		// TODO Auto-generated method stub
		return false;
	}
	
	@Override
	public String getMainClass(){
		return NaiveBayesTrainModule.class.getName();
	}

	@Override
	public String getArgs(Map<String, String> configurations){
		StringBuilder sb = new StringBuilder();
		for(String key : configurations.keySet()){
			if( key.equals("others")){
				sb.append(configurations.get(key) + " ");
			}else{
				sb.append("-" + key + " \"" + configurations.get(key) + "\" ");
			}
		}
		return sb.toString();
	}
	
	public static void main(String[] args) {
		System.out.println("Demo Java Main");

		System.out.println("# Arguments: " + args.length);
		for (int i = 0; i < args.length; i++) {
			System.out.println("Argument[" + i + "]: " + args[i]);
		}
	}

}
