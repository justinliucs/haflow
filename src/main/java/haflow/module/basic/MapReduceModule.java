package haflow.module.basic;

import haflow.module.AbstractModule;
import haflow.module.DataType;
import haflow.module.Module;
import haflow.module.ModuleConfiguration;
import haflow.module.ModuleEndpoint;
import haflow.module.ModuleType;

import java.util.Map;

@Module(id = "35267c79-5221-3a0e-d485-605fa8e4b191", name = "MapReduce", category = "Basic", type = ModuleType.MAP_REDUCE, configurations = {
		@ModuleConfiguration(key = "job-tracker", displayName = "Job Tracker", order = 1),
		@ModuleConfiguration(key = "name-node", displayName = "Name Node", order = 2),
		@ModuleConfiguration(key = "prepare.delete", displayName = "Prepare:Delete", order = 3),
		@ModuleConfiguration(key = "prepare.mkdir", displayName = "Prepare:Make Directory", order = 4),
		@ModuleConfiguration(key = "streaming.mapper", displayName = "Streaming:Mapper", order = 5),
		@ModuleConfiguration(key = "streaming.reducer", displayName = "Streaming:Reducer", order = 6),
		@ModuleConfiguration(key = "streaming.record-reader", displayName = "Streaming:Record Reader", order = 7),
		@ModuleConfiguration(key = "streaming.record-reader-mapping", displayName = "Streaming:Record Reader Mapping", order = 8),
		@ModuleConfiguration(key = "streaming.env", displayName = "Streaming:Environment", order = 9) }, inputs = { @ModuleEndpoint(name = "from", minNumber = 1, maxNumber = 1, dataType = DataType.PlainText, order = 1) }, outputs = {
		@ModuleEndpoint(name = "to", minNumber = 1, maxNumber = 1, dataType = DataType.PlainText, order = 1),
		@ModuleEndpoint(name = "error", minNumber = 1, maxNumber = 1, dataType = DataType.PlainText, order = 2) })
public class MapReduceModule extends AbstractModule {

	@Override
	public boolean validate(Map<String, String> configurations,
			Map<String, String> inputs, Map<String, String> outputs) {
		// TODO Auto-generated method stub
		return false;
	}

}
