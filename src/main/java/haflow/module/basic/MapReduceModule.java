package haflow.module.basic;

import java.util.Map;

import haflow.dto.entity.Node;
import haflow.module.DataType;
import haflow.module.Module;
import haflow.module.ModuleConfiguration;
import haflow.module.ModuleEndpoint;
import haflow.module.AbstractModule;
import haflow.module.ModuleType;

@Module(id = "35267c79-5221-3a0e-d485-605fa8e4b191", name = "MapReduce", category = "Basic", type = ModuleType.MAP_REDUCE, 
	configurations = {
		@ModuleConfiguration(key = "job-tracker", displayName = "Job Tracker"),
		@ModuleConfiguration(key = "name-node", displayName = "Name Node"),
		@ModuleConfiguration(key = "prepare.delete", displayName = "Prepare:Delete"),
		@ModuleConfiguration(key = "prepare.mkdir", displayName = "Prepare:Make Directory"),
		@ModuleConfiguration(key = "streaming.mapper", displayName = "Streaming:Mapper"),
		@ModuleConfiguration(key = "streaming.reducer", displayName = "Streaming:Reducer"),
		@ModuleConfiguration(key = "streaming.record-reader", displayName = "Streaming:Record Reader"),
		@ModuleConfiguration(key = "streaming.record-reader-mapping", displayName = "Streaming:Record Reader Mapping"),
		@ModuleConfiguration(key = "streaming.env", displayName = "Streaming:Environment") }, 
	static_configurations = {},	
	inputs = { @ModuleEndpoint(name = "from", minNumber = 1, maxNumber = 1, dataType = DataType.PlainText) }, outputs = {
		@ModuleEndpoint(name = "to", minNumber = 1, maxNumber = 1, dataType = DataType.PlainText),
		@ModuleEndpoint(name = "error", minNumber = 1, maxNumber = 1, dataType = DataType.PlainText) })
public class MapReduceModule extends AbstractModule {

	@Override
	public boolean validate(Map<String, String> configurations,
			Map<String, Node> inputs, Map<String, Node> outputs) {
		// TODO Auto-generated method stub
		return false;
	}

}
