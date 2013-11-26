package haflow.module.datamining;

import haflow.module.AbstractJavaModule;
import haflow.module.DataType;
import haflow.module.Module;
import haflow.module.ModuleConfiguration;
import haflow.module.ModuleConfigurationType;
import haflow.module.ModuleEndpoint;
import haflow.module.ModuleType;

import java.util.Map;

@Module(id = "ada600a8-aa63-968a-ca46-4356a0e0bdab", name = "Describe", category = "DataMining-Mahout", type = ModuleType.JAVA, 
	configurations = {
		@ModuleConfiguration(key = "descriptor", displayName = "descriptor: Data descriptor", pattern = "^(.*)$", type = ModuleConfigurationType.PLAIN_TEXT),
		@ModuleConfiguration(key = "regression", displayName = "regression: Regression Problem", pattern = "^(.*)$", type = ModuleConfigurationType.BOOLEAN) }, 
	inputs = { 
		@ModuleEndpoint(name = "path", minNumber = 1, maxNumber = 1, dataType = DataType.Arff) }, 
	outputs = {
		@ModuleEndpoint(name = "file", minNumber = 1, maxNumber = 1, dataType = DataType.PlainText) })
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

}
